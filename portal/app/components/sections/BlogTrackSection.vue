<script setup lang="ts">
/**
 * BlogTrackSection — seção "Trilhas de Formação" do /blog.
 * Lista uma ou mais trilhas (séries com ordem pedagógica). Cada trilha tem um
 * título e um `PostCarousel` na variante `track`, cujos cartões exibem a etapa
 * (Etapa 01/05) e uma linha conectora. Recebe as trilhas prontas por prop
 * (posts já ordenados por `track.order`); não busca dados. Só tokens de design.
 */
import type { Post } from '../molecules/PostCard.vue'

/** Uma trilha agrupada: identidade + posts ordenados por etapa. */
export interface Track {
  /** Identificador da trilha. */
  id: string
  /** Nome exibível. */
  name: string
  /** Total de etapas (para o rótulo das etapas). */
  totalSteps?: number
  /** Posts da trilha, já ordenados por `track.order`. */
  posts: Post[]
}

interface Props {
  /** Trilhas a exibir. */
  tracks?: Track[]
}
withDefaults(defineProps<Props>(), {
  tracks: () => [],
})
</script>

<template>
  <section v-if="tracks.length" class="blog-tracks" aria-label="Trilhas de formação">
    <BaseHeading :level="2" class="blog-tracks__title">Trilhas de Formação</BaseHeading>
    <p class="blog-tracks__lead">
      Séries em ordem para acompanhar do início ao fim, um passo de cada vez.
    </p>

    <div class="blog-tracks__list">
      <article v-for="track in tracks" :key="track.id" class="blog-tracks__track">
        <header class="blog-tracks__track-header">
          <BaseHeading :level="3" class="blog-tracks__track-name">
            {{ track.name }}
          </BaseHeading>
          <span class="blog-tracks__track-count">
            {{ track.posts.length }}
            {{ track.posts.length === 1 ? 'etapa' : 'etapas' }}
          </span>
        </header>

        <PostCarousel :posts="track.posts" variant="track" :label="track.name" />
      </article>
    </div>
  </section>
</template>

<style scoped>
.blog-tracks {
  margin-bottom: var(--space-16);
}

.blog-tracks__title {
  margin: 0;
}

.blog-tracks__lead {
  margin: var(--space-2) 0 0;
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: var(--text-base);
}

.blog-tracks__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
  margin-top: var(--space-8);
}

.blog-tracks__track-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-3);
  margin-bottom: var(--space-2);
}

.blog-tracks__track-name {
  margin: 0;
}

.blog-tracks__track-count {
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--text-meta);
  letter-spacing: var(--tracking-mono);
}
</style>
