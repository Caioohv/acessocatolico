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
  showPublic: boolean
  showOrg: boolean
  createdAt: string
  updatedAt: string
}

useHead({ title: 'Produtos — Painel Acesso Católico' })

const { data, status, error, refresh } = await useFetch<{ data: AdminProduct[] }>('/api/products', {
  default: () => ({ data: [] }),
})

const products = computed(() => data.value?.data ?? [])

function formatPrice(raw: string | null | undefined): string {
  if (!raw) return '—'
  if (/^R\$/.test(raw)) return raw
  const n = Number(raw)
  if (Number.isFinite(n)) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)
  }
  return raw
}

// ——————————————————————————————————————————
// Toggle active/inactive
// ——————————————————————————————————————————
const togglingIds = ref<Set<string>>(new Set())

async function toggleActive(product: AdminProduct) {
  if (togglingIds.value.has(product.id)) return
  togglingIds.value = new Set([...togglingIds.value, product.id])

  try {
    await $fetch(`/api/products/${product.id}`, {
      method: 'PATCH',
      body: { active: !product.active },
    })
    await refresh()
  }
  catch {
    // Silently ignore — UI stays as-is, user can retry.
  }
  finally {
    const next = new Set(togglingIds.value)
    next.delete(product.id)
    togglingIds.value = next
  }
}

// ——————————————————————————————————————————
// Delete with confirmation modal
// ——————————————————————————————————————————
const pendingDelete = ref<AdminProduct | null>(null)
const isDeleting = ref(false)
const deleteDialogRef = ref<HTMLDialogElement | null>(null)

function openDeleteModal(product: AdminProduct) {
  pendingDelete.value = product
  nextTick(() => deleteDialogRef.value?.showModal())
}

function closeDeleteModal() {
  deleteDialogRef.value?.close()
  pendingDelete.value = null
  isDeleting.value = false
}

async function confirmDelete() {
  if (!pendingDelete.value || isDeleting.value) return
  isDeleting.value = true

  try {
    await $fetch(`/api/products/${pendingDelete.value.id}`, { method: 'DELETE' })
    closeDeleteModal()
    await refresh()
  }
  catch {
    // Silently ignore — modal stays open, user can retry or cancel.
    isDeleting.value = false
  }
}
</script>

<template>
  <main class="produto-list">
    <header class="produto-list__header">
      <div>
        <NuxtLink to="/" class="produto-list__back-link">
          Voltar ao painel
        </NuxtLink>
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
            <th scope="col" class="produto-list__th produto-list__th--sources">Fontes</th>
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
              <div class="produto-list__sources">
                <span
                  v-if="product.showPublic"
                  class="produto-list__source produto-list__source--public"
                >
                  Pública
                </span>
                <span
                  v-if="product.showOrg"
                  class="produto-list__source produto-list__source--org"
                >
                  Org
                </span>
                <span
                  v-if="!product.showPublic && !product.showOrg"
                  class="produto-list__source produto-list__source--none"
                >
                  Nenhuma
                </span>
              </div>
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
              <div class="produto-list__actions">
                <NuxtLink
                  :to="`/produtos/${product.id}/editar`"
                  class="produto-list__action-btn produto-list__action-btn--edit"
                  :aria-label="`Editar ${product.title}`"
                >
                  Editar
                </NuxtLink>

                <button
                  type="button"
                  class="produto-list__action-btn produto-list__action-btn--toggle"
                  :class="{ 'produto-list__action-btn--busy': togglingIds.has(product.id) }"
                  :disabled="togglingIds.has(product.id)"
                  :aria-label="product.active ? `Desativar ${product.title}` : `Ativar ${product.title}`"
                  @click="toggleActive(product)"
                >
                  <span
                    v-if="togglingIds.has(product.id)"
                    class="produto-list__mini-spinner"
                    aria-hidden="true"
                  />
                  <span v-else>{{ product.active ? 'Desativar' : 'Ativar' }}</span>
                </button>

                <button
                  type="button"
                  class="produto-list__action-btn produto-list__action-btn--delete"
                  :aria-label="`Excluir ${product.title}`"
                  @click="openDeleteModal(product)"
                >
                  Excluir
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="produto-list__count">
        {{ products.length }} {{ products.length === 1 ? 'produto' : 'produtos' }}
      </p>
    </div>

    <!-- Delete confirmation modal -->
    <dialog
      ref="deleteDialogRef"
      class="produto-list__dialog"
      aria-labelledby="delete-dialog-title"
      @close="closeDeleteModal"
    >
      <div class="produto-list__dialog-content">
        <h2 id="delete-dialog-title" class="produto-list__dialog-title">
          Excluir produto
        </h2>
        <p class="produto-list__dialog-body">
          Tem certeza que deseja excluir
          <strong>{{ pendingDelete?.title }}</strong>?
          Esta ação não pode ser desfeita.
        </p>
        <div class="produto-list__dialog-footer">
          <button
            type="button"
            class="produto-list__dialog-btn produto-list__dialog-btn--cancel"
            :disabled="isDeleting"
            @click="closeDeleteModal"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="produto-list__dialog-btn produto-list__dialog-btn--confirm"
            :class="{ 'produto-list__dialog-btn--busy': isDeleting }"
            :disabled="isDeleting"
            @click="confirmDelete"
          >
            <span
              v-if="isDeleting"
              class="produto-list__mini-spinner produto-list__mini-spinner--light"
              aria-hidden="true"
            />
            <span>{{ isDeleting ? 'Excluindo…' : 'Excluir' }}</span>
          </button>
        </div>
      </div>
    </dialog>
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

