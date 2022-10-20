<template>
    <nuxt-layout name="nav-header">
        <client-only>
            <div class="max-w-xl mx-auto mt-8 pb-20 relative">

                <!-- <button app @click="onSave" class="mt-8 max-w-xs block mx-auto">Save</button> -->

                <div class="flex items-center">
                    <n-date-picker v-if="useCustomPublishDate" v-model:value="customPublishDate" type="datetime" />
                    <div v-else-if="article" class="text-neutral-500">
                        <span v-if="article.isPublished" class="italic">Published {{ article.publishedAtDisplay }}</span>
                        <span v-else class="italic">Draft</span>
                    </div>

                    <div class="w-fit ml-auto mr-0 mb-4 flex items-center">
                        <n-button 
                            @click="onSave" 
                            :disabled="saveLoading || publishLoading || !canPublish" 
                            :loading="saveLoading" 
                            class="mr-2"
                            size="medium" 
                            tertiary 
                            type="success"
                        >Save</n-button>
                        <n-button 
                            v-if="(article && !article.isPublished) || !article"
                            @click="onPublish"
                            :disabled="saveLoading || publishLoading || !canPublish"
                            :loading="publishLoading"
                            size="medium"
                            secondary
                            type="success"
                        >Publish</n-button>
                        <n-dropdown
                            v-if="article"
                            trigger="click"
                            :options="dropdownOpts"
                            @select="handleDropdownSelect"
                        >
                            <n-button circle quaternary class="ml-4">
                                <mdi:dots-vertical class="text-xl" />
                            </n-button>
                        </n-dropdown>
                    </div>

                </div>

                <tiptap :article="article" @update="onEditorUpdate" />
            </div>
        </client-only>
    </nuxt-layout>
</template>

<script lang="ts" setup>
import type { Component } from 'vue'
import { NButton, NDropdown, NIcon, useMessage, useDialog, DropdownOption, NDatePicker } from 'naive-ui'
import { ArticleDto } from '~~/types/api';
import { Article } from '~~/types/models/article';
import DeleteIcon from '~icons/material-symbols/delete'
import UnpublishedIcon from '~icons/material-symbols/unpublished'
import CalendarIcon from '~icons/material-symbols/calendar-month'
import { useAuth } from '~~/store/auth';
import { StrapiResponse } from 'strapi-sdk-js'
import { useArticles } from '~~/store/article';

const route = useRoute()
const authStore = useAuth()
const articleStore = useArticles()
const message = useMessage()
const dialog = useDialog()

await authStore.fetchUser()
if (process.client && !authStore.canCreate) {
    await navigateTo('/', { replace: true })
}

const useCustomPublishDate = ref(false)
const customPublishDate = ref($dayjs().valueOf())
const canPublish = ref(false)

let articleHtml: string
let article: Article | undefined = undefined
let articleSlug: string
let validateTimeout: NodeJS.Timeout

const saveLoading = ref(false)
const publishLoading = ref(false)

const renderIcon = (icon: Component) => {
    return () => {
        return h(NIcon, null, {
            default: () => h(icon)
        })
    }
}

const onEditorUpdate = (html) => {
    articleHtml = html

    clearTimeout(validateTimeout)
    validateTimeout = setTimeout(() => {
        validatePublishableData()
    }, 500)
};

/* --n-option-text-color: var(--wc-red-400); */
const dropdownOpts: DropdownOption[] = reactive([
    {
        label: 'Delete',
        key: 'delete',
        icon: renderIcon(DeleteIcon),
        props: {
            style: {
                '--n-option-text-color': 'var(--wc-red-400)',
                '--n-prefix-color': 'var(--wc-red-400)',
            }
        }
    },
])


const promptDeleteConfirmation = () => {
    const d = dialog.warning({
        title: 'Confirm',
        content: 'Are you sure?',
        positiveText: 'Delete',
        negativeText: 'Cancel',
        onPositiveClick: async () => {
            d.loading = true
            await articleStore.delete(article)
            await new Promise(res => setTimeout(res, 1000))
            message.success('Article Deleted')
            await new Promise(res => setTimeout(res, 500))
            navigateTo('/')
        },
        showIcon: false,
        positiveButtonProps: { class: ['red-dialog-btn'], type: 'error', secondary: true }
    })
}

