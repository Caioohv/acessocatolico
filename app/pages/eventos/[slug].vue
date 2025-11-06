<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center py-32">
      <Icon name="eos-icons:loading" class="w-8 h-8 text-blue-600 animate-spin" />
    </div>

    <!-- Event Details -->
    <div v-else-if="event" class="container mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center space-x-2 text-sm mb-6">
        <NuxtLink to="/eventos" class="text-blue-600 hover:text-blue-800">Eventos</NuxtLink>
        <Icon name="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
        <span class="text-gray-500">{{ event.title }}</span>
      </nav>

      <!-- Header with Cover Image -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div v-if="event.coverImage" class="relative h-96">
          <img 
            :src="event.coverImage" 
            :alt="event.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div class="p-8 text-white">
              <h1 class="text-4xl font-bold mb-2">{{ event.title }}</h1>
              <p class="text-xl opacity-90">{{ event.description }}</p>
            </div>
          </div>
        </div>
        
        <div v-else class="p-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ event.title }}</h1>
          <p class="text-xl text-gray-600">{{ event.description }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="p-6 border-t flex flex-wrap gap-4">
          <button
            v-if="canRegister"
            @click="registerForEvent"
            :disabled="registering"
            class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Icon v-if="registering" name="eos-icons:loading" class="w-5 h-5 animate-spin" />
            <Icon v-else name="heroicons:ticket" class="w-5 h-5" />
            {{ registering ? 'Inscrevendo...' : 'Inscrever-se' }}
          </button>
          
          <button
            v-else-if="userRegistration"
            class="bg-green-600 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 cursor-default"
          >
            <Icon name="heroicons:check-circle" class="w-5 h-5" />
            Inscrito
          </button>
          
          <button
            @click="shareEvent"
            class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Icon name="heroicons:share" class="w-5 h-5" />
            Compartilhar
          </button>
          
          <NuxtLink
            v-if="canEdit"
            :to="`/eventos/${event.slug}/editar`"
            class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Icon name="heroicons:pencil" class="w-5 h-5" />
            Editar
          </NuxtLink>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Event Content -->
          <div class="bg-white rounded-lg shadow-sm p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Sobre o evento</h2>
            <div 
              v-if="event.content"
              class="prose prose-lg max-w-none"
              v-html="event.content"
            />
            <p v-else class="text-gray-600">{{ event.description }}</p>
          </div>

          <!-- Gallery -->
          <div v-if="event.gallery && event.gallery.length > 0" class="bg-white rounded-lg shadow-sm p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Galeria</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="(image, index) in event.gallery"
                :key="index"
                class="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                @click="openGallery(index)"
              >
                <img
                  :src="image"
                  :alt="`Imagem ${index + 1}`"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Comments -->
          <div class="bg-white rounded-lg shadow-sm p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Comentários</h2>
            
            <!-- Comment Form -->
            <div v-if="user" class="mb-8">
              <div class="flex gap-4">
                <img
                  :src="user.profile?.avatar || '/default-avatar.png'"
                  :alt="`${user.profile?.firstName} ${user.profile?.lastName}`"
                  class="w-10 h-10 rounded-full"
                />
                <div class="flex-1">
                  <textarea
                    v-model="newComment"
                    placeholder="Deixe seu comentário..."
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div class="flex justify-end mt-2">
                    <button
                      @click="addComment"
                      :disabled="!newComment.trim() || addingComment"
                      class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      {{ addingComment ? 'Enviando...' : 'Comentar' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Comments List -->
            <div class="space-y-6">
              <div
                v-for="comment in comments"
                :key="comment.id"
                class="flex gap-4"
              >
                <img
                  :src="comment.user.avatar || '/default-avatar.png'"
                  :alt="comment.user.name"
                  class="w-10 h-10 rounded-full"
                />
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <h4 class="font-medium text-gray-900">{{ comment.user.name }}</h4>
                    <span class="text-sm text-gray-500">{{ formatDate(comment.createdAt) }}</span>
                  </div>
                  <p class="text-gray-600">{{ comment.content }}</p>
                </div>
              </div>
              
              <div v-if="comments.length === 0" class="text-center py-8 text-gray-500">
                Seja o primeiro a comentar!
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Event Info Card -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Informações do evento</h3>
            
            <div class="space-y-4">
              <!-- Date and Time -->
              <div class="flex items-start gap-3">
                <Icon name="heroicons:calendar-days" class="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p class="font-medium text-gray-900">{{ formatEventDate(event.startDate, event.endDate) }}</p>
                  <p class="text-sm text-gray-500">{{ formatEventTime(event.startDate, event.endDate) }}</p>
                </div>
              </div>
              
              <!-- Location -->
              <div class="flex items-start gap-3">
                <Icon name="heroicons:map-pin" class="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p class="font-medium text-gray-900">{{ event.location }}</p>
                  <p v-if="event.address" class="text-sm text-gray-500">{{ event.address }}</p>
                  <p v-if="event.isOnline" class="text-sm text-blue-600">Evento online</p>
                </div>
              </div>
              
              <!-- Category -->
              <div class="flex items-center gap-3">
                <Icon name="heroicons:tag" class="w-5 h-5 text-gray-400" />
                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                  {{ event.category }}
                </span>
              </div>
              
              <!-- Price -->
              <div v-if="event.price" class="flex items-center gap-3">
                <Icon name="heroicons:currency-dollar" class="w-5 h-5 text-gray-400" />
                <p class="font-medium text-gray-900">
                  {{ formatPrice(event.price, event.currency) }}
                </p>
              </div>
              
              <!-- Participants -->
              <div v-if="event.maxParticipants" class="flex items-center gap-3">
                <Icon name="heroicons:users" class="w-5 h-5 text-gray-400" />
                <p class="text-gray-600">
                  {{ registrationCount }}/{{ event.maxParticipants }} inscritos
                </p>
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-blue-600 h-2 rounded-full transition-all"
                    :style="{ width: `${(registrationCount / event.maxParticipants) * 100}%` }"
                  />
                </div>
              </div>
              
              <!-- Tags -->
              <div v-if="event.tags && event.tags.length > 0" class="flex items-start gap-3">
                <Icon name="heroicons:hashtag" class="w-5 h-5 text-gray-400 mt-0.5" />
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in event.tags"
                    :key="tag"
                    class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Organizer Card -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Organizador</h3>
            
            <div class="flex items-center gap-4">
              <img
                :src="event.organizer.avatar || '/default-avatar.png'"
                :alt="event.organizer.name"
                class="w-12 h-12 rounded-full"
              />
              <div>
                <h4 class="font-medium text-gray-900">{{ event.organizer.name }}</h4>
                <p class="text-sm text-gray-500">{{ formatRole(event.organizer.role) }}</p>
              </div>
            </div>
            
            <div v-if="event.parish" class="mt-4 pt-4 border-t">
              <p class="text-sm text-gray-600">
                <Icon name="heroicons:building-office" class="w-4 h-4 inline mr-1" />
                {{ event.parish.name }}
              </p>
            </div>
          </div>

          <!-- Attachments -->
          <div v-if="event.attachments && event.attachments.length > 0" class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Documentos</h3>
            
            <div class="space-y-3">
              <a
                v-for="attachment in event.attachments"
                :key="attachment.url"
                :href="attachment.url"
                target="_blank"
                class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Icon name="heroicons:document" class="w-5 h-5 text-gray-400" />
                <div class="flex-1">
                  <p class="font-medium text-gray-900">{{ attachment.name }}</p>
                  <p class="text-sm text-gray-500">{{ attachment.type }}</p>
                </div>
                <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Not Found -->
    <div v-else class="text-center py-32">
      <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Evento não encontrado</h1>
      <p class="text-gray-600 mb-6">O evento que você está procurando não existe ou foi removido.</p>
      <NuxtLink
        to="/eventos"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
      >
        <Icon name="heroicons:arrow-left" class="w-5 h-5" />
        Voltar aos eventos
      </NuxtLink>
    </div>

    <!-- Gallery Modal -->
    <Teleport to="body">
      <div
        v-if="galleryOpen"
        class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
        @click="closeGallery"
      >
        <div class="relative max-w-4xl max-h-full">
          <img
            :src="event.gallery[currentGalleryIndex]"
            :alt="`Imagem ${currentGalleryIndex + 1}`"
            class="max-w-full max-h-full object-contain"
            @click.stop
          />
          
          <button
            @click="closeGallery"
            class="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
          >
            ×
          </button>
          
          <button
            v-if="currentGalleryIndex > 0"
            @click="previousImage"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-2xl"
          >
            ←
          </button>
          
          <button
            v-if="currentGalleryIndex < event.gallery.length - 1"
            @click="nextImage"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-2xl"
          >
            →
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
// Route params
const route = useRoute()
const slug = route.params.slug as string

// Composables
const { user } = useAuth()
const { 
  event, 
  loading, 
  userRegistration, 
  registrationCount, 
  comments,
  getEvent, 
  registerForEvent: register,
  getEventComments,
  addEventComment
} = useEvents()

// Estado reativo
const registering = ref(false)
const newComment = ref('')
const addingComment = ref(false)
const galleryOpen = ref(false)
const currentGalleryIndex = ref(0)

// Computed
const canRegister = computed(() => {
  if (!user.value || !event.value) return false
  if (userRegistration.value) return false
  if (event.value.maxParticipants && registrationCount.value >= event.value.maxParticipants) return false
  if (event.value.registrationEnd && new Date(event.value.registrationEnd) < new Date()) return false
  return true
})

const canEdit = computed(() => {
  if (!user.value || !event.value) return false
  return user.value.id === event.value.organizerId || user.value.role === 'ADMIN'
})

// Métodos
const registerForEvent = async () => {
  if (!canRegister.value) return
  
  registering.value = true
  try {
    await register(event.value.id)
    // Reload event data to update registration count
    await getEvent(slug)
  } catch (error) {
    console.error('Erro ao se inscrever:', error)
  } finally {
    registering.value = false
  }
}

const shareEvent = async () => {
  const url = window.location.href
  const title = event.value?.title || 'Evento'
  
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text: event.value?.description,
        url
      })
    } catch (error) {
      // User cancelled or error occurred
    }
  } else {
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(url)
      alert('Link copiado para a área de transferência!')
    } catch (error) {
      console.error('Erro ao copiar link:', error)
    }
  }
}

