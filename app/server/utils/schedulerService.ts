import { PrismaClient } from '@prisma/client'
import { checkAndPromoteWaitingList } from './waitingListPromotion'
import { sendNotificationEmail } from './email'

const prisma = new PrismaClient()

/**
 * Serviço de agendamento para tarefas automáticas
 * Implementa um sistema simples de cron jobs sem dependências externas
 */
export class SchedulerService {
  private intervals: Map<string, NodeJS.Timeout> = new Map()
  private isRunning: boolean = false

  /**
   * Inicia o serviço de agendamento
   */
  start() {
    if (this.isRunning) {
      console.log('[Scheduler] Serviço já está rodando')
      return
    }

    this.isRunning = true
    console.log('[Scheduler] Iniciando serviço de agendamento...')

    // Agendar verificação da fila de espera a cada 15 minutos
    this.scheduleWaitingListCheck()

    // Agendar limpeza de notificações antigas diariamente
    this.scheduleNotificationCleanup()

    // Agendar lembretes de eventos
    this.scheduleEventReminders()

    console.log('[Scheduler] Serviço de agendamento iniciado com sucesso')
  }

  /**
   * Para o serviço de agendamento
   */
  stop() {
    if (!this.isRunning) return

    console.log('[Scheduler] Parando serviço de agendamento...')
    
    this.intervals.forEach((interval, name) => {
      clearInterval(interval)
      console.log(`[Scheduler] Parou tarefa: ${name}`)
    })

    this.intervals.clear()
    this.isRunning = false
    console.log('[Scheduler] Serviço de agendamento parado')
  }

  /**
   * Agenda verificação periódica da fila de espera
   */
  private scheduleWaitingListCheck() {
    const interval = setInterval(async () => {
      try {
        console.log('[Scheduler] Executando verificação de filas de espera...')
        await this.processWaitingLists()
      } catch (error) {
        console.error('[Scheduler] Erro na verificação de filas de espera:', error)
      }
    }, 15 * 60 * 1000) // A cada 15 minutos

    this.intervals.set('waitingListCheck', interval)
    console.log('[Scheduler] Agendada verificação de fila de espera (15min)')
  }

  /**
   * Agenda limpeza de notificações antigas
   */
  private scheduleNotificationCleanup() {
    const interval = setInterval(async () => {
      try {
        console.log('[Scheduler] Executando limpeza de notificações antigas...')
        await this.cleanupOldNotifications()
      } catch (error) {
        console.error('[Scheduler] Erro na limpeza de notificações:', error)
      }
    }, 24 * 60 * 60 * 1000) // Diariamente

    this.intervals.set('notificationCleanup', interval)
    console.log('[Scheduler] Agendada limpeza de notificações (24h)')
  }

  /**
   * Agenda lembretes de eventos
   */
  private scheduleEventReminders() {
    const interval = setInterval(async () => {
      try {
        console.log('[Scheduler] Executando envio de lembretes de eventos...')
        await this.sendEventReminders()
      } catch (error) {
        console.error('[Scheduler] Erro no envio de lembretes:', error)
      }
    }, 60 * 60 * 1000) // A cada 1 hora

    this.intervals.set('eventReminders', interval)
    console.log('[Scheduler] Agendados lembretes de eventos (1h)')
  }

  /**
   * Processa todas as filas de espera ativas
   */
  private async processWaitingLists() {
    try {
      // Buscar eventos com fila de espera ativa
      const eventsWithWaitingList = await prisma.event.findMany({
        where: {
          AND: [
            { startDate: { gt: new Date() } }, // Eventos futuros
            {
              waitingList: {
                some: {
                  isActive: true,
                  promotedAt: null
                }
              }
            }
          ]
        },
        select: { id: true, title: true }
      })

      console.log(`[Scheduler] Encontrados ${eventsWithWaitingList.length} eventos com fila de espera ativa`)

      let totalPromoted = 0
      let totalNotifications = 0

      for (const event of eventsWithWaitingList) {
        try {
          const result = await checkAndPromoteWaitingList(event.id)
          
          if (result.promoted > 0) {
            console.log(`[Scheduler] Promovidos ${result.promoted} participantes do evento "${event.title}"`)
            totalPromoted += result.promoted

            // Enviar notificações de promoção
            if (result.notifications && result.notifications.length > 0) {
              for (const notification of result.notifications) {
                try {
                  await sendNotificationEmail({
                    to: notification.email,
                    type: 'waiting_list_promotion',
                    data: {
                      name: notification.name,
                      eventTitle: notification.eventTitle,
                      eventDate: notification.eventDate,
                      previousPosition: notification.position
                    }
                  })
                  totalNotifications++
                } catch (emailError) {
                  console.error(`[Scheduler] Erro ao enviar email para ${notification.email}:`, emailError)
                }
              }
            }
          }
        } catch (eventError) {
          console.error(`[Scheduler] Erro ao processar evento ${event.id}:`, eventError)
        }
      }

      if (totalPromoted > 0) {
        console.log(`[Scheduler] Total: ${totalPromoted} promoções, ${totalNotifications} notificações enviadas`)
      }
    } catch (error) {
      console.error('[Scheduler] Erro ao processar filas de espera:', error)
      throw error
    }
  }

