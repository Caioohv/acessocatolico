<script setup lang="ts">
/**
 * PostGrid — organism que dispõe uma lista de posts em grade mobile-first.
 * Recebe a lista de posts por prop e renderiza cada um com a molécula
 * `PostCard`. Grade: 1 coluna por padrão (~360px), 2 colunas a partir de
 * `--bp-md` (48rem) e 3 a partir de `--bp-lg` (64rem), via
 * `grid-template-columns` em media queries `min-width`. Sem overflow
 * horizontal. Só tokens de design.
 */
import type { Post } from '../molecules/PostCard.vue'

interface Props {
  /** Posts a serem exibidos na grade. */
  posts?: Post[]
}
withDefaults(defineProps<Props>(), {
  posts: () => [],
})
</script>

<template>
  <ul class="post-grid">
    <li v-for="post in posts" :key="post.path" class="post-grid__item">
      <PostCard :post="post" />
    </li>
  </ul>
</template>

<style scoped>
.post-grid {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: 1fr;
  margin: 0;
  padding: 0;
  list-style: none;
}

.post-grid__item {
  display: flex;
}

.post-grid__item > * {
  width: 100%;
}

/* --- Telas maiores -------------------------------------------------------- */
@media (min-width: 48rem) {
  .post-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 64rem) {
  .post-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
