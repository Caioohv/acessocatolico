import { PrismaClient } from '@prisma/client';
import { d as defineEventHandler, e as getHeader, c as createError, h as readFormData } from '../../../nitro/nitro.mjs';
import * as jsonwebtoken from 'jsonwebtoken';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 } from 'uuid';
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
import '@iconify/utils';
import 'consola';
import 'better-sqlite3';
import 'ipx';

const prisma = new PrismaClient();
const upload_post = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!(authHeader == null ? void 0 : authHeader.startsWith("Bearer "))) {
      throw createError({
        statusCode: 401,
        statusMessage: "Token de autentica\xE7\xE3o necess\xE1rio"
      });
    }
    const token = authHeader.substring(7);
    const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    });
    if (!user || user.role !== "ADMIN" && user.role !== "PRIEST") {
      throw createError({
        statusCode: 403,
        statusMessage: "Acesso negado"
      });
    }
    const formData = await readFormData(event);
    const files = formData.getAll("files");
    if (!files || files.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Nenhum arquivo foi enviado"
      });
    }
    const uploadedFiles = [];
    const uploadDir = join(process.cwd(), "public", "uploads", "events");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
    }
    for (const file of files) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        throw createError({
          statusCode: 400,
          statusMessage: `Tipo de arquivo n\xE3o permitido: ${file.type}. Tipos permitidos: ${allowedTypes.join(", ")}`
        });
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        throw createError({
          statusCode: 400,
          statusMessage: `Arquivo muito grande: ${file.name}. Tamanho m\xE1ximo: 5MB`
        });
      }
      const fileExtension = file.name.split(".").pop();
      const fileName = `${v4()}.${fileExtension}`;
      const filePath = join(uploadDir, fileName);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await writeFile(filePath, buffer);
      const fileUrl = `/uploads/events/${fileName}`;
      uploadedFiles.push({
        originalName: file.name,
        fileName,
        url: fileUrl,
        size: file.size,
        type: file.type
      });
    }
    return {
      success: true,
      message: `${uploadedFiles.length} arquivo(s) enviado(s) com sucesso`,
      data: uploadedFiles
    };
  } catch (error) {
    console.error("Error uploading files:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor ao fazer upload"
    });
  }
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
