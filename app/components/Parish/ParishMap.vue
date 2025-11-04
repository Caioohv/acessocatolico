<template>
  <div class="parishes-map">
    <div class="map-container">
      <!-- Map Header -->
      <div class="map-header">
        <h3 class="map-title">
          <Icon name="heroicons:map" class="title-icon" />
          Paróquias no Mapa
        </h3>
        <div class="map-controls">
          <UButton @click="locateUser" :loading="locatingUser" variant="outline" size="sm" class="locate-btn">
            <Icon name="heroicons:map-pin" class="btn-icon" />
            Minha Localização
          </UButton>
          <UButton @click="fitAllMarkers" variant="outline" size="sm" class="fit-all-btn">
            <Icon name="heroicons:globe-americas" class="btn-icon" />
            Ver Todas
          </UButton>
        </div>
      </div>

      <!-- Map -->
      <div class="map-wrapper">
        <LMap ref="map" v-model:zoom="zoom" :center="center" :options="mapOptions" class="leaflet-map"
          @ready="onMapReady">
          <!-- Tile Layer -->
          <LTileLayer :url="tileUrl" :attribution="attribution" :options="tileOptions" />

          <!-- User Location Marker -->
          <LMarker v-if="userLocation" :lat-lng="userLocation" :options="userMarkerOptions">
            <LIcon :icon-url="userIconUrl" :icon-size="[40, 40]" :icon-anchor="[20, 40]" />
            <LPopup>
              <div class="user-popup">
                <Icon name="heroicons:map-pin" class="popup-icon" />
                <span>Sua Localização</span>
              </div>
            </LPopup>
          </LMarker>

          <!-- Parish Markers -->
          <LMarker v-for="parish in parishesWithCoordinates" :key="parish.id"
            :lat-lng="[parish.latitude!, parish.longitude!]" :options="parishMarkerOptions"
            @click="selectParish(parish)">
            <LIcon :icon-url="parishIconUrl" :icon-size="[32, 32]" :icon-anchor="[16, 32]" />
            <LPopup>
              <div class="parish-popup">
                <div class="popup-header">
                  <h4 class="popup-title">{{ parish.name }}</h4>
                  <span class="popup-diocese">{{ parish.diocese.name }}</span>
                </div>
                <div class="popup-content">
                  <div class="popup-info">
                    <Icon name="heroicons:map-pin" class="info-icon" />
                    <span class="info-text">
                      {{ parish.address }}, {{ parish.city.name }} - {{ parish.state.code }}
                    </span>
                  </div>
                  <div v-if="parish.phone" class="popup-info">
                    <Icon name="heroicons:phone" class="info-icon" />
                    <span class="info-text">{{ parish.phone }}</span>
                  </div>
                  <div v-if="parish.masses.length > 0" class="popup-info">
                    <Icon name="heroicons:clock" class="info-icon" />
                    <span class="info-text">
                      {{ parish.masses.length }} horários de missa
                    </span>
                  </div>
                </div>
                <div class="popup-actions">
                  <UButton :to="`/paroquias/${parish.id}`" size="xs" variant="solid" class="view-parish-btn">
                    Ver Detalhes
                  </UButton>
                  <UButton @click="getDirections(parish)" size="xs" variant="outline" class="directions-btn">
                    <Icon name="heroicons:arrow-top-right-on-square" class="btn-icon" />
                    Rotas
                  </UButton>
                </div>
              </div>
            </LPopup>
          </LMarker>

          <!-- Selected Parish Circle -->
          <LCircle v-if="selectedParish" :lat-lng="[selectedParish.latitude, selectedParish.longitude]" :radius="500"
            :options="selectedCircleOptions" />
        </LMap>

        <!-- Loading Overlay -->
        <div v-if="loading" class="map-loading">
          <div class="loading-content">
            <Icon name="heroicons:arrow-path" class="loading-icon animate-spin" />
            <span class="loading-text">Carregando paróquias...</span>
          </div>
        </div>

        <!-- Error Overlay -->
        <div v-if="error" class="map-error">
          <div class="error-content">
            <Icon name="heroicons:exclamation-triangle" class="error-icon" />
            <span class="error-text">{{ error }}</span>
            <UButton @click="retry" size="sm" variant="outline" class="retry-btn">
              Tentar Novamente
            </UButton>
          </div>
        </div>
      </div>

      <!-- Map Legend -->
      <div class="map-legend">
        <div class="legend-item">
          <img :src="parishIconUrl" alt="Parish" class="legend-icon" />
          <span class="legend-text">Paróquias</span>
        </div>
        <div v-if="userLocation" class="legend-item">
          <img :src="userIconUrl" alt="User" class="legend-icon" />
          <span class="legend-text">Sua Localização</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Parish {
  id: string
  name: string
  latitude?: number | null
  longitude?: number | null
  address: string
  phone?: string | null
  city: { name: string }
  state: { code: string }
  diocese: { name: string }
  masses: any[]
}

interface Props {
  parishes: Parish[]
  loading?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: ''
})

// Refs
const map = ref()
const zoom = ref(10)
const center = ref([-15.7942, -47.8822]) // Brasília as default
const userLocation = ref<[number, number] | null>(null)
const selectedParish = ref<Parish | null>(null)
const locatingUser = ref(false)

// Map configuration
const mapOptions = {
  zoomControl: true,
  attributionControl: true,
  scrollWheelZoom: true,
  doubleClickZoom: true,
  boxZoom: true,
  keyboard: true,
  dragging: true,
  touchZoom: true
}

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const tileOptions = {
  maxZoom: 18,
  minZoom: 5
}

// Marker options
const parishMarkerOptions = {
  riseOnHover: true,
  riseOffset: 250
}

