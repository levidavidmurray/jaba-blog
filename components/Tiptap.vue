<template>
    <div>
        <bubble-menu :editor="editor" :tippy-options="{ duration: 200 }">
            <button 
                class="bg-neutral-100 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 px-2 flex items-center rounded-sm" 
                @click="handleLink"
            >
                <material-symbols:link v-if="!editor.isActive('link')" class="text-base text-emerald-500" />
                <material-symbols:link-off v-else class="text-base text-emerald-500" />
            </button>
        </bubble-menu>
        <editor-content :editor="editor" />
    </div>
</template>

<script lang="ts" setup>
    import { Article } from '@/types/models/article'
    import { BubbleMenu, Editor, EditorContent } from '@tiptap/vue-3'
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
            Link.configure({ openOnClick: false }),
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

    const handleLink = () => {
        if (editor.isActive('link')) {
            editor.chain().focus().unsetLink().run()
            return
        }

        setLink()
    }

    const setLink = () => {
        const prevUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', prevUrl)

        if (url === null) return

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }

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
        @apply underline cursor-text text-emerald-500;
    }
}
</style>