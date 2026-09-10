<script setup lang="ts">
/**
 * ProductGrid — organism que dispõe os produtos da lojinha em grade mobile-first.
 * Recebe a lista de produtos por prop e renderiza cada um com a molécula
 * `ProductCard`. Grade fluida: 1 coluna por padrão (~360px), 2 colunas a partir
 * de `--bp-md` (48rem) e 3 a partir de `--bp-lg` (64rem), via
 * `grid-template-columns` em media queries `min-width`. Sem overflow horizontal.
 *
 * Lista vazia: mostra uma mensagem amigável. Quando há filtros/busca ativos
 * (`hasFilters`), a mensagem reconhece isso e oferece um link para limpar os
 * filtros (`clearTo`, padrão `/loja`). Só tokens de design.
 */
import type { Product } from '../molecules/ProductCard.vue'

interface Props {
  /** Produtos a serem exibidos na grade. */
  products?: Product[]
  /** Há filtros ou busca ativos? Ajusta a mensagem de estado vazio. */
  hasFilters?: boolean
  /** Rota que limpa filtros/busca (destino do botão do estado vazio). */
  clearTo?: string
}
const props = withDefaults(defineProps<Props>(), {
  products: () => [],
  hasFilters: false,
  clearTo: '/loja',
})

const isEmpty = computed(() => props.products.length === 0)
</script>

<template>
  <ul v-if="!isEmpty" class="product-grid">
    <li v-for="product in products" :key="product.id" class="product-grid__item">
      <ProductCard :product="product" />
    </li>
  </ul>

  <div v-else class="product-grid__empty">
    <p class="product-grid__empty-text">
      <template v-if="hasFilters">
        Nenhum produto encontrado com esses filtros.
      </template>
      <template v-else>
        Nenhum produto disponível por aqui ainda. Volte em breve.
      </template>
    </p>

    <BaseButton
      v-if="hasFilters"
      variant="secondary"
      :to="clearTo"
      class="product-grid__clear-button"
    >
      Limpar filtros
    </BaseButton>
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: 1fr;
  margin: 0;
  padding: 0;
  list-style: none;
}

.product-grid__item {
  display: flex;
}

.product-grid__item > * {
  width: 100%;
}

/* --- Estado vazio --------------------------------------------------------- */
.product-grid__empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
  padding-block: var(--space-8);
}

.product-grid__empty-text {
  margin: 0;
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
}

.product-grid__clear-button {
  margin-top: var(--space-2);
}

/* --- Telas maiores -------------------------------------------------------- */
@media (min-width: 48rem) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 64rem) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
