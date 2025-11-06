<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Cabeçalho da página -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Eventos</h1>
        <p class="text-gray-600">Descubra eventos católicos em sua região</p>
      </div>
      
      <NuxtLink 
        v-if="user && (user.role === 'ADMIN' || user.role === 'PRIEST')"
        to="/eventos/criar"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
      >
        <Icon name="heroicons:plus" class="w-5 h-5" />
        Criar Evento
      </NuxtLink>
    </div>

    <!-- Filtros -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Buscar eventos..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            @input="debouncedSearch"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
          <select
            v-model="filters.category"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="loadEvents"
          >
            <option value="">Todas as categorias</option>
            <option v-for="cat in categories" :key="cat.category" :value="cat.category">
              {{ cat.category }} ({{ cat.count }})
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Data</label>
          <select
            v-model="filters.date"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="loadEvents"
          >
            <option value="">Todas as datas</option>
            <option value="today">Hoje</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mês</option>
            <option value="upcoming">Próximos eventos</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Local</label>
          <input
            v-model="filters.location"
            type="text"
            placeholder="Cidade ou região..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            @input="debouncedSearch"
          />
        </div>
      </div>
      
      <div class="flex justify-between items-center mt-4">
        <div class="flex gap-2">
          <button
            v-for="view in viewModes"
            :key="view.value"
            @click="currentViewMode = view.value"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              currentViewMode === view.value
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            <Icon :name="view.icon" class="w-4 h-4 inline mr-1" />
            {{ view.label }}
          </button>
        </div>
        
        <div class="text-sm text-gray-500">
          {{ totalEvents }} eventos encontrados
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-12">
      <Icon name="eos-icons:loading" class="w-8 h-8 text-blue-600 animate-spin" />
    </div>

    <!-- Lista de eventos -->
    <div v-else-if="events.length > 0">
      <!-- Visualização em grade -->
      <div v-if="currentViewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <EventCard
          v-for="event in events"
          :key="event.id"
          :event="event"
          @view-details="navigateToEvent"
          @edit="editEvent"
          @delete="deleteEvent"
        />
      </div>
      
      <!-- Visualização em lista -->
      <div v-else-if="currentViewMode === 'list'" class="space-y-4 mb-8">
        <EventListItem
          v-for="event in events"
          :key="event.id"
          :event="event"
          @view-details="navigateToEvent"
          @edit="editEvent"
          @delete="deleteEvent"
        />
      </div>
      
      <!-- Visualização em calendário -->
      <div v-else-if="currentViewMode === 'calendar'" class="mb-8">
        <EventCalendarView
          :events="events"
          @select-date="filterByDate"
          @view-event="navigateToEvent"
        />
      </div>
    </div>

    <!-- Estado vazio -->
    <div v-else class="text-center py-12">
      <Icon name="heroicons:calendar" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum evento encontrado</h3>
      <p class="text-gray-500 mb-4">Tente ajustar os filtros ou criar um novo evento.</p>
      
      <NuxtLink 
        v-if="user && (user.role === 'ADMIN' || user.role === 'PRIEST')"
        to="/eventos/criar"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
      >
        <Icon name="heroicons:plus" class="w-5 h-5" />
        Criar Primeiro Evento
      </NuxtLink>
    </div>

    <!-- Paginação -->
    <div v-if="totalPages > 1" class="flex justify-center">
      <nav class="flex items-center gap-2">
        <button
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
          class="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        
        <button
          v-for="page in paginationPages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-2 text-sm font-medium rounded-md',
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          ]"
        >
          {{ page }}
        </button>
        
        <button
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
          class="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash-es'

// Meta tags
useSeoMeta({
  title: 'Eventos Católicos',
  description: 'Descubra eventos católicos em sua região. Missas, retiros, palestras e muito mais.',
  ogTitle: 'Eventos Católicos - Acesso Católico',
  ogDescription: 'Descubra eventos católicos em sua região. Missas, retiros, palestras e muito mais.',
  ogType: 'website'
})

// Composables
const { user } = useAuth()
const { events, categories, loading, totalEvents, totalPages, getEvents, getCategories, deleteEvent: removeEvent } = useEvents()

// Estado reativo
const currentPage = ref(1)
const pageSize = ref(12)
const currentViewMode = ref('grid')

const filters = ref({
  search: '',
  category: '',
  date: '',
  location: '',
  status: 'PUBLISHED'
})

const viewModes = [
  { value: 'grid', label: 'Grade', icon: 'heroicons:squares-2x2' },
  { value: 'list', label: 'Lista', icon: 'heroicons:list-bullet' },
  { value: 'calendar', label: 'Calendário', icon: 'heroicons:calendar-days' }
]

// Computed
const paginationPages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Métodos
const loadEvents = async () => {
  await getEvents({
    page: currentPage.value,
    limit: pageSize.value,
    ...filters.value
  })
}

const loadCategories = async () => {
  await getCategories()
}

const debouncedSearch = debounce(() => {
  currentPage.value = 1
  loadEvents()
}, 500)

const goToPage = (page: number) => {
  currentPage.value = page
  loadEvents()
}

const navigateToEvent = (event: any) => {
  navigateTo(`/eventos/${event.slug}`)
}

const editEvent = (event: any) => {
  if (user.value && (user.value.id === event.organizerId || user.value.role === 'ADMIN')) {
    navigateTo(`/eventos/${event.slug}/editar`)
  }
}

const deleteEvent = async (event: any) => {
  if (!confirm('Tem certeza que deseja excluir este evento?')) return
  
  try {
    await removeEvent(event.id)
    await loadEvents()
  } catch (error) {
    console.error('Erro ao excluir evento:', error)
  }
}

const filterByDate = (date: string) => {
  filters.value.date = date
  currentPage.value = 1
  loadEvents()
}

// Lifecycle
onMounted(() => {
  loadEvents()
  loadCategories()
})

// Watchers
watch(() => filters.value.category, () => {
  currentPage.value = 1
  loadEvents()
})

watch(() => filters.value.date, () => {
  currentPage.value = 1
  loadEvents()
})
</script>
