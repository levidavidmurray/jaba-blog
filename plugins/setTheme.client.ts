export default defineNuxtPlugin((nuxtApp) => {

    const isDark = useDark()

    // SSR is causing dark mode hydration issues with naive-ui
    // This fix quickly toggles dark mode
    nuxtApp.hook('page:finish', () => {
        setTimeout(() => {
            const prefersDark = usePreferredDark()
            isDark.value = false

            setTimeout(() => {
                isDark.value = prefersDark.value
            }, 0)
        }, 0)
    })

    return { 
        provide: {
            isDark
        }
    }

})
