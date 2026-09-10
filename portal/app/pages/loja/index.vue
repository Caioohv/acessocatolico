<script setup lang="ts">
/**
 * /loja — página principal da lojinha de afiliados (Fase 1).
 * Lista os produtos ativos vindos do endpoint `GET /api/products`, dos mais
 * novos para os mais antigos, renderizando cada um com a molécula `ProductCard`
 * dentro do organismo `ProductGrid`. O filtro de categoria vive na query string
 * (`?categoria=<valor>`), mantendo a URL compartilhável e compatível com SSR.
 *
 * Busca de dados SSR-safe via `useFetch`: os dados são resolvidos no servidor e
 * transferidos para o cliente (sem re-fetch na hidratação). O filtro re-consulta
 * o endpoint automaticamente quando `activeCategory` muda, pois a `query` do
 * `useFetch` é reativa. Só tokens de design.
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

/** Categorias disponíveis para os chips de filtro. Consulta fixa. */
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
  <AppContainer as="main" class="loja-index">
    <header class="loja-index__header">
      <BaseHeading :level="1">Lojinha</BaseHeading>
      <p class="loja-index__lead">
        Uma seleção de terços, bíblias, livros e itens para viver a fé no dia a dia.
      </p>
    </header>

    <AffiliateNotice class="loja-index__notice" />

    <ProductCategoryFilter
      v-if="categories.length"
      :categories="categories"
      :active="activeCategory ?? null"
      class="loja-index__filter"
    />

    <ProductGrid
      :products="products"
      :has-filters="Boolean(activeCategory)"
      clear-to="/loja"
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
