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
const neighborhoods_get = defineEventHandler(async (event) => {
  if (getMethod(event) !== "GET") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const query = getQuery(event);
    const { cityId } = query;
    if (!cityId) {
      throw createError({
        statusCode: 400,
        statusMessage: "cityId \xE9 obrigat\xF3rio"
      });
    }
    const neighborhoods = await prisma.neighborhood.findMany({
      where: { cityId },
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: {
            parishes: true
          }
        }
      }
    });
    return { neighborhoods };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error fetching neighborhoods:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { neighborhoods_get as default };
//# sourceMappingURL=neighborhoods.get.mjs.map
