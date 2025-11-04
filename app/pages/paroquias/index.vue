<template>
  <div>
    <!-- Header -->
    <div class="parishes-header">
      <div class="header__content">
        <div class="header__text">
          <h1 class="header__title">Paróquias Católicas</h1>
          <p class="header__description">
            Encontre paróquias católicas em todo o Brasil. Descubra horários de missa, 
            eventos, ministérios e entre em contato com a comunidade local.
          </p>
        </div>
        <div class="header__stats">
          <div class="stat-card">
            <div class="stat-card__value">{{ pagination.total }}</div>
            <div class="stat-card__label">Paróquias</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__value">{{ states.length }}</div>
            <div class="stat-card__label">Estados</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__value">{{ dioceses.length }}</div>
            <div class="stat-card__label">Dioceses</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="parishes-content">
      <div class="content__layout">
        <!-- Sidebar with Filters -->
        <aside class="content__sidebar">
          <ParishFilters
            :filters="filters"
            :states="states"
            :cities="cities"
            :neighborhoods="neighborhoods"
            :dioceses="dioceses"
            :loading="loading"
            @apply-filters="handleFiltersChange"
            @clear-filters="handleClearFilters"
            @state-change="handleStateChange"
            @city-change="handleCityChange"
          />
        </aside>

        <!-- Main Content Area -->
        <main class="content__main">
          <!-- Results Header -->
          <div class="results-header">
            <div class="results-header__info">
              <h2 class="results-header__title">
                {{ pagination.total }} 
                {{ pagination.total === 1 ? 'paróquia encontrada' : 'paróquias encontradas' }}
              </h2>
              <div v-if="hasActiveFilters" class="active-filters">
                <span class="active-filters__label">Filtros ativos:</span>
                <div class="active-filters__list">
                  <span v-if="filters.search" class="filter-tag">
                    Busca: "{{ filters.search }}"
                    <button @click="removeFilter('search')" class="filter-tag__remove">
                      <Icon name="heroicons:x-mark" class="filter-tag__icon" />
                    </button>
                  </span>
                  <span v-if="selectedState" class="filter-tag">
                    Estado: {{ selectedState.name }}
                    <button @click="removeFilter('stateId')" class="filter-tag__remove">
                      <Icon name="heroicons:x-mark" class="filter-tag__icon" />
                    </button>
                  </span>
                  <span v-if="selectedCity" class="filter-tag">
                    Cidade: {{ selectedCity.name }}
                    <button @click="removeFilter('cityId')" class="filter-tag__remove">
                      <Icon name="heroicons:x-mark" class="filter-tag__icon" />
                    </button>
                  </span>
                  <span v-if="selectedNeighborhood" class="filter-tag">
                    Bairro: {{ selectedNeighborhood.name }}
                    <button @click="removeFilter('neighborhoodId')" class="filter-tag__remove">
                      <Icon name="heroicons:x-mark" class="filter-tag__icon" />
                    </button>
                  </span>
                  <span v-if="selectedDiocese" class="filter-tag">
                    Diocese: {{ selectedDiocese.name }}
                    <button @click="removeFilter('dioceseId')" class="filter-tag__remove">
                      <Icon name="heroicons:x-mark" class="filter-tag__icon" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="loading-state">
            <LoadingSpinner class="loading-state__spinner" />
            <p class="loading-state__text">Carregando paróquias...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="error-state">
            <Icon name="heroicons:exclamation-triangle" class="error-state__icon" />
            <h3 class="error-state__title">Erro ao carregar paróquias</h3>
            <p class="error-state__message">{{ error }}</p>
            <button @click="loadParishes()" class="error-state__button">
              <Icon name="heroicons:arrow-path" class="button__icon" />
              Tentar novamente
            </button>
          </div>

          <!-- Empty State -->
          <div v-else-if="parishes.length === 0" class="empty-state">
            <Icon name="heroicons:building-library" class="empty-state__icon" />
            <h3 class="empty-state__title">Nenhuma paróquia encontrada</h3>
            <p class="empty-state__message">
              Tente ajustar os filtros ou fazer uma busca diferente.
            </p>
            <button @click="handleClearFilters" class="empty-state__button">
              <Icon name="heroicons:x-mark" class="button__icon" />
              Limpar filtros
            </button>
          </div>

          <!-- Parish Grid -->
          <div v-else class="parishes-grid">
            <ParishCard
              v-for="parish in parishes"
              :key="parish.id"
              :parish="parish"
            />
          </div>

          <!-- Pagination -->
          <ParishPagination
            v-if="!loading && !error && parishes.length > 0"
            :current-page="pagination.page"
            :total-pages="pagination.totalPages"
            :total="pagination.total"
            :limit="pagination.limit"
            :has-next="pagination.hasNext"
            :has-prev="pagination.hasPrev"
            @prev-page="prevPage"
            @next-page="nextPage"
            @go-to-page="goToPage"
          />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO and meta
definePageMeta({
  layout: 'default',
  title: 'Paróquias Católicas - AcessoCatólico',
  description: 'Encontre paróquias católicas em todo o Brasil. Descubra horários de missa, eventos, ministérios e entre em contato com a comunidade local.'
})

useSeoMeta({
  title: 'Paróquias Católicas - AcessoCatólico',
  ogTitle: 'Paróquias Católicas - AcessoCatólico',
  description: 'Encontre paróquias católicas em todo o Brasil. Descubra horários de missa, eventos, ministérios e entre em contato com a comunidade local.',
  ogDescription: 'Encontre paróquias católicas em todo o Brasil. Descubra horários de missa, eventos, ministérios e entre em contato com a comunidade local.',
  ogImage: '/og-parishes.jpg',
  twitterCard: 'summary_large_image'
})

