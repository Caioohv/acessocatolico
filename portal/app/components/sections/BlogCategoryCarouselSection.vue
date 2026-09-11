<script setup lang="ts">
/**
 * BlogCategoryCarouselSection — carrosséis temáticos por categoria do /blog.
 * Para cada categoria, um cabeçalho com o título e o link "Ver todos (X) →"
 * (que leva à listagem completa filtrada, `/blog?categoria=...`) sobre um
 * `PostCarousel`. Recebe as categorias já agrupadas por prop; não busca dados.
 * Só tokens de design.
 */
import type { Post } from '../molecules/PostCard.vue'

/** Uma linha de categoria: nome, total real e os posts exibidos no trilho. */
export interface CategoryRail {
  /** Nome da categoria (valor exato do frontmatter). */
  category: string
  /** Total de posts na categoria (pode exceder os exibidos no trilho). */
  total: number
  /** Posts exibidos no carrossel. */
  posts: Post[]
}

interface Props {
  /** Categorias a exibir como carrosséis. */
  categories?: CategoryRail[]
}
withDefaults(defineProps<Props>(), {
  categories: () => [],
})

/** Rota da listagem completa filtrada por categoria. */
function seeAllLink(category: string): string {
  return `/blog?categoria=${encodeURIComponent(category)}`
}
</script>

<template>
  <div v-if="categories.length" class="blog-cats">
    <section
      v-for="row in categories"
      :key="row.category"
      class="blog-cats__row"
      :aria-label="row.category"
    >
      <header class="blog-cats__header">
        <BaseHeading :level="2" class="blog-cats__title">{{ row.category }}</BaseHeading>
        <NuxtLink :to="seeAllLink(row.category)" class="blog-cats__see-all">
          Ver todos ({{ row.total }})
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </header>

      <PostCarousel :posts="row.posts" :label="row.category" />
    </section>
  </div>
</template>

<style scoped>
.blog-cats {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.blog-cats__header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-2);
}

.blog-cats__title {
  margin: 0;
}

.blog-cats__see-all {
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

.blog-cats__see-all:hover {
  color: var(--text-link-hover);
  text-decoration: underline;
}

.blog-cats__see-all:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}
</style>
