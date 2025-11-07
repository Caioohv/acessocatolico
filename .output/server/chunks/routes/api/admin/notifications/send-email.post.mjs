import { d as defineEventHandler, b as getMethod, c as createError, r as readBody } from '../../../../nitro/nitro.mjs';
import * as nodemailer from 'nodemailer';
import 'bcryptjs';
import '@prisma/client';
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

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
const sendEmail_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  try {
    const body = await readBody(event);
    const { to, subject, html, type } = body;
    if (!to || !subject || !html) {
      throw createError({
        statusCode: 400,
        statusMessage: "Campos obrigat\xF3rios: to, subject, html"
      });
    }
    let emailHtml = html;
    if (type === "submission_approved") {
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4A5568;">Inscri\xE7\xE3o Aprovada!</h2>
          <p>Sua inscri\xE7\xE3o foi aprovada com sucesso.</p>
          ${html}
          <hr style="margin: 20px 0;">
          <p style="color: #718096; font-size: 12px;">
            Esta \xE9 uma mensagem autom\xE1tica do AcessoCat\xF3lico.
          </p>
        </div>
      `;
    } else if (type === "submission_rejected") {
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #E53E3E;">Inscri\xE7\xE3o N\xE3o Aprovada</h2>
          <p>Infelizmente sua inscri\xE7\xE3o n\xE3o foi aprovada.</p>
          ${html}
          <hr style="margin: 20px 0;">
          <p style="color: #718096; font-size: 12px;">
            Esta \xE9 uma mensagem autom\xE1tica do AcessoCat\xF3lico.
          </p>
        </div>
      `;
    }
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"AcessoCat\xF3lico" <noreply@acessocatolico.com.br>',
      to,
      subject,
      html: emailHtml
    });
    return {
      success: true,
      message: "Email enviado com sucesso"
    };
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro ao enviar email"
    });
  }
});

export { sendEmail_post as default };
//# sourceMappingURL=send-email.post.mjs.map
