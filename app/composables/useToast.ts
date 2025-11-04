export interface ToastAction {
  label: string
  handler: () => void
}

export interface ToastItem {
  id: string
  show: boolean
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  closable?: boolean
  showProgress?: boolean
  action?: ToastAction
}

export interface ToastOptions {
  title?: string
  duration?: number
  closable?: boolean
  showProgress?: boolean
  action?: ToastAction
}

export const useToast = () => {
  const toasts = useState<ToastItem[]>('toasts', () => [])

  const addToast = (toast: Omit<ToastItem, 'id' | 'show'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: ToastItem = {
      ...toast,
      id,
      show: true,
      duration: toast.duration ?? 5000,
      closable: toast.closable ?? true,
      showProgress: toast.showProgress ?? true
    }
    
    toasts.value.push(newToast)
    
    // Auto remove after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration + 300) // Extra time for animation
    }
    
    return id
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      // Hide first (for animation)
      toasts.value[index].show = false
      // Remove after animation
      setTimeout(() => {
        const currentIndex = toasts.value.findIndex(toast => toast.id === id)
        if (currentIndex > -1) {
          toasts.value.splice(currentIndex, 1)
        }
      }, 300)
    }
  }

  const clearAllToasts = () => {
    toasts.value.forEach(toast => {
      toast.show = false
    })
    setTimeout(() => {
      toasts.value.splice(0)
    }, 300)
  }

  // Convenience methods
  const success = (message: string, options?: ToastOptions) => {
    return addToast({
      type: 'success',
      message,
      ...options
    })
  }

  const error = (message: string, options?: ToastOptions) => {
    return addToast({
      type: 'error',
      message,
      duration: options?.duration ?? 8000, // Longer for errors
      ...options
    })
  }

  const warning = (message: string, options?: ToastOptions) => {
    return addToast({
      type: 'warning',
      message,
      ...options
    })
  }

  const info = (message: string, options?: ToastOptions) => {
    return addToast({
      type: 'info',
      message,
      ...options
    })
  }

  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info
  }
}
