<template>
    <div class="input-field flex justify-between items-center">
        <label v-if="label" :style="{width: `${labelSize}px`}" :for="name">{{ label }}</label>
        <input 
            :type="type"
            :id="name"
            :placeholder="placeholder"
            :autofocus="autofocus"
        >
    </div>
</template>

<script lang="ts" setup>
const { 
    label, 
    name, 
    type = 'text',
    placeholder,
    labelSize = '128',
    autofocus
} = defineProps<{
    label?: string
    name?: string
    type?: string
    placeholder?: string
    labelSize?: string
    autofocus?: boolean
}>();
</script>

<style>
    .input-field label {
        @apply block text-right;
    }

    .input-field input {
        @apply ml-6 pl-1 py-0.5 border rounded-sm bg-neutral-100 border-neutral-200 outline-2 focus-within:outline outline-pink-300;

        @apply dark:bg-neutral-800 dark:border-neutral-700;
    }
</style>