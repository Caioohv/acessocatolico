<template>
  <div class="layout-default">
    <TheHeader />
    <AppContainer as="main">
      <slot />
    </AppContainer>
  </div>
</template>

<style scoped>
.layout-default {
  min-height: 100vh;
}
</style>
