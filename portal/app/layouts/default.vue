<template>
  <div class="layout-default">
    <main class="layout-default__container">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout-default {
  min-height: 100vh;
}

.layout-default__container {
  width: 100%;
  max-width: var(--container-portal);
  margin-inline: auto;
  padding-inline: var(--space-4);
}

@media (min-width: 768px) {
  .layout-default__container {
    padding-inline: var(--space-6);
  }
}
</style>
