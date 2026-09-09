<script setup lang="ts">
/**
 * /blog/[...slug] — página de um post do blog.
 * Carrega o post da collection `blog` pela rota atual e renderiza o corpo
 * markdown com `<ContentRenderer>`. O cabeçalho reaproveita `BaseHeading`
 * (título) e `PostMeta` (categoria + data); a capa usa `NuxtImg`. Um post
 * inexistente devolve 404. Só tokens de design.
 */
const route = useRoute()

const { data: post } = await useAsyncData(`blog-${route.path}`, () =>
  queryCollection('blog').path(route.path).first(),
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post não encontrado',
    fatal: true,
  })
}

useSeoMeta({
  title: () =>
    post.value ? `${post.value.title} — Acesso Católico` : 'Acesso Católico',
  description: () => post.value?.description,
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.description,
  ogImage: () => post.value?.cover,
  ogType: 'article',
})
</script>

<template>
  <AppContainer v-if="post" as="main" size="prose" class="post">
    <header class="post__header">
      <PostMeta :category="post.category" :date="post.date" />
      <BaseHeading :level="1">{{ post.title }}</BaseHeading>
      <p v-if="post.description" class="post__lead">{{ post.description }}</p>
    </header>

    <figure v-if="post.cover" class="post__cover">
      <NuxtImg
        :src="post.cover"
        :alt="post.coverAlt ?? ''"
        class="post__cover-img"
        sizes="100vw md:768px"
      />
    </figure>

    <ContentRenderer :value="post" class="post__body" />
  </AppContainer>
</template>

<style scoped>
.post {
  padding-block: var(--space-10) var(--space-16);
}

.post__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}

.post__lead {
  margin: 0;
  color: var(--text-body);
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
}

.post__cover {
  margin: 0 0 var(--space-8);
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--surface-sunken);
}

.post__cover-img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

/* --- Corpo markdown (saída do ContentRenderer) ---------------------------- */
.post__body {
  color: var(--text-body);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
}

.post__body :deep(h2) {
  margin: var(--space-10) 0 var(--space-3);
  color: var(--text-strong);
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  text-wrap: balance;
}

.post__body :deep(h3) {
  margin: var(--space-8) 0 var(--space-2);
  color: var(--text-strong);
  font-family: var(--font-display);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
}

.post__body :deep(h4) {
  margin: var(--space-6) 0 var(--space-2);
  color: var(--text-strong);
  font-family: var(--font-display);
  font-size: var(--text-h4);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
}

.post__body :deep(p) {
  margin: 0 0 var(--space-5);
}

.post__body :deep(a) {
  color: var(--text-link);
  text-decoration: underline;
}

.post__body :deep(a:hover) {
  color: var(--text-link-hover);
}

.post__body :deep(ul),
.post__body :deep(ol) {
  margin: 0 0 var(--space-5);
  padding-left: var(--space-6);
}

.post__body :deep(li) {
  margin-bottom: var(--space-2);
}

.post__body :deep(blockquote) {
  margin: var(--space-6) 0;
  padding: var(--space-2) var(--space-5);
  border-left: var(--border-width) solid var(--brand);
  color: var(--text-subtle);
  font-style: italic;
}

.post__body :deep(strong) {
  color: var(--text-strong);
  font-weight: var(--weight-semibold);
}

.post__body :deep(code) {
  padding: 0.15em 0.4em;
  border-radius: var(--radius-sm);
  background: var(--surface-sunken);
  color: var(--text-strong);
  font-family: var(--font-mono);
  font-size: 0.9em;
  letter-spacing: var(--tracking-mono);
}

.post__body :deep(pre) {
  margin: var(--space-6) 0;
  padding: var(--space-4) var(--space-5);
  overflow-x: auto;
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface-sunken);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

.post__body :deep(pre code) {
  padding: 0;
  border-radius: 0;
  background: transparent;
  color: inherit;
  font-size: inherit;
}

.post__body :deep(hr) {
  margin: var(--space-10) 0;
  border: 0;
  border-top: var(--border-width) solid var(--border);
}

.post__body :deep(table) {
  width: 100%;
  margin: var(--space-6) 0;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.post__body :deep(th),
.post__body :deep(td) {
  padding: var(--space-2) var(--space-3);
  border: var(--border-width) solid var(--border);
  text-align: left;
}

.post__body :deep(th) {
  background: var(--surface-sunken);
  color: var(--text-strong);
  font-weight: var(--weight-semibold);
}

.post__body :deep(img) {
  height: auto;
  border-radius: var(--radius-lg);
}

.post__body :deep(> :last-child) {
  margin-bottom: 0;
}
</style>