const userMarkerOptions = {
  riseOnHover: true,
  riseOffset: 500
}

const selectedCircleOptions = {
  color: '#8B5A2B',
  fillColor: '#F59E0B',
  fillOpacity: 0.2,
  weight: 2
}

// Icon URLs (using emoji data URLs for simplicity)
const parishIconUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTUiIGZpbGw9IiM4QjVBMkIiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjx0ZXh0IHg9IjE2IiB5PSIyMSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7ijJs8L3RleHQ+Cjwvc3ZnPgo='

const userIconUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTkiIGZpbGw9IiMzQjgyRjYiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjx0ZXh0IHg9IjIwIiB5PSIyNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5GOPC90ZXh0Pgo8L3N2Zz4K'

// Computed
const parishesWithCoordinates = computed(() => {
  return props.parishes.filter(parish => parish.latitude && parish.longitude)
})

// Emits
const emit = defineEmits<{
  parishSelected: [parish: Parish]
  retry: []
}>()

// Methods
const onMapReady = () => {
  console.log('Map is ready')
  if (props.parishes.length > 0) {
    fitAllMarkers()
  }
}

const locateUser = async () => {
  if (!process.client) return

  locatingUser.value = true

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      })
    })

    const { latitude, longitude } = position.coords
    userLocation.value = [latitude, longitude]
    center.value = [latitude, longitude]
    zoom.value = 12

    // Find nearest parishes
    findNearestParishes(latitude, longitude)

  } catch (error) {
    console.error('Geolocation error:', error)
    const toast = useToast()
    toast.add({
      title: 'Erro de Localização',
      description: 'Não foi possível obter sua localização. Verifique as permissões do navegador.',
      color: 'secondary'
    })
  } finally {
    locatingUser.value = false
  }
}

const findNearestParishes = (lat: number, lng: number) => {
  const nearby = props.parishes
    .filter(parish => parish.latitude && parish.longitude)
    .map(parish => ({
      ...parish,
      distance: calculateDistance(lat, lng, parish.latitude!, parish.longitude!)
    }))
    .filter(parish => parish.distance <= 50) // 50km radius
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 10)

  if (nearby.length > 0) {
    const toast = useToast()
    toast.add({
      title: 'Paróquias Próximas',
      description: `Encontradas ${nearby.length} paróquias num raio de 50km`,
      color: 'primary'
    })
  }
}

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

const fitAllMarkers = () => {
  if (!map.value || props.parishes.length === 0) return

  const bounds = []

  // Add parish coordinates
  for (const parish of parishesWithCoordinates.value) {
    bounds.push([parish.latitude!, parish.longitude!])
  }

  // Add user location if available
  if (userLocation.value) {
    bounds.push(userLocation.value)
  }

  if (bounds.length > 0) {
    map.value.leafletObject.fitBounds(bounds, { padding: [20, 20] })
  }
}

const selectParish = (parish: Parish) => {
  if (!parish.latitude || !parish.longitude) return

  selectedParish.value = parish
  center.value = [parish.latitude, parish.longitude]
  zoom.value = 14
  emit('parishSelected', parish)
}

const getDirections = (parish: Parish) => {
  if (!parish.latitude || !parish.longitude) return

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${parish.latitude},${parish.longitude}&travelmode=driving`
  window.open(googleMapsUrl, '_blank')
}

const retry = () => {
  emit('retry')
}

// Watch for parishes changes
watch(() => props.parishes, (newParishes) => {
  if (newParishes.length > 0 && map.value) {
    nextTick(() => {
      fitAllMarkers()
    })
  }
}, { deep: true })

// Auto-locate user on mount (optional)
onMounted(() => {
  // Uncomment to auto-locate user on component mount
  // setTimeout(() => locateUser(), 1000)
})
</script>

<style scoped>
.parishes-map {
  width: 100%;
  height: 100%;
}

.map-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid;
  border-color: var(--color-gray-200);
  overflow: hidden;
}

.map-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid;
  border-color: var(--color-gray-200);
  background-color: var(--color-gray-50);
}

.map-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-gray-900);
  font-family: var(--font-heading);
}

.title-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-primary-500);
}

.map-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon {
  width: 1rem;
  height: 1rem;
}

.map-wrapper {
  position: relative;
  height: 400px;
}

.leaflet-map {
  width: 100%;
  height: 100%;
}

.map-loading,
.map-error {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1000;
}

.loading-content,
.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.loading-icon,
.error-icon {
  width: 2rem;
  height: 2rem;
}

.loading-icon {
  color: var(--color-primary-500);
}

.error-icon {
  color: var(--color-red-500);
}

.loading-text,
.error-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-700);
}

.map-legend {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-top: 1px solid;
  border-color: var(--color-gray-200);
  background-color: var(--color-gray-50);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-icon {
  width: 1rem;
  height: 1rem;
}

.legend-text {
  font-size: 0.75rem;
  color: var(--color-gray-600);
}

/* Popup Styles */
.parish-popup {
  min-width: 0;
  max-width: 280px;
}

.popup-header {
  margin-bottom: 0.75rem;
}

.popup-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-gray-900);
  font-family: var(--font-heading);
}

.popup-diocese {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
}

.popup-content {
  margin-bottom: 0.75rem;
}

.popup-content>*+* {
  margin-top: 0.5rem;
}

.popup-info {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.info-icon {
  width: 1rem;
  height: 1rem;
  margin-top: 0.125rem;
  flex-shrink: 0;
  color: var(--color-gray-500);
}

.info-text {
  font-size: 0.875rem;
  color: var(--color-gray-700);
}

.popup-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-popup {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.popup-icon {
  width: 1rem;
  height: 1rem;
  color: var(--color-blue-500);
}
</style>
