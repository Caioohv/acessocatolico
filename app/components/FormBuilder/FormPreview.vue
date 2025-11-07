<template>
  <div class="space-y-6">
    
    <!-- Form Header -->
    <div v-if="form.title || form.description" class="border-b border-gray-200 pb-4">
      <h3 v-if="form.title" class="text-lg font-semibold text-gray-900 mb-2">
        {{ form.title }}
      </h3>
      <p v-if="form.description" class="text-gray-600 text-sm">
        {{ form.description }}
      </p>
      
      <!-- Form status info -->
      <div v-if="!fullPreview" class="flex items-center space-x-4 mt-3 text-xs text-gray-500">
        <div class="flex items-center space-x-1">
          <Icon :name="form.isActive ? 'heroicons:check-circle' : 'heroicons:x-circle'" 
                :class="form.isActive ? 'text-green-500' : 'text-red-500'" 
                class="h-4 w-4" />
          <span>{{ form.isActive ? 'Ativo' : 'Inativo' }}</span>
        </div>
        
        <div v-if="form.openDate" class="flex items-center space-x-1">
          <Icon name="heroicons:calendar" class="h-4 w-4" />
          <span>Abre: {{ formatDate(form.openDate) }}</span>
        </div>
        
        <div v-if="form.closeDate" class="flex items-center space-x-1">
          <Icon name="heroicons:calendar-x" class="h-4 w-4" />
          <span>Fecha: {{ formatDate(form.closeDate) }}</span>
        </div>
      </div>
    </div>

    <!-- Form Fields -->
    <div v-if="fields.length === 0" class="text-center py-8 text-gray-400">
      <Icon name="heroicons:document-text" class="h-8 w-8 mx-auto mb-2" />
      <p>Nenhum campo adicionado ainda</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="field in sortedFields"
        :key="field.id"
        class="space-y-2"
      >
        <!-- Field Label -->
        <label class="block text-sm font-medium text-gray-700">
          {{ field.label }}
          <span v-if="field.required" class="text-red-500 ml-1">*</span>
        </label>

        <!-- Help Text -->
        <p v-if="field.helpText" class="text-xs text-gray-600 -mt-1">
          {{ field.helpText }}
        </p>

        <!-- Field Input -->
        <div class="relative">
          
          <!-- TEXT field -->
          <UInput
            v-if="field.type === 'TEXT'"
            :placeholder="field.placeholder"
            disabled
            class="w-full"
          />

          <!-- TEXTAREA field -->
          <UTextarea
            v-else-if="field.type === 'TEXTAREA'"
            :placeholder="field.placeholder"
            disabled
            rows="3"
            class="w-full"
          />

          <!-- EMAIL field -->
          <UInput
            v-else-if="field.type === 'EMAIL'"
            type="email"
            :placeholder="field.placeholder || 'exemplo@email.com'"
            disabled
            class="w-full"
          />

          <!-- PHONE field -->
          <UInput
            v-else-if="field.type === 'PHONE'"
            type="tel"
            :placeholder="field.placeholder || '(11) 99999-9999'"
            disabled
            class="w-full"
          />

          <!-- NUMBER field -->
          <UInput
            v-else-if="field.type === 'NUMBER'"
            type="number"
            :placeholder="field.placeholder"
            :min="field.minValue"
            :max="field.maxValue"
            disabled
            class="w-full"
          />

          <!-- DATE field -->
          <UInput
            v-else-if="field.type === 'DATE'"
            type="date"
            disabled
            class="w-full"
          />

          <!-- SELECT field -->
          <USelectMenu
            v-else-if="field.type === 'SELECT'"
            :options="field.options || []"
            option-attribute="label"
            value-attribute="value"
            placeholder="Selecione uma opção"
            disabled
            class="w-full"
          />

          <!-- CHECKBOX field -->
          <div v-else-if="field.type === 'CHECKBOX'" class="space-y-2">
            <label
              v-for="option in field.options || []"
              :key="option.value"
              class="flex items-center space-x-2 text-sm text-gray-600"
            >
              <UCheckbox disabled />
              <span>{{ option.label }}</span>
            </label>
          </div>

          <!-- FILE field -->
          <div v-else-if="field.type === 'FILE'" class="relative">
            <UInput
              type="file"
              :accept="field.acceptedTypes"
              disabled
              class="w-full"
            />
            <p v-if="field.acceptedTypes" class="text-xs text-gray-500 mt-1">
              Tipos aceitos: {{ field.acceptedTypes }}
            </p>
          </div>

          <!-- Unknown field type -->
          <div v-else class="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p class="text-sm text-yellow-800">
              <Icon name="heroicons:exclamation-triangle" class="h-4 w-4 mr-1 inline" />
              Tipo de campo não reconhecido: {{ field.type }}
            </p>
          </div>
        </div>

        <!-- Field constraints info -->
        <div v-if="hasConstraintsInfo(field)" class="text-xs text-gray-500">
          <span v-if="field.minLength">Mín: {{ field.minLength }} caracteres</span>
          <span v-if="field.minLength && field.maxLength"> • </span>
          <span v-if="field.maxLength">Máx: {{ field.maxLength }} caracteres</span>
          <span v-if="field.minValue">Mín: {{ field.minValue }}</span>
          <span v-if="field.minValue && field.maxValue"> • </span>
          <span v-if="field.maxValue">Máx: {{ field.maxValue }}</span>
        </div>
      </div>
    </div>

    <!-- Form Footer (only in full preview) -->
    <div v-if="fullPreview && fields.length > 0" class="border-t border-gray-200 pt-6">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-500">
          <Icon name="heroicons:information-circle" class="h-4 w-4 mr-1 inline" />
          Campos marcados com * são obrigatórios
        </div>
        
        <div class="flex space-x-3">
          <UButton variant="outline" color="gray" disabled>
            Cancelar
          </UButton>
          <UButton color="primary" disabled>
            Enviar Inscrição
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  form: {
    type: Object,
    default: () => ({})
  },
  fields: {
    type: Array,
    default: () => []
  },
  fullPreview: {
    type: Boolean,
    default: false
  }
})

// Computed properties
const sortedFields = computed(() => {
  return [...props.fields].sort((a, b) => (a.order || 0) - (b.order || 0))
})

// Helper functions
function formatDate(dateStr) {
  if (!dateStr) return ''
  
  const date = new Date(dateStr)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function hasConstraintsInfo(field) {
  return field.minLength || field.maxLength || field.minValue || field.maxValue
}
</script>
