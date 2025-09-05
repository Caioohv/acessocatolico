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
    '@pinia/nuxt',
    '@nuxtjs/supabase'
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
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/dashboard',
      exclude: ['/', '/sobre', '/igrejas'] // Páginas públicas
    }
  },
})








