<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Calendário de Eventos</h3>
      
      <div class="flex gap-2">
        <button
          @click="previousMonth"
          class="p-2 text-gray-500 hover:text-gray-700"
        >
          <Icon name="heroicons:chevron-left" class="w-5 h-5" />
        </button>
        
        <div class="px-4 py-2 text-sm font-medium text-gray-700">
          {{ currentMonthYear }}
        </div>
        
        <button
          @click="nextMonth"
          class="p-2 text-gray-500 hover:text-gray-700"
        >
          <Icon name="heroicons:chevron-right" class="w-5 h-5" />
        </button>
      </div>
    </div>
    
    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-1 mb-4">
      <!-- Week Headers -->
      <div
        v-for="day in weekDays"
        :key="day"
        class="p-2 text-center text-sm font-medium text-gray-500"
      >
        {{ day }}
      </div>
      
      <!-- Calendar Days -->
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        :class="[
          'relative p-2 text-center text-sm cursor-pointer rounded transition-colors',
          day.isCurrentMonth
            ? 'text-gray-900 hover:bg-gray-50'
            : 'text-gray-400',
          day.isToday
            ? 'bg-blue-100 text-blue-900 font-semibold'
            : '',
          day.hasEvents
            ? 'font-medium'
            : ''
        ]"
        @click="selectDate(day.date)"
      >
        {{ day.day }}
        
        <!-- Event indicators -->
        <div v-if="day.events && day.events.length > 0" class="absolute bottom-1 left-1/2 transform -translate-x-1/2">
          <div class="flex gap-1">
            <div
              v-for="(event, eventIndex) in day.events.slice(0, 3)"
              :key="eventIndex"
              class="w-1.5 h-1.5 rounded-full bg-blue-600"
            />
            <div
              v-if="day.events.length > 3"
              class="text-xs text-blue-600 font-semibold"
            >
              +{{ day.events.length - 3 }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Selected Date Events -->
    <div v-if="selectedDateEvents.length > 0" class="border-t pt-4">
      <h4 class="font-medium text-gray-900 mb-3">
        Eventos em {{ formatSelectedDate(selectedDate) }}
      </h4>
      
      <div class="space-y-2">
        <div
          v-for="event in selectedDateEvents"
          :key="event.id"
          class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          @click="$emit('view-event', event)"
        >
          <div class="w-3 h-3 rounded-full bg-blue-600 flex-shrink-0" />
          
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 truncate">{{ event.title }}</p>
            <p class="text-sm text-gray-500">
              {{ formatEventTime(event.startDate, event.endDate) }} • {{ event.location }}
            </p>
          </div>
          
          <div class="text-xs text-gray-400">
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
    
    <!-- No events message -->
    <div v-else-if="selectedDate" class="border-t pt-4 text-center text-gray-500">
      <Icon name="heroicons:calendar" class="w-8 h-8 mx-auto mb-2 text-gray-300" />
      <p class="text-sm">Nenhum evento em {{ formatSelectedDate(selectedDate) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Event {
  id: string
  title: string
  startDate: string
  endDate?: string
  location: string
}

interface Props {
  events: Event[]
}

const props = defineProps<Props>()

defineEmits<{
  'select-date': [date: string]
  'view-event': [event: Event]
}>()

// Estado reativo
const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(null)

// Computed
const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric'
  })
})

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  // First day of the month
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  // Start calendar from the first Sunday of the week containing the first day
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - startDate.getDay())
  
  // End calendar at the last Saturday of the week containing the last day
  const endDate = new Date(lastDay)
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))
  
  const days = []
  const current = new Date(startDate)
  const today = new Date()
  
  while (current <= endDate) {
    const dayEvents = getEventsForDate(current)
    
    days.push({
      date: new Date(current),
      day: current.getDate(),
      isCurrentMonth: current.getMonth() === month,
      isToday: current.toDateString() === today.toDateString(),
      hasEvents: dayEvents.length > 0,
      events: dayEvents
    })
    
    current.setDate(current.getDate() + 1)
  }
  
  return days
})

const selectedDateEvents = computed(() => {
  if (!selectedDate.value) return []
  return getEventsForDate(selectedDate.value)
})

// Métodos
const getEventsForDate = (date: Date): Event[] => {
  const dateStr = date.toISOString().split('T')[0]
  
  return props.events.filter(event => {
    const eventStart = new Date(event.startDate).toISOString().split('T')[0]
    const eventEnd = event.endDate 
      ? new Date(event.endDate).toISOString().split('T')[0]
      : eventStart
    
    return dateStr >= eventStart && dateStr <= eventEnd
  })
}

const selectDate = (date: Date) => {
  selectedDate.value = date
  const dateString = date.toISOString().split('T')[0]
  // Emit for parent component to filter events
  // this.$emit('select-date', dateString)
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const formatSelectedDate = (date: Date) => {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })
}

const formatEventTime = (startDate: string, endDate?: string) => {
  const start = new Date(startDate)
  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }
  
  if (endDate) {
    const end = new Date(endDate)
    if (start.toDateString() === end.toDateString()) {
      return `${start.toLocaleTimeString('pt-BR', timeOptions)} - ${end.toLocaleTimeString('pt-BR', timeOptions)}`
    }
  }
  
  return start.toLocaleTimeString('pt-BR', timeOptions)
}

// Initialize with today
onMounted(() => {
  selectedDate.value = new Date()
})
</script>
