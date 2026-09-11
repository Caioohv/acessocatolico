<script setup lang="ts">
interface ArticleMetricItem {
  slug: string
  reads: number
}

interface ArticlesMetricsData {
  period: number
  from: string
  articles: ArticleMetricItem[]
}

interface ArticlesMetricsResponse {
  data: ArticlesMetricsData
}

useHead({ title: 'Leitura de artigos: Painel Acesso Católico' })

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

const { data, status, error, refresh } = await useFetch<ArticlesMetricsResponse>('/api/metrics/articles', {
  query: { period },
  watch: [period],
})

const metrics = computed(() => data.value?.data)
const articles = computed(() => metrics.value?.articles ?? [])

const totalReads = computed(() => {
  return articles.value.reduce((acc, item) => acc + item.reads, 0)
})

const totalArticlesWithReads = computed(() => {
  return articles.value.length
})

const maxReads = computed(() => {
  if (articles.value.length === 0) return 1
  return Math.max(1, ...articles.value.map(a => a.reads))
})

function formatNumber(val: number): string {
  return new Intl.NumberFormat('pt-BR').format(val)
}
</script>

<template>
  <main class="metrics-page">
    <MetricsHeader
      title="Leitura de artigos"
      description="Ranking de leitura das publicações do blog."
      :period="period"
      @update:period="updatePeriod"
    />

    <!-- Estado de carregamento -->
    <div
      v-if="status === 'pending'"
      class="metrics-page__state"
      aria-live="polite"
    >
      <span class="metrics-page__spinner" aria-hidden="true" />
      <span>Carregando métricas…</span>
    </div>

    <!-- Estado de erro -->
    <div
      v-else-if="error"
      class="metrics-page__error"
      role="alert"
    >
      <p class="metrics-page__error-text">
        Não foi possível carregar o ranking de artigos. Tente novamente.
      </p>
      <button
        type="button"
        class="metrics-page__retry-btn"
        @click="() => refresh()"
      >
        Recarregar
      </button>
    </div>

    <!-- Conteúdo principal -->
    <div v-else class="metrics-page__content">
      <!-- Cards de resumo -->
      <section class="metrics-page__cards" aria-label="Indicadores principais">
        <MetricCard
          label="Total de leituras"
          :value="totalReads"
          :description="`Leituras de artigos nos últimos ${period} dias`"
        />
        <MetricCard
          label="Artigos com leituras"
          :value="totalArticlesWithReads"
          description="Publicações do blog lidas no período"
        />
      </section>

      <!-- Ranking de artigos -->
      <section class="metrics-section" aria-labelledby="articles-ranking-title">
        <div class="metrics-section__header">
          <h2 id="articles-ranking-title" class="metrics-section__title">
            Ranking de leituras por artigo
          </h2>
          <span class="metrics-section__sub">
            Publicações ordenadas pela contagem de leituras no período
          </span>
        </div>

        <div
          v-if="articles.length === 0"
          class="metrics-section__empty"
        >
          <p class="metrics-section__empty-text">
            Nenhuma leitura registrada neste período. Os dados aparecem quando os leitores acessarem os artigos do blog.
          </p>
        </div>

        <div v-else class="metrics-table-wrap">
          <table class="metrics-table">
            <thead>
              <tr>
                <th scope="col" class="metrics-table__th metrics-table__th--rank">Posição</th>
                <th scope="col" class="metrics-table__th">Artigo (slug)</th>
                <th scope="col" class="metrics-table__th metrics-table__th--bar">Proporção</th>
                <th scope="col" class="metrics-table__th metrics-table__th--num">Leituras</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, idx) in articles"
                :key="item.slug"
                class="metrics-table__row"
              >
                <td class="metrics-table__td metrics-table__td--rank">
                  #{{ idx + 1 }}
                </td>
                <td class="metrics-table__td metrics-table__td--slug">
                  <code>/blog/{{ item.slug }}</code>
                </td>
                <td class="metrics-table__td metrics-table__td--bar">
                  <div class="metrics-table__bar-track" aria-hidden="true">
                    <div
                      class="metrics-table__bar-fill"
                      :style="{ width: `${Math.round((item.reads / maxReads) * 100)}%` }"
                    />
                  </div>
                </td>
                <td class="metrics-table__td metrics-table__td--num">
                  {{ formatNumber(item.reads) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.metrics-page {
  max-width: var(--container-panel);
  margin-inline: auto;
  padding-inline: var(--space-4);
  padding-block: var(--space-8);
}

@media (min-width: 48rem) {
  .metrics-page {
    padding-inline: var(--space-8);
  }
}

/* ---- loading & error ---- */
.metrics-page__state {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--text-muted);
  font-size: var(--text-sm);
  padding-block: var(--space-12);
}

.metrics-page__spinner {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--border);
  border-top-color: var(--brand);
  border-radius: var(--radius-pill);
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.metrics-page__error {
  background: var(--danger-100);
  border: var(--border-width) solid var(--danger-600);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  align-items: flex-start;
}

.metrics-page__error-text {
  color: var(--danger-600);
  font-size: var(--text-sm);
}

.metrics-page__retry-btn {
  display: inline-flex;
  align-items: center;
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
}

.metrics-page__retry-btn:hover {
  background: var(--surface-sunken);
}

/* ---- content ---- */
.metrics-page__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

/* ---- cards grid ---- */
.metrics-page__cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 30rem) {
  .metrics-page__cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ---- sections ---- */
.metrics-section {
  background: var(--surface-card);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}

@media (min-width: 48rem) {
  .metrics-section {
    padding: var(--space-8);
  }
}

.metrics-section__header {
  margin-bottom: var(--space-6);
}

.metrics-section__title {
  font-family: var(--font-sans);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  color: var(--text-strong);
  line-height: var(--leading-tight);
}

.metrics-section__sub {
  display: block;
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-top: var(--space-1);
}

.metrics-section__empty {
  padding-block: var(--space-8);
  text-align: center;
}

.metrics-section__empty-text {
  font-size: var(--text-sm);
  color: var(--text-muted);
  max-width: 45ch;
  margin-inline: auto;
  line-height: var(--leading-normal);
}

/* ---- tables ---- */
.metrics-table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
}

.metrics-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
  min-width: 30rem;
}

.metrics-table__th {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-muted);
  background: var(--surface-sunken);
  border-bottom: var(--border-width) solid var(--border);
  white-space: nowrap;
}

.metrics-table__th--rank {
  width: 5rem;
}

.metrics-table__th--bar {
  width: 30%;
}

.metrics-table__th--num {
  text-align: right;
  width: 7rem;
}

.metrics-table__row {
  border-bottom: var(--border-width) solid var(--border);
  transition: background var(--dur-fast) var(--ease-standard);
}

.metrics-table__row:last-child {
  border-bottom: none;
}

.metrics-table__row:hover {
  background: var(--surface-sunken);
}

.metrics-table__td {
  padding: var(--space-3) var(--space-4);
  color: var(--text-body);
  vertical-align: middle;
}

.metrics-table__td--rank {
  font-weight: var(--weight-semibold);
  color: var(--text-muted);
}

.metrics-table__td--slug code {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-strong);
  background: var(--surface-sunken);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  word-break: break-all;
}

.metrics-table__bar-track {
  width: 100%;
  height: var(--space-2);
  background: var(--surface-sunken);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.metrics-table__bar-fill {
  height: 100%;
  background: var(--brand);
  border-radius: var(--radius-pill);
  transition: width var(--dur-base) var(--ease-standard);
}

.metrics-table__td--num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-weight: var(--weight-medium);
  color: var(--text-strong);
}
</style>
