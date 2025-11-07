import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Critérios para promoção automática
const PROMOTION_CRITERIA = {
  NOVICE: {
    toSERVANT: {
      totalEvents: 5,
      totalHours: 20,
      points: 50
    }
  },
  SERVANT: {
    toLEADER: {
      totalEvents: 15,
      totalHours: 80,
      points: 200,
      badgesRequired: 3
    }
  }
}

export default defineEventHandler(async (event) => {
  try {
    const participantId = getRouterParam(event, 'participantId')

    if (!participantId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID do participante é obrigatório'
      })
    }

    // Buscar perfil do participante
    const participant = await prisma.participantProfile.findUnique({
      where: { id: participantId },
      include: {
        badges: true,
        user: {
          include: {
            profile: true
          }
        }
      }
    })

    if (!participant) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Participante não encontrado'
      })
    }

    let promoted = false
    let newLevel = participant.level
    let promotionReason = ''

    // Verificar critérios para promoção
    if (participant.level === 'NOVICE') {
      const criteria = PROMOTION_CRITERIA.NOVICE.toSERVANT
      if (
        participant.totalEvents >= criteria.totalEvents &&
        participant.totalHours >= criteria.totalHours &&
        participant.points >= criteria.points
      ) {
        newLevel = 'SERVANT'
        promoted = true
        promotionReason = `Promovido a Servo por completar ${participant.totalEvents} eventos, ${participant.totalHours} horas de participação e ${participant.points} pontos.`
      }
    } else if (participant.level === 'SERVANT') {
      const criteria = PROMOTION_CRITERIA.SERVANT.toLEADER
      if (
        participant.totalEvents >= criteria.totalEvents &&
        participant.totalHours >= criteria.totalHours &&
        participant.points >= criteria.points &&
        participant.badges.length >= criteria.badgesRequired
      ) {
        newLevel = 'LEADER'
        promoted = true
        promotionReason = `Promovido a Líder por completar ${participant.totalEvents} eventos, ${participant.totalHours} horas de participação, ${participant.points} pontos e ${participant.badges.length} badges.`
      }
    }

    if (promoted) {
      // Atualizar nível do participante
      const updatedParticipant = await prisma.participantProfile.update({
        where: { id: participantId },
        data: {
          level: newLevel,
          points: {
            increment: 50 // Bonus por promoção
          }
        },
        include: {
          user: {
            include: {
              profile: true
            }
          },
          badges: {
            include: {
              badge: true
            }
          }
        }
      })

      // Registrar no histórico
      await prisma.participationHistory.create({
        data: {
          participantId,
          type: 'promotion',
          referenceId: participantId,
          referenceName: `Promoção para ${newLevel}`,
          pointsEarned: 50,
          participatedAt: new Date()
        }
      })

      return {
        success: true,
        promoted: true,
        previousLevel: participant.level,
        newLevel,
        reason: promotionReason,
        participant: updatedParticipant
      }
    }

    return {
      success: true,
      promoted: false,
      currentLevel: participant.level,
      message: 'Participante não atende aos critérios para promoção no momento'
    }
  } catch (error) {
    console.error('Erro ao verificar promoção:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
