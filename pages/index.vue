<template>
    <div class="">
        <div class="min-h-screen">
            <SiteHeader />

            <div class="p-4 my-0 mx-auto max-w-lg">

                <!-- Admin Filter -->
                <div v-if="authStore.canCreate" class="flex justify-between mb-4">
                    <n-select
                        style="width: 128px;"
                        :options="selectOpts"
                        v-model:value="filterValue"
                        @update:value="handleFilter"
                    >
                    </n-select>
                    <nuxt-link to="/edit">
                        <n-button dashed>
                            <div class="flex items-center">
                                <ic:outline-plus class="mr-1" /> New
                            </div>
                        </n-button>
                    </nuxt-link>
                </div>

                <div v-if="featuredArticle">
                    <!-- Featured -->
                    <ArticleItem v-if="featuredArticle" :featured="true" :article="featuredArticle" />
                    <!-- Article List -->
                    <div class="mt-8 flex-col space-y-2">
                        <ArticleItem v-for="article in listedArticles" :article="article" />
                    </div>
                </div>
                <div v-else>
                    <n-result
                        v-if="!loading"
                        title="No Posts Found"
                        :description="`No '${filterValue}' Found`"
                    >
                        
                    </n-result>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { NButton, NSelect, NResult } from 'naive-ui'
import { ArticleDto } from '@/types/api';
import { Article } from '@/types/models/article';
import { useAuth } from '~~/store/auth';
import { useArticles } from '~~/store/article';

const listedArticles = ref<Article[]>([])
const featuredArticle = ref<Article | null>(null)

const authStore = useAuth()
const articleStore = useArticles()
const isForPublic = $isForPublic

useHead({
    meta: [
        { name: 'description', context: useConstants().SITE_SEO_DESCRIPTION },
    ]
})

const loading = ref(false)

const selectOpts = [
    {
        label: 'Published',
        value: 'published',
    },
    {
        label: 'Drafts',
        value: 'drafts',
    },
]

const filterValue = ref(selectOpts[0].label)

const fetchArticles = async () => {
    featuredArticle.value = null
    loading.value = true
    try {
        await articleStore.fetchPublished()
        displayArticles(articleStore.published)
    } catch (error) {
        console.error('error', error)
    }
    loading.value = false
}

const fetchDrafts = async () => {
    featuredArticle.value = null
    loading.value = true
    try {
        await articleStore.fetchDrafts()
        displayArticles(articleStore.drafts)
    } catch (error) {
        console.error('error', error)
    }
    loading.value = false
}

const displayArticles = (articleDtos: ArticleDto[]) => {
    const articles = articleDtos.map(dto => new Article(dto))
    featuredArticle.value = articles[0]
    listedArticles.value = articles.filter(a => a.id !== featuredArticle.value.id)
}

const dropdownActions = {
    published: fetchArticles,
    drafts: fetchDrafts
}

let selectedOpt = selectOpts[0].value

const handleFilter = (value: string) => {
    if (value === selectedOpt) return
    selectedOpt = value
    dropdownActions[value]?.()
}

fetchArticles()
</script>
