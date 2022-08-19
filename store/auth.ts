import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { StrapiUser } from '@nuxtjs/strapi/dist/runtime/types'

interface AuthState {
  user: Ref<StrapiUser | null>
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => ({
    user: ref(null),
  }),
  getters: {
    isLoggedIn: (state) => state.user !== null
  },
  actions: {
    async fetchUser() {
      if (!$strapi.getToken()) return
      if (this.user) return
      this.user = await $strapi.fetchUser()
    },
    logout() {
      $strapi.logout()
      this.user = null
    }
  }
})
