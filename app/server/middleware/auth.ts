import jsonwebtoken from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // Only apply to protected API routes
  if (!event.node.req.url?.startsWith('/api/protected/')) {
    return
  }

  try {
    // Get token from cookie or Authorization header
    let token = getCookie(event, 'auth-token')
    
    if (!token) {
      const authHeader = getHeader(event, 'authorization')
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7)
      }
    }

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
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true
      }
    })

    if (!user || !user.isActive) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Usuário não encontrado ou inativo'
      })
    }

    // Add user to event context
    event.context.user = user
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
