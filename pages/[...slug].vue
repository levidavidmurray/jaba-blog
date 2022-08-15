<template>
    <nuxt-layout name="nav-header">
        <div class="max-w-xl mx-auto relative mt-8 pb-20">

            <div class="w-fit ml-auto mr-0 mb-4 flex items-center" v-if="authStore.isLoggedIn">
                <nuxt-link :to="editLink">
                    <n-button circle quaternary>
                        <material-symbols:edit class="text-neutral-400" />
                    </n-button>
                </nuxt-link>
            </div>

            <div v-if="article">
                <div class="flex text-sm text-neutral-400 mb-2">
                    <span>{{ article.publishedDateDisplay }}</span>
                    <span class="mx-2">·</span>
                    <span>{{ article.minutesToRead }} min read</span>
                </div>
                <h1>{{ article.title }}</h1>
                <div>
                    <p class="subtitle">{{ article.subtitle }}</p>
                </div>
                <div class="article" v-html="article.body"></div>
            </div>
        </div>
    </nuxt-layout>
</template>

<script lang="ts" setup>
import { ArticleDto } from '~~/types/api';
import { Article } from '~~/types/models/article';
import { Ref } from 'vue';
import { useAuth } from '~~/store/auth';
import { NButton } from 'naive-ui'

const { $strapi } = useNuxtApp()
const authStore = useAuth()
await authStore.fetchUser()

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

    @apply top-2 flex items-center;
}

.subtitle {
    @apply mt-1 outline-none font-medium text-lg text-neutral-500 dark:text-neutral-400;
}

</style>