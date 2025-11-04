<template>
  <UButton
    :type="type"
    :size="size"
    :loading="loading"
    :disabled="disabled || loading"
    :block="block"
    :class="buttonClasses"
    @click="handleClick"
  >
    <template #leading>
      <UIcon v-if="icon" :name="icon" />
    </template>
    
    <slot>{{ label }}</slot>
    
    <template #trailing>
      <UIcon v-if="trailingIcon" :name="trailingIcon" />
    </template>
  </UButton>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'liturgical'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  type?: 'button' | 'submit' | 'reset'
  label?: string
  icon?: string
  trailingIcon?: string
  loading?: boolean
  disabled?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  loading: false,
  disabled: false,
  block: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Computed
const buttonClasses = computed(() => {
  const classes = []
  
  // Base classes
  classes.push('font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2')
  
  // Variant classes
  switch (props.variant) {
    case 'primary':
      classes.push(
        'bg-primary-600 hover:bg-primary-700 text-white',
        'focus:ring-primary-500',
        'disabled:bg-primary-300'
      )
      break
    case 'secondary':
      classes.push(
        'bg-secondary-500 hover:bg-secondary-600 text-white',
        'focus:ring-secondary-400',
        'disabled:bg-secondary-300'
      )
      break
    case 'outline':
      classes.push(
        'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
        'focus:ring-primary-500',
        'disabled:border-primary-300 disabled:text-primary-300'
      )
      break
    case 'ghost':
      classes.push(
        'text-primary-600 hover:bg-primary-50',
        'focus:ring-primary-500',
        'disabled:text-primary-300'
      )
      break
    case 'danger':
      classes.push(
        'bg-error-600 hover:bg-error-700 text-white',
        'focus:ring-error-500',
        'disabled:bg-error-300'
      )
      break
    case 'liturgical':
      classes.push(
        'liturgical-gold text-white hover:opacity-90',
        'focus:ring-secondary-500',
        'disabled:opacity-50'
      )
      break
  }
  
  return classes.join(' ')
})

// Methods
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>
