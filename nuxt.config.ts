// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt'
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
        'ui-darker',
        'ui-dark',
        'ui',
        'ui-light',
        'ui-lighter',
      ]
    }
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    public: {
      appName: 'AcessoCatólico',
      appVersion: '1.0.0'
    }
  },
})








