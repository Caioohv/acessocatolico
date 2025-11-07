<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between py-6">
          <div class="flex items-center space-x-4">
            <NuxtLink 
              :to="`/eventos/${eventSlug}`"
              class="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Icon name="heroicons:arrow-left" class="h-5 w-5 mr-2" />
              Voltar ao evento
            </NuxtLink>
            <div class="border-l border-gray-300 pl-4">
              <h1 class="text-2xl font-bold text-gray-900">
                Configurar Formulário de Inscrição
              </h1>
              <p class="text-sm text-gray-600 mt-1">
                {{ eventTitle || 'Carregando...' }}
              </p>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <UButton
              variant="outline"
              color="gray"
              @click="previewForm"
              :disabled="!form.id"
            >
              <Icon name="heroicons:eye" class="h-4 w-4 mr-2" />
              Visualizar
            </UButton>
            
            <UButton
              color="primary"
              @click="saveForm"
              :loading="saving"
              :disabled="!hasChanges"
            >
              <Icon name="heroicons:check" class="h-4 w-4 mr-2" />
              Salvar alterações
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Form Builder - Left Column -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Form Settings Card -->
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">
                  Configurações do Formulário
                </h3>
                <UToggle 
                  v-model="form.isActive" 
                  :disabled="saving"
                />
              </div>
            </template>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Título do formulário
                </label>
                <UInput
                  v-model="form.title"
                  placeholder="Ex: Inscrição para Retiro Espiritual"
                  :disabled="saving"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Descrição (opcional)
                </label>
                <UTextarea
                  v-model="form.description"
                  placeholder="Descreva brevemente o que os participantes devem saber sobre a inscrição..."
                  rows="3"
                  :disabled="saving"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Data de abertura
                  </label>
                  <UInput
                    v-model="form.openDate"
                    type="datetime-local"
                    :disabled="saving"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Data de fechamento
                  </label>
                  <UInput
                    v-model="form.closeDate"
                    type="datetime-local"
                    :disabled="saving"
                  />
                </div>
              </div>
            </div>
          </UCard>

          <!-- Form Fields Builder -->
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">
                  Campos do Formulário
                </h3>
                <UDropdown :items="fieldTypeMenuItems">
                  <UButton
                    color="primary"
                    variant="outline"
                    trailing-icon="heroicons:chevron-down-20-solid"
                  >
                    <Icon name="heroicons:plus" class="h-4 w-4 mr-2" />
                    Adicionar Campo
                  </UButton>
                </UDropdown>
              </div>
            </template>

            <!-- Fields List -->
            <div class="space-y-4">
              <div
                v-if="form.fields?.length === 0"
                class="text-center py-12 text-gray-500"
              >
                <Icon name="heroicons:document-text" class="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p class="text-lg font-medium">Nenhum campo adicionado</p>
                <p class="text-sm mt-1">Clique em "Adicionar Campo" para começar a criar seu formulário</p>
              </div>

              <draggable
                v-model="form.fields"
                group="fields"
                @start="drag=true"
                @end="onFieldReorder"
                item-key="id"
                class="space-y-3"
              >
                <template #item="{element: field, index}">
                  <FormFieldEditor
                    :key="field.id"
                    :field="field"
                    :index="index"
                    @update="updateField"
                    @delete="deleteField"
                    @duplicate="duplicateField"
                  />
                </template>
              </draggable>
            </div>
          </UCard>
        </div>

        <!-- Form Preview - Right Column -->
        <div class="lg:col-span-1">
          <div class="sticky top-8">
            <UCard>
              <template #header>
                <div class="flex items-center space-x-2">
                  <Icon name="heroicons:eye" class="h-5 w-5 text-gray-500" />
                  <h3 class="text-lg font-semibold text-gray-900">Preview</h3>
                </div>
              </template>

              <FormPreview
                :form="form"
                :fields="form.fields || []"
                class="max-h-[600px] overflow-y-auto"
              />
            </UCard>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <UModal v-model="showPreviewModal" :ui="{ width: 'max-w-4xl' }">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Preview do Formulário</h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="heroicons:x-mark-20-solid"
              @click="showPreviewModal = false"
            />
          </div>
        </template>

        <FormPreview
          :form="form"
          :fields="form.fields || []"
          full-preview
        />
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable'

