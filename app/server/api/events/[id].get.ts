import { PrismaClient } from '@prisma/client'
import { createError, defineEventHandler, getMethod, readBody, getRouterParam } from 'h3'

const prisma = new PrismaClient()

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .substring(0, 50) // Limit length
}

async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug
  let counter = 1
  
  while (true) {
    const existing = await prisma.event.findFirst({
      where: {
        slug,
        ...(excludeId && { id: { not: excludeId } })
      }
    })
    
    if (!existing) break
    
    slug = `${baseSlug}-${counter}`
    counter++
  }
  
  return slug
}

function validateEventData(data: any) {
  const errors: string[] = []
  
  if (data.title && data.title.length < 3) {
    errors.push('Título deve ter pelo menos 3 caracteres')
  }
  
  if (data.description && data.description.length < 10) {
    errors.push('Descrição deve ter pelo menos 10 caracteres')
  }
  
  if (data.startDate && isNaN(Date.parse(data.startDate))) {
    errors.push('Data de início deve ser válida')
  }
  
  if (data.location && data.location.length < 3) {
    errors.push('Local deve ter pelo menos 3 caracteres')
  }
  
  if (data.category && data.category.length < 2) {
    errors.push('Categoria deve ter pelo menos 2 caracteres')
  }
  
  if (data.endDate && data.startDate && new Date(data.endDate) < new Date(data.startDate)) {
    errors.push('Data de fim deve ser posterior à data de início')
  }
  
  if (data.maxParticipants !== undefined && data.maxParticipants < 1) {
    errors.push('Número máximo de participantes deve ser maior que 0')
  }
  
  if (data.minParticipants !== undefined && data.minParticipants < 1) {
    errors.push('Número mínimo de participantes deve ser maior que 0')
  }
  
  if (data.price !== undefined && data.price < 0) {
    errors.push('Preço não pode ser negativo')
  }
  
  return errors
}

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const idOrSlug = getRouterParam(event, 'id')
  
  if (!idOrSlug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID ou slug do evento é obrigatório'
    })
  }
  
  try {
    if (method === 'GET') {
      // Get single event by ID or slug
      const existingEvent = await prisma.event.findFirst({
        where: {
          OR: [
            { id: idOrSlug },
            { slug: idOrSlug }
          ]
        },
        include: {
          organizer: {
            select: {
              id: true,
              profile: {
                select: {
                  firstName: true,
                  lastName: true
                }
              }
            }
          },
          parish: {
            select: {
              id: true,
              name: true
            }
          },
          city: {
            select: {
              id: true,
              name: true
            }
          },
          registrations: {
            include: {
              user: {
                select: {
                  id: true,
                  profile: {
                    select: {
                      firstName: true,
                      lastName: true
                    }
                  }
                }
              }
            }
          },
          _count: {
            select: {
              registrations: true,
              comments: true
            }
          }
        }
      })
      
      if (!existingEvent) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Evento não encontrado'
        })
      }
      
      // Increment view count
      await prisma.event.update({
        where: { id: existingEvent.id },
        data: { viewCount: { increment: 1 } }
      })
      
      return {
        success: true,
        data: existingEvent
      }
      
    } else if (method === 'PUT') {
      // Update event
      const body = await readBody(event)
      
      // Find existing event
      const existingEvent = await prisma.event.findFirst({
        where: {
          OR: [
            { id: idOrSlug },
            { slug: idOrSlug }
          ]
        }
      })
      
      if (!existingEvent) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Evento não encontrado'
        })
      }
      
      // TODO: Check if user is authorized to update this event
      
      // Validate input
      const validationErrors = validateEventData(body)
      if (validationErrors.length > 0) {
        throw createError({
          statusCode: 400,
          statusMessage: validationErrors.join(', ')
        })
      }
      
      // Generate new slug if title changed
      let slug = existingEvent.slug
      if (body.title && body.title !== existingEvent.title) {
        const baseSlug = generateSlug(body.title)
        slug = await ensureUniqueSlug(baseSlug, existingEvent.id)
      }
      
      // Prepare update data
      const updateData: any = { slug }
      
      if (body.title) updateData.title = body.title
      if (body.description) updateData.description = body.description
      if (body.content !== undefined) updateData.content = body.content
      if (body.startDate) updateData.startDate = new Date(body.startDate)
      if (body.endDate !== undefined) updateData.endDate = body.endDate ? new Date(body.endDate) : null
      if (body.timezone) updateData.timezone = body.timezone
      if (body.location) updateData.location = body.location
      if (body.address !== undefined) updateData.address = body.address
      if (body.coordinates !== undefined) updateData.coordinates = body.coordinates
      if (body.isOnline !== undefined) updateData.isOnline = body.isOnline
      if (body.onlineUrl !== undefined) updateData.onlineUrl = body.onlineUrl
      if (body.maxParticipants !== undefined) updateData.maxParticipants = body.maxParticipants
      if (body.minParticipants !== undefined) updateData.minParticipants = body.minParticipants
      if (body.price !== undefined) updateData.price = body.price ? parseFloat(body.price) : null
      if (body.currency) updateData.currency = body.currency
      if (body.category) updateData.category = body.category
      if (body.tags !== undefined) updateData.tags = body.tags
      if (body.targetAudience !== undefined) updateData.targetAudience = body.targetAudience
      if (body.ageMin !== undefined) updateData.ageMin = body.ageMin
      if (body.ageMax !== undefined) updateData.ageMax = body.ageMax
      if (body.registrationRequired !== undefined) updateData.registrationRequired = body.registrationRequired
      if (body.registrationStart !== undefined) updateData.registrationStart = body.registrationStart ? new Date(body.registrationStart) : null
      if (body.registrationEnd !== undefined) updateData.registrationEnd = body.registrationEnd ? new Date(body.registrationEnd) : null
      if (body.requiresApproval !== undefined) updateData.requiresApproval = body.requiresApproval
      if (body.customForm !== undefined) updateData.customForm = body.customForm
      if (body.status) updateData.status = body.status
      if (body.isPublic !== undefined) updateData.isPublic = body.isPublic
      if (body.isFeatured !== undefined) updateData.isFeatured = body.isFeatured
      if (body.coverImage !== undefined) updateData.coverImage = body.coverImage
      if (body.gallery !== undefined) updateData.gallery = body.gallery
      if (body.attachments !== undefined) updateData.attachments = body.attachments
      if (body.parishId !== undefined) updateData.parishId = body.parishId
      if (body.cityId !== undefined) updateData.cityId = body.cityId
      if (body.metaTitle !== undefined) updateData.metaTitle = body.metaTitle
      if (body.metaDescription !== undefined) updateData.metaDescription = body.metaDescription
      
      // Update published date if status changed to PUBLISHED
      if (body.status === 'PUBLISHED' && existingEvent.status !== 'PUBLISHED') {
        updateData.publishedAt = new Date()
      }
      
      // Update event
      const updatedEvent = await prisma.event.update({
        where: { id: existingEvent.id },
        data: updateData,
        include: {
          organizer: {
            select: {
              id: true,
              profile: {
                select: {
                  firstName: true,
                  lastName: true
                }
              }
            }
          },
          parish: {
            select: {
              id: true,
              name: true
            }
          },
          city: {
            select: {
              id: true,
              name: true
            }
          }
        }
      })
      
      return {
        success: true,
        message: 'Evento atualizado com sucesso',
        event: updatedEvent
      }
      
    } else if (method === 'DELETE') {
      // Delete event
      const existingEvent = await prisma.event.findFirst({
        where: {
          OR: [
            { id: idOrSlug },
            { slug: idOrSlug }
          ]
        }
      })
      
      if (!existingEvent) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Evento não encontrado'
        })
      }
      
      // TODO: Check if user is authorized to delete this event
      
      // Check if event has registrations
      const registrationCount = await prisma.eventRegistration.count({
        where: { eventId: existingEvent.id }
      })
      
      if (registrationCount > 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Não é possível excluir evento com inscrições'
        })
      }
      
      // Delete event
      await prisma.event.delete({
        where: { id: existingEvent.id }
      })
      
      return {
        success: true,
        message: 'Evento excluído com sucesso'
      }
      
    } else {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
    }
    
  } catch (error) {
    console.error('Error in event API:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
