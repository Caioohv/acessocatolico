<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              Administração de Eventos
            </h1>
            <p class="text-sm text-gray-600 mt-1">
              Gerencie eventos e seus formulários de inscrição
            </p>
          </div>
          
          <div class="flex items-center space-x-3">
            <UButton
              variant="outline"
              color="gray"
              @click="refreshEvents"
              :loading="loading"
            >
              <Icon name="heroicons:arrow-path" class="h-4 w-4 mr-2" />
              Atualizar
            </UButton>
            
            <UButton
              color="primary"
              to="/eventos/criar"
            >
              <Icon name="heroicons:plus" class="h-4 w-4 mr-2" />
              Novo Evento
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Filters -->
      <div class="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Buscar eventos
            </label>
            <UInput
              v-model="filters.search"
              placeholder="Nome, descrição..."
              icon="heroicons:magnifying-glass"
              @input="debouncedSearch"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Status do evento
            </label>
            <USelectMenu
              v-model="filters.status"
              :options="statusOptions"
              placeholder="Todos os status"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Formulário
            </label>
            <USelectMenu
              v-model="filters.formStatus"
              :options="formStatusOptions"
              placeholder="Todos"
            />
          </div>
          
          <div class="flex items-end">
            <UButton
              variant="outline"
              color="gray"
              @click="clearFilters"
              class="w-full"
            >
              <Icon name="heroicons:x-mark" class="h-4 w-4 mr-2" />
              Limpar filtros
            </UButton>
          </div>
        </div>
      </div>

      <!-- Events List -->
      <div v-if="loading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="bg-white rounded-lg border border-gray-200 p-6">
          <USkeleton class="h-6 w-1/3 mb-3" />
          <USkeleton class="h-4 w-2/3 mb-2" />
          <USkeleton class="h-4 w-1/2" />
        </div>
      </div>

      <div v-else-if="events.length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-200">
        <Icon name="heroicons:calendar-days" class="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum evento encontrado</h3>
        <p class="text-gray-600 mb-6">
          {{ hasFilters ? 'Tente ajustar os filtros de busca' : 'Comece criando seu primeiro evento' }}
        </p>
        <UButton
          v-if="!hasFilters"
          color="primary"
          to="/eventos/criar"
        >
          <Icon name="heroicons:plus" class="h-4 w-4 mr-2" />
          Criar Evento
        </UButton>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="event in events"
          :key="event.id"
          class="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 transition-colors"
        >
          <div class="flex items-start justify-between">
            
            <!-- Event Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-lg font-semibold text-gray-900 truncate">
                  {{ event.title }}
                </h3>
                
                <!-- Event Status Badge -->
                <UBadge
                  :color="getEventStatusColor(event.status)"
                  variant="subtle"
                >
                  {{ getEventStatusLabel(event.status) }}
                </UBadge>
                
                <!-- Form Status Badge -->
                <UBadge
                  v-if="event.form"
                  :color="event.form.isActive ? 'green' : 'gray'"
                  variant="subtle"
                >
                  <Icon :name="event.form.isActive ? 'heroicons:check-circle' : 'heroicons:x-circle'" class="h-3 w-3 mr-1" />
                  {{ event.form.isActive ? 'Form Ativo' : 'Form Inativo' }}
                </UBadge>
                
                <UBadge
                  v-else
                  color="yellow"
                  variant="subtle"
                >
                  <Icon name="heroicons:exclamation-triangle" class="h-3 w-3 mr-1" />
                  Sem formulário
                </UBadge>
              </div>
              
              <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                {{ event.description }}
              </p>
              
              <div class="flex items-center space-x-6 text-sm text-gray-500">
                <div class="flex items-center space-x-1">
                  <Icon name="heroicons:calendar-days" class="h-4 w-4" />
                  <span>{{ formatEventDate(event.startDate, event.endDate) }}</span>
                </div>
                
                <div class="flex items-center space-x-1">
                  <Icon name="heroicons:map-pin" class="h-4 w-4" />
                  <span>{{ event.location || 'Local não definido' }}</span>
                </div>
                
                <div v-if="event.maxParticipants" class="flex items-center space-x-1">
                  <Icon name="heroicons:users" class="h-4 w-4" />
                  <span>{{ event._count?.registrations || 0 }}/{{ event.maxParticipants }} inscritos</span>
                </div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex items-center space-x-2 ml-4">
              
              <!-- Form Actions -->
              <UDropdown
                v-if="event.form"
                :items="getFormActions(event)"
                :popper="{ placement: 'bottom-end' }"
              >
                <UButton
                  variant="outline"
                  color="blue"
                  trailing-icon="heroicons:chevron-down-20-solid"
                >
                  <Icon name="heroicons:document-text" class="h-4 w-4 mr-2" />
                  Formulário
                </UButton>
              </UDropdown>
              
              <UButton
                v-else
                variant="outline"
                color="blue"
                @click="createEventForm(event.id)"
                :loading="creatingForm === event.id"
              >
                <Icon name="heroicons:plus" class="h-4 w-4 mr-2" />
                Criar Formulário
              </UButton>
              
              <!-- Event Actions -->
              <UDropdown
                :items="getEventActions(event)"
                :popper="{ placement: 'bottom-end' }"
              >
                <UButton
                  variant="outline"
                  color="gray"
                  trailing-icon="heroicons:chevron-down-20-solid"
                >
                  <Icon name="heroicons:cog-6-tooth" class="h-4 w-4 mr-2" />
                  Ações
                </UButton>
              </UDropdown>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="events.length > 0" class="mt-8 flex items-center justify-between">
        <div class="text-sm text-gray-700">
          Mostrando {{ ((pagination.page - 1) * pagination.limit) + 1 }} até 
          {{ Math.min(pagination.page * pagination.limit, pagination.total) }} 
          de {{ pagination.total }} eventos
        </div>
        
        <UPagination
          v-model="pagination.page"
          :page-count="pagination.limit"
          :total="pagination.total"
          @update:model-value="loadEvents"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// Meta and middleware
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

