<script setup lang="ts">
/**
 * BaseButton — átomo de ação.
 * Três variantes: `primary` (marca, fundo violeta), `secondary` (contorno) e
 * `link` (texto, sem fundo). Renderiza um <button> por padrão; se receber `to`
 * vira <NuxtLink> (navegação SPA) e se receber `href` vira <a>. Foco sempre
 * visível via --shadow-focus (acessibilidade), alvo de toque ≥44px. Só tokens
 * de design — nada de valores hardcoded.
 */
interface Props {
  /** Aparência do botão. */
  variant?: 'primary' | 'secondary' | 'link'
  /** Tipo do <button> quando não é link. Ignorado com `to`/`href`. */
  type?: 'button' | 'submit' | 'reset'
  /** Rota interna — renderiza como <NuxtLink>. */
  to?: string
  /** URL externa — renderiza como <a>. */
  href?: string
  /** Ocupa toda a largura disponível. */
  block?: boolean
  /** Desativa a ação (também aplica aria-disabled em links). */
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  to: undefined,
  href: undefined,
  block: false,
  disabled: false,
})

const tag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})
</script>

<template>
  <component
    :is="tag"
    class="base-button"
    :class="[`base-button--${variant}`, { 'base-button--block': block }]"
    :to="to"
    :href="href"
    :type="!to && !href ? type : undefined"
    :disabled="!to && !href ? disabled : undefined"
    :aria-disabled="(to || href) && disabled ? 'true' : undefined"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 44px;
  padding-inline: var(--space-5);
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  text-decoration: none;
  cursor: pointer;
  transition:
    background var(--dur-fast) var(--ease-standard),
    color var(--dur-fast) var(--ease-standard),
    border-color var(--dur-fast) var(--ease-standard);
}

.base-button:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.base-button:disabled,
.base-button[aria-disabled='true'] {
  cursor: not-allowed;
  opacity: 0.55;
}

.base-button--block {
  display: flex;
  width: 100%;
}

/* --- Primária: fundo de marca --------------------------------------------- */
.base-button--primary {
  background: var(--surface-brand);
  color: var(--text-on-brand);
}

.base-button--primary:hover:not(:disabled):not([aria-disabled='true']) {
  background: var(--brand-hover);
}

/* --- Secundária: contorno ------------------------------------------------- */
.base-button--secondary {
  background: var(--surface-card);
  color: var(--brand-strong);
  border-color: var(--border-strong);
}

.base-button--secondary:hover:not(:disabled):not([aria-disabled='true']) {
  background: var(--brand-tint-quiet);
  border-color: var(--brand);
}

/* --- Link: só texto ------------------------------------------------------- */
.base-button--link {
  min-height: auto;
  padding-inline: var(--space-1);
  background: transparent;
  color: var(--text-link);
  font-weight: var(--weight-medium);
}

.base-button--link:hover:not(:disabled):not([aria-disabled='true']) {
  color: var(--text-link-hover);
  text-decoration: underline;
}
</style>
