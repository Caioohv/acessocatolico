<template>
  <div class="parish-filters">
    <div class="parish-filters__header">
      <h3 class="parish-filters__title">
        <Icon name="heroicons:funnel" class="title__icon" />
        Filtrar Paróquias
      </h3>
      <button v-if="hasActiveFilters" @click="clearAllFilters" class="parish-filters__clear" type="button">
        <Icon name="heroicons:x-mark" class="clear__icon" />
        Limpar Filtros
      </button>
    </div>

    <form @submit.prevent="applyFilters" class="parish-filters__form">
      <!-- Search -->
      <div class="filter-group">
        <label for="search" class="filter-label">
          <Icon name="heroicons:magnifying-glass" class="label__icon" />
          Buscar
        </label>
        <input id="search" v-model="localFilters.search" type="text" placeholder="Nome da paróquia, endereço..."
          class="filter-input" />
      </div>

      <!-- State -->
      <div class="filter-group">
        <label for="state" class="filter-label">
          <Icon name="heroicons:map" class="label__icon" />
          Estado
        </label>
        <select id="state" v-model="localFilters.stateId" @change="onStateChange" class="filter-select">
          <option value="">Todos os estados</option>
          <option v-for="state in states" :key="state.id" :value="state.id">
            {{ state.name }} ({{ state._count?.parishes || 0 }})
          </option>
        </select>
      </div>

      <!-- City -->
      <div v-if="localFilters.stateId" class="filter-group">
        <label for="city" class="filter-label">
          <Icon name="heroicons:building-office-2" class="label__icon" />
          Cidade
        </label>
        <select id="city" v-model="localFilters.cityId" @change="onCityChange" class="filter-select"
          :disabled="cities.length === 0">
          <option value="">Todas as cidades</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">
            {{ city.name }} ({{ city._count?.parishes || 0 }})
          </option>
        </select>
      </div>

      <!-- Neighborhood -->
      <div v-if="localFilters.cityId && neighborhoods.length > 0" class="filter-group">
        <label for="neighborhood" class="filter-label">
          <Icon name="heroicons:map-pin" class="label__icon" />
          Bairro
        </label>
        <select id="neighborhood" v-model="localFilters.neighborhoodId" class="filter-select">
          <option value="">Todos os bairros</option>
          <option v-for="neighborhood in neighborhoods" :key="neighborhood.id" :value="neighborhood.id">
            {{ neighborhood.name }} ({{ neighborhood._count?.parishes || 0 }})
          </option>
        </select>
      </div>

      <!-- Diocese -->
      <div class="filter-group">
        <label for="diocese" class="filter-label">
          <Icon name="heroicons:building-library" class="label__icon" />
          Diocese
        </label>
        <select id="diocese" v-model="localFilters.dioceseId" class="filter-select">
          <option value="">Todas as dioceses</option>
          <option v-for="diocese in dioceses" :key="diocese.id" :value="diocese.id">
            {{ diocese.name }} ({{ diocese._count?.parishes || 0 }})
          </option>
        </select>
      </div>

      <div class="parish-filters__actions">
        <button type="submit" class="filter-button filter-button--primary" :disabled="loading">
          <LoadingSpinner v-if="loading" class="button__spinner" />
          <Icon v-else name="heroicons:magnifying-glass" class="button__icon" />
          Filtrar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
interface ParishFiltersProps {
  filters: {
    search?: string
    stateId?: string
    cityId?: string
    neighborhoodId?: string
    dioceseId?: string
  }
  states: Array<{
    id: string
    name: string
    _count?: { parishes: number }
  }>
  cities: Array<{
    id: string
    name: string
    _count?: { parishes: number }
  }>
  neighborhoods: Array<{
    id: string
    name: string
    _count?: { parishes: number }
  }>
  dioceses: Array<{
    id: string
    name: string
    _count?: { parishes: number }
  }>
  loading?: boolean
}

interface ParishFiltersEmits {
  'apply-filters': [filters: ParishFiltersProps['filters']]
  'clear-filters': []
  'state-change': [stateId: string]
  'city-change': [cityId: string]
}

const props = withDefaults(defineProps<ParishFiltersProps>(), {
  loading: false
})

const emit = defineEmits<ParishFiltersEmits>()

// Local state for filters
const localFilters = ref({ ...props.filters })

// Watch for external filter changes
watch(() => props.filters, (newFilters) => {
  localFilters.value = { ...newFilters }
}, { deep: true })

// Computed properties
const hasActiveFilters = computed(() => {
  return !!(
    localFilters.value.search ||
    localFilters.value.stateId ||
    localFilters.value.cityId ||
    localFilters.value.neighborhoodId ||
    localFilters.value.dioceseId
  )
})

// Methods
const applyFilters = () => {
  // Clean up empty values
  const cleanFilters = Object.fromEntries(
    Object.entries(localFilters.value).filter(([_, value]) => value !== '' && value !== undefined)
  )
  emit('apply-filters', cleanFilters)
}

const clearAllFilters = () => {
  localFilters.value = {}
  emit('clear-filters')
}

const onStateChange = () => {
  // Clear dependent filters when state changes
  localFilters.value.cityId = ''
  localFilters.value.neighborhoodId = ''

  if (localFilters.value.stateId) {
    emit('state-change', localFilters.value.stateId)
  }
}

const onCityChange = () => {
  // Clear dependent filters when city changes
  localFilters.value.neighborhoodId = ''

  if (localFilters.value.cityId) {
    emit('city-change', localFilters.value.cityId)
  }
}

// Auto-apply filters when search changes (with debounce)
const searchDebounce = ref<NodeJS.Timeout>()
watch(() => localFilters.value.search, () => {
  if (searchDebounce.value) {
    clearTimeout(searchDebounce.value)
  }

  searchDebounce.value = setTimeout(() => {
    applyFilters()
  }, 500)
})
</script>

<style scoped>
.parish-filters {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  padding: 1.5rem;
  border: 1px solid var(--color-gray-200);
}

.parish-filters__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.parish-filters__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-gray-900);
  font-family: var(--font-heading);
}

.title__icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-primary-500);
}

.parish-filters__clear {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: background-color 200ms;
  color: var(--color-red-600);
  background-color: var(--color-red-50);
}

.parish-filters__clear:hover {
  background-color: var(--color-red-100);
}

.clear__icon {
  width: 1rem;
  height: 1rem;
}

.parish-filters__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-700);
}

.label__icon {
  width: 1rem;
  height: 1rem;
  color: var(--color-gray-500);
}

.filter-input,
.filter-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-gray-300);
  transition: border-color 200ms, box-shadow 200ms;
  outline: none;
  background-color: white;
  color: var(--color-gray-900);
}

.filter-input:focus,
.filter-select:focus {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.1);
}

.filter-input::placeholder {
  color: var(--color-gray-500);
}

.filter-select:disabled {
  cursor: not-allowed;
  background-color: var(--color-gray-50);
  color: var(--color-gray-500);
}

.parish-filters__actions {
  padding-top: 1rem;
  border-top: 1px solid var(--color-gray-200);
}

.filter-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 200ms;
}

.filter-button--primary {
  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-500) 100%);
  color: white;
  border: none;
}

.filter-button--primary:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-secondary-600) 100%);
}

.filter-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.button__icon,
.button__spinner {
  width: 1rem;
  height: 1rem;
}
</style>
