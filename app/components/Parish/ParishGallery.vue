<template>
  <div class="parish-gallery">
    <div v-if="photos.length === 0" class="gallery-empty">
      <Icon name="heroicons:photo" class="empty-icon" />
      <p class="empty-text">Nenhuma foto disponível</p>
    </div>

    <div v-else class="gallery-grid">
      <div v-for="(photo, index) in photos" :key="photo.id" class="gallery-item" @click="openLightbox(index)">
        <NuxtImg :src="photo.url" :alt="photo.alt || 'Foto da paróquia'" class="gallery-image" :placeholder="true"
          loading="lazy" format="webp" quality="80" sizes="sm:100vw md:50vw lg:33vw" />
        <div class="gallery-overlay">
          <Icon name="heroicons:magnifying-glass-plus" class="overlay-icon" />
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <UModal v-model="lightboxOpen" class="lightbox-modal">
      <div class="lightbox-container">
        <div class="lightbox-header">
          <h3 class="lightbox-title">
            {{ currentPhoto?.title || 'Foto da paróquia' }}
          </h3>
          <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="closeLightbox" />
        </div>

        <div class="lightbox-content">
          <NuxtImg v-if="currentPhoto" :src="currentPhoto.url" :alt="currentPhoto.alt || 'Foto da paróquia'"
            class="lightbox-image" format="webp" quality="90" placeholder />

          <!-- Navigation -->
          <div v-if="photos.length > 1" class="lightbox-nav">
            <UButton :disabled="currentIndex === 0" color="neutral" variant="soft"
              icon="i-heroicons-chevron-left-20-solid" @click="previousPhoto" class="nav-button" />
            <span class="nav-counter">
              {{ currentIndex + 1 }} / {{ photos.length }}
            </span>
            <UButton :disabled="currentIndex === photos.length - 1" color="neutral" variant="soft"
              icon="i-heroicons-chevron-right-20-solid" @click="nextPhoto" class="nav-button" />
          </div>
        </div>

        <div v-if="currentPhoto?.description" class="lightbox-footer">
          <p class="photo-description">{{ currentPhoto.description }}</p>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
interface ParishPhoto {
  id: string
  url: string
  alt?: string
  title?: string
  description?: string
  order: number
}

interface Props {
  photos: ParishPhoto[]
}

const props = withDefaults(defineProps<Props>(), {
  photos: () => []
})

// Lightbox state
const lightboxOpen = ref(false)
const currentIndex = ref(0)

// Computed
const currentPhoto = computed(() => {
  return props.photos[currentIndex.value] || null
})

// Methods
const openLightbox = (index: number) => {
  currentIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const nextPhoto = () => {
  if (currentIndex.value < props.photos.length - 1) {
    currentIndex.value++
  }
}

const previousPhoto = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (!lightboxOpen.value) return

  switch (event.key) {
    case 'ArrowLeft':
      previousPhoto()
      break
    case 'ArrowRight':
      nextPhoto()
      break
    case 'Escape':
      closeLightbox()
      break
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.parish-gallery {
  width: 100%;
}

.gallery-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: var(--color-gray-500);
}

.empty-icon {
  width: 3rem;
  height: 3rem;
  margin-bottom: 1rem;
}

.empty-text {
  font-size: 1rem;
  text-align: center;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.gallery-item {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.gallery-item:hover {
  transform: scale(1.02);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.2s ease;
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.overlay-icon {
  width: 2rem;
  height: 2rem;
  color: white;
}

.lightbox-container {
  padding: 0;
}

.lightbox-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--color-gray-200);
}

.lightbox-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-gray-900);
}

.lightbox-content {
  position: relative;
  padding: 1rem;
}

.lightbox-image {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 0.5rem;
}

.lightbox-nav {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  backdrop-filter: blur(8px);
}

.nav-button {
  width: 2.5rem;
  height: 2.5rem;
}

.nav-counter {
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

.lightbox-footer {
  padding: 1rem;
  border-top: 1px solid var(--color-gray-200);
}

.photo-description {
  color: var(--color-gray-600);
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 640px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .gallery-item {
    aspect-ratio: 1;
  }

  .lightbox-nav {
    bottom: 0.5rem;
    padding: 0.25rem 0.75rem;
  }

  .nav-button {
    width: 2rem;
    height: 2rem;
  }

  .nav-counter {
    font-size: 0.75rem;
  }
}
</style>
