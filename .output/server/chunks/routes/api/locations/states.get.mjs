import { d as defineEventHandler, g as getMethod, c as createError } from '../../../nitro/nitro.mjs';
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
const states_get = defineEventHandler(async (event) => {
  if (getMethod(event) !== "GET") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const states = await prisma.state.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: {
            parishes: true
          }
        }
      }
    });
    return { states };
  } catch (error) {
    console.error("Error fetching states:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { states_get as default };
//# sourceMappingURL=states.get.mjs.map
