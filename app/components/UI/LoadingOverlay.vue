<template>
  <!-- Full page loading overlay -->
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
    :class="{ 'bg-gray-900/80': dark }"
  >
    <div class="flex flex-col items-center space-y-4">
      <!-- Loading spinner -->
      <div class="relative">
        <div
          class="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"
          :class="{ 'border-gray-600 border-t-gray-300': dark }"
        />
        
        <!-- Catholic cross in center -->
        <div class="absolute inset-0 flex items-center justify-center">
          <UIcon
            name="i-heroicons-cross-20-solid"
            class="h-6 w-6 text-primary-600"
            :class="{ 'text-gray-300': dark }"
          />
        </div>
      </div>
      
      <!-- Loading message -->
      <div class="text-center">
        <p
          class="text-lg font-medium text-gray-900"
          :class="{ 'text-white': dark }"
        >
          {{ message || 'Carregando...' }}
        </p>
        <p
          v-if="subtitle"
          class="mt-1 text-sm text-gray-500"
          :class="{ 'text-gray-300': dark }"
        >
          {{ subtitle }}
        </p>
      </div>
      
      <!-- Progress bar (optional) -->
      <div v-if="showProgress" class="w-64">
        <div class="bg-gray-200 rounded-full h-2" :class="{ 'bg-gray-700': dark }">
          <div
            class="bg-primary-600 h-2 rounded-full transition-all duration-300"
            :class="{ 'bg-gray-300': dark }"
            :style="{ width: `${progress}%` }"
          />
        </div>
        <p
          class="text-xs text-gray-500 mt-2 text-center"
          :class="{ 'text-gray-400': dark }"
        >
          {{ progress }}%
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  show?: boolean
  message?: string
  subtitle?: string
  dark?: boolean
  showProgress?: boolean
  progress?: number
}

withDefaults(defineProps<Props>(), {
  show: false,
  message: 'Carregando...',
  dark: false,
  showProgress: false,
  progress: 0
})
</script>
