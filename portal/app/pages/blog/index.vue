<script setup lang="ts">
/**
 * /blog — índice do blog.
 * Lista os posts da collection `blog` do Nuxt Content, dos mais recentes para
 * os mais antigos (`date` decrescente), renderizando cada um com a molécula
 * `PostCard`. A busca roda no SSR via `useAsyncData`. Só tokens de design.
 */
const { data: posts } = await useAsyncData('blog-index', () =>
  queryCollection('blog').order('date', 'DESC').all(),
)

useSeoMeta({
  title: 'Blog',
  description:
    'Reflexões, guias e conteúdo católico para viver e aprofundar a fé no dia a dia.',
})
</script>

<template>
  <AppContainer as="main" class="blog-index">
    <header class="blog-index__header">
      <BaseHeading :level="1">Blog</BaseHeading>
      <p class="blog-index__lead">
        Reflexões, guias e conteúdo para viver e aprofundar a fé no dia a dia.
      </p>
    </header>

    <ul v-if="posts && posts.length" class="blog-index__grid">
      <li v-for="post in posts" :key="post.path" class="blog-index__item">
        <PostCard :post="post" />
      </li>
    </ul>

    <p v-else class="blog-index__empty">Nenhum post publicado ainda.</p>
  </AppContainer>
</template>

<style scoped>
.blog-index {
  padding-block: var(--space-10) var(--space-16);
}

.blog-index__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}

.blog-index__lead {
  margin: 0;
  max-width: var(--measure-prose);
  color: var(--text-body);
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
}

.blog-index__grid {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: 1fr;
  margin: 0;
  padding: 0;
  list-style: none;
}

.blog-index__item {
  display: flex;
}

.blog-index__item > * {
  width: 100%;
}

.blog-index__empty {
  margin: 0;
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: var(--text-base);
}

/* --- Telas maiores -------------------------------------------------------- */
@media (min-width: 48rem) {
  .blog-index__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 64rem) {
  .blog-index__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
