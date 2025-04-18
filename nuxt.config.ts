// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/',
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: [
    '@/assets/styles/global.css'
  ],

  modules: ['@nuxtjs/tailwindcss']
})