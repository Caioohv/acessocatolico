interface ParticipantProfile {
  id: string
  userId: string
  level: 'NOVICE' | 'SERVANT' | 'LEADER'
  role: 'MEMBER' | 'SERVANT' | 'LEADER' | 'MINISTRY_HEAD'
  totalEvents: number
  totalHours: number
  joinedAt: string
  lastActivity: string
  points: number
  rank?: number
  bio?: string
  skills?: string[]
  interests?: string[]
  user: {
    id: string
    email: string
    profile?: {
      firstName: string
      lastName: string
      avatar?: string
    }
  }
  badges: ParticipantBadge[]
  ministryMembers: MinistryMember[]
}

interface Badge {
  id: string
  name: string
  description: string
  type: 'PARTICIPATION' | 'ACHIEVEMENT' | 'LEADERSHIP' | 'SERVICE' | 'SPECIAL'
  iconUrl?: string
  color: string
  criteria: Record<string, any>
  isActive: boolean
  isAutoAwarded: boolean
  totalAwarded: number
}

interface ParticipantBadge {
  id: string
  participantId: string
  badgeId: string
  awardedAt: string
  awardedBy?: string
  reason?: string
  badge: Badge
}

interface MinistryMember {
  id: string
  ministryId: string
  userId: string
  participantId?: string
  role: string
  participantRole: 'MEMBER' | 'SERVANT' | 'LEADER' | 'MINISTRY_HEAD'
  isActive: boolean
  joinedAt: string
  leftAt?: string
  ministry: {
    id: string
    name: string
    description?: string
  }
}

interface ParticipationHistory {
  id: string
  participantId: string
  type: string
  referenceId: string
  referenceName: string
  hoursParticipated?: number
  pointsEarned: number
  participatedAt: string
}

interface Ministry {
  id: string
  name: string
  description?: string
  isActive: boolean
  requiresApproval: boolean
  minLevel: 'NOVICE' | 'SERVANT' | 'LEADER'
  parishId: string
  leaderId?: string
  parish: {
    id: string
    name: string
  }
  leader?: {
    id: string
    email: string
    profile?: {
      firstName: string
      lastName: string
    }
  }
  members: MinistryMember[]
  services: Service[]
  _count: {
    members: number
    services: number
    assignments: number
  }
}

interface Service {
  id: string
  ministryId: string
  name: string
  description: string
  requiredLevel: 'NOVICE' | 'SERVANT' | 'LEADER'
  requiredSkills?: string[]
  maxAssignments?: number
  isActive: boolean
  duration?: number
}

export const useParticipants = () => {
  const { $api } = useNuxtApp()

  // Estados reativas
  const participants = ref<ParticipantProfile[]>([])
  const badges = ref<Badge[]>([])
  const ministries = ref<Ministry[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Buscar perfis de participantes
  const fetchParticipants = async (options: {
    page?: number
    limit?: number
    level?: string
    role?: string
    search?: string
  } = {}) => {
    try {
      loading.value = true
      error.value = null
      
      const query = new URLSearchParams()
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined) {
          query.append(key, String(value))
        }
      })
      
      const response = await $fetch<{
        data: ParticipantProfile[]
        pagination: any
      }>(`/api/participants/profiles?${query}`)
      
      participants.value = response.data
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Erro ao buscar participantes'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Criar perfil de participante
  const createParticipantProfile = async (data: {
    userId: string
    level?: string
    role?: string
    bio?: string
    skills?: string[]
    interests?: string[]
  }) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await $fetch<ParticipantProfile>('/api/participants/profiles', {
        method: 'POST',
        body: data
      })
      
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Erro ao criar perfil'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Buscar badges
  const fetchBadges = async (options: {
    page?: number
    limit?: number
    type?: string
    isActive?: boolean
  } = {}) => {
    try {
      loading.value = true
      error.value = null
      
      const query = new URLSearchParams()
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined) {
          query.append(key, String(value))
        }
      })
      
      const response = await $fetch<{
        data: Badge[]
        pagination: any
      }>(`/api/badges?${query}`)
      
      badges.value = response.data
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Erro ao buscar badges'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Criar badge
  const createBadge = async (data: {
    name: string
    description: string
    type: string
    iconUrl?: string
    color?: string
    criteria?: Record<string, any>
    isAutoAwarded?: boolean
  }) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await $fetch<Badge>('/api/badges', {
        method: 'POST',
        body: data
      })
      
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Erro ao criar badge'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Atribuir badge a participante
  const awardBadge = async (participantId: string, data: {
    badgeId: string
    awardedBy?: string
    reason?: string
  }) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await $fetch<ParticipantBadge>(`/api/participants/${participantId}/badges`, {
        method: 'POST',
        body: data
      })
      
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Erro ao atribuir badge'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Promover participante
  const promoteParticipant = async (participantId: string) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await $fetch(`/api/participants/${participantId}/promote`, {
        method: 'POST'
      })
      
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Erro ao promover participante'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Buscar ministérios
  const fetchMinistries = async (options: {
    parishId?: string
    isActive?: boolean
    hasLeader?: boolean
    minLevel?: string
  } = {}) => {
    try {
      loading.value = true
      error.value = null
      
      const query = new URLSearchParams()
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined) {
          query.append(key, String(value))
        }
      })
      
      const response = await $fetch<Ministry[]>(`/api/ministries?${query}`)
      
      ministries.value = response
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Erro ao buscar ministérios'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Registrar participação
  const recordParticipation = async (data: {
    participantId: string
    type: string
    referenceId: string
    referenceName: string
    hoursParticipated?: number
    pointsEarned?: number
  }) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await $fetch<ParticipationHistory>('/api/participants/history', {
        method: 'POST',
        body: data
      })
      
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Erro ao registrar participação'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Utilitários
  const getLevelLabel = (level: string) => {
    const labels = {
      'NOVICE': 'Novato',
      'SERVANT': 'Servo',
      'LEADER': 'Líder'
    }
    return labels[level as keyof typeof labels] || level
  }

  const getRoleLabel = (role: string) => {
    const labels = {
      'MEMBER': 'Membro',
      'SERVANT': 'Servo',
      'LEADER': 'Líder',
      'MINISTRY_HEAD': 'Responsável de Ministério'
    }
    return labels[role as keyof typeof labels] || role
  }

  const getBadgeTypeLabel = (type: string) => {
    const labels = {
      'PARTICIPATION': 'Participação',
      'ACHIEVEMENT': 'Conquista',
      'LEADERSHIP': 'Liderança',
      'SERVICE': 'Serviço',
      'SPECIAL': 'Especial'
    }
    return labels[type as keyof typeof labels] || type
  }

  return {
    // Estados
    participants: readonly(participants),
    badges: readonly(badges),
    ministries: readonly(ministries),
    loading: readonly(loading),
    error: readonly(error),

    // Métodos
    fetchParticipants,
    createParticipantProfile,
    fetchBadges,
    createBadge,
    awardBadge,
    promoteParticipant,
    fetchMinistries,
    recordParticipation,

    // Utilitários
    getLevelLabel,
    getRoleLabel,
    getBadgeTypeLabel
  }
}
