import { d as defineEventHandler, g as getMethod, c as createError, e as getRouterParam } from '../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
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
import 'node:module';
import 'better-sqlite3';
import 'ipx';

const prisma = new PrismaClient();
const _id__get = defineEventHandler(async (event) => {
  if (getMethod(event) !== "GET") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const parishId = getRouterParam(event, "id");
    if (!parishId) {
      throw createError({
        statusCode: 400,
        statusMessage: "ID da par\xF3quia \xE9 obrigat\xF3rio"
      });
    }
    const parish = await prisma.parish.findUnique({
      where: { id: parishId },
      include: {
        state: true,
        city: true,
        neighborhood: true,
        diocese: true,
        priests: {
          include: {
            user: {
              include: {
                profile: true
              }
            }
          },
          orderBy: [
            { isMain: "desc" },
            { createdAt: "asc" }
          ]
        },
        contacts: true,
        masses: {
          where: { isActive: true },
          orderBy: [
            { dayOfWeek: "asc" },
            { time: "asc" }
          ]
        },
        events: {
          where: {
            endDate: {
              gte: /* @__PURE__ */ new Date()
            }
          },
          orderBy: { startDate: "asc" },
          take: 5
        },
        ministries: {
          include: {
            _count: {
              select: {
                members: true
              }
            }
          }
        },
        _count: {
          select: {
            events: true,
            ministries: true
          }
        }
      }
    });
    if (!parish) {
      throw createError({
        statusCode: 404,
        statusMessage: "Par\xF3quia n\xE3o encontrada"
      });
    }
    return parish;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error fetching parish:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
