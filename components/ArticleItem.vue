<template>
    <div class="article-item">
        <div class="px-2 pb-5">

            <!-- Header -->
            <div 
                :class="[featured ? 'text-sm' : 'text-xs']"
                class="relative px-2 flex justify-between py-3 border-b dark:border-neutral-600 border-neutral-100 text-slate-400 dark:text-neutral-400">
                <span :class="featured ? 'text-emerald-500 font-medium dark:font-normal dark:text-emerald-300' : ''">{{ article.publishedAtDisplay }}</span>
                <span>{{ article.minutesToRead }} min read</span>
            </div>

            <!-- Content -->
            <div class="px-2 mt-4 text-neutral-900 dark:text-neutral-200">
                <nuxt-link :to="articleLink">
                    <h3 :class="[featured ? 'text-2xl' : 'text-xl']" class="font-extrabold">{{ article.title }}</h3>
                </nuxt-link>
                <h5 
                    :class="[featured ? 'text-base' : 'text-sm']" 
                    class="text-neutral-500 dark:text-neutral-400 mt-0"
                >
                    {{ article.subtitle }}
                </h5>
                <p v-if="featured" class="text-sm mt-2 leading-relaxed">{{ article.summary }}</p>

                <!-- Button -->
                <div class="flex justify-end pr-6">
                    <nuxt-link :to="articleLink">
                        <n-button 
                            v-if="featured"
                            type="primary"
                            text
                            class="mt-4 text-emerald-500 dark:text-emerald-400"
                        >Read More</n-button>
                    </nuxt-link>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { Article } from '@/types/models/article';
import { NButton } from 'naive-ui'

const { featured, article } = defineProps<{
    featured?: boolean
    article: Article
}>();

const articleLink = article.isPublished ? article.readLink : article.editLink

</script>

<style>

.article-item {
    @apply w-full bg-white dark:bg-neutral-800/40 rounded-md border border-neutral-100 dark:border-none block;
}

</style>