  /**
   * Remove notificações antigas do banco
   */
  private async cleanupOldNotifications() {
    try {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const deleted = await prisma.eventNotificationLog.deleteMany({
        where: {
          sentAt: {
            lt: thirtyDaysAgo
          }
        }
      })

      console.log(`[Scheduler] Removidas ${deleted.count} notificações antigas`)
    } catch (error) {
      console.error('[Scheduler] Erro na limpeza de notificações:', error)
      throw error
    }
  }

  /**
   * Envia lembretes de eventos próximos
   */
  private async sendEventReminders() {
    try {
      const now = new Date()
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const nextWeek = new Date()
      nextWeek.setDate(nextWeek.getDate() + 7)

      // Buscar eventos que precisam de lembretes (24h e 7 dias antes)
      const eventsNeedingReminders = await prisma.event.findMany({
        where: {
          AND: [
            { startDate: { gt: now } },
            {
              OR: [
                { startDate: { lte: tomorrow, gt: now } }, // 24h antes
                { startDate: { lte: nextWeek, gt: tomorrow } } // 7 dias antes
              ]
            }
          ]
        },
        include: {
          form: {
            include: {
              submissions: {
                where: {
                  status: 'APPROVED'
                },
                include: {
                  user: {
                    include: {
                      profile: true
                    }
                  }
                }
              }
            }
          }
        }
      })

      let totalReminders = 0

      for (const event of eventsNeedingReminders) {
        const daysDiff = Math.ceil((event.startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        
        // Determinar tipo de lembrete
        let reminderType = ''
        if (daysDiff <= 1) {
          reminderType = 'event_reminder_24h'
        } else if (daysDiff <= 7) {
          reminderType = 'event_reminder_7d'
        } else {
          continue // Não enviar lembrete
        }

        // Para simplificar, vamos usar um controle baseado no tipo e data
        // sem buscar no banco por enquanto
        console.log(`[Scheduler] Enviando lembretes ${reminderType} para evento ${event.id}`)

        // Enviar lembretes para participantes aprovados
        if (event.form?.submissions) {
          for (const submission of event.form.submissions) {
            try {
              await sendNotificationEmail({
                to: submission.user.email,
                type: reminderType,
                data: {
                  name: submission.user.profile?.firstName || submission.user.email.split('@')[0],
                  eventTitle: event.title,
                  eventDate: event.startDate,
                  eventLocation: event.location,
                  daysUntilEvent: daysDiff
                }
              })

              totalReminders++
            } catch (emailError) {
              console.error(`[Scheduler] Erro ao enviar lembrete para ${submission.user.email}:`, emailError)
            }
          }

          // Log simplificado no console por enquanto
          console.log(`[Scheduler] Lembrete ${reminderType} enviado para evento ${event.id}`)
        }

        console.log(`[Scheduler] Enviados lembretes para evento "${event.title}" (${daysDiff} dias)`)
      }

      if (totalReminders > 0) {
        console.log(`[Scheduler] Total: ${totalReminders} lembretes enviados`)
      }
    } catch (error) {
      console.error('[Scheduler] Erro ao enviar lembretes:', error)
      throw error
    }
  }

  /**
   * Verifica se o serviço está rodando
   */
  isActive(): boolean {
    return this.isRunning
  }

  /**
   * Retorna estatísticas do serviço
   */
  getStats() {
    return {
      isRunning: this.isRunning,
      activeJobs: this.intervals.size,
      jobs: Array.from(this.intervals.keys())
    }
  }
}

// Instância singleton
export const scheduler = new SchedulerService()

// Auto-iniciar em produção
if (process.env.NODE_ENV === 'production') {
  scheduler.start()
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Scheduler] Recebido SIGTERM, parando scheduler...')
  scheduler.stop()
})

process.on('SIGINT', () => {
  console.log('[Scheduler] Recebido SIGINT, parando scheduler...')
  scheduler.stop()
})

export default scheduler
