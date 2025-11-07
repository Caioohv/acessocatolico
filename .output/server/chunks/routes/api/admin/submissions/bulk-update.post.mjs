import { d as defineEventHandler, r as readBody, g as getHeader, c as createError } from '../../../../nitro/nitro.mjs';
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
const bulkUpdate_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { submissionIds, status, reason } = body;
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
    if (!submissionIds || !Array.isArray(submissionIds) || submissionIds.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "IDs de inscri\xE7\xF5es s\xE3o obrigat\xF3rios"
      });
    }
    if (!status || !["APPROVED", "REJECTED", "PENDING", "CANCELLED"].includes(status)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Status inv\xE1lido"
      });
    }
    const updatedSubmissions = await prisma.eventFormSubmission.updateMany({
      where: {
        id: {
          in: submissionIds
        }
      },
      data: {
        status,
        approvedBy: status === "APPROVED" ? decoded.userId : null,
        approvedAt: status === "APPROVED" ? /* @__PURE__ */ new Date() : null,
        rejectedReason: status === "REJECTED" ? reason : null
      }
    });
    const submissions = await prisma.eventFormSubmission.findMany({
      where: {
        id: {
          in: submissionIds
        }
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        },
        form: {
          select: {
            event: {
              select: {
                id: true,
                title: true,
                slug: true
              }
            }
          }
        }
      }
    });
    return {
      success: true,
      updated: updatedSubmissions.count,
      submissions
    };
  } catch (error) {
    console.error("Erro ao atualizar status das inscri\xE7\xF5es:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { bulkUpdate_post as default };
//# sourceMappingURL=bulk-update.post.mjs.map
