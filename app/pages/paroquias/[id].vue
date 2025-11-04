<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <LoadingSpinner class="loading-spinner" />
      <p class="loading-text">Carregando detalhes da paróquia...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !parish" class="error-container">
      <Icon name="heroicons:exclamation-triangle" class="error-icon" />
      <h1 class="error-title">Paróquia não encontrada</h1>
      <p class="error-message">
        {{ error || 'A paróquia solicitada não foi encontrada ou não existe.' }}
      </p>
      <div class="error-actions">
        <CatholicButton
          @click="$router.go(-1)"
          variant="secondary"
          size="md"
        >
          <Icon name="heroicons:arrow-left" class="button-icon" />
          Voltar
        </CatholicButton>
        <CatholicButton
          @click="$router.push('/paroquias')"
          variant="primary"
          size="md"
        >
          <Icon name="heroicons:building-library" class="button-icon" />
          Ver todas as paróquias
        </CatholicButton>
      </div>
    </div>

    <!-- Parish Details -->
    <div v-else class="parish-details">
      <!-- Hero Section -->
      <div class="parish-hero">
        <div class="hero-background">
          <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
          <div class="container mx-auto px-4 py-12">
            <div class="hero-main">
              <div class="hero-badge">
                <Icon name="heroicons:building-library" class="badge-icon" />
                {{ parish.diocese.name }}
              </div>
              <h1 class="hero-title">{{ parish.name }}</h1>
              <div class="hero-location">
                <Icon name="heroicons:map-pin" class="location-icon" />
                <span class="location-text">
                  {{ parish.address }} - {{ parish.city.name }}, {{ parish.state.code }}
                  <span v-if="parish.neighborhood"> ({{ parish.neighborhood.name }})</span>
                </span>
              </div>
              <p v-if="parish.description" class="hero-description">
                {{ parish.description }}
              </p>
            </div>
            
            <!-- Quick Contact -->
            <div class="hero-contact">
              <div v-if="parish.phone" class="contact-item">
                <a :href="`tel:${parish.phone}`" class="contact-link">
                  <Icon name="heroicons:phone" class="contact-icon" />
                  {{ parish.phone }}
                </a>
              </div>
              <div v-if="parish.email" class="contact-item">
                <a :href="`mailto:${parish.email}`" class="contact-link">
                  <Icon name="heroicons:envelope" class="contact-icon" />
                  {{ parish.email }}
                </a>
              </div>
              <div v-if="parish.website" class="contact-item">
                <a :href="parish.website" target="_blank" rel="noopener noreferrer" class="contact-link">
                  <Icon name="heroicons:globe-alt" class="contact-icon" />
                  Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="parish-content">
        <div class="container mx-auto px-4 py-8">
          <div class="content-grid">
            <!-- Main Info -->
            <div class="main-column">
              <!-- Priests Section -->
              <section v-if="parish.priests.length > 0" class="content-section">
                <h2 class="section-title">
                  <Icon name="heroicons:user" class="section-icon" />
                  Equipe Paroquial
                </h2>
                <div class="priests-grid">
                  <div 
                    v-for="priest in parish.priests" 
                    :key="priest.id"
                    class="priest-card"
                  >
                    <div class="priest-avatar">
                      <img 
                        v-if="priest.user.profile.avatar"
                        :src="priest.user.profile.avatar"
                        :alt="`${priest.user.profile.firstName} ${priest.user.profile.lastName}`"
                        class="avatar-image"
                      />
                      <Icon v-else name="heroicons:user" class="avatar-icon" />
                    </div>
                    <div class="priest-info">
                      <h3 class="priest-name">
                        {{ priest.user.profile.firstName }} {{ priest.user.profile.lastName }}
                      </h3>
                      <span class="priest-role">
                        {{ priest.isMain ? 'Pároco' : 'Vigário Paroquial' }}
                      </span>
                      <p v-if="priest.user.profile.bio" class="priest-bio">
                        {{ priest.user.profile.bio }}
                      </p>
                      <div v-if="priest.user.profile.phone" class="priest-contact">
                        <Icon name="heroicons:phone" class="contact-icon" />
                        <a :href="`tel:${priest.user.profile.phone}`" class="contact-text">
                          {{ priest.user.profile.phone }}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Mass Schedule -->
              <section v-if="massScheduleData && Object.keys(massScheduleData).length > 0" class="content-section">
                <h2 class="section-title">
                  <Icon name="heroicons:clock" class="section-icon" />
                  Horários de Missa
                </h2>
                <div class="mass-schedule">
                  <div 
                    v-for="(masses, dayOfWeek) in massScheduleData" 
                    :key="dayOfWeek"
                    class="schedule-day"
                  >
                    <h3 class="day-name">{{ getDayName(Number(dayOfWeek)) }}</h3>
                    <div class="day-masses">
                      <div 
                        v-for="(mass, index) in masses" 
                        :key="index"
                        class="mass-item"
                      >
                        <span class="mass-time">{{ mass.time }}</span>
                        <div class="mass-details">
                          <span class="mass-type">{{ getMassTypeName(mass.type) }}</span>
                          <span v-if="mass.description" class="mass-description">
                            {{ mass.description }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Upcoming Events -->
              <section v-if="parish.events && parish.events.length > 0" class="content-section">
                <h2 class="section-title">
                  <Icon name="heroicons:calendar-days" class="section-icon" />
                  Próximos Eventos
                </h2>
                <div class="events-list">
                  <div 
                    v-for="event in parish.events" 
                    :key="event.id"
                    class="event-card"
                  >
                    <div class="event-date">
                      <span class="event-day">{{ formatEventDay(event.startDate) }}</span>
                      <span class="event-month">{{ formatEventMonth(event.startDate) }}</span>
                    </div>
                    <div class="event-info">
                      <h3 class="event-title">{{ event.title }}</h3>
                      <p v-if="event.description" class="event-description">
                        {{ truncateText(event.description, 100) }}
                      </p>
                      <div class="event-meta">
                        <span class="event-time">
                          <Icon name="heroicons:clock" class="meta-icon" />
                          {{ formatEventTime(event.startDate) }}
                        </span>
                        <span v-if="event.location" class="event-location">
                          <Icon name="heroicons:map-pin" class="meta-icon" />
                          {{ event.location }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Ministries -->
              <section v-if="parish.ministries && parish.ministries.length > 0" class="content-section">
                <h2 class="section-title">
                  <Icon name="heroicons:user-group" class="section-icon" />
                  Ministérios e Pastorais
                </h2>
                <div class="ministries-grid">
                  <div 
                    v-for="ministry in parish.ministries" 
                    :key="ministry.id"
                    class="ministry-card"
                  >
                    <div class="ministry-header">
                      <h3 class="ministry-name">{{ ministry.name }}</h3>
                      <span class="ministry-members">
                        {{ ministry._count.members }} 
                        {{ ministry._count.members === 1 ? 'membro' : 'membros' }}
                      </span>
                    </div>
                    <p v-if="ministry.description" class="ministry-description">
                      {{ ministry.description }}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <!-- Sidebar -->
            <aside class="sidebar-column">
              <!-- Contact Info -->
              <div class="sidebar-card">
                <h3 class="sidebar-title">
                  <Icon name="heroicons:phone" class="sidebar-icon" />
                  Contato
                </h3>
                <div class="contact-list">
                  <div v-if="parish.phone" class="contact-item">
                    <Icon name="heroicons:phone" class="contact-icon" />
                    <a :href="`tel:${parish.phone}`" class="contact-text">
                      {{ parish.phone }}
                    </a>
                  </div>
                  <div v-if="parish.email" class="contact-item">
                    <Icon name="heroicons:envelope" class="contact-icon" />
                    <a :href="`mailto:${parish.email}`" class="contact-text">
                      {{ parish.email }}
                    </a>
                  </div>
                  <div v-if="parish.website" class="contact-item">
                    <Icon name="heroicons:globe-alt" class="contact-icon" />
                    <a :href="parish.website" target="_blank" rel="noopener noreferrer" class="contact-text">
                      Website
                    </a>
                  </div>
                  <div class="contact-item">
                    <Icon name="heroicons:map-pin" class="contact-icon" />
                    <span class="contact-text">
                      {{ parish.address }}<br>
                      {{ parish.city.name }}, {{ parish.state.code }}
                      <span v-if="parish.neighborhood"> - {{ parish.neighborhood.name }}</span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Social Media -->
              <div v-if="socialContacts.length > 0" class="sidebar-card">
                <h3 class="sidebar-title">
                  <Icon name="heroicons:share" class="sidebar-icon" />
                  Redes Sociais
                </h3>
                <div class="social-list">
                  <a 
                    v-for="contact in socialContacts" 
                    :key="contact.id"
                    :href="getSocialUrl(contact)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-link"
                  >
                    <Icon :name="getSocialIcon(contact.type)" class="social-icon" />
                    <span class="social-name">{{ getSocialTitle(contact.type) }}</span>
                  </a>
                </div>
              </div>

              <!-- Quick Stats -->
              <div class="sidebar-card">
                <h3 class="sidebar-title">
                  <Icon name="heroicons:chart-bar" class="sidebar-icon" />
                  Informações
                </h3>
                <div class="stats-list">
                  <div class="stat-item">
                    <Icon name="heroicons:calendar-days" class="stat-icon" />
                    <span class="stat-text">
                      {{ parish._count.events }} 
                      {{ parish._count.events === 1 ? 'evento' : 'eventos' }}
                    </span>
                  </div>
                  <div class="stat-item">
                    <Icon name="heroicons:user-group" class="stat-icon" />
                    <span class="stat-text">
                      {{ parish._count.ministries }} 
                      {{ parish._count.ministries === 1 ? 'ministério' : 'ministérios' }}
                    </span>
                  </div>
                  <div class="stat-item">
                    <Icon name="heroicons:building-library" class="stat-icon" />
                    <span class="stat-text">{{ parish.diocese.name }}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO and meta
definePageMeta({
  layout: 'default'
})

// Route params
const route = useRoute()
const parishId = route.params.id as string

// Composables
const { loadParish, getMassSchedule, getDayName } = useParishes()

// State
const parish = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Computed properties
const socialContacts = computed(() => {
  if (!parish.value) return []
  return parish.value.contacts.filter(contact => 
    ['facebook', 'instagram', 'whatsapp', 'youtube', 'twitter'].includes(contact.type)
  )
})

const massScheduleData = computed(() => {
  if (!parish.value || !parish.value.masses) return {}
  return getMassSchedule(parish.value.masses)
})

// Utility functions
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

const getMassTypeName = (type: string) => {
  const types: Record<string, string> = {
    normal: 'Missa',
    children: 'Missa das Crianças',
    youth: 'Missa dos Jovens',
    healing: 'Missa da Cura',
    special: 'Missa Especial'
  }
  return types[type] || 'Missa'
}

const formatEventDay = (date: string) => {
  return new Date(date).getDate().toString().padStart(2, '0')
}

const formatEventMonth = (date: string) => {
  const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
  return months[new Date(date).getMonth()]
}

const formatEventTime = (date: string) => {
  return new Date(date).toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const getSocialUrl = (contact: { type: string; value: string }) => {
  switch (contact.type) {
    case 'facebook':
      return contact.value.startsWith('http') ? contact.value : `https://facebook.com/${contact.value}`
    case 'instagram':
      return contact.value.startsWith('http') ? contact.value : `https://instagram.com/${contact.value.replace('@', '')}`
    case 'whatsapp':
      return `https://wa.me/${contact.value.replace(/\D/g, '')}`
    case 'youtube':
      return contact.value.startsWith('http') ? contact.value : `https://youtube.com/@${contact.value}`
    case 'twitter':
      return contact.value.startsWith('http') ? contact.value : `https://twitter.com/${contact.value.replace('@', '')}`
    default:
      return contact.value
  }
}

const getSocialIcon = (type: string) => {
  const icons: Record<string, string> = {
    facebook: 'simple-icons:facebook',
    instagram: 'simple-icons:instagram',
    whatsapp: 'simple-icons:whatsapp',
    youtube: 'simple-icons:youtube',
    twitter: 'simple-icons:twitter'
  }
  return icons[type] || 'heroicons:link'
}

const getSocialTitle = (type: string) => {
  const titles: Record<string, string> = {
    facebook: 'Facebook',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
    youtube: 'YouTube',
    twitter: 'Twitter'
  }
  return titles[type] || 'Link'
}

// Load parish data
onMounted(async () => {
  try {
    parish.value = await loadParish(parishId)
    
    // Set SEO meta
    useSeoMeta({
      title: `${parish.value.name} - AcessoCatólico`,
      ogTitle: `${parish.value.name} - AcessoCatólico`,
      description: parish.value.description || `Paróquia ${parish.value.name} em ${parish.value.city.name}, ${parish.value.state.code}. Horários de missa, eventos e contato.`,
      ogDescription: parish.value.description || `Paróquia ${parish.value.name} em ${parish.value.city.name}, ${parish.value.state.code}. Horários de missa, eventos e contato.`,
      ogImage: '/og-parish.jpg'
    })
    
  } catch (err: any) {
    error.value = err.message || 'Erro ao carregar paróquia'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.loading-container,
.error-container {
  @apply flex flex-col items-center justify-center min-h-screen text-center px-4;
}

.loading-spinner {
  @apply w-8 h-8 mb-4;
}

.loading-text {
  @apply text-lg;
  color: var(--color-gray-600);
}

.error-icon {
  @apply w-16 h-16 mb-4;
  color: var(--color-red-500);
}

.error-title {
  @apply text-2xl font-bold mb-2;
  color: var(--color-gray-900);
  font-family: var(--font-heading);
}

.error-message {
  @apply text-lg mb-6 max-w-lg;
  color: var(--color-gray-600);
}

.error-actions {
  @apply flex flex-wrap gap-4 justify-center;
}

.button-icon {
  @apply w-4 h-4;
}

/* Hero Section */
.parish-hero {
  @apply relative overflow-hidden;
  min-height: 400px;
}

.hero-background {
  @apply absolute inset-0;
  background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-secondary-600) 100%);
}

.hero-overlay {
  @apply absolute inset-0;
  background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%);
}

.hero-content {
  @apply relative z-10;
}

.hero-main {
  @apply text-center lg:text-left mb-8;
}

.hero-badge {
  @apply inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
}

.badge-icon {
  @apply w-4 h-4;
}

.hero-title {
  @apply text-3xl lg:text-5xl font-bold mb-4;
  color: white;
  font-family: var(--font-heading);
}

.hero-location {
  @apply flex items-center justify-center lg:justify-start gap-2 mb-4;
}

.location-icon {
  @apply w-5 h-5;
  color: rgba(255, 255, 255, 0.8);
}

.location-text {
  @apply text-lg;
  color: rgba(255, 255, 255, 0.9);
}

.hero-description {
  @apply text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0;
  color: rgba(255, 255, 255, 0.9);
}

.hero-contact {
  @apply flex flex-wrap justify-center lg:justify-start gap-4;
}

.contact-item {
  @apply flex items-center;
}

.contact-link {
  @apply flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
}

.contact-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.contact-icon {
  @apply w-4 h-4;
}

/* Main Content */
.parish-content {
  @apply bg-gray-50;
}

.content-grid {
  @apply grid grid-cols-1 lg:grid-cols-3 gap-8;
}

.main-column {
  @apply lg:col-span-2 space-y-8;
}

.sidebar-column {
  @apply lg:col-span-1 space-y-6;
}

.content-section {
  @apply bg-white rounded-lg shadow-sm p-6;
  border: 1px solid var(--color-gray-200);
}

.section-title {
  @apply flex items-center gap-3 text-xl font-semibold mb-6;
  color: var(--color-gray-900);
  font-family: var(--font-heading);
}

.section-icon {
  @apply w-5 h-5;
  color: var(--color-primary-500);
}

/* Priests */
.priests-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}

.priest-card {
  @apply flex gap-4 p-4 rounded-lg;
  background-color: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
}

.priest-avatar {
  @apply flex-shrink-0 w-16 h-16 rounded-full overflow-hidden;
  background-color: var(--color-gray-300);
}

.avatar-image {
  @apply w-full h-full object-cover;
}

.avatar-icon {
  @apply w-full h-full p-4;
  color: var(--color-gray-500);
}

.priest-info {
  @apply flex-1 min-w-0;
}

.priest-name {
  @apply text-lg font-semibold mb-1;
  color: var(--color-gray-900);
  font-family: var(--font-heading);
}

.priest-role {
  @apply text-sm font-medium px-2 py-1 rounded-full mb-2;
  background-color: var(--color-secondary-100);
  color: var(--color-secondary-700);
}

.priest-bio {
  @apply text-sm mb-2;
  color: var(--color-gray-600);
}

.priest-contact {
  @apply flex items-center gap-2;
}

.contact-text {
  @apply text-sm;
  color: var(--color-gray-700);
}

/* Mass Schedule */
.mass-schedule {
  @apply space-y-4;
}

.schedule-day {
  @apply border rounded-lg p-4;
  border-color: var(--color-gray-200);
}

.day-name {
  @apply text-lg font-semibold mb-3;
  color: var(--color-gray-900);
  font-family: var(--font-heading);
}

.day-masses {
  @apply space-y-2;
}

.mass-item {
  @apply flex items-center gap-4;
}

.mass-time {
  @apply text-lg font-mono font-semibold;
  color: var(--color-primary-600);
  min-width: 60px;
}

.mass-details {
  @apply flex-1;
}

.mass-type {
  @apply text-sm font-medium;
  color: var(--color-gray-900);
}

.mass-description {
  @apply text-sm block;
  color: var(--color-gray-600);
}

/* Events */
.events-list {
  @apply space-y-4;
}

.event-card {
  @apply flex gap-4 p-4 rounded-lg border;
  border-color: var(--color-gray-200);
  background-color: var(--color-gray-50);
}

.event-date {
  @apply flex-shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center;
  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-500) 100%);
  color: white;
}

