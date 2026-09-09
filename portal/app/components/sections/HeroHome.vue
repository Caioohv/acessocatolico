<script setup lang="ts">
/**
 * HeroHome — section de topo da home (`/`).
 * Apresenta a proposta de valor do portal e um CTA para o blog. O título usa
 * a escala editorial `--text-display` em serifa (composto sobre `BaseHeading`
 * nível 1, via :deep) e cresce a partir de 768px (mobile-first). O CTA reusa
 * `BaseButton`; o conteúdo fica contido por `AppContainer`. Só tokens de design.
 */
</script>

<template>
  <section class="hero-home">
    <AppContainer size="narrow" class="hero-home__inner">
      <p class="hero-home__eyebrow">Acesso Católico</p>

      <div class="hero-home__title">
        <BaseHeading :level="1">
          A vida católica da sua cidade em um só lugar
        </BaseHeading>
      </div>

      <p class="hero-home__lead">
        Horários de missa e confissão, eventos e comunidades da sua região,
        reunidos em um portal gratuito e sempre atualizado.
      </p>

      <div class="hero-home__actions">
        <BaseButton to="/blog" variant="primary">Ler o blog</BaseButton>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
.hero-home {
  background: var(--brand-tint-quiet);
  border-radius: var(--radius-xl);
  padding-block: var(--space-16) var(--space-16);
}

.hero-home__inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-5);
}

.hero-home__eyebrow {
  margin: 0;
  color: var(--brand-strong);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

/* Título no tamanho de hero (--text-display), começando menor no mobile. */
.hero-home__title :deep(.base-heading--h1) {
  font-size: var(--text-h1);
}

.hero-home__lead {
  margin: 0;
  max-width: var(--measure-prose);
  color: var(--text-body);
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
}

.hero-home__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

@media (min-width: 48rem) {
  .hero-home {
    padding-block: var(--space-20) var(--space-20);
  }

  .hero-home__title :deep(.base-heading--h1) {
    font-size: var(--text-display);
  }
}
</style>
