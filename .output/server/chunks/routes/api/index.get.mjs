import { d as defineEventHandler, g as getMethod, c as createError, b as getQuery } from '../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
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
import 'node:module';
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
      limit = "12",
      search,
      stateId,
      cityId,
      neighborhoodId,
      dioceseId
    } = query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } }
      ];
    }
    if (stateId) where.stateId = stateId;
    if (cityId) where.cityId = cityId;
    if (neighborhoodId) where.neighborhoodId = neighborhoodId;
    if (dioceseId) where.dioceseId = dioceseId;
    const [parishes, total] = await Promise.all([
      prisma.parish.findMany({
        where,
        include: {
          state: true,
          city: true,
          neighborhood: true,
          diocese: true,
          priests: {
            include: {
              user: {
                include: {
                  profile: true
                }
              }
            },
            where: {
              isMain: true
            },
            take: 1
          },
          contacts: true,
          masses: {
            orderBy: [
              { dayOfWeek: "asc" },
              { time: "asc" }
            ]
          },
          _count: {
            select: {
              events: true,
              ministries: true
            }
          }
        },
        orderBy: [
          { name: "asc" }
        ],
        skip,
        take: limitNum
      }),
      prisma.parish.count({ where })
    ]);
    const totalPages = Math.ceil(total / limitNum);
    const hasNext = pageNum < totalPages;
    const hasPrev = pageNum > 1;
    return {
      parishes,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasNext,
        hasPrev
      }
    };
  } catch (error) {
    console.error("Error fetching parishes:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
