import { d as defineEventHandler, r as readBody, g as getHeader, c as createError } from '../../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import 'bcryptjs';
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
const send_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const body = await readBody(event);
  const { submissionIds, type, subject, message } = body;
  try {
    const authHeader = getHeader(event, "authorization");
    if (!(authHeader == null ? void 0 : authHeader.startsWith("Bearer "))) {
      throw createError({
        statusCode: 401,
        statusMessage: "Token de acesso requerido"
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin && !decoded.isPriest) {
      throw createError({
        statusCode: 403,
        statusMessage: "Acesso negado"
      });
    }
    const submissions = await prisma.eventFormSubmission.findMany({
      where: {
        id: {
          in: submissionIds
        }
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        },
        form: {
          select: {
            event: {
              select: {
                id: true,
                title: true,
                slug: true,
                startDate: true,
                location: true
              }
            }
          }
        }
      }
    });
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    const emailsSent = [];
    const emailsError = [];
    for (const submission of submissions) {
      try {
        const userEmail = ((_a = submission.user) == null ? void 0 : _a.email) || submission.email;
        const userName = ((_c = (_b = submission.user) == null ? void 0 : _b.profile) == null ? void 0 : _c.firstName) ? `${submission.user.profile.firstName} ${submission.user.profile.lastName || ""}` : submission.name || "Participante";
        if (!userEmail) {
          emailsError.push({
            submissionId: submission.id,
            error: "Email n\xE3o encontrado"
          });
          continue;
        }
        const emailContent = generateEmailContent(type, {
          userName,
          eventTitle: submission.form.event.title,
          eventDate: submission.form.event.startDate,
          eventLocation: submission.form.event.location,
          customMessage: message,
          submissionId: submission.id
        });
        await transporter.sendMail({
          from: process.env.FROM_EMAIL,
          to: userEmail,
          subject: subject || emailContent.subject,
          html: emailContent.html,
          text: emailContent.text
        });
        emailsSent.push({
          submissionId: submission.id,
          email: userEmail,
          name: userName
        });
        await prisma.eventNotificationLog.create({
          data: {
            eventId: submission.form.event.id,
            userId: submission.userId,
            type,
            email: userEmail,
            subject: subject || emailContent.subject,
            status: "SENT",
            sentAt: /* @__PURE__ */ new Date()
          }
        });
      } catch (emailError) {
        console.error("Erro ao enviar email:", emailError);
        emailsError.push({
          submissionId: submission.id,
          error: emailError.message
        });
      }
    }
    return {
      success: true,
      sent: emailsSent.length,
      errors: emailsError.length,
      details: {
        sent: emailsSent,
        errors: emailsError
      }
    };
  } catch (error) {
    console.error("Erro ao enviar notifica\xE7\xF5es:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});
function generateEmailContent(type, data) {
  const templates = {
    "REGISTRATION_APPROVED": {
      subject: `\u2705 Inscri\xE7\xE3o aprovada - ${data.eventTitle}`,
      html: `
        <h2>Inscri\xE7\xE3o Aprovada!</h2>
        <p>Ol\xE1 ${data.userName},</p>
        <p>Sua inscri\xE7\xE3o para o evento <strong>${data.eventTitle}</strong> foi aprovada!</p>
        ${data.eventDate ? `<p><strong>Data:</strong> ${formatDate(data.eventDate)}</p>` : ""}
        ${data.eventLocation ? `<p><strong>Local:</strong> ${data.eventLocation}</p>` : ""}
        ${data.customMessage ? `<div><p><strong>Mensagem:</strong></p><p>${data.customMessage}</p></div>` : ""}
        <p>Aguardamos voc\xEA no evento!</p>
      `,
      text: `Inscri\xE7\xE3o Aprovada! Ol\xE1 ${data.userName}, sua inscri\xE7\xE3o para o evento ${data.eventTitle} foi aprovada!`
    },
    "REGISTRATION_REJECTED": {
      subject: `\u274C Inscri\xE7\xE3o n\xE3o aprovada - ${data.eventTitle}`,
      html: `
        <h2>Inscri\xE7\xE3o N\xE3o Aprovada</h2>
        <p>Ol\xE1 ${data.userName},</p>
        <p>Infelizmente sua inscri\xE7\xE3o para o evento <strong>${data.eventTitle}</strong> n\xE3o foi aprovada.</p>
        ${data.customMessage ? `<div><p><strong>Motivo:</strong></p><p>${data.customMessage}</p></div>` : ""}
        <p>Agradecemos seu interesse e esperamos v\xEA-lo em futuros eventos.</p>
      `,
      text: `Inscri\xE7\xE3o n\xE3o aprovada. Ol\xE1 ${data.userName}, sua inscri\xE7\xE3o para o evento ${data.eventTitle} n\xE3o foi aprovada.`
    },
    "CUSTOM": {
      subject: `\u{1F4E7} ${data.eventTitle}`,
      html: `
        <h2>${data.eventTitle}</h2>
        <p>Ol\xE1 ${data.userName},</p>
        ${data.customMessage ? `<div><p>${data.customMessage}</p></div>` : ""}
      `,
      text: `${data.eventTitle} - ${data.customMessage || ""}`
    }
  };
  return templates[type] || templates["CUSTOM"];
}
function formatDate(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(date));
}

export { send_post as default };
//# sourceMappingURL=send.post.mjs.map
