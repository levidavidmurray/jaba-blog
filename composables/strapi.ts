import Strapi from 'strapi-sdk-js'

export const $strapi = new Strapi({
    url: import.meta.env.VITE_API_URL as string,
    prefix: '/api',
    store: {
        key: 'strapi_jwt',
        useLocalStorage: false,
        cookieOptions: { path: '/' }
    },
    axiosOptions: {},
})
