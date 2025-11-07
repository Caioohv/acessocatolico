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
const history_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const {
      participantId,
      type,
      referenceId,
      referenceName,
      hoursParticipated,
      pointsEarned
    } = body;
    if (!participantId || !type || !referenceId || !referenceName) {
      throw createError({
        statusCode: 400,
        statusMessage: "Campos obrigat\xF3rios: participantId, type, referenceId, referenceName"
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
    const history = await prisma.participationHistory.create({
      data: {
        participantId,
        type,
        referenceId,
        referenceName,
        hoursParticipated: hoursParticipated || 0,
        pointsEarned: pointsEarned || 0,
        participatedAt: /* @__PURE__ */ new Date()
      }
    });
    await prisma.participantProfile.update({
      where: { id: participantId },
      data: {
        totalEvents: type === "event" ? { increment: 1 } : void 0,
        totalHours: hoursParticipated ? { increment: hoursParticipated } : void 0,
        points: pointsEarned ? { increment: pointsEarned } : void 0,
        lastActivity: /* @__PURE__ */ new Date()
      }
    });
    return history;
  } catch (error) {
    console.error("Erro ao registrar hist\xF3rico:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { history_post as default };
//# sourceMappingURL=history.post.mjs.map
