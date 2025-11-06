<template>
  <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
    <div class="flex gap-6">
      <!-- Cover Image -->
      <div class="flex-shrink-0">
        <img
          :src="event.coverImage || '/default-event-cover.jpg'"
          :alt="event.title"
          class="w-32 h-24 object-cover rounded-lg"
        />
      </div>
      
      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              {{ event.category }}
            </span>
            
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                getStatusColorClass(event.status)
              ]"
            >
              {{ formatStatus(event.status) }}
            </span>
            
            <span v-if="event.isFeatured" class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              Destaque
            </span>
          </div>
          
          <div v-if="canManage" class="flex gap-2">
            <button
              @click="$emit('edit')"
              class="text-gray-400 hover:text-gray-600"
              title="Editar evento"
            >
              <Icon name="heroicons:pencil" class="w-4 h-4" />
            </button>
            
            <button
              @click="$emit('delete')"
              class="text-gray-400 hover:text-red-600"
              title="Excluir evento"
            >
              <Icon name="heroicons:trash" class="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <!-- Title and Description -->
        <h3 class="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {{ event.title }}
        </h3>
        
        <p class="text-gray-600 text-sm mb-3 line-clamp-2">
          {{ event.description }}
        </p>
        
        <!-- Event Info -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
          <!-- Date -->
          <div class="flex items-center gap-2">
            <Icon name="heroicons:calendar-days" class="w-4 h-4" />
            <span>{{ formatEventDate(event.startDate, event.endDate) }}</span>
          </div>
          
          <!-- Location -->
          <div class="flex items-center gap-2">
            <Icon name="heroicons:map-pin" class="w-4 h-4" />
            <span class="truncate">{{ event.location }}</span>
          </div>
          
          <!-- Participants or Price -->
          <div class="flex items-center gap-2">
            <Icon 
              :name="event.maxParticipants ? 'heroicons:users' : 'heroicons:currency-dollar'" 
              class="w-4 h-4" 
            />
            <span v-if="event.maxParticipants">
              {{ event._count?.registrations || 0 }}/{{ event.maxParticipants }} inscritos
            </span>
            <span v-else-if="event.price">
              {{ formatPrice(event.price, event.currency) }}
            </span>
            <span v-else>Gratuito</span>
          </div>
        </div>
      </div>
      
      <!-- Action Button -->
      <div class="flex-shrink-0 flex flex-col justify-center">
        <button
          @click="$emit('view-details')"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Ver detalhes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  event: {
    id: string
    title: string
    description: string
    coverImage?: string
    status: string
    category: string
    startDate: string
    endDate?: string
    location: string
    price?: number
    currency?: string
    maxParticipants?: number
    isFeatured?: boolean
    organizerId: string
    _count?: {
      registrations: number
    }
  }
}

const props = defineProps<Props>()

defineEmits<{
  'view-details': []
  'edit': []
  'delete': []
}>()

// Composables
const { user } = useAuth()

// Computed
const canManage = computed(() => {
  if (!user?.value) return false
  return user.value.id === props.event.organizerId || user.value.role === 'ADMIN'
})

// Methods
const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    DRAFT: 'Rascunho',
    PUBLISHED: 'Publicado',
    CANCELLED: 'Cancelado',
    COMPLETED: 'Finalizado'
  }
  return statusMap[status] || status
}

const getStatusColorClass = (status: string) => {
  const colors: Record<string, string> = {
    DRAFT: 'bg-gray-100 text-gray-800',
    PUBLISHED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    COMPLETED: 'bg-blue-100 text-blue-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const formatEventDate = (startDate: string, endDate?: string) => {
  const start = new Date(startDate)
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }
  
  if (endDate) {
    const end = new Date(endDate)
    if (start.toDateString() === end.toDateString()) {
      return `${start.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} • ${start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}-${end.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
    } else {
      return `${start.toLocaleDateString('pt-BR', options)} - ${end.toLocaleDateString('pt-BR', options)}`
    }
  }
  
  return start.toLocaleDateString('pt-BR', options)
}

const formatPrice = (price: number, currency: string = 'BRL') => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency
  }).format(price)
}
</script>

<style>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
