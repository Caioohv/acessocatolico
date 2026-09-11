<script setup lang="ts">
interface SiteMetricsData {
  period: number
  from: string
  pageviewsPerDay: { date: string; count: number }[]
  topPaths: { path: string; count: number }[]
  uniqueSessions: number
}

interface SiteMetricsResponse {
  data: SiteMetricsData
}

useHead({ title: 'Acesso ao site: Painel Acesso Católico' })

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

const { data, status, error, refresh } = await useFetch<SiteMetricsResponse>('/api/metrics/site', {
  query: { period },
  watch: [period],
})

const metrics = computed(() => data.value?.data)
const pageviewsPerDay = computed(() => metrics.value?.pageviewsPerDay ?? [])
const topPaths = computed(() => metrics.value?.topPaths ?? [])
const uniqueSessions = computed(() => metrics.value?.uniqueSessions ?? 0)

const totalPageviews = computed(() => {
  return pageviewsPerDay.value.reduce((acc, row) => acc + row.count, 0)
})

const dailyAverage = computed(() => {
  const countDays = pageviewsPerDay.value.length || period.value
  return countDays > 0 ? Math.round(totalPageviews.value / countDays) : 0
})

const maxDailyCount = computed(() => {
  if (pageviewsPerDay.value.length === 0) return 1
  return Math.max(1, ...pageviewsPerDay.value.map(d => d.count))
})

const maxPathCount = computed(() => {
  if (topPaths.value.length === 0) return 1
  return Math.max(1, ...topPaths.value.map(p => p.count))
})

function formatDayLabel(isoDate: string): string {
  const parts = isoDate.split('-')
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}`
  }
  return isoDate
}

function formatFullDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  if (!year || !month || !day) return isoDate
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(new Date(year, month - 1, day))
}

function formatNumber(val: number): string {
  return new Intl.NumberFormat('pt-BR').format(val)
}
</script>

<template>
  <main class="metrics-page">
    <MetricsHeader
      title="Acesso ao site"
      description="Visualizações de página, caminhos mais visitados e visitantes únicos."
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
        Não foi possível carregar as métricas do site. Tente novamente.
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
          label="Visualizações totais"
          :value="totalPageviews"
          :description="`Soma de acessos nos últimos ${period} dias`"
        />
        <MetricCard
          label="Média diária"
          :value="dailyAverage"
          description="Visualizações médias por dia com registro"
        />
        <MetricCard
          label="Sessões únicas estimadas"
          :value="uniqueSessions"
          description="Visitantes com sessões distintas no período"
        />
      </section>

      <!-- Gráfico de visualizações diárias -->
      <section class="metrics-section" aria-labelledby="chart-title">
        <div class="metrics-section__header">
          <h2 id="chart-title" class="metrics-section__title">
            Visualizações por dia
          </h2>
          <span class="metrics-section__sub">
            Distribuição diária de acessos no período
          </span>
        </div>

        <div
          v-if="pageviewsPerDay.length === 0"
          class="metrics-section__empty"
        >
          <p class="metrics-section__empty-text">
            Nenhum dado registrado neste período. Os números aparecem assim que os visitantes acessarem o site.
          </p>
        </div>

        <div v-else class="metrics-chart-wrap">
          <div
            class="metrics-chart"
            role="region"
            aria-label="Gráfico de barras de visualizações diárias"
            tabindex="0"
          >
            <div class="metrics-chart__bars">
              <div
                v-for="row in pageviewsPerDay"
                :key="row.date"
                class="metrics-chart__col"
              >
                <span class="metrics-chart__col-val">{{ row.count }}</span>
                <div class="metrics-chart__bar-track">
                  <div
                    class="metrics-chart__bar-fill"
                    :style="{ height: `${Math.max(4, Math.round((row.count / maxDailyCount) * 100))}%` }"
                    :title="`${formatNumber(row.count)} visualizações em ${formatFullDate(row.date)}`"
                  />
                </div>
                <span class="metrics-chart__col-date">{{ formatDayLabel(row.date) }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Páginas mais acessadas -->
      <section class="metrics-section" aria-labelledby="top-paths-title">
        <div class="metrics-section__header">
          <h2 id="top-paths-title" class="metrics-section__title">
            Páginas mais acessadas
          </h2>
          <span class="metrics-section__sub">
            Até 10 caminhos com maior volume de visualizações
          </span>
        </div>

        <div
          v-if="topPaths.length === 0"
          class="metrics-section__empty"
        >
          <p class="metrics-section__empty-text">
            Nenhum caminho registrado neste período.
          </p>
        </div>

        <div v-else class="metrics-table-wrap">
          <table class="metrics-table">
            <thead>
              <tr>
                <th scope="col" class="metrics-table__th metrics-table__th--rank">Posição</th>
                <th scope="col" class="metrics-table__th">Caminho</th>
                <th scope="col" class="metrics-table__th metrics-table__th--bar">Proporção</th>
                <th scope="col" class="metrics-table__th metrics-table__th--num">Visualizações</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, idx) in topPaths"
                :key="item.path"
                class="metrics-table__row"
              >
                <td class="metrics-table__td metrics-table__td--rank">
                  #{{ idx + 1 }}
                </td>
                <td class="metrics-table__td metrics-table__td--path">
                  <code>{{ item.path }}</code>
                </td>
                <td class="metrics-table__td metrics-table__td--bar">
                  <div class="metrics-table__bar-track" aria-hidden="true">
                    <div
                      class="metrics-table__bar-fill"
                      :style="{ width: `${Math.round((item.count / maxPathCount) * 100)}%` }"
                    />
                  </div>
                </td>
                <td class="metrics-table__td metrics-table__td--num">
                  {{ formatNumber(item.count) }}
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

@media (min-width: 48rem) {
  .metrics-page__cards {
    grid-template-columns: repeat(3, 1fr);
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

/* ---- bar chart dataviz ---- */
.metrics-chart-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: var(--space-2);
}

.metrics-chart {
  min-width: 100%;
}

.metrics-chart:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.metrics-chart__bars {
  display: flex;
  align-items: flex-end;
  gap: var(--space-2);
  height: 12rem;
  padding-top: var(--space-6);
  min-width: max-content;
}

.metrics-chart__col {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--space-8);
  height: 100%;
}

.metrics-chart__col-val {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  line-height: 1;
  margin-bottom: var(--space-1);
}

.metrics-chart__bar-track {
  display: flex;
  align-items: flex-end;
  width: 100%;
  flex: 1;
  background: var(--surface-sunken);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.metrics-chart__bar-fill {
  width: 100%;
  background: var(--brand);
  border-radius: var(--radius-sm);
  transition: height var(--dur-base) var(--ease-standard),
              background-color var(--dur-fast) var(--ease-standard);
  cursor: pointer;
}

.metrics-chart__bar-fill:hover {
  background: var(--brand-hover);
}

.metrics-chart__col-date {
  font-size: var(--text-xs);
  color: var(--text-muted);
  line-height: 1;
  margin-top: var(--space-2);
  white-space: nowrap;
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
  min-width: 32rem;
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
  width: 8rem;
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

.metrics-table__td--path code {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-strong);
  background: var(--surface-sunken);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  word-break: break-all;
}

.metrics-table__td--bar {
  vertical-align: middle;
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
