<script setup lang="ts">
/**
 * TheHeader — organism de cabeçalho do portal.
 * Logo (link para a Home) + navegação (Home, Blog). Mobile-first: no mobile a
 * nav vive atrás de um botão hambúrguer acessível (aria-expanded / aria-controls,
 * fecha com Esc e ao navegar, alvo de toque ≥44px). A partir de --bp-md (48rem)
 * a nav é inline e o botão some. Navegação via <NuxtLink> (SPA, sem reload).
 */
const isOpen = ref(false)
const route = useRoute()

const links = [
  { to: '/', label: 'Início' },
  { to: '/blog', label: 'Blog' },
]

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

// Fecha o menu ao trocar de rota (o clique no NuxtLink navega sem reload).
watch(() => route.fullPath, close)
</script>

<template>
  <header class="the-header">
    <AppContainer class="the-header__bar">
      <NuxtLink to="/" class="the-header__brand" @click="close">
        <span class="the-header__mark" aria-hidden="true">✦</span>
        <span class="the-header__name">Acesso Católico</span>
      </NuxtLink>

      <button
        type="button"
        class="the-header__toggle"
        :aria-expanded="isOpen"
        aria-controls="primary-nav"
        :aria-label="isOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="toggle"
      >
        <svg
          v-if="!isOpen"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <svg
          v-else
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>

      <nav
        id="primary-nav"
        class="the-header__nav"
        :class="{ 'is-open': isOpen }"
        aria-label="Navegação principal"
        @keydown.esc="close"
      >
        <ul class="the-header__list">
          <li v-for="link in links" :key="link.to">
            <NuxtLink :to="link.to" class="the-header__link">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </AppContainer>
  </header>
</template>

<style scoped>
.the-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--surface-card);
  border-bottom: var(--border-width) solid var(--border);
}

.the-header__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  min-height: 56px;
}

/* --- Marca ---------------------------------------------------------------- */
.the-header__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-inline-end: auto;
  text-decoration: none;
  color: var(--text-strong);
  font-family: var(--font-display);
  font-weight: var(--weight-semibold);
  font-size: var(--text-h4);
  letter-spacing: var(--tracking-tight);
}

.the-header__mark {
  color: var(--brand);
  font-size: 1.25em;
  line-height: 1;
}

/* --- Botão hambúrguer (só no mobile) -------------------------------------- */
.the-header__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  padding: var(--space-2);
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--text-strong);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-standard);
}

.the-header__toggle:hover {
  background: var(--surface-sunken);
}

.the-header__toggle:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

/* --- Navegação ------------------------------------------------------------ */
/* Mobile: colapsada por padrão; ocupa a linha inteira quando aberta. */
.the-header__nav {
  display: none;
  flex-basis: 100%;
}

.the-header__nav.is-open {
  display: block;
  padding-block: var(--space-2) var(--space-3);
}

.the-header__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.the-header__link {
  display: flex;
  align-items: center;
  min-height: 44px;
  padding-inline: var(--space-3);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--text-body);
  font-weight: var(--weight-medium);
  transition:
    color var(--dur-fast) var(--ease-standard),
    background var(--dur-fast) var(--ease-standard);
}

.the-header__link:hover {
  color: var(--text-link-hover);
  background: var(--surface-sunken);
}

.the-header__link:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.the-header__link.router-link-active {
  color: var(--brand-strong);
  font-weight: var(--weight-semibold);
}

/* --- Desktop (≥ --bp-md, 48rem): nav inline, sem hambúrguer --------------- */
@media (min-width: 48rem) {
  .the-header__toggle {
    display: none;
  }

  .the-header__nav,
  .the-header__nav.is-open {
    display: block;
    flex-basis: auto;
    padding-block: 0;
  }

  .the-header__list {
    flex-direction: row;
    gap: var(--space-1);
  }

  .the-header__link {
    min-height: 40px;
  }
}
</style>
