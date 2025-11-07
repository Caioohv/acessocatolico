import { m as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useAuth } from './useAuth-CzBu1cjT.mjs';
import 'vue';
import '../nitro/nitro.mjs';
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

const guest = defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn.value) {
    return navigateTo("/dashboard");
  }
});

export { guest as default };
//# sourceMappingURL=guest-BPD4jjDI.mjs.map
