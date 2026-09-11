<script setup lang="ts">
/**
 * /blog — índice do blog no formato "Central de Formação".
 *
 * Dois modos, no mesmo endereço:
 * - Navegação (sem busca nem categoria ativa): layout rico — Hero de destaque,
 *   Trilhas de Formação (carrosséis com etapas) e carrosséis por categoria.
 * - Busca/Filtro (com `?busca=` ou `?categoria=`): cai na listagem plana
 *   (`PostGrid`), que é a resposta natural a uma consulta e preserva URLs
 *   compartilháveis e SSR.
 *
 * Degradação graciosa: seções sem conteúdo não são renderizadas (trilhas
 * vazias somem, categorias sem posts além do destaque somem). Só tokens de
 * design.
 */
import type { Post } from '~/components/molecules/PostCard.vue'
import type { Track } from '~/components/sections/BlogTrackSection.vue'
import type { CategoryRail } from '~/components/sections/BlogCategoryCarouselSection.vue'

/** Máximo de cartões exibidos por carrossel de categoria. */
const RAIL_LIMIT = 12

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

/** True quando o leitor está navegando (nem busca nem categoria ativa). */
const isBrowsing = computed(() => !activeCategory.value && !searchQuery.value.trim())

/** Categorias disponíveis para o filtro (distintas, ordenadas). Consulta fixa. */
const { data: categories } = await useAsyncData('blog-categories', async () => {
  const rows = await queryCollection('blog').select('category').all()
  const unique = new Set<string>()
  for (const row of rows) {
    if (row.category) unique.add(row.category)
  }
  return [...unique].sort((a, b) => a.localeCompare(b, 'pt-BR'))
})

/** Todos os posts (mais recentes primeiro). Base do layout de navegação. */
const { data: allPosts } = await useAsyncData('blog-all', () =>
  queryCollection('blog').order('date', 'DESC').all(),
)

/** Post em destaque: o `featured` mais recente, ou o mais recente no geral. */
const heroPost = computed<Post | null>(() => {
  const posts = allPosts.value ?? []
  return posts.find((p) => p.featured) ?? posts[0] ?? null
})

/** Trilhas agrupadas por `track.id`, cada uma ordenada por `track.order`. */
const tracks = computed<Track[]>(() => {
  const byId = new Map<string, Track>()
  for (const post of allPosts.value ?? []) {
    if (!post.track) continue
    const existing = byId.get(post.track.id)
    if (existing) {
      existing.posts.push(post)
      existing.totalSteps = Math.max(
        existing.totalSteps ?? 0,
        post.track.totalSteps ?? post.track.order,
      )
    } else {
      byId.set(post.track.id, {
        id: post.track.id,
        name: post.track.name,
        totalSteps: post.track.totalSteps ?? post.track.order,
        posts: [post],
      })
    }
  }
  const list = [...byId.values()]
  for (const track of list) {
    track.posts.sort((a, b) => (a.track?.order ?? 0) - (b.track?.order ?? 0))
  }
  // Trilhas com mais etapas primeiro (as mais "completas" acima).
  return list.sort((a, b) => b.posts.length - a.posts.length)
})

/**
 * Carrosséis por categoria, excluindo o post em destaque para não duplicá-lo
 * logo abaixo do Hero. Categorias que ficariam vazias são omitidas.
 */
const categoryRails = computed<CategoryRail[]>(() => {
  const heroPath = heroPost.value?.path
  const byCategory = new Map<string, Post[]>()
  for (const post of allPosts.value ?? []) {
    if (post.path === heroPath) continue
    const key = post.category
    if (!key) continue
    const bucket = byCategory.get(key)
    if (bucket) bucket.push(post)
    else byCategory.set(key, [post])
  }
  return [...byCategory.entries()]
    .map(([category, posts]) => ({
      category,
      total: posts.length,
      posts: posts.slice(0, RAIL_LIMIT),
    }))
    .sort((a, b) => b.total - a.total)
})

/** Posts da listagem plana — re-consultados quando categoria ou busca mudam. */
const { data: filteredPosts } = await useAsyncData(
  'blog-filtered',
  async () => {
    const query = queryCollection('blog').order('date', 'DESC')
    const posts = activeCategory.value
      ? await query.where('category', '=', activeCategory.value).all()
      : await query.all()

    const term = searchQuery.value.trim()
    if (!term) return posts

    const normalizedTerm = normalizeText(term)

    return posts.filter((post) => {
      const titleMatch = post.title && normalizeText(post.title).includes(normalizedTerm)
      const descMatch =
        post.description && normalizeText(post.description).includes(normalizedTerm)
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
    'Trilhas de formação, guias e reflexões católicas para viver e aprofundar a fé no dia a dia.',
  ogTitle: 'Blog — Acesso Católico',
  ogDescription:
    'Trilhas de formação, guias e reflexões católicas para viver e aprofundar a fé no dia a dia.',
  ogType: 'website',
})
</script>

<template>
  <div class="blog-index">
    <PageHero
      title="Blog"
      lead="Trilhas de formação, guias e reflexões para viver e aprofundar a fé no dia a dia."
    />

    <AppContainer as="main" class="blog-index__body">
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

      <!-- Modo navegação: layout de formação (Hero + Trilhas + Categorias) -->
      <template v-if="isBrowsing && heroPost">
        <BlogHeroSection :post="heroPost" />
        <BlogTrackSection :tracks="tracks" />
        <BlogCategoryCarouselSection :categories="categoryRails" />
      </template>

      <!-- Modo busca/filtro: listagem plana -->
      <PostGrid v-else-if="filteredPosts && filteredPosts.length" :posts="filteredPosts" />

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
  </div>
</template>

<style scoped>
.blog-index__body {
  padding-block: var(--space-8) var(--space-16);
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
