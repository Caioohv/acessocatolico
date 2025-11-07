import { PrismaClient } from '@prisma/client';
import { d as defineEventHandler, b as getMethod, c as createError, a as getQuery } from '../../nitro/nitro.mjs';
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
const index_get = defineEventHandler(async (event) => {
  if (getMethod(event) !== "GET") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const query = getQuery(event);
    const {
      page = "1",
      limit = "10",
      status,
      search
    } = query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    const where = {};
    if (status) {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
        { cpf: { contains: search } },
        { ordinationNumber: { contains: search } }
      ];
    }
    const [registrations, total] = await Promise.all([
      prisma.priestRegistration.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: "desc" },
        include: {
          ordinationDiocese: true,
          documents: {
            select: {
              id: true,
              type: true,
              status: true,
              uploadedAt: true
            }
          },
          approvalHistory: {
            orderBy: { createdAt: "desc" },
            take: 1,
            select: {
              fromStatus: true,
              toStatus: true,
              comments: true,
              createdAt: true,
              adminEmail: true
            }
          }
        }
      }),
      prisma.priestRegistration.count({ where })
    ]);
    const totalPages = Math.ceil(total / limitNum);
    return {
      success: true,
      data: {
        registrations: registrations.map((reg) => ({
          id: reg.id,
          firstName: reg.firstName,
          lastName: reg.lastName,
          email: reg.email,
          phone: reg.phone,
          cpf: reg.cpf,
          ordinationNumber: reg.ordinationNumber,
          ordinationDate: reg.ordinationDate,
          ordinationDiocese: reg.ordinationDiocese,
          status: reg.status,
          statusUpdatedAt: reg.statusUpdatedAt,
          emailVerified: reg.emailVerified,
          createdAt: reg.createdAt,
          updatedAt: reg.updatedAt,
          documentsCount: reg.documents.length,
          lastAction: reg.approvalHistory[0] || null
        })),
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1
        }
      }
    };
  } catch (error) {
    console.error("Error fetching priest registrations:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
