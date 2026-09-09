<script setup lang="ts">
/**
 * BaseInput — átomo de entrada de texto.
 * Invoca um <input> acessível com suporte a v-model, label (visível ou sr-only),
 * botão de limpar e estados de foco/desativado.
 * Alvo de toque >= 44px, estilizado exclusivamente com tokens de design.
 */
import { useId } from 'vue'

interface Props {
  /** Valor do campo (v-model). */
  modelValue?: string
  /** Rótulo do campo (obrigatório para acessibilidade). */
  label: string
  /** Oculta o rótulo visualmente mantendo-o para leitores de tela. */
  hideLabel?: boolean
  /** Texto explicativo quando vazio. */
  placeholder?: string
  /** Tipo HTML do input. */
  type?: string
  /** ID HTML (gerado automaticamente se omitido). */
  id?: string
  /** Nome do campo de formulário. */
  name?: string
  /** Desativa a interação. */
  disabled?: boolean
  /** Exibe botão de limpar quando há texto. */
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  hideLabel: false,
  placeholder: '',
  type: 'text',
  id: undefined,
  name: undefined,
  disabled: false,
  clearable: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'clear'): void
}>()

const generatedId = useId()
const inputId = computed(() => props.id || `input-${generatedId}`)

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function handleClear() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <div class="base-input" :class="{ 'base-input--disabled': disabled }">
    <label :for="inputId" class="base-input__label" :class="{ 'sr-only': hideLabel }">
      {{ label }}
    </label>

    <div class="base-input__wrapper">
      <slot name="prefix" />

      <input
        :id="inputId"
        class="base-input__field"
        :type="type"
        :name="name"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="handleInput"
      >

      <button
        v-if="clearable && modelValue && !disabled"
        type="button"
        class="base-input__clear"
        aria-label="Limpar texto de busca"
        @click="handleClear"
      >
        <span aria-hidden="true">&times;</span>
      </button>

      <slot name="suffix" />
    </div>
  </div>
</template>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: var(--space-1-5);
  width: 100%;
}

.base-input__label {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--text-strong);
}

.base-input__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.base-input__field {
  width: 100%;
  min-height: 44px;
  padding-block: var(--space-2-5);
  padding-inline: var(--space-4);
  background: var(--surface-card);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-strong);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  transition:
    border-color var(--dur-fast) var(--ease-standard),
    box-shadow var(--dur-fast) var(--ease-standard);
}

.base-input__field::placeholder {
  color: var(--text-subtle);
}

.base-input__field:hover:not(:disabled) {
  border-color: var(--border-strong);
}

.base-input__field:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: var(--shadow-focus);
}

.base-input__field:disabled {
  background: var(--surface-sunken);
  color: var(--text-subtle);
  cursor: not-allowed;
}

.base-input__clear {
  position: absolute;
  right: var(--space-2);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  min-height: 36px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--radius-full);
  color: var(--text-muted);
  font-size: var(--text-xl);
  line-height: 1;
  cursor: pointer;
  transition:
    color var(--dur-fast) var(--ease-standard),
    background-color var(--dur-fast) var(--ease-standard);
}

.base-input__clear:hover {
  color: var(--text-strong);
  background-color: var(--surface-sunken);
}

.base-input__clear:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}
</style>
