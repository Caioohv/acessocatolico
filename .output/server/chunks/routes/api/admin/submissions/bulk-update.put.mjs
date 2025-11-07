import { d as defineEventHandler, b as getMethod, c as createError, g as getHeader, r as readBody } from '../../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
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
import '@iconify/utils';
import 'consola';
import 'better-sqlite3';
import 'ipx';

const prisma = new PrismaClient();
const bulkUpdate_put = defineEventHandler(async (event) => {
  if (getMethod(event) !== "PUT") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  try {
    const authHeader = getHeader(event, "authorization");
    if (!(authHeader == null ? void 0 : authHeader.startsWith("Bearer "))) {
      throw createError({
        statusCode: 401,
        statusMessage: "Token de acesso requerido"
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin && !decoded.isPriest) {
      throw createError({
        statusCode: 403,
        statusMessage: "Acesso negado"
      });
    }
    const body = await readBody(event);
    const { submissionIds, status, reason } = body;
    if (!submissionIds || !Array.isArray(submissionIds) || submissionIds.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "IDs das inscri\xE7\xF5es s\xE3o obrigat\xF3rios"
      });
    }
    if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Status inv\xE1lido"
      });
    }
    const updatedSubmissions = await prisma.eventFormSubmission.updateMany({
      where: {
        id: {
          in: submissionIds.map((id) => parseInt(id))
        }
      },
      data: {
        status,
        updatedAt: /* @__PURE__ */ new Date(),
        ...reason && { adminNotes: reason }
      }
    });
    const submissions = await prisma.eventFormSubmission.findMany({
      where: {
        id: {
          in: submissionIds.map((id) => parseInt(id))
        }
      },
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true
          }
        },
        event: {
          select: {
            title: true,
            slug: true
          }
        }
      }
    });
    return {
      success: true,
      updated: updatedSubmissions.count,
      message: `${updatedSubmissions.count} inscri\xE7\xF5es atualizadas`
    };
  } catch (error) {
    console.error("Erro ao atualizar status das inscri\xE7\xF5es:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { bulkUpdate_put as default };
//# sourceMappingURL=bulk-update.put.mjs.map
