<template>
    <nuxt-layout name="nav-header">
        <client-only>
            <div class="max-w-xl mx-auto mt-8 pb-20 relative">
                <tiptap :article="article" @update="onEditorUpdate" />

                <button app @click="onSave" class="mt-8 max-w-xs block mx-auto">Save</button>

                <div v-if="article" class="admin-actions">
                    <button @click="onDelete">
                        <icon-trash class="text-2xl text-neutral-400 hover:text-red-600 active:text-red-800" />
                    </button>
                </div>
            </div>
        </client-only>
    </nuxt-layout>
</template>

<script lang="ts" setup>
import { ArticleDto } from '~~/types/api';
import { Article } from '~~/types/models/article';
import IconTrash from '~icons/material-symbols/delete'

const { $strapi } = useNuxtApp()

const route = useRoute();
const router = useRouter();

let articleHtml: string;

let article: Article | undefined = undefined;
let articleId: string;

// Editing existing article
if (route.params.slug && route.params.slug[0]) {
    articleId = route.params.slug[0];
    const response = await $strapi.findOne<ArticleDto>('articles', articleId);
    article = new Article(response.data);
} 

const onEditorUpdate = (html) => {
    articleHtml = html
};

const onSave = async () => {
    const parser = new DOMParser();
    const html = parser.parseFromString(articleHtml, 'text/html')

    const titleEl = html.querySelector('h1')
    const subtitleEl = html.querySelector('p')

    titleEl.remove()
    subtitleEl.remove()

    const articleParams: Partial<ArticleDto> = {
        title: titleEl.innerText,
        subtitle: subtitleEl.innerText,
        summary: html.querySelectorAll('p')[0].innerText,
        body: html.documentElement.outerHTML,
    }

    if (articleId) {
        await $strapi.update<ArticleDto>('articles', articleId, articleParams);
        await router.go(-1)
    } else {
        const res = await $strapi.create<ArticleDto>('articles', articleParams);
        await navigateTo(`/${res.data.id}`, {replace: true})
    }

};

const onDelete = () => {

}

</script>
