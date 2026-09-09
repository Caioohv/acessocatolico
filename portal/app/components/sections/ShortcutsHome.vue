<script setup lang="ts">
/**
 * ShortcutsHome — section de atalhos da home (`/`).
 * Espelha exatamente o design em design-system/Home Portal.dc.html.
 * Cartões para as 4 áreas principais do portal: Onde tem missa, Confissões, Eventos e Comunidades.
 */
interface Shortcut {
  icon: string
  title: string
  desc: string
  to: string
}

const shortcuts: Shortcut[] = [
  {
    icon: '✝',
    title: 'Onde tem missa',
    desc: 'Busque horários por cidade e paróquia.',
    to: '#',
  },
  {
    icon: '◷',
    title: 'Confissões',
    desc: 'Dias e horários de reconciliação.',
    to: '#',
  },
  {
    icon: '☾',
    title: 'Eventos',
    desc: 'Retiros, encontros e celebrações.',
    to: '#',
  },
  {
    icon: '♥',
    title: 'Comunidades',
    desc: 'EJC, EAC, ECC e movimentos.',
    to: '#',
  },
]
</script>

<template>
  <section class="shortcuts-home">
    <div class="shortcuts-home__inner">
      <h2 class="shortcuts-home__title">Comece por aqui</h2>
      <p class="shortcuts-home__subtitle">
        Atalhos para o que a comunidade mais procura.
      </p>

      <div class="shortcuts-home__grid">
        <NuxtLink
          v-for="s in shortcuts"
          :key="s.title"
          :to="s.to"
          class="shortcut-card"
        >
          <span class="shortcut-card__icon">{{ s.icon }}</span>
          <span class="shortcut-card__title">{{ s.title }}</span>
          <span class="shortcut-card__desc">{{ s.desc }}</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.shortcuts-home {
  width: 100%;
}

.shortcuts-home__inner {
  max-width: var(--container-portal);
  margin: 0 auto;
  padding: var(--space-16) var(--space-6) var(--space-8);
}

.shortcuts-home__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-h2);
  color: var(--text-strong);
  margin: 0 0 var(--space-2);
}

.shortcuts-home__subtitle {
  margin: 0 0 var(--space-8);
  color: var(--text-muted);
  font-size: var(--text-base);
}

.shortcuts-home__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-4);
}

.shortcut-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  background: var(--surface-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  color: inherit;
  transition:
    box-shadow var(--dur-fast) var(--ease-standard),
    border-color var(--dur-fast) var(--ease-standard);
}

.shortcut-card:hover {
  border-color: var(--brand);
  box-shadow: var(--shadow-md);
}

.shortcut-card__icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--brand-tint);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--brand);
  font-size: 1.25rem;
}

.shortcut-card__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-h4);
  color: var(--text-strong);
}

.shortcut-card__desc {
  font-size: var(--text-sm);
  color: var(--text-muted);
  line-height: var(--leading-snug);
}
</style>
