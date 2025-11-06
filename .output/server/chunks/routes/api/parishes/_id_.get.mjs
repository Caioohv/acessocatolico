import { d as defineEventHandler, g as getMethod, c as createError, b as getRouterParam } from '../../../nitro/nitro.mjs';
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
    console.log("Using mock parish data for individual parish");
    const { mockParishes } = await import('./mock-data.mjs');
    const parish = mockParishes.find((p) => p.id === parishId);
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
