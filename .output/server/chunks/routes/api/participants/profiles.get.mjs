import { d as defineEventHandler, a as getQuery, c as createError } from '../../../nitro/nitro.mjs';
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
const profiles_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { page = 1, limit = 20, level, role, search } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const where = {};
    if (level) {
      where.level = level;
    }
    if (role) {
      where.role = role;
    }
    if (search) {
      where.OR = [
        {
          user: {
            profile: {
              OR: [
                { firstName: { contains: search } },
                { lastName: { contains: search } }
              ]
            }
          }
        },
        { bio: { contains: search } }
      ];
    }
    const [profiles, total] = await Promise.all([
      prisma.participantProfile.findMany({
        where,
        skip,
        take,
        include: {
          user: {
            include: {
              profile: true
            }
          },
          badges: {
            include: {
              badge: true
            }
          },
          ministryMembers: {
            include: {
              ministry: true
            }
          },
          _count: {
            select: {
              history: true,
              assignments: true
            }
          }
        },
        orderBy: [
          { points: "desc" },
          { totalHours: "desc" },
          { joinedAt: "asc" }
        ]
      }),
      prisma.participantProfile.count({ where })
    ]);
    return {
      data: profiles,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    };
  } catch (error) {
    console.error("Erro ao buscar perfis de participantes:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { profiles_get as default };
//# sourceMappingURL=profiles.get.mjs.map
