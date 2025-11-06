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
const predefinedCategories = [
  { value: "retiro", label: "Retiros", description: "Retiros espirituais e encontros" },
  { value: "encontro", label: "Encontros", description: "Encontros de jovens, casais, etc." },
  { value: "festa", label: "Festas", description: "Festas paroquiais e celebra\xE7\xF5es" },
  { value: "formacao", label: "Forma\xE7\xE3o", description: "Cursos e forma\xE7\xE3o espiritual" },
  { value: "liturgia", label: "Liturgia", description: "Celebra\xE7\xF5es e eventos lit\xFArgicos" },
  { value: "caridade", label: "Caridade", description: "A\xE7\xF5es sociais e caritativas" },
  { value: "peregrinacao", label: "Peregrina\xE7\xF5es", description: "Romarias e peregrina\xE7\xF5es" },
  { value: "musica", label: "M\xFAsica", description: "Eventos musicais e corais" },
  { value: "jovens", label: "Jovens", description: "Eventos espec\xEDficos para jovens" },
  { value: "criancas", label: "Crian\xE7as", description: "Eventos para crian\xE7as" },
  { value: "familia", label: "Fam\xEDlia", description: "Eventos familiares" },
  { value: "casais", label: "Casais", description: "Encontros de casais" },
  { value: "adoracao", label: "Adora\xE7\xE3o", description: "Adora\xE7\xE3o ao Sant\xEDssimo" },
  { value: "novena", label: "Novenas", description: "Novenas e devo\xE7\xF5es" },
  { value: "conferencia", label: "Confer\xEAncias", description: "Palestras e confer\xEAncias" },
  { value: "workshop", label: "Workshops", description: "Oficinas e workshops" },
  { value: "outro", label: "Outros", description: "Outros tipos de eventos" }
];
const categories_get = defineEventHandler(async (event) => {
  try {
    if (getMethod(event) !== "GET") {
      throw createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed"
      });
    }
    const categoryCounts = await prisma.event.groupBy({
      by: ["category"],
      _count: {
        category: true
      },
      where: {
        status: "PUBLISHED"
      }
    });
    const countMap = categoryCounts.reduce((acc, item) => {
      acc[item.category] = item._count.category;
      return acc;
    }, {});
    const categoriesWithCounts = predefinedCategories.map((category) => ({
      value: category.value,
      label: category.label,
      description: category.description,
      count: countMap[category.value] || 0
    }));
    categoriesWithCounts.sort((a, b) => {
      if (a.count !== b.count) {
        return b.count - a.count;
      }
      return a.label.localeCompare(b.label);
    });
    return {
      success: true,
      data: categoriesWithCounts
    };
  } catch (error) {
    console.error("Error fetching event categories:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { categories_get as default };
//# sourceMappingURL=categories.get.mjs.map