// Composables
const { showToast } = useToast()
const { createEventForm: createFormAPI } = useEventForms()

// State
const loading = ref(true)
const creatingForm = ref(null)
const events = ref([])

// Filters
const filters = ref({
  search: '',
  status: '',
  formStatus: ''
})

// Pagination
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0
})

// Filter options
const statusOptions = [
  { value: '', label: 'Todos os status' },
  { value: 'DRAFT', label: 'Rascunho' },
  { value: 'PUBLISHED', label: 'Publicado' },
  { value: 'CANCELLED', label: 'Cancelado' },
  { value: 'COMPLETED', label: 'Finalizado' }
]

const formStatusOptions = [
  { value: '', label: 'Todos' },
  { value: 'with_form', label: 'Com formulário' },
  { value: 'without_form', label: 'Sem formulário' },
  { value: 'active_form', label: 'Formulário ativo' },
  { value: 'inactive_form', label: 'Formulário inativo' }
]

// Computed
const hasFilters = computed(() => {
  return filters.value.search || filters.value.status || filters.value.formStatus
})

// Debounced search
const debouncedSearch = useDebounceFn(() => {
  pagination.value.page = 1
  loadEvents()
}, 300)

// Load events
async function loadEvents() {
  try {
    loading.value = true
    
    const params = new URLSearchParams({
      page: pagination.value.page.toString(),
      limit: pagination.value.limit.toString()
    })
    
    if (filters.value.search) params.append('search', filters.value.search)
    if (filters.value.status) params.append('status', filters.value.status)
    if (filters.value.formStatus) params.append('formStatus', filters.value.formStatus)
    
    const { data } = await $fetch(`/api/admin/events?${params}`)
    
    events.value = data.events
    pagination.value.total = data.total
  } catch (error) {
    console.error('Error loading events:', error)
    showToast('Erro ao carregar eventos', 'error')
  } finally {
    loading.value = false
  }
}

// Event actions
function getEventActions(event) {
  return [
    [{
      label: 'Ver evento',
      icon: 'heroicons:eye',
      click: () => navigateTo(`/eventos/${event.slug}`)
    }],
    [{
      label: 'Editar evento',
      icon: 'heroicons:pencil',
      click: () => navigateTo(`/eventos/${event.slug}/editar`)
    }],
    [{
      label: 'Ver inscrições',
      icon: 'heroicons:users',
      click: () => navigateTo(`/admin/eventos/${event.id}/inscricoes`),
      disabled: !event.form
    }]
  ]
}

// Form actions
function getFormActions(event) {
  return [
    [{
      label: 'Configurar formulário',
      icon: 'heroicons:cog-6-tooth',
      click: () => navigateTo(`/admin/eventos/${event.id}/formulario`)
    }],
    [{
      label: 'Ver inscrições',
      icon: 'heroicons:users',
      click: () => navigateTo(`/admin/eventos/${event.id}/inscricoes`)
    }],
    [{
      label: 'Exportar inscrições',
      icon: 'heroicons:arrow-down-tray',
      click: () => exportSubmissions(event.id)
    }]
  ]
}

// Create form for event
async function createEventForm(eventId) {
  try {
    creatingForm.value = eventId
    
    const result = await createFormAPI(eventId, {
      title: 'Formulário de Inscrição',
      isActive: false
    })
    
    if (result.success) {
      showToast('Formulário criado com sucesso!', 'success')
      await loadEvents() // Refresh list
      navigateTo(`/admin/eventos/${eventId}/formulario`)
    }
  } catch (error) {
    console.error('Error creating form:', error)
    showToast('Erro ao criar formulário', 'error')
  } finally {
    creatingForm.value = null
  }
}

// Export submissions
async function exportSubmissions(eventId) {
  try {
    const response = await $fetch(`/api/events/${eventId}/form/export`, {
      method: 'GET'
    })
    
    // Create and download file
    const blob = new Blob([response], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `inscricoes-evento-${eventId}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    
    showToast('Arquivo exportado com sucesso!', 'success')
  } catch (error) {
    console.error('Error exporting submissions:', error)
    showToast('Erro ao exportar inscrições', 'error')
  }
}

// Helper functions
function getEventStatusColor(status) {
  const colors = {
    DRAFT: 'yellow',
    PUBLISHED: 'green',
    CANCELLED: 'red',
    COMPLETED: 'blue'
  }
  return colors[status] || 'gray'
}

function getEventStatusLabel(status) {
  const labels = {
    DRAFT: 'Rascunho',
    PUBLISHED: 'Publicado',
    CANCELLED: 'Cancelado',
    COMPLETED: 'Finalizado'
  }
  return labels[status] || status
}

function formatEventDate(startDate, endDate) {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : null
  
  const formatDate = (date) => date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  
  if (end && start.toDateString() !== end.toDateString()) {
    return `${formatDate(start)} - ${formatDate(end)}`
  }
  
  return formatDate(start)
}

function refreshEvents() {
  loadEvents()
}

function clearFilters() {
  filters.value = {
    search: '',
    status: '',
    formStatus: ''
  }
  pagination.value.page = 1
  loadEvents()
}

// Watch filters
watch(
  () => [filters.value.status, filters.value.formStatus],
  () => {
    pagination.value.page = 1
    loadEvents()
  }
)

// Load events on mount
onMounted(() => {
  loadEvents()
})
</script>
