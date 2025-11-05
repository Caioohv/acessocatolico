import { h as defineNuxtRouteMiddleware, d as createError } from './server.mjs';
import { u as useAuth } from './useAuth-CemiwPt3.mjs';
import 'vue';
import '../nitro/nitro.mjs';
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
import '@prisma/client';
import 'jsonwebtoken';
import '@iconify/utils';
import 'consola';
import 'better-sqlite3';
import 'ipx';
import 'pinia';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'vue/server-renderer';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const requireRole = defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth();
  const requiredRole = to.query.requireRole;
  if (requiredRole && user.value) {
    const userRole = user.value.role;
    const roleHierarchy = {
      "VISITOR": 1,
      "MEMBER": 2,
      "ORGANIZER": 3,
      "PRIEST": 4,
      "ADMIN": 5
    };
    const userLevel = roleHierarchy[userRole] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;
    if (userLevel < requiredLevel) {
      throw createError({
        statusCode: 403,
        statusMessage: `Acesso restrito a ${requiredRole}s`
      });
    }
  }
});

export { requireRole as default };
//# sourceMappingURL=require-role-BJCvgKJu.mjs.map
