<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="flex justify-center items-center py-32">
      <Icon name="eos-icons:loading" class="w-8 h-8 text-blue-600 animate-spin" />
    </div>

    <div v-else-if="!event" class="text-center py-32">
      <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Evento não encontrado</h1>
      <p class="text-gray-600 mb-6">O evento que você está tentando editar não existe ou foi removido.</p>
      <NuxtLink
        to="/eventos"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
      >
        <Icon name="heroicons:arrow-left" class="w-5 h-5" />
        Voltar aos eventos
      </NuxtLink>
    </div>

    <div v-else>
      <!-- Cabeçalho -->
      <div class="mb-8">
        <nav class="flex items-center space-x-2 text-sm mb-4">
          <NuxtLink to="/eventos" class="text-blue-600 hover:text-blue-800">Eventos</NuxtLink>
          <Icon name="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
          <NuxtLink :to="`/eventos/${event.slug}`" class="text-blue-600 hover:text-blue-800">{{ event.title }}</NuxtLink>
          <Icon name="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
          <span class="text-gray-500">Editar</span>
        </nav>
        
        <h1 class="text-3xl font-bold text-gray-900">Editar evento</h1>
        <p class="text-gray-600 mt-2">Atualize as informações do seu evento</p>
      </div>

      <!-- Formulário -->
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Informações Básicas -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Informações básicas</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Título -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Título do evento *
              </label>
              <input
                v-model="form.title"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Retiro de Carnaval 2024"
              />
              <p v-if="form.title" class="text-sm text-gray-500 mt-1">
                URL: /eventos/{{ generateSlug(form.title) }}
              </p>
            </div>
            
            <!-- Categoria -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Categoria *
              </label>
              <select
                v-model="form.category"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione uma categoria</option>
                <option value="Retiro">Retiro</option>
                <option value="Missa">Missa</option>
                <option value="Palestra">Palestra</option>
                <option value="Formação">Formação</option>
                <option value="Encontro">Encontro</option>
                <option value="Celebração">Celebração</option>
                <option value="Peregrinação">Peregrinação</option>
                <option value="Adoração">Adoração</option>
                <option value="Novena">Novena</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            
            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                v-model="form.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="DRAFT">Rascunho</option>
                <option value="PUBLISHED">Publicado</option>
                <option value="CANCELLED">Cancelado</option>
                <option value="COMPLETED">Finalizado</option>
              </select>
            </div>
          </div>
          
          <!-- Descrição -->
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Descrição *
            </label>
            <textarea
              v-model="form.description"
              required
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Breve descrição do evento..."
            />
          </div>
        </div>

        <!-- Data e Local -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Data e local</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Data de início -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Data e hora de início *
              </label>
              <input
                v-model="form.startDate"
                type="datetime-local"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <!-- Data de fim -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Data e hora de fim
              </label>
              <input
                v-model="form.endDate"
                type="datetime-local"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <!-- Local -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Local *
              </label>
              <input
                v-model="form.location"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Igreja São João Batista"
              />
            </div>
            
            <!-- Endereço -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Endereço completo
              </label>
              <input
                v-model="form.address"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Rua, número, bairro, cidade - UF"
              />
            </div>
          </div>
          
          <!-- Evento online -->
          <div class="mt-6">
            <label class="flex items-center gap-3">
              <input
                v-model="form.isOnline"
                type="checkbox"
                class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span class="text-sm font-medium text-gray-700">
                Este é um evento online
              </span>
            </label>
            
            <div v-if="form.isOnline" class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Link da transmissão
              </label>
              <input
                v-model="form.onlineUrl"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        <!-- Configurações de inscrição -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Inscrições</h2>
          
          <div class="space-y-6">
            <!-- Requer inscrição -->
            <div>
              <label class="flex items-center gap-3">
                <input
                  v-model="form.registrationRequired"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span class="text-sm font-medium text-gray-700">
                  Requer inscrição prévia
                </span>
              </label>
            </div>
            
            <div v-if="form.registrationRequired" class="space-y-6">
              <!-- Limite de participantes -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Número máximo de participantes
                  </label>
                  <input
                    v-model.number="form.maxParticipants"
                    type="number"
                    min="1"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 100"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Número mínimo de participantes
                  </label>
                  <input
                    v-model.number="form.minParticipants"
                    type="number"
                    min="1"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 10"
                  />
                </div>
              </div>
              
              <!-- Período de inscrição -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Início das inscrições
                  </label>
                  <input
                    v-model="form.registrationStart"
                    type="datetime-local"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Fim das inscrições
                  </label>
                  <input
                    v-model="form.registrationEnd"
                    type="datetime-local"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <!-- Requer aprovação -->
              <div>
                <label class="flex items-center gap-3">
                  <input
                    v-model="form.requiresApproval"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span class="text-sm font-medium text-gray-700">
                    Inscrições requerem aprovação manual
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Preço -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Preço</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Valor (R$)
              </label>
              <input
                v-model.number="form.price"
                type="number"
                min="0"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
              <p class="text-sm text-gray-500 mt-1">
                Deixe vazio para evento gratuito
              </p>
            </div>
          </div>
        </div>

        <!-- Configurações avançadas -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Configurações avançadas</h2>
          
          <div class="space-y-6">
            <!-- Tags -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                v-model="tagsInput"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="jovens, família, oração (separadas por vírgula)"
                @blur="updateTags"
              />
              <div v-if="form.tags && form.tags.length > 0" class="flex flex-wrap gap-2 mt-2">
                <span
                  v-for="(tag, index) in form.tags"
                  :key="index"
                  class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                >
                  #{{ tag }}
                  <button
                    type="button"
                    @click="removeTag(index)"
                    class="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
            
            <!-- Faixa etária -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Idade mínima
                </label>
                <input
                  v-model.number="form.ageMin"
                  type="number"
                  min="0"
                  max="120"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 16"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Idade máxima
                </label>
                <input
                  v-model.number="form.ageMax"
                  type="number"
                  min="0"
                  max="120"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 35"
                />
              </div>
            </div>
            
            <!-- Visibilidade -->
            <div class="space-y-4">
              <div>
                <label class="flex items-center gap-3">
                  <input
                    v-model="form.isPublic"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span class="text-sm font-medium text-gray-700">
                    Evento público (visível na listagem)
                  </span>
                </label>
              </div>
              
              <div>
                <label class="flex items-center gap-3">
                  <input
                    v-model="form.isFeatured"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span class="text-sm font-medium text-gray-700">
                    Destacar evento
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- SEO -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">SEO e Metadata</h2>
          
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Título SEO
              </label>
              <input
                v-model="form.metaTitle"
                type="text"
                maxlength="60"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Título para mecanismos de busca (máx. 60 caracteres)"
              />
              <p class="text-sm text-gray-500 mt-1">
                {{ (form.metaTitle || '').length }}/60 caracteres
              </p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Descrição SEO
              </label>
              <textarea
                v-model="form.metaDescription"
                maxlength="160"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descrição para mecanismos de busca (máx. 160 caracteres)"
              />
              <p class="text-sm text-gray-500 mt-1">
                {{ (form.metaDescription || '').length }}/160 caracteres
              </p>
            </div>
          </div>
        </div>

        <!-- Botões de ação -->
        <div class="flex justify-between items-center pt-6 border-t">
          <div class="flex gap-4">
            <NuxtLink
              :to="`/eventos/${event.slug}`"
              class="text-gray-600 hover:text-gray-800 px-6 py-3 rounded-lg transition-colors"
            >
              Cancelar
            </NuxtLink>
            
            <button
              v-if="event.status === 'PUBLISHED'"
              type="button"
              @click="deleteEvent"
              :disabled="deleting"
              class="border border-red-300 hover:bg-red-50 text-red-700 px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {{ deleting ? 'Excluindo...' : 'Excluir evento' }}
            </button>
          </div>
          
          <div class="flex gap-4">
            <button
              type="button"
              @click="saveDraft"
              :disabled="saving"
              class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {{ saving ? 'Salvando...' : 'Salvar rascunho' }}
            </button>
            
            <button
              type="submit"
              :disabled="saving"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {{ saving ? 'Salvando...' : 'Salvar alterações' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// Route params
const route = useRoute()
const slug = route.params.slug as string

// Meta tags
useSeoMeta({
  title: 'Editar Evento - Acesso Católico',
  description: 'Edite as informações do seu evento católico',
  robots: 'noindex, nofollow'
})

// Middleware para verificar permissões
definePageMeta({
  middleware: 'auth'
})

// Composables
const { user } = useAuth()
const { event, loading, getEvent, updateEvent, deleteEvent: removeEvent, generateSlug } = useEvents()

// Estado reativo
const saving = ref(false)
const deleting = ref(false)
const tagsInput = ref('')

const form = ref({
  title: '',
  description: '',
  category: '',
  status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'COMPLETED',
  startDate: '',
  endDate: '',
  location: '',
  address: '',
  isOnline: false,
  onlineUrl: '',
  registrationRequired: true,
  maxParticipants: null as number | null,
  minParticipants: 1,
  registrationStart: '',
  registrationEnd: '',
  requiresApproval: false,
  price: null as number | null,
  tags: [] as string[],
  ageMin: null as number | null,
  ageMax: null as number | null,
  isPublic: true,
  isFeatured: false,
  metaTitle: '',
  metaDescription: ''
})

// Métodos
const updateTags = () => {
  if (tagsInput.value.trim()) {
    const newTags = tagsInput.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .filter(tag => !form.value.tags.includes(tag))
    
    form.value.tags = [...form.value.tags, ...newTags]
    tagsInput.value = ''
  }
}

const removeTag = (index: number) => {
  form.value.tags.splice(index, 1)
}

const formatDateForInput = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toISOString().slice(0, 16)
}

const populateForm = () => {
  if (!event.value) return
  
  form.value = {
    title: event.value.title,
    description: event.value.description,
    category: event.value.category,
    status: event.value.status as any,
    startDate: formatDateForInput(event.value.startDate),
    endDate: formatDateForInput(event.value.endDate || ''),
    location: event.value.location,
    address: event.value.address || '',
    isOnline: event.value.isOnline,
    onlineUrl: event.value.onlineUrl || '',
    registrationRequired: event.value.registrationRequired,
    maxParticipants: event.value.maxParticipants,
    minParticipants: event.value.minParticipants,
    registrationStart: formatDateForInput(event.value.registrationStart || ''),
    registrationEnd: formatDateForInput(event.value.registrationEnd || ''),
    requiresApproval: event.value.requiresApproval,
    price: event.value.price ? Number(event.value.price) : null,
    tags: Array.isArray(event.value.tags) ? event.value.tags : [],
    ageMin: event.value.ageMin,
    ageMax: event.value.ageMax,
    isPublic: event.value.isPublic,
    isFeatured: event.value.isFeatured,
    metaTitle: event.value.metaTitle || '',
    metaDescription: event.value.metaDescription || ''
  }
}

const saveDraft = async () => {
  form.value.status = 'DRAFT'
  await handleSubmit()
}

const handleSubmit = async () => {
  if (saving.value || !event.value) return
  
  saving.value = true
  
  try {
    const eventData = {
      ...form.value,
      // Remove campos vazios/nulos
      endDate: form.value.endDate || undefined,
      address: form.value.address || undefined,
      onlineUrl: form.value.isOnline ? form.value.onlineUrl : undefined,
      maxParticipants: form.value.maxParticipants || undefined,
      registrationStart: form.value.registrationStart || undefined,
      registrationEnd: form.value.registrationEnd || undefined,
      price: form.value.price || undefined,
      ageMin: form.value.ageMin || undefined,
      ageMax: form.value.ageMax || undefined,
      metaTitle: form.value.metaTitle || undefined,
      metaDescription: form.value.metaDescription || undefined,
      tags: form.value.tags.length > 0 ? form.value.tags : undefined
    }
    
    const result = await updateEvent(event.value.id, eventData)
    
    if (result.success && result.event) {
      // Redirecionar para o evento atualizado
      await navigateTo(`/eventos/${result.event.slug}`)
    }
  } catch (error: any) {
    console.error('Erro ao atualizar evento:', error)
    alert('Erro ao atualizar evento: ' + (error.message || 'Erro desconhecido'))
  } finally {
    saving.value = false
  }
}

const deleteEvent = async () => {
  if (!event.value || !confirm('Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.')) {
    return
  }
  
  deleting.value = true
  
  try {
    await removeEvent(event.value.id)
    await navigateTo('/eventos')
  } catch (error: any) {
    console.error('Erro ao excluir evento:', error)
    alert('Erro ao excluir evento: ' + (error.message || 'Erro desconhecido'))
  } finally {
    deleting.value = false
  }
}

// Lifecycle
onMounted(async () => {
  await getEvent(slug)
  
  // Verificar permissões
  if (!user.value || !event.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Evento não encontrado'
    })
  }
  
  if (user.value.id !== event.value.organizerId && user.value.role !== 'ADMIN') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Você não tem permissão para editar este evento'
    })
  }
  
  populateForm()
})

// Watch for event changes
watch(event, (newEvent) => {
  if (newEvent) {
    populateForm()
  }
})
</script>
