import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { d as defineEventHandler, b as getMethod, e as getRouterParam, c as createError, g as getHeader, r as readBody } from '../../../../nitro/nitro.mjs';
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
const form = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const eventId = getRouterParam(event, "eventId");
  if (!eventId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Event ID is required"
    });
  }
  const authHeader = getHeader(event, "authorization");
  const token = authHeader == null ? void 0 : authHeader.replace("Bearer ", "");
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Token required"
    });
  }
  let userId;
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid token"
    });
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true }
  });
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found"
    });
  }
  const eventData = await prisma.event.findUnique({
    where: { id: eventId },
    select: { organizerId: true }
  });
  if (!eventData) {
    throw createError({
      statusCode: 404,
      statusMessage: "Event not found"
    });
  }
  const canManage = user.role === "ADMIN" || user.role === "PRIEST" || eventData.organizerId === userId;
  if (!canManage) {
    throw createError({
      statusCode: 403,
      statusMessage: "Permission denied"
    });
  }
  if (method === "GET") {
    const form = await prisma.eventForm.findUnique({
      where: { eventId },
      include: {
        fields: {
          orderBy: { order: "asc" }
        },
        submissions: {
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
                field: true
              }
            }
          }
        }
      }
    });
    return form;
  }
  if (method === "POST") {
    const body = await readBody(event);
    const { title, description, isActive, allowMultipleSubmissions, requiresApproval, opensAt, closesAt } = body;
    const form = await prisma.eventForm.create({
      data: {
        eventId,
        title: title || "Formul\xE1rio de Inscri\xE7\xE3o",
        description,
        isActive: isActive != null ? isActive : true,
        allowMultipleSubmissions: allowMultipleSubmissions != null ? allowMultipleSubmissions : false,
        requiresApproval: requiresApproval != null ? requiresApproval : false,
        opensAt: opensAt ? new Date(opensAt) : null,
        closesAt: closesAt ? new Date(closesAt) : null
      },
      include: {
        fields: {
          orderBy: { order: "asc" }
        }
      }
    });
    return form;
  }
  if (method === "PUT") {
    const body = await readBody(event);
    const { title, description, isActive, allowMultipleSubmissions, requiresApproval, opensAt, closesAt } = body;
    const form = await prisma.eventForm.update({
      where: { eventId },
      data: {
        title,
        description,
        isActive,
        allowMultipleSubmissions,
        requiresApproval,
        opensAt: opensAt ? new Date(opensAt) : null,
        closesAt: closesAt ? new Date(closesAt) : null
      },
      include: {
        fields: {
          orderBy: { order: "asc" }
        }
      }
    });
    return form;
  }
  if (method === "DELETE") {
    await prisma.eventForm.delete({
      where: { eventId }
    });
    return { success: true };
  }
  throw createError({
    statusCode: 405,
    statusMessage: "Method not allowed"
  });
});

export { form as default };
//# sourceMappingURL=form.mjs.map
