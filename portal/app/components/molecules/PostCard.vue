<script setup lang="ts">
/**
 * PostCard — molécula de cartão de post do blog.
 * Recebe um post por prop e renderiza capa, categoria, título, data e resumo.
 * O cartão inteiro é clicável (link estendido sobre o título) e leva ao post
 * completo. Compõe os átomos/moléculas existentes: `BaseTag` (categoria),
 * `BaseHeading` (título) e `PostMeta` (categoria + data). Só tokens de design.
 */

/** Formato mínimo de um post consumido pelo cartão (frontmatter + Nuxt Content). */
export interface Post {
  /** Rota do post completo (ex.: `/blog/meu-post`). */
  path: string
  /** Título editorial. */
  title: string
  /** Resumo/descrição exibido no corpo do cartão. */
  description?: string
  /** Categoria do post. */
  category?: string
  /** Data de publicação (ISO ou parseável por Date). */
  date?: string
  /** URL da imagem de capa. */
  cover?: string
  /** Texto alternativo da capa (acessibilidade). */
  coverAlt?: string
  /** Destaque principal do blog (Hero). */
  featured?: boolean
  /** Vínculo com uma Trilha de Formação, quando o post pertence a uma série. */
  track?: {
    id: string
    name: string
    order: number
    totalSteps?: number
  }
}

interface Props {
  /** Post a ser renderizado. */
  post: Post
  /**
   * Posição do post numa Trilha de Formação (1-based). Presente exibe o
   * `TrackBadge` no topo do corpo do cartão (modo trilha).
   */
  step?: number
  /** Total de etapas da trilha, para o rótulo "Etapa 01/05". */
  totalSteps?: number
}
const props = withDefaults(defineProps<Props>(), {
  step: undefined,
  totalSteps: undefined,
})

const hasCover = computed(() => Boolean(props.post.cover))
const hasStep = computed(() => typeof props.step === 'number')
</script>

<template>
  <article class="post-card">
    <NuxtLink :to="post.path" class="post-card__cover" tabindex="-1" aria-hidden="true">
      <NuxtImg
        v-if="hasCover"
        :src="post.cover"
        :alt="post.coverAlt ?? ''"
        class="post-card__img"
        loading="lazy"
        sizes="100vw sm:50vw lg:33vw"
      />
      <span v-else class="post-card__cover-fallback" />
    </NuxtLink>

    <div class="post-card__body">
      <TrackBadge v-if="hasStep" :order="step!" :total-steps="totalSteps" />

      <PostMeta :category="post.category" :date="post.date" />

      <BaseHeading :level="3" class="post-card__title">
        <NuxtLink :to="post.path" class="post-card__link">{{ post.title }}</NuxtLink>
      </BaseHeading>

      <p v-if="post.description" class="post-card__excerpt">{{ post.description }}</p>
    </div>
  </article>
</template>

<style scoped>
.post-card {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--surface-card);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition:
    box-shadow var(--dur-base) var(--ease-standard),
    border-color var(--dur-base) var(--ease-standard),
    transform var(--dur-base) var(--ease-standard);
}

.post-card:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* --- Capa ----------------------------------------------------------------- */
.post-card__cover {
  display: block;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--surface-sunken);
}

.post-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-card__cover-fallback {
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--brand-tint-quiet), var(--brand-tint));
}

/* --- Corpo ---------------------------------------------------------------- */
.post-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-5);
}

.post-card__title {
  margin: 0;
  text-decoration: none;
}

/* Link estendido: torna o cartão inteiro clicável mantendo o texto acessível. */
.post-card__link {
  color: inherit;
  text-decoration: none;
}

.post-card__link::after {
  content: '';
  position: absolute;
  inset: 0;
}

.post-card__link:focus-visible {
  outline: none;
}

.post-card:has(.post-card__link:focus-visible) {
  box-shadow: var(--shadow-focus);
}

.post-card:hover .post-card__link,
.post-card__link:hover,
.post-card__link:focus {
  color: var(--text-link);
  text-decoration: none;
}

.post-card__excerpt {
  margin: 0;
  color: var(--text-body);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}
</style>
