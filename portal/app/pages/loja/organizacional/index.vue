<script setup lang="ts">
/**
 * /loja/organizacional — loja voltada a quem organiza eventos (atacado e itens
 * similares). Espelha `/loja`, mas consulta a fonte "organizacional": só entram
 * produtos ativos com `showOrg`. Página NÃO divulgada — o link é compartilhado
 * diretamente com quem organiza; por isso pedimos aos buscadores para não indexá-la.
 *
 * Mesma mecânica SSR-safe de `/loja`: filtro de categoria na query string
 * (`?categoria=<valor>`), `useFetch` reativo que re-consulta ao trocar de categoria.
 */
const route = useRoute()

/** Categoria ativa vinda da query string; `undefined` quando "Todas". */
const activeCategory = computed(() => {
  const value = route.query.categoria
  return typeof value === 'string' && value.length > 0 ? value : undefined
})

/** Produtos da fonte organizacional — re-consultados quando a categoria muda. */
const { data: productsResponse } = await useFetch('/api/products', {
  query: { categoria: activeCategory, fonte: 'organizacional' },
})

/** Categorias disponíveis nesta fonte para os chips de filtro. */
const { data: categoriesResponse } = await useFetch('/api/products/categories', {
  query: { fonte: 'organizacional' },
})

const products = computed(() => productsResponse.value?.data ?? [])
const categories = computed(() => categoriesResponse.value?.data ?? [])

useSeoMeta({
  title: 'Loja organizacional — Acesso Católico',
  description:
    'Itens em quantidade para encontros, retiros e eventos católicos. Seleção voltada a quem organiza.',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <main class="loja-page">
    <StoreHero
      title="Loja organizacional"
      lead="Itens em quantidade para encontros, retiros e eventos. Uma seleção pensada para quem organiza a vida da comunidade."
    >
      <AffiliateNotice />
    </StoreHero>

    <AppContainer as="section" class="loja-page__content">
      <ProductCategoryFilter
        v-if="categories.length"
        :categories="categories"
        :active="activeCategory ?? null"
        base-path="/loja/organizacional"
        class="loja-page__filter"
      />

      <!-- Sem filtro: trilhos por categoria (um carrossel para cada). -->
      <ProductCategoryRailsSection
        v-if="!activeCategory && products.length"
        :products="products"
        :categories="categories"
        base-path="/loja/organizacional"
      />

      <!-- Com filtro: grade completa da categoria escolhida. -->
      <ProductGrid
        v-else
        :products="products"
        :has-filters="Boolean(activeCategory)"
        clear-to="/loja/organizacional"
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
