import { defineComponent, computed, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { u as useAppState } from './useAppState-Dl6EejkD.mjs';
import { u as useAuth } from './useAuth-Dq4ZNIKa.mjs';
import './server.mjs';
import '../nitro/nitro.mjs';
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
import 'node:module';
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
  __name: "default",
  __ssrInlineRender: true,
  props: {
    showSidebar: { type: Boolean, default: false },
    showFooter: { type: Boolean, default: true },
    showBreadcrumbs: { type: Boolean, default: true },
    showSearch: { type: Boolean, default: false },
    autoBreadcrumbs: { type: Boolean, default: true },
    sidebarTitle: {},
    navigation: {},
    sidebarNavigation: {}
  },
  setup(__props) {
    const props = __props;
    const { isLoading, loadingMessage } = useAppState();
    useAuth();
    const navigation = computed(() => props.navigation || [
      { name: "In\xEDcio", href: "/", icon: "i-heroicons-home-20-solid" },
      { name: "Par\xF3quias", href: "/parishes", icon: "i-heroicons-building-library-20-solid" },
      { name: "Eventos", href: "/events", icon: "i-heroicons-calendar-days-20-solid" },
      { name: "Minist\xE9rios", href: "/ministries", icon: "i-heroicons-user-group-20-solid" }
    ]);
    const sidebarNavigation = computed(() => props.sidebarNavigation || [
      {
        title: "Principal",
        items: [
          { name: "Dashboard", href: "/dashboard", icon: "i-heroicons-squares-2x2-20-solid", roles: ["ORGANIZER"] },
          { name: "Meu Perfil", href: "/profile", icon: "i-heroicons-user-circle-20-solid" }
        ]
      },
      {
        title: "Gest\xE3o",
        items: [
          { name: "Par\xF3quias", href: "/dashboard/parishes", icon: "i-heroicons-building-library-20-solid", roles: ["PRIEST"] },
          { name: "Eventos", href: "/dashboard/events", icon: "i-heroicons-calendar-days-20-solid", roles: ["ORGANIZER"] },
          { name: "Minist\xE9rios", href: "/dashboard/ministries", icon: "i-heroicons-user-group-20-solid", roles: ["ORGANIZER"] },
          { name: "Usu\xE1rios", href: "/dashboard/users", icon: "i-heroicons-users-20-solid", roles: ["ADMIN"] }
        ]
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingOverlay = resolveComponent("LoadingOverlay");
      const _component_AppHeader = resolveComponent("AppHeader");
      const _component_AppSidebar = resolveComponent("AppSidebar");
      const _component_AppBreadcrumbs = resolveComponent("AppBreadcrumbs");
      const _component_AppFooter = resolveComponent("AppFooter");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_LoadingOverlay, {
        show: unref(isLoading),
        message: unref(loadingMessage)
      }, null, _parent));
      _push(ssrRenderComponent(_component_AppHeader, {
        navigation: unref(navigation),
        "show-search": _ctx.showSearch
      }, null, _parent));
      _push(`<div class="flex">`);
      if (_ctx.showSidebar) {
        _push(ssrRenderComponent(_component_AppSidebar, {
          navigation: unref(sidebarNavigation),
          title: _ctx.sidebarTitle
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="flex-1 min-w-0">`);
      if (_ctx.showBreadcrumbs) {
        _push(`<div class="bg-white border-b border-gray-200"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">`);
        _push(ssrRenderComponent(_component_AppBreadcrumbs, { "auto-generate": _ctx.autoBreadcrumbs }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div>`);
      if (_ctx.showFooter) {
        _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-CzbYMVCK.mjs.map
