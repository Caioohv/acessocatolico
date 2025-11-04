<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :show="toast.show"
      :type="toast.type"
      :title="toast.title"
      :message="toast.message"
      :duration="toast.duration"
      :closable="toast.closable"
      :show-progress="toast.showProgress"
      :action="toast.action"
      @close="removeToast(toast.id)"
    />
  </div>
</template>

<script setup lang="ts">
// Using Nuxt UI toast system instead of custom types

// Props
interface Props {
  toasts: any[]
}

defineProps<Props>()

// Emits
const emit = defineEmits<{
  remove: [id: string]
}>()

// Methods
const removeToast = (id: string) => {
  emit('remove', id)
}
</script>
