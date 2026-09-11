<script setup lang="ts">
interface SiteMetricsData {
  period: number
  from: string
  pageviewsPerDay: { date: string; count: number }[]
  topPaths: { path: string; count: number }[]
  uniqueSessions: number
}

interface ProductMetricItem {
  id: string
  title: string | null
  clicks: number
}

interface ProductsMetricsData {
  period: number
  from: string
  products: ProductMetricItem[]
}

interface ArticleMetricItem {
  slug: string
  reads: number
}

interface ArticlesMetricsData {
  period: number
  from: string
  articles: ArticleMetricItem[]
}

interface AdminProductSummary {
  id: string
  active: boolean
}

useHead({ title: 'Painel Acesso Católico' })

const route = useRoute()
const router = useRouter()

const period = computed<number>(() => {
  const p = Number(route.query.period)
  if ([7, 30, 90, 365].includes(p)) return p
  return 30
})

function updatePeriod(newPeriod: number) {
  router.push({
    query: {
      ...route.query,
      period: newPeriod !== 30 ? newPeriod : undefined,
    },
  })
}

const {
  data: siteData,
  status: siteStatus,
  error: siteError,
  refresh: refreshSite,
} = await useFetch<{ data: SiteMetricsData }>('/api/metrics/site', {
  query: { period },
  watch: [period],
})

const {
  data: productsMetricsData,
  status: productsStatus,
  error: productsError,
  refresh: refreshProducts,
} = await useFetch<{ data: ProductsMetricsData }>('/api/metrics/products', {
  query: { period },
  watch: [period],
})

const {
  data: articlesMetricsData,
  status: articlesStatus,
  error: articlesError,
  refresh: refreshArticles,
} = await useFetch<{ data: ArticlesMetricsData }>('/api/metrics/articles', {
  query: { period },
  watch: [period],
})

const {
  data: catalogData,
  status: catalogStatus,
  error: catalogError,
  refresh: refreshCatalog,
} = await useFetch<{ data: AdminProductSummary[] }>('/api/products')

const isLoading = computed(() => {
  return siteStatus.value === 'pending'
    || productsStatus.value === 'pending'
    || articlesStatus.value === 'pending'
    || catalogStatus.value === 'pending'
})

const hasError = computed(() => {
  return Boolean(siteError.value || productsError.value || articlesError.value || catalogError.value)
})

async function refreshAll() {
  await Promise.allSettled([
    refreshSite(),
    refreshProducts(),
    refreshArticles(),
    refreshCatalog(),
  ])
}

const totalPageviews = computed(() => {
  const rows = siteData.value?.data?.pageviewsPerDay ?? []
  return rows.reduce((acc, row) => acc + row.count, 0)
})

const uniqueSessions = computed(() => {
  return siteData.value?.data?.uniqueSessions ?? 0
})

const totalClicks = computed(() => {
  const items = productsMetricsData.value?.data?.products ?? []
  return items.reduce((acc, item) => acc + item.clicks, 0)
})

const totalReads = computed(() => {
  const items = articlesMetricsData.value?.data?.articles ?? []
  return items.reduce((acc, item) => acc + item.reads, 0)
})

const totalCatalogProducts = computed(() => {
  return catalogData.value?.data?.length ?? 0
})

const activeCatalogProducts = computed(() => {
  return catalogData.value?.data?.filter(p => p.active).length ?? 0
})

function formatNumber(val: number): string {
  return new Intl.NumberFormat('pt-BR').format(val)
}

function targetWithPeriod(path: string) {
  return {
    path,
    query: period.value !== 30 ? { period: period.value } : undefined,
  }
}
</script>

