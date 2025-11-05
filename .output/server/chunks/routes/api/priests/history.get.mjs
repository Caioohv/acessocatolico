import { PrismaClient } from '@prisma/client';
import { d as defineEventHandler, g as getMethod, c as createError, b as getQuery } from '../../../nitro/nitro.mjs';
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
import 'jsonwebtoken';
import '@iconify/utils';
import 'consola';
import 'better-sqlite3';
import 'ipx';

const prisma = new PrismaClient();
const history_get = defineEventHandler(async (event) => {
  try {
    if (getMethod(event) !== "GET") {
      throw createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed"
      });
    }
    const query = getQuery(event);
    const registrationId = query.registrationId;
    if (!registrationId) {
      throw createError({
        statusCode: 400,
        statusMessage: "registrationId \xE9 obrigat\xF3rio"
      });
    }
    const history = await prisma.priestApprovalHistory.findMany({
      where: { registrationId },
      orderBy: { createdAt: "desc" }
    });
    const registration = await prisma.priestRegistration.findUnique({
      where: { id: registrationId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
        statusUpdatedAt: true,
        createdAt: true
      }
    });
    if (!registration) {
      throw createError({
        statusCode: 404,
        statusMessage: "Cadastro n\xE3o encontrado"
      });
    }
    return {
      success: true,
      data: {
        registration,
        history: history.map((item) => ({
          id: item.id,
          fromStatus: item.fromStatus,
          toStatus: item.toStatus,
          comments: item.comments,
          adminEmail: item.adminEmail,
          createdAt: item.createdAt
        }))
      }
    };
  } catch (error) {
    console.error("Error fetching approval history:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { history_get as default };
//# sourceMappingURL=history.get.mjs.map
