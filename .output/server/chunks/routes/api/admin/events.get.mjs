import { d as defineEventHandler, g as getHeader, c as createError, a as getQuery } from '../../../nitro/nitro.mjs';
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
const events_get = defineEventHandler(async (event) => {
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
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { profile: true }
    });
    if (!user || !["ADMIN", "PRIEST"].includes(user.role)) {
      throw createError({
        statusCode: 403,
        statusMessage: "Acesso negado"
      });
    }
    const query = getQuery(event);
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const search = query.search || "";
    const status = query.status || "";
    const formStatus = query.formStatus || "";
    const skip = (page - 1) * limit;
    const where = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } }
      ];
    }
    if (status) {
      where.status = status;
    }
    if (formStatus) {
      switch (formStatus) {
        case "with_form":
          where.form = { isNot: null };
          break;
        case "without_form":
          where.form = null;
          break;
        case "active_form":
          where.form = { isActive: true };
          break;
        case "inactive_form":
          where.form = { isActive: false };
          break;
      }
    }
    if (user.role === "PRIEST") {
      where.organizerId = user.id;
    }
    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          organizer: {
            select: {
              id: true,
              role: true,
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
              id: true,
              title: true,
              isActive: true,
              opensAt: true,
              closesAt: true,
              _count: {
                select: {
                  submissions: true
                }
              }
            }
          },
          _count: {
            select: {
              registrations: true
            }
          }
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit
      }),
      prisma.event.count({ where })
    ]);
    return {
      success: true,
      data: {
        events,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error("Error fetching admin events:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { events_get as default };
//# sourceMappingURL=events.get.mjs.map
