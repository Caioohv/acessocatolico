<template>
  <div class="parish-card">
    <div class="parish-card__header">
      <div class="parish-card__image">
        <Icon name="heroicons:building-library" class="parish-card__icon" />
      </div>
      <div class="parish-card__badge">
        <span class="parish-card__diocese">{{ parish.diocese.name }}</span>
      </div>
    </div>

    <div class="parish-card__content">
      <h3 class="parish-card__name">{{ parish.name }}</h3>
      
      <div class="parish-card__location">
        <Icon name="heroicons:map-pin" class="parish-card__location-icon" />
        <span class="parish-card__location-text">
          {{ parish.city.name }}, {{ parish.state.code }}
          <span v-if="parish.neighborhood"> - {{ parish.neighborhood.name }}</span>
        </span>
      </div>

      <p v-if="parish.description" class="parish-card__description">
        {{ truncateText(parish.description, 120) }}
      </p>

      <div class="parish-card__stats">
        <div class="stat">
          <Icon name="heroicons:calendar-days" class="stat__icon" />
          <span class="stat__value">{{ parish._count.events }}</span>
          <span class="stat__label">Eventos</span>
        </div>
        <div class="stat">
          <Icon name="heroicons:user-group" class="stat__icon" />
          <span class="stat__value">{{ parish._count.ministries }}</span>
          <span class="stat__label">Ministérios</span>
        </div>
      </div>

      <div v-if="mainPriest" class="parish-card__priest">
        <Icon name="heroicons:user" class="priest__icon" />
        <span class="priest__name">
          {{ mainPriest.user.profile.firstName }} {{ mainPriest.user.profile.lastName }}
        </span>
        <span class="priest__role">Pároco</span>
      </div>

      <div class="parish-card__contact">
        <div v-if="parish.phone" class="contact-item">
          <Icon name="heroicons:phone" class="contact-item__icon" />
          <span class="contact-item__text">{{ parish.phone }}</span>
        </div>
        <div v-if="parish.email" class="contact-item">
          <Icon name="heroicons:envelope" class="contact-item__icon" />
          <span class="contact-item__text">{{ parish.email }}</span>
        </div>
      </div>

      <div class="parish-card__social">
        <a 
          v-for="contact in socialContacts" 
          :key="contact.id"
          :href="getSocialUrl(contact)"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          :title="getSocialTitle(contact.type)"
        >
          <Icon :name="getSocialIcon(contact.type)" class="social-link__icon" />
        </a>
      </div>
    </div>

    <div class="parish-card__footer">
      <NuxtLink 
        :to="`/paroquias/${parish.id}`" 
        class="parish-card__button"
      >
        <span>Ver Detalhes</span>
        <Icon name="heroicons:arrow-right" class="button__icon" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ParishCardProps {
  parish: {
    id: string
    name: string
    address: string
    description?: string | null
    phone?: string | null
    email?: string | null
    state: { name: string; code: string }
    city: { name: string }
    neighborhood?: { name: string } | null
    diocese: { name: string }
    priests: Array<{
      id: string
      isMain: boolean
      user: {
        id: string
        profile: {
          firstName: string
          lastName: string
        }
      }
    }>
    contacts: Array<{
      id: string
      type: string
      value: string
    }>
    _count: {
      events: number
      ministries: number
    }
  }
}

const props = defineProps<ParishCardProps>()

// Computed properties
const mainPriest = computed(() => {
  return props.parish.priests.find(priest => priest.isMain)
})

const socialContacts = computed(() => {
  return props.parish.contacts.filter(contact => 
    ['facebook', 'instagram', 'whatsapp', 'youtube', 'twitter'].includes(contact.type)
  )
})

// Utility functions
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
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
</script>

<!-- 
<style scoped>
.parish-card {
  @apply bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1;
  border: 1px solid var(--color-gray-200);
}

.parish-card__header {
  @apply relative p-6 pb-4;
  background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-secondary-50) 100%);
}

.parish-card__image {
  @apply flex items-center justify-center w-16 h-16 rounded-full mb-3;
  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-500) 100%);
}

.parish-card__icon {
  @apply w-8 h-8 text-white;
}

.parish-card__badge {
  @apply absolute top-4 right-4;
}

.parish-card__diocese {
  @apply text-xs font-medium px-2 py-1 rounded-full;
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
}

.parish-card__content {
  @apply p-6 pt-0;
}

.parish-card__name {
  @apply text-xl font-bold mb-2;
  color: var(--color-gray-900);
  font-family: var(--font-heading);
}

.parish-card__location {
  @apply flex items-center gap-2 mb-3;
}

.parish-card__location-icon {
  @apply w-4 h-4;
  color: var(--color-primary-500);
}

.parish-card__location-text {
  @apply text-sm;
  color: var(--color-gray-600);
}

.parish-card__description {
  @apply text-sm leading-relaxed mb-4;
  color: var(--color-gray-700);
}

.parish-card__stats {
  @apply flex gap-4 mb-4 pb-4 border-b;
  border-color: var(--color-gray-200);
}

.stat {
  @apply flex items-center gap-2;
}

.stat__icon {
  @apply w-4 h-4;
  color: var(--color-primary-500);
}

.stat__value {
  @apply font-semibold text-sm;
  color: var(--color-gray-900);
}

.stat__label {
  @apply text-xs;
  color: var(--color-gray-600);
}

.parish-card__priest {
  @apply flex items-center gap-2 mb-4;
}

.priest__icon {
  @apply w-4 h-4;
  color: var(--color-secondary-500);
}

.priest__name {
  @apply text-sm font-medium;
  color: var(--color-gray-900);
}

.priest__role {
  @apply text-xs px-2 py-1 rounded-full;
  background-color: var(--color-secondary-100);
  color: var(--color-secondary-700);
}

.parish-card__contact {
  @apply space-y-2 mb-4;
}

.contact-item {
  @apply flex items-center gap-2;
}

.contact-item__icon {
  @apply w-4 h-4;
  color: var(--color-gray-500);
}

.contact-item__text {
  @apply text-sm;
  color: var(--color-gray-700);
}

.parish-card__social {
  @apply flex gap-2 mb-6;
}

.social-link {
  @apply w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200;
  background-color: var(--color-gray-100);
}

.social-link:hover {
  background-color: var(--color-primary-100);
}

.social-link__icon {
  @apply w-4 h-4;
  color: var(--color-gray-600);
}

.social-link:hover .social-link__icon {
  color: var(--color-primary-600);
}

.parish-card__footer {
  @apply px-6 pb-6;
}

.parish-card__button {
  @apply w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200;
  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-500) 100%);
  color: white;
}

.parish-card__button:hover {
  background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-secondary-600) 100%);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.button__icon {
  @apply w-4 h-4 transition-transform duration-200;
}

.parish-card__button:hover .button__icon {
  transform: translateX(2px);
}
</style>
-->
