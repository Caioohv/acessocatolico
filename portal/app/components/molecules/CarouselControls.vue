<script setup lang="ts">
/**
 * CarouselControls — molécula de navegação de um carrossel/trilho.
 * Dois botões (anterior/próximo) que emitem `prev`/`next`. Recebe por prop se
 * cada direção está disponível (`canPrev`/`canNext`) e desativa o botão quando
 * não há mais para onde rolar. Puramente apresentacional: não sabe rolar nada,
 * só sinaliza a intenção para o organismo que a possui. Acessível via teclado
 * e leitor de tela (aria-label, foco visível). Só tokens de design.
 */
interface Props {
  /** Há conteúdo para rolar à esquerda. */
  canPrev?: boolean
  /** Há conteúdo para rolar à direita. */
  canNext?: boolean
  /** Rótulo acessível do conjunto (ex.: nome da categoria). */
  label?: string
}
withDefaults(defineProps<Props>(), {
  canPrev: false,
  canNext: true,
  label: undefined,
})

defineEmits<{ prev: []; next: [] }>()
</script>

<template>
  <div
    class="carousel-controls"
    role="group"
    :aria-label="label ? `Navegar: ${label}` : 'Navegar carrossel'"
  >
    <button
      type="button"
      class="carousel-controls__btn"
      aria-label="Anterior"
      :disabled="!canPrev"
      @click="$emit('prev')"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
        <path
          d="M15 5l-7 7 7 7"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <button
      type="button"
      class="carousel-controls__btn"
      aria-label="Próximo"
      :disabled="!canNext"
      @click="$emit('next')"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
        <path
          d="M9 5l7 7-7 7"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.carousel-controls {
  display: inline-flex;
  gap: var(--space-2);
}

.carousel-controls__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-pill);
  background: var(--surface-card);
  color: var(--text-strong);
  cursor: pointer;
  transition:
    background var(--dur-fast) var(--ease-standard),
    border-color var(--dur-fast) var(--ease-standard),
    color var(--dur-fast) var(--ease-standard);
}

.carousel-controls__btn:hover:not(:disabled) {
  border-color: var(--border-strong);
  background: var(--surface-sunken);
  color: var(--text-link);
}

.carousel-controls__btn:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.carousel-controls__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
