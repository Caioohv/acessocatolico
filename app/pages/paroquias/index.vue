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
          <ParishFilters :filters="filters" :states="states" :cities="cities" :neighborhoods="neighborhoods"
            :dioceses="dioceses" :loading="loading" @apply-filters="handleFiltersChange"
            @clear-filters="handleClearFilters" @state-change="handleStateChange" @city-change="handleCityChange" />
        </aside>

        <!-- Main Content Area -->
        <main class="content__main">
          <!-- Results Header with View Toggle -->
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
            
            <!-- View Toggle -->
            <div class="view-toggle">
              <button 
                @click="viewMode = 'list'" 
                :class="['view-toggle__button', { active: viewMode === 'list' }]"
                aria-label="Vista em lista"
              >
                <Icon name="heroicons:list-bullet" class="view-toggle__icon" />
                Lista
              </button>
              <button 
                @click="viewMode = 'map'" 
                :class="['view-toggle__button', { active: viewMode === 'map' }]"
                aria-label="Vista em mapa"
              >
                <Icon name="heroicons:map" class="view-toggle__icon" />
                Mapa
              </button>
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

          <!-- Content Based on View Mode -->
          <template v-if="!loading && !error && parishes.length > 0">
            <!-- Parish Grid (List View) -->
            <div v-if="viewMode === 'list'" class="parishes-grid">
              <ParishCard v-for="parish in parishes" :key="parish.id" :parish="parish" />
            </div>

            <!-- Parish Map (Map View) -->
            <div v-else-if="viewMode === 'map'" class="parishes-map">
              <ParishMap :parishes="parishes" :loading="loading" />
            </div>

            <!-- Pagination (only for list view) -->
            <ParishPagination v-if="viewMode === 'list'" :current-page="pagination.page"
              :total-pages="pagination.totalPages" :total="pagination.total" :limit="pagination.limit"
              :has-next="pagination.hasNext" :has-prev="pagination.hasPrev" @prev-page="prevPage" @next-page="nextPage"
              @go-to-page="goToPage" />
          </template>
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

// View mode toggle
const viewMode = ref<'list' | 'map'>('list')

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

<style>
.parishes-header {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-secondary-50) 100%);
}

.header__content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.header__text {
  text-align: center;
  margin-bottom: 2rem;
}

.header__title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--color-gray-900);
  font-family: var(--font-heading);
}

.header__description {
  font-size: 1.125rem;
  max-width: 48rem;
  margin: 0 auto;
  color: var(--color-gray-700);
}

.header__stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: var(--shadow-sm);
}

.stat-card__value {
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: var(--color-primary-600);
  font-family: var(--font-heading);
}

.stat-card__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-600);
}

.parishes-content {
  background-color: #f9fafb;
  min-height: 100vh;
}

.content__layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .content__layout {
    grid-template-columns: 1fr 3fr;
  }
}

.content__sidebar {
  position: relative;
}

.content__main {
  position: relative;
}

.content__main > * + * {
  margin-top: 1.5rem;
}

.results-header {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border: 1px solid var(--color-gray-200);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
}

.results-header__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-gray-900);
  font-family: var(--font-heading);
}

.active-filters {
  margin-top: 0.5rem;
}

.active-filters__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-700);
  display: block;
  margin-bottom: 0.5rem;
}

.active-filters__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 9999px;
  background-color: var(--color-primary-100);
  color: var(--color-primary-800);
}

.filter-tag__remove {
  padding: 0.125rem;
  border-radius: 9999px;
  transition: background-color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
}

.filter-tag__remove:hover {
  background-color: var(--color-primary-200);
}

.filter-tag__icon {
  width: 0.75rem;
  height: 0.75rem;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 3rem 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-gray-200);
}

.loading-state__spinner {
  width: 2rem;
  height: 2rem;
  margin: 0 auto 1rem;
}

.loading-state__text {
  color: var(--color-gray-600);
}

.error-state__icon,
.empty-state__icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  color: var(--color-gray-400);
}

.error-state__title,
.empty-state__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-gray-900);
}

.error-state__message,
.empty-state__message {
  margin-bottom: 1.5rem;
  color: var(--color-gray-600);
}

.error-state__button,
.empty-state__button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s;
  background-color: var(--color-primary-600);
  color: white;
  border: none;
  cursor: pointer;
}

.error-state__button:hover,
.empty-state__button:hover {
  background-color: var(--color-primary-700);
}

.button__icon {
  width: 1rem;
  height: 1rem;
}

.parishes-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .parishes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1280px) {
  .parishes-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.view-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
}

.view-toggle__button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s;
  color: var(--color-gray-600);
  background: none;
  border: none;
  cursor: pointer;
}

.view-toggle__button.active {
  background-color: var(--color-primary-600);
  color: white;
}

.view-toggle__button:hover:not(.active) {
  background-color: #e5e7eb;
}

.view-toggle__icon {
  width: 1rem;
  height: 1rem;
}

.parishes-map {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid var(--color-gray-200);
  min-height: 600px;
}

@media (max-width: 767px) {
  .header__title {
    font-size: 2rem;
  }
  
  .header__content {
    padding: 2rem 1rem;
  }
  
  .results-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .view-toggle {
    justify-content: center;
  }
}
</style>
-->
