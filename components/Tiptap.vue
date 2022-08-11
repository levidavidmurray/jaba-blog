<template>
    <div>
        <editor-content :editor="titleEditor" />
        <editor-content :editor="editor" />
    </div>
</template>

<script lang="ts" setup>
    import { Article } from '@/types/models/article'
    import { Editor, EditorContent } from '@tiptap/vue-3'
    import StarterKit from '@tiptap/starter-kit'
    import Image from '@tiptap/extension-image'
    import Link from '@tiptap/extension-link'
    import Typography from '@tiptap/extension-typography'
    import Placeholder from '@tiptap/extension-placeholder'
    import Document from '@tiptap/extension-document'
    import Heading from '@tiptap/extension-heading'
    import Text from '@tiptap/extension-text'

    const emit = defineEmits(['update'])

    const { article } = defineProps<{ article?: Article }>();

    const titleEditor = new Editor({
        editorProps: {
            attributes: {
                class: 'article-title',
            },
        },
        onUpdate: () => onUpdate(),
        content: article ? article.title : '',
        extensions: [
            Document,
            Text,
            Heading.configure({ levels: [1] }),
            Placeholder.configure({ placeholder: 'Untitled Article' })
        ],
        autofocus: !Boolean(article),
    })

    const editor = new Editor({
        editorProps: {
            attributes: {
                class: 'article-body'
            },
        },
        onUpdate: () => onUpdate(),
        content: article ? article.body : '',
        extensions: [
            StarterKit,
            Image,
            Link,
            Typography,
            Placeholder.configure({
                placeholder: 'Write something...'
            })
        ],
        autofocus: Boolean(article),
    })

    const onUpdate = () => {
        emit('update', {
            body: editor.getHTML(),
            title: titleEditor.getText(),
        });
    };

    onUpdate();

</script>

<style lang="scss">

.ProseMirror {
    @apply p-4 outline-none;
}

.ProseMirror.article-title {
    h1 {
        @apply text-4xl font-extrabold;
    }

    h1.is-editor-empty:first-child::before {
        content: attr(data-placeholder);
        float: left;
        color: #adb5bd;
        pointer-events: none;
        height: 0;
    }
}

.ProseMirror.article-body {

    min-height: 512px;

    p.is-editor-empty:first-child::before {
        content: attr(data-placeholder);
        float: left;
        color: #adb5bd;
        pointer-events: none;
        height: 0;
    }

    p {
        @apply leading-relaxed mt-4;
    }

    h1 {
        @apply text-xl font-extrabold mt-6;
    }

    h2 {
        @apply text-xl font-extrabold;
    }

    h3 {
        @apply text-xl font-extrabold;
    }

    h4 {
        @apply text-xl font-extrabold;
    }

    h5 {
        @apply text-xl font-extrabold;
    }

    h6 {
        @apply text-xl font-extrabold;
    }

    a {
        @apply underline cursor-pointer;
    }
}
</style>