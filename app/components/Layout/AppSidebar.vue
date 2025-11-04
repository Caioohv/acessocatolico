<template>
  <aside
    class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0"
    :class="{
      'translate-x-0': sidebarOpen,
      '-translate-x-full': !sidebarOpen
    }"
  >
    <!-- Sidebar header -->
    <div class="flex items-center justify-between h-16 px-6 border-b border-gray-200">
      <div class="flex items-center space-x-3">
        <UIcon name="i-heroicons-cross-20-solid" class="h-6 w-6 text-primary-600" />
        <h2 class="text-lg font-bold font-serif text-primary-800">
          {{ title || 'Menu' }}
        </h2>
      </div>
      <UButton
        v-if="closable"
        variant="ghost"
        size="sm"
        icon="i-heroicons-x-mark-20-solid"
        @click="setSidebar(false)"
        class="lg:hidden"
      />
    </div>

    <!-- User info (if logged in) -->
    <div v-if="user && showUserInfo" class="p-6 bg-primary-50 border-b border-primary-100">
      <div class="flex items-center space-x-3">
        <UAvatar
          :src="user.profile?.avatar"
          :alt="user.profile?.firstName"
          size="md"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">
            {{ user.profile?.firstName }} {{ user.profile?.lastName }}
          </p>
          <p class="text-xs text-gray-500 truncate">
            {{ getRoleLabel(user.role) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
      <template v-for="(section, sectionIndex) in filteredNavigation" :key="sectionIndex">
        <!-- Section title -->
        <div v-if="section.title" class="px-2 py-3">
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {{ section.title }}
          </h3>
        </div>

        <!-- Section items -->
        <template v-for="item in section.items" :key="item.name">
          <!-- Regular link -->
          <NuxtLink
            v-if="!item.children"
            :to="item.href"
            class="group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"
            :class="[
              isCurrentRoute(item.href)
                ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            ]"
            @click="handleNavClick"
          >
            <UIcon
              :name="item.icon"
              class="mr-3 flex-shrink-0 h-5 w-5"
              :class="[
                isCurrentRoute(item.href)
                  ? 'text-primary-600'
                  : 'text-gray-400 group-hover:text-gray-500'
              ]"
            />
            {{ item.name }}
            <UBadge
              v-if="item.badge"
              :label="item.badge.toString()"
              color="primary"
              class="ml-auto"
              size="xs"
            />
          </NuxtLink>

          <!-- Expandable menu -->
          <div v-else class="space-y-1">
            <button
              @click="toggleSection(item.name)"
              class="group w-full flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <UIcon
                :name="item.icon"
                class="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              />
              {{ item.name }}
              <UIcon
                :name="expandedSections.includes(item.name) ? 'i-heroicons-chevron-down-20-solid' : 'i-heroicons-chevron-right-20-solid'"
                class="ml-auto h-4 w-4"
              />
            </button>
            <div
              v-show="expandedSections.includes(item.name)"
              class="space-y-1 ml-6"
            >
              <NuxtLink
                v-for="child in item.children"
                :key="child.name"
                :to="child.href"
                class="group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"
                :class="[
                  isCurrentRoute(child.href)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                ]"
                @click="handleNavClick"
              >
                <UIcon
                  :name="child.icon"
                  class="mr-3 flex-shrink-0 h-4 w-4"
                  :class="[
                    isCurrentRoute(child.href)
                      ? 'text-primary-600'
                      : 'text-gray-400 group-hover:text-gray-500'
                  ]"
                />
                {{ child.name }}
              </NuxtLink>
            </div>
          </div>
        </template>

        <!-- Section divider -->
        <div v-if="sectionIndex < filteredNavigation.length - 1" class="my-4 border-t border-gray-200" />
      </template>
    </nav>

    <!-- Sidebar footer -->
    <div v-if="showFooter" class="flex-shrink-0 p-4 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <div class="text-xs text-gray-500">
          v{{ version }}
        </div>
        <UButton
          variant="ghost"
          size="xs"
          icon="i-heroicons-question-mark-circle-20-solid"
          @click="openHelp"
        />
      </div>
    </div>
  </aside>

  <!-- Overlay for mobile -->
  <div
    v-if="sidebarOpen && closable"
    class="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
    @click="setSidebar(false)"
  />
</template>

<script setup lang="ts">
interface NavigationItem {
  name: string
  href?: string
  icon: string
  badge?: number | string
  badgeColor?: string
  roles?: string[]
  children?: NavigationItem[]
}

interface NavigationSection {
  title?: string
  items: NavigationItem[]
}

interface Props {
  navigation?: NavigationSection[]
  title?: string
  closable?: boolean
  showUserInfo?: boolean
  showFooter?: boolean
  version?: string
}

const props = withDefaults(defineProps<Props>(), {
  navigation: () => [
    {
      title: 'Principal',
      items: [
        { name: 'Dashboard', href: '/dashboard', icon: 'i-heroicons-squares-2x2-20-solid' },
        { name: 'Paróquias', href: '/parishes', icon: 'i-heroicons-building-library-20-solid' },
        { name: 'Eventos', href: '/events', icon: 'i-heroicons-calendar-days-20-solid' },
        { name: 'Ministérios', href: '/ministries', icon: 'i-heroicons-user-group-20-solid' }
      ]
    }
  ],
  closable: true,
  showUserInfo: true,
  showFooter: true,
  version: '1.0.0'
})

// Composables
const { user } = useAuth()
const { hasMinimumRole } = usePermissions()
const { sidebarOpen, setSidebar } = useAppState()
const route = useRoute()

// State
const expandedSections = ref<string[]>([])

// Computed
const filteredNavigation = computed(() => {
  return props.navigation.map(section => ({
    ...section,
    items: section.items.filter(item => {
      if (!item.roles) return true
      if (!user.value) return false
      return item.roles.some(role => hasMinimumRole(role as any))
    })
  })).filter(section => section.items.length > 0)
})

// Methods
const isCurrentRoute = (href?: string) => {
  if (!href) return false
  if (href === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(href)
}

const handleNavClick = () => {
  // Close sidebar on mobile after navigation
  if (window.innerWidth < 1024) {
    setSidebar(false)
  }
}

const toggleSection = (sectionName: string) => {
  const index = expandedSections.value.indexOf(sectionName)
  if (index > -1) {
    expandedSections.value.splice(index, 1)
  } else {
    expandedSections.value.push(sectionName)
  }
}

const getRoleLabel = (role: string) => {
  const roleLabels: Record<string, string> = {
    'ADMIN': 'Administrador',
    'PRIEST': 'Padre',
    'ORGANIZER': 'Organizador',
    'MEMBER': 'Membro',
    'VISITOR': 'Visitante'
  }
  return roleLabels[role] || role
}

const openHelp = () => {
  // TODO: Abrir modal de ajuda ou navegar para página de ajuda
  navigateTo('/help')
}

// Auto-expand current section on mount
onMounted(() => {
  for (const section of props.navigation) {
    for (const item of section.items) {
      if (item.children) {
        const hasActiveChild = item.children.some(child => isCurrentRoute(child.href))
        if (hasActiveChild && !expandedSections.value.includes(item.name)) {
          expandedSections.value.push(item.name)
        }
      }
    }
  }
})
</script>
