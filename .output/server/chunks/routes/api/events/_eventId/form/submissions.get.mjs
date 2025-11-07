import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { d as defineEventHandler, b as getMethod, c as createError, e as getRouterParam, g as getHeader, a as getQuery } from '../../../../../nitro/nitro.mjs';
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
  const method = getMethod(event);
  if (method !== "GET") throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  const eventId = getRouterParam(event, "eventId");
  if (!eventId) throw createError({ statusCode: 400, statusMessage: "Event ID required" });
  const authHeader = getHeader(event, "authorization");
  const token = authHeader == null ? void 0 : authHeader.replace("Bearer ", "");
  if (!token) throw createError({ statusCode: 401, statusMessage: "Token required" });
  let userId;
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: "Invalid token" });
  }
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw createError({ statusCode: 404, statusMessage: "User not found" });
  const eventData = await prisma.event.findUnique({
    where: { id: eventId },
    select: { organizerId: true }
  });
  if (!eventData) throw createError({ statusCode: 404, statusMessage: "Event not found" });
  const canManage = user.role === "ADMIN" || user.role === "PRIEST" || eventData.organizerId === userId;
  if (!canManage) throw createError({ statusCode: 403, statusMessage: "Permission denied" });
  const query = getQuery(event);
  const page = parseInt(query.page) || 1;
  const limit = Math.min(parseInt(query.limit) || 20, 100);
  const status = query.status;
  const search = query.search;
  const skip = (page - 1) * limit;
  const whereClause = {
    form: {
      eventId
    }
  };
  if (status && ["PENDING", "APPROVED", "REJECTED", "INCOMPLETE"].includes(status)) {
    whereClause.status = status;
  }
  if (search) {
    whereClause.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { user: { profile: { firstName: { contains: search, mode: "insensitive" } } } },
      { user: { profile: { lastName: { contains: search, mode: "insensitive" } } } }
    ];
  }
  const [submissions, total] = await Promise.all([
    prisma.eventFormSubmission.findMany({
      where: whereClause,
      include: {
        user: {
          include: {
            profile: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        },
        responses: {
          include: {
            field: {
              select: {
                id: true,
                name: true,
                label: true,
                type: true
              }
            }
          }
        }
      },
      orderBy: { submittedAt: "desc" },
      skip,
      take: limit
    }),
    prisma.eventFormSubmission.count({ where: whereClause })
  ]);
  const totalPages = Math.ceil(total / limit);
  return {
    submissions,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      limit,
      hasMore: page < totalPages
    }
  };
});

export { submissions_get as default };
//# sourceMappingURL=submissions.get.mjs.map
