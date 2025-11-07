import { d as defineEventHandler, a as getQuery, g as getHeader, c as createError } from '../../../nitro/nitro.mjs';
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
const submissions_get = defineEventHandler(async (event) => {
  const { eventId, status, search, page = 1, limit = 50 } = getQuery(event);
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
    const where = {};
    if (eventId) {
      where.eventId = parseInt(eventId);
    }
    if (status && status !== "all") {
      where.status = status;
    }
    if (search) {
      where.OR = [
        {
          user: {
            email: {
              contains: search,
              mode: "insensitive"
            }
          }
        },
        {
          user: {
            firstName: {
              contains: search,
              mode: "insensitive"
            }
          }
        },
        {
          user: {
            lastName: {
              contains: search,
              mode: "insensitive"
            }
          }
        }
      ];
    }
    const total = await prisma.eventFormSubmission.count({ where });
    const submissionData = await prisma.eventFormSubmission.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true
          }
        },
        event: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        }
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: {
        submittedAt: "desc"
      }
    });
    return {
      submissions: submissionData,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    };
  } catch (error) {
    console.error("Erro na API de inscri\xE7\xF5es:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { submissions_get as default };
//# sourceMappingURL=submissions.get.mjs.map
