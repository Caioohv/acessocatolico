<script setup lang="ts">
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
}

const route = useRoute()
const id = computed(() => String(route.params.id))

useHead({ title: 'Editar produto — Painel Acesso Católico' })

const { data, status, error } = await useFetch<{ data: AdminProduct }>(`/api/products/${id.value}`, {
  default: () => null,
})

const product = computed(() => data.value?.data ?? null)

async function onSaved(_product: Record<string, unknown>) {
  // After editing, go back to the listing.
  await navigateTo('/produtos')
}
</script>

<template>
  <main class="produto-form-page">
    <header class="produto-form-page__header">
      <span class="produto-form-page__eyebrow">Produtos</span>
      <h1 class="produto-form-page__title">Editar produto</h1>
    </header>

    <!-- Loading -->
    <div
      v-if="status === 'pending'"
      class="produto-form-page__loading"
      aria-live="polite"
    >
      <span class="produto-form-page__spinner" aria-hidden="true" />
      <span>Carregando produto…</span>
    </div>

    <!-- Not found / error -->
    <div
      v-else-if="error || !product"
      class="produto-form-page__error"
      role="alert"
    >
      <p class="produto-form-page__error-text">
        Produto não encontrado ou não foi possível carregá-lo.
        <NuxtLink to="/produtos">Voltar à listagem</NuxtLink>
      </p>
    </div>

    <!-- Form -->
    <section
      v-else
      class="produto-form-page__card"
    >
      <ProductForm
        :product-id="product.id"
        :initial="{
          title: product.title,
          description: product.description ?? '',
          priceRef: product.priceRef ?? '',
          category: product.category,
          affiliateUrl: product.affiliateUrl ?? '',
          imageUrl: product.imageUrl ?? '',
          active: product.active,
          showPublic: product.showPublic,
          showOrg: product.showOrg,
        }"
        @saved="onSaved"
      />
    </section>
  </main>
</template>

<style scoped>
.produto-form-page {
  max-width: var(--container-panel);
  margin-inline: auto;
  padding-inline: var(--space-4);
  padding-block: var(--space-8);
}

@media (min-width: 48rem) {
  .produto-form-page {
    padding-inline: var(--space-8);
  }
}

.produto-form-page__header {
  margin-bottom: var(--space-8);
}

.produto-form-page__eyebrow {
  display: block;
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--brand);
  margin-bottom: var(--space-1);
}

.produto-form-page__title {
  font-family: var(--font-sans);
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  color: var(--text-strong);
}

.produto-form-page__card {
  background: var(--surface-card);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--space-6);
}

@media (min-width: 48rem) {
  .produto-form-page__card {
    padding: var(--space-8);
  }
}

/* ── Loading ─────────────────────────────────────────────────────────────── */
.produto-form-page__loading {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--text-muted);
  font-size: var(--text-sm);
  padding-block: var(--space-12);
}

.produto-form-page__spinner {
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

/* ── Error ────────────────────────────────────────────────────────────────── */
.produto-form-page__error {
  background: var(--danger-100);
  border: var(--border-width) solid oklch(0.88 0.06 26);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.produto-form-page__error-text {
  color: oklch(0.42 0.12 26);
  font-size: var(--text-sm);
}

.produto-form-page__error-text a {
  color: var(--brand);
  text-underline-offset: 2px;
}
</style>
