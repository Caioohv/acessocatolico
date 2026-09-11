<script setup lang="ts">
/**
 * AffiliateNotice — molécula de transparência sobre links de afiliados.
 * Explica que parte dos links da loja são afiliados e que as compras ajudam
 * a manter o Acesso Católico gratuito. Ícone via SVG inline (sem depender de
 * collection do @nuxt/icon). Copy padrão embutida, com override por props.
 * Só tokens de design.
 */
interface Props {
  /** Título curto da nota. */
  title?: string
  /** Texto da nota de transparência. */
  text?: string
}
withDefaults(defineProps<Props>(), {
  title: 'Transparência',
  text: 'Os botões daqui levam para a shopee, o preço que mostramos é uma referência. Quando você abre e compra por aqui, o Acesso Católico recebe uma pequena comissão, sem custo a mais para você. É o que mantém o portal e os sistemas gratuitos para todos.',
})
</script>

<template>
  <aside class="affiliate-notice" aria-label="Aviso de transparência sobre links de afiliados">
    <svg
      class="affiliate-notice__icon"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
    <div class="affiliate-notice__body">
      <p class="affiliate-notice__title">{{ title }}</p>
      <p class="affiliate-notice__text">{{ text }}</p>
    </div>
  </aside>
</template>

<style scoped>
.affiliate-notice {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
  padding: var(--space-4);
  background: var(--surface-card);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-muted);
}

.affiliate-notice__icon {
  flex: none;
  margin-top: 0.1em;
  color: var(--brand);
}

.affiliate-notice__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.affiliate-notice__title {
  margin: 0;
  color: var(--text-strong);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
}

.affiliate-notice__text {
  margin: 0;
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}
</style>
