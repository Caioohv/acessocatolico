import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Verificar autenticação
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token de acesso requerido'
      })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    
    // Verificar permissões (admin ou padre)
    if (!decoded.isAdmin && !decoded.isPriest) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Acesso negado'
      })
    }

    if (getMethod(event) === 'POST') {
      // Adicionar à fila de espera
      const body = await readBody(event)
      const { eventId, userId, email, name, phone, priority = 0 } = body
      
      if (!eventId) {
        throw createError({
          statusCode: 400,
          statusMessage: 'ID do evento é obrigatório'
        })
      }

      // Verificar se evento existe e tem limite de vagas
      const eventData = await prisma.event.findUnique({
        where: { id: parseInt(eventId) },
        select: {
          id: true,
          title: true,
          maxParticipants: true,
          _count: {
            select: {
              formSubmissions: {
                where: {
                  status: 'APPROVED'
                }
              }
            }
          }
        }
      })

      if (!eventData) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Evento não encontrado'
        })
      }

      // Verificar se já está na fila
      const existingEntry = await prisma.eventWaitingList.findFirst({
        where: {
          eventId: parseInt(eventId),
          OR: [
            { userId: userId || undefined },
            { email: email || undefined }
          ]
        }
      })

      if (existingEntry) {
        throw createError({
          statusCode: 409,
          statusMessage: 'Já está na fila de espera'
        })
      }

      // Obter próxima posição na fila
      const lastPosition = await prisma.eventWaitingList.findFirst({
        where: { eventId: parseInt(eventId) },
        orderBy: { position: 'desc' },
        select: { position: true }
      })

      const newPosition = (lastPosition?.position || 0) + 1

      // Adicionar à fila
      const waitingListEntry = await prisma.eventWaitingList.create({
        data: {
          eventId: parseInt(eventId),
          userId,
          email,
          name,
          phone,
          position: newPosition,
          priority,
          addedAt: new Date()
        }
      })

      return {
        success: true,
        entry: waitingListEntry,
        position: newPosition
      }
    }

    if (getMethod(event) === 'GET') {
      // Listar fila de espera
      const { eventId } = getQuery(event)
      
      if (!eventId) {
        throw createError({
          statusCode: 400,
          statusMessage: 'ID do evento é obrigatório'
        })
      }

      const waitingList = await prisma.eventWaitingList.findMany({
        where: { eventId: parseInt(eventId as string) },
        include: {
          user: {
            select: {
              email: true
            }
          }
        },
        orderBy: [
          { priority: 'desc' },
          { position: 'asc' }
        ]
      })

      return {
        success: true,
        waitingList
      }
    }

    if (getMethod(event) === 'PUT') {
      // Promover próximo da fila (quando uma vaga abre)
      const body = await readBody(event)
      const { eventId, count = 1 } = body
      
      if (!eventId) {
        throw createError({
          statusCode: 400,
          statusMessage: 'ID do evento é obrigatório'
        })
      }

      // Buscar próximos na fila para promoção
      const nextInLine = await prisma.eventWaitingList.findMany({
        where: { eventId: parseInt(eventId) },
        include: {
          user: {
            select: {
              email: true
            }
          }
        },
        orderBy: [
          { priority: 'desc' },
          { position: 'asc' }
        ],
        take: count
      })

      if (nextInLine.length === 0) {
        return {
          success: true,
          promoted: 0,
          message: 'Nenhuma pessoa na fila de espera'
        }
      }

      // TODO: Implementar lógica de promoção automática
      // 1. Criar inscrição automática para os promovidos
      // 2. Remover da fila de espera
      // 3. Enviar notificação por email
      
      return {
        success: true,
        promoted: nextInLine.length,
        promotedUsers: nextInLine.map(entry => ({
          id: entry.id,
          name: entry.name,
          email: entry.email || entry.user?.email,
          position: entry.position
        }))
      }
    }

    if (getMethod(event) === 'DELETE') {
      // Remover da fila de espera
      const { id } = getQuery(event)
      
      if (!id) {
        throw createError({
          statusCode: 400,
          statusMessage: 'ID da entrada é obrigatório'
        })
      }

      await prisma.eventWaitingList.delete({
        where: { id: parseInt(id as string) }
      })

      return {
        success: true,
        message: 'Removido da fila de espera'
      }
    }

    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })

  } catch (error) {
    console.error('Erro na API de fila de espera:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
