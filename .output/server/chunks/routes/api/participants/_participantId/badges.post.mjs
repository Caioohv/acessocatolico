import { d as defineEventHandler, r as readBody, c as createError } from '../../../../nitro/nitro.mjs';
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
const badges_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { participantId, badgeId, awardedBy, reason } = body;
    if (!participantId || !badgeId) {
      throw createError({
        statusCode: 400,
        statusMessage: "ID do participante e badge s\xE3o obrigat\xF3rios"
      });
    }
    const participant = await prisma.participantProfile.findUnique({
      where: { id: participantId }
    });
    if (!participant) {
      throw createError({
        statusCode: 404,
        statusMessage: "Participante n\xE3o encontrado"
      });
    }
    const badge = await prisma.badge.findUnique({
      where: { id: badgeId }
    });
    if (!badge) {
      throw createError({
        statusCode: 404,
        statusMessage: "Badge n\xE3o encontrado"
      });
    }
    const existingBadge = await prisma.participantBadge.findFirst({
      where: {
        participantId,
        badgeId
      }
    });
    if (existingBadge) {
      throw createError({
        statusCode: 409,
        statusMessage: "Participante j\xE1 possui este badge"
      });
    }
    const participantBadge = await prisma.participantBadge.create({
      data: {
        participantId,
        badgeId,
        awardedBy,
        reason
      },
      include: {
        badge: true,
        participant: {
          include: {
            user: {
              include: {
                profile: true
              }
            }
          }
        }
      }
    });
    await Promise.all([
      prisma.badge.update({
        where: { id: badgeId },
        data: {
          totalAwarded: {
            increment: 1
          }
        }
      }),
      prisma.participantProfile.update({
        where: { id: participantId },
        data: {
          points: {
            increment: 10
            // Pontos por badge recebido
          }
        }
      })
    ]);
    return participantBadge;
  } catch (error) {
    console.error("Erro ao atribuir badge:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { badges_post as default };
//# sourceMappingURL=badges.post.mjs.map
