<template>
    <nuxt-layout name="nav-header">
        <div class="max-w-xl mx-auto relative mt-8 pb-20">

            <div class="admin-actions">
                <nuxt-link :to="editLink">
                    <material-symbols:edit class="text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200" />
                </nuxt-link>
            </div>

            <div v-if="article">
                <h1>{{ article.title }}</h1>
                <div>
                    <p class="subtitle">{{ article.subtitle }}</p>
                </div>
                <div v-html="article.body"></div>
            </div>
        </div>
    </nuxt-layout>
</template>

<script lang="ts" setup>
import { ArticleDto } from '~~/types/api';
import { Article } from '~~/types/models/article';
import { Ref } from 'vue';

// definePageMeta({
//     layout: 'nav-header',
// })

const { $strapi } = useNuxtApp()

const route = useRoute();

let article: Ref<Article | null> = ref(null);
let editLink: string;

onActivated(() => {
    console.log('Activated!')
})

if (!route.params.slug || !route.params.slug[0]) {
    // await router.push('/')
} else {
    const articleId = route.params.slug[0];
    editLink = `/edit/${articleId}`
    const response = await $strapi.findOne<ArticleDto>('articles', articleId);
    article.value = new Article(response.data);
}

</script>

<style>

.admin-actions {
    position: absolute;
    right: 0;
    transform: translateX(64px);

    @apply top-2;
}

.subtitle {
    @apply mt-2 outline-none text-lg font-medium text-neutral-500 dark:text-neutral-400;
}

</style>