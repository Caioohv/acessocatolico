import { d as defineEventHandler, g as getMethod, c as createError, r as readBody, u as useRuntimeConfig, s as setCookie } from '../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import bcryptjs__default from 'bcryptjs';
import jsonwebtoken__default from 'jsonwebtoken';
import { z } from 'zod';
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
const loginSchema = z.object({
  email: z.string().email("Email inv\xE1lido"),
  password: z.string().min(6, "Senha deve ter no m\xEDnimo 6 caracteres")
});
const login_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const body = await readBody(event);
    const { email, password } = loginSchema.parse(body);
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    });
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Credenciais inv\xE1lidas"
      });
    }
    if (!user.isActive) {
      throw createError({
        statusCode: 401,
        statusMessage: "Conta desativada"
      });
    }
    const isPasswordValid = await bcryptjs__default.compare(password, user.password);
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: "Credenciais inv\xE1lidas"
      });
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: /* @__PURE__ */ new Date() }
    });
    const config = useRuntimeConfig();
    const token = jsonwebtoken__default.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      config.jwtSecret,
      { expiresIn: "7d" }
    );
    setCookie(event, "auth-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7
      // 7 days
    });
    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        profile: user.profile
      },
      token
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 400,
      statusMessage: error.message || "Erro no login"
    });
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
