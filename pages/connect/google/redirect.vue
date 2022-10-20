<template>
    <div>
    </div>
</template>

<script lang="ts" setup>

const login = async () => {
    try {
        await $strapi.authenticateProvider("google")
    } catch (error) {
        // useMessage().error()
    }
    if (process.client) {
        navigateTo('/', {replace: true})
    }
}

login()
</script>