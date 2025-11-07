import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { userId, level, role, bio, skills, interests } = body

    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true }
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Usuário não encontrado'
      })
    }

    // Verificar se já existe um perfil de participante
    const existingProfile = await prisma.participantProfile.findUnique({
      where: { userId }
    })

    if (existingProfile) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Perfil de participante já existe para este usuário'
      })
    }

    // Criar perfil de participante
    const participantProfile = await prisma.participantProfile.create({
      data: {
        userId,
        level: level || 'NOVICE',
        role: role || 'MEMBER',
        bio,
        skills: skills ? JSON.stringify(skills) : null,
        interests: interests ? JSON.stringify(interests) : null
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

    return participantProfile
  } catch (error) {
    console.error('Erro ao criar perfil de participante:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
