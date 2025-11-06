import { PrismaClient } from '@prisma/client';
import { promises } from 'fs';
import { d as defineEventHandler, g as getMethod, c as createError, l as readMultipartFormData } from '../../../nitro/nitro.mjs';
import * as path from 'path';
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
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
];
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const uploadDocument_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const formData = await readMultipartFormData(event);
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Nenhum arquivo enviado"
      });
    }
    const registrationId = (_b = (_a = formData.find((field) => field.name === "registrationId")) == null ? void 0 : _a.data) == null ? void 0 : _b.toString();
    const documentType = (_d = (_c = formData.find((field) => field.name === "documentType")) == null ? void 0 : _c.data) == null ? void 0 : _d.toString();
    const file = formData.find((field) => field.name === "file");
    if (!registrationId || !documentType || !file) {
      throw createError({
        statusCode: 400,
        statusMessage: "Dados obrigat\xF3rios: registrationId, documentType, file"
      });
    }
    if (!file.data || file.data.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Arquivo vazio"
      });
    }
    if (file.data.length > MAX_FILE_SIZE) {
      throw createError({
        statusCode: 400,
        statusMessage: "Arquivo muito grande. M\xE1ximo 10MB"
      });
    }
    const mimeType = file.type || "application/octet-stream";
    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Tipo de arquivo n\xE3o permitido. Use PDF, JPEG ou PNG"
      });
    }
    const registration = await prisma.priestRegistration.findUnique({
      where: { id: registrationId }
    });
    if (!registration) {
      throw createError({
        statusCode: 404,
        statusMessage: "Cadastro n\xE3o encontrado"
      });
    }
    const fileExtension = path.extname(file.filename || "");
    const uniqueFileName = `${registrationId}_${documentType}_${Date.now()}${fileExtension}`;
    const uploadsDir = path.join(process.cwd(), "uploads", "priest-documents");
    try {
      await promises.mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      console.error("Error creating uploads directory:", error);
    }
    const filePath = path.join(uploadsDir, uniqueFileName);
    try {
      await promises.writeFile(filePath, file.data);
      const document = await prisma.priestDocument.create({
        data: {
          registrationId,
          type: documentType,
          fileName: uniqueFileName,
          originalFileName: file.filename || "unknown",
          filePath,
          fileSize: file.data.length,
          mimeType
        }
      });
      return {
        success: true,
        message: "Documento enviado com sucesso",
        document: {
          id: document.id,
          type: document.type,
          fileName: document.fileName,
          originalFileName: document.originalFileName,
          fileSize: document.fileSize,
          mimeType: document.mimeType,
          status: document.status,
          uploadedAt: document.uploadedAt
        }
      };
    } catch (fileError) {
      console.error("Error saving file:", fileError);
      throw createError({
        statusCode: 500,
        statusMessage: "Erro ao salvar arquivo"
      });
    }
  } catch (error) {
    console.error("Error uploading document:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { uploadDocument_post as default };
//# sourceMappingURL=upload-document.post.mjs.map
