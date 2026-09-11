<script setup lang="ts">
/**
 * TrackBadge — átomo indicador de etapa dentro de uma Trilha de Formação.
 * Exibe a posição do post na trilha (ex.: "Etapa 01/05" ou, sem total
 * conhecido, "Etapa 02"). Números são zero-padded para alinhamento visual.
 * Fonte mono/meta e tint da marca, coerente com `PostMeta`/`BaseTag`.
 * Só tokens de design.
 */
interface Props {
  /** Posição do post na trilha (1-based). */
  order: number
  /** Total de etapas da trilha; omitido oculta o "/NN". */
  totalSteps?: number
}
const props = withDefaults(defineProps<Props>(), {
  totalSteps: undefined,
})

/** Formata um número em duas casas ("1" → "01"), preservando 100+. */
function pad(value: number): string {
  return String(value).padStart(2, '0')
}

const label = computed(() =>
  props.totalSteps
    ? `Etapa ${pad(props.order)}/${pad(props.totalSteps)}`
    : `Etapa ${pad(props.order)}`,
)
</script>

<template>
  <span class="track-badge">{{ label }}</span>
</template>

<style scoped>
.track-badge {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);
  background: var(--brand-tint);
  color: var(--brand-strong);
  font-family: var(--font-mono);
  font-size: var(--text-meta);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-mono);
  line-height: var(--leading-snug);
  white-space: nowrap;
}
</style>
