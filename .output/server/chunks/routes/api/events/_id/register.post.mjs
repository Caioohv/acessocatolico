import { PrismaClient } from '@prisma/client';
import { d as defineEventHandler, e as getHeader, c as createError, b as getRouterParam } from '../../../../nitro/nitro.mjs';
import * as jsonwebtoken from 'jsonwebtoken';
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
import '@iconify/utils';
import 'consola';
import 'better-sqlite3';
import 'ipx';

const prisma = new PrismaClient();
const register_post = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!(authHeader == null ? void 0 : authHeader.startsWith("Bearer "))) {
      throw createError({
        statusCode: 401,
        statusMessage: "Token de autentica\xE7\xE3o necess\xE1rio"
      });
    }
    const token = authHeader.substring(7);
    const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    });
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Usu\xE1rio n\xE3o encontrado"
      });
    }
    const eventId = getRouterParam(event, "id");
    if (!eventId) {
      throw createError({
        statusCode: 400,
        statusMessage: "ID do evento \xE9 obrigat\xF3rio"
      });
    }
    if (event.node.req.method === "POST") {
      const eventRecord = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
          _count: {
            select: { registrations: true }
          }
        }
      });
      if (!eventRecord) {
        throw createError({
          statusCode: 404,
          statusMessage: "Evento n\xE3o encontrado"
        });
      }
      const existingRegistration = await prisma.eventRegistration.findUnique({
        where: {
          eventId_userId: {
            eventId,
            userId: user.id
          }
        }
      });
      if (existingRegistration) {
        throw createError({
          statusCode: 400,
          statusMessage: "Voc\xEA j\xE1 est\xE1 inscrito neste evento"
        });
      }
      const now = /* @__PURE__ */ new Date();
      if (eventRecord.registrationStart && now < eventRecord.registrationStart) {
        throw createError({
          statusCode: 400,
          statusMessage: "As inscri\xE7\xF5es ainda n\xE3o foram abertas"
        });
      }
      if (eventRecord.registrationEnd && now > eventRecord.registrationEnd) {
        throw createError({
          statusCode: 400,
          statusMessage: "As inscri\xE7\xF5es foram encerradas"
        });
      }
      if (eventRecord.maxParticipants && eventRecord._count.registrations >= eventRecord.maxParticipants) {
        throw createError({
          statusCode: 400,
          statusMessage: "O evento atingiu o limite de participantes"
        });
      }
      const registration2 = await prisma.eventRegistration.create({
        data: {
          eventId,
          userId: user.id,
          status: eventRecord.requiresApproval ? "PENDING" : "CONFIRMED",
          createdAt: /* @__PURE__ */ new Date()
        },
        include: {
          event: {
            select: {
              title: true,
              startDate: true
            }
          }
        }
      });
      return {
        success: true,
        message: eventRecord.requiresApproval ? "Inscri\xE7\xE3o realizada! Aguarde a aprova\xE7\xE3o do organizador." : "Inscri\xE7\xE3o realizada com sucesso!",
        data: registration2
      };
    }
    const registration = await prisma.eventRegistration.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId: user.id
        }
      }
    });
    return {
      success: true,
      data: registration
    };
  } catch (error) {
    console.error("Error in event registration:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