.produto-list__back-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--text-muted);
  text-decoration: none;
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-2);
  transition: color var(--dur-fast) var(--ease-standard);
}

.produto-list__back-link:hover {
  color: var(--brand);
}

.produto-list__back-link:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
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
  min-width: 44rem; /* evita quebra horrível em telas muito estreitas */
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

/* ---- badges de fonte (loja) ---- */
.produto-list__sources {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.produto-list__source {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-pill);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  line-height: 1;
  white-space: nowrap;
}

.produto-list__source--public {
  background: var(--info-100);
  color: var(--info-600);
}

.produto-list__source--org {
  background: var(--brand-tint);
  color: var(--brand-strong);
}

.produto-list__source--none {
  background: var(--surface-sunken);
  color: var(--text-muted);
}

/* ---- coluna de ações ---- */
.produto-list__th--actions {
  width: 13rem;
  text-align: right;
}

.produto-list__td--actions {
  text-align: right;
}

.produto-list__actions {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  justify-content: flex-end;
}

/* ---- botões de ação inline ---- */
.produto-list__action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  min-height: 28px;
  padding-inline: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  line-height: 1;
  white-space: nowrap;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: color var(--dur-fast) var(--ease-standard),
              background-color var(--dur-fast) var(--ease-standard);
  text-decoration: none;
}

.produto-list__action-btn:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 2px;
}

.produto-list__action-btn--edit {
  color: var(--brand);
}

.produto-list__action-btn--edit:hover {
  color: var(--brand-strong);
  background: var(--brand-tint-quiet);
}

.produto-list__action-btn--toggle {
  color: var(--text-muted);
}

.produto-list__action-btn--toggle:hover:not(:disabled) {
  color: var(--text-body);
  background: var(--surface-sunken);
}

.produto-list__action-btn--toggle:disabled,
.produto-list__action-btn--busy {
  opacity: 0.5;
  cursor: not-allowed;
}

.produto-list__action-btn--delete {
  color: var(--danger-600);
}

.produto-list__action-btn--delete:hover {
  background: var(--danger-100);
}

/* ---- mini spinner (inline nos botões) ---- */
.produto-list__mini-spinner {
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  border: 1.5px solid var(--border);
  border-top-color: var(--text-muted);
  border-radius: var(--radius-pill);
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

.produto-list__mini-spinner--light {
  border-color: oklch(1 0 0 / 0.4);
  border-top-color: oklch(1 0 0);
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

/* ============================================================
   Modal de confirmação de exclusão
   ============================================================ */
.produto-list__dialog {
  position: fixed;
  inset: 0;
  margin: auto;
  width: min(90vw, 28rem);
  border: none;
  border-radius: var(--radius-lg);
  padding: 0;
  box-shadow: var(--shadow-xl);
  background: var(--surface-card);
}

/* Backdrop nativo do <dialog> */
.produto-list__dialog::backdrop {
  background: oklch(0.24 0.014 78 / 0.5);
  backdrop-filter: blur(2px);
}

.produto-list__dialog-content {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.produto-list__dialog-title {
  font-family: var(--font-sans);
  font-size: var(--text-h4);
  font-weight: var(--weight-semibold);
  color: var(--text-strong);
  line-height: var(--leading-tight);
}

.produto-list__dialog-body {
  font-size: var(--text-sm);
  color: var(--text-body);
  line-height: var(--leading-normal);
}

.produto-list__dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.produto-list__dialog-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 44px;
  padding-inline: var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--dur-fast) var(--ease-standard),
              opacity var(--dur-fast) var(--ease-standard);
}

.produto-list__dialog-btn:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.produto-list__dialog-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.produto-list__dialog-btn--cancel {
  color: var(--text-body);
  background: var(--surface-sunken);
}

.produto-list__dialog-btn--cancel:hover:not(:disabled) {
  background: var(--border);
}

.produto-list__dialog-btn--confirm {
  color: oklch(1 0 0);
  background: var(--danger-600);
}

.produto-list__dialog-btn--confirm:hover:not(:disabled) {
  background: oklch(0.50 0.18 26);
}
</style>
