import { _ as __nuxt_component_0 } from './nuxt-link-Bn_O9NYZ.mjs';
import __nuxt_component_1 from './index-B5rpN8hp.mjs';
import { a as _sfc_main$1 } from './Button-BeuMp5nt.mjs';
import { ref, computed, watch, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderTeleport, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-CzBu1cjT.mjs';
import { u as useToast } from './useToast-Bm7hVh5T.mjs';
import { d as useRoute, u as useHead, n as navigateTo } from './server.mjs';
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
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import 'pinia';
import 'vue-router';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import './NuxtImg-DFTKHYRn.mjs';

const _sfc_main = {
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const { user, logout: authLogout } = useAuth();
    const { toasts } = useToast();
    const mobileMenuOpen = ref(false);
    const userName = computed(() => {
      var _a, _b;
      if ((_a = user.value) == null ? void 0 : _a.profile) {
        return `${user.value.profile.firstName} ${user.value.profile.lastName}`.trim();
      }
      return ((_b = user.value) == null ? void 0 : _b.email) || "Usu\xE1rio";
    });
    const userInitials = computed(() => {
      var _a, _b, _c, _d, _e;
      if (((_b = (_a = user.value) == null ? void 0 : _a.profile) == null ? void 0 : _b.firstName) && ((_d = (_c = user.value) == null ? void 0 : _c.profile) == null ? void 0 : _d.lastName)) {
        return `${user.value.profile.firstName.charAt(0)}${user.value.profile.lastName.charAt(0)}`.toUpperCase();
      }
      if ((_e = user.value) == null ? void 0 : _e.email) {
        return user.value.email.charAt(0).toUpperCase();
      }
      return "??";
    });
    const userRole = computed(() => {
      var _a;
      const roleLabels = {
        ADMIN: "Administrador",
        PRIEST: "Padre",
        ORGANIZER: "Organizador",
        MEMBER: "Membro"
      };
      return roleLabels[(_a = user.value) == null ? void 0 : _a.role] || "Usu\xE1rio";
    });
    const userMenuItems = [
      [{
        label: "Perfil",
        icon: "heroicons:user-circle",
        click: () => navigateTo("/dashboard")
      }],
      [{
        label: "Configura\xE7\xF5es",
        icon: "heroicons:cog-6-tooth",
        click: () => navigateTo("/dashboard")
      }],
      [{
        label: "Sair",
        icon: "heroicons:arrow-right-on-rectangle",
        click: logout
      }]
    ];
    async function logout() {
      try {
        await authLogout();
        await navigateTo("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
    function getToastIcon(type) {
      const icons = {
        success: "heroicons:check-circle",
        error: "heroicons:x-circle",
        warning: "heroicons:exclamation-triangle",
        info: "heroicons:information-circle"
      };
      return icons[type] || icons.info;
    }
    watch(() => useRoute().fullPath, () => {
      mobileMenuOpen.value = false;
    });
    useHead({
      titleTemplate: (title) => {
        const baseTitle = "AcessoCat\xF3lico - Administra\xE7\xE3o";
        return title ? `${title} - ${baseTitle}` : baseTitle;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UDropdown = resolveComponent("UDropdown");
      const _component_Icon = __nuxt_component_1;
      const _component_UButton = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><nav class="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between h-16"><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex-shrink-0 flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"${_scopeId}><span class="text-white font-bold text-lg"${_scopeId}>A</span></div><span class="ml-2 text-xl font-bold text-gray-900"${_scopeId}>AcessoCat\xF3lico</span>`);
          } else {
            return [
              createVNode("div", { class: "w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center" }, [
                createVNode("span", { class: "text-white font-bold text-lg" }, "A")
              ]),
              createVNode("span", { class: "ml-2 text-xl font-bold text-gray-900" }, "AcessoCat\xF3lico")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ml-4 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"> Administra\xE7\xE3o </div></div><div class="hidden md:flex items-center space-x-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard",
        class: "text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        "active-class": "text-blue-600 bg-blue-50"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Dashboard `);
          } else {
            return [
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/eventos",
        class: "text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        "active-class": "text-blue-600 bg-blue-50"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Eventos `);
          } else {
            return [
              createTextVNode(" Eventos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/padres",
        class: "text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        "active-class": "text-blue-600 bg-blue-50"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Padres `);
          } else {
            return [
              createTextVNode(" Padres ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UDropdown, { items: userMenuItems }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-3 cursor-pointer"${_scopeId}><div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"${_scopeId}><span class="text-white text-sm font-medium"${_scopeId}>${ssrInterpolate(unref(userInitials))}</span></div><div class="hidden lg:block"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(unref(userName))}</div><div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(unref(userRole))}</div></div>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:chevron-down",
              class: "h-4 w-4 text-gray-400"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-3 cursor-pointer" }, [
                createVNode("div", { class: "w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center" }, [
                  createVNode("span", { class: "text-white text-sm font-medium" }, toDisplayString(unref(userInitials)), 1)
                ]),
                createVNode("div", { class: "hidden lg:block" }, [
                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(unref(userName)), 1),
                  createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(unref(userRole)), 1)
                ]),
                createVNode(_component_Icon, {
                  name: "heroicons:chevron-down",
                  class: "h-4 w-4 text-gray-400"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="md:hidden flex items-center">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        color: "gray",
        icon: "heroicons:bars-3",
        onClick: ($event) => mobileMenuOpen.value = !unref(mobileMenuOpen)
      }, null, _parent));
      _push(`</div></div></div>`);
      if (unref(mobileMenuOpen)) {
        _push(`<div class="md:hidden border-t border-gray-200 bg-white"><div class="px-2 pt-2 pb-3 space-y-1">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard",
          class: "block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50",
          onClick: ($event) => mobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Dashboard `);
            } else {
              return [
                createTextVNode(" Dashboard ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/eventos",
          class: "block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50",
          onClick: ($event) => mobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Eventos `);
            } else {
              return [
                createTextVNode(" Eventos ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/padres",
          class: "block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50",
          onClick: ($event) => mobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Padres `);
            } else {
              return [
                createTextVNode(" Padres ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="border-t border-gray-200 pt-4 pb-3"><div class="px-4 flex items-center"><div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"><span class="text-white font-medium">${ssrInterpolate(unref(userInitials))}</span></div><div class="ml-3"><div class="text-base font-medium text-gray-800">${ssrInterpolate(unref(userName))}</div><div class="text-sm font-medium text-gray-500">${ssrInterpolate(unref(userRole))}</div></div></div><div class="mt-3 px-2 space-y-1">`);
        _push(ssrRenderComponent(_component_UButton, {
          variant: "ghost",
          color: "gray",
          class: "w-full justify-start",
          onClick: logout
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:arrow-right-on-rectangle",
                class: "h-5 w-5 mr-3"
              }, null, _parent2, _scopeId));
              _push2(` Sair `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:arrow-right-on-rectangle",
                  class: "h-5 w-5 mr-3"
                }),
                createTextVNode(" Sair ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><main class="pt-16">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(toasts).length > 0) {
          _push2(`<div class="fixed top-20 right-4 z-50 space-y-2"><!--[-->`);
          ssrRenderList(unref(toasts), (toast) => {
            _push2(`<div class="${ssrRenderClass([
              "max-w-sm w-full shadow-lg rounded-lg pointer-events-auto overflow-hidden",
              toast.type === "success" ? "bg-green-500" : toast.type === "error" ? "bg-red-500" : toast.type === "warning" ? "bg-yellow-500" : "bg-blue-500"
            ])}"><div class="p-4"><div class="flex items-start"><div class="flex-shrink-0">`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: getToastIcon(toast.type),
              class: "h-5 w-5 text-white"
            }, null, _parent));
            _push2(`</div><div class="ml-3 w-0 flex-1"><p class="text-sm font-medium text-white">${ssrInterpolate(toast.message)}</p></div><div class="ml-4 flex-shrink-0 flex"><button class="inline-flex text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white">`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:x-mark",
              class: "h-4 w-4"
            }, null, _parent));
            _push2(`</button></div></div></div></div>`);
          });
          _push2(`<!--]--></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-BQsxGxE3.mjs.map
