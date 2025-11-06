<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <!-- Cover Image -->
    <div class="relative">
      <img
        :src="event.coverImage || '/default-event-cover.jpg'"
        :alt="event.title"
        class="w-full h-48 object-cover"
      />
      
      <!-- Status Badge -->
      <div class="absolute top-3 left-3">
        <span
          :class="[
            'px-2 py-1 rounded-full text-xs font-medium',
            getStatusColorClass(event.status)
          ]"
        >
          {{ formatStatus(event.status) }}
        </span>
      </div>
      
      <!-- Featured Badge -->
      <div v-if="event.isFeatured" class="absolute top-3 right-3">
        <span class="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Destaque
        </span>
      </div>
      
      <!-- Price Badge -->
      <div v-if="event.price" class="absolute bottom-3 right-3">
        <span class="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm font-medium">
          {{ formatPrice(event.price, event.currency) }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Category -->
      <div class="mb-2">
        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
          {{ event.category }}
        </span>
      </div>
      
      <!-- Title -->
      <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {{ event.title }}
      </h3>
      
      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">
        {{ event.description }}
      </p>
      
      <!-- Event Info -->
      <div class="space-y-2 mb-4">
        <!-- Date -->
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <Icon name="heroicons:calendar-days" class="w-4 h-4" />
          <span>{{ formatEventDate(event.startDate, event.endDate) }}</span>
        </div>
        
        <!-- Location -->
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <Icon name="heroicons:map-pin" class="w-4 h-4" />
          <span class="truncate">{{ event.location }}</span>
        </div>
        
        <!-- Participants -->
        <div v-if="event.maxParticipants" class="flex items-center gap-2 text-sm text-gray-500">
          <Icon name="heroicons:users" class="w-4 h-4" />
          <span>{{ event._count?.registrations || 0 }}/{{ event.maxParticipants }} inscritos</span>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex justify-between items-center">
        <button
          @click="$emit('view-details')"
          class="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          Ver detalhes
        </button>
        
        <div v-if="canManage" class="flex gap-2">
          <button
            @click="$emit('edit')"
            class="text-gray-500 hover:text-gray-700"
            title="Editar evento"
          >
            <Icon name="heroicons:pencil" class="w-4 h-4" />
          </button>
          
          <button
            @click="$emit('delete')"
            class="text-red-500 hover:text-red-700"
            title="Excluir evento"
          >
            <Icon name="heroicons:trash" class="w-4 h-4" />
          </button>
        </div>
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
