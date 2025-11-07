import { d as defineEventHandler, a as getQuery, g as getHeader, c as createError, s as setHeader } from '../../../../../nitro/nitro.mjs';
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
const export_get = defineEventHandler(async (event) => {
  const { eventId, format = "csv" } = getQuery(event);
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
    if (!decoded.isAdmin && !decoded.isPriest) {
      throw createError({
        statusCode: 403,
        statusMessage: "Acesso negado"
      });
    }
    if (!eventId) {
      throw createError({
        statusCode: 400,
        statusMessage: "ID do evento \xE9 obrigat\xF3rio"
      });
    }
    const submissions = await prisma.eventFormSubmission.findMany({
      where: {
        eventId: parseInt(eventId)
      },
      include: {
        user: {
          select: {
            email: true,
            phone: true
          }
        },
        responses: {
          include: {
            field: {
              select: {
                label: true,
                type: true
              }
            }
          }
        }
      },
      orderBy: {
        submittedAt: "desc"
      }
    });
    if (format === "csv") {
      const headers = ["Nome", "Email", "Telefone", "Status", "Data de Inscri\xE7\xE3o"];
      const formFields = /* @__PURE__ */ new Set();
      submissions.forEach((submission) => {
        submission.responses.forEach((response) => {
          formFields.add(response.field.label);
        });
      });
      headers.push(...Array.from(formFields));
      let csvContent = headers.join(",") + "\n";
      submissions.forEach((submission) => {
        var _a, _b;
        const row = [
          `"${submission.participantName || ""}"`,
          `"${((_a = submission.user) == null ? void 0 : _a.email) || submission.participantEmail || ""}"`,
          `"${((_b = submission.user) == null ? void 0 : _b.phone) || submission.participantPhone || ""}"`,
          `"${submission.status}"`,
          `"${submission.submittedAt.toLocaleDateString("pt-BR")}"`
        ];
        Array.from(formFields).forEach((fieldLabel) => {
          const response = submission.responses.find((r) => r.field.label === fieldLabel);
          row.push(`"${(response == null ? void 0 : response.value) || ""}"`);
        });
        csvContent += row.join(",") + "\n";
      });
      setHeader(event, "Content-Type", "text/csv; charset=utf-8");
      setHeader(event, "Content-Disposition", `attachment; filename="inscricoes-evento-${eventId}.csv"`);
      return "\uFEFF" + csvContent;
    }
    return {
      submissions,
      total: submissions.length,
      exportedAt: /* @__PURE__ */ new Date()
    };
  } catch (error) {
    console.error("Erro ao exportar inscri\xE7\xF5es:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { export_get as default };
//# sourceMappingURL=export.get.mjs.map
