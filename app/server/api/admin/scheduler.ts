import { scheduler } from '../../utils/schedulerService'

export default defineEventHandler(async (event) => {
  try {
    // Por simplicidade, vamos retornar apenas GET por enquanto
    // TODO: Adicionar autenticação e outros métodos quando necessário
    
    return {
      success: true,
      message: 'Scheduler endpoint funcionando',
      stats: scheduler.getStats()
    }
  } catch (error) {
    console.error('Erro no scheduler endpoint:', error)
    
    return {
      success: false,
      error: 'Erro interno do servidor'
    }
  }
})
