import { PrismaClient } from '@prisma/client';
import { d as defineEventHandler, b as getMethod, e as getRouterParam, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
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
        ...excludeId && { id: { not: excludeId } }
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
  if (data.title && data.title.length < 3) {
    errors.push("T\xEDtulo deve ter pelo menos 3 caracteres");
  }
  if (data.description && data.description.length < 10) {
    errors.push("Descri\xE7\xE3o deve ter pelo menos 10 caracteres");
  }
  if (data.startDate && isNaN(Date.parse(data.startDate))) {
    errors.push("Data de in\xEDcio deve ser v\xE1lida");
  }
  if (data.location && data.location.length < 3) {
    errors.push("Local deve ter pelo menos 3 caracteres");
  }
  if (data.category && data.category.length < 2) {
    errors.push("Categoria deve ter pelo menos 2 caracteres");
  }
  if (data.endDate && data.startDate && new Date(data.endDate) < new Date(data.startDate)) {
    errors.push("Data de fim deve ser posterior \xE0 data de in\xEDcio");
  }
  if (data.maxParticipants !== void 0 && data.maxParticipants < 1) {
    errors.push("N\xFAmero m\xE1ximo de participantes deve ser maior que 0");
  }
  if (data.minParticipants !== void 0 && data.minParticipants < 1) {
    errors.push("N\xFAmero m\xEDnimo de participantes deve ser maior que 0");
  }
  if (data.price !== void 0 && data.price < 0) {
    errors.push("Pre\xE7o n\xE3o pode ser negativo");
  }
  return errors;
}
const _id__get = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const idOrSlug = getRouterParam(event, "id");
  if (!idOrSlug) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID ou slug do evento \xE9 obrigat\xF3rio"
    });
  }
  try {
    if (method === "GET") {
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
      });
      if (!existingEvent) {
        throw createError({
          statusCode: 404,
          statusMessage: "Evento n\xE3o encontrado"
        });
      }
      await prisma.event.update({
        where: { id: existingEvent.id },
        data: { viewCount: { increment: 1 } }
      });
      return {
        success: true,
        data: existingEvent
      };
    } else if (method === "PUT") {
      const body = await readBody(event);
      const existingEvent = await prisma.event.findFirst({
        where: {
          OR: [
            { id: idOrSlug },
            { slug: idOrSlug }
          ]
        }
      });
      if (!existingEvent) {
        throw createError({
          statusCode: 404,
          statusMessage: "Evento n\xE3o encontrado"
        });
      }
      const validationErrors = validateEventData(body);
      if (validationErrors.length > 0) {
        throw createError({
          statusCode: 400,
          statusMessage: validationErrors.join(", ")
        });
      }
      let slug = existingEvent.slug;
      if (body.title && body.title !== existingEvent.title) {
        const baseSlug = generateSlug(body.title);
        slug = await ensureUniqueSlug(baseSlug, existingEvent.id);
      }
      const updateData = { slug };
      if (body.title) updateData.title = body.title;
      if (body.description) updateData.description = body.description;
      if (body.content !== void 0) updateData.content = body.content;
      if (body.startDate) updateData.startDate = new Date(body.startDate);
      if (body.endDate !== void 0) updateData.endDate = body.endDate ? new Date(body.endDate) : null;
      if (body.timezone) updateData.timezone = body.timezone;
      if (body.location) updateData.location = body.location;
      if (body.address !== void 0) updateData.address = body.address;
      if (body.coordinates !== void 0) updateData.coordinates = body.coordinates;
      if (body.isOnline !== void 0) updateData.isOnline = body.isOnline;
      if (body.onlineUrl !== void 0) updateData.onlineUrl = body.onlineUrl;
      if (body.maxParticipants !== void 0) updateData.maxParticipants = body.maxParticipants;
      if (body.minParticipants !== void 0) updateData.minParticipants = body.minParticipants;
      if (body.price !== void 0) updateData.price = body.price ? parseFloat(body.price) : null;
      if (body.currency) updateData.currency = body.currency;
      if (body.category) updateData.category = body.category;
      if (body.tags !== void 0) updateData.tags = body.tags;
      if (body.targetAudience !== void 0) updateData.targetAudience = body.targetAudience;
      if (body.ageMin !== void 0) updateData.ageMin = body.ageMin;
      if (body.ageMax !== void 0) updateData.ageMax = body.ageMax;
      if (body.registrationRequired !== void 0) updateData.registrationRequired = body.registrationRequired;
      if (body.registrationStart !== void 0) updateData.registrationStart = body.registrationStart ? new Date(body.registrationStart) : null;
      if (body.registrationEnd !== void 0) updateData.registrationEnd = body.registrationEnd ? new Date(body.registrationEnd) : null;
      if (body.requiresApproval !== void 0) updateData.requiresApproval = body.requiresApproval;
      if (body.customForm !== void 0) updateData.customForm = body.customForm;
      if (body.status) updateData.status = body.status;
      if (body.isPublic !== void 0) updateData.isPublic = body.isPublic;
      if (body.isFeatured !== void 0) updateData.isFeatured = body.isFeatured;
      if (body.coverImage !== void 0) updateData.coverImage = body.coverImage;
      if (body.gallery !== void 0) updateData.gallery = body.gallery;
      if (body.attachments !== void 0) updateData.attachments = body.attachments;
      if (body.parishId !== void 0) updateData.parishId = body.parishId;
      if (body.cityId !== void 0) updateData.cityId = body.cityId;
      if (body.metaTitle !== void 0) updateData.metaTitle = body.metaTitle;
      if (body.metaDescription !== void 0) updateData.metaDescription = body.metaDescription;
      if (body.status === "PUBLISHED" && existingEvent.status !== "PUBLISHED") {
        updateData.publishedAt = /* @__PURE__ */ new Date();
      }
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
      });
      return {
        success: true,
        message: "Evento atualizado com sucesso",
        event: updatedEvent
      };
    } else if (method === "DELETE") {
      const existingEvent = await prisma.event.findFirst({
        where: {
          OR: [
            { id: idOrSlug },
            { slug: idOrSlug }
          ]
        }
      });
      if (!existingEvent) {
        throw createError({
          statusCode: 404,
          statusMessage: "Evento n\xE3o encontrado"
        });
      }
      const registrationCount = await prisma.eventRegistration.count({
        where: { eventId: existingEvent.id }
      });
      if (registrationCount > 0) {
        throw createError({
          statusCode: 400,
          statusMessage: "N\xE3o \xE9 poss\xEDvel excluir evento com inscri\xE7\xF5es"
        });
      }
      await prisma.event.delete({
        where: { id: existingEvent.id }
      });
      return {
        success: true,
        message: "Evento exclu\xEDdo com sucesso"
      };
    } else {
      throw createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed"
      });
    }
  } catch (error) {
    console.error("Error in event API:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
