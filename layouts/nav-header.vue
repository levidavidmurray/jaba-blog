<template>
    <div class="p-4">
        <div class="pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <button @click="goBack">
                <material-symbols:arrow-back-ios-new />
            </button>
        </div>

        <slot></slot>

    </div>
</template>

<script lang="ts" setup>
    const router = useRouter()

    const goBack = async () => {
        if (hasHistory()) {
            return await router.go(-1)
        }

        return await router.replace('/')
    }
</script>