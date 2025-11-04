<template>
  <div
    v-if="show"
    class="fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-in-out"
    :class="[
      show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
      animationClass
    ]"
  >
    <div
      class="bg-white rounded-lg shadow-lg border-l-4 p-4"
      :class="[
        borderColorClass,
        shadowClass
      ]"
      role="alert"
    >
      <div class="flex items-start">
        <!-- Icon -->
        <div class="flex-shrink-0">
          <UIcon
            :name="iconName"
            class="h-5 w-5"
            :class="iconColorClass"
          />
        </div>
        
        <!-- Content -->
        <div class="ml-3 flex-1">
          <h4 v-if="title" class="text-sm font-medium text-gray-900">
            {{ title }}
          </h4>
          <p class="text-sm text-gray-700" :class="{ 'mt-1': title }">
            {{ message }}
          </p>
          
          <!-- Action button -->
          <div v-if="action" class="mt-3">
            <UButton
              size="xs"
              variant="ghost"
              color="primary"
              @click="handleAction"
            >
              {{ action.label }}
            </UButton>
          </div>
        </div>
        
        <!-- Close button -->
        <div v-if="closable" class="ml-4 flex-shrink-0">
          <UButton
            variant="ghost"
            size="xs"
            icon="i-heroicons-x-mark-20-solid"
            @click="close"
          />
        </div>
      </div>
      
      <!-- Progress bar (for auto-dismiss) -->
      <div
        v-if="duration && showProgress"
        class="mt-3 bg-gray-200 rounded-full h-1"
      >
        <div
          class="h-1 rounded-full transition-all ease-linear"
          :class="progressColorClass"
          :style="{ width: `${progress}%` }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ToastAction {
  label: string
  handler: () => void
}

interface Props {
  show?: boolean
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  closable?: boolean
  showProgress?: boolean
  action?: ToastAction
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  type: 'info',
  duration: 5000,
  closable: true,
  showProgress: true
})

const emit = defineEmits<{
  close: []
}>()

// State
const progress = ref(100)
const animationClass = ref('slide-in-right')

// Computed
const iconName = computed(() => {
  const icons = {
    success: 'i-heroicons-check-circle-20-solid',
    error: 'i-heroicons-x-circle-20-solid',
    warning: 'i-heroicons-exclamation-triangle-20-solid',
    info: 'i-heroicons-information-circle-20-solid'
  }
  return icons[props.type]
})

const iconColorClass = computed(() => {
  const colors = {
    success: 'text-success-500',
    error: 'text-error-500',
    warning: 'text-warning-500',
    info: 'text-primary-500'
  }
  return colors[props.type]
})

const borderColorClass = computed(() => {
  const colors = {
    success: 'border-success-500',
    error: 'border-error-500',
    warning: 'border-warning-500',
    info: 'border-primary-500'
  }
  return colors[props.type]
})

const progressColorClass = computed(() => {
  const colors = {
    success: 'bg-success-500',
    error: 'bg-error-500',
    warning: 'bg-warning-500',
    info: 'bg-primary-500'
  }
  return colors[props.type]
})

const shadowClass = computed(() => {
  const shadows = {
    success: 'shadow-success-100',
    error: 'shadow-error-100',
    warning: 'shadow-warning-100',
    info: 'shadow-primary-100'
  }
  return shadows[props.type]
})

const actionColor = computed(() => {
  const colors = {
    success: 'primary',
    error: 'primary',
    warning: 'primary',
    info: 'primary'
  }
  return colors[props.type]
})

// Methods
const close = () => {
  animationClass.value = 'slide-out-right'
  setTimeout(() => {
    emit('close')
  }, 300)
}

const handleAction = () => {
  if (props.action?.handler) {
    props.action.handler()
  }
}

// Auto-dismiss timer
let dismissTimer: NodeJS.Timeout | null = null
let progressTimer: NodeJS.Timeout | null = null

const startDismissTimer = () => {
  if (!props.duration) return
  
  // Progress animation
  const startTime = Date.now()
  const updateProgress = () => {
    const elapsed = Date.now() - startTime
    const remaining = Math.max(0, props.duration! - elapsed)
    progress.value = (remaining / props.duration!) * 100
    
    if (remaining > 0) {
      progressTimer = setTimeout(updateProgress, 16) // ~60fps
    }
  }
  updateProgress()
  
  // Auto dismiss
  dismissTimer = setTimeout(() => {
    close()
  }, props.duration)
}

const clearTimers = () => {
  if (dismissTimer) {
    clearTimeout(dismissTimer)
    dismissTimer = null
  }
  if (progressTimer) {
    clearTimeout(progressTimer)
    progressTimer = null
  }
}

// Lifecycle
watch(() => props.show, (newShow) => {
  if (newShow) {
    animationClass.value = 'slide-in-right'
    nextTick(() => {
      startDismissTimer()
    })
  } else {
    clearTimers()
  }
})

onUnmounted(() => {
  clearTimers()
})
</script>

<style scoped>
.slide-in-right {
  animation: slideInRight 0.3s ease-out;
}

.slide-out-right {
  animation: slideOutRight 0.3s ease-in;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
