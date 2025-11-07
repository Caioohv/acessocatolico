import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
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
const badges_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const {
      name,
      description,
      type,
      iconUrl,
      color,
      criteria,
      isAutoAwarded
    } = body;
    if (!name || !description || !type) {
      throw createError({
        statusCode: 400,
        statusMessage: "Nome, descri\xE7\xE3o e tipo s\xE3o obrigat\xF3rios"
      });
    }
    const badge = await prisma.badge.create({
      data: {
        name,
        description,
        type,
        iconUrl,
        color: color || "#6B7280",
        criteria: criteria ? JSON.stringify(criteria) : JSON.stringify({}),
        isAutoAwarded: isAutoAwarded || false
      }
    });
    return badge;
  } catch (error) {
    console.error("Erro ao criar badge:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { badges_post as default };
//# sourceMappingURL=badges.post.mjs.map
