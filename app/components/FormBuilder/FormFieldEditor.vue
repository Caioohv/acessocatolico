<template>
  <div class="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors group">
    
    <!-- Field Header -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center space-x-2">
        <div class="w-2 h-6 bg-blue-500 rounded-sm cursor-grab opacity-50 group-hover:opacity-100"></div>
        <Icon :name="fieldTypeIcon" class="h-5 w-5 text-gray-500" />
        <span class="text-sm font-medium text-gray-600">{{ fieldTypeLabel }}</span>
      </div>
      
      <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <UButton
          size="xs"
          variant="ghost"
          color="gray"
          icon="heroicons:document-duplicate"
          @click="$emit('duplicate', field)"
        />
        <UButton
          size="xs"
          variant="ghost"
          color="red"
          icon="heroicons:trash"
          @click="confirmDelete"
        />
      </div>
    </div>

    <!-- Field Configuration -->
    <div class="space-y-4">
      
      <!-- Label and Help Text -->
      <div class="grid grid-cols-1 gap-3">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Rótulo do campo *
          </label>
          <UInput
            :model-value="field.label"
            @update:model-value="updateField('label', $event)"
            placeholder="Ex: Nome completo"
            size="sm"
          />
        </div>
        
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Texto de ajuda (opcional)
          </label>
          <UInput
            :model-value="field.helpText || ''"
            @update:model-value="updateField('helpText', $event)"
            placeholder="Ex: Digite seu nome conforme documento"
            size="sm"
          />
        </div>
      </div>

      <!-- Placeholder (for applicable field types) -->
      <div v-if="hasPlaceholder" class="grid grid-cols-1">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Placeholder
          </label>
          <UInput
            :model-value="field.placeholder || ''"
            @update:model-value="updateField('placeholder', $event)"
            placeholder="Texto que aparece no campo vazio"
            size="sm"
          />
        </div>
      </div>

      <!-- Options (for SELECT and CHECKBOX) -->
      <div v-if="hasOptions" class="space-y-2">
        <label class="block text-xs font-medium text-gray-700">
          Opções
        </label>
        
        <div class="space-y-2">
          <div
            v-for="(option, idx) in fieldOptions"
            :key="idx"
            class="flex items-center space-x-2"
          >
            <UInput
              :model-value="option.label"
              @update:model-value="updateOption(idx, 'label', $event)"
              placeholder="Nome da opção"
              size="sm"
              class="flex-1"
            />
            <UInput
              :model-value="option.value"
              @update:model-value="updateOption(idx, 'value', $event)"
              placeholder="Valor"
              size="sm"
              class="flex-1"
            />
            <UButton
              size="xs"
              variant="ghost"
              color="red"
              icon="heroicons:x-mark"
              @click="removeOption(idx)"
              :disabled="fieldOptions.length <= 1"
            />
          </div>
        </div>
        
        <UButton
          size="xs"
          variant="outline"
          color="gray"
          @click="addOption"
        >
          <Icon name="heroicons:plus" class="h-3 w-3 mr-1" />
          Adicionar opção
        </UButton>
      </div>

      <!-- File types (for FILE fields) -->
      <div v-if="field.type === 'FILE'" class="grid grid-cols-1">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Tipos de arquivo aceitos
          </label>
          <UInput
            :model-value="field.acceptedTypes || ''"
            @update:model-value="updateField('acceptedTypes', $event)"
            placeholder="Ex: .pdf,.doc,.jpg,.png"
            size="sm"
          />
        </div>
      </div>

      <!-- Number constraints (for NUMBER fields) -->
      <div v-if="field.type === 'NUMBER'" class="grid grid-cols-2 gap-2">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Valor mínimo
          </label>
          <UInput
            :model-value="field.minValue || ''"
            @update:model-value="updateField('minValue', $event ? Number($event) : null)"
            type="number"
            size="sm"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Valor máximo
          </label>
          <UInput
            :model-value="field.maxValue || ''"
            @update:model-value="updateField('maxValue', $event ? Number($event) : null)"
            type="number"
            size="sm"
          />
        </div>
      </div>

      <!-- Text constraints (for TEXT and TEXTAREA) -->
      <div v-if="hasTextConstraints" class="grid grid-cols-2 gap-2">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Tamanho mínimo
          </label>
          <UInput
            :model-value="field.minLength || ''"
            @update:model-value="updateField('minLength', $event ? Number($event) : null)"
            type="number"
            size="sm"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Tamanho máximo
          </label>
          <UInput
            :model-value="field.maxLength || ''"
            @update:model-value="updateField('maxLength', $event ? Number($event) : null)"
            type="number"
            size="sm"
          />
        </div>
      </div>

      <!-- Field Settings -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-100">
        <div class="flex items-center space-x-4">
          <label class="flex items-center space-x-2">
            <UCheckbox
              :checked="field.required"
              @change="updateField('required', $event.target?.checked)"
            />
            <span class="text-xs text-gray-600">Campo obrigatório</span>
          </label>
        </div>
        
        <div class="text-xs text-gray-400">
          Posição: {{ field.order || index + 1 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  field: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update', 'delete', 'duplicate'])

// Field type configuration
const fieldTypeConfigs = {
  TEXT: { icon: 'heroicons:pencil', label: 'Texto Curto', hasPlaceholder: true, hasTextConstraints: true },
  TEXTAREA: { icon: 'heroicons:document-text', label: 'Texto Longo', hasPlaceholder: true, hasTextConstraints: true },
  EMAIL: { icon: 'heroicons:envelope', label: 'E-mail', hasPlaceholder: true },
  PHONE: { icon: 'heroicons:phone', label: 'Telefone', hasPlaceholder: true },
  NUMBER: { icon: 'heroicons:hashtag', label: 'Número', hasPlaceholder: true },
  DATE: { icon: 'heroicons:calendar-days', label: 'Data' },
  SELECT: { icon: 'heroicons:radio-group', label: 'Seleção Única', hasOptions: true },
  CHECKBOX: { icon: 'heroicons:check-box', label: 'Múltipla Escolha', hasOptions: true },
  FILE: { icon: 'heroicons:paper-clip', label: 'Upload de Arquivo' }
}

const fieldTypeIcon = computed(() => fieldTypeConfigs[props.field.type]?.icon || 'heroicons:question-mark-circle')
const fieldTypeLabel = computed(() => fieldTypeConfigs[props.field.type]?.label || 'Campo Desconhecido')
const hasPlaceholder = computed(() => fieldTypeConfigs[props.field.type]?.hasPlaceholder)
const hasOptions = computed(() => fieldTypeConfigs[props.field.type]?.hasOptions)
const hasTextConstraints = computed(() => fieldTypeConfigs[props.field.type]?.hasTextConstraints)

// Options management
const fieldOptions = computed({
  get: () => props.field.options || [],
  set: (newOptions) => updateField('options', newOptions)
})

function updateField(key, value) {
  emit('update', props.field.id, { [key]: value })
}

function updateOption(index, key, value) {
  const newOptions = [...fieldOptions.value]
  newOptions[index] = { ...newOptions[index], [key]: value }
  updateField('options', newOptions)
}

function addOption() {
  const newOptions = [...fieldOptions.value]
  const nextIndex = newOptions.length + 1
  newOptions.push({
    value: `opcao${nextIndex}`,
    label: `Opção ${nextIndex}`
  })
  updateField('options', newOptions)
}

function removeOption(index) {
  if (fieldOptions.value.length <= 1) return
  const newOptions = fieldOptions.value.filter((_, i) => i !== index)
  updateField('options', newOptions)
}

function confirmDelete() {
  if (confirm('Tem certeza que deseja remover este campo?')) {
    emit('delete', props.field.id)
  }
}
</script>
