<template>
  <div class="admin-layout">
    <AdminHeader />
    <!-- As páginas trazem seu próprio <main>; aqui apenas o contêiner de fluxo. -->
    <div class="admin-layout__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background-color: var(--surface-page);
  color: var(--text-body);
}

.admin-layout__body {
  flex: 1 0 auto;
}
</style>
