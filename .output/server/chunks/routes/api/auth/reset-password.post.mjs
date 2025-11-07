import { d as defineEventHandler, b as getMethod, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import bcryptjs__default from 'bcryptjs';
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
import 'jsonwebtoken';
import '@iconify/utils';
import 'consola';
import 'better-sqlite3';
import 'ipx';

const prisma = new PrismaClient();
const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token \xE9 obrigat\xF3rio"),
  password: z.string().min(6, "Senha deve ter no m\xEDnimo 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirma\xE7\xE3o de senha \xE9 obrigat\xF3ria")
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas n\xE3o coincidem",
  path: ["confirmPassword"]
});
const resetPassword_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const body = await readBody(event);
    const { token, password } = resetPasswordSchema.parse(body);
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token,
        used: false,
        expiresAt: {
          gt: /* @__PURE__ */ new Date()
        }
      }
    });
    if (!resetToken) {
      throw createError({
        statusCode: 400,
        statusMessage: "Token inv\xE1lido ou expirado"
      });
    }
    const user = await prisma.user.findUnique({
      where: { email: resetToken.email }
    });
    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: "Usu\xE1rio n\xE3o encontrado"
      });
    }
    const hashedPassword = await bcryptjs__default.hash(password, 10);
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true }
      })
    ]);
    return {
      message: "Senha alterada com sucesso"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 400,
      statusMessage: error.message || "Erro ao alterar senha"
    });
  }
});

export { resetPassword_post as default };
//# sourceMappingURL=reset-password.post.mjs.map
