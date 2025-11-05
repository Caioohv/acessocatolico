import { defineComponent, computed, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { u as useAppState } from './useAppState-xeQmwOSX.mjs';
import { u as useAuth } from './useAuth-CemiwPt3.mjs';
import { u as usePermissions } from './usePermissions-CcH6Zync.mjs';
import './server.mjs';
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
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const { isLoading, loadingMessage } = useAppState();
    useAuth();
    const { hasMinimumRole } = usePermissions();
    const dashboardNavigation = computed(() => {
      const sections = [
        {
          title: "Vis\xE3o Geral",
          items: [
            { name: "Dashboard", href: "/dashboard", icon: "i-heroicons-squares-2x2-20-solid" },
            { name: "Meu Perfil", href: "/profile", icon: "i-heroicons-user-circle-20-solid" }
          ]
        }
      ];
      const managementItems = [];
      if (hasMinimumRole("ORGANIZER")) {
        managementItems.push(
          { name: "Eventos", href: "/dashboard/events", icon: "i-heroicons-calendar-days-20-solid" },
          { name: "Minist\xE9rios", href: "/dashboard/ministries", icon: "i-heroicons-user-group-20-solid" }
        );
      }
      if (hasMinimumRole("PRIEST")) {
        managementItems.push(
          { name: "Par\xF3quias", href: "/dashboard/parishes", icon: "i-heroicons-building-library-20-solid" },
          { name: "Agendamentos", href: "/dashboard/appointments", icon: "i-heroicons-calendar-20-solid" }
        );
      }
      if (hasMinimumRole("ADMIN")) {
        managementItems.push(
          { name: "Usu\xE1rios", href: "/dashboard/users", icon: "i-heroicons-users-20-solid" },
          { name: "Configura\xE7\xF5es", href: "/dashboard/settings", icon: "i-heroicons-cog-6-tooth-20-solid" }
        );
      }
      if (managementItems.length > 0) {
        sections.push({
          title: "Gest\xE3o",
          items: managementItems
        });
      }
      if (hasMinimumRole("ORGANIZER")) {
        sections.push({
          title: "Relat\xF3rios",
          items: [
            { name: "Analytics", href: "/dashboard/analytics", icon: "i-heroicons-chart-bar-20-solid" },
            { name: "Relat\xF3rios", href: "/dashboard/reports", icon: "i-heroicons-document-chart-bar-20-solid" }
          ]
        });
      }
      return sections;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingOverlay = resolveComponent("LoadingOverlay");
      const _component_AppHeader = resolveComponent("AppHeader");
      const _component_AppSidebar = resolveComponent("AppSidebar");
      const _component_AppBreadcrumbs = resolveComponent("AppBreadcrumbs");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_LoadingOverlay, {
        show: unref(isLoading),
        message: unref(loadingMessage)
      }, null, _parent));
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<div class="flex">`);
      _push(ssrRenderComponent(_component_AppSidebar, {
        title: "Dashboard",
        navigation: unref(dashboardNavigation)
      }, null, _parent));
      _push(`<main class="flex-1 min-w-0"><div class="bg-white border-b border-gray-200"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">`);
      _push(ssrRenderComponent(_component_AppBreadcrumbs, { "auto-generate": "" }, null, _parent));
      _push(`</div></div><div class="p-6">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-Dvoqh3eu.mjs.map
