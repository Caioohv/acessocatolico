<script setup lang="ts">
/**
 * TheHeader — organism de cabeçalho do portal.
 * Espelha exatamente o design em design-system/Home Portal.dc.html.
 * Logo (marca em SVG + typography Spectral "Acesso Católico") + navegação.
 * Mobile-first: nav colapsável no mobile via botão hambúrguer acessível.
 */
const isOpen = ref(false)
const route = useRoute()

const navLinks = [
  { to: '#', label: 'Onde tem missa' },
  { to: '#', label: 'Comunidades' },
  { to: '/blog', label: 'Blog' },
  { to: '#', label: 'Lojinha' },
]

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

watch(() => route.fullPath, close)
</script>

<template>
  <header class="the-header">
    <div class="the-header__inner">
      <NuxtLink to="/" class="the-header__brand" @click="close">
        <img
          src="/assets/logo-mark.svg"
          alt="Acesso Católico"
          class="the-header__logo"
        />
        <span class="the-header__brand-text">
          <b class="the-header__brand-first">Acesso</b>
          <b class="the-header__brand-second"> Católico</b>
        </span>
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
          <li v-for="link in navLinks" :key="link.label">
            <NuxtLink :to="link.to" class="the-header__link">
              {{ link.label }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="#" class="the-header__cta-btn">
              Sou paróquia
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.the-header {
  width: 100%;
}

.the-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  max-width: var(--container-portal);
  margin: 0 auto;
  padding: var(--space-4) var(--space-6);
}

/* --- Marca ---------------------------------------------------------------- */
.the-header__brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: inherit;
  text-decoration: none;
}

.the-header__logo {
  width: 38px;
  height: 38px;
  display: block;
}

.the-header__brand-text {
  font-family: var(--font-display);
  line-height: 1;
  letter-spacing: var(--tracking-tight);
}

.the-header__brand-first {
  font-weight: 500;
  font-size: 1.25rem;
  color: var(--text-strong);
}

.the-header__brand-second {
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--brand);
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
  gap: var(--space-3);
  align-items: flex-start;
}

.the-header__link {
  color: var(--text-body);
  font-size: var(--text-sm);
  font-weight: 500;
  text-decoration: none;
  transition: color var(--dur-fast) var(--ease-standard);
}

.the-header__link:hover {
  color: var(--text-link-hover);
}

.the-header__cta-btn {
  display: inline-block;
  background: var(--brand);
  color: var(--text-on-brand);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-pill);
  font-size: var(--text-sm);
  font-weight: 600;
  text-decoration: none;
  transition: background var(--dur-fast) var(--ease-standard);
}

.the-header__cta-btn:hover {
  background: var(--brand-hover);
  color: var(--text-on-brand);
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
    align-items: center;
    gap: var(--space-6);
  }
}
</style>
