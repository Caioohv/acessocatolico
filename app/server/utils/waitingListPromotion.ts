import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Promove automaticamente participantes da fila de espera quando vagas ficam disponíveis
 */
export async function promoteFromWaitingList(eventId: string, availableSlots: number = 1) {
  try {
    console.log(`[WaitingList] Processando promoção automática para evento ${eventId}, ${availableSlots} vagas disponíveis`)

    // Buscar participantes na fila de espera ordenados por prioridade e data de adição
    const waitingListEntries = await prisma.eventWaitingList.findMany({
      where: {
        eventId,
        isActive: true,
        promotedAt: null // Ainda não promovidos
      },
      include: {
        user: {
          include: {
            profile: true
          }
        },
        event: {
          include: {
            form: true
          }
        }
      },
      orderBy: [
        { priority: 'desc' }, // Maior prioridade primeiro
        { joinedAt: 'asc' }   // Mais antigo primeiro em caso de empate
      ],
      take: availableSlots
    })

    if (waitingListEntries.length === 0) {
      console.log(`[WaitingList] Nenhum participante na fila de espera para o evento ${eventId}`)
      return { promoted: 0, notifications: [] }
    }

    const promoted = []
    const notifications = []

    for (const entry of waitingListEntries) {
      try {
        // Marcar como promovido
        await prisma.eventWaitingList.update({
          where: { id: entry.id },
          data: {
            promotedAt: new Date()
          }
        })

        // Se existe formulário do evento, criar submissão automática com status APPROVED
        if (entry.event.form) {
          const submission = await prisma.eventFormSubmission.create({
            data: {
              formId: entry.event.form.id,
              userId: entry.userId,
              status: 'APPROVED',
              submittedAt: new Date(),
              approvedAt: new Date(),
              responses: {
                create: [] // Submissão vazia, será preenchida pelo usuário depois
              }
            }
          })

          console.log(`[WaitingList] Criada submissão automática ${submission.id} para usuário ${entry.userId}`)
        }

        promoted.push(entry)

        // Preparar notificação por email
        notifications.push({
          type: 'waiting_list_promotion',
          userId: entry.userId,
          eventId: entry.eventId,
          email: entry.user.email,
          name: entry.user.profile?.firstName || entry.user.email.split('@')[0],
          eventTitle: entry.event.title,
          eventDate: entry.event.startDate,
          position: entry.position
        })

        console.log(`[WaitingList] Promovido usuário ${entry.userId} da posição ${entry.position}`)
      } catch (error) {
        console.error(`[WaitingList] Erro ao promover usuário ${entry.userId}:`, error)
      }
    }

    // Reordenar posições da fila de espera restante
    const remainingEntries = await prisma.eventWaitingList.findMany({
      where: {
        eventId,
        isActive: true,
        promotedAt: null
      },
      orderBy: [
        { priority: 'desc' },
        { joinedAt: 'asc' }
      ]
    })

    // Atualizar posições
    for (let i = 0; i < remainingEntries.length; i++) {
      await prisma.eventWaitingList.update({
        where: { id: remainingEntries[i].id },
        data: { position: i + 1 }
      })
    }

    console.log(`[WaitingList] Promovidos ${promoted.length} participantes e reordenadas ${remainingEntries.length} posições restantes`)

    return {
      promoted: promoted.length,
      notifications,
      promotedUsers: promoted.map(entry => ({
        userId: entry.userId,
        email: entry.user.email,
        name: entry.user.profile?.firstName || entry.user.email.split('@')[0],
        previousPosition: entry.position
      }))
    }
  } catch (error) {
    console.error('[WaitingList] Erro na promoção automática:', error)
    throw error
  }
}

/**
 * Verifica automaticamente se há vagas disponíveis e promove da fila de espera
 */
export async function checkAndPromoteWaitingList(eventId: string) {
  try {
    // Buscar evento
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    })

    if (!event) {
      throw new Error(`Evento ${eventId} não encontrado`)
    }

    // Buscar formulário do evento e suas submissões
    const eventForm = await prisma.eventForm.findUnique({
      where: { eventId },
      include: {
        submissions: {
          where: {
            status: {
              in: ['APPROVED', 'PENDING']
            }
          }
        }
      }
    })

    // Contar pessoas na fila de espera
    const waitingListCount = await prisma.eventWaitingList.count({
      where: {
        eventId,
        isActive: true,
        promotedAt: null
      }
    })

    // Calcular vagas disponíveis
    const totalSubmissions = eventForm?.submissions.length || 0
    const maxParticipants = event.maxParticipants || Infinity
    const availableSlots = Math.max(0, maxParticipants - totalSubmissions)

    console.log(`[WaitingList] Evento ${eventId}: ${totalSubmissions} inscritos de ${maxParticipants} vagas, ${availableSlots} disponíveis, ${waitingListCount} na fila`)

    if (availableSlots > 0 && waitingListCount > 0) {
      return await promoteFromWaitingList(eventId, availableSlots)
    }

    return { promoted: 0, notifications: [], message: 'Nenhuma vaga disponível ou fila vazia' }
  } catch (error) {
    console.error('[WaitingList] Erro ao verificar e promover fila de espera:', error)
    throw error
  }
}

export default {
  promoteFromWaitingList,
  checkAndPromoteWaitingList
}
