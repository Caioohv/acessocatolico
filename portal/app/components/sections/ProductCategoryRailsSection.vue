<script setup lang="ts">
/**
 * ProductCategoryRailsSection — trilhos por categoria da lojinha.
 * Espelha os carrosséis temáticos do /blog: para cada categoria, um cabeçalho
 * com o título e o link "Ver todos (X) →" (que leva à listagem filtrada,
 * `?categoria=...`) sobre um `ProductCarousel`. Recebe os produtos e as
 * categorias prontos por prop e agrupa localmente — não busca dados.
 * Só tokens de design.
 */
import type { Product } from '../molecules/ProductCard.vue'

/** Categoria da loja — espelha `GET /api/products/categories`. */
export interface ProductCategory {
  name: string
  count?: number
}

interface Props {
  /** Produtos exibidos (a lista completa, sem filtro de categoria aplicado). */
  products?: Product[]
  /** Categorias na ordem de exibição dos trilhos. */
  categories?: ProductCategory[]
  /** Rota base dos links "Ver todos" (ex.: "/loja"). */
  basePath?: string
}
const props = withDefaults(defineProps<Props>(), {
  products: () => [],
  categories: () => [],
  basePath: '/loja',
})

/** Uma linha de categoria: identidade + os produtos daquela categoria. */
interface Rail {
  name: string
  total: number
  products: Product[]
}

/** Agrupa os produtos por categoria, seguindo a ordem de `categories`. */
const rails = computed<Rail[]>(() =>
  props.categories
    .map((category) => {
      const items = props.products.filter((product) => product.category === category.name)
      return { name: category.name, total: category.count ?? items.length, products: items }
    })
    .filter((rail) => rail.products.length > 0),
)

/** Rota da listagem completa filtrada por categoria. */
function seeAllLink(category: string): string {
  return `${props.basePath}?categoria=${encodeURIComponent(category)}`
}
</script>

<template>
  <div v-if="rails.length" class="product-rails">
    <section
      v-for="rail in rails"
      :key="rail.name"
      class="product-rails__row"
      :aria-label="rail.name"
    >
      <header class="product-rails__header">
        <BaseHeading :level="2" class="product-rails__title">{{ rail.name }}</BaseHeading>
        <NuxtLink :to="seeAllLink(rail.name)" class="product-rails__see-all">
          Ver todos ({{ rail.total }})
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </header>

      <ProductCarousel :products="rail.products" :label="rail.name" />
    </section>
  </div>
</template>

<style scoped>
.product-rails {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.product-rails__header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-2);
}

.product-rails__title {
  margin: 0;
}

.product-rails__see-all {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--text-link);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  text-decoration: none;
  white-space: nowrap;
  border-radius: var(--radius-sm);
}

.product-rails__see-all:hover {
  color: var(--text-link-hover);
  text-decoration: underline;
}

.product-rails__see-all:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}
</style>
