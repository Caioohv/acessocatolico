<template>
  <div class="calendar-export">
    <UButton color="secondary" variant="outline" @click="exportCalendar" :loading="exporting" class="export-button">
      <Icon name="heroicons:calendar-days" class="button-icon" />
      Exportar Calendário
    </UButton>

    <!-- Export Modal -->
    <UModal v-model="showExportModal" class="export-modal">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">Exportar Horários de Missa</h3>
          <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid"
            @click="showExportModal = false" />
        </div>

        <div class="modal-content">
          <div class="export-info">
            <Icon name="heroicons:information-circle" class="info-icon" />
            <div class="info-text">
              <p>
                Exporte os horários de missa para adicionar ao seu calendário pessoal.
                Os eventos serão criados como recorrentes semanais.
              </p>
            </div>
          </div>

          <div class="export-options">
            <h4 class="options-title">Opções de Export</h4>

            <div class="option-group">
              <label class="option-label">
                <input v-model="exportOptions.includeAllMasses" type="checkbox" class="option-checkbox" />
                <span class="option-text">Incluir todas as missas</span>
              </label>

              <label class="option-label">
                <input v-model="exportOptions.includeSpecialEvents" type="checkbox" class="option-checkbox" />
                <span class="option-text">Incluir eventos especiais</span>
              </label>

              <label class="option-label">
                <input v-model="exportOptions.setReminders" type="checkbox" class="option-checkbox" />
                <span class="option-text">Definir lembretes (30 min antes)</span>
              </label>
            </div>

            <div class="duration-group">
              <label class="form-label">Período de Recorrência</label>
              <USelect v-model="exportOptions.duration" :options="durationOptions" class="duration-select" />
            </div>
          </div>

          <div class="mass-preview">
            <h4 class="preview-title">Missas que serão exportadas:</h4>
            <div class="preview-list">
              <div v-for="(masses, dayOfWeek) in filteredMasses" :key="dayOfWeek" class="preview-day">
                <span class="preview-day-name">{{ getDayName(Number(dayOfWeek)) }}</span>
                <div class="preview-masses">
                  <span v-for="(mass, index) in masses" :key="index" class="preview-mass">
                    {{ mass.time }} - {{ getMassTypeName(mass.type) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="export-formats">
            <h4 class="formats-title">Escolha o formato:</h4>
            <div class="format-buttons">
              <UButton color="primary" variant="solid" @click="downloadICS" :loading="downloading"
                class="format-button">
                <Icon name="heroicons:calendar" class="button-icon" />
                Download .ics
              </UButton>

              <UButton color="secondary" variant="outline" @click="copyToClipboard" :loading="copying"
                class="format-button">
                <Icon name="heroicons:clipboard-document" class="button-icon" />
                Copiar URLs
              </UButton>
            </div>
          </div>

          <div class="usage-instructions">
            <h4 class="instructions-title">Como usar:</h4>
            <div class="instructions-tabs">
              <button v-for="tab in instructionTabs" :key="tab.id"
                :class="['tab-button', { active: activeTab === tab.id }]" @click="activeTab = tab.id">
                <Icon :name="tab.icon" class="tab-icon" />
                {{ tab.label }}
              </button>
            </div>

            <div class="tab-content">
              <div v-if="activeTab === 'google'" class="instruction-content">
                <ol class="instruction-list">
                  <li>Clique em "Download .ics"</li>
                  <li>Abra o Google Calendar</li>
                  <li>Clique em "Configurações" → "Importar e exportar"</li>
                  <li>Selecione o arquivo baixado</li>
                  <li>Escolha o calendário de destino</li>
                </ol>
              </div>

              <div v-if="activeTab === 'outlook'" class="instruction-content">
                <ol class="instruction-list">
                  <li>Clique em "Download .ics"</li>
                  <li>Abra o Outlook</li>
                  <li>Vá em "Arquivo" → "Abrir e Exportar" → "Importar/Exportar"</li>
                  <li>Selecione "Importar um arquivo iCalendar"</li>
                  <li>Escolha o arquivo baixado</li>
                </ol>
              </div>

              <div v-if="activeTab === 'apple'" class="instruction-content">
                <ol class="instruction-list">
                  <li>Clique em "Download .ics"</li>
                  <li>Abra o app Calendário</li>
                  <li>Vá em "Arquivo" → "Importar"</li>
                  <li>Selecione o arquivo baixado</li>
                  <li>Escolha o calendário de destino</li>
                </ol>
              </div>

              <div v-if="activeTab === 'mobile'" class="instruction-content">
                <ol class="instruction-list">
                  <li>Clique em "Copiar URLs"</li>
                  <li>Cole o link no navegador do celular</li>
                  <li>O sistema abrirá automaticamente o app de calendário</li>
                  <li>Confirme a importação</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
interface Mass {
  id: string
  dayOfWeek: number
  time: string
  type: string
  language: string
  description?: string | null
}

interface Props {
  masses: Mass[]
  parishName: string
  parishAddress: string
}

const props = defineProps<Props>()

// State
const showExportModal = ref(false)
const exporting = ref(false)
const downloading = ref(false)
const copying = ref(false)
const activeTab = ref('google')

// Export options
const exportOptions = ref({
  includeAllMasses: true,
  includeSpecialEvents: true,
  setReminders: true,
  duration: '1-year'
})

// Duration options
const durationOptions = [
  { label: '3 meses', value: '3-months' },
  { label: '6 meses', value: '6-months' },
  { label: '1 ano', value: '1-year' },
  { label: '2 anos', value: '2-years' }
]

// Instruction tabs
const instructionTabs = [
  { id: 'google', label: 'Google', icon: 'simple-icons:google' },
  { id: 'outlook', label: 'Outlook', icon: 'simple-icons:microsoftoutlook' },
  { id: 'apple', label: 'Apple', icon: 'simple-icons:apple' },
  { id: 'mobile', label: 'Mobile', icon: 'heroicons:device-phone-mobile' }
]

// Computed
const massScheduleData = computed(() => {
  const schedule: Record<number, Mass[]> = {}

  props.masses.forEach(mass => {
    if (!schedule[mass.dayOfWeek]) {
      schedule[mass.dayOfWeek] = []
    }
    schedule[mass.dayOfWeek].push(mass)
  })

  return schedule
})

const filteredMasses = computed(() => {
  if (exportOptions.value.includeAllMasses) {
    return massScheduleData.value
  }

  // Add filtering logic here if needed
  return massScheduleData.value
})

// Methods
const exportCalendar = () => {
  showExportModal.value = true
}

const getDayName = (dayOfWeek: number) => {
  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  return days[dayOfWeek] || ''
}

const getMassTypeName = (type: string) => {
  const types: Record<string, string> = {
    regular: 'Missa',
    children: 'Missa das Crianças',
    youth: 'Missa dos Jovens',
    healing: 'Missa de Cura',
    adoration: 'Adoração',
    rosary: 'Terço'
  }
  return types[type] || 'Missa'
}

const generateICS = () => {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AcessoCatolico//Mass Schedule//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ]

  const now = new Date()
  const endDate = getEndDate(exportOptions.value.duration)

  Object.entries(filteredMasses.value).forEach(([dayOfWeek, masses]) => {
    masses.forEach(mass => {
      const eventId = `mass-${mass.id}-${Date.now()}`
      const startDate = getNextOccurrence(parseInt(dayOfWeek), mass.time)
      const endTime = addMinutes(parseTime(mass.time), 60) // Assume 1 hour duration

      lines.push(
        'BEGIN:VEVENT',
        `UID:${eventId}@acessocatolico.com`,
        `DTSTART:${formatICSDateTime(startDate)}`,
        `DTEND:${formatICSDateTime(addMinutes(startDate, 60))}`,
        `SUMMARY:${getMassTypeName(mass.type)} - ${props.parishName}`,
        `DESCRIPTION:${mass.description || getMassTypeName(mass.type)}`,
        `LOCATION:${props.parishAddress}`,
        `RRULE:FREQ=WEEKLY;UNTIL=${formatICSDate(endDate)}`,
        exportOptions.value.setReminders ? 'BEGIN:VALARM' : '',
        exportOptions.value.setReminders ? 'TRIGGER:-PT30M' : '',
        exportOptions.value.setReminders ? 'ACTION:DISPLAY' : '',
        exportOptions.value.setReminders ? 'DESCRIPTION:Lembrete de Missa' : '',
        exportOptions.value.setReminders ? 'END:VALARM' : '',
        'END:VEVENT'
      )
    })
  })

  lines.push('END:VCALENDAR')

  return lines.filter(line => line !== '').join('\r\n')
}

const downloadICS = async () => {
  downloading.value = true

  try {
    const icsContent = generateICS()
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `horarios-missa-${props.parishName.toLowerCase().replace(/\s+/g, '-')}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)

    const toast = useToast()
    toast.add({
      title: 'Calendário exportado!',
      description: 'O arquivo foi baixado com sucesso.',
      color: 'primary'
    })

  } catch (error) {
    console.error('Erro ao exportar calendário:', error)
    const toast = useToast()
    toast.add({
      title: 'Erro no export',
      description: 'Houve um problema ao exportar o calendário.',
      color: 'ui-dark'
    })
  } finally {
    downloading.value = false
  }
}

const copyToClipboard = async () => {
  copying.value = true

  try {
    const icsContent = generateICS()
    const dataUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`

    await navigator.clipboard.writeText(dataUrl)

    const toast = useToast()
    toast.add({
      title: 'URL copiada!',
      description: 'A URL do calendário foi copiada para a área de transferência.',
      color: 'primary'
    })

  } catch (error) {
    console.error('Erro ao copiar URL:', error)
    const toast = useToast()
    toast.add({
      title: 'Erro ao copiar',
      description: 'Houve um problema ao copiar a URL.',
      color: 'ui-dark'
    })
  } finally {
    copying.value = false
  }
}

// Utility functions
const getEndDate = (duration: string): Date => {
  const now = new Date()
  switch (duration) {
    case '3-months':
      return new Date(now.getFullYear(), now.getMonth() + 3, now.getDate())
    case '6-months':
      return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate())
    case '2-years':
      return new Date(now.getFullYear() + 2, now.getMonth(), now.getDate())
    default: // 1-year
      return new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
  }
}

const getNextOccurrence = (dayOfWeek: number, time: string): Date => {
  const now = new Date()
  const today = now.getDay()
  const targetDay = dayOfWeek

  let daysUntilTarget = targetDay - today
  if (daysUntilTarget <= 0) {
    daysUntilTarget += 7
  }

  const targetDate = new Date(now)
  targetDate.setDate(now.getDate() + daysUntilTarget)

  const [hours, minutes] = time.split(':').map(Number)
  targetDate.setHours(hours, minutes, 0, 0)

  return targetDate
}

const parseTime = (time: string): Date => {
  const [hours, minutes] = time.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date
}

const addMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60000)
}

