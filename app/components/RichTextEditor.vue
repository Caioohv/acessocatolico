<template>
  <div class="rich-text-editor">
    <div class="toolbar border border-gray-300 rounded-t-md bg-gray-50 p-2 flex flex-wrap gap-2">
      <!-- Formatting buttons -->
      <button
        type="button"
        @click="execCommand('bold')"
        :class="[
          'px-3 py-1 rounded text-sm border',
          isActive('bold') 
            ? 'bg-blue-100 border-blue-300 text-blue-700' 
            : 'bg-white border-gray-300 hover:bg-gray-50'
        ]"
        title="Negrito"
      >
        <Icon name="heroicons:bold" class="w-4 h-4" />
      </button>
      
      <button
        type="button"
        @click="execCommand('italic')"
        :class="[
          'px-3 py-1 rounded text-sm border',
          isActive('italic') 
            ? 'bg-blue-100 border-blue-300 text-blue-700' 
            : 'bg-white border-gray-300 hover:bg-gray-50'
        ]"
        title="Itálico"
      >
        <Icon name="heroicons:italic" class="w-4 h-4" />
      </button>
      
      <button
        type="button"
        @click="execCommand('underline')"
        :class="[
          'px-3 py-1 rounded text-sm border',
          isActive('underline') 
            ? 'bg-blue-100 border-blue-300 text-blue-700' 
            : 'bg-white border-gray-300 hover:bg-gray-50'
        ]"
        title="Sublinhado"
      >
        <Icon name="heroicons:underline" class="w-4 h-4" />
      </button>
      
      <div class="w-px h-6 bg-gray-300 mx-1" />
      
      <button
        type="button"
        @click="execCommand('insertUnorderedList')"
        :class="[
          'px-3 py-1 rounded text-sm border',
          isActive('insertUnorderedList') 
            ? 'bg-blue-100 border-blue-300 text-blue-700' 
            : 'bg-white border-gray-300 hover:bg-gray-50'
        ]"
        title="Lista com marcadores"
      >
        <Icon name="heroicons:list-bullet" class="w-4 h-4" />
      </button>
      
      <button
        type="button"
        @click="execCommand('insertOrderedList')"
        :class="[
          'px-3 py-1 rounded text-sm border',
          isActive('insertOrderedList') 
            ? 'bg-blue-100 border-blue-300 text-blue-700' 
            : 'bg-white border-gray-300 hover:bg-gray-50'
        ]"
        title="Lista numerada"
      >
        <Icon name="heroicons:numbered-list" class="w-4 h-4" />
      </button>
      
      <div class="w-px h-6 bg-gray-300 mx-1" />
      
      <select
        @change="formatBlock($event)"
        class="px-2 py-1 text-sm border border-gray-300 rounded bg-white"
        title="Formatação"
      >
        <option value="">Parágrafo</option>
        <option value="h2">Título 2</option>
        <option value="h3">Título 3</option>
        <option value="h4">Título 4</option>
        <option value="blockquote">Citação</option>
      </select>
      
      <div class="w-px h-6 bg-gray-300 mx-1" />
      
      <button
        type="button"
        @click="insertLink"
        class="px-3 py-1 rounded text-sm border bg-white border-gray-300 hover:bg-gray-50"
        title="Inserir link"
      >
        <Icon name="heroicons:link" class="w-4 h-4" />
      </button>
      
      <button
        type="button"
        @click="execCommand('removeFormat')"
        class="px-3 py-1 rounded text-sm border bg-white border-gray-300 hover:bg-gray-50"
        title="Remover formatação"
      >
        <Icon name="heroicons:x-mark" class="w-4 h-4" />
      </button>
    </div>
    
    <div
      ref="editor"
      contenteditable="true"
      :class="[
        'min-h-[200px] p-4 border-l border-r border-b border-gray-300 rounded-b-md',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        'prose prose-sm max-w-none'
      ]"
      @input="onInput"
      @paste="onPaste"
      @keydown="onKeyDown"
      v-html="modelValue"
    />
    
    <div class="text-xs text-gray-500 mt-2 flex justify-between">
      <span>Use Ctrl+B para negrito, Ctrl+I para itálico</span>
      <span>{{ characterCount }} caracteres</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
  maxLength?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Digite o conteúdo...',
  maxLength: 10000
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editor = ref<HTMLDivElement>()
const characterCount = computed(() => {
  return props.modelValue.replace(/<[^>]*>/g, '').length
})

