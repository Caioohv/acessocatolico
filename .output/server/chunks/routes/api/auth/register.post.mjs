import { d as defineEventHandler, b as getMethod, c as createError, r as readBody, u as useRuntimeConfig, e as setCookie } from '../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import bcryptjs__default from 'bcryptjs';
import jwt__default from 'jsonwebtoken';
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
const registerSchema = z.object({
  email: z.string().email("Email inv\xE1lido"),
  password: z.string().min(6, "Senha deve ter no m\xEDnimo 6 caracteres"),
  firstName: z.string().min(2, "Nome deve ter no m\xEDnimo 2 caracteres"),
  lastName: z.string().min(2, "Sobrenome deve ter no m\xEDnimo 2 caracteres"),
  phone: z.string().optional()
});
const register_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const body = await readBody(event);
    const { email, password, firstName, lastName, phone } = registerSchema.parse(body);
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: "Email j\xE1 est\xE1 em uso"
      });
    }
    const hashedPassword = await bcryptjs__default.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "VISITOR",
        profile: {
          create: {
            firstName,
            lastName,
            phone
          }
        }
      },
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
    const config = useRuntimeConfig();
    const token = jwt__default.sign(
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
      statusMessage: error.message || "Erro no cadastro"
    });
  }
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
