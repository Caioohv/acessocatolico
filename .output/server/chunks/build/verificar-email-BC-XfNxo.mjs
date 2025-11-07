import { _ as _sfc_main$1 } from './Card-CRvp106L.mjs';
import { _ as _sfc_main$4, a as _sfc_main$2 } from './Button-BeuMp5nt.mjs';
import { defineComponent, computed, ref, mergeProps, withCtx, unref, createTextVNode, createBlock, openBlock, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { d as useRoute, u as useHead, n as navigateTo } from './server.mjs';
import { u as useToast } from './useToast-Bm7hVh5T.mjs';
import 'reka-ui';
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
import '@vueuse/core';
import 'tailwind-variants';
import './index-B5rpN8hp.mjs';
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
import './NuxtImg-DFTKHYRn.mjs';
import './nuxt-link-Bn_O9NYZ.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "verificar-email",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const toast = useToast();
    useHead({
      title: "Verifica\xE7\xE3o de Email - AcessoCat\xF3lico",
      meta: [
        { name: "description", content: "Verifica\xE7\xE3o de email para cadastro de padre" }
      ]
    });
    computed(() => route.query.token);
    const pending = ref(false);
    const resending = ref(false);
    const verificationResult = ref(null);
    const error = ref(null);
    async function resendVerification() {
      resending.value = true;
      try {
        toast.add({
          title: "Email reenviado!",
          description: "Verifique sua caixa de entrada.",
          color: "green"
        });
        await navigateTo("/cadastro/padre/verificar-email-enviado");
      } catch (err) {
        console.error("Resend verification error:", err);
        toast.add({
          title: "Erro ao reenviar",
          description: "Tente novamente mais tarde.",
          color: "red"
        });
      } finally {
        resending.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$1;
      const _component_UIcon = _sfc_main$4;
      const _component_UButton = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4" }, _attrs))}><div class="max-w-md w-full">`);
      _push(ssrRenderComponent(_component_UCard, { class: "shadow-xl" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            if (unref(pending)) {
              _push2(`<div class="text-center py-8"${_scopeId}><div class="w-16 h-16 mx-auto mb-4"${_scopeId}><svg class="animate-spin w-full h-full text-purple-600" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg></div><h2 class="text-xl font-semibold text-gray-900 mb-2"${_scopeId}>Verificando email...</h2><p class="text-gray-600"${_scopeId}>Por favor, aguarde enquanto confirmamos seu email.</p></div>`);
            } else if ((_a = unref(verificationResult)) == null ? void 0 : _a.success) {
              _push2(`<div class="text-center py-8"${_scopeId}><div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check-circle",
                class: "w-8 h-8 text-green-600"
              }, null, _parent2, _scopeId));
              _push2(`</div><h2 class="text-xl font-semibold text-gray-900 mb-2"${_scopeId}>Email verificado com sucesso!</h2><p class="text-gray-600 mb-6"${_scopeId}>${ssrInterpolate(unref(verificationResult).message)}</p><div class="bg-blue-50 rounded-lg p-4 mb-6 text-left"${_scopeId}><h3 class="font-medium text-blue-900 mb-2"${_scopeId}>Pr\xF3ximos passos:</h3><ul class="text-sm text-blue-800 space-y-1"${_scopeId}><li${_scopeId}>\u2022 Seu cadastro est\xE1 agora em an\xE1lise</li><li${_scopeId}>\u2022 Nossa equipe analisar\xE1 em 2-3 dias \xFAteis</li><li${_scopeId}>\u2022 Voc\xEA receber\xE1 um email com o resultado</li></ul></div><div class="space-y-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                to: "/",
                size: "lg",
                class: "w-full",
                icon: "i-heroicons-home"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Voltar ao In\xEDcio `);
                  } else {
                    return [
                      createTextVNode(" Voltar ao In\xEDcio ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                to: "/cadastro/padre/status",
                variant: "outline",
                size: "lg",
                class: "w-full",
                icon: "i-heroicons-magnifying-glass"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Consultar Status `);
                  } else {
                    return [
                      createTextVNode(" Consultar Status ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<div class="text-center py-8"${_scopeId}><div class="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-x-circle",
                class: "w-8 h-8 text-red-600"
              }, null, _parent2, _scopeId));
              _push2(`</div><h2 class="text-xl font-semibold text-gray-900 mb-2"${_scopeId}>Erro na verifica\xE7\xE3o</h2><p class="text-gray-600 mb-6"${_scopeId}>${ssrInterpolate(((_b = unref(error)) == null ? void 0 : _b.message) || "Ocorreu um erro ao verificar seu email.")}</p><div class="bg-yellow-50 rounded-lg p-4 mb-6 text-left"${_scopeId}><h3 class="font-medium text-yellow-900 mb-2"${_scopeId}>Poss\xEDveis causas:</h3><ul class="text-sm text-yellow-800 space-y-1"${_scopeId}><li${_scopeId}>\u2022 Link de verifica\xE7\xE3o expirado (24 horas)</li><li${_scopeId}>\u2022 Link j\xE1 foi usado anteriormente</li><li${_scopeId}>\u2022 Link inv\xE1lido ou corrompido</li></ul></div><div class="space-y-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: resendVerification,
                loading: unref(resending),
                size: "lg",
                class: "w-full",
                icon: "i-heroicons-envelope"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Reenviar Email de Verifica\xE7\xE3o `);
                  } else {
                    return [
                      createTextVNode(" Reenviar Email de Verifica\xE7\xE3o ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                to: "/cadastro/padre",
                variant: "outline",
                size: "lg",
                class: "w-full",
                icon: "i-heroicons-arrow-left"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Voltar ao Cadastro `);
                  } else {
                    return [
                      createTextVNode(" Voltar ao Cadastro ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            }
          } else {
            return [
              unref(pending) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-center py-8"
              }, [
                createVNode("div", { class: "w-16 h-16 mx-auto mb-4" }, [
                  (openBlock(), createBlock("svg", {
                    class: "animate-spin w-full h-full text-purple-600",
                    fill: "none",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("circle", {
                      class: "opacity-25",
                      cx: "12",
                      cy: "12",
                      r: "10",
                      stroke: "currentColor",
                      "stroke-width": "4"
                    }),
                    createVNode("path", {
                      class: "opacity-75",
                      fill: "currentColor",
                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    })
                  ]))
                ]),
                createVNode("h2", { class: "text-xl font-semibold text-gray-900 mb-2" }, "Verificando email..."),
                createVNode("p", { class: "text-gray-600" }, "Por favor, aguarde enquanto confirmamos seu email.")
              ])) : ((_c = unref(verificationResult)) == null ? void 0 : _c.success) ? (openBlock(), createBlock("div", {
                key: 1,
                class: "text-center py-8"
              }, [
                createVNode("div", { class: "w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-check-circle",
                    class: "w-8 h-8 text-green-600"
                  })
                ]),
                createVNode("h2", { class: "text-xl font-semibold text-gray-900 mb-2" }, "Email verificado com sucesso!"),
                createVNode("p", { class: "text-gray-600 mb-6" }, toDisplayString(unref(verificationResult).message), 1),
                createVNode("div", { class: "bg-blue-50 rounded-lg p-4 mb-6 text-left" }, [
                  createVNode("h3", { class: "font-medium text-blue-900 mb-2" }, "Pr\xF3ximos passos:"),
                  createVNode("ul", { class: "text-sm text-blue-800 space-y-1" }, [
                    createVNode("li", null, "\u2022 Seu cadastro est\xE1 agora em an\xE1lise"),
                    createVNode("li", null, "\u2022 Nossa equipe analisar\xE1 em 2-3 dias \xFAteis"),
                    createVNode("li", null, "\u2022 Voc\xEA receber\xE1 um email com o resultado")
                  ])
                ]),
                createVNode("div", { class: "space-y-3" }, [
                  createVNode(_component_UButton, {
                    to: "/",
                    size: "lg",
                    class: "w-full",
                    icon: "i-heroicons-home"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Voltar ao In\xEDcio ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UButton, {
                    to: "/cadastro/padre/status",
                    variant: "outline",
                    size: "lg",
                    class: "w-full",
                    icon: "i-heroicons-magnifying-glass"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Consultar Status ")
                    ]),
                    _: 1
                  })
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 2,
                class: "text-center py-8"
              }, [
                createVNode("div", { class: "w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-x-circle",
                    class: "w-8 h-8 text-red-600"
                  })
                ]),
                createVNode("h2", { class: "text-xl font-semibold text-gray-900 mb-2" }, "Erro na verifica\xE7\xE3o"),
                createVNode("p", { class: "text-gray-600 mb-6" }, toDisplayString(((_d = unref(error)) == null ? void 0 : _d.message) || "Ocorreu um erro ao verificar seu email."), 1),
                createVNode("div", { class: "bg-yellow-50 rounded-lg p-4 mb-6 text-left" }, [
                  createVNode("h3", { class: "font-medium text-yellow-900 mb-2" }, "Poss\xEDveis causas:"),
                  createVNode("ul", { class: "text-sm text-yellow-800 space-y-1" }, [
                    createVNode("li", null, "\u2022 Link de verifica\xE7\xE3o expirado (24 horas)"),
                    createVNode("li", null, "\u2022 Link j\xE1 foi usado anteriormente"),
                    createVNode("li", null, "\u2022 Link inv\xE1lido ou corrompido")
                  ])
                ]),
                createVNode("div", { class: "space-y-3" }, [
                  createVNode(_component_UButton, {
                    onClick: resendVerification,
                    loading: unref(resending),
                    size: "lg",
                    class: "w-full",
                    icon: "i-heroicons-envelope"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Reenviar Email de Verifica\xE7\xE3o ")
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  createVNode(_component_UButton, {
                    to: "/cadastro/padre",
                    variant: "outline",
                    size: "lg",
                    class: "w-full",
                    icon: "i-heroicons-arrow-left"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Voltar ao Cadastro ")
                    ]),
                    _: 1
                  })
                ])
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cadastro/padre/verificar-email.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=verificar-email-BC-XfNxo.mjs.map