// Methods
const execCommand = (command: string, value?: string) => {
  document.execCommand(command, false, value)
  editor.value?.focus()
  onInput()
}

const isActive = (command: string): boolean => {
  return document.queryCommandState(command)
}

const formatBlock = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value
  
  if (value) {
    execCommand('formatBlock', `<${value}>`)
  } else {
    execCommand('formatBlock', '<p>')
  }
  
  // Reset select
  target.value = ''
}

const insertLink = () => {
  const selection = document.getSelection()
  const selectedText = selection?.toString()
  
  const url = prompt('Digite o URL do link:', 'https://')
  if (url && url.trim()) {
    if (selectedText) {
      execCommand('createLink', url)
    } else {
      const linkText = prompt('Digite o texto do link:', url)
      if (linkText) {
        const html = `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`
        execCommand('insertHTML', html)
      }
    }
  }
}

const onInput = () => {
  if (!editor.value) return
  
  const content = editor.value.innerHTML
  
  // Limit character count (excluding HTML tags)
  const textContent = content.replace(/<[^>]*>/g, '')
  if (textContent.length > props.maxLength) {
    return
  }
  
  emit('update:modelValue', content)
}

const onPaste = (event: ClipboardEvent) => {
  event.preventDefault()
  
  const paste = event.clipboardData?.getData('text/plain') || ''
  const selection = document.getSelection()
  
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    range.deleteContents()
    range.insertNode(document.createTextNode(paste))
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }
  
  onInput()
}

const onKeyDown = (event: KeyboardEvent) => {
  // Handle keyboard shortcuts
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case 'b':
        event.preventDefault()
        execCommand('bold')
        break
      case 'i':
        event.preventDefault()
        execCommand('italic')
        break
      case 'u':
        event.preventDefault()
        execCommand('underline')
        break
      case 'k':
        event.preventDefault()
        insertLink()
        break
    }
  }
  
  // Prevent exceeding max length
  if (!event.ctrlKey && !event.metaKey && event.key.length === 1) {
    const textContent = (editor.value?.textContent || '').length
    if (textContent >= props.maxLength) {
      event.preventDefault()
    }
  }
}

// Set initial content and placeholder
onMounted(() => {
  if (editor.value && props.placeholder && !props.modelValue) {
    editor.value.innerHTML = `<p class="text-gray-400">${props.placeholder}</p>`
  }
  
  // Handle focus and blur for placeholder
  editor.value?.addEventListener('focus', () => {
    if (editor.value?.innerHTML.includes('text-gray-400')) {
      editor.value.innerHTML = '<p><br></p>'
    }
  })
  
  editor.value?.addEventListener('blur', () => {
    if (!editor.value?.textContent?.trim()) {
      editor.value.innerHTML = `<p class="text-gray-400">${props.placeholder}</p>`
    }
  })
})
</script>

<style scoped>
.rich-text-editor .prose {
  font-family: inherit;
}

.rich-text-editor .prose p {
  margin: 0.5em 0;
}

.rich-text-editor .prose h2 {
  margin: 1em 0 0.5em 0;
  font-size: 1.5em;
  font-weight: 600;
}

.rich-text-editor .prose h3 {
  margin: 1em 0 0.5em 0;
  font-size: 1.25em;
  font-weight: 600;
}

.rich-text-editor .prose h4 {
  margin: 1em 0 0.5em 0;
  font-size: 1.125em;
  font-weight: 600;
}

.rich-text-editor .prose blockquote {
  margin: 1em 0;
  padding-left: 1em;
  border-left: 4px solid #e5e7eb;
  font-style: italic;
  color: #6b7280;
}

.rich-text-editor .prose ul,
.rich-text-editor .prose ol {
  margin: 0.5em 0;
  padding-left: 2em;
}

.rich-text-editor .prose li {
  margin: 0.25em 0;
}

.rich-text-editor .prose a {
  color: #2563eb;
  text-decoration: underline;
}

.rich-text-editor .prose a:hover {
  color: #1d4ed8;
}
</style>
