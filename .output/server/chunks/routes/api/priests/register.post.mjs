import { PrismaClient } from '@prisma/client';
import { d as defineEventHandler, b as getMethod, c as createError, r as readBody, l as sendEmail } from '../../../nitro/nitro.mjs';
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
function validatePriestRegistration(data) {
  const errors = [];
  if (!data.firstName || data.firstName.length < 2) {
    errors.push("Nome deve ter pelo menos 2 caracteres");
  }
  if (!data.lastName || data.lastName.length < 2) {
    errors.push("Sobrenome deve ter pelo menos 2 caracteres");
  }
  if (!data.email || !data.email.includes("@")) {
    errors.push("Email inv\xE1lido");
  }
  if (!data.phone || data.phone.length < 10) {
    errors.push("Telefone inv\xE1lido");
  }
  if (!data.birthDate || isNaN(Date.parse(data.birthDate))) {
    errors.push("Data de nascimento inv\xE1lida");
  }
  if (!data.cpf) {
    errors.push("CPF \xE9 obrigat\xF3rio");
  }
  if (!data.ordinationNumber) {
    errors.push("N\xFAmero de ordena\xE7\xE3o \xE9 obrigat\xF3rio");
  }
  if (!data.ordinationDate || isNaN(Date.parse(data.ordinationDate))) {
    errors.push("Data de ordena\xE7\xE3o inv\xE1lida");
  }
  if (!data.ordinationDiocese) {
    errors.push("Diocese de ordena\xE7\xE3o \xE9 obrigat\xF3ria");
  }
  return errors;
}
const register_post = defineEventHandler(async (event) => {
  try {
    if (getMethod(event) !== "POST") {
      throw createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed"
      });
    }
    const body = await readBody(event);
    const validationErrors = validatePriestRegistration(body);
    if (validationErrors.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: validationErrors.join(", ")
      });
    }
    const existingRegistration = await prisma.priestRegistration.findFirst({
      where: {
        OR: [
          { email: body.email },
          { cpf: body.cpf },
          { ordinationNumber: body.ordinationNumber }
        ]
      }
    });
    if (existingRegistration) {
      throw createError({
        statusCode: 400,
        statusMessage: "J\xE1 existe um cadastro com estes dados (email, CPF ou n\xFAmero de ordena\xE7\xE3o)"
      });
    }
    const diocese = await prisma.diocese.findUnique({
      where: { id: body.ordinationDiocese }
    });
    if (!diocese) {
      throw createError({
        statusCode: 400,
        statusMessage: "Diocese n\xE3o encontrada"
      });
    }
    const emailVerificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const registration = await prisma.priestRegistration.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        birthDate: new Date(body.birthDate),
        cpf: body.cpf,
        bio: body.bio || null,
        ordinationNumber: body.ordinationNumber,
        ordinationDate: new Date(body.ordinationDate),
        ordinationDioceseId: body.ordinationDiocese,
        seminary: body.seminary || null,
        specializations: body.specializations || [],
        languages: body.languages || [],
        emailVerificationToken,
        emailVerificationSentAt: /* @__PURE__ */ new Date()
      },
      include: {
        ordinationDiocese: true
      }
    });
    try {
      const verificationLink = `${process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:3000"}/cadastro/padre/verificar-email?token=${emailVerificationToken}`;
      await sendEmail({
        to: registration.email,
        subject: "Confirme seu email - Cadastro de Padre",
        template: "priest-registration-verification",
        data: {
          name: `${registration.firstName} ${registration.lastName}`,
          verificationLink,
          ordinationNumber: registration.ordinationNumber,
          diocese: diocese.name
        }
      });
      console.log("\u{1F4E7} [EMAIL SENT] Verification email sent to:", registration.email);
    } catch (emailError) {
      console.error("\u{1F4E7} [EMAIL ERROR] Failed to send verification email:", emailError);
    }
    await prisma.priestApprovalHistory.create({
      data: {
        registrationId: registration.id,
        fromStatus: "PENDING",
        toStatus: "PENDING",
        comments: "Cadastro inicial submetido"
      }
    });
    return {
      success: true,
      message: "Cadastro submetido com sucesso! Verifique seus dados e aguarde aprova\xE7\xE3o.",
      registrationId: registration.id,
      status: registration.status
    };
  } catch (error) {
    console.error("Error creating priest registration:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
