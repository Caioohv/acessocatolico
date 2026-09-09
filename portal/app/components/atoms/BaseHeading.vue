<script setup lang="ts">
/**
 * BaseHeading — átomo de título editorial em serifa (Spectral).
 * A prop `level` (1–4) define tanto a tag semântica (`h1`–`h4`) quanto o
 * token de tamanho da escala tipográfica (`--text-h1`…`--text-h4`).
 * O texto vem do slot ou, na sua ausência, da prop `text`. Só tokens de design.
 */
type Level = 1 | 2 | 3 | 4

interface Props {
  /** Nível hierárquico: 1–4. Define a tag e o tamanho. */
  level?: Level
  /** Texto do título quando o slot não é usado. */
  text?: string
}
const props = withDefaults(defineProps<Props>(), {
  level: 2,
  text: undefined,
})

const tag = computed(() => `h${props.level}` as const)
</script>

<template>
  <component
    :is="tag"
    class="base-heading"
    :class="`base-heading--h${level}`"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<style scoped>
.base-heading {
  margin: 0;
  color: var(--text-strong);
  font-family: var(--font-display);
  font-weight: var(--weight-bold);
  text-wrap: balance;
}

.base-heading--h1 {
  font-size: var(--text-h1);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

.base-heading--h2 {
  font-size: var(--text-h2);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

.base-heading--h3 {
  font-size: var(--text-h3);
  line-height: var(--leading-snug);
}

.base-heading--h4 {
  font-size: var(--text-h4);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
}
</style>
