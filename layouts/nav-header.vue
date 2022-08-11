<template>
    <div class="p-4">
        <div class="pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <button @click="goBack">
                <IconMatArrowBackIos />
            </button>
        </div>

        <slot></slot>

    </div>
</template>

<script lang="ts" setup>
    import IconMatArrowBackIos from '~icons/material-symbols/arrow-back-ios-new';

    const router = useRouter()

    const goBack = async () => {
        if (hasHistory()) {
            return await router.go(-1)
        }

        return await router.replace('/')
    }
</script>