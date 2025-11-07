import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { d as defineEventHandler, b as getMethod, c as createError, h as getRouterParam, g as getHeader, r as readBody } from '../../../../../nitro/nitro.mjs';
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
const reorder_put = defineEventHandler(async (event) => {
  const method = getMethod(event);
  if (method !== "PUT") throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  const formId = getRouterParam(event, "formId");
  if (!formId) throw createError({ statusCode: 400, statusMessage: "Form ID required" });
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
  const form = await prisma.eventForm.findUnique({
    where: { id: formId },
    include: { event: { select: { organizerId: true } } }
  });
  if (!form) throw createError({ statusCode: 404, statusMessage: "Form not found" });
  const canManage = user.role === "ADMIN" || user.role === "PRIEST" || form.event.organizerId === userId;
  if (!canManage) throw createError({ statusCode: 403, statusMessage: "Permission denied" });
  const body = await readBody(event);
  const { fieldOrders } = body;
  if (!fieldOrders || !Array.isArray(fieldOrders)) {
    throw createError({ statusCode: 400, statusMessage: "fieldOrders array is required" });
  }
  await prisma.$transaction(
    fieldOrders.map(
      ({ id, order }) => prisma.eventFormField.update({
        where: { id, formId },
        // Ensure field belongs to this form
        data: { order }
      })
    )
  );
  const updatedFields = await prisma.eventFormField.findMany({
    where: { formId },
    orderBy: { order: "asc" }
  });
  return updatedFields;
});

export { reorder_put as default };
//# sourceMappingURL=reorder.put.mjs.map
