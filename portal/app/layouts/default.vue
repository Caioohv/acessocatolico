<template>
  <div class="layout-default">
    <TheHeader />
    <main class="layout-default__main">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--surface-page);
  color: var(--text-body);
}

/* main ocupa o espaço restante para empurrar o footer ao fim da viewport */
.layout-default__main {
  flex: 1 0 auto;
}
</style>
