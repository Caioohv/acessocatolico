import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { d as defineEventHandler, b as getMethod, c as createError, e as getRouterParam, g as getHeader, a as getQuery, s as setHeader } from '../../../../../nitro/nitro.mjs';
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
const export_get = defineEventHandler(async (event) => {
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
    select: { organizerId: true, title: true }
  });
  if (!eventData) throw createError({ statusCode: 404, statusMessage: "Event not found" });
  const canManage = user.role === "ADMIN" || user.role === "PRIEST" || eventData.organizerId === userId;
  if (!canManage) throw createError({ statusCode: 403, statusMessage: "Permission denied" });
  const query = getQuery(event);
  const format = query.format || "csv";
  if (!["csv", "xlsx"].includes(format)) {
    throw createError({ statusCode: 400, statusMessage: "Format must be csv or xlsx" });
  }
  const form = await prisma.eventForm.findUnique({
    where: { eventId },
    include: {
      fields: {
        orderBy: { order: "asc" }
      },
      submissions: {
        where: { status: { in: ["APPROVED", "PENDING"] } },
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
        },
        orderBy: { submittedAt: "desc" }
      }
    }
  });
  if (!form) throw createError({ statusCode: 404, statusMessage: "Event form not found" });
  const headers = [
    "Nome",
    "Email",
    "Status",
    "Data de Inscri\xE7\xE3o",
    ...form.fields.map((field) => field.label)
  ];
  const rows = form.submissions.map((submission) => {
    var _a, _b, _c;
    const responseMap = new Map(
      submission.responses.map((r) => [r.field.name, r.value])
    );
    const userName = submission.user ? `${((_a = submission.user.profile) == null ? void 0 : _a.firstName) || ""} ${((_b = submission.user.profile) == null ? void 0 : _b.lastName) || ""}`.trim() : submission.name || "N/A";
    return [
      userName,
      submission.email || ((_c = submission.user) == null ? void 0 : _c.email) || "N/A",
      submission.status,
      submission.submittedAt.toLocaleDateString("pt-BR"),
      ...form.fields.map((field) => {
        const value = responseMap.get(field.name);
        if (value === null || value === void 0) return "";
        if (typeof value === "object") {
          return Array.isArray(value) ? value.join(", ") : JSON.stringify(value);
        }
        return String(value);
      })
    ];
  });
  if (format === "csv") {
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map(
        (cell) => typeof cell === "string" && cell.includes(",") ? `"${cell.replace(/"/g, '""')}"` : cell
      ).join(","))
    ].join("\n");
    setHeader(event, "Content-Type", "text/csv; charset=utf-8");
    setHeader(event, "Content-Disposition", `attachment; filename="inscricoes-${eventData.title.replace(/[^a-zA-Z0-9]/g, "-")}.csv"`);
    return "\uFEFF" + csvContent;
  }
  throw createError({
    statusCode: 501,
    statusMessage: "XLSX format not implemented yet. Use CSV format."
  });
});

export { export_get as default };
//# sourceMappingURL=export.get.mjs.map
