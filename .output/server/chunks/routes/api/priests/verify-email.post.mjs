import { PrismaClient } from '@prisma/client';
import { d as defineEventHandler, g as getMethod, c as createError, r as readBody, f as sendEmail } from '../../../nitro/nitro.mjs';
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
const verifyEmail_post = defineEventHandler(async (event) => {
  var _a;
  try {
    if (getMethod(event) !== "POST") {
      throw createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed"
      });
    }
    const body = await readBody(event);
    const { token } = body;
    if (!token) {
      throw createError({
        statusCode: 400,
        statusMessage: "Token de verifica\xE7\xE3o \xE9 obrigat\xF3rio"
      });
    }
    const registration = await prisma.priestRegistration.findUnique({
      where: { emailVerificationToken: token },
      include: {
        ordinationDiocese: true
      }
    });
    if (!registration) {
      throw createError({
        statusCode: 404,
        statusMessage: "Token de verifica\xE7\xE3o inv\xE1lido ou expirado"
      });
    }
    if (registration.emailVerified) {
      return {
        success: true,
        message: "Email j\xE1 foi verificado anteriormente",
        status: registration.status
      };
    }
    const tokenAge = Date.now() - (((_a = registration.emailVerificationSentAt) == null ? void 0 : _a.getTime()) || 0);
    const maxAge = 24 * 60 * 60 * 1e3;
    if (tokenAge > maxAge) {
      throw createError({
        statusCode: 400,
        statusMessage: "Token de verifica\xE7\xE3o expirado. Solicite um novo."
      });
    }
    const updatedRegistration = await prisma.priestRegistration.update({
      where: { id: registration.id },
      data: {
        emailVerified: true,
        status: "UNDER_REVIEW",
        statusUpdatedAt: /* @__PURE__ */ new Date(),
        emailVerificationToken: null
        // Clear token after use
      },
      include: {
        ordinationDiocese: true
      }
    });
    await prisma.priestApprovalHistory.create({
      data: {
        registrationId: registration.id,
        fromStatus: "PENDING",
        toStatus: "UNDER_REVIEW",
        comments: "Email verificado com sucesso"
      }
    });
    console.log("\u{1F4E7} [ADMIN NOTIFICATION] New priest registration verified:", {
      name: `${registration.firstName} ${registration.lastName}`,
      email: registration.email,
      diocese: registration.ordinationDiocese.name
    });
    try {
      await sendEmail({
        to: registration.email,
        subject: "Email Verificado - Cadastro em An\xE1lise",
        template: "priest-registration-under-review",
        data: {
          name: `${registration.firstName} ${registration.lastName}`,
          email: registration.email
        }
      });
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }
    return {
      success: true,
      message: "Email verificado com sucesso! Seu cadastro est\xE1 agora em an\xE1lise.",
      status: updatedRegistration.status,
      registration: {
        id: updatedRegistration.id,
        name: `${updatedRegistration.firstName} ${updatedRegistration.lastName}`,
        email: updatedRegistration.email,
        status: updatedRegistration.status,
        statusUpdatedAt: updatedRegistration.statusUpdatedAt
      }
    };
  } catch (error) {
    console.error("Error verifying email:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { verifyEmail_post as default };
//# sourceMappingURL=verify-email.post.mjs.map
