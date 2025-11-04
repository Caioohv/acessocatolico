// Global application state management
export const useAppState = () => {
  // Loading states
  const isLoading = useState('app.loading', () => false)
  const loadingMessage = useState('app.loadingMessage', () => '')
  
  // Error states
  const globalError = useState('app.error', () => null as string | null)
  
  // Success states
  const globalSuccess = useState('app.success', () => null as string | null)
  
  // Modal states
  const activeModal = useState('app.activeModal', () => null as string | null)
  const modalData = useState('app.modalData', () => null as any)
  
  // Navigation states
  const sidebarOpen = useState('app.sidebarOpen', () => false)
  const breadcrumbs = useState('app.breadcrumbs', () => [] as Array<{ label: string; to?: string }>)
  
  // Set loading state
  const setLoading = (loading: boolean, message = '') => {
    isLoading.value = loading
    loadingMessage.value = message
  }
  
  // Set error state
  const setError = (error: string | null) => {
    globalError.value = error
    if (error) {
      // Auto clear error after 5 seconds
      setTimeout(() => {
        if (globalError.value === error) {
          globalError.value = null
        }
      }, 5000)
    }
  }
  
  // Set success state
  const setSuccess = (success: string | null) => {
    globalSuccess.value = success
    if (success) {
      // Auto clear success after 3 seconds
      setTimeout(() => {
        if (globalSuccess.value === success) {
          globalSuccess.value = null
        }
      }, 3000)
    }
  }
  
  // Modal management
  const openModal = (modalName: string, data: any = null) => {
    activeModal.value = modalName
    modalData.value = data
  }
  
  const closeModal = () => {
    activeModal.value = null
    modalData.value = null
  }
  
  // Sidebar management
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }
  
  const setSidebar = (open: boolean) => {
    sidebarOpen.value = open
  }
  
  // Breadcrumb management
  const setBreadcrumbs = (crumbs: Array<{ label: string; to?: string }>) => {
    breadcrumbs.value = crumbs
  }
  
  const addBreadcrumb = (crumb: { label: string; to?: string }) => {
    breadcrumbs.value.push(crumb)
  }
  
  const clearBreadcrumbs = () => {
    breadcrumbs.value = []
  }
  
  return {
    // States
    isLoading: readonly(isLoading),
    loadingMessage: readonly(loadingMessage),
    globalError: readonly(globalError),
    globalSuccess: readonly(globalSuccess),
    activeModal: readonly(activeModal),
    modalData: readonly(modalData),
    sidebarOpen: readonly(sidebarOpen),
    breadcrumbs: readonly(breadcrumbs),
    
    // Actions
    setLoading,
    setError,
    setSuccess,
    openModal,
    closeModal,
    toggleSidebar,
    setSidebar,
    setBreadcrumbs,
    addBreadcrumb,
    clearBreadcrumbs
  }
}
