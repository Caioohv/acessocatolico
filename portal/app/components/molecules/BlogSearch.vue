<script setup lang="ts">
/**
 * BlogSearch — molécula de busca textual do blog.
 * Envolve o átomo BaseInput em um formulário semântico (role="search"),
 * emitindo alterações para o pai. Oferece visual responsivo e acessível.
 */
interface Props {
  /** Termo de busca atual (v-model). */
  modelValue?: string
  /** Placeholder customizado. */
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Buscar por título, assunto, tag ou palavra-chave...',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit' | 'clear'): void
}>()

function onUpdate(val: string) {
  emit('update:modelValue', val)
}

function onClear() {
  emit('clear')
}

function onSubmit() {
  emit('submit')
}
</script>

<template>
  <form class="blog-search" role="search" @submit.prevent="onSubmit">
    <BaseInput
      :model-value="modelValue"
      label="Pesquisar posts do blog"
      hide-label
      :placeholder="placeholder"
      clearable
      @update:model-value="onUpdate"
      @clear="onClear"
    />
  </form>
</template>

<style scoped>
.blog-search {
  display: flex;
  width: 100%;
  max-width: 36rem;
}
</style>
