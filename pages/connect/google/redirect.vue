<template>
    <div>
        Google Callback!
    </div>
</template>

<script lang="ts" setup>

const login = async () => {
    try {
        const res = await $strapi.authenticateProvider("google")
        console.log(res)
    } catch (error) {
        // useMessage().error()
    }
    if (process.client) {
        navigateTo('/')
    }
}

login()
</script>