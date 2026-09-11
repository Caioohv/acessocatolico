<script setup lang="ts">
const route = useRoute()
await navigateTo({ path: '/metricas/site', query: route.query }, { replace: true })
</script>

<template>
  <div />
</template>
