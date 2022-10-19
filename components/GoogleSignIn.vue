<template>
    <div id="g_id_onload"
        :data-client_id="googleClientId"
        data-login_uri="http://localhost:8080"
        data-auto_prompt="false">
    </div>
    <div class="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left">
    </div>
</template>

<script lang="ts" setup>
    const googleClientId = useRuntimeConfig().public.google.clientId
</script>