.event-day {
  @apply text-lg font-bold leading-none;
}

.event-month {
  @apply text-xs font-medium;
}

.event-info {
  @apply flex-1 min-w-0;
}

.event-title {
  @apply text-lg font-semibold mb-2;
  color: var(--color-gray-900);
  font-family: var(--font-heading);
}

.event-description {
  @apply text-sm mb-2;
  color: var(--color-gray-600);
}

.event-meta {
  @apply flex flex-wrap gap-4 text-sm;
  color: var(--color-gray-500);
}

.meta-icon {
  @apply w-4 h-4;
}

/* Ministries */
.ministries-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-4;
}

.ministry-card {
  @apply p-4 rounded-lg border;
  border-color: var(--color-gray-200);
  background-color: var(--color-gray-50);
}

.ministry-header {
  @apply flex items-center justify-between mb-2;
}

.ministry-name {
  @apply font-semibold;
  color: var(--color-gray-900);
  font-family: var(--font-heading);
}

.ministry-members {
  @apply text-sm px-2 py-1 rounded-full;
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
}

.ministry-description {
  @apply text-sm;
  color: var(--color-gray-600);
}

/* Sidebar */
.sidebar-card {
  @apply bg-white rounded-lg shadow-sm p-6;
  border: 1px solid var(--color-gray-200);
}

.sidebar-title {
  @apply flex items-center gap-3 text-lg font-semibold mb-4;
  color: var(--color-gray-900);
  font-family: var(--font-heading);
}

.sidebar-icon {
  @apply w-5 h-5;
  color: var(--color-primary-500);
}

.contact-list,
.stats-list {
  @apply space-y-3;
}

.stat-item {
  @apply flex items-center gap-3;
}

.stat-icon {
  @apply w-4 h-4;
  color: var(--color-gray-500);
}

.stat-text {
  @apply text-sm;
  color: var(--color-gray-700);
}

.social-list {
  @apply space-y-3;
}

.social-link {
  @apply flex items-center gap-3 p-3 rounded-lg transition-colors duration-200;
  background-color: var(--color-gray-50);
}

.social-link:hover {
  background-color: var(--color-primary-50);
}

.social-icon {
  @apply w-5 h-5;
  color: var(--color-gray-600);
}

.social-link:hover .social-icon {
  color: var(--color-primary-600);
}

.social-name {
  @apply text-sm font-medium;
  color: var(--color-gray-700);
}

.social-link:hover .social-name {
  color: var(--color-primary-700);
}
</style>
