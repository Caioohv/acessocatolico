<script setup lang="ts">
/**
 * CategoryFilter — molécula de filtro do blog por categoria.
 * Renderiza uma faixa de chips (`BaseTag`) navegáveis: um "Todos" que limpa o
 * filtro e um por categoria. O chip da categoria ativa fica marcado (`active`).
 * O estado vive na query string da rota (`?categoria=<valor>`), então o filtro
 * é compartilhável e preserva outros parâmetros (como a busca textual `?busca=`).
 * Não busca dados: recebe as categorias por prop. Só tokens de design.
 */
interface Props {
  /** Categorias disponíveis (valores exatos do frontmatter). */
  categories: string[]
  /** Categoria atualmente selecionada, ou `null`/ausente para "Todos". */
  active?: string | null
}
withDefaults(defineProps<Props>(), {
  active: null,
})

const route = useRoute()

/** Rota da chip de uma categoria, preservando busca textual ativa se houver. */
function linkTo(category?: string): { path: string; query: Record<string, string> } {
  const query: Record<string, string> = {}
  if (route.query.busca && typeof route.query.busca === 'string') {
    query.busca = route.query.busca
  }
  if (category) {
    query.categoria = category
  }
  return { path: '/blog', query }
}
</script>

<template>
  <nav class="category-filter" aria-label="Filtrar por categoria">
    <ul class="category-filter__list">
      <li class="category-filter__item">
        <BaseTag :to="linkTo()" :active="!active" label="Todos" />
      </li>
      <li v-for="category in categories" :key="category" class="category-filter__item">
        <BaseTag :to="linkTo(category)" :active="active === category" :label="category" />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.category-filter__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.category-filter__item {
  display: flex;
}
</style>
