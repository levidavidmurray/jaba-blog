<template>
<div>
    <nuxt-layout>
        <n-config-provider :theme="$isDark ? darkTheme : lightTheme">
            <n-message-provider>
                <n-dialog-provider>
                    <nuxt-page />
                </n-dialog-provider>
            </n-message-provider>
        </n-config-provider>
    </nuxt-layout>
</div>
</template>

<script lang="ts" setup>
import { NMessageProvider, NConfigProvider, NDialogProvider } from 'naive-ui';
import { darkTheme, lightTheme } from 'naive-ui';

const { $isDark } = useNuxtApp()

</script>