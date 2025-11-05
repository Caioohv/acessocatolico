import { useSlots, computed, unref, mergeProps, withCtx, renderSlot, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { Primitive } from 'reka-ui';
import { e as useButtonGroup, g as useComponentIcons, t as tv, _ as _sfc_main$4, h as _sfc_main$3 } from './Button-CC2F9OIm.mjs';
import { a as useAppConfig } from './server.mjs';

const theme = {
  "slots": {
    "base": "font-medium inline-flex items-center",
    "label": "truncate",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailingIcon": "shrink-0"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
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
    "size": {
      "xs": {
        "base": "text-[8px]/3 px-1 py-0.5 gap-1 rounded-sm",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "sm": {
        "base": "text-[10px]/3 px-1.5 py-1 gap-1 rounded-sm",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "md": {
        "base": "text-xs px-2 py-1 gap-1 rounded-md",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "lg": {
        "base": "text-sm px-2 py-1 gap-1.5 rounded-md",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "text-base px-2.5 py-1 gap-1.5 rounded-md",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-6"
      }
    },
    "square": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "bg-primary text-inverted"
    },
    {
      "color": "primary-light",
      "variant": "solid",
      "class": "bg-primary-light text-inverted"
    },
    {
      "color": "primary-lighter",
      "variant": "solid",
      "class": "bg-primary-lighter text-inverted"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "bg-secondary text-inverted"
    },
    {
      "color": "secondary-light",
      "variant": "solid",
      "class": "bg-secondary-light text-inverted"
    },
    {
      "color": "ui-darker",
      "variant": "solid",
      "class": "bg-ui-darker text-inverted"
    },
    {
      "color": "ui-dark",
      "variant": "solid",
      "class": "bg-ui-dark text-inverted"
    },
    {
      "color": "ui",
      "variant": "solid",
      "class": "bg-ui text-inverted"
    },
    {
      "color": "ui-light",
      "variant": "solid",
      "class": "bg-ui-light text-inverted"
    },
    {
      "color": "ui-lighter",
      "variant": "solid",
      "class": "bg-ui-lighter text-inverted"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "text-primary ring ring-inset ring-primary/50"
    },
    {
      "color": "primary-light",
      "variant": "outline",
      "class": "text-primary-light ring ring-inset ring-primary-light/50"
    },
    {
      "color": "primary-lighter",
      "variant": "outline",
      "class": "text-primary-lighter ring ring-inset ring-primary-lighter/50"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "text-secondary ring ring-inset ring-secondary/50"
    },
    {
      "color": "secondary-light",
      "variant": "outline",
      "class": "text-secondary-light ring ring-inset ring-secondary-light/50"
    },
    {
      "color": "ui-darker",
      "variant": "outline",
      "class": "text-ui-darker ring ring-inset ring-ui-darker/50"
    },
    {
      "color": "ui-dark",
      "variant": "outline",
      "class": "text-ui-dark ring ring-inset ring-ui-dark/50"
    },
    {
      "color": "ui",
      "variant": "outline",
      "class": "text-ui ring ring-inset ring-ui/50"
    },
    {
      "color": "ui-light",
      "variant": "outline",
      "class": "text-ui-light ring ring-inset ring-ui-light/50"
    },
    {
      "color": "ui-lighter",
      "variant": "outline",
      "class": "text-ui-lighter ring ring-inset ring-ui-lighter/50"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "bg-primary/10 text-primary"
    },
    {
      "color": "primary-light",
      "variant": "soft",
      "class": "bg-primary-light/10 text-primary-light"
    },
    {
      "color": "primary-lighter",
      "variant": "soft",
      "class": "bg-primary-lighter/10 text-primary-lighter"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "bg-secondary/10 text-secondary"
    },
    {
      "color": "secondary-light",
      "variant": "soft",
      "class": "bg-secondary-light/10 text-secondary-light"
    },
    {
      "color": "ui-darker",
      "variant": "soft",
      "class": "bg-ui-darker/10 text-ui-darker"
    },
    {
      "color": "ui-dark",
      "variant": "soft",
      "class": "bg-ui-dark/10 text-ui-dark"
    },
    {
      "color": "ui",
      "variant": "soft",
      "class": "bg-ui/10 text-ui"
    },
    {
      "color": "ui-light",
      "variant": "soft",
      "class": "bg-ui-light/10 text-ui-light"
    },
    {
      "color": "ui-lighter",
      "variant": "soft",
      "class": "bg-ui-lighter/10 text-ui-lighter"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "bg-primary/10 text-primary ring ring-inset ring-primary/25"
    },
    {
      "color": "primary-light",
      "variant": "subtle",
      "class": "bg-primary-light/10 text-primary-light ring ring-inset ring-primary-light/25"
    },
    {
      "color": "primary-lighter",
      "variant": "subtle",
      "class": "bg-primary-lighter/10 text-primary-lighter ring ring-inset ring-primary-lighter/25"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "bg-secondary/10 text-secondary ring ring-inset ring-secondary/25"
    },
    {
      "color": "secondary-light",
      "variant": "subtle",
      "class": "bg-secondary-light/10 text-secondary-light ring ring-inset ring-secondary-light/25"
    },
    {
      "color": "ui-darker",
      "variant": "subtle",
      "class": "bg-ui-darker/10 text-ui-darker ring ring-inset ring-ui-darker/25"
    },
    {
      "color": "ui-dark",
      "variant": "subtle",
      "class": "bg-ui-dark/10 text-ui-dark ring ring-inset ring-ui-dark/25"
    },
    {
      "color": "ui",
      "variant": "subtle",
      "class": "bg-ui/10 text-ui ring ring-inset ring-ui/25"
    },
    {
      "color": "ui-light",
      "variant": "subtle",
      "class": "bg-ui-light/10 text-ui-light ring ring-inset ring-ui-light/25"
    },
    {
      "color": "ui-lighter",
      "variant": "subtle",
      "class": "bg-ui-lighter/10 text-ui-lighter ring ring-inset ring-ui-lighter/25"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-inverted bg-inverted"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-accented text-default bg-default"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-default bg-elevated"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-accented text-default bg-elevated"
    },
    {
      "size": "xs",
      "square": true,
      "class": "p-0.5"
    },
    {
      "size": "sm",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "md",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "lg",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "xl",
      "square": true,
      "class": "p-1"
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid",
    "size": "md"
  }
};
const _sfc_main = {
  __name: "Badge",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "span" },
    label: { type: [String, Number], required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    icon: { type: String, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: String, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: String, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const { orientation, size: buttonGroupSize } = useButtonGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const ui = computed(() => {
      var _a;
      return tv({ extend: tv(theme), ...((_a = appConfig.ui) == null ? void 0 : _a.badge) || {} })({
        color: props.color,
        variant: props.variant,
        size: buttonGroupSize.value || props.size,
        square: props.square || !slots.default && !props.label,
        buttonGroup: orientation.value
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value.base({ class: [(_a = props.ui) == null ? void 0 : _a.base, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "leading", {}, () => {
              var _a2, _b, _c;
              if (unref(isLeading) && unref(leadingIconName)) {
                _push2(ssrRenderComponent(_sfc_main$4, {
                  name: unref(leadingIconName),
                  class: ui.value.leadingIcon({ class: (_a2 = props.ui) == null ? void 0 : _a2.leadingIcon })
                }, null, _parent2, _scopeId));
              } else if (!!__props.avatar) {
                _push2(ssrRenderComponent(_sfc_main$3, mergeProps({
                  size: ((_b = props.ui) == null ? void 0 : _b.leadingAvatarSize) || ui.value.leadingAvatarSize()
                }, __props.avatar, {
                  class: ui.value.leadingAvatar({ class: (_c = props.ui) == null ? void 0 : _c.leadingAvatar })
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              var _a2;
              if (__props.label !== void 0 && __props.label !== null) {
                _push2(`<span class="${ssrRenderClass(ui.value.label({ class: (_a2 = props.ui) == null ? void 0 : _a2.label }))}"${_scopeId}>${ssrInterpolate(__props.label)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "trailing", {}, () => {
              var _a2;
              if (unref(isTrailing) && unref(trailingIconName)) {
                _push2(ssrRenderComponent(_sfc_main$4, {
                  name: unref(trailingIconName),
                  class: ui.value.trailingIcon({ class: (_a2 = props.ui) == null ? void 0 : _a2.trailingIcon })
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "leading", {}, () => {
                var _a2, _b, _c;
                return [
                  unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$4, {
                    key: 0,
                    name: unref(leadingIconName),
                    class: ui.value.leadingIcon({ class: (_a2 = props.ui) == null ? void 0 : _a2.leadingIcon })
                  }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                    key: 1,
                    size: ((_b = props.ui) == null ? void 0 : _b.leadingAvatarSize) || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    class: ui.value.leadingAvatar({ class: (_c = props.ui) == null ? void 0 : _c.leadingAvatar })
                  }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                ];
              }),
              renderSlot(_ctx.$slots, "default", {}, () => {
                var _a2;
                return [
                  __props.label !== void 0 && __props.label !== null ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: ui.value.label({ class: (_a2 = props.ui) == null ? void 0 : _a2.label })
                  }, toDisplayString(__props.label), 3)) : createCommentVNode("", true)
                ];
              }),
              renderSlot(_ctx.$slots, "trailing", {}, () => {
                var _a2;
                return [
                  unref(isTrailing) && unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$4, {
                    key: 0,
                    name: unref(trailingIconName),
                    class: ui.value.trailingIcon({ class: (_a2 = props.ui) == null ? void 0 : _a2.trailingIcon })
                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                ];
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Badge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Badge-8V1sItED.mjs.map
