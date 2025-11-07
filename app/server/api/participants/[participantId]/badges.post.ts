import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { participantId, badgeId, awardedBy, reason } = body

    // Validações básicas
    if (!participantId || !badgeId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID do participante e badge são obrigatórios'
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

    // Verificar se o badge existe
    const badge = await prisma.badge.findUnique({
      where: { id: badgeId }
    })

    if (!badge) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Badge não encontrado'
      })
    }

    // Verificar se o participante já tem este badge
    const existingBadge = await prisma.participantBadge.findFirst({
      where: {
        participantId,
        badgeId
      }
    })

    if (existingBadge) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Participante já possui este badge'
      })
    }

    // Atribuir badge
    const participantBadge = await prisma.participantBadge.create({
      data: {
        participantId,
        badgeId,
        awardedBy,
        reason
      },
      include: {
        badge: true,
        participant: {
          include: {
            user: {
              include: {
                profile: true
              }
            }
          }
        }
      }
    })

    // Atualizar contadores
    await Promise.all([
      prisma.badge.update({
        where: { id: badgeId },
        data: {
          totalAwarded: {
            increment: 1
          }
        }
      }),
      prisma.participantProfile.update({
        where: { id: participantId },
        data: {
          points: {
            increment: 10 // Pontos por badge recebido
          }
        }
      })
    ])

    return participantBadge
  } catch (error) {
    console.error('Erro ao atribuir badge:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
