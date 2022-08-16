<template>
    <div class="py-8 relative">
        <h1 class="text-3xl text-neutral-900 dark:text-neutral-200 font-extrabold text-center">lol_idk</h1>
        <h3 class="text-sm text-slate-400 dark:text-slate-600 mt-1 text-center">¯\_(ツ)_/¯</h3>
        <div class="absolute right-4 top-10">
            <n-button v-if="authStore.isLoggedIn" @click="logout">Sign Out</n-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { NButton, useMessage } from 'naive-ui'
    import { useAuth } from '~~/store/auth';

    const message = useMessage()
    const logout = () => {
        authStore.logout()
        message.info('Logged Out')
    }

    const authStore = useAuth()
    await authStore.fetchUser()
</script>
