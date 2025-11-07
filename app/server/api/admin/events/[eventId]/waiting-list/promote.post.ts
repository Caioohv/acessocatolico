import { checkAndPromoteWaitingList } from '~/server/utils/waitingListPromotion'
// import { sendNotificationEmail } from '~/server/utils/email'

export default defineEventHandler(async (event) => {
  try {
    const eventId = getRouterParam(event, 'eventId')
    
    if (!eventId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID do evento é obrigatório'
      })
    }

    // Verificar autenticação e permissões (admin, organizador do evento)
    const user = await requireAuthUser(event)
    
    if (!user || !['ADMIN', 'PRIEST', 'ORGANIZER'].includes(user.role)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Acesso negado'
      })
    }

    // Executar promoção automática
    const result = await checkAndPromoteWaitingList(eventId)

    // Se houver notificações, enviar emails
    if (result.notifications && result.notifications.length > 0) {
      const emailModule = await import('../../../../../utils/email')
      const { sendNotificationEmail } = emailModule
      
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
          
          console.log(`[WaitingList] Email de promoção enviado para ${notification.email}`)
        } catch (emailError) {
          console.error(`[WaitingList] Erro ao enviar email para ${notification.email}:`, emailError)
        }
      }
    }

    return {
      success: true,
      promoted: result.promoted,
      notifications: result.notifications?.length || 0,
      message: result.promoted > 0 
        ? `${result.promoted} participante(s) promovido(s) da fila de espera`
        : result.message || 'Nenhuma promoção necessária'
    }
  } catch (error) {
    console.error('Erro na promoção automática da fila de espera:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
