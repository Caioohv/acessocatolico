import { useSlots, computed, unref, mergeProps, withCtx, renderSlot, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { Primitive } from 'reka-ui';
import { u as useLocale } from './useLocale-DPPClItX.mjs';
import { t as tv, h as _sfc_main$3, _ as _sfc_main$4, a as _sfc_main$1 } from './Button-DT_x6Bpp.mjs';
import { i as useAppConfig } from './server.mjs';

const theme = {
  "slots": {
    "root": "relative overflow-hidden w-full rounded-lg p-4 flex gap-2.5",
    "wrapper": "min-w-0 flex-1 flex flex-col",
    "title": "text-sm font-medium",
    "description": "text-sm opacity-90",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xl",
    "actions": "flex flex-wrap gap-1.5 shrink-0",
    "close": "p-0"
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
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": ""
    },
    "orientation": {
      "horizontal": {
        "root": "items-center",
        "actions": "items-center"
      },
      "vertical": {
        "root": "items-start",
        "actions": "items-start mt-2.5"
      }
    },
    "title": {
      "true": {
        "description": "mt-1"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": {
        "root": "bg-primary text-inverted"
      }
    },
    {
      "color": "primary-light",
      "variant": "solid",
      "class": {
        "root": "bg-primary-light text-inverted"
      }
    },
    {
      "color": "primary-lighter",
      "variant": "solid",
      "class": {
        "root": "bg-primary-lighter text-inverted"
      }
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": {
        "root": "bg-secondary text-inverted"
      }
    },
    {
      "color": "secondary-light",
      "variant": "solid",
      "class": {
        "root": "bg-secondary-light text-inverted"
      }
    },
    {
      "color": "ui-darker",
      "variant": "solid",
      "class": {
        "root": "bg-ui-darker text-inverted"
      }
    },
    {
      "color": "ui-dark",
      "variant": "solid",
      "class": {
        "root": "bg-ui-dark text-inverted"
      }
    },
    {
      "color": "ui",
      "variant": "solid",
      "class": {
        "root": "bg-ui text-inverted"
      }
    },
    {
      "color": "ui-light",
      "variant": "solid",
      "class": {
        "root": "bg-ui-light text-inverted"
      }
    },
    {
      "color": "ui-lighter",
      "variant": "solid",
      "class": {
        "root": "bg-ui-lighter text-inverted"
      }
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": {
        "root": "text-primary ring ring-inset ring-primary/25"
      }
    },
    {
      "color": "primary-light",
      "variant": "outline",
      "class": {
        "root": "text-primary-light ring ring-inset ring-primary-light/25"
      }
    },
    {
      "color": "primary-lighter",
      "variant": "outline",
      "class": {
        "root": "text-primary-lighter ring ring-inset ring-primary-lighter/25"
      }
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": {
        "root": "text-secondary ring ring-inset ring-secondary/25"
      }
    },
    {
      "color": "secondary-light",
      "variant": "outline",
      "class": {
        "root": "text-secondary-light ring ring-inset ring-secondary-light/25"
      }
    },
    {
      "color": "ui-darker",
      "variant": "outline",
      "class": {
        "root": "text-ui-darker ring ring-inset ring-ui-darker/25"
      }
    },
    {
      "color": "ui-dark",
      "variant": "outline",
      "class": {
        "root": "text-ui-dark ring ring-inset ring-ui-dark/25"
      }
    },
    {
      "color": "ui",
      "variant": "outline",
      "class": {
        "root": "text-ui ring ring-inset ring-ui/25"
      }
    },
    {
      "color": "ui-light",
      "variant": "outline",
      "class": {
        "root": "text-ui-light ring ring-inset ring-ui-light/25"
      }
    },
    {
      "color": "ui-lighter",
      "variant": "outline",
      "class": {
        "root": "text-ui-lighter ring ring-inset ring-ui-lighter/25"
      }
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": {
        "root": "bg-primary/10 text-primary"
      }
    },
    {
      "color": "primary-light",
      "variant": "soft",
      "class": {
        "root": "bg-primary-light/10 text-primary-light"
      }
    },
    {
      "color": "primary-lighter",
      "variant": "soft",
      "class": {
        "root": "bg-primary-lighter/10 text-primary-lighter"
      }
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": {
        "root": "bg-secondary/10 text-secondary"
      }
    },
    {
      "color": "secondary-light",
      "variant": "soft",
      "class": {
        "root": "bg-secondary-light/10 text-secondary-light"
      }
    },
    {
      "color": "ui-darker",
      "variant": "soft",
      "class": {
        "root": "bg-ui-darker/10 text-ui-darker"
      }
    },
    {
      "color": "ui-dark",
      "variant": "soft",
      "class": {
        "root": "bg-ui-dark/10 text-ui-dark"
      }
    },
    {
      "color": "ui",
      "variant": "soft",
      "class": {
        "root": "bg-ui/10 text-ui"
      }
    },
    {
      "color": "ui-light",
      "variant": "soft",
      "class": {
        "root": "bg-ui-light/10 text-ui-light"
      }
    },
    {
      "color": "ui-lighter",
      "variant": "soft",
      "class": {
        "root": "bg-ui-lighter/10 text-ui-lighter"
      }
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": {
        "root": "bg-primary/10 text-primary ring ring-inset ring-primary/25"
      }
    },
    {
      "color": "primary-light",
      "variant": "subtle",
      "class": {
        "root": "bg-primary-light/10 text-primary-light ring ring-inset ring-primary-light/25"
      }
    },
    {
      "color": "primary-lighter",
      "variant": "subtle",
      "class": {
        "root": "bg-primary-lighter/10 text-primary-lighter ring ring-inset ring-primary-lighter/25"
      }
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": {
        "root": "bg-secondary/10 text-secondary ring ring-inset ring-secondary/25"
      }
    },
    {
      "color": "secondary-light",
      "variant": "subtle",
      "class": {
        "root": "bg-secondary-light/10 text-secondary-light ring ring-inset ring-secondary-light/25"
      }
    },
    {
      "color": "ui-darker",
      "variant": "subtle",
      "class": {
        "root": "bg-ui-darker/10 text-ui-darker ring ring-inset ring-ui-darker/25"
      }
    },
    {
      "color": "ui-dark",
      "variant": "subtle",
      "class": {
        "root": "bg-ui-dark/10 text-ui-dark ring ring-inset ring-ui-dark/25"
      }
    },
    {
      "color": "ui",
      "variant": "subtle",
      "class": {
        "root": "bg-ui/10 text-ui ring ring-inset ring-ui/25"
      }
    },
    {
      "color": "ui-light",
      "variant": "subtle",
      "class": {
        "root": "bg-ui-light/10 text-ui-light ring ring-inset ring-ui-light/25"
      }
    },
    {
      "color": "ui-lighter",
      "variant": "subtle",
      "class": {
        "root": "bg-ui-lighter/10 text-ui-lighter ring ring-inset ring-ui-lighter/25"
      }
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": {
        "root": "text-inverted bg-inverted"
      }
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": {
        "root": "text-highlighted bg-default ring ring-inset ring-default"
      }
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": {
        "root": "text-highlighted bg-elevated/50"
      }
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": {
        "root": "text-highlighted bg-elevated/50 ring ring-inset ring-accented"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid"
  }
};
const _sfc_main = {
  __name: "Alert",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    icon: { type: String, required: false },
    avatar: { type: Object, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    orientation: { type: null, required: false, default: "vertical" },
    actions: { type: Array, required: false },
    close: { type: [Boolean, Object], required: false },
    closeIcon: { type: String, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const ui = computed(() => {
      var _a;
      return tv({ extend: tv(theme), ...((_a = appConfig.ui) == null ? void 0 : _a.alert) || {} })({
        color: props.color,
        variant: props.variant,
        orientation: props.orientation,
        title: !!props.title || !!slots.title
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "data-orientation": __props.orientation,
        class: ui.value.root({ class: [(_a = props.ui) == null ? void 0 : _a.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "leading", {}, () => {
              var _a3, _b2, _c2;
              if (__props.avatar) {
                _push2(ssrRenderComponent(_sfc_main$3, mergeProps({
                  size: ((_a3 = props.ui) == null ? void 0 : _a3.avatarSize) || ui.value.avatarSize()
                }, __props.avatar, {
                  class: ui.value.avatar({ class: (_b2 = props.ui) == null ? void 0 : _b2.avatar })
                }), null, _parent2, _scopeId));
              } else if (__props.icon) {
                _push2(ssrRenderComponent(_sfc_main$4, {
                  name: __props.icon,
                  class: ui.value.icon({ class: (_c2 = props.ui) == null ? void 0 : _c2.icon })
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            _push2(`<div class="${ssrRenderClass(ui.value.wrapper({ class: (_a2 = props.ui) == null ? void 0 : _a2.wrapper }))}"${_scopeId}>`);
            if (__props.title || !!slots.title) {
              _push2(`<div class="${ssrRenderClass(ui.value.title({ class: (_b = props.ui) == null ? void 0 : _b.title }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                _push2(`${ssrInterpolate(__props.title)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.description || !!slots.description) {
              _push2(`<div class="${ssrRenderClass(ui.value.description({ class: (_c = props.ui) == null ? void 0 : _c.description }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                _push2(`${ssrInterpolate(__props.description)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.orientation === "vertical" && (((_d = __props.actions) == null ? void 0 : _d.length) || !!slots.actions)) {
              _push2(`<div class="${ssrRenderClass(ui.value.actions({ class: (_e = props.ui) == null ? void 0 : _e.actions }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
                _push2(`<!--[-->`);
                ssrRenderList(__props.actions, (action, index) => {
                  _push2(ssrRenderComponent(_sfc_main$1, mergeProps({
                    key: index,
                    size: "xs"
                  }, { ref_for: true }, action), null, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.orientation === "horizontal" && (((_f = __props.actions) == null ? void 0 : _f.length) || !!slots.actions) || __props.close) {
              _push2(`<div class="${ssrRenderClass(ui.value.actions({ class: (_g = props.ui) == null ? void 0 : _g.actions, orientation: "horizontal" }))}"${_scopeId}>`);
              if (__props.orientation === "horizontal" && (((_h = __props.actions) == null ? void 0 : _h.length) || !!slots.actions)) {
                ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
                  _push2(`<!--[-->`);
                  ssrRenderList(__props.actions, (action, index) => {
                    _push2(ssrRenderComponent(_sfc_main$1, mergeProps({
                      key: index,
                      size: "xs"
                    }, { ref_for: true }, action), null, _parent2, _scopeId));
                  });
                  _push2(`<!--]-->`);
                }, _push2, _parent2, _scopeId);
              } else {
                _push2(`<!---->`);
              }
              ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                var _a3;
                if (__props.close) {
                  _push2(ssrRenderComponent(_sfc_main$1, mergeProps({
                    icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                    size: "md",
                    color: "neutral",
                    variant: "link",
                    "aria-label": unref(t)("alert.close")
                  }, typeof __props.close === "object" ? __props.close : {}, {
                    class: ui.value.close({ class: (_a3 = props.ui) == null ? void 0 : _a3.close }),
                    onClick: ($event) => emits("update:open", false)
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              renderSlot(_ctx.$slots, "leading", {}, () => {
                var _a3, _b2, _c2;
                return [
                  __props.avatar ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                    key: 0,
                    size: ((_a3 = props.ui) == null ? void 0 : _a3.avatarSize) || ui.value.avatarSize()
                  }, __props.avatar, {
                    class: ui.value.avatar({ class: (_b2 = props.ui) == null ? void 0 : _b2.avatar })
                  }), null, 16, ["size", "class"])) : __props.icon ? (openBlock(), createBlock(_sfc_main$4, {
                    key: 1,
                    name: __props.icon,
                    class: ui.value.icon({ class: (_c2 = props.ui) == null ? void 0 : _c2.icon })
                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                ];
              }),
              createVNode("div", {
                class: ui.value.wrapper({ class: (_i = props.ui) == null ? void 0 : _i.wrapper })
              }, [
                __props.title || !!slots.title ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: ui.value.title({ class: (_j = props.ui) == null ? void 0 : _j.title })
                }, [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    createTextVNode(toDisplayString(__props.title), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                __props.description || !!slots.description ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: ui.value.description({ class: (_k = props.ui) == null ? void 0 : _k.description })
                }, [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    createTextVNode(toDisplayString(__props.description), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                __props.orientation === "vertical" && (((_l = __props.actions) == null ? void 0 : _l.length) || !!slots.actions) ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: ui.value.actions({ class: (_m = props.ui) == null ? void 0 : _m.actions })
                }, [
                  renderSlot(_ctx.$slots, "actions", {}, () => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.actions, (action, index) => {
                      return openBlock(), createBlock(_sfc_main$1, mergeProps({
                        key: index,
                        size: "xs"
                      }, { ref_for: true }, action), null, 16);
                    }), 128))
                  ])
                ], 2)) : createCommentVNode("", true)
              ], 2),
              __props.orientation === "horizontal" && (((_n = __props.actions) == null ? void 0 : _n.length) || !!slots.actions) || __props.close ? (openBlock(), createBlock("div", {
                key: 0,
                class: ui.value.actions({ class: (_o = props.ui) == null ? void 0 : _o.actions, orientation: "horizontal" })
              }, [
                __props.orientation === "horizontal" && (((_p = __props.actions) == null ? void 0 : _p.length) || !!slots.actions) ? renderSlot(_ctx.$slots, "actions", { key: 0 }, () => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.actions, (action, index) => {
                    return openBlock(), createBlock(_sfc_main$1, mergeProps({
                      key: index,
                      size: "xs"
                    }, { ref_for: true }, action), null, 16);
                  }), 128))
                ]) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                  var _a3;
                  return [
                    __props.close ? (openBlock(), createBlock(_sfc_main$1, mergeProps({
                      key: 0,
                      icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                      size: "md",
                      color: "neutral",
                      variant: "link",
                      "aria-label": unref(t)("alert.close")
                    }, typeof __props.close === "object" ? __props.close : {}, {
                      class: ui.value.close({ class: (_a3 = props.ui) == null ? void 0 : _a3.close }),
                      onClick: ($event) => emits("update:open", false)
                    }), null, 16, ["icon", "aria-label", "class", "onClick"])) : createCommentVNode("", true)
                  ];
                })
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Alert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Alert-IcwFp6fa.mjs.map
