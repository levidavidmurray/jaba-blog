import Strapi from 'strapi-sdk-js'

const strapi = new Strapi({
    url: 'http://localhost:1337',
    prefix: '/api',
    axiosOptions: {},
})

export const useStrapi = (): Strapi => {
    // const { $strapi } = useNuxtApp()
    return strapi
}
