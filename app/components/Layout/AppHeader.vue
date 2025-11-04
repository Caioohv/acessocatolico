<template>
  <header class="bg-white shadow-lg border-b border-primary-100 sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="flex items-center justify-between h-16">
        <!-- Logo e Brand -->
        <div class="flex items-center space-x-4">
          <!-- Mobile menu button -->
          <button
            v-if="showMobileMenu"
            @click="toggleSidebar"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-primary-600 hover:text-primary-700 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            aria-controls="mobile-menu"
            :aria-expanded="sidebarOpen"
          >
            <span class="sr-only">Abrir menu principal</span>
            <UIcon 
              :name="sidebarOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" 
              class="h-6 w-6" 
            />
          </button>

          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <UIcon name="i-heroicons-cross-20-solid" class="h-8 w-8 text-primary-600" />
            </div>
            <div class="hidden sm:block">
              <h1 class="text-xl font-bold font-serif text-primary-800">
                AcessoCatólico
              </h1>
              <p class="text-xs text-gray-500 -mt-1">Unidos na fé</p>
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex lg:items-center lg:space-x-8">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-primary-600 bg-primary-50': isCurrentRoute(item.href) }"
          >
            <UIcon :name="item.icon" class="h-4 w-4 inline mr-2" />
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- Right side -->
        <div class="flex items-center space-x-4">
          <!-- Search (opcional) -->
          <div v-if="showSearch" class="hidden md:block">
            <div class="relative">
              <UInput
                v-model="searchQuery"
                placeholder="Buscar paróquias..."
                icon="i-heroicons-magnifying-glass-20-solid"
                class="w-64"
                @keyup.enter="handleSearch"
              />
            </div>
          </div>

          <!-- Notifications (se logado) -->
          <div v-if="user" class="relative">
            <UButton
              variant="ghost"
              size="sm"
              icon="i-heroicons-bell-20-solid"
              :badge="unreadNotifications"
              @click="toggleNotifications"
            />
          </div>

          <!-- User menu -->
          <div v-if="user" class="relative">
            <UDropdown :items="userMenuItems" :ui="{ wrapper: 'relative inline-block text-left' }">
              <UButton variant="ghost" size="sm" class="flex items-center space-x-2">
                <UAvatar
                  :src="user.profile?.avatar"
                  :alt="user.profile?.firstName"
                  size="sm"
                />
                <span class="hidden md:block text-sm font-medium text-gray-700">
                  {{ user.profile?.firstName }}
                </span>
                <UIcon name="i-heroicons-chevron-down-20-solid" class="h-4 w-4" />
              </UButton>
            </UDropdown>
          </div>

          <!-- Login/Register (se não logado) -->
          <div v-else class="flex items-center space-x-3">
            <NuxtLink to="/login">
              <UButton variant="ghost" size="sm">
                Entrar
              </UButton>
            </NuxtLink>
            <NuxtLink to="/register">
              <UButton size="sm">
                Cadastrar
              </UButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div v-if="showMobileMenu && sidebarOpen" class="lg:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
          :class="{ 'text-primary-600 bg-primary-50': isCurrentRoute(item.href) }"
          @click="setSidebar(false)"
        >
          <UIcon :name="item.icon" class="h-5 w-5 inline mr-3" />
          {{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface NavigationItem {
  name: string
  href: string
  icon: string
  roles?: string[]
}

interface Props {
  navigation?: NavigationItem[]
  showMobileMenu?: boolean
  showSearch?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  navigation: () => [
    { name: 'Início', href: '/', icon: 'i-heroicons-home-20-solid' },
    { name: 'Paróquias', href: '/paroquias', icon: 'i-heroicons-building-library-20-solid' },
    { name: 'Eventos', href: '/events', icon: 'i-heroicons-calendar-days-20-solid' },
    { name: 'Ministérios', href: '/ministries', icon: 'i-heroicons-user-group-20-solid' }
  ],
  showMobileMenu: true,
  showSearch: false
})

// Composables
const { user, logout } = useAuth()
const { hasMinimumRole } = usePermissions()
const { sidebarOpen, setSidebar, toggleSidebar } = useAppState()
const route = useRoute()

// State
const searchQuery = ref('')
const unreadNotifications = ref(0)

// Computed
const userMenuItems = computed(() => {
  const items = [
    [{
      label: 'Meu Perfil',
      icon: 'i-heroicons-user-circle-20-solid',
      click: () => navigateTo('/profile')
    }]
  ]

  if (hasMinimumRole('ORGANIZER')) {
    items[0].push({
      label: 'Dashboard',
      icon: 'i-heroicons-squares-2x2-20-solid',
      click: () => navigateTo('/dashboard')
    })
  }

  if (hasMinimumRole('PRIEST')) {
    items[0].push({
      label: 'Painel do Padre',
      icon: 'i-heroicons-building-library-20-solid',
      click: () => navigateTo('/dashboard/priest')
    })
  }

  if (hasMinimumRole('ADMIN')) {
    items[0].push({
      label: 'Administração',
      icon: 'i-heroicons-cog-6-tooth-20-solid',
      click: () => navigateTo('/admin')
    })
  }

  items.push([{
    label: 'Sair',
    icon: 'i-heroicons-arrow-right-on-rectangle-20-solid',
    click: async () => {
      await logout()
      await navigateTo('/')
    }
  }])

  return items
})

// Methods
const isCurrentRoute = (href: string) => {
  if (href === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(href)
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  }
}

const toggleNotifications = () => {
  // TODO: Implementar painel de notificações
  console.log('Toggle notifications')
}

// Filter navigation based on user roles
const filteredNavigation = computed(() => {
  return props.navigation.filter(item => {
    if (!item.roles) return true
    if (!user.value) return false
    return item.roles.some(role => hasMinimumRole(role as any))
  })
})
</script>
