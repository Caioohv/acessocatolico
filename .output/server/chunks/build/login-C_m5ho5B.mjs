import { _ as _sfc_main$4, a as _sfc_main$5 } from './Button-BeuMp5nt.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-Bn_O9NYZ.mjs';
import { _ as _sfc_main$1 } from './Form-ClTyhc7H.mjs';
import { _ as _sfc_main$2 } from './Input-CMCaI9pM.mjs';
import { _ as _sfc_main$3 } from './Checkbox-TTF3FY4d.mjs';
import { _ as _sfc_main$6 } from './Alert-B71gfiAR.mjs';
import { defineComponent, reactive, ref, resolveComponent, mergeProps, withCtx, createTextVNode, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { z } from 'zod';
import { u as useAuth } from './useAuth-CzBu1cjT.mjs';
import { a as useRouter } from './server.mjs';
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
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import './index-B5rpN8hp.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import './NuxtImg-DFTKHYRn.mjs';
import './useLocale-CtluvDKB.mjs';
import 'pinia';
import 'vue-router';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { login } = useAuth();
    const router = useRouter();
    const loginSchema = z.object({
      email: z.string().email("Email inv\xE1lido"),
      password: z.string().min(6, "Senha deve ter no m\xEDnimo 6 caracteres")
    });
    const form = reactive({
      email: "",
      password: "",
      remember: false
    });
    const loading = ref(false);
    const error = ref(null);
    const handleLogin = async () => {
      try {
        loading.value = true;
        error.value = null;
        const result = await login(form.email, form.password);
        if (result.success) {
          await router.push("/dashboard");
        } else {
          error.value = result.error;
        }
      } catch (err) {
        error.value = err.message || "Erro no login";
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$4;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UForm = _sfc_main$1;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_UInput = _sfc_main$2;
      const _component_UCheckbox = _sfc_main$3;
      const _component_UButton = _sfc_main$5;
      const _component_UAlert = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="max-w-md w-full space-y-8"><div><div class="mx-auto h-12 w-12 text-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cross",
        class: "h-12 w-12 text-primary-600"
      }, null, _parent));
      _push(`</div><h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900"> Entre na sua conta </h2><p class="mt-2 text-center text-sm text-gray-600"> Ou `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "font-medium text-primary-600 hover:text-primary-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` crie uma nova conta `);
          } else {
            return [
              createTextVNode(" crie uma nova conta ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div>`);
      _push(ssrRenderComponent(_component_UForm, {
        schema: unref(loginSchema),
        state: unref(form),
        onSubmit: handleLogin,
        class: "mt-8 space-y-6"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Email",
              name: "email",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    type: "email",
                    placeholder: "seu@email.com",
                    icon: "i-heroicons-envelope"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(form).email,
                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                      type: "email",
                      placeholder: "seu@email.com",
                      icon: "i-heroicons-envelope"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Senha",
              name: "password",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    placeholder: "Digite sua senha",
                    icon: "i-heroicons-lock-closed"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(form).password,
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      type: "password",
                      placeholder: "Digite sua senha",
                      icon: "i-heroicons-lock-closed"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-between"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UCheckbox, {
              modelValue: unref(form).remember,
              "onUpdate:modelValue": ($event) => unref(form).remember = $event,
              label: "Lembrar de mim"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/forgot-password",
              class: "text-sm text-primary-600 hover:text-primary-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Esqueceu a senha? `);
                } else {
                  return [
                    createTextVNode(" Esqueceu a senha? ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_UButton, {
              type: "submit",
              block: "",
              size: "lg",
              loading: unref(loading),
              disabled: unref(loading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Entrar `);
                } else {
                  return [
                    createTextVNode(" Entrar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode(_component_UFormGroup, {
                  label: "Email",
                  name: "email",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: unref(form).email,
                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                      type: "email",
                      placeholder: "seu@email.com",
                      icon: "i-heroicons-envelope"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormGroup, {
                  label: "Senha",
                  name: "password",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: unref(form).password,
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      type: "password",
                      placeholder: "Digite sua senha",
                      icon: "i-heroicons-lock-closed"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode(_component_UCheckbox, {
                  modelValue: unref(form).remember,
                  "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                  label: "Lembrar de mim"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_NuxtLink, {
                  to: "/forgot-password",
                  class: "text-sm text-primary-600 hover:text-primary-500"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Esqueceu a senha? ")
                  ]),
                  _: 1
                })
              ]),
              createVNode(_component_UButton, {
                type: "submit",
                block: "",
                size: "lg",
                loading: unref(loading),
                disabled: unref(loading)
              }, {
                default: withCtx(() => [
                  createTextVNode(" Entrar ")
                ]),
                _: 1
              }, 8, ["loading", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` `);
      if (unref(error)) {
        _push(ssrRenderComponent(_component_UAlert, {
          color: "primary",
          variant: "soft",
          title: unref(error),
          "close-button": { icon: "i-heroicons-x-mark-20-solid", color: "primary", variant: "link" },
          onClose: ($event) => error.value = null
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-C_m5ho5B.mjs.map
