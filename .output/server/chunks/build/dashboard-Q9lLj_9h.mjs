import { defineComponent, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, useSlots, computed, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { Primitive } from 'reka-ui';
import { h as _sfc_main$3, _ as _sfc_main$4, a as _sfc_main$2, t as tv } from './Button-HUtl9tHz.mjs';
import { a as useAppConfig } from './server.mjs';
import { u as useAuth } from './useAuth-Dq4ZNIKa.mjs';
import { u as usePermissions } from './usePermissions-CQah5Vn6.mjs';
import { u as useAppState } from './useAppState-Dl6EejkD.mjs';
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
import '@vueuse/core';
import 'tailwind-variants';
import './index-B4nyd6v-.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import './NuxtImg-JsLvlz-l.mjs';
import './nuxt-link-CnVzKLvW.mjs';
import 'pinia';
import 'vue-router';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const theme = {
  "slots": {
    "root": "rounded-lg",
    "header": "p-4 sm:px-6",
    "body": "p-4 sm:p-6",
    "footer": "p-4 sm:px-6"
  },
  "variants": {
    "variant": {
      "solid": {
        "root": "bg-inverted text-inverted"
      },
      "outline": {
        "root": "bg-default ring ring-default divide-y divide-default"
      },
      "soft": {
        "root": "bg-elevated/50 divide-y divide-default"
      },
      "subtle": {
        "root": "bg-elevated/50 ring ring-default divide-y divide-default"
      }
    }
  },
  "defaultVariants": {
    "variant": "outline"
  }
};
const _sfc_main$1 = {
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    variant: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const ui = computed(() => {
      var _a;
      return tv({ extend: tv(theme), ...((_a = appConfig.ui) == null ? void 0 : _a.card) || {} })({
        variant: props.variant
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value.root({ class: [(_a = props.ui) == null ? void 0 : _a.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d, _e, _f;
          if (_push2) {
            if (!!slots.header) {
              _push2(`<div class="${ssrRenderClass(ui.value.header({ class: (_a2 = props.ui) == null ? void 0 : _a2.header }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "header", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!!slots.default) {
              _push2(`<div class="${ssrRenderClass(ui.value.body({ class: (_b = props.ui) == null ? void 0 : _b.body }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!!slots.footer) {
              _push2(`<div class="${ssrRenderClass(ui.value.footer({ class: (_c = props.ui) == null ? void 0 : _c.footer }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !!slots.header ? (openBlock(), createBlock("div", {
                key: 0,
                class: ui.value.header({ class: (_d = props.ui) == null ? void 0 : _d.header })
              }, [
                renderSlot(_ctx.$slots, "header")
              ], 2)) : createCommentVNode("", true),
              !!slots.default ? (openBlock(), createBlock("div", {
                key: 1,
                class: ui.value.body({ class: (_e = props.ui) == null ? void 0 : _e.body })
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 2)) : createCommentVNode("", true),
              !!slots.footer ? (openBlock(), createBlock("div", {
                key: 2,
                class: ui.value.footer({ class: (_f = props.ui) == null ? void 0 : _f.footer })
              }, [
                renderSlot(_ctx.$slots, "footer")
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const { hasMinimumRole } = usePermissions();
    const { setBreadcrumbs } = useAppState();
    setBreadcrumbs([
      { label: "In\xEDcio", to: "/" },
      { label: "Dashboard" }
    ]);
    const getRoleLabel = (role) => {
      const roleLabels = {
        "ADMIN": "Administrador",
        "PRIEST": "Padre",
        "ORGANIZER": "Organizador",
        "MEMBER": "Membro",
        "VISITOR": "Visitante"
      };
      return roleLabels[role || ""] || role;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_UCard = _sfc_main$1;
      const _component_UAvatar = _sfc_main$3;
      const _component_UIcon = _sfc_main$4;
      const _component_UButton = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div><h1 class="text-2xl font-bold text-gray-900 font-serif"> Dashboard </h1><p class="mt-1 text-sm text-gray-600"> Bem-vindo, ${ssrInterpolate((_b = (_a = unref(user)) == null ? void 0 : _a.profile) == null ? void 0 : _b.firstName)}! Aqui voc\xEA pode gerenciar suas atividades. </p></div><div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">`);
      _push(ssrRenderComponent(_component_UCard, { class: "sacred-shadow" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
          if (_push2) {
            _push2(`<div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UAvatar, {
              src: (_b2 = (_a2 = unref(user)) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.avatar,
              alt: (_d = (_c = unref(user)) == null ? void 0 : _c.profile) == null ? void 0 : _d.firstName,
              size: "md"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-4"${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}>Bem-vindo</p><p class="text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate((_f = (_e = unref(user)) == null ? void 0 : _e.profile) == null ? void 0 : _f.firstName)}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode("div", { class: "flex-shrink-0" }, [
                  createVNode(_component_UAvatar, {
                    src: (_h = (_g = unref(user)) == null ? void 0 : _g.profile) == null ? void 0 : _h.avatar,
                    alt: (_j = (_i = unref(user)) == null ? void 0 : _i.profile) == null ? void 0 : _j.firstName,
                    size: "md"
                  }, null, 8, ["src", "alt"])
                ]),
                createVNode("div", { class: "ml-4" }, [
                  createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Bem-vindo"),
                  createVNode("p", { class: "text-lg font-semibold text-gray-900" }, toDisplayString((_l = (_k = unref(user)) == null ? void 0 : _k.profile) == null ? void 0 : _l.firstName), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, { class: "border-l-4 border-primary-500" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2;
          if (_push2) {
            _push2(`<div class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-shield-check-20-solid",
              class: "h-8 w-8 text-primary-600"
            }, null, _parent2, _scopeId));
            _push2(`<div class="ml-4"${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}>Papel</p><p class="text-lg font-semibold text-primary-700"${_scopeId}>${ssrInterpolate(getRoleLabel((_a2 = unref(user)) == null ? void 0 : _a2.role))}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-shield-check-20-solid",
                  class: "h-8 w-8 text-primary-600"
                }),
                createVNode("div", { class: "ml-4" }, [
                  createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Papel"),
                  createVNode("p", { class: "text-lg font-semibold text-primary-700" }, toDisplayString(getRoleLabel((_b2 = unref(user)) == null ? void 0 : _b2.role)), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, { class: "border-l-4 border-secondary-500" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-plus-circle-20-solid",
              class: "h-8 w-8 text-secondary-600"
            }, null, _parent2, _scopeId));
            _push2(`<div class="ml-4"${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}>A\xE7\xF5es r\xE1pidas</p><p class="text-lg font-semibold text-secondary-700"${_scopeId}> Dispon\xEDvel </p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-plus-circle-20-solid",
                  class: "h-8 w-8 text-secondary-600"
                }),
                createVNode("div", { class: "ml-4" }, [
                  createVNode("p", { class: "text-sm font-medium text-gray-600" }, "A\xE7\xF5es r\xE1pidas"),
                  createVNode("p", { class: "text-lg font-semibold text-secondary-700" }, " Dispon\xEDvel ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, { class: "border-l-4 border-success-500" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check-circle-20-solid",
              class: "h-8 w-8 text-success-600"
            }, null, _parent2, _scopeId));
            _push2(`<div class="ml-4"${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}>Status</p><p class="text-lg font-semibold text-success-700"${_scopeId}> Ativo </p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-check-circle-20-solid",
                  class: "h-8 w-8 text-success-600"
                }),
                createVNode("div", { class: "ml-4" }, [
                  createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Status"),
                  createVNode("p", { class: "text-lg font-semibold text-success-700" }, " Ativo ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(hasMinimumRole)("ORGANIZER")) {
        _push(`<div class="space-y-6"><h2 class="text-xl font-semibold text-gray-900 font-serif"> Gest\xE3o de Eventos </h2><div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`);
        _push(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="text-lg font-medium text-gray-900"${_scopeId}>Eventos Recentes</h3>`);
              _push2(ssrRenderComponent(_component_UButton, {
                size: "sm",
                variant: "outline",
                to: "/dashboard/events"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Ver todos `);
                  } else {
                    return [
                      createTextVNode(" Ver todos ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Eventos Recentes"),
                  createVNode(_component_UButton, {
                    size: "sm",
                    variant: "outline",
                    to: "/dashboard/events"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Ver todos ")
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-3"${_scopeId}><div class="text-center py-8 text-gray-500"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-calendar-days-20-solid",
                class: "h-8 w-8 mx-auto mb-2"
              }, null, _parent2, _scopeId));
              _push2(`<p${_scopeId}>Nenhum evento encontrado</p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                class: "mt-3",
                size: "sm",
                to: "/dashboard/events/create"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Criar primeiro evento `);
                  } else {
                    return [
                      createTextVNode(" Criar primeiro evento ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-3" }, [
                  createVNode("div", { class: "text-center py-8 text-gray-500" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-calendar-days-20-solid",
                      class: "h-8 w-8 mx-auto mb-2"
                    }),
                    createVNode("p", null, "Nenhum evento encontrado"),
                    createVNode(_component_UButton, {
                      class: "mt-3",
                      size: "sm",
                      to: "/dashboard/events/create"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Criar primeiro evento ")
                      ]),
                      _: 1
                    })
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h3 class="text-lg font-medium text-gray-900"${_scopeId}>A\xE7\xF5es R\xE1pidas</h3>`);
            } else {
              return [
                createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "A\xE7\xF5es R\xE1pidas")
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                block: "",
                variant: "outline",
                to: "/dashboard/events/create"
              }, {
                leading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-plus-20-solid" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UIcon, { name: "i-heroicons-plus-20-solid" })
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Criar Evento `);
                  } else {
                    return [
                      createTextVNode(" Criar Evento ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                block: "",
                variant: "outline",
                to: "/dashboard/ministries"
              }, {
                leading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-user-group-20-solid" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UIcon, { name: "i-heroicons-user-group-20-solid" })
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Gerenciar Minist\xE9rios `);
                  } else {
                    return [
                      createTextVNode(" Gerenciar Minist\xE9rios ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(hasMinimumRole)("PRIEST")) {
                _push2(ssrRenderComponent(_component_UButton, {
                  block: "",
                  variant: "outline",
                  to: "/dashboard/parishes"
                }, {
                  leading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-building-library-20-solid" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UIcon, { name: "i-heroicons-building-library-20-solid" })
                      ];
                    }
                  }),
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Gerenciar Par\xF3quias `);
                    } else {
                      return [
                        createTextVNode(" Gerenciar Par\xF3quias ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-3" }, [
                  createVNode(_component_UButton, {
                    block: "",
                    variant: "outline",
                    to: "/dashboard/events/create"
                  }, {
                    leading: withCtx(() => [
                      createVNode(_component_UIcon, { name: "i-heroicons-plus-20-solid" })
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Criar Evento ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UButton, {
                    block: "",
                    variant: "outline",
                    to: "/dashboard/ministries"
                  }, {
                    leading: withCtx(() => [
                      createVNode(_component_UIcon, { name: "i-heroicons-user-group-20-solid" })
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Gerenciar Minist\xE9rios ")
                    ]),
                    _: 1
                  }),
                  unref(hasMinimumRole)("PRIEST") ? (openBlock(), createBlock(_component_UButton, {
                    key: 0,
                    block: "",
                    variant: "outline",
                    to: "/dashboard/parishes"
                  }, {
                    leading: withCtx(() => [
                      createVNode(_component_UIcon, { name: "i-heroicons-building-library-20-solid" })
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" Gerenciar Par\xF3quias ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="space-y-6"><h2 class="text-xl font-semibold text-gray-900 font-serif"> Suas Atividades </h2>`);
        _push(ssrRenderComponent(_component_UCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-center py-12"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-heart-20-solid",
                class: "h-12 w-12 text-primary-600 mx-auto mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-lg font-medium text-gray-900 mb-2"${_scopeId}> Bem-vindo \xE0 comunidade! </h3><p class="text-gray-600 mb-6"${_scopeId}> Explore par\xF3quias, participe de eventos e fortale\xE7a sua f\xE9. </p><div class="flex flex-col sm:flex-row gap-3 justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, { to: "/parishes" }, {
                leading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-building-library-20-solid" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UIcon, { name: "i-heroicons-building-library-20-solid" })
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Encontrar Par\xF3quias `);
                  } else {
                    return [
                      createTextVNode(" Encontrar Par\xF3quias ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                variant: "outline",
                to: "/events"
              }, {
                leading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-calendar-days-20-solid" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UIcon, { name: "i-heroicons-calendar-days-20-solid" })
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Ver Eventos `);
                  } else {
                    return [
                      createTextVNode(" Ver Eventos ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "text-center py-12" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-heart-20-solid",
                    class: "h-12 w-12 text-primary-600 mx-auto mb-4"
                  }),
                  createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-2" }, " Bem-vindo \xE0 comunidade! "),
                  createVNode("p", { class: "text-gray-600 mb-6" }, " Explore par\xF3quias, participe de eventos e fortale\xE7a sua f\xE9. "),
                  createVNode("div", { class: "flex flex-col sm:flex-row gap-3 justify-center" }, [
                    createVNode(_component_UButton, { to: "/parishes" }, {
                      leading: withCtx(() => [
                        createVNode(_component_UIcon, { name: "i-heroicons-building-library-20-solid" })
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" Encontrar Par\xF3quias ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UButton, {
                      variant: "outline",
                      to: "/events"
                    }, {
                      leading: withCtx(() => [
                        createVNode(_component_UIcon, { name: "i-heroicons-calendar-days-20-solid" })
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" Ver Eventos ")
                      ]),
                      _: 1
                    })
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-Q9lLj_9h.mjs.map