<template>
  <main class="admin-home">
    <header class="admin-home__header">
      <div class="admin-home__header-titles">
        <span class="admin-home__eyebrow">Acesso Católico</span>
        <h1 class="admin-home__title">Painel administrativo</h1>
        <p class="admin-home__lead">
          Visão geral de acessos, engajamento e catálogo da plataforma.
        </p>
      </div>

      <div class="admin-home__header-controls">
        <span class="admin-home__controls-label">Período de análise</span>
        <PeriodSelector
          :model-value="period"
          @update:model-value="updatePeriod"
        />
      </div>
    </header>

    <div
      v-if="hasError"
      class="admin-home__alert"
      role="alert"
    >
      <p class="admin-home__alert-text">
        Ocorreu uma instabilidade ao consultar parte dos indicadores. Os números disponíveis continuam visíveis abaixo.
      </p>
      <button
        type="button"
        class="admin-home__retry-btn"
        @click="refreshAll"
      >
        Atualizar dados
      </button>
    </div>

    <div
      v-if="isLoading"
      class="admin-home__loading"
      aria-live="polite"
    >
      <span class="admin-home__spinner" aria-hidden="true" />
      <span>Atualizando números do período…</span>
    </div>

    <section class="admin-home__section" aria-labelledby="summary-title">
      <div class="admin-home__section-head">
        <h2 id="summary-title" class="admin-home__section-title">
          Resumo do período
        </h2>
        <span class="admin-home__section-desc">
          Indicadores acumulados nos últimos {{ period }} dias
        </span>
      </div>

      <div class="admin-home__summary-grid">
        <MetricCard
          label="Visualizações"
          :value="totalPageviews"
          :description="`Total nos últimos ${period} dias`"
        />
        <MetricCard
          label="Sessões únicas"
          :value="uniqueSessions"
          description="Visitantes com sessões distintas"
        />
        <MetricCard
          label="Cliques em afiliados"
          :value="totalClicks"
          description="Cliques registrados nos produtos"
        />
        <MetricCard
          label="Leituras de artigos"
          :value="totalReads"
          description="Artigos do blog acessados"
        />
        <MetricCard
          label="Produtos no catálogo"
          :value="totalCatalogProducts"
          :description="`${activeCatalogProducts} itens ativos na lojinha`"
        />
      </div>
    </section>

    <section class="admin-home__section" aria-labelledby="shortcuts-title">
      <div class="admin-home__section-head">
        <h2 id="shortcuts-title" class="admin-home__section-title">
          Seções do painel
        </h2>
        <span class="admin-home__section-desc">
          Atalhos rápidos para gestão de conteúdo e relatórios completos
        </span>
      </div>

      <nav class="admin-home__nav-grid" aria-label="Seções do painel">
        <NuxtLink to="/produtos" class="admin-home__nav-card">
          <div class="admin-home__nav-card-top">
            <span class="admin-home__badge admin-home__badge--catalog">Catálogo</span>
            <span class="admin-home__stat-pill">
              {{ formatNumber(totalCatalogProducts) }} produtos
            </span>
          </div>
          <h3 class="admin-home__nav-card-title">Gestão de Produtos</h3>
          <p class="admin-home__nav-card-desc">
            Cadastre novos itens, altere links de afiliados, preços de referência e visibilidade na lojinha.
          </p>
          <div class="admin-home__nav-card-footer">
            <span class="admin-home__nav-card-cta">
              Abrir catálogo
              <svg class="admin-home__cta-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 10h12m-6-6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </NuxtLink>

        <NuxtLink :to="targetWithPeriod('/metricas/site')" class="admin-home__nav-card">
          <div class="admin-home__nav-card-top">
            <span class="admin-home__badge admin-home__badge--metrics">Métricas</span>
            <span class="admin-home__stat-pill">
              {{ formatNumber(totalPageviews) }} acessos
            </span>
          </div>
          <h3 class="admin-home__nav-card-title">Métricas do Site</h3>
          <p class="admin-home__nav-card-desc">
            Acompanhe o volume diário de acessos, caminhos mais visitados e estimativa de visitantes únicos.
          </p>
          <div class="admin-home__nav-card-footer">
            <span class="admin-home__nav-card-cta">
              Ver relatório de acessos
              <svg class="admin-home__cta-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 10h12m-6-6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </NuxtLink>

        <NuxtLink :to="targetWithPeriod('/metricas/produtos')" class="admin-home__nav-card">
          <div class="admin-home__nav-card-top">
            <span class="admin-home__badge admin-home__badge--metrics">Métricas</span>
            <span class="admin-home__stat-pill">
              {{ formatNumber(totalClicks) }} cliques
            </span>
          </div>
          <h3 class="admin-home__nav-card-title">Produtos Mais Acessados</h3>
          <p class="admin-home__nav-card-desc">
            Ranking detalhado de cliques por item para identificar os produtos com maior interesse do público.
          </p>
          <div class="admin-home__nav-card-footer">
            <span class="admin-home__nav-card-cta">
              Ver ranking de produtos
              <svg class="admin-home__cta-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 10h12m-6-6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </NuxtLink>

        <NuxtLink :to="targetWithPeriod('/metricas/artigos')" class="admin-home__nav-card">
          <div class="admin-home__nav-card-top">
            <span class="admin-home__badge admin-home__badge--metrics">Métricas</span>
            <span class="admin-home__stat-pill">
              {{ formatNumber(totalReads) }} leituras
            </span>
          </div>
          <h3 class="admin-home__nav-card-title">Leituras de Artigos</h3>
          <p class="admin-home__nav-card-desc">
            Relatório de leituras e páginas de conteúdo editorial do blog com melhor engajamento.
          </p>
          <div class="admin-home__nav-card-footer">
            <span class="admin-home__nav-card-cta">
              Ver ranking de artigos
              <svg class="admin-home__cta-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 10h12m-6-6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </NuxtLink>
      </nav>
    </section>
  </main>
