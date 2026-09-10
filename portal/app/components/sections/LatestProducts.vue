<script setup lang="ts">
/**
 * LatestProducts — section da home (`/`) com uma vitrine compacta da lojinha.
 * Busca os produtos ativos em `GET /api/products` (SSR-safe via `useFetch`,
 * payload transferido para o cliente) e mostra os primeiros em destaque,
 * reusando o organismo `ProductGrid` (que compõe a molécula `ProductCard`).
 *
 * A section só renderiza quando há produtos: numa home sem banco/estoque, nada
 * aparece em vez de um bloco vazio. Um CTA leva à página completa da lojinha
 * (`/loja`). Só tokens de design.
 */

/** Quantos produtos aparecem na vitrine da home. */
const SHOWCASE_LIMIT = 3

const { data: productsResponse } = await useFetch('/api/products', {
  key: 'home-latest-products',
})

/** Primeiros produtos ativos, do mais novo para o mais antigo. */
const products = computed(() =>
  (productsResponse.value?.data ?? []).slice(0, SHOWCASE_LIMIT),
)
</script>

<template>
  <section v-if="products.length > 0" class="latest-products">
    <div class="latest-products__inner">
      <div class="latest-products__header">
        <h2 class="latest-products__title">Da lojinha</h2>
        <NuxtLink to="/loja" class="latest-products__see-all">
          Ver tudo
        </NuxtLink>
      </div>

      <p class="latest-products__lead">
        Itens de fé selecionados. Comprando por estes links você ajuda a manter o
        portal gratuito.
      </p>

      <ProductGrid :products="products" class="latest-products__grid" />

      <div class="latest-products__cta">
        <BaseButton to="/loja">Ver a lojinha</BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.latest-products {
  width: 100%;
}

.latest-products__inner {
  max-width: var(--container-portal);
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}

.latest-products__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
}

.latest-products__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-h2);
  color: var(--text-strong);
  margin: 0;
}

.latest-products__see-all {
  flex: none;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-link);
  text-decoration: none;
}

.latest-products__see-all:hover {
  color: var(--text-link-hover);
}

.latest-products__lead {
  margin: var(--space-2) 0 var(--space-6);
  max-width: var(--measure-prose);
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
}

.latest-products__cta {
  display: flex;
  justify-content: center;
  margin-top: var(--space-8);
}
</style>
