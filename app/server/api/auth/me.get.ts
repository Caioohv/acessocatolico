import jsonwebtoken from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Get token from cookie
    const token = getCookie(event, 'auth-token')
    
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token não encontrado'
      })
    }

    // Verify JWT token
    const config = useRuntimeConfig()
    const decoded = jsonwebtoken.verify(token, config.jwtSecret) as any

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        profile: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
            phone: true,
            bio: true,
            level: true
          }
        }
      }
    })

    if (!user || !user.isActive) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Usuário não encontrado ou inativo'
      })
    }

    // Return user data (without password)
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
      profile: user.profile
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 401,
      statusMessage: 'Token inválido'
    })
  }
})
