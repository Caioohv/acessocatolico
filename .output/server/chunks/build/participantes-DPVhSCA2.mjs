import { a as _sfc_main$2, _ as _sfc_main$4, t as tv, h as _sfc_main$3$1, i as get } from './Button-BeuMp5nt.mjs';
import { defineComponent, ref, reactive, watch, resolveComponent, mergeProps, withCtx, createTextVNode, unref, isRef, toDisplayString, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, withModifiers, readonly, useSlots, computed, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderSlot, ssrRenderClass } from 'vue/server-renderer';
import { useForwardPropsEmits, TabsRoot, TabsList, TabsIndicator, TabsTrigger, TabsContent } from 'reka-ui';
import { reactivePick } from '@vueuse/core';
import { _ as _export_sfc, e as useNuxtApp, i as useAppConfig } from './server.mjs';
import { _ as _sfc_main$5 } from './Input-CMCaI9pM.mjs';
import { _ as _sfc_main$6 } from './Select-dln4ivrK.mjs';
import { _ as _sfc_main$3 } from './Badge-CL_R2lGZ.mjs';
import { _ as _sfc_main$7 } from './Modal-CzBe1f86.mjs';
import { _ as _sfc_main$8 } from './Textarea-0gyuVVm7.mjs';
import { _ as _sfc_main$9 } from './Checkbox-TTF3FY4d.mjs';
import { u as useToast } from './useToast-Bm7hVh5T.mjs';
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
import './usePortal-BbZPQQY_.mjs';
import './Chip-DwZPpwbq.mjs';
import './useLocale-CtluvDKB.mjs';

