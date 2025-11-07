import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { 
      participantId, 
      type, 
      referenceId, 
      referenceName, 
      hoursParticipated, 
      pointsEarned 
    } = body

    // Validações básicas
    if (!participantId || !type || !referenceId || !referenceName) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Campos obrigatórios: participantId, type, referenceId, referenceName'
      })
    }

    // Verificar se o participante existe
    const participant = await prisma.participantProfile.findUnique({
      where: { id: participantId }
    })

    if (!participant) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Participante não encontrado'
      })
    }

    // Registrar histórico
    const history = await prisma.participationHistory.create({
      data: {
        participantId,
        type,
        referenceId,
        referenceName,
        hoursParticipated: hoursParticipated || 0,
        pointsEarned: pointsEarned || 0,
        participatedAt: new Date()
      }
    })

    // Atualizar estatísticas do participante
    await prisma.participantProfile.update({
      where: { id: participantId },
      data: {
        totalEvents: type === 'event' ? { increment: 1 } : undefined,
        totalHours: hoursParticipated ? { increment: hoursParticipated } : undefined,
        points: pointsEarned ? { increment: pointsEarned } : undefined,
        lastActivity: new Date()
      }
    })

    return history
  } catch (error) {
    console.error('Erro ao registrar histórico:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
