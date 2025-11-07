import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { d as defineEventHandler, b as getMethod, h as getRouterParam, c as createError, g as getHeader } from '../../../../nitro/nitro.mjs';
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
const _submissionId_ = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const submissionId = getRouterParam(event, "submissionId");
  if (!submissionId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Submission ID is required"
    });
  }
  if (method === "GET") {
    const submission = await prisma.eventFormSubmission.findUnique({
      where: { id: submissionId },
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
        },
        form: {
          include: {
            event: {
              select: {
                id: true,
                title: true,
                organizerId: true
              }
            }
          }
        }
      }
    });
    if (!submission) {
      throw createError({
        statusCode: 404,
        statusMessage: "Submission not found"
      });
    }
    const authHeader = getHeader(event, "authorization");
    const token = authHeader == null ? void 0 : authHeader.replace("Bearer ", "");
    let userId = null;
    if (token) {
      try {
        const decoded = verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
        const user = await prisma.user.findUnique({ where: { id: userId } });
        const canAccess = submission.userId === userId || submission.form.event.organizerId === userId || user && ["ADMIN", "PRIEST"].includes(user.role);
        if (!canAccess) {
          throw createError({
            statusCode: 403,
            statusMessage: "Access denied"
          });
        }
      } catch (error) {
        throw createError({
          statusCode: 401,
          statusMessage: "Invalid token"
        });
      }
    } else {
      if (submission.userId) {
        throw createError({
          statusCode: 401,
          statusMessage: "Authentication required"
        });
      }
    }
    return submission;
  }
  if (method === "DELETE") {
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
    const canDelete = user.role === "ADMIN" || user.role === "PRIEST" || submission.form.event.organizerId === userId;
    if (!canDelete) throw createError({ statusCode: 403, statusMessage: "Permission denied" });
    await prisma.eventFormSubmission.delete({
      where: { id: submissionId }
    });
    return { success: true };
  }
  throw createError({
    statusCode: 405,
    statusMessage: "Method not allowed"
  });
});

export { _submissionId_ as default };
//# sourceMappingURL=_submissionId_.mjs.map
