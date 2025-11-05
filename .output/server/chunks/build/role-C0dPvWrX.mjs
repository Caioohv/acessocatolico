import { h as defineNuxtRouteMiddleware, n as navigateTo, d as createError } from './server.mjs';
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

const role = defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth();
  if (!user.value) {
    return navigateTo("/login");
  }
  const roleHierarchy = {
    "ADMIN": ["ADMIN", "PRIEST", "ORGANIZER", "MEMBER", "VISITOR"],
    "PRIEST": ["PRIEST", "ORGANIZER", "MEMBER", "VISITOR"],
    "ORGANIZER": ["ORGANIZER", "MEMBER", "VISITOR"],
    "MEMBER": ["MEMBER", "VISITOR"],
    "VISITOR": ["VISITOR"]
  };
  const protectedRoutes = {
    "/admin": ["ADMIN"],
    "/dashboard/admin": ["ADMIN"],
    "/dashboard/priest": ["PRIEST"],
    "/dashboard/organizer": ["ORGANIZER"],
    "/parishes/manage": ["PRIEST"],
    "/events/create": ["ORGANIZER"],
    "/events/manage": ["ORGANIZER"],
    "/ministries/manage": ["ORGANIZER"],
    "/schedules/manage": ["ORGANIZER"]
  };
  const routePath = to.path;
  let requiredRoles = protectedRoutes[routePath];
  if (!requiredRoles) {
    for (const [pattern, roles] of Object.entries(protectedRoutes)) {
      if (routePath.startsWith(pattern)) {
        requiredRoles = roles;
        break;
      }
    }
  }
  if (requiredRoles) {
    const userRole = user.value.role;
    const allowedRoles = roleHierarchy[userRole] || [userRole];
    const hasPermission = requiredRoles.some((role2) => allowedRoles.includes(role2));
    if (!hasPermission) {
      throw createError({
        statusCode: 403,
        statusMessage: "Acesso negado - Permiss\xF5es insuficientes"
      });
    }
  }
});

export { role as default };
//# sourceMappingURL=role-C0dPvWrX.mjs.map
