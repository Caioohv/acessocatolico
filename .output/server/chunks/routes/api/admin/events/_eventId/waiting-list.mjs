import { d as defineEventHandler, g as getHeader, c as createError, b as getMethod, r as readBody, a as getQuery } from '../../../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
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
const waitingList = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!(authHeader == null ? void 0 : authHeader.startsWith("Bearer "))) {
      throw createError({
        statusCode: 401,
        statusMessage: "Token de acesso requerido"
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin && !decoded.isPriest) {
      throw createError({
        statusCode: 403,
        statusMessage: "Acesso negado"
      });
    }
    if (getMethod(event) === "POST") {
      const body = await readBody(event);
      const { eventId, userId, email, name, phone, priority = 0 } = body;
      if (!eventId) {
        throw createError({
          statusCode: 400,
          statusMessage: "ID do evento \xE9 obrigat\xF3rio"
        });
      }
      const eventData = await prisma.event.findUnique({
        where: { id: parseInt(eventId) },
        select: {
          id: true,
          title: true,
          maxParticipants: true,
          _count: {
            select: {
              formSubmissions: {
                where: {
                  status: "APPROVED"
                }
              }
            }
          }
        }
      });
      if (!eventData) {
        throw createError({
          statusCode: 404,
          statusMessage: "Evento n\xE3o encontrado"
        });
      }
      const existingEntry = await prisma.eventWaitingList.findFirst({
        where: {
          eventId: parseInt(eventId),
          OR: [
            { userId: userId || void 0 },
            { email: email || void 0 }
          ]
        }
      });
      if (existingEntry) {
        throw createError({
          statusCode: 409,
          statusMessage: "J\xE1 est\xE1 na fila de espera"
        });
      }
      const lastPosition = await prisma.eventWaitingList.findFirst({
        where: { eventId: parseInt(eventId) },
        orderBy: { position: "desc" },
        select: { position: true }
      });
      const newPosition = ((lastPosition == null ? void 0 : lastPosition.position) || 0) + 1;
      const waitingListEntry = await prisma.eventWaitingList.create({
        data: {
          eventId: parseInt(eventId),
          userId,
          email,
          name,
          phone,
          position: newPosition,
          priority,
          addedAt: /* @__PURE__ */ new Date()
        }
      });
      return {
        success: true,
        entry: waitingListEntry,
        position: newPosition
      };
    }
    if (getMethod(event) === "GET") {
      const { eventId } = getQuery(event);
      if (!eventId) {
        throw createError({
          statusCode: 400,
          statusMessage: "ID do evento \xE9 obrigat\xF3rio"
        });
      }
      const waitingList = await prisma.eventWaitingList.findMany({
        where: { eventId: parseInt(eventId) },
        include: {
          user: {
            select: {
              email: true
            }
          }
        },
        orderBy: [
          { priority: "desc" },
          { position: "asc" }
        ]
      });
      return {
        success: true,
        waitingList
      };
    }
    if (getMethod(event) === "PUT") {
      const body = await readBody(event);
      const { eventId, count = 1 } = body;
      if (!eventId) {
        throw createError({
          statusCode: 400,
          statusMessage: "ID do evento \xE9 obrigat\xF3rio"
        });
      }
      const nextInLine = await prisma.eventWaitingList.findMany({
        where: { eventId: parseInt(eventId) },
        include: {
          user: {
            select: {
              email: true
            }
          }
        },
        orderBy: [
          { priority: "desc" },
          { position: "asc" }
        ],
        take: count
      });
      if (nextInLine.length === 0) {
        return {
          success: true,
          promoted: 0,
          message: "Nenhuma pessoa na fila de espera"
        };
      }
      return {
        success: true,
        promoted: nextInLine.length,
        promotedUsers: nextInLine.map((entry) => {
          var _a;
          return {
            id: entry.id,
            name: entry.name,
            email: entry.email || ((_a = entry.user) == null ? void 0 : _a.email),
            position: entry.position
          };
        })
      };
    }
    if (getMethod(event) === "DELETE") {
      const { id } = getQuery(event);
      if (!id) {
        throw createError({
          statusCode: 400,
          statusMessage: "ID da entrada \xE9 obrigat\xF3rio"
        });
      }
      await prisma.eventWaitingList.delete({
        where: { id: parseInt(id) }
      });
      return {
        success: true,
        message: "Removido da fila de espera"
      };
    }
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  } catch (error) {
    console.error("Erro na API de fila de espera:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { waitingList as default };
//# sourceMappingURL=waiting-list.mjs.map