// Meta and middleware
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

// Route params
const route = useRoute()
const eventId = computed(() => route.params.eventId)

// Composables
const { getEventForm, createEventForm, updateEventForm, createField, updateField: updateFieldAPI, deleteField: deleteFieldApi, reorderFields } = useEventForms()
const { showToast } = useToast()

// Reactive state
const saving = ref(false)
const loading = ref(true)
const hasChanges = ref(false)
const showPreviewModal = ref(false)
const drag = ref(false)

// Event and form data
const eventTitle = ref('')
const eventSlug = ref('')
const form = ref({
  id: null,
  title: '',
  description: '',
  isActive: true,
  openDate: '',
  closeDate: '',
  fields: []
})

// Field types menu
const fieldTypeMenuItems = [
  [{
    label: 'Texto Curto',
    icon: 'heroicons:pencil',
    click: () => addField('TEXT')
  }],
  [{
    label: 'Texto Longo',
    icon: 'heroicons:document-text',
    click: () => addField('TEXTAREA')
  }],
  [{
    label: 'E-mail',
    icon: 'heroicons:envelope',
    click: () => addField('EMAIL')
  }],
  [{
    label: 'Telefone',
    icon: 'heroicons:phone',
    click: () => addField('PHONE')
  }],
  [{
    label: 'Número',
    icon: 'heroicons:hashtag',
    click: () => addField('NUMBER')
  }],
  [{
    label: 'Data',
    icon: 'heroicons:calendar-days',
    click: () => addField('DATE')
  }],
  [{
    label: 'Seleção Única',
    icon: 'heroicons:radio-group',
    click: () => addField('SELECT')
  }],
  [{
    label: 'Múltipla Escolha',
    icon: 'heroicons:check-box',
    click: () => addField('CHECKBOX')
  }],
  [{
    label: 'Upload de Arquivo',
    icon: 'heroicons:paper-clip',
    click: () => addField('FILE')
  }]
]

// Load event and form data
onMounted(async () => {
  await loadEventForm()
})

async function loadEventForm() {
  try {
    loading.value = true
    
    // First get event data to show title
    const { data: event } = await $fetch(`/api/events/${eventId.value}`)
    if (event) {
      eventTitle.value = event.title
      eventSlug.value = event.slug
    }
    
    // Then try to get existing form
    const { data: existingForm } = await getEventForm(eventId.value)
    
    if (existingForm) {
      form.value = {
        id: existingForm.id,
        title: existingForm.title || '',
        description: existingForm.description || '',
        isActive: existingForm.isActive,
        openDate: existingForm.openDate ? new Date(existingForm.openDate).toISOString().slice(0, 16) : '',
        closeDate: existingForm.closeDate ? new Date(existingForm.closeDate).toISOString().slice(0, 16) : '',
        fields: existingForm.fields || []
      }
    } else {
      // Initialize with default values for new form
      form.value.title = `Inscrição - ${eventTitle.value}`
    }
  } catch (error) {
    console.error('Error loading event form:', error)
    showToast('Erro ao carregar formulário', 'error')
  } finally {
    loading.value = false
  }
}

// Form actions
async function saveForm() {
  try {
    saving.value = true
    
    const formData = {
      title: form.value.title,
      description: form.value.description || null,
      isActive: form.value.isActive,
      openDate: form.value.openDate ? new Date(form.value.openDate).toISOString() : null,
      closeDate: form.value.closeDate ? new Date(form.value.closeDate).toISOString() : null
    }
    
    let result
    if (form.value.id) {
      result = await updateEventForm(form.value.id, formData)
    } else {
      result = await createEventForm(eventId.value, formData)
      if (result.data) {
        form.value.id = result.data.id
      }
    }
    
    if (result.success) {
      hasChanges.value = false
      showToast('Formulário salvo com sucesso!', 'success')
    }
  } catch (error) {
    console.error('Error saving form:', error)
    showToast('Erro ao salvar formulário', 'error')
  } finally {
    saving.value = false
  }
}

