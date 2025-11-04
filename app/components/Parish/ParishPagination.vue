<template>
  <div v-if="totalPages > 1" class="pagination">
    <div class="pagination__info">
      <span class="pagination__text">
        Mostrando {{ startItem }} - {{ endItem }} de {{ total }} paróquias
      </span>
    </div>

    <div class="pagination__controls">
      <!-- Previous button -->
      <button @click="$emit('prev-page')" :disabled="!hasPrev" class="pagination__button pagination__button--prev"
        type="button">
        <Icon name="heroicons:chevron-left" class="button__icon" />
        Anterior
      </button>

      <!-- Page numbers -->
      <div class="pagination__numbers">
        <!-- First page -->
        <button v-if="showFirstPage" @click="$emit('go-to-page', 1)" class="pagination__number"
          :class="{ 'pagination__number--active': currentPage === 1 }" type="button">
          1
        </button>

        <!-- Left ellipsis -->
        <span v-if="showLeftEllipsis" class="pagination__ellipsis">...</span>

        <!-- Visible pages -->
        <button v-for="pageNum in visiblePages" :key="pageNum" @click="$emit('go-to-page', pageNum)"
          class="pagination__number" :class="{ 'pagination__number--active': currentPage === pageNum }" type="button">
          {{ pageNum }}
        </button>

        <!-- Right ellipsis -->
        <span v-if="showRightEllipsis" class="pagination__ellipsis">...</span>

        <!-- Last page -->
        <button v-if="showLastPage" @click="$emit('go-to-page', totalPages)" class="pagination__number"
          :class="{ 'pagination__number--active': currentPage === totalPages }" type="button">
          {{ totalPages }}
        </button>
      </div>

      <!-- Next button -->
      <button @click="$emit('next-page')" :disabled="!hasNext" class="pagination__button pagination__button--next"
        type="button">
        Próxima
        <Icon name="heroicons:chevron-right" class="button__icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PaginationProps {
  currentPage: number
  totalPages: number
  total: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

interface PaginationEmits {
  'prev-page': []
  'next-page': []
  'go-to-page': [page: number]
}

const props = defineProps<PaginationProps>()
defineEmits<PaginationEmits>()

// Computed properties
const startItem = computed(() => {
  return (props.currentPage - 1) * props.limit + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.limit, props.total)
})

const visiblePages = computed(() => {
  const delta = 2 // Number of pages to show on each side of current page
  const range = []
  const rangeWithDots = []

  for (let i = Math.max(2, props.currentPage - delta);
    i <= Math.min(props.totalPages - 1, props.currentPage + delta);
    i++) {
    range.push(i)
  }

  if (props.currentPage - delta > 2) {
    rangeWithDots.push(2, '...')
  } else {
    for (let i = 2; i < Math.max(2, props.currentPage - delta); i++) {
      rangeWithDots.push(i)
    }
  }

  rangeWithDots.push(...range)

  if (props.currentPage + delta < props.totalPages - 1) {
    rangeWithDots.push('...', props.totalPages - 1)
  } else {
    for (let i = Math.min(props.totalPages - 1, props.currentPage + delta) + 1;
      i < props.totalPages;
      i++) {
      rangeWithDots.push(i)
    }
  }

  return range
})

const showFirstPage = computed(() => {
  return props.totalPages > 1 && (props.currentPage > 3 || props.totalPages <= 5)
})

const showLastPage = computed(() => {
  return props.totalPages > 1 && (props.currentPage < props.totalPages - 2 || props.totalPages <= 5)
})

const showLeftEllipsis = computed(() => {
  return props.currentPage > 4 && props.totalPages > 7
})

const showRightEllipsis = computed(() => {
  return props.currentPage < props.totalPages - 3 && props.totalPages > 7
})
</script>

<!-- 
<style scoped>
.pagination {
  @apply flex flex-col sm:flex-row items-center justify-between gap-4 py-6;
}

.pagination__info {
  @apply order-2 sm:order-1;
}

.pagination__text {
  @apply text-sm;
  color: var(--color-gray-600);
}

.pagination__controls {
  @apply flex items-center gap-2 order-1 sm:order-2;
}

.pagination__button {
  @apply flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200;
  color: var(--color-gray-700);
  background-color: white;
  border: 1px solid var(--color-gray-300);
}

.pagination__button:hover:not(:disabled) {
  background-color: var(--color-gray-50);
  border-color: var(--color-gray-400);
}

.pagination__button:disabled {
  @apply cursor-not-allowed opacity-50;
  color: var(--color-gray-400);
}

.button__icon {
  @apply w-4 h-4;
}

.pagination__numbers {
  @apply flex items-center gap-1 mx-4;
}

.pagination__number {
  @apply w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200;
  color: var(--color-gray-700);
  background-color: white;
  border: 1px solid var(--color-gray-300);
}

.pagination__number:hover {
  background-color: var(--color-gray-50);
  border-color: var(--color-gray-400);
}

.pagination__number--active {
  color: white;
  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-500) 100%);
  border-color: var(--color-primary-500);
}

.pagination__number--active:hover {
  background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-secondary-600) 100%);
}

.pagination__ellipsis {
  @apply px-2 text-sm font-medium;
  color: var(--color-gray-400);
}

@media (max-width: 640px) {
  .pagination__numbers {
    @apply mx-2;
  }
  
  .pagination__number {
    @apply w-8 h-8 text-xs;
  }
  
  .pagination__button {
    @apply px-3 py-2 text-xs;
  }
}
</style>
-->