const addComment = async () => {
  if (!newComment.value.trim()) return
  
  addingComment.value = true
  try {
    await addEventComment(event.value.id, newComment.value.trim())
    newComment.value = ''
    // Reload comments
    await getEventComments(event.value.id)
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error)
  } finally {
    addingComment.value = false
  }
}

const openGallery = (index: number) => {
  currentGalleryIndex.value = index
  galleryOpen.value = true
}

const closeGallery = () => {
  galleryOpen.value = false
}

const previousImage = () => {
  if (currentGalleryIndex.value > 0) {
    currentGalleryIndex.value--
  }
}

const nextImage = () => {
  if (currentGalleryIndex.value < event.value.gallery.length - 1) {
    currentGalleryIndex.value++
  }
}

const formatEventDate = (startDate: string, endDate?: string) => {
  const start = new Date(startDate)
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  
  if (endDate) {
    const end = new Date(endDate)
    if (start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString('pt-BR', options)
    } else {
      return `${start.toLocaleDateString('pt-BR', options)} - ${end.toLocaleDateString('pt-BR', options)}`
    }
  }
  
  return start.toLocaleDateString('pt-BR', options)
}

const formatEventTime = (startDate: string, endDate?: string) => {
  const start = new Date(startDate)
  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }
  
  if (endDate) {
    const end = new Date(endDate)
    return `${start.toLocaleTimeString('pt-BR', timeOptions)} - ${end.toLocaleTimeString('pt-BR', timeOptions)}`
  }
  
  return start.toLocaleTimeString('pt-BR', timeOptions)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatPrice = (price: number, currency: string = 'BRL') => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency
  }).format(price)
}

const formatRole = (role: string) => {
  const roles: Record<string, string> = {
    PRIEST: 'Padre',
    ADMIN: 'Administrador',
    USER: 'Usuário'
  }
  return roles[role] || role
}

// Lifecycle
onMounted(async () => {
  await getEvent(slug)
  
  if (event.value) {
    // Load comments
    await getEventComments(event.value.id)
    
    // Set meta tags
    useSeoMeta({
      title: event.value.title,
      description: event.value.description,
      ogTitle: event.value.title,
      ogDescription: event.value.description,
      ogType: 'article',
      ogImage: event.value.coverImage,
      twitterCard: 'summary_large_image'
    })
  }
})

// Handle 404 if event not found
watch(event, (newEvent) => {
  if (newEvent === null && !loading.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Evento não encontrado'
    })
  }
})
</script>
