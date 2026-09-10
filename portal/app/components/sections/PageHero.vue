<script setup lang="ts">
/**
 * PageHero — faixa de topo de página interna (blog, loja, etc.).
 * Reaproveita a linguagem do HeroHome: banda full-bleed em `--surface-brand`
 * com título e lead sobre a marca. Mais enxuto que o HeroHome (sem badge/CTA):
 * serve como cabeçalho de seção, dando o "respiro roxo" fora da home.
 * Só tokens de design.
 */
interface Props {
  /** Título da página (renderizado como <h1>). */
  title: string
  /** Linha de apoio opcional abaixo do título. */
  lead?: string
}
defineProps<Props>()
</script>

<template>
  <section class="page-hero">
    <div class="page-hero__inner">
      <h1 class="page-hero__title">{{ title }}</h1>
      <p v-if="lead" class="page-hero__lead">{{ lead }}</p>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  background: var(--surface-brand);
  color: var(--text-on-brand);
}

.page-hero__inner {
  max-width: var(--container-portal);
  margin: 0 auto;
  padding: var(--space-10) var(--space-4);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media (min-width: 48rem) {
  .page-hero__inner {
    padding: var(--space-12) var(--space-6);
  }
}

.page-hero__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-h1);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  margin: 0;
  color: var(--text-on-brand);
  text-decoration: none;
}

.page-hero__lead {
  font-size: var(--text-lg);
  line-height: var(--leading-snug);
  color: rgba(255, 255, 255, 0.82);
  max-width: 52ch;
  margin: var(--space-4) 0 0;
}
</style>