const theme = {
  "slots": {
    "root": "flex items-center gap-2",
    "list": "relative flex p-1 group",
    "indicator": "absolute transition-[translate,width] duration-200",
    "trigger": [
      "group relative inline-flex items-center min-w-0 data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "content": "focus:outline-none w-full",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "label": "truncate"
  },
  "variants": {
    "color": {
      "primary": "",
      "primary-light": "",
      "primary-lighter": "",
      "secondary": "",
      "secondary-light": "",
      "ui-darker": "",
      "ui-dark": "",
      "ui": "",
      "ui-light": "",
      "ui-lighter": "",
      "neutral": ""
    },
    "variant": {
      "pill": {
        "list": "bg-elevated rounded-lg",
        "trigger": "grow",
        "indicator": "rounded-md shadow-xs"
      },
      "link": {
        "list": "border-default",
        "indicator": "rounded-full",
        "trigger": "focus:outline-none"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "flex-col",
        "list": "w-full",
        "indicator": "left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position)",
        "trigger": "justify-center"
      },
      "vertical": {
        "list": "flex-col",
        "indicator": "top-0 h-(--reka-tabs-indicator-size) translate-y-(--reka-tabs-indicator-position)"
      }
    },
    "size": {
      "xs": {
        "trigger": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "sm": {
        "trigger": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "md": {
        "trigger": "px-3 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "lg": {
        "trigger": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "xl": {
        "trigger": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "variant": "pill",
      "class": {
        "indicator": "inset-y-1"
      }
    },
    {
      "orientation": "horizontal",
      "variant": "link",
      "class": {
        "list": "border-b -mb-px",
        "indicator": "-bottom-px h-px"
      }
    },
    {
      "orientation": "vertical",
      "variant": "pill",
      "class": {
        "indicator": "inset-x-1",
        "list": "items-center"
      }
    },
    {
      "orientation": "vertical",
      "variant": "link",
      "class": {
        "list": "border-s -ms-px",
        "indicator": "-start-px w-px"
      }
    },
    {
      "color": "primary",
      "variant": "pill",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      }
    },
    {
      "color": "primary-light",
      "variant": "pill",
      "class": {
        "indicator": "bg-primary-light",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
      }
    },
    {
      "color": "primary-lighter",
      "variant": "pill",
      "class": {
        "indicator": "bg-primary-lighter",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-lighter"
      }
    },
    {
      "color": "secondary",
      "variant": "pill",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      }
    },
    {
      "color": "secondary-light",
      "variant": "pill",
      "class": {
        "indicator": "bg-secondary-light",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light"
      }
    },
    {
      "color": "ui-darker",
      "variant": "pill",
      "class": {
        "indicator": "bg-ui-darker",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-darker"
      }
    },
    {
      "color": "ui-dark",
      "variant": "pill",
      "class": {
        "indicator": "bg-ui-dark",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-dark"
      }
    },
    {
      "color": "ui",
      "variant": "pill",
      "class": {
        "indicator": "bg-ui",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui"
      }
    },
    {
      "color": "ui-light",
      "variant": "pill",
      "class": {
        "indicator": "bg-ui-light",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-light"
      }
    },
    {
      "color": "ui-lighter",
      "variant": "pill",
      "class": {
        "indicator": "bg-ui-lighter",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-lighter"
      }
    },
    {
      "color": "neutral",
      "variant": "pill",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
      }
    },
    {
      "color": "primary",
      "variant": "link",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-primary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      }
    },
    {
      "color": "primary-light",
      "variant": "link",
      "class": {
        "indicator": "bg-primary-light",
        "trigger": "data-[state=active]:text-primary-light focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-light"
      }
    },
    {
      "color": "primary-lighter",
      "variant": "link",
      "class": {
        "indicator": "bg-primary-lighter",
        "trigger": "data-[state=active]:text-primary-lighter focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-lighter"
      }
    },
    {
      "color": "secondary",
      "variant": "link",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-secondary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
      }
    },
    {
      "color": "secondary-light",
      "variant": "link",
      "class": {
        "indicator": "bg-secondary-light",
        "trigger": "data-[state=active]:text-secondary-light focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary-light"
      }
    },
    {
      "color": "ui-darker",
      "variant": "link",
      "class": {
        "indicator": "bg-ui-darker",
        "trigger": "data-[state=active]:text-ui-darker focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-darker"
      }
    },
    {
      "color": "ui-dark",
      "variant": "link",
      "class": {
        "indicator": "bg-ui-dark",
        "trigger": "data-[state=active]:text-ui-dark focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-dark"
      }
    },
    {
      "color": "ui",
      "variant": "link",
      "class": {
        "indicator": "bg-ui",
        "trigger": "data-[state=active]:text-ui focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui"
      }
    },
    {
      "color": "ui-light",
      "variant": "link",
      "class": {
        "indicator": "bg-ui-light",
        "trigger": "data-[state=active]:text-ui-light focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-light"
      }
    },
    {
      "color": "ui-lighter",
      "variant": "link",
      "class": {
        "indicator": "bg-ui-lighter",
        "trigger": "data-[state=active]:text-ui-lighter focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-lighter"
      }
    },
    {
      "color": "neutral",
      "variant": "link",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-highlighted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "pill",
    "size": "md"
  }
};
const _sfc_main$1 = {
  __name: "Tabs",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    items: { type: Array, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    content: { type: Boolean, required: false, default: true },
    labelKey: { type: String, required: false, default: "label" },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultValue: { type: null, required: false, default: "0" },
    modelValue: { type: null, required: false },
    activationMode: { type: String, required: false },
    unmountOnHide: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "modelValue", "defaultValue", "orientation", "activationMode", "unmountOnHide"), emits);
    const ui = computed(() => {
      var _a;
      return tv({ extend: tv(theme), ...((_a = appConfig.ui) == null ? void 0 : _a.tabs) || {} })({
        color: props.color,
        variant: props.variant,
        size: props.size,
        orientation: props.orientation
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(ssrRenderComponent(unref(TabsRoot), mergeProps(unref(rootProps), {
        class: ui.value.root({ class: [(_a = props.ui) == null ? void 0 : _a.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabsList), {
              class: ui.value.list({ class: (_a2 = props.ui) == null ? void 0 : _a2.list })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a3, _b2;
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TabsIndicator), {
                    class: ui.value.indicator({ class: (_a3 = props.ui) == null ? void 0 : _a3.indicator })
                  }, null, _parent3, _scopeId2));
                  ssrRenderSlot(_ctx.$slots, "list-leading", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.items, (item, index) => {
                    var _a4, _b3;
                    _push3(ssrRenderComponent(unref(TabsTrigger), {
                      key: index,
                      value: item.value || String(index),
                      disabled: item.disabled,
                      class: ui.value.trigger({ class: [(_a4 = props.ui) == null ? void 0 : _a4.trigger, (_b3 = item.ui) == null ? void 0 : _b3.trigger] })
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a5, _b4, _c, _d;
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "leading", {
                            item,
                            index
                          }, () => {
                            var _a6, _b5, _c2, _d2, _e;
                            if (item.icon) {
                              _push4(ssrRenderComponent(_sfc_main$4, {
                                name: item.icon,
                                class: ui.value.leadingIcon({ class: [(_a6 = props.ui) == null ? void 0 : _a6.leadingIcon, (_b5 = item.ui) == null ? void 0 : _b5.leadingIcon] })
                              }, null, _parent4, _scopeId3));
                            } else if (item.avatar) {
                              _push4(ssrRenderComponent(_sfc_main$3$1, mergeProps({
                                size: ((_c2 = props.ui) == null ? void 0 : _c2.leadingAvatarSize) || ui.value.leadingAvatarSize()
                              }, { ref_for: true }, item.avatar, {
                                class: ui.value.leadingAvatar({ class: [(_d2 = props.ui) == null ? void 0 : _d2.leadingAvatar, (_e = item.ui) == null ? void 0 : _e.leadingAvatar] })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          if (unref(get)(item, props.labelKey) || !!slots.default) {
                            _push4(`<span class="${ssrRenderClass(ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label] }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "default", {
                              item,
                              index
                            }, () => {
                              _push4(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          ssrRenderSlot(_ctx.$slots, "trailing", {
                            item,
                            index
                          }, null, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "leading", {
                              item,
                              index
                            }, () => {
                              var _a6, _b5, _c2, _d2, _e;
                              return [
                                item.icon ? (openBlock(), createBlock(_sfc_main$4, {
                                  key: 0,
                                  name: item.icon,
                                  class: ui.value.leadingIcon({ class: [(_a6 = props.ui) == null ? void 0 : _a6.leadingIcon, (_b5 = item.ui) == null ? void 0 : _b5.leadingIcon] })
                                }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$3$1, mergeProps({
                                  key: 1,
                                  size: ((_c2 = props.ui) == null ? void 0 : _c2.leadingAvatarSize) || ui.value.leadingAvatarSize()
                                }, { ref_for: true }, item.avatar, {
                                  class: ui.value.leadingAvatar({ class: [(_d2 = props.ui) == null ? void 0 : _d2.leadingAvatar, (_e = item.ui) == null ? void 0 : _e.leadingAvatar] })
                                }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                              ];
                            }),
                            unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: ui.value.label({ class: [(_c = props.ui) == null ? void 0 : _c.label, (_d = item.ui) == null ? void 0 : _d.label] })
                            }, [
                              renderSlot(_ctx.$slots, "default", {
                                item,
                                index
                              }, () => [
                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                              ])
                            ], 2)) : createCommentVNode("", true),
                            renderSlot(_ctx.$slots, "trailing", {
                              item,
                              index
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  ssrRenderSlot(_ctx.$slots, "list-trailing", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    createVNode(unref(TabsIndicator), {
                      class: ui.value.indicator({ class: (_b2 = props.ui) == null ? void 0 : _b2.indicator })
                    }, null, 8, ["class"]),
                    renderSlot(_ctx.$slots, "list-leading"),
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index) => {
                      var _a4, _b3;
                      return openBlock(), createBlock(unref(TabsTrigger), {
                        key: index,
                        value: item.value || String(index),
                        disabled: item.disabled,
                        class: ui.value.trigger({ class: [(_a4 = props.ui) == null ? void 0 : _a4.trigger, (_b3 = item.ui) == null ? void 0 : _b3.trigger] })
                      }, {
                        default: withCtx(() => {
                          var _a5, _b4;
                          return [
                            renderSlot(_ctx.$slots, "leading", {
                              item,
                              index
                            }, () => {
                              var _a6, _b5, _c, _d, _e;
                              return [
                                item.icon ? (openBlock(), createBlock(_sfc_main$4, {
                                  key: 0,
                                  name: item.icon,
                                  class: ui.value.leadingIcon({ class: [(_a6 = props.ui) == null ? void 0 : _a6.leadingIcon, (_b5 = item.ui) == null ? void 0 : _b5.leadingIcon] })
                                }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$3$1, mergeProps({
                                  key: 1,
                                  size: ((_c = props.ui) == null ? void 0 : _c.leadingAvatarSize) || ui.value.leadingAvatarSize()
                                }, { ref_for: true }, item.avatar, {
                                  class: ui.value.leadingAvatar({ class: [(_d = props.ui) == null ? void 0 : _d.leadingAvatar, (_e = item.ui) == null ? void 0 : _e.leadingAvatar] })
                                }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                              ];
                            }),
                            unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label] })
                            }, [
                              renderSlot(_ctx.$slots, "default", {
                                item,
                                index
                              }, () => [
                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                              ])
                            ], 2)) : createCommentVNode("", true),
                            renderSlot(_ctx.$slots, "trailing", {
                              item,
                              index
                            })
                          ];
                        }),
                        _: 2
                      }, 1032, ["value", "disabled", "class"]);
                    }), 128)),
                    renderSlot(_ctx.$slots, "list-trailing")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            if (!!__props.content) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.items, (item, index) => {
                var _a3, _b2;
                _push2(ssrRenderComponent(unref(TabsContent), {
                  key: index,
                  value: item.value || String(index),
                  class: ui.value.content({ class: [(_a3 = props.ui) == null ? void 0 : _a3.content, (_b2 = item.ui) == null ? void 0 : _b2.content, item.class] })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, item.slot || "content", {
                        item,
                        index
                      }, () => {
                        _push3(`${ssrInterpolate(item.content)}`);
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, item.slot || "content", {
                          item,
                          index
                        }, () => [
                          createTextVNode(toDisplayString(item.content), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(TabsList), {
                class: ui.value.list({ class: (_b = props.ui) == null ? void 0 : _b.list })
              }, {
                default: withCtx(() => {
                  var _a3;
                  return [
                    createVNode(unref(TabsIndicator), {
                      class: ui.value.indicator({ class: (_a3 = props.ui) == null ? void 0 : _a3.indicator })
                    }, null, 8, ["class"]),
                    renderSlot(_ctx.$slots, "list-leading"),
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index) => {
                      var _a4, _b2;
                      return openBlock(), createBlock(unref(TabsTrigger), {
                        key: index,
                        value: item.value || String(index),
                        disabled: item.disabled,
                        class: ui.value.trigger({ class: [(_a4 = props.ui) == null ? void 0 : _a4.trigger, (_b2 = item.ui) == null ? void 0 : _b2.trigger] })
                      }, {
                        default: withCtx(() => {
                          var _a5, _b3;
                          return [
                            renderSlot(_ctx.$slots, "leading", {
                              item,
                              index
                            }, () => {
                              var _a6, _b4, _c, _d, _e;
                              return [
                                item.icon ? (openBlock(), createBlock(_sfc_main$4, {
                                  key: 0,
                                  name: item.icon,
                                  class: ui.value.leadingIcon({ class: [(_a6 = props.ui) == null ? void 0 : _a6.leadingIcon, (_b4 = item.ui) == null ? void 0 : _b4.leadingIcon] })
                                }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$3$1, mergeProps({
                                  key: 1,
                                  size: ((_c = props.ui) == null ? void 0 : _c.leadingAvatarSize) || ui.value.leadingAvatarSize()
                                }, { ref_for: true }, item.avatar, {
                                  class: ui.value.leadingAvatar({ class: [(_d = props.ui) == null ? void 0 : _d.leadingAvatar, (_e = item.ui) == null ? void 0 : _e.leadingAvatar] })
                                }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                              ];
                            }),
                            unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b3 = item.ui) == null ? void 0 : _b3.label] })
                            }, [
                              renderSlot(_ctx.$slots, "default", {
                                item,
                                index
                              }, () => [
                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                              ])
                            ], 2)) : createCommentVNode("", true),
                            renderSlot(_ctx.$slots, "trailing", {
                              item,
                              index
                            })
                          ];
                        }),
                        _: 2
                      }, 1032, ["value", "disabled", "class"]);
                    }), 128)),
                    renderSlot(_ctx.$slots, "list-trailing")
                  ];
                }),
                _: 3
              }, 8, ["class"]),
              !!__props.content ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.items, (item, index) => {
                var _a3, _b2;
                return openBlock(), createBlock(unref(TabsContent), {
                  key: index,
                  value: item.value || String(index),
                  class: ui.value.content({ class: [(_a3 = props.ui) == null ? void 0 : _a3.content, (_b2 = item.ui) == null ? void 0 : _b2.content, item.class] })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, item.slot || "content", {
                      item,
                      index
                    }, () => [
                      createTextVNode(toDisplayString(item.content), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["value", "class"]);
              }), 128)) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Tabs.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const useParticipants = () => {
  const { $api } = useNuxtApp();
  const participants = ref([]);
  const badges = ref([]);
  const ministries = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const fetchParticipants = async (options = {}) => {
    var _a;
    try {
      loading.value = true;
      error.value = null;
      const query = new URLSearchParams();
      Object.entries(options).forEach(([key, value]) => {
        if (value !== void 0) {
          query.append(key, String(value));
        }
      });
      const response = await $fetch(`/api/participants/profiles?${query}`);
      participants.value = response.data;
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Erro ao buscar participantes";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const createParticipantProfile = async (data) => {
    var _a;
    try {
      loading.value = true;
      error.value = null;
      const response = await $fetch("/api/participants/profiles", {
        method: "POST",
        body: data
      });
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Erro ao criar perfil";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const fetchBadges = async (options = {}) => {
    var _a;
    try {
      loading.value = true;
      error.value = null;
      const query = new URLSearchParams();
      Object.entries(options).forEach(([key, value]) => {
        if (value !== void 0) {
          query.append(key, String(value));
        }
      });
      const response = await $fetch(`/api/badges?${query}`);
      badges.value = response.data;
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Erro ao buscar badges";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const createBadge = async (data) => {
    var _a;
    try {
      loading.value = true;
      error.value = null;
      const response = await $fetch("/api/badges", {
        method: "POST",
        body: data
      });
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Erro ao criar badge";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const awardBadge = async (participantId, data) => {
    var _a;
    try {
      loading.value = true;
      error.value = null;
      const response = await $fetch(`/api/participants/${participantId}/badges`, {
        method: "POST",
        body: data
      });
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Erro ao atribuir badge";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const promoteParticipant = async (participantId) => {
    var _a;
    try {
      loading.value = true;
      error.value = null;
      const response = await $fetch(`/api/participants/${participantId}/promote`, {
        method: "POST"
      });
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Erro ao promover participante";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const fetchMinistries = async (options = {}) => {
    var _a;
    try {
      loading.value = true;
      error.value = null;
      const query = new URLSearchParams();
      Object.entries(options).forEach(([key, value]) => {
        if (value !== void 0) {
          query.append(key, String(value));
        }
      });
      const response = await $fetch(`/api/ministries?${query}`);
      ministries.value = response;
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Erro ao buscar minist\xE9rios";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const recordParticipation = async (data) => {
    var _a;
    try {
      loading.value = true;
      error.value = null;
      const response = await $fetch("/api/participants/history", {
        method: "POST",
        body: data
      });
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Erro ao registrar participa\xE7\xE3o";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const getLevelLabel = (level) => {
    const labels = {
      "NOVICE": "Novato",
      "SERVANT": "Servo",
      "LEADER": "L\xEDder"
    };
    return labels[level] || level;
  };
  const getRoleLabel = (role) => {
    const labels = {
      "MEMBER": "Membro",
      "SERVANT": "Servo",
      "LEADER": "L\xEDder",
      "MINISTRY_HEAD": "Respons\xE1vel de Minist\xE9rio"
    };
    return labels[role] || role;
  };
  const getBadgeTypeLabel = (type) => {
    const labels = {
      "PARTICIPATION": "Participa\xE7\xE3o",
      "ACHIEVEMENT": "Conquista",
      "LEADERSHIP": "Lideran\xE7a",
      "SERVICE": "Servi\xE7o",
      "SPECIAL": "Especial"
    };
    return labels[type] || type;
  };
  return {
    // Estados
    participants: readonly(participants),
    badges: readonly(badges),
    ministries: readonly(ministries),
    loading: readonly(loading),
    error: readonly(error),
    // Métodos
    fetchParticipants,
    createParticipantProfile,
    fetchBadges,
    createBadge,
    awardBadge,
    promoteParticipant,
    fetchMinistries,
    recordParticipation,
    // Utilitários
    getLevelLabel,
    getRoleLabel,
    getBadgeTypeLabel
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "participantes",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      participants,
      badges,
      ministries,
      loading,
      fetchParticipants,
      fetchBadges,
      createBadge,
      getLevelLabel,
      getRoleLabel,
      getBadgeTypeLabel
    } = useParticipants();
    const toast = useToast();
    const activeTab = ref(0);
    const showCreateBadgeModal = ref(false);
    const filters = reactive({
      search: "",
      level: "",
      role: ""
    });
    const newBadge = reactive({
      name: "",
      description: "",
      type: "",
      iconUrl: "",
      color: "#6B7280",
      isAutoAwarded: false
    });
    const tabs = [
      { key: "participants", label: "Participantes" },
      { key: "badges", label: "Badges" },
      { key: "ministries", label: "Minist\xE9rios" }
    ];
    const levelOptions = [
      { label: "Todos os n\xEDveis", value: "" },
      { label: "Novato", value: "NOVICE" },
      { label: "Servo", value: "SERVANT" },
      { label: "L\xEDder", value: "LEADER" }
    ];
    const roleOptions = [
      { label: "Todas as fun\xE7\xF5es", value: "" },
      { label: "Membro", value: "MEMBER" },
      { label: "Servo", value: "SERVANT" },
      { label: "L\xEDder", value: "LEADER" },
      { label: "Respons\xE1vel", value: "MINISTRY_HEAD" }
    ];
    const badgeTypeOptions = [
      { label: "Participa\xE7\xE3o", value: "PARTICIPATION" },
      { label: "Conquista", value: "ACHIEVEMENT" },
      { label: "Lideran\xE7a", value: "LEADERSHIP" },
      { label: "Servi\xE7o", value: "SERVICE" },
      { label: "Especial", value: "SPECIAL" }
    ];
    const debouncedSearch = useDebounceFn(() => {
      fetchParticipants(filters);
    }, 500);
    const clearFilters = () => {
      filters.search = "";
      filters.level = "";
      filters.role = "";
      fetchParticipants();
    };
    const createNewBadge = async () => {
      try {
        await createBadge(newBadge);
        Object.assign(newBadge, {
          name: "",
          description: "",
          type: "",
          iconUrl: "",
          color: "#6B7280",
          isAutoAwarded: false
        });
        showCreateBadgeModal.value = false;
        toast.add({
          title: "Sucesso",
          description: "Badge criado com sucesso!",
          color: "green"
        });
        await fetchBadges();
      } catch (err) {
        toast.add({
          title: "Erro",
          description: "Erro ao criar badge",
          color: "red"
        });
      }
    };
    const participantName = (participant) => {
      const profile = participant.user.profile;
      if ((profile == null ? void 0 : profile.firstName) && (profile == null ? void 0 : profile.lastName)) {
        return `${profile.firstName} ${profile.lastName}`;
      }
      return participant.user.email.split("@")[0];
    };
    const participantInitials = (participant) => {
      const name = participantName(participant);
      return name.split(" ").map((n) => n[0]).join("").toUpperCase();
    };
    const getLevelColor = (level) => {
      const colors = {
        "NOVICE": "gray",
        "SERVANT": "blue",
        "LEADER": "green"
      };
      return colors[level] || "gray";
    };
    const showParticipantDetails = (participant) => {
      console.log("Show details for:", participant);
    };
    const showPromoteModal = (participant) => {
      console.log("Promote:", participant);
    };
    const showAwardBadgeModal = (participant) => {
      console.log("Award badge to:", participant);
    };
    watch(() => filters.level, () => {
      fetchParticipants(filters);
    });
    watch(() => filters.role, () => {
      fetchParticipants(filters);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$2;
      const _component_UTabs = _sfc_main$1;
      const _component_UInput = _sfc_main$5;
      const _component_USelect = _sfc_main$6;
      const _component_UBadge = _sfc_main$3;
      const _component_UIcon = _sfc_main$4;
      const _component_UModal = _sfc_main$7;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_UTextarea = _sfc_main$8;
      const _component_UCheckbox = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-participants" }, _attrs))} data-v-f30f1260><div class="page-header" data-v-f30f1260><div class="header-content" data-v-f30f1260><h1 class="page-title" data-v-f30f1260>Sistema de Classifica\xE7\xE3o de Participantes</h1><p class="page-description" data-v-f30f1260> Gerencie perfis, n\xEDveis, badges e promo\xE7\xF5es dos participantes </p></div><div class="header-actions" data-v-f30f1260>`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-plus",
        onClick: ($event) => showCreateBadgeModal.value = true,
        color: "primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Criar Badge `);
          } else {
            return [
              createTextVNode(" Criar Badge ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_UTabs, {
        modelValue: unref(activeTab),
        "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
        items: tabs,
        class: "main-tabs"
      }, {
        participants: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="participants-section" data-v-f30f1260${_scopeId}><div class="filters-section" data-v-f30f1260${_scopeId}><div class="filters-grid" data-v-f30f1260${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(filters).search,
              "onUpdate:modelValue": ($event) => unref(filters).search = $event,
              placeholder: "Buscar participantes...",
              icon: "i-heroicons-magnifying-glass",
              onInput: unref(debouncedSearch)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_USelect, {
              modelValue: unref(filters).level,
              "onUpdate:modelValue": ($event) => unref(filters).level = $event,
              options: levelOptions,
              placeholder: "Filtrar por n\xEDvel"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_USelect, {
              modelValue: unref(filters).role,
              "onUpdate:modelValue": ($event) => unref(filters).role = $event,
              options: roleOptions,
              placeholder: "Filtrar por fun\xE7\xE3o"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              onClick: clearFilters,
              variant: "ghost",
              icon: "i-heroicons-x-mark"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Limpar `);
                } else {
                  return [
                    createTextVNode(" Limpar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="participants-grid" data-v-f30f1260${_scopeId}><!--[-->`);
            ssrRenderList(unref(participants), (participant) => {
              var _a;
              _push2(`<div class="participant-card" data-v-f30f1260${_scopeId}><div class="participant-header" data-v-f30f1260${_scopeId}><div class="participant-avatar" data-v-f30f1260${_scopeId}>`);
              if ((_a = participant.user.profile) == null ? void 0 : _a.avatar) {
                _push2(`<img${ssrRenderAttr("src", participant.user.profile.avatar)}${ssrRenderAttr("alt", participantName(participant))} class="avatar-image" data-v-f30f1260${_scopeId}>`);
              } else {
                _push2(`<div class="avatar-placeholder" data-v-f30f1260${_scopeId}>${ssrInterpolate(participantInitials(participant))}</div>`);
              }
              _push2(`</div><div class="participant-info" data-v-f30f1260${_scopeId}><h3 class="participant-name" data-v-f30f1260${_scopeId}>${ssrInterpolate(participantName(participant))}</h3><p class="participant-email" data-v-f30f1260${_scopeId}>${ssrInterpolate(participant.user.email)}</p></div></div><div class="participant-stats" data-v-f30f1260${_scopeId}><div class="stat-item" data-v-f30f1260${_scopeId}><span class="stat-label" data-v-f30f1260${_scopeId}>N\xEDvel:</span>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: getLevelColor(participant.level)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(getLevelLabel)(participant.level))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(getLevelLabel)(participant.level)), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div><div class="stat-item" data-v-f30f1260${_scopeId}><span class="stat-label" data-v-f30f1260${_scopeId}>Fun\xE7\xE3o:</span>`);
              _push2(ssrRenderComponent(_component_UBadge, { color: "gray" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(getRoleLabel)(participant.role))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(getRoleLabel)(participant.role)), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div><div class="stat-item" data-v-f30f1260${_scopeId}><span class="stat-label" data-v-f30f1260${_scopeId}>Eventos:</span><span class="stat-value" data-v-f30f1260${_scopeId}>${ssrInterpolate(participant.totalEvents)}</span></div><div class="stat-item" data-v-f30f1260${_scopeId}><span class="stat-label" data-v-f30f1260${_scopeId}>Horas:</span><span class="stat-value" data-v-f30f1260${_scopeId}>${ssrInterpolate(participant.totalHours)}h</span></div><div class="stat-item" data-v-f30f1260${_scopeId}><span class="stat-label" data-v-f30f1260${_scopeId}>Pontos:</span><span class="stat-value" data-v-f30f1260${_scopeId}>${ssrInterpolate(participant.points)}</span></div></div><div class="participant-badges" data-v-f30f1260${_scopeId}><h4 data-v-f30f1260${_scopeId}>Badges (${ssrInterpolate(participant.badges.length)})</h4><div class="badges-grid" data-v-f30f1260${_scopeId}><!--[-->`);
              ssrRenderList(participant.badges.slice(0, 3), (participantBadge) => {
                _push2(`<div class="badge-item"${ssrRenderAttr("title", participantBadge.badge.name)} data-v-f30f1260${_scopeId}><div class="badge-icon" style="${ssrRenderStyle({ backgroundColor: participantBadge.badge.color })}" data-v-f30f1260${_scopeId}>`);
                if (participantBadge.badge.iconUrl) {
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: participantBadge.badge.iconUrl
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<span data-v-f30f1260${_scopeId}>\u{1F3C6}</span>`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]-->`);
              if (participant.badges.length > 3) {
                _push2(`<div class="more-badges" data-v-f30f1260${_scopeId}> +${ssrInterpolate(participant.badges.length - 3)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="participant-actions" data-v-f30f1260${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                size: "sm",
                variant: "ghost",
                onClick: ($event) => showParticipantDetails(participant)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Ver Detalhes `);
                  } else {
                    return [
                      createTextVNode(" Ver Detalhes ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                size: "sm",
                color: "primary",
                onClick: ($event) => showPromoteModal(participant)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Promover `);
                  } else {
                    return [
                      createTextVNode(" Promover ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                size: "sm",
                variant: "outline",
                onClick: ($event) => showAwardBadgeModal(participant)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Atribuir Badge `);
                  } else {
                    return [
                      createTextVNode(" Atribuir Badge ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (unref(loading)) {
              _push2(`<div class="loading-state" data-v-f30f1260${_scopeId}><div class="loading-spinner" data-v-f30f1260${_scopeId}></div><p data-v-f30f1260${_scopeId}>Carregando participantes...</p></div>`);
            } else if (unref(participants).length === 0) {
              _push2(`<div class="empty-state" data-v-f30f1260${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-users",
                class: "empty-icon"
              }, null, _parent2, _scopeId));
              _push2(`<h3 data-v-f30f1260${_scopeId}>Nenhum participante encontrado</h3><p data-v-f30f1260${_scopeId}>N\xE3o h\xE1 participantes cadastrados no sistema ainda.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "participants-section" }, [
                createVNode("div", { class: "filters-section" }, [
                  createVNode("div", { class: "filters-grid" }, [
                    createVNode(_component_UInput, {
                      modelValue: unref(filters).search,
                      "onUpdate:modelValue": ($event) => unref(filters).search = $event,
                      placeholder: "Buscar participantes...",
                      icon: "i-heroicons-magnifying-glass",
                      onInput: unref(debouncedSearch)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"]),
                    createVNode(_component_USelect, {
                      modelValue: unref(filters).level,
                      "onUpdate:modelValue": ($event) => unref(filters).level = $event,
                      options: levelOptions,
                      placeholder: "Filtrar por n\xEDvel"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_USelect, {
                      modelValue: unref(filters).role,
                      "onUpdate:modelValue": ($event) => unref(filters).role = $event,
                      options: roleOptions,
                      placeholder: "Filtrar por fun\xE7\xE3o"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_UButton, {
                      onClick: clearFilters,
                      variant: "ghost",
                      icon: "i-heroicons-x-mark"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Limpar ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", { class: "participants-grid" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(participants), (participant) => {
                    var _a;
                    return openBlock(), createBlock("div", {
                      key: participant.id,
                      class: "participant-card"
                    }, [
                      createVNode("div", { class: "participant-header" }, [
                        createVNode("div", { class: "participant-avatar" }, [
                          ((_a = participant.user.profile) == null ? void 0 : _a.avatar) ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: participant.user.profile.avatar,
                            alt: participantName(participant),
                            class: "avatar-image"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "avatar-placeholder"
                          }, toDisplayString(participantInitials(participant)), 1))
                        ]),
                        createVNode("div", { class: "participant-info" }, [
                          createVNode("h3", { class: "participant-name" }, toDisplayString(participantName(participant)), 1),
                          createVNode("p", { class: "participant-email" }, toDisplayString(participant.user.email), 1)
                        ])
                      ]),
                      createVNode("div", { class: "participant-stats" }, [
                        createVNode("div", { class: "stat-item" }, [
                          createVNode("span", { class: "stat-label" }, "N\xEDvel:"),
                          createVNode(_component_UBadge, {
                            color: getLevelColor(participant.level)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(getLevelLabel)(participant.level)), 1)
                            ]),
                            _: 2
                          }, 1032, ["color"])
                        ]),
                        createVNode("div", { class: "stat-item" }, [
                          createVNode("span", { class: "stat-label" }, "Fun\xE7\xE3o:"),
                          createVNode(_component_UBadge, { color: "gray" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(getRoleLabel)(participant.role)), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        createVNode("div", { class: "stat-item" }, [
                          createVNode("span", { class: "stat-label" }, "Eventos:"),
                          createVNode("span", { class: "stat-value" }, toDisplayString(participant.totalEvents), 1)
                        ]),
                        createVNode("div", { class: "stat-item" }, [
                          createVNode("span", { class: "stat-label" }, "Horas:"),
                          createVNode("span", { class: "stat-value" }, toDisplayString(participant.totalHours) + "h", 1)
                        ]),
                        createVNode("div", { class: "stat-item" }, [
                          createVNode("span", { class: "stat-label" }, "Pontos:"),
                          createVNode("span", { class: "stat-value" }, toDisplayString(participant.points), 1)
                        ])
                      ]),
                      createVNode("div", { class: "participant-badges" }, [
                        createVNode("h4", null, "Badges (" + toDisplayString(participant.badges.length) + ")", 1),
                        createVNode("div", { class: "badges-grid" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(participant.badges.slice(0, 3), (participantBadge) => {
                            return openBlock(), createBlock("div", {
                              key: participantBadge.id,
                              class: "badge-item",
                              title: participantBadge.badge.name
                            }, [
                              createVNode("div", {
                                class: "badge-icon",
                                style: { backgroundColor: participantBadge.badge.color }
                              }, [
                                participantBadge.badge.iconUrl ? (openBlock(), createBlock(_component_UIcon, {
                                  key: 0,
                                  name: participantBadge.badge.iconUrl
                                }, null, 8, ["name"])) : (openBlock(), createBlock("span", { key: 1 }, "\u{1F3C6}"))
                              ], 4)
                            ], 8, ["title"]);
                          }), 128)),
                          participant.badges.length > 3 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "more-badges"
                          }, " +" + toDisplayString(participant.badges.length - 3), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "participant-actions" }, [
                        createVNode(_component_UButton, {
                          size: "sm",
                          variant: "ghost",
                          onClick: ($event) => showParticipantDetails(participant)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Ver Detalhes ")
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        createVNode(_component_UButton, {
                          size: "sm",
                          color: "primary",
                          onClick: ($event) => showPromoteModal(participant)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Promover ")
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        createVNode(_component_UButton, {
                          size: "sm",
                          variant: "outline",
                          onClick: ($event) => showAwardBadgeModal(participant)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Atribuir Badge ")
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ])
                    ]);
                  }), 128))
                ]),
                unref(loading) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "loading-state"
                }, [
                  createVNode("div", { class: "loading-spinner" }),
                  createVNode("p", null, "Carregando participantes...")
                ])) : unref(participants).length === 0 ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "empty-state"
                }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-users",
                    class: "empty-icon"
                  }),
                  createVNode("h3", null, "Nenhum participante encontrado"),
                  createVNode("p", null, "N\xE3o h\xE1 participantes cadastrados no sistema ainda.")
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        badges: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="badges-section" data-v-f30f1260${_scopeId}><div class="badges-grid" data-v-f30f1260${_scopeId}><!--[-->`);
            ssrRenderList(unref(badges), (badge) => {
              _push2(`<div class="badge-card" data-v-f30f1260${_scopeId}><div class="badge-header" data-v-f30f1260${_scopeId}><div class="badge-icon-large" style="${ssrRenderStyle({ backgroundColor: badge.color })}" data-v-f30f1260${_scopeId}>`);
              if (badge.iconUrl) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: badge.iconUrl,
                  size: "24"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<span class="default-icon" data-v-f30f1260${_scopeId}>\u{1F3C6}</span>`);
              }
              _push2(`</div><div class="badge-info" data-v-f30f1260${_scopeId}><h3 class="badge-name" data-v-f30f1260${_scopeId}>${ssrInterpolate(badge.name)}</h3><p class="badge-type" data-v-f30f1260${_scopeId}>${ssrInterpolate(unref(getBadgeTypeLabel)(badge.type))}</p></div></div><p class="badge-description" data-v-f30f1260${_scopeId}>${ssrInterpolate(badge.description)}</p><div class="badge-stats" data-v-f30f1260${_scopeId}><div class="stat" data-v-f30f1260${_scopeId}><span class="stat-label" data-v-f30f1260${_scopeId}>Atribu\xEDdo:</span><span class="stat-value" data-v-f30f1260${_scopeId}>${ssrInterpolate(badge.totalAwarded)} vezes</span></div><div class="stat" data-v-f30f1260${_scopeId}><span class="stat-label" data-v-f30f1260${_scopeId}>Auto-atribui\xE7\xE3o:</span>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: badge.isAutoAwarded ? "green" : "gray"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(badge.isAutoAwarded ? "Sim" : "N\xE3o")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(badge.isAutoAwarded ? "Sim" : "N\xE3o"), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div><div class="stat" data-v-f30f1260${_scopeId}><span class="stat-label" data-v-f30f1260${_scopeId}>Status:</span>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: badge.isActive ? "green" : "red"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(badge.isActive ? "Ativo" : "Inativo")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(badge.isActive ? "Ativo" : "Inativo"), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "badges-section" }, [
                createVNode("div", { class: "badges-grid" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(badges), (badge) => {
                    return openBlock(), createBlock("div", {
                      key: badge.id,
                      class: "badge-card"
                    }, [
                      createVNode("div", { class: "badge-header" }, [
                        createVNode("div", {
                          class: "badge-icon-large",
                          style: { backgroundColor: badge.color }
                        }, [
                          badge.iconUrl ? (openBlock(), createBlock(_component_UIcon, {
                            key: 0,
                            name: badge.iconUrl,
                            size: "24"
                          }, null, 8, ["name"])) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "default-icon"
                          }, "\u{1F3C6}"))
                        ], 4),
                        createVNode("div", { class: "badge-info" }, [
                          createVNode("h3", { class: "badge-name" }, toDisplayString(badge.name), 1),
                          createVNode("p", { class: "badge-type" }, toDisplayString(unref(getBadgeTypeLabel)(badge.type)), 1)
                        ])
                      ]),
                      createVNode("p", { class: "badge-description" }, toDisplayString(badge.description), 1),
                      createVNode("div", { class: "badge-stats" }, [
                        createVNode("div", { class: "stat" }, [
                          createVNode("span", { class: "stat-label" }, "Atribu\xEDdo:"),
                          createVNode("span", { class: "stat-value" }, toDisplayString(badge.totalAwarded) + " vezes", 1)
                        ]),
                        createVNode("div", { class: "stat" }, [
                          createVNode("span", { class: "stat-label" }, "Auto-atribui\xE7\xE3o:"),
                          createVNode(_component_UBadge, {
                            color: badge.isAutoAwarded ? "green" : "gray"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(badge.isAutoAwarded ? "Sim" : "N\xE3o"), 1)
                            ]),
                            _: 2
                          }, 1032, ["color"])
                        ]),
                        createVNode("div", { class: "stat" }, [
                          createVNode("span", { class: "stat-label" }, "Status:"),
                          createVNode(_component_UBadge, {
                            color: badge.isActive ? "green" : "red"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(badge.isActive ? "Ativo" : "Inativo"), 1)
                            ]),
                            _: 2
                          }, 1032, ["color"])
                        ])
                      ])
                    ]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        ministries: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ministries-section" data-v-f30f1260${_scopeId}><div class="ministries-grid" data-v-f30f1260${_scopeId}><!--[-->`);
            ssrRenderList(unref(ministries), (ministry) => {
              var _a, _b;
              _push2(`<div class="ministry-card" data-v-f30f1260${_scopeId}><div class="ministry-header" data-v-f30f1260${_scopeId}><h3 class="ministry-name" data-v-f30f1260${_scopeId}>${ssrInterpolate(ministry.name)}</h3>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: ministry.isActive ? "green" : "red"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(ministry.isActive ? "Ativo" : "Inativo")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(ministry.isActive ? "Ativo" : "Inativo"), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div><p class="ministry-description" data-v-f30f1260${_scopeId}>${ssrInterpolate(ministry.description)}</p><div class="ministry-stats" data-v-f30f1260${_scopeId}><div class="stat" data-v-f30f1260${_scopeId}><span class="stat-label" data-v-f30f1260${_scopeId}>Membros:</span><span class="stat-value" data-v-f30f1260${_scopeId}>${ssrInterpolate(ministry._count.members)}</span></div><div class="stat" data-v-f30f1260${_scopeId}><span class="stat-label" data-v-f30f1260${_scopeId}>Servi\xE7os:</span><span class="stat-value" data-v-f30f1260${_scopeId}>${ssrInterpolate(ministry._count.services)}</span></div><div class="stat" data-v-f30f1260${_scopeId}><span class="stat-label" data-v-f30f1260${_scopeId}>N\xEDvel m\xEDnimo:</span>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: getLevelColor(ministry.minLevel)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(getLevelLabel)(ministry.minLevel))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(getLevelLabel)(ministry.minLevel)), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
              if (ministry.leader) {
                _push2(`<div class="ministry-leader" data-v-f30f1260${_scopeId}><h4 data-v-f30f1260${_scopeId}>L\xEDder:</h4><p data-v-f30f1260${_scopeId}>${ssrInterpolate((_a = ministry.leader.profile) == null ? void 0 : _a.firstName)} ${ssrInterpolate((_b = ministry.leader.profile) == null ? void 0 : _b.lastName)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "ministries-section" }, [
                createVNode("div", { class: "ministries-grid" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(ministries), (ministry) => {
                    var _a, _b;
                    return openBlock(), createBlock("div", {
                      key: ministry.id,
                      class: "ministry-card"
                    }, [
                      createVNode("div", { class: "ministry-header" }, [
                        createVNode("h3", { class: "ministry-name" }, toDisplayString(ministry.name), 1),
                        createVNode(_component_UBadge, {
                          color: ministry.isActive ? "green" : "red"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(ministry.isActive ? "Ativo" : "Inativo"), 1)
                          ]),
                          _: 2
                        }, 1032, ["color"])
                      ]),
                      createVNode("p", { class: "ministry-description" }, toDisplayString(ministry.description), 1),
                      createVNode("div", { class: "ministry-stats" }, [
                        createVNode("div", { class: "stat" }, [
                          createVNode("span", { class: "stat-label" }, "Membros:"),
                          createVNode("span", { class: "stat-value" }, toDisplayString(ministry._count.members), 1)
                        ]),
                        createVNode("div", { class: "stat" }, [
                          createVNode("span", { class: "stat-label" }, "Servi\xE7os:"),
                          createVNode("span", { class: "stat-value" }, toDisplayString(ministry._count.services), 1)
                        ]),
                        createVNode("div", { class: "stat" }, [
                          createVNode("span", { class: "stat-label" }, "N\xEDvel m\xEDnimo:"),
                          createVNode(_component_UBadge, {
                            color: getLevelColor(ministry.minLevel)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(getLevelLabel)(ministry.minLevel)), 1)
                            ]),
                            _: 2
                          }, 1032, ["color"])
                        ])
                      ]),
                      ministry.leader ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "ministry-leader"
                      }, [
                        createVNode("h4", null, "L\xEDder:"),
                        createVNode("p", null, toDisplayString((_a = ministry.leader.profile) == null ? void 0 : _a.firstName) + " " + toDisplayString((_b = ministry.leader.profile) == null ? void 0 : _b.lastName), 1)
                      ])) : createCommentVNode("", true)
                    ]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showCreateBadgeModal),
        "onUpdate:modelValue": ($event) => isRef(showCreateBadgeModal) ? showCreateBadgeModal.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal-content" data-v-f30f1260${_scopeId}><h2 data-v-f30f1260${_scopeId}>Criar Novo Badge</h2><form data-v-f30f1260${_scopeId}><div class="form-grid" data-v-f30f1260${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Nome",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(newBadge).name,
                    "onUpdate:modelValue": ($event) => unref(newBadge).name = $event,
                    placeholder: "Nome do badge",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(newBadge).name,
                      "onUpdate:modelValue": ($event) => unref(newBadge).name = $event,
                      placeholder: "Nome do badge",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Tipo",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelect, {
                    modelValue: unref(newBadge).type,
                    "onUpdate:modelValue": ($event) => unref(newBadge).type = $event,
                    options: badgeTypeOptions,
                    placeholder: "Selecionar tipo",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelect, {
                      modelValue: unref(newBadge).type,
                      "onUpdate:modelValue": ($event) => unref(newBadge).type = $event,
                      options: badgeTypeOptions,
                      placeholder: "Selecionar tipo",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Cor" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(newBadge).color,
                    "onUpdate:modelValue": ($event) => unref(newBadge).color = $event,
                    type: "color",
                    placeholder: "#6B7280"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(newBadge).color,
                      "onUpdate:modelValue": ($event) => unref(newBadge).color = $event,
                      type: "color",
                      placeholder: "#6B7280"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "\xCDcone URL" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(newBadge).iconUrl,
                    "onUpdate:modelValue": ($event) => unref(newBadge).iconUrl = $event,
                    placeholder: "heroicons:trophy"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(newBadge).iconUrl,
                      "onUpdate:modelValue": ($event) => unref(newBadge).iconUrl = $event,
                      placeholder: "heroicons:trophy"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Descri\xE7\xE3o",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UTextarea, {
                    modelValue: unref(newBadge).description,
                    "onUpdate:modelValue": ($event) => unref(newBadge).description = $event,
                    placeholder: "Descri\xE7\xE3o detalhada do badge...",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UTextarea, {
                      modelValue: unref(newBadge).description,
                      "onUpdate:modelValue": ($event) => unref(newBadge).description = $event,
                      placeholder: "Descri\xE7\xE3o detalhada do badge...",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UCheckbox, {
              modelValue: unref(newBadge).isAutoAwarded,
              "onUpdate:modelValue": ($event) => unref(newBadge).isAutoAwarded = $event,
              label: "Atribui\xE7\xE3o autom\xE1tica"
            }, null, _parent2, _scopeId));
            _push2(`<div class="modal-actions" data-v-f30f1260${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              type: "button",
              variant: "ghost",
              onClick: ($event) => showCreateBadgeModal.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancelar `);
                } else {
                  return [
                    createTextVNode(" Cancelar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              type: "submit",
              color: "primary",
              loading: unref(loading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Criar Badge `);
                } else {
                  return [
                    createTextVNode(" Criar Badge ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "modal-content" }, [
                createVNode("h2", null, "Criar Novo Badge"),
                createVNode("form", {
                  onSubmit: withModifiers(createNewBadge, ["prevent"])
                }, [
                  createVNode("div", { class: "form-grid" }, [
                    createVNode(_component_UFormGroup, {
                      label: "Nome",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(newBadge).name,
                          "onUpdate:modelValue": ($event) => unref(newBadge).name = $event,
                          placeholder: "Nome do badge",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "Tipo",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_USelect, {
                          modelValue: unref(newBadge).type,
                          "onUpdate:modelValue": ($event) => unref(newBadge).type = $event,
                          options: badgeTypeOptions,
                          placeholder: "Selecionar tipo",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, { label: "Cor" }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(newBadge).color,
                          "onUpdate:modelValue": ($event) => unref(newBadge).color = $event,
                          type: "color",
                          placeholder: "#6B7280"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, { label: "\xCDcone URL" }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(newBadge).iconUrl,
                          "onUpdate:modelValue": ($event) => unref(newBadge).iconUrl = $event,
                          placeholder: "heroicons:trophy"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_UFormGroup, {
                    label: "Descri\xE7\xE3o",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UTextarea, {
                        modelValue: unref(newBadge).description,
                        "onUpdate:modelValue": ($event) => unref(newBadge).description = $event,
                        placeholder: "Descri\xE7\xE3o detalhada do badge...",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UCheckbox, {
                    modelValue: unref(newBadge).isAutoAwarded,
                    "onUpdate:modelValue": ($event) => unref(newBadge).isAutoAwarded = $event,
                    label: "Atribui\xE7\xE3o autom\xE1tica"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "modal-actions" }, [
                    createVNode(_component_UButton, {
                      type: "button",
                      variant: "ghost",
                      onClick: ($event) => showCreateBadgeModal.value = false
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Cancelar ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_UButton, {
                      type: "submit",
                      color: "primary",
                      loading: unref(loading)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Criar Badge ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ])
                ], 32)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/participantes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const participantes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f30f1260"]]);

export { participantes as default };
//# sourceMappingURL=participantes-DPVhSCA2.mjs.map