// Composables
const {
  parishes,
  loading,
  error,
  pagination,
  states,
  cities,
  neighborhoods,
  dioceses,
  filters,
  loadParishes,
  loadStates,
  loadCities,
  loadNeighborhoods,
  loadDioceses,
  nextPage,
  prevPage,
  goToPage,
  clearFilters
} = useParishes()

// Computed properties
const hasActiveFilters = computed(() => {
  return !!(
    filters.value.search ||
    filters.value.stateId ||
    filters.value.cityId ||
    filters.value.neighborhoodId ||
    filters.value.dioceseId
  )
})

const selectedState = computed(() => {
  return states.value.find(state => state.id === filters.value.stateId)
})

const selectedCity = computed(() => {
  return cities.value.find(city => city.id === filters.value.cityId)
})

const selectedNeighborhood = computed(() => {
  return neighborhoods.value.find(neighborhood => neighborhood.id === filters.value.neighborhoodId)
})

const selectedDiocese = computed(() => {
  return dioceses.value.find(diocese => diocese.id === filters.value.dioceseId)
})

// Methods
const handleFiltersChange = (newFilters: typeof filters.value) => {
  loadParishes(1, newFilters)
}

const handleClearFilters = () => {
  clearFilters()
}

const handleStateChange = (stateId: string) => {
  loadCities(stateId)
}

const handleCityChange = (cityId: string) => {
  loadNeighborhoods(cityId)
}

const removeFilter = (filterKey: keyof typeof filters.value) => {
  const newFilters = { ...filters.value }
  delete newFilters[filterKey]
  
  // Clear dependent filters
  if (filterKey === 'stateId') {
    delete newFilters.cityId
    delete newFilters.neighborhoodId
  } else if (filterKey === 'cityId') {
    delete newFilters.neighborhoodId
  }
  
  loadParishes(1, newFilters)
}

// Initialize data
onMounted(async () => {
  await Promise.all([
    loadStates(),
    loadDioceses(),
    loadParishes()
  ])
})
</script>

<!-- 
<style scoped>
.parishes-header {
  @apply relative overflow-hidden;
  background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-secondary-50) 100%);
}

.header__content {
  @apply container mx-auto px-4 py-12 lg:py-16;
}

.header__text {
  @apply text-center mb-8;
}

.header__title {
  @apply text-3xl lg:text-4xl font-bold mb-4;
  color: var(--color-gray-900);
  font-family: var(--font-heading);
}

.header__description {
  @apply text-lg max-w-3xl mx-auto;
  color: var(--color-gray-700);
}

.header__stats {
  @apply flex flex-wrap justify-center gap-6;
}

.stat-card {
  @apply text-center p-6 rounded-lg;
  background-color: white;
  box-shadow: var(--shadow-sm);
}

.stat-card__value {
  @apply text-3xl font-bold mb-1;
  color: var(--color-primary-600);
  font-family: var(--font-heading);
}

.stat-card__label {
  @apply text-sm font-medium;
  color: var(--color-gray-600);
}

.parishes-content {
  @apply bg-gray-50 min-h-screen;
}

.content__layout {
  @apply container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8;
}

.content__sidebar {
  @apply lg:col-span-1;
}

.content__main {
  @apply lg:col-span-3 space-y-6;
}

.results-header {
  @apply bg-white rounded-lg shadow-sm p-6;
  border: 1px solid var(--color-gray-200);
}

.results-header__title {
  @apply text-xl font-semibold mb-4;
  color: var(--color-gray-900);
  font-family: var(--font-heading);
}

.active-filters {
  @apply space-y-2;
}

.active-filters__label {
  @apply text-sm font-medium;
  color: var(--color-gray-700);
}

.active-filters__list {
  @apply flex flex-wrap gap-2;
}

.filter-tag {
  @apply inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full;
  background-color: var(--color-primary-100);
  color: var(--color-primary-800);
}

.filter-tag__remove {
  @apply p-0.5 rounded-full transition-colors duration-200;
}

.filter-tag__remove:hover {
  background-color: var(--color-primary-200);
}

.filter-tag__icon {
  @apply w-3 h-3;
}

.loading-state,
.error-state,
.empty-state {
  @apply text-center py-12 bg-white rounded-lg shadow-sm;
  border: 1px solid var(--color-gray-200);
}

.loading-state__spinner {
  @apply w-8 h-8 mx-auto mb-4;
}

.loading-state__text {
  color: var(--color-gray-600);
}

.error-state__icon,
.empty-state__icon {
  @apply w-16 h-16 mx-auto mb-4;
  color: var(--color-gray-400);
}

.error-state__title,
.empty-state__title {
  @apply text-xl font-semibold mb-2;
  color: var(--color-gray-900);
}

.error-state__message,
.empty-state__message {
  @apply mb-6;
  color: var(--color-gray-600);
}

.error-state__button,
.empty-state__button {
  @apply inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200;
  background-color: var(--color-primary-600);
  color: white;
}

.error-state__button:hover,
.empty-state__button:hover {
  background-color: var(--color-primary-700);
}

.button__icon {
  @apply w-4 h-4;
}

.parishes-grid {
  @apply grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6;
}
</style>
-->