const promptUnpublishConfirmation = () => {
    const d = dialog.warning({
        title: 'Confirm',
        content: 'Are you sure?',
        positiveText: 'Unpublish',
        negativeText: 'Cancel',
        onPositiveClick: async () => {
            d.loading = true
            await articleStore.update(article, { publishedAt: null })
            await new Promise(res => setTimeout(res, 1000))
            message.success('Article Unpublished')
            await new Promise(res => setTimeout(res, 500))
            navigateTo('/')
        },
        showIcon: false,
        positiveButtonProps: { class: ['red-dialog-btn'], type: 'error', secondary: true }
    })
}

const dropdownActions = {
    delete: promptDeleteConfirmation,
    unpublish: promptUnpublishConfirmation,
    publishedDate: () => {
        useCustomPublishDate.value = !useCustomPublishDate.value
    }
}

const handleDropdownSelect = (opt) => {
    dropdownActions[opt]?.()
}

const onPublish = async () => {
    publishLoading.value = true
    const articleParams = getArticleData()

    articleParams.publishedAt = $dayjs().toISOString()
    if (useCustomPublishDate.value) {
        articleParams.publishedAt = $dayjs(customPublishDate.value).toISOString()
    }

    const res = await upsertArticle(articleParams)
    setTimeout(() => {
        publishLoading.value = false
        navigateTo(`/${res.data.slug}`, {replace: true})
    }, 250)
}

const onSave = async () => {
    saveLoading.value = true
    const articleParams = getArticleData()

    if (!article) {
        articleParams.publishedAt = null
    }

    const res = await upsertArticle(articleParams)
    setTimeout(() => {
        saveLoading.value = false
        navigateTo(`/${res.data.slug}`, {replace: true})
    }, 250)
};

const upsertArticle = async (articleParams: Partial<ArticleDto>): Promise<StrapiResponse<ArticleDto>> => {
    if (article) {
        return await articleStore.update(article, articleParams)
    }

    return await articleStore.create(articleParams)
}

const getArticleData = (): Partial<ArticleDto> => {
    const parser = new DOMParser();
    const html = parser.parseFromString(articleHtml, 'text/html')

    const titleEl = html.querySelector('h1')
    const subtitleEl = html.querySelector('p')

    titleEl?.remove()
    subtitleEl?.remove()

    return {
        title: titleEl?.innerText,
        subtitle: subtitleEl?.innerText,
        summary: html.querySelectorAll('p')?.[0]?.innerText,
        body: html.documentElement?.outerHTML,
    }
}

// Ensure title, subtitle and body exist
const validatePublishableData = () => {
    const {title, subtitle, body} = getArticleData()
    canPublish.value = Boolean(title && subtitle && body)
}

// Editing existing article
if (route.params.slug && route.params.slug[0]) {
    articleSlug = route.params.slug[0]
    const articleDto = await articleStore.findOne(articleSlug)

    if (!articleDto) {
        await navigateTo('/edit')
    }

    article = new Article(articleDto)

    if (process.client) {
        validatePublishableData()
    }

    if (article?.isPublished) {
        dropdownOpts.unshift({
            label: 'Unpublish',
            key: 'unpublish',
            icon: renderIcon(UnpublishedIcon),
            props: {
                style: {
                    '--n-option-text-color': 'var(--wc-neutral-500)',
                    '--n-prefix-color': 'var(--wc-neutral-500)',
                }
            }
        })
    } else {
        dropdownOpts.unshift({
            label: 'Set Published Date',
            key: 'publishedDate',
            icon: renderIcon(CalendarIcon),
            props: {
                style: {
                    '--n-option-text-color': 'var(--wc-neutral-500)',
                    '--n-prefix-color': 'var(--wc-neutral-500)',
                }
            }
        })
    }
} 

if (process.client) {
    validatePublishableData()
}

</script>

<style>
.n-popconfirm__icon {
    @apply text-red-500 !important;
}

.delete-btn {
    @apply text-neutral-400 hover:text-red-600 active:text-red-800 !important;
}

.n-dialog__action button.red-dialog-btn {
    /* @apply bg-transparent text-red-500 hover:text-neutral-50 active:bg-red-600 border-red-700 !important;
    --n-border: 1px solid var(--wc-red-700) !important; */
}

.n-dropdown-option {
    /* --n-option-text-color: var(--wc-red-400); */
}

.n-dropdown-option .n-icon {
    @apply flex;
}
</style>