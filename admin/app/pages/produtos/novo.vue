<script setup lang="ts">
useHead({ title: 'Novo produto — Painel Acesso Católico' })

async function onSaved(_product: Record<string, unknown>) {
  // After creating, redirect to the listing so the new row is visible.
  await navigateTo('/produtos')
}
</script>

<template>
  <main class="produto-form-page">
    <header class="produto-form-page__header">
      <span class="produto-form-page__eyebrow">Produtos</span>
      <h1 class="produto-form-page__title">Novo produto</h1>
    </header>

    <section class="produto-form-page__card">
      <ProductForm @saved="onSaved" />
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
</style>
