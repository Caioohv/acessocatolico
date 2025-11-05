import { _ as _sfc_main$4, a as _sfc_main$5, u as useFormField, t as tv } from './Button-CC2F9OIm.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-x9LBqr49.mjs';
import { _ as _sfc_main$2 } from './Form-CarY1YRf.mjs';
import { _ as _sfc_main$3 } from './Input-Df9o2muy.mjs';
import { defineComponent, reactive, ref, resolveComponent, mergeProps, withCtx, createTextVNode, unref, createVNode, mergeModels, useSlots, useModel, useId, computed, createBlock, openBlock, resolveDynamicComponent, renderSlot, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderVNode, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { useForwardProps, Primitive, Label, CheckboxRoot, CheckboxIndicator } from 'reka-ui';
import { reactivePick } from '@vueuse/core';
import { b as useRouter, a as useAppConfig } from './server.mjs';
import { _ as _sfc_main$6 } from './Alert-lFNU5Tog.mjs';
import { z } from 'zod';
import { u as useAuth } from './useAuth-CemiwPt3.mjs';
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
import 'tailwind-variants';
import './index-BLV2M5Xj.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import './NuxtImg-W6FuIgZN.mjs';
import 'pinia';
import 'vue-router';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import './useLocale-D1oZNCep.mjs';

const theme = {
  "slots": {
    "root": "relative flex items-start",
    "container": "flex items-center",
    "base": "rounded-sm ring ring-inset ring-accented overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2",
    "indicator": "flex items-center justify-center size-full text-inverted",
    "icon": "shrink-0 size-full",
    "wrapper": "w-full",
    "label": "block font-medium text-default",
    "description": "text-muted"
  },
  "variants": {
    "color": {
      "primary": {
        "base": "focus-visible:outline-primary",
        "indicator": "bg-primary"
      },
      "primary-light": {
        "base": "focus-visible:outline-primary-light",
        "indicator": "bg-primary-light"
      },
      "primary-lighter": {
        "base": "focus-visible:outline-primary-lighter",
        "indicator": "bg-primary-lighter"
      },
      "secondary": {
        "base": "focus-visible:outline-secondary",
        "indicator": "bg-secondary"
      },
      "secondary-light": {
        "base": "focus-visible:outline-secondary-light",
        "indicator": "bg-secondary-light"
      },
      "ui-darker": {
        "base": "focus-visible:outline-ui-darker",
        "indicator": "bg-ui-darker"
      },
      "ui-dark": {
        "base": "focus-visible:outline-ui-dark",
        "indicator": "bg-ui-dark"
      },
      "ui": {
        "base": "focus-visible:outline-ui",
        "indicator": "bg-ui"
      },
      "ui-light": {
        "base": "focus-visible:outline-ui-light",
        "indicator": "bg-ui-light"
      },
      "ui-lighter": {
        "base": "focus-visible:outline-ui-lighter",
        "indicator": "bg-ui-lighter"
      },
      "neutral": {
        "base": "focus-visible:outline-inverted",
        "indicator": "bg-inverted"
      }
    },
    "variant": {
      "list": {
        "root": ""
      },
      "card": {
        "root": "border border-muted rounded-lg"
      }
    },
    "indicator": {
      "start": {
        "root": "flex-row",
        "wrapper": "ms-2"
      },
      "end": {
        "root": "flex-row-reverse",
        "wrapper": "me-2"
      },
      "hidden": {
        "base": "sr-only",
        "wrapper": "text-center"
      }
    },
    "size": {
      "xs": {
        "base": "size-3",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "sm": {
        "base": "size-3.5",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "md": {
        "base": "size-4",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "lg": {
        "base": "size-4.5",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "xl": {
        "base": "size-5",
        "container": "h-6",
        "wrapper": "text-base"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "disabled": {
      "true": {
        "base": "cursor-not-allowed opacity-75",
        "label": "cursor-not-allowed opacity-75",
        "description": "cursor-not-allowed opacity-75"
      }
    },
    "checked": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "size": "xs",
      "variant": "card",
      "class": {
        "root": "p-2.5"
      }
    },
    {
      "size": "sm",
      "variant": "card",
      "class": {
        "root": "p-3"
      }
    },
    {
      "size": "md",
      "variant": "card",
      "class": {
        "root": "p-3.5"
      }
    },
    {
      "size": "lg",
      "variant": "card",
      "class": {
        "root": "p-4"
      }
    },
    {
      "size": "xl",
      "variant": "card",
      "class": {
        "root": "p-4.5"
      }
    },
    {
      "color": "primary",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-primary"
      }
    },
    {
      "color": "primary-light",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-primary-light"
      }
    },
    {
      "color": "primary-lighter",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-primary-lighter"
      }
    },
    {
      "color": "secondary",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-secondary"
      }
    },
    {
      "color": "secondary-light",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-secondary-light"
      }
    },
    {
      "color": "ui-darker",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-ui-darker"
      }
    },
    {
      "color": "ui-dark",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-ui-dark"
      }
    },
    {
      "color": "ui",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-ui"
      }
    },
    {
      "color": "ui-light",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-ui-light"
      }
    },
    {
      "color": "ui-lighter",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-ui-lighter"
      }
    },
    {
      "color": "neutral",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-inverted"
      }
    },
    {
      "variant": "card",
      "disabled": true,
      "class": {
        "root": "cursor-not-allowed opacity-75"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "list",
    "indicator": "start"
  }
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    as: { type: null, required: false },
    label: { type: String, required: false },
    description: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    indicator: { type: null, required: false },
    icon: { type: String, required: false },
    indeterminateIcon: { type: String, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    disabled: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    name: { type: String, required: false },
    value: { type: [String, Number, Object, null], required: false },
    id: { type: String, required: false },
    defaultValue: { type: [Boolean, String], required: false }
  }, {
    "modelValue": { type: [Boolean, String], ...{ default: void 0 } },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["change"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    var _a;
    const props = __props;
    const slots = useSlots();
    const emits = __emit;
    const modelValue = useModel(__props, "modelValue", { type: [Boolean, String], ...{ default: void 0 } });
    const appConfig = useAppConfig();
    const rootProps = useForwardProps(reactivePick(props, "required", "value", "defaultValue"));
    const { id: _id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField(props);
    const id = (_a = _id.value) != null ? _a : useId();
    const ui = computed(() => {
      var _a2;
      return tv({ extend: tv(theme), ...((_a2 = appConfig.ui) == null ? void 0 : _a2.checkbox) || {} })({
        size: size.value,
        color: color.value,
        variant: props.variant,
        indicator: props.indicator,
        required: props.required,
        disabled: disabled.value
      });
    });
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: !__props.variant || __props.variant === "list" ? __props.as : unref(Label),
        class: ui.value.root({ class: [(_a2 = props.ui) == null ? void 0 : _a2.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a22, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(ui.value.container({ class: (_a22 = props.ui) == null ? void 0 : _a22.container }))}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckboxRoot), mergeProps({ id: unref(id) }, { ...unref(rootProps), ..._ctx.$attrs, ...unref(ariaAttrs) }, {
              modelValue: modelValue.value,
              "onUpdate:modelValue": [($event) => modelValue.value = $event, onUpdate],
              name: unref(name),
              disabled: unref(disabled),
              class: ui.value.base({ class: (_b = props.ui) == null ? void 0 : _b.base })
            }), {
              default: withCtx(({ modelValue: modelValue2 }, _push3, _parent3, _scopeId2) => {
                var _a3, _b2;
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CheckboxIndicator), {
                    class: ui.value.indicator({ class: (_a3 = props.ui) == null ? void 0 : _a3.indicator })
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      var _a4, _b3, _c2, _d2;
                      if (_push4) {
                        if (modelValue2 === "indeterminate") {
                          _push4(ssrRenderComponent(_sfc_main$4, {
                            name: __props.indeterminateIcon || unref(appConfig).ui.icons.minus,
                            class: ui.value.icon({ class: (_a4 = props.ui) == null ? void 0 : _a4.icon })
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(_sfc_main$4, {
                            name: __props.icon || unref(appConfig).ui.icons.check,
                            class: ui.value.icon({ class: (_b3 = props.ui) == null ? void 0 : _b3.icon })
                          }, null, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          modelValue2 === "indeterminate" ? (openBlock(), createBlock(_sfc_main$4, {
                            key: 0,
                            name: __props.indeterminateIcon || unref(appConfig).ui.icons.minus,
                            class: ui.value.icon({ class: (_c2 = props.ui) == null ? void 0 : _c2.icon })
                          }, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$4, {
                            key: 1,
                            name: __props.icon || unref(appConfig).ui.icons.check,
                            class: ui.value.icon({ class: (_d2 = props.ui) == null ? void 0 : _d2.icon })
                          }, null, 8, ["name", "class"]))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(CheckboxIndicator), {
                      class: ui.value.indicator({ class: (_b2 = props.ui) == null ? void 0 : _b2.indicator })
                    }, {
                      default: withCtx(() => {
                        var _a4, _b3;
                        return [
                          modelValue2 === "indeterminate" ? (openBlock(), createBlock(_sfc_main$4, {
                            key: 0,
                            name: __props.indeterminateIcon || unref(appConfig).ui.icons.minus,
                            class: ui.value.icon({ class: (_a4 = props.ui) == null ? void 0 : _a4.icon })
                          }, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$4, {
                            key: 1,
                            name: __props.icon || unref(appConfig).ui.icons.check,
                            class: ui.value.icon({ class: (_b3 = props.ui) == null ? void 0 : _b3.icon })
                          }, null, 8, ["name", "class"]))
                        ];
                      }),
                      _: 2
                    }, 1032, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.label || !!slots.label || (__props.description || !!slots.description)) {
              _push2(`<div class="${ssrRenderClass(ui.value.wrapper({ class: (_c = props.ui) == null ? void 0 : _c.wrapper }))}"${_scopeId}>`);
              if (__props.label || !!slots.label) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? unref(Label) : "p"), {
                  for: unref(id),
                  class: ui.value.label({ class: (_d = props.ui) == null ? void 0 : _d.label })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, "label", { label: __props.label }, () => {
                        _push3(`${ssrInterpolate(__props.label)}`);
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                          createTextVNode(toDisplayString(__props.label), 1)
                        ])
                      ];
                    }
                  }),
                  _: 3
                }), _parent2, _scopeId);
              } else {
                _push2(`<!---->`);
              }
              if (__props.description || !!slots.description) {
                _push2(`<p class="${ssrRenderClass(ui.value.description({ class: (_e = props.ui) == null ? void 0 : _e.description }))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "description", { description: __props.description }, () => {
                  _push2(`${ssrInterpolate(__props.description)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                class: ui.value.container({ class: (_f = props.ui) == null ? void 0 : _f.container })
              }, [
                createVNode(unref(CheckboxRoot), mergeProps({ id: unref(id) }, { ...unref(rootProps), ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                  modelValue: modelValue.value,
                  "onUpdate:modelValue": [($event) => modelValue.value = $event, onUpdate],
                  name: unref(name),
                  disabled: unref(disabled),
                  class: ui.value.base({ class: (_g = props.ui) == null ? void 0 : _g.base })
                }), {
                  default: withCtx(({ modelValue: modelValue2 }) => {
                    var _a3;
                    return [
                      createVNode(unref(CheckboxIndicator), {
                        class: ui.value.indicator({ class: (_a3 = props.ui) == null ? void 0 : _a3.indicator })
                      }, {
                        default: withCtx(() => {
                          var _a4, _b2;
                          return [
                            modelValue2 === "indeterminate" ? (openBlock(), createBlock(_sfc_main$4, {
                              key: 0,
                              name: __props.indeterminateIcon || unref(appConfig).ui.icons.minus,
                              class: ui.value.icon({ class: (_a4 = props.ui) == null ? void 0 : _a4.icon })
                            }, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$4, {
                              key: 1,
                              name: __props.icon || unref(appConfig).ui.icons.check,
                              class: ui.value.icon({ class: (_b2 = props.ui) == null ? void 0 : _b2.icon })
                            }, null, 8, ["name", "class"]))
                          ];
                        }),
                        _: 2
                      }, 1032, ["class"])
                    ];
                  }),
                  _: 1
                }, 16, ["id", "modelValue", "onUpdate:modelValue", "name", "disabled", "class"])
              ], 2),
              __props.label || !!slots.label || (__props.description || !!slots.description) ? (openBlock(), createBlock("div", {
                key: 0,
                class: ui.value.wrapper({ class: (_h = props.ui) == null ? void 0 : _h.wrapper })
              }, [
                __props.label || !!slots.label ? (openBlock(), createBlock(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? unref(Label) : "p"), {
                  key: 0,
                  for: unref(id),
                  class: ui.value.label({ class: (_i = props.ui) == null ? void 0 : _i.label })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                      createTextVNode(toDisplayString(__props.label), 1)
                    ])
                  ]),
                  _: 3
                }, 8, ["for", "class"])) : createCommentVNode("", true),
                __props.description || !!slots.description ? (openBlock(), createBlock("p", {
                  key: 1,
                  class: ui.value.description({ class: (_j = props.ui) == null ? void 0 : _j.description })
                }, [
                  renderSlot(_ctx.$slots, "description", { description: __props.description }, () => [
                    createTextVNode(toDisplayString(__props.description), 1)
                  ])
                ], 2)) : createCommentVNode("", true)
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Checkbox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
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
      const _component_UForm = _sfc_main$2;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_UInput = _sfc_main$3;
      const _component_UCheckbox = _sfc_main$1;
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
//# sourceMappingURL=login-DvpZ8fPa.mjs.map
