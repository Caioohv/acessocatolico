import { d as defineEventHandler, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
import { PrismaClient } from '@prisma/client';
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
const profiles_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { userId, level, role, bio, skills, interests } = body;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true }
    });
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "Usu\xE1rio n\xE3o encontrado"
      });
    }
    const existingProfile = await prisma.participantProfile.findUnique({
      where: { userId }
    });
    if (existingProfile) {
      throw createError({
        statusCode: 409,
        statusMessage: "Perfil de participante j\xE1 existe para este usu\xE1rio"
      });
    }
    const participantProfile = await prisma.participantProfile.create({
      data: {
        userId,
        level: level || "NOVICE",
        role: role || "MEMBER",
        bio,
        skills: skills ? JSON.stringify(skills) : null,
        interests: interests ? JSON.stringify(interests) : null
      },
      include: {
        user: {
          include: {
            profile: true
          }
        },
        badges: {
          include: {
            badge: true
          }
        }
      }
    });
    return participantProfile;
  } catch (error) {
    console.error("Erro ao criar perfil de participante:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { profiles_post as default };
//# sourceMappingURL=profiles.post.mjs.map
