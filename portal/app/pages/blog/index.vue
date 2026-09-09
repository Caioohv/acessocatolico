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

    <PostGrid v-if="posts && posts.length" :posts="posts" />

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

.blog-index__empty {
  margin: 0;
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: var(--text-base);
}
</style>
