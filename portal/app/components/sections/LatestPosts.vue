<script setup lang="ts">
/**
 * LatestPosts — section da home com os posts mais recentes do blog.
 * Consulta a collection `blog` do Nuxt Content (`date` decrescente), pega os
 * 3 primeiros e reaproveita o organism `PostGrid` para renderizá-los. Traz um
 * link "Ver o blog" para `/blog` (reusa `BaseButton`). Roda no SSR via
 * `useAsyncData`; o conteúdo fica contido por `AppContainer`. Só tokens de
 * design — nada de valores hardcoded.
 */

/** Os 3 posts mais recentes da collection `blog`. */
const { data: posts } = await useAsyncData('home-latest-posts', () =>
  queryCollection('blog').order('date', 'DESC').limit(3).all(),
)
</script>

<template>
  <section v-if="posts && posts.length" class="latest-posts">
    <AppContainer class="latest-posts__inner">
      <header class="latest-posts__header">
        <BaseHeading :level="2">Do blog</BaseHeading>
        <p class="latest-posts__lead">
          Reflexões, guias e conteúdo para viver e aprofundar a fé no dia a dia.
        </p>
      </header>

      <PostGrid :posts="posts" />

      <div class="latest-posts__actions">
        <BaseButton to="/blog" variant="secondary">Ver o blog</BaseButton>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
.latest-posts__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.latest-posts__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.latest-posts__lead {
  margin: 0;
  max-width: var(--measure-prose);
  color: var(--text-body);
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
}

.latest-posts__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
</style>
