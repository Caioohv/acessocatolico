<script setup lang="ts">
/**
 * /loja — página principal da lojinha de afiliados (Fase 1).
 * Lista os produtos ativos vindos do endpoint `GET /api/products`, dos mais
 * novos para os mais antigos. O cabeçalho (título, chamada e aviso de
 * transparência) vive numa faixa roxa (`StoreHero`).
 *
 * Duas apresentações do acervo, ambas SSR-safe:
 * - Sem categoria selecionada (`?categoria=` ausente): trilhos por categoria
 *   (`ProductCategoryRailsSection`), um carrossel para cada categoria.
 * - Com categoria selecionada: a grade completa filtrada (`ProductGrid`).
 *
 * O filtro vive na query string (`?categoria=<valor>`), mantendo a URL
 * compartilhável. O `useFetch` é reativo: re-consulta ao trocar de categoria.
 * Só tokens de design.
 */
const route = useRoute()

/** Categoria ativa vinda da query string; `undefined` quando "Todas". */
const activeCategory = computed(() => {
  const value = route.query.categoria
  return typeof value === 'string' && value.length > 0 ? value : undefined
})

/** Produtos exibidos — re-consultados quando a categoria muda. */
const { data: productsResponse } = await useFetch('/api/products', {
  query: { categoria: activeCategory },
})

/** Categorias disponíveis para os chips de filtro e os trilhos. Consulta fixa. */
const { data: categoriesResponse } = await useFetch('/api/products/categories')

const products = computed(() => productsResponse.value?.data ?? [])
const categories = computed(() => categoriesResponse.value?.data ?? [])

useSeoMeta({
  title: 'Lojinha — Acesso Católico',
  description:
    'Terços, bíblias, livros e itens de fé selecionados. As compras por estes links ajudam a manter o Acesso Católico gratuito.',
  ogTitle: 'Lojinha — Acesso Católico',
  ogDescription:
    'Terços, bíblias, livros e itens de fé selecionados. As compras por estes links ajudam a manter o Acesso Católico gratuito.',
  ogType: 'website',
})
</script>

<template>
  <main class="loja-page">
    <StoreHero
      title="Lojinha"
      lead="Uma seleção de terços, bíblias, livros e itens para viver a fé no dia a dia."
    >
      <AffiliateNotice />
    </StoreHero>

    <AppContainer as="section" class="loja-page__content">
      <ProductCategoryFilter
        v-if="categories.length"
        :categories="categories"
        :active="activeCategory ?? null"
        class="loja-page__filter"
      />

      <!-- Sem filtro: trilhos por categoria (um carrossel para cada). -->
      <ProductCategoryRailsSection
        v-if="!activeCategory && products.length"
        :products="products"
        :categories="categories"
        base-path="/loja"
      />

      <!-- Com filtro: grade completa da categoria escolhida. -->
      <ProductGrid
        v-else
        :products="products"
        :has-filters="Boolean(activeCategory)"
        clear-to="/loja"
      />
    </AppContainer>
  </main>
</template>

<style scoped>
.loja-page {
  padding-bottom: var(--space-16);
}

.loja-page__content {
  padding-top: var(--space-8);
}

.loja-page__filter {
  margin-bottom: var(--space-8);
}

@media (min-width: 48rem) {
  .loja-page__content {
    padding-top: var(--space-10);
  }

  .loja-page__filter {
    margin-bottom: var(--space-10);
  }
}
</style>
