import { PrismaClient } from '@prisma/client';
import { d as defineEventHandler, h as getRouterParam, c as createError, g as getHeader, r as readBody } from '../../../../nitro/nitro.mjs';
import * as jwt from 'jsonwebtoken';
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
const comments = defineEventHandler(async (event) => {
  var _a;
  try {
    const eventId = getRouterParam(event, "id");
    if (!eventId) {
      throw createError({
        statusCode: 400,
        statusMessage: "ID do evento \xE9 obrigat\xF3rio"
      });
    }
    if (event.node.req.method === "GET") {
      const comments = await prisma.eventComment.findMany({
        where: { eventId },
        include: {
          user: {
            include: {
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                  avatar: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      });
      const transformedComments = comments.map((comment) => {
        var _a2;
        return {
          ...comment,
          user: {
            id: comment.user.id,
            name: comment.user.profile ? `${comment.user.profile.firstName} ${comment.user.profile.lastName}`.trim() : comment.user.email.split("@")[0],
            avatar: ((_a2 = comment.user.profile) == null ? void 0 : _a2.avatar) || null
          }
        };
      });
      return {
        success: true,
        data: transformedComments
      };
    }
    if (event.node.req.method === "POST") {
      const authHeader = getHeader(event, "authorization");
      if (!(authHeader == null ? void 0 : authHeader.startsWith("Bearer "))) {
        throw createError({
          statusCode: 401,
          statusMessage: "Token de autentica\xE7\xE3o necess\xE1rio"
        });
      }
      const token = authHeader.substring(7);
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: payload.userId }
      });
      if (!user) {
        throw createError({
          statusCode: 401,
          statusMessage: "Usu\xE1rio n\xE3o encontrado"
        });
      }
      const body = await readBody(event);
      const { content } = body;
      if (!content || content.trim().length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: "Conte\xFAdo do coment\xE1rio \xE9 obrigat\xF3rio"
        });
      }
      const eventRecord = await prisma.event.findUnique({
        where: { id: eventId }
      });
      if (!eventRecord) {
        throw createError({
          statusCode: 404,
          statusMessage: "Evento n\xE3o encontrado"
        });
      }
      const comment = await prisma.eventComment.create({
        data: {
          content: content.trim(),
          eventId,
          userId: user.id
        },
        include: {
          user: {
            include: {
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                  avatar: true
                }
              }
            }
          }
        }
      });
      const transformedComment = {
        ...comment,
        user: {
          id: comment.user.id,
          name: comment.user.profile ? `${comment.user.profile.firstName} ${comment.user.profile.lastName}`.trim() : comment.user.email.split("@")[0],
          avatar: ((_a = comment.user.profile) == null ? void 0 : _a.avatar) || null
        }
      };
      return {
        success: true,
        message: "Coment\xE1rio adicionado com sucesso!",
        data: transformedComment
      };
    }
    throw createError({
      statusCode: 405,
      statusMessage: "M\xE9todo n\xE3o permitido"
    });
  } catch (error) {
    console.error("Error in event comments:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno do servidor"
    });
  }
});

export { comments as default };
//# sourceMappingURL=comments.mjs.map
