import { d as defineEventHandler, f as getCookie, c as createError, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import jwt__default from 'jsonwebtoken';
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
const me_get = defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, "auth-token");
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Token n\xE3o encontrado"
      });
    }
    const config = useRuntimeConfig();
    const decoded = jwt__default.verify(token, config.jwtSecret);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        profile: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
            phone: true,
            bio: true,
            level: true
          }
        }
      }
    });
    if (!user || !user.isActive) {
      throw createError({
        statusCode: 401,
        statusMessage: "Usu\xE1rio n\xE3o encontrado ou inativo"
      });
    }
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
      profile: user.profile
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 401,
      statusMessage: "Token inv\xE1lido"
    });
  }
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
