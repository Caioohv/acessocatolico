// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui'
  ],

  css: [
    "assets/styles/main.css",
    "assets/styles/elements.css",
    "assets/styles/components.css",
  ],

  srcDir: 'app/',

  ui: {
    theme: {
      colors: [
        'primary',
        'primary-light',
        'primary-lighter',
        'secondary',
        'secondary-light',
        'ui-dark',
        'ui-darker',
        'ui-light',
        'ui-lighter',
      ]
    }
  }
})








