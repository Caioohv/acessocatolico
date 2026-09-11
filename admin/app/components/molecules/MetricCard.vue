<script setup lang="ts">
const props = defineProps<{
  label: string
  value: number | string
  description?: string
}>()

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return new Intl.NumberFormat('pt-BR').format(props.value)
  }
  return props.value
})
</script>

<template>
  <div class="metric-card">
    <span class="metric-card__label">{{ label }}</span>
    <span class="metric-card__value">{{ formattedValue }}</span>
    <span v-if="description" class="metric-card__desc">{{ description }}</span>
  </div>
</template>

<style scoped>
.metric-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-5);
  background: var(--surface-card);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.metric-card__label {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-muted);
}

.metric-card__value {
  font-family: var(--font-sans);
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  color: var(--text-strong);
}

.metric-card__desc {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  line-height: var(--leading-normal);
  margin-top: var(--space-1);
}
</style>
