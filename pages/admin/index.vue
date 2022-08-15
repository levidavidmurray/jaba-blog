<template>
    <nuxt-layout name="nav-header">
        <div class="flex flex-col max-w-md mx-auto items-center pt-10">
            <a :href="googleProviderUrl">
                <button app class="my-4 max-w-xs">Login with Google</button>
            </a>
            <input-field labelSize="74" label="Email" name="email" autofocus />
            <input-field labelSize="74" label="Password" name="password" type="password" class="mt-4" />
            <button app class="mt-8 max-w-xs">Login</button>
        </div>
    </nuxt-layout>
</template>

<script lang="ts" setup>

    const googleProviderUrl = $strapi.getProviderAuthenticationUrl('google')

</script>