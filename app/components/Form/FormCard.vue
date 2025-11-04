<template>
  <UCard
    :class="[
      'catholic-form-card',
      {
        'border-l-4 border-primary-500': highlighted,
        'shadow-lg': elevated
      }
    ]"
  >
    <!-- Header -->
    <template v-if="title || subtitle || $slots.header" #header>
      <slot name="header">
        <div>
          <h3 v-if="title" class="text-lg font-semibold text-gray-900 font-serif">
            {{ title }}
          </h3>
          <p v-if="subtitle" class="mt-1 text-sm text-gray-600">
            {{ subtitle }}
          </p>
        </div>
      </slot>
    </template>

    <!-- Body -->
    <div class="space-y-6">
      <slot />
    </div>

    <!-- Footer -->
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  highlighted?: boolean
  elevated?: boolean
}

withDefaults(defineProps<Props>(), {
  highlighted: false,
  elevated: false
})
</script>

<style scoped>
.catholic-form-card {
  @apply transition-all duration-200;
}

.catholic-form-card:hover {
  @apply shadow-md;
}
</style>
