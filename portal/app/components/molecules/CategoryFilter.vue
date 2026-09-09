<script setup lang="ts">
/**
 * CategoryFilter — molécula de filtro do blog por categoria.
 * Renderiza uma faixa de chips (`BaseTag`) navegáveis: um "Todos" que limpa o
 * filtro e um por categoria. O chip da categoria ativa fica marcado (`active`).
 * O estado vive na query string da rota (`?categoria=<valor>`), então o filtro
 * é compartilhável, sobrevive ao SSR e o índice re-consulta o Nuxt Content
 * nativamente. Não busca dados: recebe as categorias por prop. Só tokens de design.
 */
interface Props {
  /** Categorias disponíveis (valores exatos do frontmatter). */
  categories: string[]
  /** Categoria atualmente selecionada, ou `null`/ausente para "Todos". */
  active?: string | null
}
const props = withDefaults(defineProps<Props>(), {
  active: null,
})

/** Rota da chip de uma categoria (ou `/blog` para "Todos"). */
function linkTo(category?: string): string {
  return category ? `/blog?categoria=${encodeURIComponent(category)}` : '/blog'
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
