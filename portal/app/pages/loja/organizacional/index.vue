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
  <AppContainer as="main" class="loja-index">
    <header class="loja-index__header">
      <BaseHeading :level="1">Loja organizacional</BaseHeading>
      <p class="loja-index__lead">
        Itens em quantidade para encontros, retiros e eventos. Uma seleção pensada
        para quem organiza a vida da comunidade.
      </p>
    </header>

    <AffiliateNotice class="loja-index__notice" />

    <ProductCategoryFilter
      v-if="categories.length"
      :categories="categories"
      :active="activeCategory ?? null"
      base-path="/loja/organizacional"
      class="loja-index__filter"
    />

    <ProductGrid
      :products="products"
      :has-filters="Boolean(activeCategory)"
      clear-to="/loja/organizacional"
      class="loja-index__grid"
    />
  </AppContainer>
</template>

<style scoped>
.loja-index {
  padding-block: var(--space-10) var(--space-16);
}

.loja-index__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.loja-index__lead {
  margin: 0;
  max-width: var(--measure-prose);
  color: var(--text-body);
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
}

.loja-index__notice {
  margin-bottom: var(--space-6);
}

.loja-index__filter {
  margin-bottom: var(--space-8);
}

@media (min-width: 48rem) {
  .loja-index__filter {
    margin-bottom: var(--space-10);
  }
}
</style>
