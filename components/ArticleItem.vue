<template>
    <div class="article-item">
        <div class="px-2 pb-5">

            <!-- Header -->
            <div 
                :class="[featured ? 'text-sm' : 'text-xs']"
                class="relative px-2 flex justify-between py-3 border-b dark:border-neutral-600 border-neutral-100 text-slate-400 dark:text-neutral-400">
                <span :class="featured ? 'text-emerald-500 font-medium dark:font-normal dark:text-emerald-300' : ''">{{ article.publishedAtDisplay }}</span>
                <span>{{ article.minutesToRead }} min read</span>
                <!-- <span 
                    v-if="article.points"
                    :class="pointsProps.class"
                    :style="pointsProps.style"
                    class="absolute right-0 top-0 w-10 text-right text-base font-semibold"
                >
                    {{ pointsDisplay }}
                </span> -->
            </div>

            <!-- Content -->
            <div class="px-2 mt-4 text-neutral-900 dark:text-neutral-200">
                <nuxt-link :to="article.isPublished ? article.readLink : article.editLink">
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
                    <n-button 
                        v-if="featured"
                        type="primary"
                        text
                        @click="navigateTo(article.isPublished ? article.readLink : article.editLink)"
                        class="mt-4 text-emerald-500 dark:text-emerald-400"
                    >Read More</n-button>
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

const points = article.points
const isDown = points < 0
const pointsProps = {
    style: { transform: `translate(16px, 32px) rotate(${isDown ? 8 : -6}deg)` },
    class: [isDown ? 'text-rose-500' : 'text-emerald-400']
}
const pointsDisplay = isDown ? points : `+${points}`

</script>

<style>

.article-item {
    @apply w-full bg-white dark:bg-neutral-800/40 rounded-md border border-neutral-100 dark:border-none block;
}

</style>