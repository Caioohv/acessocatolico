<script setup lang="ts">
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

interface ProductsMetricsResponse {
  data: ProductsMetricsData
}

useHead({ title: 'Produtos mais acessados: Painel Acesso Católico' })

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

const { data, status, error, refresh } = await useFetch<ProductsMetricsResponse>('/api/metrics/products', {
  query: { period },
  watch: [period],
})

const metrics = computed(() => data.value?.data)
const products = computed(() => metrics.value?.products ?? [])

const totalClicks = computed(() => {
  return products.value.reduce((acc, item) => acc + item.clicks, 0)
})

const totalProductsWithClicks = computed(() => {
  return products.value.length
})

const maxClicks = computed(() => {
  if (products.value.length === 0) return 1
  return Math.max(1, ...products.value.map(p => p.clicks))
})

function formatNumber(val: number): string {
  return new Intl.NumberFormat('pt-BR').format(val)
}
</script>

<template>
  <main class="metrics-page">
    <MetricsHeader
      title="Produtos mais acessados"
      description="Ranking de cliques nos itens da lojinha de afiliados."
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
        Não foi possível carregar o ranking de produtos. Tente novamente.
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
          label="Total de cliques"
          :value="totalClicks"
          :description="`Cliques em afiliados nos últimos ${period} dias`"
        />
        <MetricCard
          label="Produtos com cliques"
          :value="totalProductsWithClicks"
          description="Itens do catálogo com ao menos um clique"
        />
      </section>

      <!-- Ranking de produtos -->
      <section class="metrics-section" aria-labelledby="products-ranking-title">
        <div class="metrics-section__header">
          <h2 id="products-ranking-title" class="metrics-section__title">
            Ranking de cliques por produto
          </h2>
          <span class="metrics-section__sub">
            Itens ordenados pela quantidade de cliques no período
          </span>
        </div>

        <div
          v-if="products.length === 0"
          class="metrics-section__empty"
        >
          <p class="metrics-section__empty-text">
            Nenhum clique registrado neste período. Os dados aparecem quando os visitantes clicarem nos produtos da lojinha.
          </p>
        </div>

        <div v-else class="metrics-table-wrap">
          <table class="metrics-table">
            <thead>
              <tr>
                <th scope="col" class="metrics-table__th metrics-table__th--rank">Posição</th>
                <th scope="col" class="metrics-table__th">Produto</th>
                <th scope="col" class="metrics-table__th metrics-table__th--bar">Proporção</th>
                <th scope="col" class="metrics-table__th metrics-table__th--num">Cliques</th>
                <th scope="col" class="metrics-table__th metrics-table__th--actions">
                  <span class="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, idx) in products"
                :key="item.id"
                class="metrics-table__row"
              >
                <td class="metrics-table__td metrics-table__td--rank">
                  #{{ idx + 1 }}
                </td>
                <td class="metrics-table__td metrics-table__td--title">
                  <span class="metrics-table__name">
                    {{ item.title || 'Produto sem título ou excluído' }}
                  </span>
                </td>
                <td class="metrics-table__td metrics-table__td--bar">
                  <div class="metrics-table__bar-track" aria-hidden="true">
                    <div
                      class="metrics-table__bar-fill"
                      :style="{ width: `${Math.round((item.clicks / maxClicks) * 100)}%` }"
                    />
                  </div>
                </td>
                <td class="metrics-table__td metrics-table__td--num">
                  {{ formatNumber(item.clicks) }}
                </td>
                <td class="metrics-table__td metrics-table__td--actions">
                  <NuxtLink
                    :to="`/produtos/${item.id}/editar`"
                    class="metrics-table__action-btn"
                    :aria-label="`Editar ${item.title || 'produto'}`"
                  >
                    Editar
                  </NuxtLink>
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
  min-width: 34rem;
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
  width: 25%;
}

.metrics-table__th--num {
  text-align: right;
  width: 7rem;
}

.metrics-table__th--actions {
  text-align: right;
  width: 6rem;
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

.metrics-table__name {
  font-weight: var(--weight-medium);
  color: var(--text-strong);
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
  background: var(--accent);
  border-radius: var(--radius-pill);
  transition: width var(--dur-base) var(--ease-standard);
}

.metrics-table__td--num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-weight: var(--weight-medium);
  color: var(--text-strong);
}

.metrics-table__td--actions {
  text-align: right;
}

.metrics-table__action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding-inline: var(--space-3);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--brand);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: color var(--dur-fast) var(--ease-standard),
              background-color var(--dur-fast) var(--ease-standard);
}

.metrics-table__action-btn:hover {
  color: var(--brand-strong);
  background: var(--brand-tint-quiet);
}

.metrics-table__action-btn:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 2px;
}

/* sr-only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
