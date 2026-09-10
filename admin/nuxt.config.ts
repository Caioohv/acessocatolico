// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  compatibilityDate: '2024-04-03',
})
