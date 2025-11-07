import { d as defineEventHandler, b as getMethod, c as createError } from '../../../nitro/nitro.mjs';
import 'bcryptjs';
import '@prisma/client';
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

const dioceses_get = defineEventHandler(async (event) => {
  if (getMethod(event) !== "GET") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const { mockDioceses } = await import('../parishes/mock-data.mjs');
    return { dioceses: mockDioceses };
  } catch (error) {
    console.error("Error fetching dioceses:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { dioceses_get as default };
//# sourceMappingURL=dioceses.get.mjs.map
