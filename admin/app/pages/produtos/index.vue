<script setup lang="ts">
// Shape of a product returned by GET /api/products (admin).
interface AdminProduct {
  id: string
  title: string
  description: string | null
  priceRef: string | null
  category: string
  affiliateUrl: string | null
  imageUrl: string | null
  active: boolean
  createdAt: string
  updatedAt: string
}

useHead({ title: 'Produtos — Painel Acesso Católico' })

const { data, status, error } = await useFetch<{ data: AdminProduct[] }>('/api/products', {
  default: () => ({ data: [] }),
})

const products = computed(() => data.value?.data ?? [])

function formatPrice(raw: string | null | undefined): string {
  if (!raw) return '—'
  // If already formatted (e.g. 'R$ 49,90'), return as-is.
  if (/^R\$/.test(raw)) return raw
  // Try to parse as number and format.
  const n = Number(raw)
  if (Number.isFinite(n)) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)
  }
  return raw
}
</script>

<template>
  <main class="produto-list">
    <header class="produto-list__header">
      <div>
        <span class="produto-list__eyebrow">Gestão</span>
        <h1 class="produto-list__title">Produtos</h1>
      </div>
      <NuxtLink to="/produtos/novo" class="produto-list__add-btn">
        + Novo produto
      </NuxtLink>
    </header>

    <!-- Loading state -->
    <div
      v-if="status === 'pending'"
      class="produto-list__loading"
      aria-live="polite"
    >
      <span class="produto-list__spinner" aria-hidden="true" />
      <span>Carregando produtos…</span>
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="produto-list__error"
      role="alert"
    >
      <p class="produto-list__error-text">
        Não foi possível carregar os produtos. Tente recarregar a página.
      </p>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="products.length === 0"
      class="produto-list__empty"
    >
      <div class="produto-list__empty-icon" aria-hidden="true">📦</div>
      <h2 class="produto-list__empty-title">Nenhum produto cadastrado</h2>
      <p class="produto-list__empty-desc">
        Quando você adicionar produtos à lojinha, eles aparecerão aqui.
      </p>
    </div>

    <!-- Table -->
    <div
      v-else
      class="produto-list__table-wrap"
    >
      <table class="produto-list__table">
        <thead>
          <tr>
            <th scope="col" class="produto-list__th produto-list__th--title">Título</th>
            <th scope="col" class="produto-list__th produto-list__th--category">Categoria</th>
            <th scope="col" class="produto-list__th produto-list__th--price">Preço ref.</th>
            <th scope="col" class="produto-list__th produto-list__th--status">Status</th>
            <th scope="col" class="produto-list__th produto-list__th--actions">
              <span class="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            class="produto-list__row"
          >
            <td class="produto-list__td produto-list__td--title">
              <span class="produto-list__name">{{ product.title }}</span>
            </td>
            <td class="produto-list__td">
              <span class="produto-list__category">{{ product.category }}</span>
            </td>
            <td class="produto-list__td produto-list__td--price">
              {{ formatPrice(product.priceRef) }}
            </td>
            <td class="produto-list__td">
              <span
                class="produto-list__badge"
                :class="product.active ? 'produto-list__badge--active' : 'produto-list__badge--inactive'"
              >
                {{ product.active ? 'Ativo' : 'Inativo' }}
              </span>
            </td>
            <td class="produto-list__td produto-list__td--actions">
              <NuxtLink
                :to="`/produtos/${product.id}/editar`"
                class="produto-list__edit-link"
                :aria-label="`Editar ${product.title}`"
              >
                Editar
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="produto-list__count">
        {{ products.length }} {{ products.length === 1 ? 'produto' : 'produtos' }}
      </p>
    </div>
  </main>
</template>

<style scoped>
/* ============================================================
   Layout da página
   ============================================================ */
.produto-list {
  max-width: var(--container-panel);
  margin-inline: auto;
  padding-inline: var(--space-4);
  padding-block: var(--space-8);
}

