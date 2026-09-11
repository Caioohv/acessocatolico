<script setup lang="ts">
/**
 * BlogHeroSection — destaque principal do topo do /blog.
 * Apresenta um post em foco (o `featured`, ou o mais recente como fallback)
 * num cartão amplo: capa grande à esquerda no desktop / topo no mobile, e um
 * corpo com categoria, título, resumo e CTA de leitura. Se o post pertence a
 * uma trilha, exibe também o nome da trilha e a etapa. Recebe o post por prop;
 * o cartão inteiro é clicável (link estendido). Só tokens de design.
 */
import type { Post } from '../molecules/PostCard.vue'

interface Props {
  /** Post em destaque a ser exibido. */
  post: Post
}
defineProps<Props>()
</script>

<template>
  <section class="blog-hero" aria-label="Destaque">
    <article class="blog-hero__card">
      <NuxtLink
        :to="post.path"
        class="blog-hero__cover"
        tabindex="-1"
        aria-hidden="true"
      >
        <NuxtImg
          v-if="post.cover"
          :src="post.cover"
          :alt="post.coverAlt ?? ''"
          class="blog-hero__img"
          sizes="100vw md:60vw"
        />
        <span v-else class="blog-hero__cover-fallback" />
      </NuxtLink>

      <div class="blog-hero__body">
        <span v-if="post.track" class="blog-hero__track">
          <TrackBadge :order="post.track.order" :total-steps="post.track.totalSteps" />
          <span class="blog-hero__track-name">{{ post.track.name }}</span>
        </span>

        <PostMeta v-else :category="post.category" :date="post.date" />

        <BaseHeading :level="2" class="blog-hero__title">
          <NuxtLink :to="post.path" class="blog-hero__link">{{ post.title }}</NuxtLink>
        </BaseHeading>

        <p v-if="post.description" class="blog-hero__excerpt">{{ post.description }}</p>

        <BaseButton :to="post.path" variant="primary" class="blog-hero__cta">
          Ler agora
        </BaseButton>
      </div>
    </article>
  </section>
</template>

<style scoped>
.blog-hero {
  margin-bottom: var(--space-12);
}

.blog-hero__card {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  overflow: hidden;
  background: var(--surface-card);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  transition:
    box-shadow var(--dur-base) var(--ease-standard),
    border-color var(--dur-base) var(--ease-standard);
}

.blog-hero__card:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow-md);
}

@media (min-width: 48rem) {
  .blog-hero__card {
    grid-template-columns: 1.4fr 1fr;
    align-items: stretch;
  }
}

/* --- Capa ----------------------------------------------------------------- */
.blog-hero__cover {
  display: block;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--surface-sunken);
}

@media (min-width: 48rem) {
  .blog-hero__cover {
    aspect-ratio: auto;
    height: 100%;
    min-height: 20rem;
  }
}

.blog-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-hero__cover-fallback {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 12rem;
  background: linear-gradient(135deg, var(--brand-tint-quiet), var(--brand-tint));
}

/* --- Corpo ---------------------------------------------------------------- */
.blog-hero__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-6);
}

@media (min-width: 48rem) {
  .blog-hero__body {
    justify-content: center;
    padding: var(--space-8);
  }
}

.blog-hero__track {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
}

.blog-hero__track-name {
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
}

.blog-hero__title {
  margin: 0;
}

.blog-hero__link {
  color: inherit;
  text-decoration: none;
}

/* Link estendido: cartão inteiro clicável, mantendo o CTA como alvo real. */
.blog-hero__link::after {
  content: '';
  position: absolute;
  inset: 0;
}

.blog-hero__link:focus-visible {
  outline: none;
}

.blog-hero__card:has(.blog-hero__link:focus-visible) {
  box-shadow: var(--shadow-focus);
}

.blog-hero__excerpt {
  margin: 0;
  color: var(--text-body);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
}

/* O CTA precisa ficar acima do link estendido para ser o alvo de clique. */
.blog-hero__cta {
  position: relative;
  z-index: 1;
  margin-top: var(--space-2);
}
</style>
