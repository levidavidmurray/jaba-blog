<template>
    <div class="p-4">
        <client-only>
            <div class="pb-8">
                <input class="text-6xl font-extrabold text-center" type="text" id="title" name="title" value="New Post" autofocus>
            </div>
            <tiptap @update="onEditorUpdate" />
        </client-only>
    </div>
</template>

<script lang="ts" setup>

const onEditorUpdate = (content) => {
    console.log(content);
};

</script>

<style scoped>
    h1 {
        @apply text-2xl;
    }
</style>