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
const ministries_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { parishId, isActive = true, hasLeader, minLevel } = query;
    const where = {};
    if (parishId) {
      where.parishId = parishId;
    }
    if (isActive !== void 0) {
      where.isActive = isActive === "true";
    }
    if (hasLeader !== void 0) {
      if (hasLeader === "true") {
        where.leaderId = { not: null };
      } else {
        where.leaderId = null;
      }
    }
    if (minLevel) {
      where.minLevel = minLevel;
    }
    const ministries = await prisma.ministry.findMany({
      where,
      include: {
        parish: true,
        leader: {
          include: {
            profile: true
          }
        },
        members: {
          include: {
            user: {
              include: {
                profile: true
              }
            },
            participant: true
          }
        },
        services: {
          include: {
            assignments: {
              where: {
                scheduledFor: {
                  gte: /* @__PURE__ */ new Date()
                }
              },
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
            }
          }
        },
        _count: {
          select: {
            members: true,
            services: true,
            assignments: true
          }
        }
      },
      orderBy: {
        name: "asc"
      }
    });
    return ministries;
  } catch (error) {
    console.error("Erro ao buscar minist\xE9rios:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { ministries_get as default };
//# sourceMappingURL=ministries.get.mjs.map
