// User roles in the system
export type UserRole = 'ADMIN' | 'PRIEST' | 'ORGANIZER' | 'MEMBER' | 'VISITOR'

// User profile data
export interface UserProfile {
  firstName: string
  lastName: string
  avatar?: string
  phone?: string
  bio?: string
}

// Authenticated user data
export interface AuthUser {
  id: string
  email: string
  role: UserRole
  emailVerified: boolean
  profile?: UserProfile
}

// Authentication responses
export interface AuthResponse {
  user: AuthUser
  token: string
}

export interface AuthResult {
  success: boolean
  error?: string
}

// Login/Register data
export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

// Permission data
export interface Permission {
  action: string
  resource: string
  roles: UserRole[]
}
