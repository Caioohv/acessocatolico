import { PrismaClient } from '@prisma/client'
import { createError, defineEventHandler, getMethod } from 'h3'

const prisma = new PrismaClient()

// Predefined event categories
const predefinedCategories = [
  { value: 'retiro', label: 'Retiros', description: 'Retiros espirituais e encontros' },
  { value: 'encontro', label: 'Encontros', description: 'Encontros de jovens, casais, etc.' },
  { value: 'festa', label: 'Festas', description: 'Festas paroquiais e celebrações' },
  { value: 'formacao', label: 'Formação', description: 'Cursos e formação espiritual' },
  { value: 'liturgia', label: 'Liturgia', description: 'Celebrações e eventos litúrgicos' },
  { value: 'caridade', label: 'Caridade', description: 'Ações sociais e caritativas' },
  { value: 'peregrinacao', label: 'Peregrinações', description: 'Romarias e peregrinações' },
  { value: 'musica', label: 'Música', description: 'Eventos musicais e corais' },
  { value: 'jovens', label: 'Jovens', description: 'Eventos específicos para jovens' },
  { value: 'criancas', label: 'Crianças', description: 'Eventos para crianças' },
  { value: 'familia', label: 'Família', description: 'Eventos familiares' },
  { value: 'casais', label: 'Casais', description: 'Encontros de casais' },
  { value: 'adoracao', label: 'Adoração', description: 'Adoração ao Santíssimo' },
  { value: 'novena', label: 'Novenas', description: 'Novenas e devoções' },
  { value: 'conferencia', label: 'Conferências', description: 'Palestras e conferências' },
  { value: 'workshop', label: 'Workshops', description: 'Oficinas e workshops' },
  { value: 'outro', label: 'Outros', description: 'Outros tipos de eventos' }
]

export default defineEventHandler(async (event) => {
  try {
    if (getMethod(event) !== 'GET') {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
    }

    // Get event counts by category from database
    const categoryCounts = await prisma.event.groupBy({
      by: ['category'],
      _count: {
        category: true
      },
      where: {
        status: 'PUBLISHED'
      }
    })

    // Create a map for quick lookup
    const countMap = categoryCounts.reduce((acc, item) => {
      acc[item.category] = item._count.category
      return acc
    }, {} as Record<string, number>)

    // Combine predefined categories with counts
    const categoriesWithCounts = predefinedCategories.map(category => ({
      value: category.value,
      label: category.label,
      description: category.description,
      count: countMap[category.value] || 0
    }))

    // Sort by count (descending) and then by label
    categoriesWithCounts.sort((a, b) => {
      if (a.count !== b.count) {
        return b.count - a.count
      }
      return a.label.localeCompare(b.label)
    })

    return {
      success: true,
      data: categoriesWithCounts
    }

  } catch (error) {
    console.error('Error fetching event categories:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