// Field management
async function addField(type) {
  if (!form.value.id) {
    showToast('Salve o formulário antes de adicionar campos', 'warning')
    return
  }
  
  const fieldData = createFieldTemplate(type)
  
  try {
    const result = await createField(form.value.id, fieldData)
    if (result.success && result.data) {
      form.value.fields.push(result.data)
      hasChanges.value = true
      showToast('Campo adicionado com sucesso!', 'success')
    }
  } catch (error) {
    console.error('Error creating field:', error)
    showToast('Erro ao adicionar campo', 'error')
  }
}

function createFieldTemplate(type) {
  const templates = {
    TEXT: {
      label: 'Campo de texto',
      type: 'TEXT',
      required: false,
      placeholder: 'Digite aqui...'
    },
    TEXTAREA: {
      label: 'Campo de texto longo',
      type: 'TEXTAREA',
      required: false,
      placeholder: 'Digite sua resposta...'
    },
    EMAIL: {
      label: 'E-mail',
      type: 'EMAIL',
      required: true,
      placeholder: 'seu.email@exemplo.com'
    },
    PHONE: {
      label: 'Telefone',
      type: 'PHONE',
      required: false,
      placeholder: '(11) 99999-9999'
    },
    NUMBER: {
      label: 'Número',
      type: 'NUMBER',
      required: false,
      placeholder: '0'
    },
    DATE: {
      label: 'Data',
      type: 'DATE',
      required: false
    },
    SELECT: {
      label: 'Seleção única',
      type: 'SELECT',
      required: false,
      options: [
        { value: 'opcao1', label: 'Opção 1' },
        { value: 'opcao2', label: 'Opção 2' }
      ]
    },
    CHECKBOX: {
      label: 'Múltipla escolha',
      type: 'CHECKBOX',
      required: false,
      options: [
        { value: 'item1', label: 'Item 1' },
        { value: 'item2', label: 'Item 2' }
      ]
    },
    FILE: {
      label: 'Upload de arquivo',
      type: 'FILE',
      required: false,
      acceptedTypes: 'image/*,.pdf,.doc,.docx'
    }
  }
  
  const baseOrder = Math.max(...(form.value.fields?.map(f => f.order) || [0])) + 1
  
  return {
    ...templates[type],
    order: baseOrder
  }
}

async function updateField(fieldId, updates) {
  try {
    const result = await updateFieldAPI(fieldId, updates)
    if (result.success) {
      // Update local field
      const fieldIndex = form.value.fields.findIndex(f => f.id === fieldId)
      if (fieldIndex >= 0) {
        Object.assign(form.value.fields[fieldIndex], updates)
      }
      hasChanges.value = true
    }
  } catch (error) {
    console.error('Error updating field:', error)
    showToast('Erro ao atualizar campo', 'error')
  }
}

async function deleteField(fieldId) {
  try {
    const result = await deleteFieldApi(fieldId)
    if (result.success) {
      form.value.fields = form.value.fields.filter(f => f.id !== fieldId)
      hasChanges.value = true
      showToast('Campo removido com sucesso!', 'success')
    }
  } catch (error) {
    console.error('Error deleting field:', error)
    showToast('Erro ao remover campo', 'error')
  }
}

function duplicateField(field) {
  const duplicatedField = {
    ...field,
    id: `temp_${Date.now()}`,
    label: `${field.label} (cópia)`,
    order: Math.max(...form.value.fields.map(f => f.order)) + 1
  }
  
  addField(duplicatedField.type)
}

async function onFieldReorder() {
  if (!form.value.id || drag.value) return
  
  try {
    const fieldOrder = form.value.fields.map((field, index) => ({
      id: field.id,
      order: index + 1
    }))
    
    await reorderFields(form.value.id, fieldOrder)
    hasChanges.value = true
  } catch (error) {
    console.error('Error reordering fields:', error)
    showToast('Erro ao reordenar campos', 'error')
  }
}

function previewForm() {
  showPreviewModal.value = true
}

// Watch for changes
watch(
  () => [form.value.title, form.value.description, form.value.isActive, form.value.openDate, form.value.closeDate],
  () => {
    hasChanges.value = true
  },
  { deep: true }
)
</script>
