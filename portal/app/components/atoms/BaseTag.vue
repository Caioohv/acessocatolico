<script setup lang="ts">
/**
 * BaseTag — átomo de rótulo (chip de categoria/tag).
 * Renderiza um rótulo curto com cor de marca sobre o tint violeta
 * (`--brand-tint`) e cantos totalmente arredondados (`--radius-pill`).
 * O texto vem do slot ou, na sua ausência, da prop `label`. Se receber
 * `to`/`href` vira link navegável (categoria/tag clicável) com foco visível;
 * caso contrário é um <span> puramente decorativo. Só tokens de design.
 */
interface Props {
  /** Texto do chip quando o slot não é usado. */
  label?: string
  /** Rota interna — renderiza como <NuxtLink>. */
  to?: string
  /** URL externa — renderiza como <a>. */
  href?: string
}
const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  to: undefined,
  href: undefined,
})

const tag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'span'
})
const isLink = computed(() => Boolean(props.to || props.href))
</script>

<template>
  <component
    :is="tag"
    class="base-tag"
    :class="{ 'base-tag--link': isLink }"
    :to="to"
    :href="href"
  >
    <slot>{{ label }}</slot>
  </component>
</template>

<style scoped>
.base-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);
  background: var(--brand-tint);
  color: var(--brand-strong);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  line-height: var(--leading-snug);
  white-space: nowrap;
}

/* --- Variante clicável (categoria/tag como link) -------------------------- */
.base-tag--link {
  text-decoration: none;
  cursor: pointer;
  transition:
    background var(--dur-fast) var(--ease-standard),
    color var(--dur-fast) var(--ease-standard);
}

.base-tag--link:hover {
  background: var(--brand);
  color: var(--text-on-brand);
}

.base-tag--link:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}
</style>
