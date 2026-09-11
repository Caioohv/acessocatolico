<script setup lang="ts">
/**
 * AdminHeader — barra de navegação do painel administrativo.
 *
 * Espelha a estética do <TheHeader> do portal (marca + logo, nav inline no
 * desktop, hambúrguer no mobile), adaptada para o painel: links internos com
 * estado ativo, identificação do usuário logado e ação de sair.
 */
const { user, fetch: refreshSession } = useUserSession()

const route = useRoute()
const isOpen = ref(false)
const loggingOut = ref(false)

const links = [
  { label: 'Painel', to: '/' },
  { label: 'Produtos', to: '/produtos' },
  { label: 'Métricas', to: '/metricas' },
]

// Um link está ativo quando é a própria rota ("/") ou quando a rota atual
// está dentro da sua seção ("/produtos/novo" ativa "Produtos").
function isActive(to: string): boolean {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

watch(() => route.fullPath, close)

const userLabel = computed(() => user.value?.name || user.value?.email || 'Administrador')

async function onLogout() {
  if (loggingOut.value) return
  loggingOut.value = true
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
  }
  catch {
    // Mesmo que o endpoint falhe, seguimos para /login; o middleware barra
    // rotas internas sem sessão válida.
  }
  finally {
    // Ressincroniza o estado client-side (agora vazio) antes de navegar.
    await refreshSession()
    loggingOut.value = false
    close()
    await navigateTo('/login')
  }
}
</script>

<template>
  <header class="admin-header">
    <div class="admin-header__inner">
      <NuxtLink to="/" class="admin-header__brand" @click="close">
        <img
          src="/assets/logo-mark.svg"
          alt="Acesso Católico"
          class="admin-header__logo"
        >
        <span class="admin-header__brand-text">
          <b class="admin-header__brand-first">Acesso</b>
          <b class="admin-header__brand-second"> Católico</b>
          <span class="admin-header__brand-tag">Painel</span>
        </span>
      </NuxtLink>

      <button
        type="button"
        class="admin-header__toggle"
        :aria-expanded="isOpen"
        aria-controls="admin-nav"
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
        id="admin-nav"
        class="admin-header__nav"
        :class="{ 'is-open': isOpen }"
        aria-label="Navegação do painel"
        @keydown.esc="close"
      >
        <ul class="admin-header__list">
          <li v-for="link in links" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="admin-header__link"
              :class="{ 'admin-header__link--active': isActive(link.to) }"
              :aria-current="isActive(link.to) ? 'page' : undefined"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>

        <div class="admin-header__account">
          <span class="admin-header__user" :title="userLabel">
            <svg class="admin-header__user-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <circle cx="10" cy="6.5" r="3.2" />
              <path stroke-linecap="round" d="M3.5 16.5c0-3 2.9-4.8 6.5-4.8s6.5 1.8 6.5 4.8" />
            </svg>
            <span class="admin-header__user-name">{{ userLabel }}</span>
          </span>
          <button
            type="button"
            class="admin-header__logout"
            :disabled="loggingOut"
            @click="onLogout"
          >
            {{ loggingOut ? 'Saindo…' : 'Sair' }}
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.admin-header {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  background: var(--surface-card);
  border-bottom: var(--border-width) solid var(--border);
  box-shadow: var(--shadow-sm);
}

.admin-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
  max-width: var(--container-panel);
  margin: 0 auto;
  padding: var(--space-3) var(--space-4);
}

@media (min-width: 48rem) {
  .admin-header__inner {
    padding: var(--space-3) var(--space-8);
    flex-wrap: nowrap;
  }
}

/* --- Marca ---------------------------------------------------------------- */
.admin-header__brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: inherit;
  text-decoration: none;
  border-radius: var(--radius-md);
}

.admin-header__brand:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.admin-header__logo {
  width: 36px;
  height: 36px;
  display: block;
  flex-shrink: 0;
}

.admin-header__brand-text {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: var(--space-1);
  font-family: var(--font-display);
  line-height: 1;
  letter-spacing: var(--tracking-tight);
}

.admin-header__brand-first {
  font-weight: var(--weight-medium);
  font-size: 1.2rem;
  color: var(--text-strong);
}

.admin-header__brand-second {
  font-weight: var(--weight-semibold);
  font-size: 1.2rem;
  color: var(--brand);
}

.admin-header__brand-tag {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-muted);
  background: var(--surface-sunken);
  border: var(--border-width) solid var(--border);
  padding: 2px var(--space-2);
  border-radius: var(--radius-pill);
  align-self: center;
}

/* --- Botão hambúrguer (só no mobile) -------------------------------------- */
.admin-header__toggle {
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

.admin-header__toggle:hover {
  background: var(--surface-sunken);
}

.admin-header__toggle:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

/* --- Navegação ------------------------------------------------------------ */
.admin-header__nav {
  display: none;
  flex-basis: 100%;
}

.admin-header__nav.is-open {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-block: var(--space-2) var(--space-3);
}

.admin-header__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  align-items: stretch;
}

.admin-header__link {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding-inline: var(--space-3);
  color: var(--text-body);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: color var(--dur-fast) var(--ease-standard),
              background-color var(--dur-fast) var(--ease-standard);
}

.admin-header__link:hover {
  color: var(--brand);
  background: var(--brand-tint-quiet);
}

.admin-header__link:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.admin-header__link--active {
  color: var(--brand);
  background: var(--brand-tint-quiet);
  font-weight: var(--weight-semibold);
}

/* --- Conta / logout ------------------------------------------------------- */
.admin-header__account {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.admin-header__user {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
}

.admin-header__user-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  color: var(--text-subtle);
}

.admin-header__user-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 16rem;
}

.admin-header__logout {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding-inline: var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--text-body);
  background: transparent;
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-pill);
  cursor: pointer;
  white-space: nowrap;
  transition: color var(--dur-fast) var(--ease-standard),
              border-color var(--dur-fast) var(--ease-standard),
              background-color var(--dur-fast) var(--ease-standard);
}

.admin-header__logout:hover:not(:disabled) {
  color: var(--brand);
  border-color: var(--brand);
  background: var(--brand-tint-quiet);
}

.admin-header__logout:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.admin-header__logout:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* --- Desktop (≥ 48rem): nav inline, sem hambúrguer ------------------------ */
@media (min-width: 48rem) {
  .admin-header__toggle {
    display: none;
  }

  .admin-header__nav,
  .admin-header__nav.is-open {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-6);
    flex-basis: auto;
    flex: 1;
    padding-block: 0;
  }

  .admin-header__list {
    flex-direction: row;
    align-items: center;
    gap: var(--space-2);
  }

  .admin-header__account {
    margin-left: auto;
    padding-left: var(--space-4);
    border-left: var(--border-width) solid var(--border);
  }
}
</style>