@media (min-width: 48rem) {
  .produto-list {
    padding-inline: var(--space-8);
  }
}

/* ============================================================
   Cabeçalho
   ============================================================ */
.produto-list__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.produto-list__eyebrow {
  display: block;
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--brand);
  margin-bottom: var(--space-1);
}

.produto-list__title {
  font-family: var(--font-sans);
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  color: var(--text-strong);
}

/* ============================================================
   Estado de carregamento
   ============================================================ */
.produto-list__loading {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--text-muted);
  font-size: var(--text-sm);
  padding-block: var(--space-12);
}

.produto-list__spinner {
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

/* ============================================================
   Estado de erro
   ============================================================ */
.produto-list__error {
  background: var(--danger-100);
  border: var(--border-width) solid oklch(0.88 0.06 26);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.produto-list__error-text {
  color: oklch(0.42 0.12 26);
  font-size: var(--text-sm);
}

/* ============================================================
   Estado vazio
   ============================================================ */
.produto-list__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-block: var(--space-16) var(--space-12);
  gap: var(--space-3);
}

.produto-list__empty-icon {
  font-size: 3rem;
  line-height: 1;
  margin-bottom: var(--space-2);
}

.produto-list__empty-title {
  font-family: var(--font-sans);
  font-size: var(--text-h4);
  font-weight: var(--weight-semibold);
  color: var(--text-strong);
}

.produto-list__empty-desc {
  font-size: var(--text-sm);
  color: var(--text-muted);
  max-width: 36ch;
  line-height: var(--leading-normal);
}

/* ============================================================
   Tabela — container com overflow-x para mobile
   ============================================================ */
.produto-list__table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface-card);
  box-shadow: var(--shadow-sm);
}

.produto-list__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
  min-width: 36rem; /* evita quebra horrível em telas muito estreitas */
}

/* ---- cabeçalho da tabela ---- */
.produto-list__th {
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

.produto-list__th--price,
.produto-list__td--price {
  text-align: right;
}

/* ---- linhas ---- */
.produto-list__row {
  border-bottom: var(--border-width) solid var(--border);
  transition: background var(--dur-fast) var(--ease-standard);
}

.produto-list__row:last-child {
  border-bottom: none;
}

.produto-list__row:hover {
  background: var(--surface-sunken);
}

.produto-list__td {
  padding: var(--space-3) var(--space-4);
  color: var(--text-body);
  vertical-align: middle;
}

.produto-list__name {
  font-weight: var(--weight-medium);
  color: var(--text-strong);
}

.produto-list__category {
  color: var(--text-muted);
  font-size: var(--text-xs);
}

/* ---- badge de status ---- */
.produto-list__badge {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-pill);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  line-height: 1;
  white-space: nowrap;
}

.produto-list__badge--active {
  background: var(--success-100);
  color: var(--success-600);
}

.produto-list__badge--inactive {
  background: var(--surface-sunken);
  color: var(--text-muted);
}

/* ---- coluna de ações ---- */
.produto-list__th--actions {
  width: 5rem;
  text-align: center;
}

.produto-list__td--actions {
  text-align: center;
}

.produto-list__edit-link {
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--brand);
  text-decoration: none;
  text-underline-offset: 2px;
  white-space: nowrap;
}

.produto-list__edit-link:hover {
  text-decoration: underline;
}

.produto-list__edit-link:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* ---- botão "Novo produto" no cabeçalho ---- */
.produto-list__add-btn {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding-inline: var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--text-on-brand);
  background-color: var(--brand);
  border-radius: var(--radius-md);
  text-decoration: none;
  white-space: nowrap;
  transition: background-color var(--dur-fast) var(--ease-standard);
}

.produto-list__add-btn:hover {
  background-color: var(--brand-strong);
}

.produto-list__add-btn:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
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

/* ---- rodapé da contagem ---- */
.produto-list__count {
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-xs);
  color: var(--text-subtle);
  border-top: var(--border-width) solid var(--border);
  text-align: right;
}
</style>
