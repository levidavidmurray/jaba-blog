import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { ArticleDto } from '~~/types/api'
import { Article } from '~~/types/models/article';
import { StrapiResponse } from 'strapi-sdk-js'
import { useAuth } from './auth';
import { RemovableRef, useStorage } from '@vueuse/core'
import slugify from 'slugify'

interface ArticleState {
    published: Ref<ArticleDto[]>;
    drafts: Ref<ArticleDto[]>;
}

// const authStore = useAuth()

const localArticleStore: RemovableRef<{[key: string]: ArticleDto}> = useStorage('articles:local', {})

// Only hides non-local articles
const hiddenArticleSlugs: RemovableRef<Set<string>> = useStorage('articles:hidden', new Set<string>())

export const useArticles = defineStore('article', {
    state: (): ArticleState => ({
        published: ref([]),
        drafts: ref([]),
    }),

    actions: {
        async fetchPublished() {
            const { data } = await $strapi.find<ArticleDto[]>('articles', { sort: 'publishedAt:desc' })
            const publishedArticles: ArticleDto[] = []

            data.forEach(article => {
                if (hiddenArticleSlugs.value.has(article.slug)) return
                publishedArticles.push(article)
            })
            
            this.published = publishedArticles

            if ($isForPublic) {
                const localArticles = Object.values(localArticleStore.value)
                localArticles.forEach(articleDto => {
                    if (articleDto.publishedAt) {
                        publishedArticles.push(articleDto)
                    }
                })

                publishedArticles.sort((a, b) => $dayjs(b.publishedAt).unix() - $dayjs(a.publishedAt).unix())
                this.published = publishedArticles
            }
        },

        async fetchDrafts() {
            let articles: ArticleDto[] = []

            if (useAuth().isLoggedIn) {
                const { data } = await $strapi.find<ArticleDto[]>('articles', { 
                    sort: 'updatedAt:desc', 
                    publicationState: 'preview', 
                    filters: {'publishedAt': {'$null': true}} 
                })
                articles = data
            }

            this.drafts = articles

            if ($isForPublic) {
                const localArticles = Object.values(localArticleStore.value)
                localArticles.forEach(articleDto => {
                    if (!articleDto.publishedAt) {
                        articles.push(articleDto)
                    }
                })

                articles.sort((a, b) => $dayjs(b.createdAt).unix() - $dayjs(a.createdAt).unix())
                this.drafts = articles
            }
        },

        async findOne(slug: string): Promise<ArticleDto> {
            if ($isForPublic && localArticleStore.value[slug]) {
                return localArticleStore.value[slug]
            }

            const { data } = await $strapi.findOne<ArticleDto>('articles', slug)
            return data
        },

        async delete(article: Article): Promise<void> {
            if (useAuth().isLoggedIn && !article.isLocal) {
                await $strapi.delete('articles', article.id)
                return
            }

            if (article.isLocal) {
                delete localArticleStore.value[article.slug]
            } else {
                // public user deleted non-local article
                hiddenArticleSlugs.value.add(article.slug)
            }
        },

        async update(article: Article, articleParams: Partial<ArticleDto>): Promise<StrapiResponse<ArticleDto>> {
            // Authenticated Update (persists to server)
            if (useAuth().isLoggedIn) {
                return await $strapi.update<ArticleDto>('articles', article.id, articleParams);
            }

            // Unauthenticated Update (persists to localStorage)
            if ($isForPublic) {

                if (!article.isLocal) {
                    // public user is editing non-local article
                    hiddenArticleSlugs.value.add(article.slug)
                }

                const newDto: ArticleDto = Object.assign(article.dto, articleParams)
                newDto.id = -1 // allow overwriting real articles
                newDto.slug = slugify(newDto.title, { lower: true, strict: true })
                delete localArticleStore.value[article.slug]
                localArticleStore.value[newDto.slug] = newDto

                return {
                    data: newDto,
                    meta: {},
                }
            }
        },

        async create(params: Partial<ArticleDto>): Promise<StrapiResponse<ArticleDto>> {
            if (useAuth().isLoggedIn) {
                return await $strapi.create<ArticleDto>('articles', params);
            }

            if ($isForPublic) {
                return {
                    data: this.createLocalArticle(params),
                    meta: {}
                }
            }
        },

        createLocalArticle(params: Partial<ArticleDto>): ArticleDto {
            const dateString = $dayjs().toISOString()
            const dto: ArticleDto = {
                id: -1,
                title: params.title,
                subtitle: params.subtitle,
                summary: params.summary,
                body: params.body,
                thumbnail: null,
                slug: slugify(params.title, { lower: true, strict: true }),
                createdAt: dateString,
                updatedAt: dateString,
                publishedAt: params.publishedAt,
            }

            localArticleStore.value[dto.slug] = dto
            return dto
        }
    }
})
