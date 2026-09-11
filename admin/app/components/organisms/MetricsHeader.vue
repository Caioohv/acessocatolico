<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  period: number
}>()

const emit = defineEmits<{
  'update:period': [value: number]
}>()

const route = useRoute()

const navTabs = [
  { name: 'site', label: 'Acesso ao site', path: '/metricas/site' },
  { name: 'produtos', label: 'Produtos mais acessados', path: '/metricas/produtos' },
  { name: 'artigos', label: 'Leitura de artigos', path: '/metricas/artigos' },
]

function isCurrentTab(tabPath: string): boolean {
  return route.path === tabPath
}

function tabTarget(tabPath: string) {
  return {
    path: tabPath,
    query: props.period !== 30 ? { period: props.period } : {},
  }
}
</script>

<template>
  <header class="metrics-header">
    <nav class="metrics-header__breadcrumb" aria-label="Navegação hierárquica">
      <NuxtLink to="/" class="metrics-header__back-link">
        <svg
          class="metrics-header__back-icon"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 15l-5-5 5-5" />
        </svg>
        <span>Voltar ao painel</span>
      </NuxtLink>
    </nav>

    <div class="metrics-header__main">
      <div class="metrics-header__titles">
        <span class="metrics-header__eyebrow">Métricas</span>
        <h1 class="metrics-header__title">{{ title }}</h1>
        <p class="metrics-header__desc">{{ description }}</p>
      </div>

      <div class="metrics-header__controls">
        <PeriodSelector
          :model-value="period"
          @update:model-value="emit('update:period', $event)"
        />
      </div>
    </div>

    <nav class="metrics-header__tabs" aria-label="Abas de métricas">
      <div class="metrics-header__tabs-track">
        <NuxtLink
          v-for="tab in navTabs"
          :key="tab.path"
          :to="tabTarget(tab.path)"
          class="metrics-header__tab"
          :class="{ 'metrics-header__tab--active': isCurrentTab(tab.path) }"
          :aria-current="isCurrentTab(tab.path) ? 'page' : undefined"
        >
          {{ tab.label }}
        </NuxtLink>
        <NuxtLink
          to="/produtos"
          class="metrics-header__tab metrics-header__tab--secondary"
        >
          Gerenciar produtos
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.metrics-header {
  margin-bottom: var(--space-8);
}

/* ---- breadcrumb ---- */
.metrics-header__breadcrumb {
  margin-bottom: var(--space-4);
}

.metrics-header__back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  min-height: 44px;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--text-muted);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: color var(--dur-fast) var(--ease-standard);
}

.metrics-header__back-link:hover {
  color: var(--brand);
}

.metrics-header__back-link:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.metrics-header__back-icon {
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
}

/* ---- main row ---- */
.metrics-header__main {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

@media (min-width: 48rem) {
  .metrics-header__main {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.metrics-header__titles {
  max-width: var(--measure-prose);
}

.metrics-header__eyebrow {
  display: block;
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--brand);
  margin-bottom: var(--space-1);
}

.metrics-header__title {
  font-family: var(--font-sans);
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  color: var(--text-strong);
}

.metrics-header__desc {
  margin-top: var(--space-2);
  font-size: var(--text-base);
  color: var(--text-muted);
  line-height: var(--leading-normal);
}

.metrics-header__controls {
  flex-shrink: 0;
}

/* ---- tabs ---- */
.metrics-header__tabs {
  border-bottom: var(--border-width) solid var(--border);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.metrics-header__tabs::-webkit-scrollbar {
  display: none;
}

.metrics-header__tabs-track {
  display: flex;
  gap: var(--space-2);
  min-width: max-content;
}

.metrics-header__tab {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding-inline: var(--space-3);
  padding-block: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--text-muted);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  white-space: nowrap;
  transition: color var(--dur-fast) var(--ease-standard),
              border-color var(--dur-fast) var(--ease-standard);
}

.metrics-header__tab:hover {
  color: var(--text-strong);
}

.metrics-header__tab:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.metrics-header__tab--active {
  color: var(--brand);
  font-weight: var(--weight-semibold);
  border-bottom-color: var(--brand);
}

.metrics-header__tab--secondary {
  color: var(--text-subtle);
  margin-left: auto;
}

.metrics-header__tab--secondary:hover {
  color: var(--brand);
}
</style>
