<script setup lang="ts">
useHead({ title: 'Painel Acesso Católico' })
</script>

<template>
  <main class="admin-home">
    <span class="admin-home__eyebrow">Acesso Católico</span>
    <h1 class="admin-home__title">Painel administrativo</h1>
    <p class="admin-home__lead">
      Área de gestão da plataforma. Em construção.
    </p>
  </main>
</template>

<style scoped>
/* Renderiza a partir dos tokens compartilhados — nada hardcoded.
   O alias --brand (tokens/colors.css) prova que os tokens do design-system
   estão resolvidos no navegador. */
.admin-home {
  max-width: var(--container-narrow);
  margin-inline: auto;
  padding: var(--space-16) var(--space-6);
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
}
</style>
