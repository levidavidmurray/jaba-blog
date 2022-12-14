<template>
    <nuxt-layout name="nav-header">
        <div class="max-w-xl mx-auto relative mt-8 pb-20">
            <div class="w-fit ml-auto mr-0 mb-4 flex items-center" v-if="authStore.canCreate">
                <nuxt-link :to="article.editLink">
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
import { Article } from '~~/types/models/article';
import { Ref } from 'vue';
import { useAuth } from '~~/store/auth';
import { NButton, useMessage } from 'naive-ui'
import { StrapiError } from 'strapi-sdk-js'
import { useArticles } from '~~/store/article';

const articleStore = useArticles()
const authStore = useAuth()
await authStore.fetchUser()

const route = useRoute();
const message = useMessage()

let article: Ref<Article | null> = ref(null);

const { TWITTER_HANDLE, TWITTER_CARD_IMAGE } = useConstants()

const addMetaTags = () => {
    const { title, summary } = article.value

    let protocol = $isDev ? 'http' : 'https'

    const twitterImage = `${protocol}://${useHost()}/${TWITTER_CARD_IMAGE}`

    useHead({
        title: `${title}`,
        meta: [
            { name: 'description', context: summary },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: summary },
            { name: 'twitter:creator', content: TWITTER_HANDLE },
            { name: 'twitter:image', content: twitterImage },
        ]
    })
}

if (!route.params.slug || !route.params.slug[0]) {
    // await router.push('/')
    await navigateTo('/', { replace: true })
} else {
    const articleSlug = route.params.slug[0]

    try {
        const dto = await articleStore.findOne(articleSlug)
        article.value = new Article(dto)
        addMetaTags()
    }
    catch (err) {
        message.error((err as StrapiError).error.message)
        await navigateTo('/', { replace: true })
    }

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