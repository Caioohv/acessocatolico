import { d as defineEventHandler, g as getMethod, c as createError, b as getQuery } from '../../nitro/nitro.mjs';
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
import '@prisma/client';
import 'jsonwebtoken';
import '@iconify/utils';
import 'consola';
import 'better-sqlite3';
import 'ipx';

const index_get = defineEventHandler(async (event) => {
  if (getMethod(event) !== "GET") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    console.log("Using mock parish data for development");
    const { mockParishes } = await import('./parishes/mock-data.mjs');
    const query = getQuery(event);
    const {
      page = "1",
      limit = "12",
      search,
      stateId,
      cityId,
      neighborhoodId,
      dioceseId
    } = query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    let filteredParishes = mockParishes;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredParishes = filteredParishes.filter(
        (parish) => {
          var _a;
          return parish.name.toLowerCase().includes(searchLower) || ((_a = parish.description) == null ? void 0 : _a.toLowerCase().includes(searchLower)) || parish.address.toLowerCase().includes(searchLower);
        }
      );
    }
    if (stateId) {
      filteredParishes = filteredParishes.filter((parish) => parish.state.id === stateId);
    }
    if (cityId) {
      filteredParishes = filteredParishes.filter((parish) => parish.city.id === cityId);
    }
    if (neighborhoodId) {
      filteredParishes = filteredParishes.filter((parish) => {
        var _a;
        return ((_a = parish.neighborhood) == null ? void 0 : _a.id) === neighborhoodId;
      });
    }
    if (dioceseId) {
      filteredParishes = filteredParishes.filter((parish) => parish.diocese.id === dioceseId);
    }
    const total = filteredParishes.length;
    const parishes = filteredParishes.slice(skip, skip + limitNum);
    const totalPages = Math.ceil(total / limitNum);
    return {
      parishes,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    };
  } catch (error) {
    console.error("Error fetching parishes:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
