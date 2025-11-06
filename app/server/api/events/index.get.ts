import { PrismaClient } from '@prisma/client'
import { createError, defineEventHandler, getMethod, readBody, getQuery } from 'h3'

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
  
  if (!data.title || data.title.length < 3) {
    errors.push('Título deve ter pelo menos 3 caracteres')
  }
  
  if (!data.description || data.description.length < 10) {
    errors.push('Descrição deve ter pelo menos 10 caracteres')
  }
  
  if (!data.startDate || isNaN(Date.parse(data.startDate))) {
    errors.push('Data de início é obrigatória e deve ser válida')
  }
  
  if (!data.location || data.location.length < 3) {
    errors.push('Local é obrigatório')
  }
  
  if (!data.category || data.category.length < 2) {
    errors.push('Categoria é obrigatória')
  }
  
  if (data.endDate && new Date(data.endDate) < new Date(data.startDate)) {
    errors.push('Data de fim deve ser posterior à data de início')
  }
  
  if (data.maxParticipants && data.maxParticipants < 1) {
    errors.push('Número máximo de participantes deve ser maior que 0')
  }
  
  if (data.minParticipants && data.minParticipants < 1) {
    errors.push('Número mínimo de participantes deve ser maior que 0')
  }
  
  if (data.price && data.price < 0) {
    errors.push('Preço não pode ser negativo')
  }
  
  if (data.ageMin && data.ageMin < 0) {
    errors.push('Idade mínima deve ser maior ou igual a 0')
  }
  
  if (data.ageMax && data.ageMax < 0) {
    errors.push('Idade máxima deve ser maior ou igual a 0')
  }
  
  if (data.ageMin && data.ageMax && data.ageMin > data.ageMax) {
    errors.push('Idade mínima deve ser menor ou igual à idade máxima')
  }
  
  return errors
}

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  
  try {
    if (method === 'GET') {
      // Get events with filters and pagination
      const query = getQuery(event)
      
      const page = parseInt(query.page as string) || 1
      const limit = Math.min(parseInt(query.limit as string) || 12, 50)
      const skip = (page - 1) * limit
      
      // Build filter conditions
      const where: any = {}
      
      if (query.search) {
        where.OR = [
          { title: { contains: query.search, mode: 'insensitive' } },
          { description: { contains: query.search, mode: 'insensitive' } },
          { location: { contains: query.search, mode: 'insensitive' } }
        ]
      }
      
      if (query.category) {
        where.category = query.category
      }
      
      if (query.status) {
        where.status = query.status
      }
      
      if (query.organizerId) {
        where.organizerId = query.organizerId
      }
      
      if (query.parishId) {
        where.parishId = query.parishId
      }
      
      if (query.cityId) {
        where.cityId = query.cityId
      }
      
      if (query.startDate) {
        where.startDate = { gte: new Date(query.startDate as string) }
      }
      
      if (query.endDate) {
        where.startDate = { 
          ...where.startDate,
          lte: new Date(query.endDate as string) 
        }
      }
      
      if (query.isPublic !== undefined) {
        where.isPublic = query.isPublic === 'true'
      }
      
      if (query.isFeatured !== undefined) {
        where.isFeatured = query.isFeatured === 'true'
      }
      
      // Get events with pagination
      const [events, total] = await Promise.all([
        prisma.event.findMany({
          where,
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
            _count: {
              select: {
                registrations: true
              }
            }
          },
          orderBy: [
            { isFeatured: 'desc' },
            { startDate: 'asc' },
            { createdAt: 'desc' }
          ],
          skip,
          take: limit
        }),
        prisma.event.count({ where })
      ])
      
      const pages = Math.ceil(total / limit)
      
      return {
        success: true,
        data: {
          events,
          pagination: {
            page,
            limit,
            total,
            pages
          }
        }
      }
      
    } else if (method === 'POST') {
      // Create new event
      const body = await readBody(event)
      
      // Validate input
      const validationErrors = validateEventData(body)
      if (validationErrors.length > 0) {
        throw createError({
          statusCode: 400,
          statusMessage: validationErrors.join(', ')
        })
      }
      
      // Generate unique slug
      const baseSlug = generateSlug(body.title)
      const slug = await ensureUniqueSlug(baseSlug)
      
      // TODO: Get user from JWT token
      // For now, using mock organizer ID
      const organizerId = body.organizerId || 'mock-organizer-id'
      
      // Create event
      const newEvent = await prisma.event.create({
        data: {
          title: body.title,
          slug,
          description: body.description,
          content: body.content,
          startDate: new Date(body.startDate),
          endDate: body.endDate ? new Date(body.endDate) : null,
          timezone: body.timezone || 'America/Sao_Paulo',
          location: body.location,
          address: body.address,
          coordinates: body.coordinates,
          isOnline: body.isOnline || false,
          onlineUrl: body.onlineUrl,
          maxParticipants: body.maxParticipants,
          minParticipants: body.minParticipants || 1,
          price: body.price ? parseFloat(body.price) : null,
          currency: body.currency || 'BRL',
          category: body.category,
          tags: body.tags || [],
          targetAudience: body.targetAudience || [],
          ageMin: body.ageMin,
          ageMax: body.ageMax,
          registrationRequired: body.registrationRequired !== false,
          registrationStart: body.registrationStart ? new Date(body.registrationStart) : null,
          registrationEnd: body.registrationEnd ? new Date(body.registrationEnd) : null,
          requiresApproval: body.requiresApproval || false,
          customForm: body.customForm,
          status: 'DRAFT',
          isPublic: body.isPublic !== false,
          isFeatured: body.isFeatured || false,
          coverImage: body.coverImage,
          gallery: body.gallery || [],
          attachments: body.attachments || [],
          organizerId,
          parishId: body.parishId,
          cityId: body.cityId,
          metaTitle: body.metaTitle,
          metaDescription: body.metaDescription
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
          }
        }
      })
      
      return {
        success: true,
        message: 'Evento criado com sucesso',
        event: newEvent
      }
      
    } else {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
    }
    
  } catch (error) {
    console.error('Error in events API:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