const formatICSDateTime = (date: Date): string => {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

const formatICSDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
}
</script>

<style scoped>
.calendar-export {
  display: inline-block;
}

.export-button {
  min-width: 10rem;
}

.button-icon {
  width: 1rem;
  height: 1rem;
}

.modal-container {
  padding: 0;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-gray-200);
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);
}

.modal-content {
  padding: 1.5rem;
}

.export-info {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-primary-50);
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.info-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-primary-600);
  flex-shrink: 0;
}

.info-text {
  color: var(--color-primary-800);
  font-size: 0.875rem;
  line-height: 1.5;
}

.export-options {
  margin-bottom: 2rem;
}

.options-title {
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
}

.option-group {
  margin-bottom: 1.5rem;
}

.option-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
}

.option-checkbox {
  accent-color: var(--color-primary-600);
}

.option-text {
  color: var(--color-gray-700);
  font-size: 0.875rem;
}

.duration-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 500;
  color: var(--color-gray-700);
  margin-bottom: 0.5rem;
}

.duration-select {
  width: 100%;
  max-width: 12rem;
}

.mass-preview {
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--color-gray-50);
  border-radius: 0.5rem;
}

.preview-title {
  font-weight: 500;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.preview-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.preview-day {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.preview-day-name {
  font-weight: 500;
  color: var(--color-gray-700);
  min-width: 5rem;
  font-size: 0.875rem;
}

.preview-masses {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.preview-mass {
  background: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: var(--color-gray-600);
  border: 1px solid var(--color-gray-200);
}

.export-formats {
  margin-bottom: 2rem;
}

.formats-title {
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
}

.format-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.format-button {
  flex: 1;
  min-width: 8rem;
}

.usage-instructions {
  border-top: 1px solid var(--color-gray-200);
  padding-top: 1.5rem;
}

.instructions-title {
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
}

.instructions-tabs {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
  background: var(--color-gray-100);
  padding: 0.25rem;
  border-radius: 0.5rem;
}

.tab-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background: transparent;
  border: none;
  color: var(--color-gray-600);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-button.active {
  background: white;
  color: var(--color-primary-600);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.tab-icon {
  width: 1rem;
  height: 1rem;
}

.tab-content {
  background: var(--color-gray-50);
  padding: 1rem;
  border-radius: 0.5rem;
}

.instruction-content {
  color: var(--color-gray-700);
  font-size: 0.875rem;
}

.instruction-list {
  padding-left: 1.25rem;
  line-height: 1.6;
}

.instruction-list li {
  margin-bottom: 0.5rem;
}

/* Responsive */
@media (max-width: 640px) {
  .format-buttons {
    flex-direction: column;
  }

  .format-button {
    width: 100%;
  }

  .instructions-tabs {
    flex-wrap: wrap;
  }

  .tab-button {
    font-size: 0.75rem;
    padding: 0.5rem;
  }

  .preview-day {
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;
  }

  .preview-day-name {
    min-width: auto;
  }
}
</style>
