<template>
    <nuxt-layout name="nav-header">
        <div class="flex flex-col max-w-md mx-auto items-center pt-10">
            <a :href="googleProviderUrl">
                <n-button icon-placement="right">
                    <template #icon>
                        <simple-icons:google />
                    </template>
                    Login with Google
                </n-button>
            </a>

            <!-- Hidden for now -->
            <div v-if="false">
                <input-field labelSize="74" label="Email" name="email" autofocus />
                <input-field labelSize="74" label="Password" name="password" type="password" class="mt-4" />
                <button app class="mt-8 max-w-xs">Login</button>
            </div>
        </div>
    </nuxt-layout>
</template>

<script lang="ts" setup>

import { NButton } from 'naive-ui'

const googleProviderUrl = $strapi.getProviderAuthenticationUrl('google')

</script>