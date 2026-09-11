// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    'nuxt-auth-utils',
  ],
  devtools: { enabled: true },
  // Atomic Design: componentes auto-importados pelo nome puro (<MetricCard>,
  // <ProductForm>), sem prefixo de diretório (molecules/organisms). Espelha a
  // config do portal — sem isso o Nuxt registraria <MoleculesMetricCard> etc.
  // e as referências sem prefixo nas páginas não renderizam nada.
  components: [{ path: '~/components', pathPrefix: false }],
  // Design tokens compartilhados (mesma fonte de verdade do portal): cores,
  // espaçamento, tipografia, efeitos e reset. Nada hardcoded — sempre var(--*).
  css: ['~/assets/css/main.css'],
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
  // URL do portal público, usada pelo botão "Ir ao site" do painel.
  // Sobrescreva em produção com NUXT_PUBLIC_SITE_URL.
  runtimeConfig: {
    public: {
      siteUrl: 'https://acessocatolico.com.br',
    },
  },
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  compatibilityDate: '2024-04-03',
})
