<script setup lang="ts">
/**
 * /blog — índice do blog.
 * Lista os posts da collection `blog` do Nuxt Content, dos mais recentes para
 * os mais antigos (`date` decrescente), renderizando cada um com a molécula
 * `PostCard`. A molécula `CategoryFilter` filtra por categoria: o estado vive
 * na query string (`?categoria=<valor>`) e o índice re-consulta o Nuxt Content
 * nativamente (`queryCollection().where(...)`). Tudo roda no SSR via
 * `useAsyncData`. Só tokens de design.
 */
const route = useRoute()

/** Categoria ativa vinda da query string, ou `null` para "Todos". */
const activeCategory = computed(() => {
  const value = route.query.categoria
  return typeof value === 'string' && value.length > 0 ? value : null
})

/** Categorias disponíveis para o filtro (distintas, ordenadas). Consulta fixa. */
const { data: categories } = await useAsyncData('blog-categories', async () => {
  const rows = await queryCollection('blog').select('category').all()
  const unique = new Set<string>()
  for (const row of rows) {
    if (row.category) unique.add(row.category)
  }
  return [...unique].sort((a, b) => a.localeCompare(b, 'pt-BR'))
})

/** Posts exibidos — re-consultados quando a categoria ativa muda. */
const { data: posts } = await useAsyncData(
  'blog-index',
  () => {
    const query = queryCollection('blog').order('date', 'DESC')
    return activeCategory.value
      ? query.where('category', '=', activeCategory.value).all()
      : query.all()
  },
  { watch: [activeCategory] },
)

useSeoMeta({
  title: 'Blog — Acesso Católico',
  description:
    'Reflexões, guias e conteúdo católico para viver e aprofundar a fé no dia a dia.',
  ogTitle: 'Blog — Acesso Católico',
  ogDescription:
    'Reflexões, guias e conteúdo católico para viver e aprofundar a fé no dia a dia.',
  ogType: 'website',
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

    <CategoryFilter
      v-if="categories && categories.length"
      :categories="categories"
      :active="activeCategory"
      class="blog-index__filter"
    />

    <PostGrid v-if="posts && posts.length" :posts="posts" />

    <p v-else class="blog-index__empty">
      {{
        activeCategory
          ? 'Nenhum post nesta categoria ainda.'
          : 'Nenhum post publicado ainda.'
      }}
    </p>
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
  margin-bottom: var(--space-6);
}

.blog-index__filter {
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
