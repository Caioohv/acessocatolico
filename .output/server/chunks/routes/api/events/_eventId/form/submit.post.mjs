import { PrismaClient } from '@prisma/client';
import { d as defineEventHandler, b as getMethod, c as createError, h as getRouterParam, r as readBody, g as getHeader } from '../../../../../nitro/nitro.mjs';
import { verify } from 'jsonwebtoken';
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
const submit_post = defineEventHandler(async (event) => {
  const method = getMethod(event);
  if (method !== "POST") throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  const eventId = getRouterParam(event, "eventId");
  if (!eventId) throw createError({ statusCode: 400, statusMessage: "Event ID required" });
  const body = await readBody(event);
  const { data, userInfo } = body;
  const form = await prisma.eventForm.findUnique({
    where: { eventId },
    include: {
      fields: {
        orderBy: { order: "asc" }
      }
    }
  });
  if (!form) throw createError({ statusCode: 404, statusMessage: "Form not found" });
  const now = /* @__PURE__ */ new Date();
  if (form.opensAt && now < form.opensAt) throw createError({ statusCode: 400, statusMessage: "Form not open yet" });
  if (form.closesAt && now > form.closesAt) throw createError({ statusCode: 400, statusMessage: "Form closed" });
  const errors = {};
  for (const field of form.fields) {
    if (field.isRequired) {
      const value = data[field.name];
      if (value === void 0 || value === null || value === "") {
        errors[field.name] = `${field.label} \xE9 obrigat\xF3rio`;
      }
    }
  }
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }
  const authHeader = getHeader(event, "authorization");
  const token = authHeader == null ? void 0 : authHeader.replace("Bearer ", "");
  let userId = null;
  if (token) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET);
      if (decoded == null ? void 0 : decoded.userId) userId = decoded.userId;
    } catch (err) {
    }
  }
  if (!form.allowMultipleSubmissions && !userId && !(userInfo == null ? void 0 : userInfo.email)) {
    throw createError({ statusCode: 403, statusMessage: "Authentication required or provide email" });
  }
  const submission = await prisma.eventFormSubmission.create({
    data: {
      formId: form.id,
      userId: userId != null ? userId : void 0,
      email: userInfo == null ? void 0 : userInfo.email,
      name: userInfo == null ? void 0 : userInfo.name,
      phone: userInfo == null ? void 0 : userInfo.phone,
      status: form.requiresApproval ? "PENDING" : "APPROVED"
    }
  });
  for (const field of form.fields) {
    const value = data[field.name];
    if (value === void 0) continue;
    await prisma.eventFormResponse.create({
      data: {
        submissionId: submission.id,
        fieldId: field.id,
        value: typeof value === "object" ? value : value
      }
    });
  }
  return { status: "ok", submissionId: submission.id };
});

export { submit_post as default };
//# sourceMappingURL=submit.post.mjs.map
