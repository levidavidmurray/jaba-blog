<template>
    <div class="pt-8 pb-4 relative">
        <h1 class="text-3xl text-neutral-900 dark:text-neutral-200 font-extrabold text-center">{{ SITE_NAME }}</h1>
        <span class="block text-sm text-neutral-400 dark:text-neutral-500 mt-2 text-center">{{ SHRUG }}</span>
        <p class="text-center font-medium">{{ SITE_DESCRIPTION }}</p>
        <div class="absolute right-4 top-10 flex items-center">
            <a v-if="TWITTER_PROFILE" :href="TWITTER_PROFILE" target="_blank" class="mr-4 text-lg hover:text-lightBlue-400 dark:hover:opacity-70">
                <simple-icons:twitter />
            </a>
            <n-button v-if="authStore.isLoggedIn" @click="logout">Sign Out</n-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { NButton, useMessage } from 'naive-ui'
    import { useAuth } from '~~/store/auth'

    const { TWITTER_PROFILE, SHRUG, SITE_NAME, SITE_DESCRIPTION } = useConstants()

    const isForPublic = $isForPublic

    console.log('$isForPublic', $isForPublic)

    const message = useMessage()
    const logout = () => {
        authStore.logout()
        message.info('Logged Out')
    }

    const authStore = useAuth()
    await authStore.fetchUser()
</script>
