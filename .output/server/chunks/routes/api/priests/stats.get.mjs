import { PrismaClient } from '@prisma/client';
import { d as defineEventHandler, g as getMethod, c as createError } from '../../../nitro/nitro.mjs';
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
import 'jsonwebtoken';
import '@iconify/utils';
import 'consola';
import 'better-sqlite3';
import 'ipx';

const prisma = new PrismaClient();
const stats_get = defineEventHandler(async (event) => {
  try {
    if (getMethod(event) !== "GET") {
      throw createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed"
      });
    }
    const statusCounts = await prisma.priestRegistration.groupBy({
      by: ["status"],
      _count: {
        status: true
      }
    });
    const thirtyDaysAgo = /* @__PURE__ */ new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentRegistrations = await prisma.priestRegistration.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    });
    const approvedRegistrations = await prisma.priestRegistration.findMany({
      where: { status: "APPROVED" },
      select: {
        createdAt: true,
        statusUpdatedAt: true
      }
    });
    const averageProcessingDays = approvedRegistrations.length > 0 ? approvedRegistrations.reduce((acc, reg) => {
      const days = Math.round((reg.statusUpdatedAt.getTime() - reg.createdAt.getTime()) / (1e3 * 60 * 60 * 24));
      return acc + days;
    }, 0) / approvedRegistrations.length : 0;
    const topDioceses = await prisma.priestRegistration.groupBy({
      by: ["ordinationDioceseId"],
      _count: {
        ordinationDioceseId: true
      },
      orderBy: {
        _count: {
          ordinationDioceseId: "desc"
        }
      },
      take: 5
    });
    const dioceseIds = topDioceses.map((d) => d.ordinationDioceseId);
    const dioceses = await prisma.diocese.findMany({
      where: { id: { in: dioceseIds } },
      select: { id: true, name: true }
    });
    const diocesesWithCounts = topDioceses.map((d) => {
      var _a;
      return {
        diocese: ((_a = dioceses.find((diocese) => diocese.id === d.ordinationDioceseId)) == null ? void 0 : _a.name) || "Unknown",
        count: d._count.ordinationDioceseId
      };
    });
    const stats = statusCounts.reduce((acc, item) => {
      acc[item.status.toLowerCase()] = item._count.status;
      return acc;
    }, {});
    const total = statusCounts.reduce((acc, item) => acc + item._count.status, 0);
    return {
      success: true,
      data: {
        stats: {
          total,
          pending: stats.pending || 0,
          under_review: stats.under_review || 0,
          approved: stats.approved || 0,
          rejected: stats.rejected || 0,
          requires_documentation: stats.requires_documentation || 0
        },
        recentRegistrations,
        averageProcessingDays: Math.round(averageProcessingDays * 10) / 10,
        topDioceses: diocesesWithCounts
      }
    };
  } catch (error) {
    console.error("Error fetching priest registration stats:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { stats_get as default };
//# sourceMappingURL=stats.get.mjs.map
