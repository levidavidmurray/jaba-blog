<template>
    <div>
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

    const emit = defineEmits(['update'])

    const { article } = defineProps<{ article?: Article }>();

    const CustomDocument = Document.extend({
        content: 'heading block*'
    })

    const editor = new Editor({
        editorProps: {
            attributes: {
                class: 'article'
            },
        },
        onUpdate: () => onUpdate(),
        content: article ? article.getEditBody() : '',
        extensions: [
            CustomDocument,
            StarterKit.configure({ document: false }),
            Image,
            Link,
            Typography,
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'heading') return "What's the title?"
                    console.log(node)

                    return "What's on your mind?"
                }
            })
        ],
        autofocus: true,
    })

    const onUpdate = () => {
        emit('update', editor.getHTML());
    };

    onUpdate();

</script>

<style lang="scss">

.ProseMirror {
    @apply outline-none;
}

.ProseMirror.article {

    min-height: 512px;

    .is-empty::before {
        float: left;
        color: #adb5bd;
        pointer-events: none;
        height: 0;
    }

    h1.is-empty:first-of-type::before {
        content: attr(data-placeholder);
    }

    p.is-empty:first-of-type::before {
        content: 'Subtitle';
    }

    p:first-of-type {
        @apply mt-2 outline-none text-lg font-medium text-neutral-500 dark:text-neutral-400;
    }

    p.is-empty:nth-of-type(2)::before {
        content: attr(data-placeholder);
    }

    a {
        @apply underline cursor-pointer;
    }
}
</style>