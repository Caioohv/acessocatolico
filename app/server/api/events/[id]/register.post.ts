import { PrismaClient } from '@prisma/client'
import { createError, defineEventHandler, getHeader, getRouterParam } from 'h3'
import * as jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Verificar autenticação
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

    const eventId = getRouterParam(event, 'id')
    if (!eventId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID do evento é obrigatório'
      })
    }

    if (event.node.req.method === 'POST') {
      // Register for event
      const eventRecord = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
          _count: {
            select: { registrations: true }
          }
        }
      })

      if (!eventRecord) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Evento não encontrado'
        })
      }

      // Check if already registered
      const existingRegistration = await prisma.eventRegistration.findUnique({
        where: {
          eventId_userId: {
            eventId,
            userId: user.id
          }
        }
      })

      if (existingRegistration) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Você já está inscrito neste evento'
        })
      }

      // Check if registration is open
      const now = new Date()
      if (eventRecord.registrationStart && now < eventRecord.registrationStart) {
        throw createError({
          statusCode: 400,
          statusMessage: 'As inscrições ainda não foram abertas'
        })
      }

      if (eventRecord.registrationEnd && now > eventRecord.registrationEnd) {
        throw createError({
          statusCode: 400,
          statusMessage: 'As inscrições foram encerradas'
        })
      }

      // Check capacity
      if (eventRecord.maxParticipants && eventRecord._count.registrations >= eventRecord.maxParticipants) {
        throw createError({
          statusCode: 400,
          statusMessage: 'O evento atingiu o limite de participantes'
        })
      }

      // Create registration
      const registration = await prisma.eventRegistration.create({
        data: {
          eventId,
          userId: user.id,
          status: eventRecord.requiresApproval ? 'PENDING' : 'CONFIRMED',
          createdAt: new Date()
        },
        include: {
          event: {
            select: {
              title: true,
              startDate: true
            }
          }
        }
      })

      return {
        success: true,
        message: eventRecord.requiresApproval 
          ? 'Inscrição realizada! Aguarde a aprovação do organizador.'
          : 'Inscrição realizada com sucesso!',
        data: registration
      }
    }

    // If GET method, return registration status
    const registration = await prisma.eventRegistration.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId: user.id
        }
      }
    })

    return {
      success: true,
      data: registration
    }

  } catch (error: any) {
    console.error('Error in event registration:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
