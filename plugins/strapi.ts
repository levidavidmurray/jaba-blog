import { defineNuxtPlugin } from '#app'
import Strapi from 'strapi-sdk-js'

export default defineNuxtPlugin(() => {
    const strapi = new Strapi({
        url: 'http://localhost:1337',
        prefix: '/api',
        axiosOptions: {},
    })

    return {
        provide: {
            strapi
        }
    }
})
