import { PrismaClient } from '@prisma/client'
import { createError, defineEventHandler, getHeader, getRouterParam, readBody } from 'h3'
import * as jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const eventId = getRouterParam(event, 'id')
    if (!eventId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID do evento é obrigatório'
      })
    }

    if (event.node.req.method === 'GET') {
      // Get comments
      const comments = await prisma.eventComment.findMany({
        where: { eventId },
        include: {
          user: {
            include: {
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                  avatar: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      // Transform comments to include user name
      const transformedComments = comments.map(comment => ({
        ...comment,
        user: {
          id: comment.user.id,
          name: comment.user.profile 
            ? `${comment.user.profile.firstName} ${comment.user.profile.lastName}`.trim()
            : comment.user.email.split('@')[0],
          avatar: comment.user.profile?.avatar || null
        }
      }))

      return {
        success: true,
        data: transformedComments
      }
    }

    if (event.node.req.method === 'POST') {
      // Add comment - requires authentication
      const authHeader = getHeader(event, 'authorization')
      if (!authHeader?.startsWith('Bearer ')) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Token de autenticação necessário'
        })
      }

      const token = authHeader.substring(7)
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as any
      
      const user = await prisma.user.findUnique({
        where: { id: payload.userId }
      })

      if (!user) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Usuário não encontrado'
        })
      }

      const body = await readBody(event)
      const { content } = body

      if (!content || content.trim().length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Conteúdo do comentário é obrigatório'
        })
      }

      // Verify event exists
      const eventRecord = await prisma.event.findUnique({
        where: { id: eventId }
      })

      if (!eventRecord) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Evento não encontrado'
        })
      }

      // Create comment
      const comment = await prisma.eventComment.create({
        data: {
          content: content.trim(),
          eventId,
          userId: user.id
        },
        include: {
          user: {
            include: {
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                  avatar: true
                }
              }
            }
          }
        }
      })

      // Transform comment to include user name
      const transformedComment = {
        ...comment,
        user: {
          id: comment.user.id,
          name: comment.user.profile 
            ? `${comment.user.profile.firstName} ${comment.user.profile.lastName}`.trim()
            : comment.user.email.split('@')[0],
          avatar: comment.user.profile?.avatar || null
        }
      }

      return {
        success: true,
        message: 'Comentário adicionado com sucesso!',
        data: transformedComment
      }
    }

    throw createError({
      statusCode: 405,
      statusMessage: 'Método não permitido'
    })

  } catch (error: any) {
    console.error('Error in event comments:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
