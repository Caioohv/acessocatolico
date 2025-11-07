import { d as defineEventHandler, b as getMethod, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';
import { z } from 'zod';
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
const forgotPasswordSchema = z.object({
  email: z.string().email("Email inv\xE1lido")
});
const forgotPassword_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const body = await readBody(event);
    const { email } = forgotPasswordSchema.parse(body);
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (user) {
      const resetToken = randomBytes(32).toString("hex");
      const tokenExpiry = new Date(Date.now() + 15 * 60 * 1e3);
      await prisma.passwordResetToken.create({
        data: {
          email: user.email,
          token: resetToken,
          expiresAt: tokenExpiry
        }
      });
      console.log(`Password reset link for ${email}: /reset-password?token=${resetToken}`);
    }
    return {
      message: "Se o email existir em nossa base, voc\xEA receber\xE1 um link de recupera\xE7\xE3o"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 400,
      statusMessage: error.message || "Erro ao processar solicita\xE7\xE3o"
    });
  }
});

export { forgotPassword_post as default };
//# sourceMappingURL=forgot-password.post.mjs.map
