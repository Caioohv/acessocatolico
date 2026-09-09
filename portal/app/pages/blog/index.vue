<script setup lang="ts">
/**
 * /blog — índice do blog.
 * Lista os posts da collection `blog` do Nuxt Content, dos mais recentes para
 * os mais antigos (`date` decrescente), renderizando cada um com a molécula
 * `PostCard`. Permite filtragem por categoria e pesquisa textual por palavra-chave.
 * O estado vive na query string (`?categoria=<valor>&busca=<termo>`), preservando
 * URLs compartilháveis e compatibilidade com SSR. Só tokens de design.
 */
const route = useRoute()
const router = useRouter()

/** Categoria ativa vinda da query string, ou `null` para "Todos". */
const activeCategory = computed(() => {
  const value = route.query.categoria
  return typeof value === 'string' && value.length > 0 ? value : null
})

/** Termo de busca textual vindo da query string (`?busca=...`). */
const searchQuery = ref(typeof route.query.busca === 'string' ? route.query.busca : '')

// Sincroniza searchQuery caso a rota mude via histórico/navegação
watch(
  () => route.query.busca,
  (newVal) => {
    const valStr = typeof newVal === 'string' ? newVal : ''
    if (searchQuery.value !== valStr) {
      searchQuery.value = valStr
    }
  },
)

/** Atualiza a busca na URL de forma reativa e compartilhável. */
function updateSearchQuery(val: string) {
  searchQuery.value = val
  const query = { ...route.query }
  const trimmed = val.trim()
  if (trimmed) {
    query.busca = trimmed
  } else {
    delete query.busca
  }
  router.replace({ query })
}

/** Remove acentos e converte para minúsculas para busca insensível. */
function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

/** Categorias disponíveis para o filtro (distintas, ordenadas). Consulta fixa. */
const { data: categories } = await useAsyncData('blog-categories', async () => {
  const rows = await queryCollection('blog').select('category').all()
  const unique = new Set<string>()
  for (const row of rows) {
    if (row.category) unique.add(row.category)
  }
  return [...unique].sort((a, b) => a.localeCompare(b, 'pt-BR'))
})

/** Posts exibidos — re-consultados quando categoria ou busca mudam. */
const { data: posts } = await useAsyncData(
  'blog-index',
  async () => {
    const query = queryCollection('blog').order('date', 'DESC')
    const allPosts = activeCategory.value
      ? await query.where('category', '=', activeCategory.value).all()
      : await query.all()

    const term = searchQuery.value.trim()
    if (!term) return allPosts

    const normalizedTerm = normalizeText(term)

    return allPosts.filter((post) => {
      const titleMatch = post.title && normalizeText(post.title).includes(normalizedTerm)
      const descMatch = post.description && normalizeText(post.description).includes(normalizedTerm)
      const catMatch = post.category && normalizeText(post.category).includes(normalizedTerm)
      const tagsMatch =
        Array.isArray(post.tags) &&
        post.tags.some((tag: string) => normalizeText(tag).includes(normalizedTerm))
      return titleMatch || descMatch || catMatch || tagsMatch
    })
  },
  { watch: [activeCategory, searchQuery] },
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

    <div class="blog-index__controls">
      <BlogSearch
        :model-value="searchQuery"
        class="blog-index__search"
        @update:model-value="updateSearchQuery"
        @clear="updateSearchQuery('')"
      />

      <CategoryFilter
        v-if="categories && categories.length"
        :categories="categories"
        :active="activeCategory"
        class="blog-index__filter"
      />
    </div>

    <PostGrid v-if="posts && posts.length" :posts="posts" />

    <div v-else class="blog-index__empty">
      <p class="blog-index__empty-text">
        <template v-if="searchQuery">
          Nenhum post encontrado para "<strong>{{ searchQuery }}</strong>"
          <template v-if="activeCategory"> na categoria {{ activeCategory }}</template>.
        </template>
        <template v-else-if="activeCategory">
          Nenhum post nesta categoria ainda.
        </template>
        <template v-else>
          Nenhum post publicado ainda.
        </template>
      </p>

      <BaseButton
        v-if="searchQuery || activeCategory"
        variant="secondary"
        to="/blog"
        class="blog-index__clear-button"
      >
        Limpar filtros e pesquisas
      </BaseButton>
    </div>
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

.blog-index__lead {
  margin: 0;
  max-width: var(--measure-prose);
  color: var(--text-body);
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
}

.blog-index__controls {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

@media (min-width: 48rem) {
  .blog-index__controls {
    gap: var(--space-6);
  }
}

.blog-index__search {
  max-width: 100%;
}

@media (min-width: 48rem) {
  .blog-index__search {
    max-width: 32rem;
  }
}

.blog-index__empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
  padding-block: var(--space-8);
}

.blog-index__empty-text {
  margin: 0;
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: var(--text-base);
}

.blog-index__empty-text strong {
  color: var(--text-strong);
}

.blog-index__clear-button {
  margin-top: var(--space-2);
}
</style>
