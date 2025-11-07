import { d as defineEventHandler, b as getMethod, c as createError, a as getQuery } from '../../../nitro/nitro.mjs';
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
    const { mockCities } = await import('../parishes/mock-data.mjs');
    let cities = mockCities;
    if (stateId) {
      cities = mockCities.filter((city) => city.stateId === stateId);
    }
    return { cities };
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { cities_get as default };
//# sourceMappingURL=cities.get.mjs.map
