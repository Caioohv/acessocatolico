import { d as defineEventHandler, a as getQuery, g as getHeader, c as createError, s as setHeader } from '../../../../nitro/nitro.mjs';
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
  const { eventId, format = "csv", status, search } = getQuery(event);
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
    const where = {};
    if (eventId) {
      where.form = {
        eventId
      };
    }
    if (status && status !== "all") {
      where.status = status;
    }
    if (search) {
      where.OR = [
        {
          user: {
            email: {
              contains: search,
              mode: "insensitive"
            }
          }
        },
        {
          user: {
            profile: {
              firstName: {
                contains: search,
                mode: "insensitive"
              }
            }
          }
        },
        {
          user: {
            profile: {
              lastName: {
                contains: search,
                mode: "insensitive"
              }
            }
          }
        }
      ];
    }
    const submissions = await prisma.eventFormSubmission.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                firstName: true,
                lastName: true,
                phone: true
              }
            }
          }
        },
        form: {
          select: {
            event: {
              select: {
                id: true,
                title: true,
                slug: true
              }
            },
            fields: {
              select: {
                id: true,
                label: true,
                type: true,
                required: true
              },
              orderBy: {
                order: "asc"
              }
            }
          }
        },
        responses: {
          include: {
            field: {
              select: {
                id: true,
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
    const exportData = submissions.map((submission) => {
      var _a, _b, _c, _d, _e, _f, _g;
      const baseData = {
        "ID": submission.id,
        "Nome": ((_b = (_a = submission.user) == null ? void 0 : _a.profile) == null ? void 0 : _b.firstName) + " " + ((_d = (_c = submission.user) == null ? void 0 : _c.profile) == null ? void 0 : _d.lastName) || submission.name || "N/A",
        "Email": ((_e = submission.user) == null ? void 0 : _e.email) || submission.email || "N/A",
        "Telefone": ((_g = (_f = submission.user) == null ? void 0 : _f.profile) == null ? void 0 : _g.phone) || submission.phone || "N/A",
        "Status": getStatusLabel(submission.status),
        "Data de Inscri\xE7\xE3o": formatDate(submission.submittedAt),
        "\xDAltima Atualiza\xE7\xE3o": formatDate(submission.updatedAt)
      };
      submission.responses.forEach((response) => {
        baseData[response.field.label] = formatResponseValue(response.value, response.field.type);
      });
      return baseData;
    });
    if (format === "csv") {
      const csv = generateCSV(exportData);
      setHeader(event, "Content-Type", "text/csv");
      setHeader(event, "Content-Disposition", `attachment; filename="inscricoes-${eventId || "all"}-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv"`);
      return csv;
    } else if (format === "json") {
      return {
        data: exportData,
        total: submissions.length,
        exportedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  } catch (error) {
    console.error("Erro ao exportar inscri\xE7\xF5es:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});
function getStatusLabel(status) {
  const statusMap = {
    "PENDING": "Pendente",
    "APPROVED": "Aprovada",
    "REJECTED": "Rejeitada",
    "INCOMPLETE": "Incompleta"
  };
  return statusMap[status] || status;
}
function formatDate(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(date));
}
function formatResponseValue(value, fieldType) {
  if (value === null || value === void 0) return "N/A";
  if (typeof value === "object") {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    return JSON.stringify(value);
  }
  return String(value);
}
function generateCSV(data) {
  if (data.length === 0) return "";
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map(
      (row) => headers.map((header) => {
        const value = row[header] || "";
        if (value.includes(",") || value.includes('"') || value.includes("\n")) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(",")
    )
  ].join("\n");
  return csvContent;
}

export { export_get as default };
//# sourceMappingURL=export.get.mjs.map
