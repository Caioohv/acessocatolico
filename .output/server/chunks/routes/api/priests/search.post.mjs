import { PrismaClient } from '@prisma/client';
import { d as defineEventHandler, b as getMethod, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
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
const search_post = defineEventHandler(async (event) => {
  try {
    if (getMethod(event) !== "POST") {
      throw createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed"
      });
    }
    const body = await readBody(event);
    const { email, cpf } = body;
    if (!email || !cpf) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email e CPF s\xE3o obrigat\xF3rios"
      });
    }
    const cleanCpf = cpf.replace(/\D/g, "");
    const registration = await prisma.priestRegistration.findFirst({
      where: {
        AND: [
          { email: email.toLowerCase().trim() },
          { cpf: cleanCpf }
        ]
      },
      include: {
        ordinationDiocese: {
          select: {
            id: true,
            name: true
          }
        },
        documents: {
          select: {
            id: true,
            type: true,
            status: true
          }
        }
      }
    });
    if (!registration) {
      return {
        success: false,
        message: "Cadastro n\xE3o encontrado com os dados informados",
        data: null
      };
    }
    const responseData = {
      id: registration.id,
      firstName: registration.firstName,
      lastName: registration.lastName,
      email: registration.email,
      phone: registration.phone,
      cpf: registration.cpf,
      ordinationNumber: registration.ordinationNumber,
      ordinationDate: registration.ordinationDate.toISOString(),
      ordinationDiocese: registration.ordinationDiocese,
      status: registration.status,
      statusUpdatedAt: registration.statusUpdatedAt.toISOString(),
      emailVerified: registration.emailVerified,
      createdAt: registration.createdAt.toISOString(),
      updatedAt: registration.updatedAt.toISOString(),
      documentsCount: registration.documents.length,
      reviewComments: registration.reviewComments
    };
    return {
      success: true,
      message: "Cadastro encontrado com sucesso",
      data: responseData
    };
  } catch (error) {
    console.error("Error searching priest registration:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { search_post as default };
//# sourceMappingURL=search.post.mjs.map
