<script setup lang="ts">
/**
 * ShortcutsHome — section de atalhos da home (`/`).
 * Cartões de acesso rápido às áreas do portal. Hoje só o blog está no ar
 * (cartão navegável para `/blog`); Paróquias e Comunidades são funcionalidades
 * de fases futuras e aparecem como placeholders "Em breve", visualmente
 * desabilitados e sem navegação. Ícones em SVG inline (não há collection do
 * @nuxt/icon instalada). Conteúdo contido por `AppContainer`. Só tokens de
 * design — nada de valores hardcoded.
 */

interface Shortcut {
  /** Título do atalho. */
  title: string
  /** Descrição curta da área. */
  description: string
  /** Rota interna quando o atalho está disponível. */
  to?: string
  /** Marca a área como funcionalidade futura (desabilitada). */
  soon?: boolean
}

const shortcuts: Shortcut[] = [
  {
    title: 'Blog',
    description:
      'Reflexões, guias e conteúdo para viver e aprofundar a fé no dia a dia.',
    to: '/blog',
  },
  {
    title: 'Paróquias',
    description:
      'Horários de missa e confissão, eventos e contatos das paróquias da sua região.',
    soon: true,
  },
  {
    title: 'Comunidades',
    description:
      'Grupos, movimentos e encontros para caminhar junto e servir na sua cidade.',
    soon: true,
  },
]
</script>

<template>
  <section class="shortcuts-home">
    <AppContainer class="shortcuts-home__inner">
      <header class="shortcuts-home__header">
        <BaseHeading :level="2">Explore o portal</BaseHeading>
        <p class="shortcuts-home__lead">
          Comece pelo blog. Paróquias e comunidades chegam nas próximas etapas.
        </p>
      </header>

      <ul class="shortcuts-home__grid">
        <li v-for="item in shortcuts" :key="item.title">
          <NuxtLink
            v-if="item.to"
            :to="item.to"
            class="shortcut shortcut--active"
          >
            <span class="shortcut__icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 4h11l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4z" />
                <path d="M14 4v5h5" />
                <path d="M8 13h7M8 17h5" />
              </svg>
            </span>
            <span class="shortcut__body">
              <span class="shortcut__title">{{ item.title }}</span>
              <span class="shortcut__desc">{{ item.description }}</span>
            </span>
            <span class="shortcut__arrow" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </NuxtLink>

          <div
            v-else
            class="shortcut shortcut--soon"
            aria-disabled="true"
          >
            <span class="shortcut__icon" aria-hidden="true">
              <svg
                v-if="item.title === 'Paróquias'"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 2v4M10 4h4" />
                <path d="M12 6 5 11v9h14v-9l-7-5z" />
                <path d="M10 20v-4h4v4" />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="9" cy="8" r="3" />
                <circle cx="17" cy="10" r="2.5" />
                <path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
                <path d="M16.5 14.5A4 4 0 0 1 21 18v2" />
              </svg>
            </span>
            <span class="shortcut__body">
              <span class="shortcut__title">
                {{ item.title }}
                <span class="shortcut__badge">Em breve</span>
              </span>
              <span class="shortcut__desc">{{ item.description }}</span>
            </span>
          </div>
        </li>
      </ul>
    </AppContainer>
  </section>
</template>

<style scoped>
.shortcuts-home__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.shortcuts-home__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.shortcuts-home__lead {
  margin: 0;
  max-width: var(--measure-prose);
  color: var(--text-body);
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
}

.shortcuts-home__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

/* --- Cartão base ---------------------------------------------------------- */
.shortcut {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  height: 100%;
  padding: var(--space-5);
  background: var(--surface-card);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  text-decoration: none;
}

.shortcut__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--space-10);
  height: var(--space-10);
  border-radius: var(--radius-md);
  background: var(--brand-tint-quiet);
  color: var(--brand-strong);
}

.shortcut__icon svg {
  width: var(--space-5);
  height: var(--space-5);
}

.shortcut__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.shortcut__title {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-strong);
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
}

.shortcut__desc {
  color: var(--text-body);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
}

.shortcut__arrow {
  display: inline-flex;
  align-items: center;
  margin-left: auto;
  color: var(--brand-strong);
  transition: transform var(--dur-fast) var(--ease-standard);
}

.shortcut__arrow svg {
  width: var(--space-5);
  height: var(--space-5);
}

.shortcut__badge {
  padding: var(--space-0) var(--space-2);
  background: var(--surface-sunken);
  border-radius: var(--radius-pill);
  color: var(--text-meta);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

/* --- Ativo (navegável) ---------------------------------------------------- */
.shortcut--active {
  transition:
    border-color var(--dur-fast) var(--ease-standard),
    box-shadow var(--dur-fast) var(--ease-standard);
}

.shortcut--active:hover {
  border-color: var(--brand);
  box-shadow: var(--shadow-sm);
}

.shortcut--active:hover .shortcut__arrow {
  transform: translateX(var(--space-1));
}

.shortcut--active:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

/* --- Placeholder "Em breve" (desabilitado) -------------------------------- */
.shortcut--soon {
  background: var(--surface-sunken);
  cursor: not-allowed;
}

.shortcut--soon .shortcut__icon {
  background: var(--surface-100);
  color: var(--text-muted);
}

.shortcut--soon .shortcut__title {
  color: var(--text-muted);
}

.shortcut--soon .shortcut__desc {
  color: var(--text-subtle);
}

@media (min-width: 48rem) {
  .shortcuts-home__grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .shortcut {
    flex-direction: column;
  }

  .shortcut__arrow {
    margin-left: 0;
    margin-top: auto;
    padding-top: var(--space-3);
  }
}
</style>
