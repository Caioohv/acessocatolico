<script setup lang="ts">
/**
 * AppContainer — átomo de layout.
 * Aplica largura máxima (token de container) e padding lateral (token de
 * spacing), centralizando o conteúdo em telas largas. Wrapper reutilizável
 * no layout e nas seções. Mobile-first: padding cresce a partir de 768px.
 */
interface Props {
  /** Largura máxima do conteúdo, mapeada para os tokens de container. */
  size?: 'portal' | 'panel' | 'narrow' | 'prose'
  /** Elemento HTML renderizado (permite usar como <section>, <main>, etc.). */
  as?: string
}
withDefaults(defineProps<Props>(), {
  size: 'portal',
  as: 'div',
})
</script>

<template>
  <component :is="as" class="app-container" :class="`app-container--${size}`">
    <slot />
  </component>
</template>

<style scoped>
.app-container {
  width: 100%;
  margin-inline: auto;
  padding-inline: var(--space-4);
}

.app-container--portal { max-width: var(--container-portal); }
.app-container--panel { max-width: var(--container-panel); }
.app-container--narrow { max-width: var(--container-narrow); }
.app-container--prose { max-width: var(--measure-prose); }

@media (min-width: 768px) {
  .app-container {
    padding-inline: var(--space-6);
  }
}
</style>
