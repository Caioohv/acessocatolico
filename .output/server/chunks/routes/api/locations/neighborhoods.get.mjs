import { d as defineEventHandler, g as getMethod, c as createError, f as getQuery } from '../../../nitro/nitro.mjs';
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
import '@prisma/client';
import 'jsonwebtoken';
import '@iconify/utils';
import 'consola';
import 'better-sqlite3';
import 'ipx';

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
    const { mockNeighborhoods } = await import('../parishes/mock-data.mjs');
    let neighborhoods = mockNeighborhoods;
    if (cityId) {
      neighborhoods = mockNeighborhoods.filter((neighborhood) => neighborhood.cityId === cityId);
    }
    return { neighborhoods };
  } catch (error) {
    console.error("Error fetching neighborhoods:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { neighborhoods_get as default };
//# sourceMappingURL=neighborhoods.get.mjs.map
