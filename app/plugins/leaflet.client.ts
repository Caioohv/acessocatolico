export default defineNuxtPlugin(() => {
  // Only run on client side
  if (process.client) {
    // Import Leaflet dynamically
    import('leaflet/dist/leaflet.css')
  }
})
