import { PrismaClient } from '@prisma/client';
import { d as defineEventHandler, b as getMethod, a as getQuery, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import 'bcryptjs';
import 'nodemailer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'jsonwebtoken';
import '@iconify/utils';
import 'consola';
import 'better-sqlite3';
import 'ipx';

const prisma = new PrismaClient();
function generateSlug(title) {
  return title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim().substring(0, 50);
}
async function ensureUniqueSlug(baseSlug, excludeId) {
  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const existing = await prisma.event.findFirst({
      where: {
        slug,
        ...excludeId
      }
    });
    if (!existing) break;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
}
function validateEventData(data) {
  const errors = [];
  if (!data.title || data.title.length < 3) {
    errors.push("T\xEDtulo deve ter pelo menos 3 caracteres");
  }
  if (!data.description || data.description.length < 10) {
    errors.push("Descri\xE7\xE3o deve ter pelo menos 10 caracteres");
  }
  if (!data.startDate || isNaN(Date.parse(data.startDate))) {
    errors.push("Data de in\xEDcio \xE9 obrigat\xF3ria e deve ser v\xE1lida");
  }
  if (!data.location || data.location.length < 3) {
    errors.push("Local \xE9 obrigat\xF3rio");
  }
  if (!data.category || data.category.length < 2) {
    errors.push("Categoria \xE9 obrigat\xF3ria");
  }
  if (data.endDate && new Date(data.endDate) < new Date(data.startDate)) {
    errors.push("Data de fim deve ser posterior \xE0 data de in\xEDcio");
  }
  if (data.maxParticipants && data.maxParticipants < 1) {
    errors.push("N\xFAmero m\xE1ximo de participantes deve ser maior que 0");
  }
  if (data.minParticipants && data.minParticipants < 1) {
    errors.push("N\xFAmero m\xEDnimo de participantes deve ser maior que 0");
  }
  if (data.price && data.price < 0) {
    errors.push("Pre\xE7o n\xE3o pode ser negativo");
  }
  if (data.ageMin && data.ageMin < 0) {
    errors.push("Idade m\xEDnima deve ser maior ou igual a 0");
  }
  if (data.ageMax && data.ageMax < 0) {
    errors.push("Idade m\xE1xima deve ser maior ou igual a 0");
  }
  if (data.ageMin && data.ageMax && data.ageMin > data.ageMax) {
    errors.push("Idade m\xEDnima deve ser menor ou igual \xE0 idade m\xE1xima");
  }
  return errors;
}
const index_get = defineEventHandler(async (event) => {
  const method = getMethod(event);
  try {
    if (method === "GET") {
      const query = getQuery(event);
      const page = parseInt(query.page) || 1;
      const limit = Math.min(parseInt(query.limit) || 12, 50);
      const skip = (page - 1) * limit;
      const where = {};
      if (query.search) {
        where.OR = [
          { title: { contains: query.search, mode: "insensitive" } },
          { description: { contains: query.search, mode: "insensitive" } },
          { location: { contains: query.search, mode: "insensitive" } }
        ];
      }
      if (query.category) {
        where.category = query.category;
      }
      if (query.status) {
        where.status = query.status;
      }
      if (query.organizerId) {
        where.organizerId = query.organizerId;
      }
      if (query.parishId) {
        where.parishId = query.parishId;
      }
      if (query.cityId) {
        where.cityId = query.cityId;
      }
      if (query.startDate) {
        where.startDate = { gte: new Date(query.startDate) };
      }
      if (query.endDate) {
        where.startDate = {
          ...where.startDate,
          lte: new Date(query.endDate)
        };
      }
      if (query.isPublic !== void 0) {
        where.isPublic = query.isPublic === "true";
      }
      if (query.isFeatured !== void 0) {
        where.isFeatured = query.isFeatured === "true";
      }
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
            { isFeatured: "desc" },
            { startDate: "asc" },
            { createdAt: "desc" }
          ],
          skip,
          take: limit
        }),
        prisma.event.count({ where })
      ]);
      const pages = Math.ceil(total / limit);
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
      };
    } else if (method === "POST") {
      const body = await readBody(event);
      const validationErrors = validateEventData(body);
      if (validationErrors.length > 0) {
        throw createError({
          statusCode: 400,
          statusMessage: validationErrors.join(", ")
        });
      }
      const baseSlug = generateSlug(body.title);
      const slug = await ensureUniqueSlug(baseSlug);
      const organizerId = body.organizerId || "mock-organizer-id";
      const newEvent = await prisma.event.create({
        data: {
          title: body.title,
          slug,
          description: body.description,
          content: body.content,
          startDate: new Date(body.startDate),
          endDate: body.endDate ? new Date(body.endDate) : null,
          timezone: body.timezone || "America/Sao_Paulo",
          location: body.location,
          address: body.address,
          coordinates: body.coordinates,
          isOnline: body.isOnline || false,
          onlineUrl: body.onlineUrl,
          maxParticipants: body.maxParticipants,
          minParticipants: body.minParticipants || 1,
          price: body.price ? parseFloat(body.price) : null,
          currency: body.currency || "BRL",
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
          status: "DRAFT",
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
      });
      return {
        success: true,
        message: "Evento criado com sucesso",
        event: newEvent
      };
    } else {
      throw createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed"
      });
    }
  } catch (error) {
    console.error("Error in events API:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
