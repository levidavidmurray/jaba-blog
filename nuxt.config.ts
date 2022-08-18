import { defineNuxtConfig } from 'nuxt'
import ViteComponents from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineNuxtConfig({
  ssr: true,
  meta: {
    title: 'lol_idk | Blog',
    link: [
      { rel: 'preconnect', href: 'https://rsms.me' },
      { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
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
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer',
          ]
        : ['@juggle/resize-observer']
  },
  css: [
    'assets/css/global.css',
  ],
  runtimeConfig: {
    public: {
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
