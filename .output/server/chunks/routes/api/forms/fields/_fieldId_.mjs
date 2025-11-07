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
const _fieldId_ = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const fieldId = getRouterParam(event, "fieldId");
  if (!fieldId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Field ID is required"
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
  const field = await prisma.eventFormField.findUnique({
    where: { id: fieldId },
    include: {
      form: {
        include: {
          event: {
            select: { organizerId: true }
          }
        }
      }
    }
  });
  if (!field) {
    throw createError({
      statusCode: 404,
      statusMessage: "Field not found"
    });
  }
  const canManage = user.role === "ADMIN" || user.role === "PRIEST" || field.form.event.organizerId === userId;
  if (!canManage) {
    throw createError({
      statusCode: 403,
      statusMessage: "Permission denied"
    });
  }
  if (method === "GET") {
    return field;
  }
  if (method === "PUT") {
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
    const updatedField = await prisma.eventFormField.update({
      where: { id: fieldId },
      data: {
        type: type != null ? type : field.type,
        name: name != null ? name : field.name,
        label: label != null ? label : field.label,
        placeholder,
        helpText,
        isRequired: isRequired != null ? isRequired : field.isRequired,
        minLength,
        maxLength,
        pattern,
        options: options ? options : field.options,
        showIfField,
        showIfValue,
        order: order != null ? order : field.order,
        group
      }
    });
    return updatedField;
  }
  if (method === "DELETE") {
    await prisma.eventFormField.delete({
      where: { id: fieldId }
    });
    return { success: true };
  }
  throw createError({
    statusCode: 405,
    statusMessage: "Method not allowed"
  });
});

export { _fieldId_ as default };
//# sourceMappingURL=_fieldId_.mjs.map
