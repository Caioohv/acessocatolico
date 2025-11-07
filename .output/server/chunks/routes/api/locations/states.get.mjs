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

const states_get = defineEventHandler(async (event) => {
  if (getMethod(event) !== "GET") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const { mockStates } = await import('../parishes/mock-data.mjs');
    return { states: mockStates };
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
