import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { d as defineEventHandler, b as getMethod, h as getRouterParam, c as createError, g as getHeader, r as readBody } from '../../../../nitro/nitro.mjs';
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
const fields = defineEventHandler(async (event) => {
  var _a;
  const method = getMethod(event);
  const formId = getRouterParam(event, "formId");
  if (!formId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Form ID is required"
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
  const form = await prisma.eventForm.findUnique({
    where: { id: formId },
    include: {
      event: {
        select: { organizerId: true }
      }
    }
  });
  if (!form) {
    throw createError({
      statusCode: 404,
      statusMessage: "Form not found"
    });
  }
  const canManage = user.role === "ADMIN" || user.role === "PRIEST" || form.event.organizerId === userId;
  if (!canManage) {
    throw createError({
      statusCode: 403,
      statusMessage: "Permission denied"
    });
  }
  if (method === "POST") {
    const body = await readBody(event);
    const {
      type,
      name,
      label,
      placeholder,
      helpText,
      isRequired,
      minLength,
      maxLength,
      pattern,
      options,
      showIfField,
      showIfValue,
      order,
      group
    } = body;
    if (!type || !name || !label) {
      throw createError({
        statusCode: 400,
        statusMessage: "Type, name, and label are required"
      });
    }
    const maxOrderField = await prisma.eventFormField.findFirst({
      where: { formId },
      orderBy: { order: "desc" },
      select: { order: true }
    });
    const nextOrder = order != null ? order : ((_a = maxOrderField == null ? void 0 : maxOrderField.order) != null ? _a : 0) + 1;
    const field = await prisma.eventFormField.create({
      data: {
        formId,
        type,
        name,
        label,
        placeholder,
        helpText,
        isRequired: isRequired != null ? isRequired : false,
        minLength,
        maxLength,
        pattern,
        options: options ? options : null,
        showIfField,
        showIfValue,
        order: nextOrder,
        group
      }
    });
    return field;
  }
  throw createError({
    statusCode: 405,
    statusMessage: "Method not allowed"
  });
});

export { fields as default };
//# sourceMappingURL=fields.mjs.map