</template>

<style scoped>
.admin-home {
  max-width: var(--container-panel);
  margin-inline: auto;
  padding-inline: var(--space-4);
  padding-block: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

@media (min-width: 48rem) {
  .admin-home {
    padding-inline: var(--space-8);
    gap: var(--space-10);
  }
}

/* ---- header ---- */
.admin-home__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

@media (min-width: 48rem) {
  .admin-home__header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.admin-home__header-titles {
  max-width: var(--measure-prose);
}

.admin-home__eyebrow {
  display: block;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--brand);
}

.admin-home__title {
  margin-top: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  color: var(--text-strong);
}

.admin-home__lead {
  margin-top: var(--space-3);
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--text-muted);
}

.admin-home__header-controls {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex-shrink: 0;
}

.admin-home__controls-label {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}

/* ---- alert & loading ---- */
.admin-home__alert {
  background: var(--danger-100);
  border: var(--border-width) solid var(--danger-600);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  align-items: flex-start;
}

@media (min-width: 48rem) {
  .admin-home__alert {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.admin-home__alert-text {
  color: var(--danger-600);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

.admin-home__retry-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding-inline: var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--text-strong);
  background: var(--surface-card);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
  white-space: nowrap;
  transition: background-color var(--dur-fast) var(--ease-standard);
}

.admin-home__retry-btn:hover {
  background: var(--surface-sunken);
}

.admin-home__loading {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--text-muted);
  font-size: var(--text-sm);
  padding-block: var(--space-2);
}

.admin-home__spinner {
  display: inline-block;
  width: 1.125rem;
  height: 1.125rem;
  border: 2px solid var(--border);
  border-top-color: var(--brand);
  border-radius: var(--radius-pill);
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ---- section headers ---- */
.admin-home__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.admin-home__section-head {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.admin-home__section-title {
  font-family: var(--font-sans);
  font-size: var(--text-h2);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-tight);
  color: var(--text-strong);
}

.admin-home__section-desc {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

/* ---- summary cards grid ---- */
.admin-home__summary-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 30rem) {
  .admin-home__summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 48rem) {
  .admin-home__summary-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 64rem) {
  .admin-home__summary-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* ---- navigation cards grid ---- */
.admin-home__nav-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 30rem) {
  .admin-home__nav-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 64rem) {
  .admin-home__nav-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.admin-home__nav-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-6);
  background: var(--surface-card);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  min-height: 12rem;
  transition: box-shadow var(--dur-fast) var(--ease-standard),
              border-color var(--dur-fast) var(--ease-standard),
              transform var(--dur-fast) var(--ease-standard);
}

.admin-home__nav-card:hover {
  border-color: var(--brand);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.admin-home__nav-card:focus-visible {
  outline: none;
  border-color: var(--brand);
  box-shadow: var(--shadow-focus);
}

.admin-home__nav-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.admin-home__badge {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-pill);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  line-height: 1;
}

.admin-home__badge--catalog {
  background: var(--surface-sunken);
  color: var(--text-muted);
}

.admin-home__badge--metrics {
  background: var(--brand-tint-quiet);
  color: var(--brand);
}

.admin-home__stat-pill {
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--text-subtle);
  background: var(--surface-sunken);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  white-space: nowrap;
}

.admin-home__nav-card-title {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--text-strong);
  line-height: var(--leading-snug);
}

.admin-home__nav-card-desc {
  font-size: var(--text-sm);
  color: var(--text-muted);
  line-height: var(--leading-normal);
  flex: 1;
}

.admin-home__nav-card-footer {
  margin-top: auto;
  padding-top: var(--space-2);
  border-top: var(--border-width) solid var(--border);
}

.admin-home__nav-card-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--brand);
  transition: gap var(--dur-fast) var(--ease-standard);
}

.admin-home__nav-card:hover .admin-home__nav-card-cta {
  gap: var(--space-2);
}

.admin-home__cta-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}
</style>
