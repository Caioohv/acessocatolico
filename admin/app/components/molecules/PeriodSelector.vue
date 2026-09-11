<script setup lang="ts">
interface PeriodOption {
  label: string
  value: number
}

const props = withDefaults(
  defineProps<{
    modelValue: number
    options?: PeriodOption[]
  }>(),
  {
    options: () => [
      { label: '7 dias', value: 7 },
      { label: '30 dias', value: 30 },
      { label: '90 dias', value: 90 },
      { label: '365 dias', value: 365 },
    ],
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

function selectPeriod(value: number) {
  if (value !== props.modelValue) {
    emit('update:modelValue', value)
  }
}
</script>

<template>
  <div
    class="period-selector"
    role="group"
    aria-label="Selecionar período das métricas"
  >
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="period-selector__btn"
      :class="{ 'period-selector__btn--active': modelValue === opt.value }"
      :aria-pressed="modelValue === opt.value"
      @click="selectPeriod(opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<style scoped>
.period-selector {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1);
  background: var(--surface-sunken);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.period-selector::-webkit-scrollbar {
  display: none;
}

.period-selector__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding-inline: var(--space-3);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--text-muted);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  white-space: nowrap;
  transition: color var(--dur-fast) var(--ease-standard),
              background-color var(--dur-fast) var(--ease-standard),
              box-shadow var(--dur-fast) var(--ease-standard);
}

.period-selector__btn:hover:not(.period-selector__btn--active) {
  color: var(--text-strong);
  background: var(--surface-card);
}

.period-selector__btn:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.period-selector__btn--active {
  color: var(--text-strong);
  background: var(--surface-card);
  font-weight: var(--weight-semibold);
  box-shadow: var(--shadow-sm);
}
</style>
