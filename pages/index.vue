<template>
    <div class="">
        <div class="min-h-screen">
            <SiteHeader />

            <div class="p-4 my-0 mx-auto max-w-lg">
                <div v-if="authStore.isLoggedIn" class="flex justify-end mb-4">
                    <nuxt-link to="/edit">
                        <n-button dashed>
                            <div class="flex items-center">
                                <ic:outline-plus class="mr-1" /> New
                            </div>
                        </n-button>
                    </nuxt-link>
                </div>

                <ArticleItem v-if="featuredArticle" :featured="true" :article="featuredArticle" />
                <div class="mt-8 flex-col space-y-2">
                    <ArticleItem v-for="article in listedArticles" :article="article" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { ArticleDto } from '@/types/api';
import { Article } from '@/types/models/article';
import { useAuth } from '~~/store/auth';

const listedArticles = ref<Article[]>([])
const featuredArticle = ref<Article | null>(null)

const authStore = useAuth()

const fetchArticles = async () => {
    try {
        const response = await $strapi.find<ArticleDto[]>('articles', { sort: 'publishedAt:desc' })
        const articles = response.data.map(dto => new Article(dto))
        featuredArticle.value = articles[0]
        listedArticles.value = articles.filter(a => a.id !== featuredArticle.value.id)
    } catch (error) {
        console.error('error', error)
    }
}

fetchArticles()
</script>
