import { d as defineEventHandler, g as getMethod, c as createError, b as getQuery } from '../../../nitro/nitro.mjs';
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
const cities_get = defineEventHandler(async (event) => {
  if (getMethod(event) !== "GET") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const query = getQuery(event);
    const { stateId } = query;
    if (!stateId) {
      throw createError({
        statusCode: 400,
        statusMessage: "stateId \xE9 obrigat\xF3rio"
      });
    }
    const cities = await prisma.city.findMany({
      where: { stateId },
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: {
            parishes: true
          }
        }
      }
    });
    return { cities };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error fetching cities:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { cities_get as default };
//# sourceMappingURL=cities.get.mjs.map
