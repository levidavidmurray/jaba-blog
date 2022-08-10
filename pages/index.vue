<template>
    <div class="text-secondary-darker dark:text-white bg-neutral-50 dark:bg-neutral-900">
        <div class="min-h-screen">
            <SiteHeader />
            <div class="p-4 my-0 mx-auto max-w-lg">
                <ArticleItem :featured="true" :article="featured" />
                <div class="mt-8 flex-col space-y-2">
                    <ArticleItem v-for="article in articles" :article="article" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Strapi4Response } from '@nuxtjs/strapi/dist/runtime/types';
import { ArticleDto, ArticleDtoAttribs } from '@/types/api';
import { Article } from '@/types/models/article';

const { find } = useStrapi4();

const response = await find<Strapi4Response<ArticleDtoAttribs>>('articles', { sort: 'publishedAt:DESC' });
const articles = (response.data as ArticleDto[]).map(dto => new Article(dto))

const featured = articles.shift();

console.log(articles);
</script>