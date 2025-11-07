import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { d as defineEventHandler, b as getMethod, c as createError, e as getRouterParam, g as getHeader, r as readBody } from '../../../../../nitro/nitro.mjs';
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
const status_put = defineEventHandler(async (event) => {
  const method = getMethod(event);
  if (method !== "PUT") throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  const submissionId = getRouterParam(event, "submissionId");
  if (!submissionId) throw createError({ statusCode: 400, statusMessage: "Submission ID required" });
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
  const submission = await prisma.eventFormSubmission.findUnique({
    where: { id: submissionId },
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
  if (!submission) throw createError({ statusCode: 404, statusMessage: "Submission not found" });
  const canManage = user.role === "ADMIN" || user.role === "PRIEST" || submission.form.event.organizerId === userId;
  if (!canManage) throw createError({ statusCode: 403, statusMessage: "Permission denied" });
  const body = await readBody(event);
  const { status, rejectedReason } = body;
  if (!["PENDING", "APPROVED", "REJECTED", "INCOMPLETE"].includes(status)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid status" });
  }
  if (status === "REJECTED" && !rejectedReason) {
    throw createError({ statusCode: 400, statusMessage: "Rejected reason is required when rejecting" });
  }
  const updatedSubmission = await prisma.eventFormSubmission.update({
    where: { id: submissionId },
    data: {
      status,
      rejectedReason: status === "REJECTED" ? rejectedReason : null,
      approvedBy: ["APPROVED", "REJECTED"].includes(status) ? userId : null,
      approvedAt: ["APPROVED", "REJECTED"].includes(status) ? /* @__PURE__ */ new Date() : null
    },
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
      }
    }
  });
  return updatedSubmission;
});

export { status_put as default };
//# sourceMappingURL=status.put.mjs.map
