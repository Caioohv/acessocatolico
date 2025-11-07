import { d as defineEventHandler, b as getMethod, c as createError, i as setCookie } from '../../../nitro/nitro.mjs';
import 'bcryptjs';
import '@prisma/client';
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

const logout_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    setCookie(event, "auth-token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 0
      // Expire immediately
    });
    return { message: "Logout realizado com sucesso" };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Erro no logout"
    });
  }
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
