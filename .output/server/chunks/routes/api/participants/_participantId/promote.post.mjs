import { d as defineEventHandler, e as getRouterParam, c as createError } from '../../../../nitro/nitro.mjs';
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
const PROMOTION_CRITERIA = {
  NOVICE: {
    toSERVANT: {
      totalEvents: 5,
      totalHours: 20,
      points: 50
    }
  },
  SERVANT: {
    toLEADER: {
      totalEvents: 15,
      totalHours: 80,
      points: 200,
      badgesRequired: 3
    }
  }
};
const promote_post = defineEventHandler(async (event) => {
  try {
    const participantId = getRouterParam(event, "participantId");
    if (!participantId) {
      throw createError({
        statusCode: 400,
        statusMessage: "ID do participante \xE9 obrigat\xF3rio"
      });
    }
    const participant = await prisma.participantProfile.findUnique({
      where: { id: participantId },
      include: {
        badges: true,
        user: {
          include: {
            profile: true
          }
        }
      }
    });
    if (!participant) {
      throw createError({
        statusCode: 404,
        statusMessage: "Participante n\xE3o encontrado"
      });
    }
    let promoted = false;
    let newLevel = participant.level;
    let promotionReason = "";
    if (participant.level === "NOVICE") {
      const criteria = PROMOTION_CRITERIA.NOVICE.toSERVANT;
      if (participant.totalEvents >= criteria.totalEvents && participant.totalHours >= criteria.totalHours && participant.points >= criteria.points) {
        newLevel = "SERVANT";
        promoted = true;
        promotionReason = `Promovido a Servo por completar ${participant.totalEvents} eventos, ${participant.totalHours} horas de participa\xE7\xE3o e ${participant.points} pontos.`;
      }
    } else if (participant.level === "SERVANT") {
      const criteria = PROMOTION_CRITERIA.SERVANT.toLEADER;
      if (participant.totalEvents >= criteria.totalEvents && participant.totalHours >= criteria.totalHours && participant.points >= criteria.points && participant.badges.length >= criteria.badgesRequired) {
        newLevel = "LEADER";
        promoted = true;
        promotionReason = `Promovido a L\xEDder por completar ${participant.totalEvents} eventos, ${participant.totalHours} horas de participa\xE7\xE3o, ${participant.points} pontos e ${participant.badges.length} badges.`;
      }
    }
    if (promoted) {
      const updatedParticipant = await prisma.participantProfile.update({
        where: { id: participantId },
        data: {
          level: newLevel,
          points: {
            increment: 50
            // Bonus por promoção
          }
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
      await prisma.participationHistory.create({
        data: {
          participantId,
          type: "promotion",
          referenceId: participantId,
          referenceName: `Promo\xE7\xE3o para ${newLevel}`,
          pointsEarned: 50,
          participatedAt: /* @__PURE__ */ new Date()
        }
      });
      return {
        success: true,
        promoted: true,
        previousLevel: participant.level,
        newLevel,
        reason: promotionReason,
        participant: updatedParticipant
      };
    }
    return {
      success: true,
      promoted: false,
      currentLevel: participant.level,
      message: "Participante n\xE3o atende aos crit\xE9rios para promo\xE7\xE3o no momento"
    };
  } catch (error) {
    console.error("Erro ao verificar promo\xE7\xE3o:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { promote_post as default };
//# sourceMappingURL=promote.post.mjs.map
