// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  // Atomic Design: componentes auto-importados pelo nome puro (<AppContainer>),
  // sem prefixo de diretório (atoms/molecules/organisms/sections).
  components: [{ path: '~/components', pathPrefix: false }],
  // Webfonts self-hospedadas pelo @nuxt/fonts (baixa do Google no build,
  // serve local — sem request externo render-blocking). Famílias e pesos
  // espelham os tokens em app/assets/css/tokens/typography.css.
  fonts: {
    families: [
      { name: 'Spectral', provider: 'google', weights: [400, 500, 600, 700], styles: ['normal', 'italic'] },
      { name: 'Figtree', provider: 'google', weights: [400, 500, 600, 700, 800] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500] },
    ],
  },
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
      // Favicon = mesma marca do nav (logo-mark.svg). SVG para navegadores
      // modernos; PNG 32px e .ico (16/32/48) como fallback legado. Todos
      // gerados a partir do mesmo ícone.
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/assets/logo-mark.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  compatibilityDate: '2024-04-03',
})