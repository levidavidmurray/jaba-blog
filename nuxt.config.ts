import { defineNuxtConfig } from 'nuxt'
import ViteComponents from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineNuxtConfig({
    ssr: true,
    meta: {
        title: process.env.NUXT_SITE_TITLE,
        link: [
            { rel: 'preconnect', href: 'https://rsms.me' },
            { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
            { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
            { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        ],
        script: [
            { src: 'https://accounts.google.com/gsi/client', async: true, defer: true },
        ],
    },
    build: {
        transpile:
            process.env.NODE_ENV === 'production'
                ? [
                    'naive-ui',
                    'date-fns',
                    'vueuc',
                    '@css-render/vue3-ssr',
                    '@juggle/resize-observer',
                ]
                : ['@juggle/resize-observer']
    },
    css: [
        'assets/css/global.css',
    ],
    // useRuntimeConfig().public.google.clientId
    runtimeConfig: {
        public: {
            SITE_NAME: process.env.SITE_NAME,
            SITE_TITLE: process.env.SITE_TITLE,
            SITE_DESCRIPTION: process.env.SITE_DESCRIPTION,
            SITE_SEO_DESCRIPTION: process.env.SITE_SEO_DESCRIPTION,
            SHRUG: process.env.SHRUG,
            SHRUG_ESC: process.env.SHRUG_ESC,
            TWITTER_PROFILE: process.env.TWITTER_PROFILE,
            TWITTER_HANDLE: process.env.TWITTER_HANDLE,
            TWITTER_CARD_IMAGE: process.env.TWITTER_CARD_IMAGE,
            google: {
                clientId: process.env.GOOGLE_CLIENT_ID || '1234',
            }
        },
    },
    buildModules: [
        '@pinia/nuxt',
    ],
    modules: [
        '@nuxtjs/strapi',
        'nuxt-windicss',
        'unplugin-icons/nuxt',
        '@vueuse/nuxt',
        [
            '@intlify/nuxt3',
            {
                localeDir: 'locales',
                vueI18n: {
                    locale: 'en'
                }
            }
        ]
    ],
    windicss: {
        analyze: true,
    },
    vite: {
        optimizeDeps: {
            include:
                process.env.NODE_ENV === 'development'
                    ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
                    : []
        },
        plugins: [
            ViteComponents({
                resolvers: [
                    IconsResolver({
                        componentPrefix: '',
                    }),
                ],
                dts: true,
            }),
        ],
    },
})
