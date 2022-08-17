<template>
    <div class="p-4 pt-0">
        <div class="relative py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center">
            <button @click="goBack">
                <material-symbols:arrow-back-ios-new />
            </button>
            <nuxt-link to="/" class="flex items-center">
                <h1 class="text-xl font-bold ml-6">lol_idk</h1>
                <h3 class="text-sm text-slate-400 dark:text-slate-500 ml-4">¯\_(ツ)_/¯</h3>
            </nuxt-link>

            <div v-if="false" class="absolute top-0 flex w-full h-full justify-center items-center">
                <h1 class="text-2xl">lol_idk</h1>
            </div>
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