<template>
    <div class="p-4">
        <client-only>

            <!-- Header -->
            <div class="pb-4 border-b border-neutral-200">
                <nuxt-link to="/">
                    <IconMatArrowBackIos />
                </nuxt-link>
                <!-- Title -->
                <!-- <input class="text-center text-5xl px-4 font-extrabold w-full" type="text" id="title" name="title" v-model="articleContent.title" autofocus> -->
            </div>

            <!-- Body -->
            <div class="max-w-2xl mx-auto mt-4">
                <tiptap :article="article" @update="onEditorUpdate" />

                <button @click="onSave" class="mt-4 max-w-xs block mx-auto">Save</button>
            </div>

        </client-only>
    </div>
</template>

<script lang="ts" setup>import { Strapi4Response } from '@nuxtjs/strapi/dist/runtime/types';
import { ArticleDtoAttribs, ArticleDto } from '~~/types/api';
import { Article } from '~~/types/models/article';
import IconMatArrowBackIos from '~icons/material-symbols/arrow-back-ios-new';

const { findOne, update, create } = useStrapi4();

const route = useRoute();
console.log(route.params.slug);

const articleContent = reactive({
    title: 'New Post',
    body: '',
})

let article: Article | undefined = undefined;
let articleId: string;

// Editing existing article
if (route.params.slug && route.params.slug[0]) {
    articleId = route.params.slug[0];
    const response = await findOne<Strapi4Response<ArticleDtoAttribs>>('articles', articleId);
    article = new Article(response.data as ArticleDto);

    articleContent.title = article.title;
    articleContent.body = article.body;

    console.log(article);
} 
// New Article
else {

}

const onEditorUpdate = ({ body, title }) => {
    articleContent.body = body;
    articleContent.title = title;
};

const onSave = async () => {
    console.log(articleContent);
    if (articleId) {
        await update<ArticleDtoAttribs>('articles', articleId, articleContent);
    } else {
        await create<ArticleDtoAttribs>('articles', articleContent);
    }

    await navigateTo('/')
};

</script>

<style scoped>
    h1 {
        @apply text-2xl;
    }
</style>