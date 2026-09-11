<script setup lang="ts">
/**
 * ProductCategoryFilter — molécula de filtro da lojinha por categoria (Fase 1).
 * Renderiza uma faixa horizontal de chips (`BaseTag`): um "Todas" que limpa o
 * filtro e um por categoria da loja. No mobile a faixa rola na horizontal (sem
 * quebra de linha); a partir de telas médias os chips passam a quebrar em linhas.
 * O chip da categoria ativa fica marcado (`active` → estado preenchido e
 * `aria-current`, herdados do `BaseTag`).
 *
 * O estado vive na query string da rota (`?categoria=<valor>`), então o filtro é
 * compartilhável, sobrevive ao SSR e preserva a busca textual (`?busca=`) ativa.
 * Não busca dados: recebe as categorias por prop. Só tokens de design.
 */

/** Categoria da loja — espelha o contrato de `GET /api/products/categories`. */
export interface ProductCategory {
  /** Nome da categoria; serve de rótulo e de valor do parâmetro `?categoria=`. */
  name: string
  /** Quantidade de produtos ativos na categoria (opcional para exibição). */
  count?: number
}

interface Props {
  /** Categorias disponíveis (valores exatos, como vêm do endpoint). */
  categories: ProductCategory[]
  /** Categoria atualmente selecionada, ou `null`/ausente para "Todas". */
  active?: string | null
  /** Rota base dos chips (ex.: "/loja" ou "/loja/organizacional"). */
  basePath?: string
}
const props = withDefaults(defineProps<Props>(), {
  active: null,
  basePath: '/loja',
})

const route = useRoute()

/** Rota da chip de uma categoria, preservando a busca textual ativa se houver. */
function linkTo(category?: string): { path: string; query: Record<string, string> } {
  const query: Record<string, string> = {}
  if (route.query.busca && typeof route.query.busca === 'string') {
    query.busca = route.query.busca
  }
  if (category) {
    query.categoria = category
  }
  return { path: props.basePath, query }
}
</script>

<template>
  <nav class="product-category-filter" aria-label="Filtrar por categoria">
    <ul class="product-category-filter__list">
      <li class="product-category-filter__item">
        <BaseTag :to="linkTo()" :active="!active" label="Todas" />
      </li>
      <li
        v-for="category in categories"
        :key="category.name"
        class="product-category-filter__item"
      >
        <BaseTag :to="linkTo(category.name)" :active="active === category.name" :label="category.name" />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
/* Mobile-first: faixa rolável na horizontal, sem quebra de linha. */
.product-category-filter__list {
  display: flex;
  flex-wrap: nowrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  /* Espaço para o foco/box-shadow das chips não ficar cortado na rolagem. */
  padding-bottom: var(--space-1);
  scrollbar-width: none;
}

.product-category-filter__list::-webkit-scrollbar {
  display: none;
}

.product-category-filter__item {
  display: flex;
  flex: 0 0 auto;
}

/* A partir de telas médias os chips quebram em linhas (sem rolagem). */
@media (min-width: 48rem) {
  .product-category-filter__list {
    flex-wrap: wrap;
    overflow-x: visible;
    padding-bottom: 0;
  }

  .product-category-filter__item {
    flex: 0 0 auto;
  }
}
</style>
