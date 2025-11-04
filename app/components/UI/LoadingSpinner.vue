<template>
  <div
    v-if="show"
    class="inline-flex items-center space-x-2"
    :class="sizeClasses"
  >
    <!-- Spinner -->
    <div
      class="border-2 border-current border-t-transparent rounded-full animate-spin"
      :class="spinnerSizeClasses"
    />
    
    <!-- Text -->
    <span v-if="text" class="font-medium">
      {{ text }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  show?: boolean
  text?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  show: true,
  size: 'md'
})

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }
  return sizes[props.size]
})

const spinnerSizeClasses = computed(() => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  }
  return sizes[props.size]
})
</script>
