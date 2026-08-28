// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', 'swiper/css', 'swiper/css/navigation', 'swiper/css/pagination'],
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxt/image'],
  runtimeConfig: {

    tmdbAccessToken: process.env.NUXT_TMDB_ACCESS_TOKEN,

    tmdbApiKey: process.env.NUXT_TMDB_API_KEY,

  },

})
