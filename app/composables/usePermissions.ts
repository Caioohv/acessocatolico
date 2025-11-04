import type { UserRole } from '~/types/auth'

// Permission system for role-based access control
export const usePermissions = () => {
  const { user } = useAuth()
  
  // Role hierarchy levels - higher numbers have more permissions
  const roleHierarchy: Record<UserRole, number> = {
    'ADMIN': 100,
    'PRIEST': 80,
    'ORGANIZER': 60,
    'MEMBER': 40,
    'VISITOR': 20
  }
  
  // Check if user has required role or higher
  const hasMinimumRole = (requiredRole: UserRole): boolean => {
    if (!user.value) return false
    
    const userLevel = roleHierarchy[user.value.role] || 0
    const requiredLevel = roleHierarchy[requiredRole] || 0
    
    return userLevel >= requiredLevel
  }
  
  // Check if user has exact role
  const hasExactRole = (role: UserRole): boolean => {
    return user.value?.role === role
  }
  
  // Check if user has any of the specified roles
  const hasAnyRole = (roles: UserRole[]): boolean => {
    if (!user.value) return false
    return roles.includes(user.value.role)
  }
  
  // Check if user can access parish management
  const canAccessParishManagement = computed(() => {
    return hasMinimumRole('PRIEST')
  })
  
  // Check if user can create/manage events
  const canManageEvents = computed(() => {
    return hasMinimumRole('ORGANIZER')
  })
  
  // Check if user can manage ministries
  const canManageMinistries = computed(() => {
    return hasMinimumRole('ORGANIZER')
  })
  
  // Check if user can access admin panel
  const canAccessAdmin = computed(() => {
    return hasExactRole('ADMIN')
  })
  
  // Check if user can manage other users
  const canManageUsers = computed(() => {
    return hasMinimumRole('PRIEST')
  })
  
  // Check if user can approve registrations
  const canApproveRegistrations = computed(() => {
    return hasMinimumRole('PRIEST')
  })
  
  return {
    hasMinimumRole,
    hasExactRole,
    hasAnyRole,
    canAccessParishManagement,
    canManageEvents,
    canManageMinistries,
    canAccessAdmin,
    canManageUsers,
    canApproveRegistrations,
    roleHierarchy
  }
}
