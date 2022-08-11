<template>
    <div class="article-item">
        <div class="px-2 pb-5">

            <!-- Header -->
            <div 
                :class="[featured ? 'text-sm' : 'text-xs']"
                class="px-2 font-medium flex justify-between py-3 border-b dark:border-neutral-600 border-neutral-100 text-slate-400 dark:text-neutral-400">
                <span>{{ article.publishedAtDisplay }}</span>
                <span>5 min read</span>
            </div>

            <!-- Content -->
            <div class="px-2 mt-4 text-neutral-900 dark:text-neutral-200">
                <h3 :class="[featured ? 'text-2xl' : 'text-xl']" class="font-extrabold">{{ article.title }}</h3>
                <h5 
                    :class="[featured ? 'text-base' : 'text-sm']" 
                    class="text-neutral-500 dark:text-neutral-300 mt-2.5"
                >
                    {{ article.subtitle }}
                </h5>
                <p v-if="featured" class="text-sm mt-2 leading-relaxed">{{ article.summary }}</p>

                <!-- Button -->
                <button app v-if="featured" @click="navigateTo(viewLink)" class="mt-4">Read More</button>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { Article } from '@/types/models/article';

const { featured, article } = defineProps<{
    featured?: boolean
    article: Article
}>();

const viewLink = `/${article.id}`
const editLink = `/edit/${article.id}`

</script>

<style>

.article-item {
    @apply w-full bg-white dark:bg-neutral-800 rounded-md shadow-2xl shadow-neutral-200 dark:shadow-neutral-900 block;
}

</style>