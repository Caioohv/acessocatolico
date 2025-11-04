import { u as useAuth } from './useAuth-Dq4ZNIKa.mjs';
import { computed } from 'vue';

const usePermissions = () => {
  const { user } = useAuth();
  const roleHierarchy = {
    "ADMIN": 100,
    "PRIEST": 80,
    "ORGANIZER": 60,
    "MEMBER": 40,
    "VISITOR": 20
  };
  const hasMinimumRole = (requiredRole) => {
    if (!user.value) return false;
    const userLevel = roleHierarchy[user.value.role] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;
    return userLevel >= requiredLevel;
  };
  const hasExactRole = (role) => {
    var _a;
    return ((_a = user.value) == null ? void 0 : _a.role) === role;
  };
  const hasAnyRole = (roles) => {
    if (!user.value) return false;
    return roles.includes(user.value.role);
  };
  const canAccessParishManagement = computed(() => {
    return hasMinimumRole("PRIEST");
  });
  const canManageEvents = computed(() => {
    return hasMinimumRole("ORGANIZER");
  });
  const canManageMinistries = computed(() => {
    return hasMinimumRole("ORGANIZER");
  });
  const canAccessAdmin = computed(() => {
    return hasExactRole("ADMIN");
  });
  const canManageUsers = computed(() => {
    return hasMinimumRole("PRIEST");
  });
  const canApproveRegistrations = computed(() => {
    return hasMinimumRole("PRIEST");
  });
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
  };
};

export { usePermissions as u };
//# sourceMappingURL=usePermissions-CQah5Vn6.mjs.map
