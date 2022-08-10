<template>
    <editor-content :editor="editor" />
</template>

<script lang="ts" setup>
    import { Editor, EditorContent } from '@tiptap/vue-3'
    import StarterKit from '@tiptap/starter-kit'
    import Image from '@tiptap/extension-image'
    import Link from '@tiptap/extension-link'
    import Typography from '@tiptap/extension-typography'

    const emit = defineEmits(['update'])

    const editor = new Editor({
        onUpdate({ editor }) {
            emit('update', editor.getHTML())
        },
        content: `
            <h1>Hello There!</h1><h2>Hello There!</h2><h3>Hello There!</h3><h4>Hello There!</h4><h5>Hello There!</h5><h6>Hello There!</h6><p></p><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/api/marks/link">https://tiptap.dev/api/marks/link</a></p><p></p><p>Tiptap with Vue.js! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices, nulla vel accumsan auctor, nibh mauris consectetur elit, non facilisis turpis enim et ipsum. Aliquam mauris nulla, luctus et augue quis, scelerisque facilisis velit. Donec laoreet erat ut libero ultrices mattis ut quis ligula. Etiam id congue nibh, sit amet commodo nisi. Mauris dapibus, sem eu lobortis pretium, orci nunc congue diam, quis pulvinar lacus quam eget lectus. Duis mattis non sapien non fringilla. Nunc consectetur cursus odio, id tincidunt erat molestie ac. Duis laoreet luctus commodo. In orci metus, viverra ornare mattis sit amet, facilisis ut mi. Ut arcu magna, condimentum blandit luctus ut, dapibus quis sapien. Nunc luctus ligula nec neque dictum, at fermentum odio auctor. Etiam molestie maximus justo sed interdum. Aenean non felis a orci tempor euismod suscipit ut purus. Sed semper dolor eget odio faucibus, non tincidunt magna aliquet. Vestibulum ultrices risus fringilla sapien placerat eleifend.</p>
            &nbsp;
            <p>Tiptap with Vue.js!</p>
            <p></p>
            <img src="https://source.unsplash.com/8xznAGy4HcY/800x400" />
            `,
        extensions: [
            StarterKit,
            Image,
            Link,
            Typography,
        ],
    })

</script>

<style lang="scss">
.ProseMirror {
    @apply p-4;

    h1 {
        @apply text-6xl font-extrabold;
    }

    h2 {
        @apply text-5xl font-extrabold;
    }

    h3 {
        @apply text-4xl font-extrabold;
    }

    h4 {
        @apply text-3xl font-extrabold;
    }

    h5 {
        @apply text-2xl font-extrabold;
    }

    h6 {
        @apply text-xl font-extrabold;
    }

    a {
        @apply underline cursor-pointer;
    }
}
</style>