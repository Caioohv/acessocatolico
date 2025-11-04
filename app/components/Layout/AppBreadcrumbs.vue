<template>
  <nav v-if="items.length > 0" class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-2">
      <li v-for="(item, index) in items" :key="index">
        <div class="flex items-center">
          <!-- Separator (except for first item) -->
          <UIcon
            v-if="index > 0"
            name="i-heroicons-chevron-right-20-solid"
            class="flex-shrink-0 h-4 w-4 text-gray-400 mr-2"
          />
          
          <!-- Home icon for first item if it's home -->
          <UIcon
            v-if="index === 0 && item.to === '/'"
            name="i-heroicons-home-20-solid"
            class="flex-shrink-0 h-4 w-4 text-gray-400 mr-1"
          />
          
          <!-- Breadcrumb item -->
          <NuxtLink
            v-if="item.to && index < items.length - 1"
            :to="item.to"
            class="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
          
          <!-- Current page (not clickable) -->
          <span
            v-else
            class="text-sm font-medium text-gray-900"
            :class="{ 'ml-1': index === 0 && item.to === '/' }"
          >
            {{ item.label }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
}

interface Props {
  items?: BreadcrumbItem[]
  autoGenerate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  autoGenerate: false
})

const route = useRoute()
const { breadcrumbs } = useAppState()

// Computed breadcrumbs
const items = computed(() => {
  // If items are explicitly provided, use them
  if (props.items.length > 0) {
    return props.items
  }
  
  // If auto-generate is enabled, generate from route
  if (props.autoGenerate) {
    return generateBreadcrumbsFromRoute()
  }
  
  // Use global breadcrumbs from app state
  return breadcrumbs.value
})

// Generate breadcrumbs from current route
const generateBreadcrumbsFromRoute = (): BreadcrumbItem[] => {
  const pathSegments = route.path.split('/').filter(segment => segment)
  const breadcrumbs: BreadcrumbItem[] = []
  
  // Always start with home
  breadcrumbs.push({ label: 'Início', to: '/' })
  
  // Build breadcrumbs from path segments
  let currentPath = ''
  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i]
    currentPath += `/${segment}`
    
    // Generate human-readable labels
    const label = generateLabelFromSegment(segment)
    
    // Last segment is current page (no link)
    if (i === pathSegments.length - 1) {
      breadcrumbs.push({ label })
    } else {
      breadcrumbs.push({ label, to: currentPath })
    }
  }
  
  return breadcrumbs
}

// Convert URL segment to human-readable label
const generateLabelFromSegment = (segment: string): string => {
  // Handle special cases
  const specialLabels: Record<string, string> = {
    'parishes': 'Paróquias',
    'events': 'Eventos',
    'ministries': 'Ministérios',
    'dashboard': 'Dashboard',
    'admin': 'Administração',
    'profile': 'Perfil',
    'settings': 'Configurações',
    'help': 'Ajuda',
    'about': 'Sobre',
    'contact': 'Contato',
    'login': 'Entrar',
    'register': 'Cadastrar',
    'forgot-password': 'Esqueci a Senha',
    'reset-password': 'Redefinir Senha'
  }
  
  if (specialLabels[segment]) {
    return specialLabels[segment]
  }
  
  // Convert kebab-case to Title Case
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>
