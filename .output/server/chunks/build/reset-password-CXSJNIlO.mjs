import { _ as __nuxt_component_0 } from './nuxt-link-Bn_O9NYZ.mjs';
import { defineComponent, reactive, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { d as useRoute, c as createError } from './server.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "reset-password",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const token = route.query.token;
    const form = reactive({
      password: "",
      confirmPassword: ""
    });
    const loading = ref(false);
    const error = ref("");
    const success = ref(false);
    if (!token) {
      throw createError({
        statusCode: 400,
        statusMessage: "Token de recupera\xE7\xE3o n\xE3o encontrado"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="max-w-md w-full space-y-8"><div><h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900"> Redefinir senha </h2><p class="mt-2 text-center text-sm text-gray-600"> Digite sua nova senha </p></div>`);
      if (!unref(success)) {
        _push(`<form class="mt-8 space-y-6"><div class="rounded-md shadow-sm -space-y-px"><div><label for="password" class="sr-only">Nova senha</label><input id="password"${ssrRenderAttr("value", unref(form).password)} name="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Nova senha"></div><div><label for="confirmPassword" class="sr-only">Confirmar nova senha</label><input id="confirmPassword"${ssrRenderAttr("value", unref(form).confirmPassword)} name="confirmPassword" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Confirmar nova senha"></div></div>`);
        if (unref(error)) {
          _push(`<div class="text-red-600 text-sm text-center">${ssrInterpolate(unref(error))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">`);
        if (unref(loading)) {
          _push(`<span>Redefinindo...</span>`);
        } else {
          _push(`<span>Redefinir senha</span>`);
        }
        _push(`</button></div></form>`);
      } else {
        _push(`<div class="text-center space-y-4"><div class="bg-green-50 border border-green-200 rounded-md p-4"><p class="text-green-800"> Senha alterada com sucesso! </p></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Fazer login `);
            } else {
              return [
                createTextVNode(" Fazer login ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reset-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=reset-password-CXSJNIlO.mjs.map
