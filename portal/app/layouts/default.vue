<template>
  <div class="layout-default">
    <TheHeader />
    <AppContainer as="main" class="layout-default__main">
      <slot />
    </AppContainer>
    <TheFooter />
  </div>
</template>

<style scoped>
.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* main ocupa o espaço restante para empurrar o footer ao fim da viewport */
.layout-default__main {
  flex: 1 0 auto;
}
</style>
