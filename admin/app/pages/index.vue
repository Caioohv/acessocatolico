<script setup lang="ts">
useHead({ title: 'Painel Acesso Católico' })
</script>

<template>
  <main class="admin-home">
    <span class="admin-home__eyebrow">Acesso Católico</span>
    <h1 class="admin-home__title">Painel administrativo</h1>
    <p class="admin-home__lead">
      Bem-vindo ao painel de gestão da plataforma.
    </p>

    <nav class="admin-home__nav" aria-label="Seções do painel">
      <NuxtLink to="/produtos" class="admin-home__card">
        <span class="admin-home__card-icon" aria-hidden="true">📦</span>
        <span class="admin-home__card-label">Produtos</span>
        <span class="admin-home__card-desc">Gerencie os itens da lojinha de afiliados.</span>
      </NuxtLink>
    </nav>
  </main>
</template>

<style scoped>
.admin-home {
  max-width: var(--container-narrow);
  margin-inline: auto;
  padding-inline: var(--space-4);
  padding-block: var(--space-8);
}

@media (min-width: 48rem) {
  .admin-home {
    padding-inline: var(--space-8);
  }
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
  font-size: var(--text-h1);
  color: var(--text-strong);
}

.admin-home__lead {
  margin-top: var(--space-4);
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--text-muted);
  margin-bottom: var(--space-8);
}

/* ---- nav cards ---- */
.admin-home__nav {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: 1fr;
}

@media (min-width: 30rem) {
  .admin-home__nav {
    grid-template-columns: repeat(2, 1fr);
  }
}

.admin-home__card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-5);
  background: var(--surface-card);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  transition: box-shadow var(--dur-fast) var(--ease-standard),
              border-color var(--dur-fast) var(--ease-standard);
}

.admin-home__card:hover,
.admin-home__card:focus-visible {
  border-color: var(--brand);
  box-shadow: var(--shadow-md);
  outline: none;
}

.admin-home__card:focus-visible {
  box-shadow: var(--shadow-focus);
}

.admin-home__card-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.admin-home__card-label {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--text-strong);
}

.admin-home__card-desc {
  font-size: var(--text-sm);
  color: var(--text-muted);
  line-height: var(--leading-normal);
}
</style>
