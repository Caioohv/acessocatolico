import { d as defineEventHandler, a as getQuery, c as createError } from '../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
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
const badges_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { page = 1, limit = 20, type, isActive = true } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const where = {};
    if (type) {
      where.type = type;
    }
    if (isActive !== void 0) {
      where.isActive = isActive === "true";
    }
    const [badges, total] = await Promise.all([
      prisma.badge.findMany({
        where,
        skip,
        take,
        include: {
          participants: {
            include: {
              participant: {
                include: {
                  user: {
                    include: {
                      profile: true
                    }
                  }
                }
              }
            }
          },
          _count: {
            select: {
              participants: true
            }
          }
        },
        orderBy: {
          name: "asc"
        }
      }),
      prisma.badge.count({ where })
    ]);
    return {
      data: badges,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    };
  } catch (error) {
    console.error("Erro ao buscar badges:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { badges_get as default };
//# sourceMappingURL=badges.get.mjs.map
