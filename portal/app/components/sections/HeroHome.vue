<script setup lang="ts">
/**
 * HeroHome — section de topo da home (`/`).
 * JSON driven via ~/data/home.json.
 * Fundo de marca (surface-brand), badge de valor e CTA para o conteúdo funcional.
 * Removido mock de missas (Fase 2).
 */
import homeData from '~/data/home.json'
</script>

<template>
  <section class="hero-home">
    <div class="hero-home__inner">
      <div class="hero-home__content">
        <span v-if="homeData.hero.badge" class="hero-home__badge">
          {{ homeData.hero.badge }}
        </span>
        <h1 class="hero-home__title">{{ homeData.hero.title }}</h1>
        <p class="hero-home__lead">
          {{ homeData.hero.lead }}
        </p>

        <div v-if="homeData.hero.cta" class="hero-home__actions">
          <NuxtLink :to="homeData.hero.cta.to" class="hero-home__cta-btn">
            {{ homeData.hero.cta.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-home {
  background: var(--surface-brand);
  color: var(--text-on-brand);
}

.hero-home__inner {
  max-width: var(--container-portal);
  margin: 0 auto;
  padding: var(--space-12) var(--space-6);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media (min-width: 48rem) {
  .hero-home__inner {
    padding: var(--space-16) var(--space-6);
  }
}

.hero-home__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 640px;
}

.hero-home__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.12);
  color: var(--amber-500);
  padding: 6px var(--space-3);
  border-radius: var(--radius-pill);
}

.hero-home__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-h1);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  margin: var(--space-5) 0 var(--space-4);
  color: var(--text-on-brand);
}

@media (min-width: 48rem) {
  .hero-home__title {
    font-size: var(--text-display);
  }
}

.hero-home__lead {
  font-size: var(--text-lg);
  line-height: var(--leading-snug);
  color: rgba(255, 255, 255, 0.82);
  max-width: 44ch;
  margin: 0 0 var(--space-8);
}

.hero-home__actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.hero-home__cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--accent);
  color: var(--text-on-accent);
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: var(--text-base);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: background var(--dur-fast) var(--ease-standard);
}

.hero-home__cta-btn:hover {
  background: var(--accent-strong);
}
</style>
