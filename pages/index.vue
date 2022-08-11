<template>
    <div class="text-secondary-darker dark:text-white bg-neutral-50 dark:bg-neutral-900">
        <div class="min-h-screen">
            <SiteHeader />
            <div class="p-4 my-0 mx-auto max-w-lg">
                <ArticleItem v-if="featured" :featured="true" :article="featured" />
                <div class="mt-8 flex-col space-y-2">
                    <ArticleItem v-for="article in listedArticles" :article="article" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ArticleDto } from '@/types/api';
import { Article } from '@/types/models/article';

const { $strapi } = useNuxtApp()

const response = await $strapi.find<ArticleDto[]>('articles', { sort: 'publishedAt:desc' });
const articles = response.data.map(dto => new Article(dto))

const featured = articles[0]

const listedArticles = articles.filter(a => a !== featured)

console.log(articles);
</script>