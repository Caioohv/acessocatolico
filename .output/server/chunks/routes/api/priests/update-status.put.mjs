import { PrismaClient } from '@prisma/client';
import { d as defineEventHandler, b as getMethod, c as createError, r as readBody, k as generatePassword, l as hashPassword, j as sendEmail } from '../../../nitro/nitro.mjs';
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
const updateStatus_put = defineEventHandler(async (event) => {
  if (getMethod(event) !== "PUT") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const body = await readBody(event);
    const { registrationId, status, comments, adminEmail } = body;
    if (!registrationId || !status) {
      throw createError({
        statusCode: 400,
        statusMessage: "registrationId e status s\xE3o obrigat\xF3rios"
      });
    }
    const validStatuses = ["PENDING", "UNDER_REVIEW", "APPROVED", "REJECTED", "REQUIRES_DOCUMENTATION"];
    if (!validStatuses.includes(status)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Status inv\xE1lido"
      });
    }
    const currentRegistration = await prisma.priestRegistration.findUnique({
      where: { id: registrationId }
    });
    if (!currentRegistration) {
      throw createError({
        statusCode: 404,
        statusMessage: "Cadastro n\xE3o encontrado"
      });
    }
    const updatedRegistration = await prisma.priestRegistration.update({
      where: { id: registrationId },
      data: {
        status,
        statusUpdatedAt: /* @__PURE__ */ new Date(),
        statusUpdatedBy: adminEmail || null,
        reviewComments: comments || null
      },
      include: {
        ordinationDiocese: true
      }
    });
    await prisma.priestApprovalHistory.create({
      data: {
        registrationId,
        fromStatus: currentRegistration.status,
        toStatus: status,
        comments: comments || null,
        adminEmail: adminEmail || null
      }
    });
    if (status === "APPROVED") {
      try {
        const tempPassword = generatePassword();
        const hashedPassword = await hashPassword(tempPassword);
        const user = await prisma.user.create({
          data: {
            email: updatedRegistration.email,
            password: hashedPassword,
            role: "PRIEST",
            isActive: true,
            emailVerified: true,
            // Already verified during registration
            profile: {
              create: {
                firstName: updatedRegistration.firstName,
                lastName: updatedRegistration.lastName,
                phone: updatedRegistration.phone,
                bio: updatedRegistration.bio
              }
            }
          },
          include: {
            profile: true
          }
        });
        await prisma.priestRegistration.update({
          where: { id: registrationId },
          data: { userId: user.id }
        });
        const loginLink = `${process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:3000"}/login`;
        await sendEmail({
          to: updatedRegistration.email,
          subject: "Cadastro Aprovado - Bem-vindo ao AcessoCat\xF3lico!",
          template: "priest-registration-approved",
          data: {
            name: `${updatedRegistration.firstName} ${updatedRegistration.lastName}`,
            email: updatedRegistration.email,
            tempPassword,
            loginLink
          }
        });
        console.log("\u2705 [APPROVED] User account created for registration:", registrationId);
        console.log("\u{1F4E7} [EMAIL SENT] Approval email sent to:", updatedRegistration.email);
      } catch (approvalError) {
        console.error("Error handling approval:", approvalError);
        await prisma.priestRegistration.update({
          where: { id: registrationId },
          data: {
            status: currentRegistration.status,
            statusUpdatedAt: currentRegistration.statusUpdatedAt,
            reviewComments: "Erro interno ao criar conta de usu\xE1rio. Tente novamente."
          }
        });
        throw createError({
          statusCode: 500,
          statusMessage: "Erro ao criar conta de usu\xE1rio"
        });
      }
    }
    if (status === "REJECTED") {
      try {
        const editLink = `${process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:3000"}/cadastro/padre/editar?id=${registrationId}`;
        await sendEmail({
          to: updatedRegistration.email,
          subject: "Cadastro Necessita Revis\xE3o - AcessoCat\xF3lico",
          template: "priest-registration-rejected",
          data: {
            name: `${updatedRegistration.firstName} ${updatedRegistration.lastName}`,
            comments: comments || "Documenta\xE7\xE3o necessita revis\xE3o.",
            editLink
          }
        });
        console.log("\u274C [REJECTED] Registration rejected:", registrationId);
        console.log("\u{1F4E7} [EMAIL SENT] Rejection email sent to:", updatedRegistration.email);
      } catch (emailError) {
        console.error("Error sending rejection email:", emailError);
      }
    }
    return {
      success: true,
      message: `Status atualizado para ${status}`,
      registration: {
        id: updatedRegistration.id,
        status: updatedRegistration.status,
        statusUpdatedAt: updatedRegistration.statusUpdatedAt,
        reviewComments: updatedRegistration.reviewComments
      }
    };
  } catch (error) {
    console.error("Error updating priest registration status:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { updateStatus_put as default };
//# sourceMappingURL=update-status.put.mjs.map
