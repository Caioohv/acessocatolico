import __nuxt_component_1 from './index-B5rpN8hp.mjs';
import { _ as _sfc_main$2 } from './Form-DrjIrxFR.mjs';
import { _ as _sfc_main$3 } from './Input-B0Y_TCJq.mjs';
import { _ as _sfc_main$4 } from './Textarea-B_-_Y7du.mjs';
import { defineComponent, ref, reactive, computed, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSlots, toRef, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
import { useForwardPropsEmits, SelectRoot, SelectTrigger, SelectPortal, SelectContent, SelectGroup, SelectLabel, SelectSeparator, SelectItem, SelectItemText, SelectItemIndicator, SelectArrow } from 'reka-ui';
import { K as defu } from '../nitro/nitro.mjs';
import { reactivePick } from '@vueuse/core';
import { a as _sfc_main$6, u as useFormField, e as useButtonGroup, g as useComponentIcons, t as tv, j as isArrayOfArray, _ as _sfc_main$4$1, h as _sfc_main$3$1, i as get, k as compare } from './Button-DT_x6Bpp.mjs';
import { u as usePortal } from './usePortal-BbZPQQY_.mjs';
import { _ as _sfc_main$5, a as _sfc_main$1$1 } from './SelectMenu-CQ1Ex2wy.mjs';
import { _ as _export_sfc, b as useSeoMeta, n as navigateTo, i as useAppConfig } from './server.mjs';
import { _ as _sfc_main$7 } from './Alert-IcwFp6fa.mjs';
import { z } from 'zod';
import { u as usePriest } from './usePriest-8ZW8YgP9.mjs';
import { u as useToast } from './useToast-Bm7hVh5T.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'tailwind-variants';
import './NuxtImg-DFTKHYRn.mjs';
import './nuxt-link-Bn_O9NYZ.mjs';
import './useLocale-DPPClItX.mjs';

const theme = {
  "slots": {
    "base": [
      "relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed",
    "value": "truncate pointer-events-none",
    "placeholder": "truncate text-dimmed",
    "arrow": "fill-default",
    "content": "max-h-60 w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    "group": "p-1 isolate",
    "empty": "py-2 text-center text-sm text-muted",
    "label": "font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": [
      "group relative w-full flex items-center select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
      "transition-colors before:transition-colors"
    ],
    "itemLeadingIcon": [
      "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
      "transition-colors"
    ],
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemLabel": "truncate"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailingIcon": "size-6"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
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
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "primary-light",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-light"
    },
    {
      "color": "primary-lighter",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-lighter"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "secondary-light",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary-light"
    },
    {
      "color": "ui-darker",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-darker"
    },
    {
      "color": "ui-dark",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-dark"
    },
    {
      "color": "ui",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui"
    },
    {
      "color": "ui-light",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-light"
    },
    {
      "color": "ui-lighter",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-lighter"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "primary-light",
      "highlight": true,
      "class": "ring ring-inset ring-primary-light"
    },
    {
      "color": "primary-lighter",
      "highlight": true,
      "class": "ring ring-inset ring-primary-lighter"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "secondary-light",
      "highlight": true,
      "class": "ring ring-inset ring-secondary-light"
    },
    {
      "color": "ui-darker",
      "highlight": true,
      "class": "ring ring-inset ring-ui-darker"
    },
    {
      "color": "ui-dark",
      "highlight": true,
      "class": "ring ring-inset ring-ui-dark"
    },
    {
      "color": "ui",
      "highlight": true,
      "class": "ring ring-inset ring-ui"
    },
    {
      "color": "ui-light",
      "highlight": true,
      "class": "ring ring-inset ring-ui-light"
    },
    {
      "color": "ui-lighter",
      "highlight": true,
      "class": "ring ring-inset ring-ui-lighter"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "Select",
  __ssrInlineRender: true,
  props: {
    id: { type: String, required: false },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    trailingIcon: { type: String, required: false },
    selectedIcon: { type: String, required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    valueKey: { type: null, required: false, default: "value" },
    labelKey: { type: null, required: false, default: "label" },
    items: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    multiple: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    autocomplete: { type: String, required: false },
    disabled: { type: Boolean, required: false },
    name: { type: String, required: false },
    required: { type: Boolean, required: false },
    icon: { type: String, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: String, required: false },
    trailing: { type: Boolean, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: String, required: false }
  },
  emits: ["update:open", "change", "blur", "focus", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "disabled", "autocomplete", "required", "multiple"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: "popper" }));
    const arrowProps = toRef(() => props.arrow);
    const { emitFormChange, emitFormInput, emitFormBlur, emitFormFocus, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField(props);
    const { orientation, size: buttonGroupSize } = useButtonGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: appConfig.ui.icons.chevronDown })));
    const selectSize = computed(() => buttonGroupSize.value || formGroupSize.value);
    const ui = computed(() => {
      var _a;
      return tv({ extend: tv(theme), ...((_a = appConfig.ui) == null ? void 0 : _a.select) || {} })({
        color: color.value,
        variant: props.variant,
        size: selectSize == null ? void 0 : selectSize.value,
        loading: props.loading,
        highlight: highlight.value,
        leading: isLeading.value || !!props.avatar || !!slots.leading,
        trailing: isTrailing.value || !!slots.trailing,
        buttonGroup: orientation.value
      });
    });
    const groups = computed(
      () => {
        var _a;
        return ((_a = props.items) == null ? void 0 : _a.length) ? isArrayOfArray(props.items) ? props.items : [props.items] : [];
      }
    );
    const items = computed(() => groups.value.flatMap((group) => group));
    function displayValue(value) {
      if (props.multiple && Array.isArray(value)) {
        return value.map((v) => displayValue(v)).filter(Boolean).join(", ");
      }
      const item = items.value.find((item2) => compare(typeof item2 === "object" ? get(item2, props.valueKey) : item2, value));
      return item && (typeof item === "object" ? get(item, props.labelKey) : item);
    }
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    function onUpdateOpen(value) {
      if (!value) {
        const event = new FocusEvent("blur");
        emits("blur", event);
        emitFormBlur();
      } else {
        const event = new FocusEvent("focus");
        emits("focus", event);
        emitFormFocus();
      }
    }
    function isSelectItem(item) {
      return typeof item === "object" && item !== null;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectRoot), mergeProps({ name: unref(name) }, unref(rootProps), {
        autocomplete: __props.autocomplete,
        disabled: unref(disabled),
        "default-value": __props.defaultValue,
        "model-value": __props.modelValue,
        "onUpdate:modelValue": onUpdate,
        "onUpdate:open": onUpdateOpen
      }, _attrs), {
        default: withCtx(({ modelValue, open }, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(SelectTrigger), mergeProps({
              id: unref(id),
              class: ui.value.base({ class: [(_a = props.ui) == null ? void 0 : _a.base, props.class] })
            }, { ..._ctx.$attrs, ...unref(ariaAttrs) }), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                var _a2, _b2, _c, _d;
                if (_push3) {
                  if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
                    _push3(`<span class="${ssrRenderClass(ui.value.leading({ class: (_a2 = props.ui) == null ? void 0 : _a2.leading }))}"${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "leading", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => {
                      var _a3, _b3, _c2;
                      if (unref(isLeading) && unref(leadingIconName)) {
                        _push3(ssrRenderComponent(_sfc_main$4$1, {
                          name: unref(leadingIconName),
                          class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                        }, null, _parent3, _scopeId2));
                      } else if (!!__props.avatar) {
                        _push3(ssrRenderComponent(_sfc_main$3$1, mergeProps({
                          size: ((_b3 = props.ui) == null ? void 0 : _b3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                        }, __props.avatar, {
                          class: ui.value.itemLeadingAvatar({ class: (_c2 = props.ui) == null ? void 0 : _c2.itemLeadingAvatar })
                        }), null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  ssrRenderSlot(_ctx.$slots, "default", {
                    modelValue,
                    open
                  }, () => {
                    _push3(`<!--[-->`);
                    ssrRenderList([displayValue(modelValue)], (displayedModelValue) => {
                      var _a4;
                      var _a3, _b3;
                      _push3(`<!--[-->`);
                      if (displayedModelValue) {
                        _push3(`<span class="${ssrRenderClass(ui.value.value({ class: (_a3 = props.ui) == null ? void 0 : _a3.value }))}"${_scopeId2}>${ssrInterpolate(displayedModelValue)}</span>`);
                      } else {
                        _push3(`<span class="${ssrRenderClass(ui.value.placeholder({ class: (_b3 = props.ui) == null ? void 0 : _b3.placeholder }))}"${_scopeId2}>${ssrInterpolate((_a4 = __props.placeholder) != null ? _a4 : "\xA0")}</span>`);
                      }
                      _push3(`<!--]-->`);
                    });
                    _push3(`<!--]-->`);
                  }, _push3, _parent3, _scopeId2);
                  if (unref(isTrailing) || !!slots.trailing) {
                    _push3(`<span class="${ssrRenderClass(ui.value.trailing({ class: (_b2 = props.ui) == null ? void 0 : _b2.trailing }))}"${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "trailing", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => {
                      var _a3;
                      if (unref(trailingIconName)) {
                        _push3(ssrRenderComponent(_sfc_main$4$1, {
                          name: unref(trailingIconName),
                          class: ui.value.trailingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.trailingIcon })
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: ui.value.leading({ class: (_c = props.ui) == null ? void 0 : _c.leading })
                    }, [
                      renderSlot(_ctx.$slots, "leading", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => {
                        var _a3, _b3, _c2;
                        return [
                          unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$4$1, {
                            key: 0,
                            name: unref(leadingIconName),
                            class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                          }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$3$1, mergeProps({
                            key: 1,
                            size: ((_b3 = props.ui) == null ? void 0 : _b3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                          }, __props.avatar, {
                            class: ui.value.itemLeadingAvatar({ class: (_c2 = props.ui) == null ? void 0 : _c2.itemLeadingAvatar })
                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                        ];
                      })
                    ], 2)) : createCommentVNode("", true),
                    renderSlot(_ctx.$slots, "default", {
                      modelValue,
                      open
                    }, () => [
                      (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                        var _a4;
                        var _a3, _b3;
                        return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                          displayedModelValue ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: ui.value.value({ class: (_a3 = props.ui) == null ? void 0 : _a3.value })
                          }, toDisplayString(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: ui.value.placeholder({ class: (_b3 = props.ui) == null ? void 0 : _b3.placeholder })
                          }, toDisplayString((_a4 = __props.placeholder) != null ? _a4 : "\xA0"), 3))
                        ], 64);
                      }), 128))
                    ]),
                    unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: ui.value.trailing({ class: (_d = props.ui) == null ? void 0 : _d.trailing })
                    }, [
                      renderSlot(_ctx.$slots, "trailing", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => {
                        var _a3;
                        return [
                          unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$4$1, {
                            key: 0,
                            name: unref(trailingIconName),
                            class: ui.value.trailingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.trailingIcon })
                          }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                        ];
                      })
                    ], 2)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SelectPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SelectContent), mergeProps({
                    class: ui.value.content({ class: (_a2 = props.ui) == null ? void 0 : _a2.content })
                  }, contentProps.value), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      var _a3, _b3, _c, _d;
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push4, _parent4, _scopeId3);
                        _push4(`<div role="presentation" class="${ssrRenderClass(ui.value.viewport({ class: (_a3 = props.ui) == null ? void 0 : _a3.viewport }))}"${_scopeId3}><!--[-->`);
                        ssrRenderList(groups.value, (group, groupIndex) => {
                          var _a4;
                          _push4(ssrRenderComponent(unref(SelectGroup), {
                            key: `group-${groupIndex}`,
                            class: ui.value.group({ class: (_a4 = props.ui) == null ? void 0 : _a4.group })
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(group, (item, index2) => {
                                  var _a5, _b4, _c2, _d2, _e, _f;
                                  _push5(`<!--[-->`);
                                  if (isSelectItem(item) && item.type === "label") {
                                    _push5(ssrRenderComponent(unref(SelectLabel), {
                                      class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                    }, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else if (isSelectItem(item) && item.type === "separator") {
                                    _push5(ssrRenderComponent(unref(SelectSeparator), {
                                      class: ui.value.separator({ class: [(_c2 = props.ui) == null ? void 0 : _c2.separator, (_d2 = item.ui) == null ? void 0 : _d2.separator, item.class] })
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    _push5(ssrRenderComponent(unref(SelectItem), {
                                      class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                      disabled: isSelectItem(item) && item.disabled,
                                      value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                      onSelect: ($event) => {
                                        var _a6;
                                        return isSelectItem(item) && ((_a6 = item.onSelect) == null ? void 0 : _a6.call(item, $event));
                                      }
                                    }, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          ssrRenderSlot(_ctx.$slots, "item", {
                                            item,
                                            index: index2
                                          }, () => {
                                            var _a6, _b5, _c3, _d3;
                                            ssrRenderSlot(_ctx.$slots, "item-leading", {
                                              item,
                                              index: index2
                                            }, () => {
                                              var _a7, _b6, _c4, _d4, _e2, _f2, _g, _h, _i, _j;
                                              if (isSelectItem(item) && item.icon) {
                                                _push6(ssrRenderComponent(_sfc_main$4$1, {
                                                  name: item.icon,
                                                  class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                }, null, _parent6, _scopeId5));
                                              } else if (isSelectItem(item) && item.avatar) {
                                                _push6(ssrRenderComponent(_sfc_main$3$1, mergeProps({
                                                  size: ((_c4 = item.ui) == null ? void 0 : _c4.itemLeadingAvatarSize) || ((_d4 = props.ui) == null ? void 0 : _d4.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                }, { ref_for: true }, item.avatar, {
                                                  class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                }), null, _parent6, _scopeId5));
                                              } else if (isSelectItem(item) && item.chip) {
                                                _push6(ssrRenderComponent(_sfc_main$1$1, mergeProps({
                                                  size: ((_g = item.ui) == null ? void 0 : _g.itemLeadingChipSize) || ((_h = props.ui) == null ? void 0 : _h.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                  inset: "",
                                                  standalone: ""
                                                }, { ref_for: true }, item.chip, {
                                                  class: ui.value.itemLeadingChip({ class: [(_i = props.ui) == null ? void 0 : _i.itemLeadingChip, (_j = item.ui) == null ? void 0 : _j.itemLeadingChip] })
                                                }), null, _parent6, _scopeId5));
                                              } else {
                                                _push6(`<!---->`);
                                              }
                                            }, _push6, _parent6, _scopeId5);
                                            _push6(ssrRenderComponent(unref(SelectItemText), {
                                              class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] })
                                            }, {
                                              default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  ssrRenderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index: index2
                                                  }, () => {
                                                    _push7(`${ssrInterpolate(isSelectItem(item) ? unref(get)(item, props.labelKey) : item)}`);
                                                  }, _push7, _parent7, _scopeId6);
                                                } else {
                                                  return [
                                                    renderSlot(_ctx.$slots, "item-label", {
                                                      item,
                                                      index: index2
                                                    }, () => [
                                                      createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                    ])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                            _push6(`<span class="${ssrRenderClass(ui.value.itemTrailing({ class: [(_c3 = props.ui) == null ? void 0 : _c3.itemTrailing, isSelectItem(item) && ((_d3 = item.ui) == null ? void 0 : _d3.itemTrailing)] }))}"${_scopeId5}>`);
                                            ssrRenderSlot(_ctx.$slots, "item-trailing", {
                                              item,
                                              index: index2
                                            }, null, _push6, _parent6, _scopeId5);
                                            _push6(ssrRenderComponent(unref(SelectItemIndicator), { "as-child": "" }, {
                                              default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                                var _a7, _b6, _c4, _d4;
                                                if (_push7) {
                                                  _push7(ssrRenderComponent(_sfc_main$4$1, {
                                                    name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                    class: ui.value.itemTrailingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                  }, null, _parent7, _scopeId6));
                                                } else {
                                                  return [
                                                    createVNode(_sfc_main$4$1, {
                                                      name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                      class: ui.value.itemTrailingIcon({ class: [(_c4 = props.ui) == null ? void 0 : _c4.itemTrailingIcon, isSelectItem(item) && ((_d4 = item.ui) == null ? void 0 : _d4.itemTrailingIcon)] })
                                                    }, null, 8, ["name", "class"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                            _push6(`</span>`);
                                          }, _push6, _parent6, _scopeId5);
                                        } else {
                                          return [
                                            renderSlot(_ctx.$slots, "item", {
                                              item,
                                              index: index2
                                            }, () => {
                                              var _a6, _b5, _c3, _d3;
                                              return [
                                                renderSlot(_ctx.$slots, "item-leading", {
                                                  item,
                                                  index: index2
                                                }, () => {
                                                  var _a7, _b6, _c4, _d4, _e2, _f2, _g, _h, _i, _j;
                                                  return [
                                                    isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$4$1, {
                                                      key: 0,
                                                      name: item.icon,
                                                      class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                    }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$3$1, mergeProps({
                                                      key: 1,
                                                      size: ((_c4 = item.ui) == null ? void 0 : _c4.itemLeadingAvatarSize) || ((_d4 = props.ui) == null ? void 0 : _d4.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                    }, { ref_for: true }, item.avatar, {
                                                      class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                    }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$1$1, mergeProps({
                                                      key: 2,
                                                      size: ((_g = item.ui) == null ? void 0 : _g.itemLeadingChipSize) || ((_h = props.ui) == null ? void 0 : _h.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                      inset: "",
                                                      standalone: ""
                                                    }, { ref_for: true }, item.chip, {
                                                      class: ui.value.itemLeadingChip({ class: [(_i = props.ui) == null ? void 0 : _i.itemLeadingChip, (_j = item.ui) == null ? void 0 : _j.itemLeadingChip] })
                                                    }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                  ];
                                                }),
                                                createVNode(unref(SelectItemText), {
                                                  class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] })
                                                }, {
                                                  default: withCtx(() => [
                                                    renderSlot(_ctx.$slots, "item-label", {
                                                      item,
                                                      index: index2
                                                    }, () => [
                                                      createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["class"]),
                                                createVNode("span", {
                                                  class: ui.value.itemTrailing({ class: [(_c3 = props.ui) == null ? void 0 : _c3.itemTrailing, isSelectItem(item) && ((_d3 = item.ui) == null ? void 0 : _d3.itemTrailing)] })
                                                }, [
                                                  renderSlot(_ctx.$slots, "item-trailing", {
                                                    item,
                                                    index: index2
                                                  }),
                                                  createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                                    default: withCtx(() => {
                                                      var _a7, _b6;
                                                      return [
                                                        createVNode(_sfc_main$4$1, {
                                                          name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                          class: ui.value.itemTrailingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                        }, null, 8, ["name", "class"])
                                                      ];
                                                    }),
                                                    _: 2
                                                  }, 1024)
                                                ], 2)
                                              ];
                                            })
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  }
                                  _push5(`<!--]-->`);
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index2) => {
                                    var _a5, _b4, _c2, _d2, _e, _f;
                                    return openBlock(), createBlock(Fragment, {
                                      key: `group-${groupIndex}-${index2}`
                                    }, [
                                      isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel), {
                                        key: 0,
                                        class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator), {
                                        key: 1,
                                        class: ui.value.separator({ class: [(_c2 = props.ui) == null ? void 0 : _c2.separator, (_d2 = item.ui) == null ? void 0 : _d2.separator, item.class] })
                                      }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem), {
                                        key: 2,
                                        class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                        disabled: isSelectItem(item) && item.disabled,
                                        value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                        onSelect: ($event) => {
                                          var _a6;
                                          return isSelectItem(item) && ((_a6 = item.onSelect) == null ? void 0 : _a6.call(item, $event));
                                        }
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "item", {
                                            item,
                                            index: index2
                                          }, () => {
                                            var _a6, _b5, _c3, _d3;
                                            return [
                                              renderSlot(_ctx.$slots, "item-leading", {
                                                item,
                                                index: index2
                                              }, () => {
                                                var _a7, _b6, _c4, _d4, _e2, _f2, _g, _h, _i, _j;
                                                return [
                                                  isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$4$1, {
                                                    key: 0,
                                                    name: item.icon,
                                                    class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                  }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$3$1, mergeProps({
                                                    key: 1,
                                                    size: ((_c4 = item.ui) == null ? void 0 : _c4.itemLeadingAvatarSize) || ((_d4 = props.ui) == null ? void 0 : _d4.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                  }, { ref_for: true }, item.avatar, {
                                                    class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                  }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$1$1, mergeProps({
                                                    key: 2,
                                                    size: ((_g = item.ui) == null ? void 0 : _g.itemLeadingChipSize) || ((_h = props.ui) == null ? void 0 : _h.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                    inset: "",
                                                    standalone: ""
                                                  }, { ref_for: true }, item.chip, {
                                                    class: ui.value.itemLeadingChip({ class: [(_i = props.ui) == null ? void 0 : _i.itemLeadingChip, (_j = item.ui) == null ? void 0 : _j.itemLeadingChip] })
                                                  }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                ];
                                              }),
                                              createVNode(unref(SelectItemText), {
                                                class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] })
                                              }, {
                                                default: withCtx(() => [
                                                  renderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index: index2
                                                  }, () => [
                                                    createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["class"]),
                                              createVNode("span", {
                                                class: ui.value.itemTrailing({ class: [(_c3 = props.ui) == null ? void 0 : _c3.itemTrailing, isSelectItem(item) && ((_d3 = item.ui) == null ? void 0 : _d3.itemTrailing)] })
                                              }, [
                                                renderSlot(_ctx.$slots, "item-trailing", {
                                                  item,
                                                  index: index2
                                                }),
                                                createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                                  default: withCtx(() => {
                                                    var _a7, _b6;
                                                    return [
                                                      createVNode(_sfc_main$4$1, {
                                                        name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                        class: ui.value.itemTrailingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                      }, null, 8, ["name", "class"])
                                                    ];
                                                  }),
                                                  _: 2
                                                }, 1024)
                                              ], 2)
                                            ];
                                          })
                                        ]),
                                        _: 2
                                      }, 1032, ["class", "disabled", "value", "onSelect"]))
                                    ], 64);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]--></div>`);
                        ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push4, _parent4, _scopeId3);
                        if (!!__props.arrow) {
                          _push4(ssrRenderComponent(unref(SelectArrow), mergeProps(arrowProps.value, {
                            class: ui.value.arrow({ class: (_b3 = props.ui) == null ? void 0 : _b3.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "content-top"),
                          createVNode("div", {
                            role: "presentation",
                            class: ui.value.viewport({ class: (_c = props.ui) == null ? void 0 : _c.viewport })
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                              var _a4;
                              return openBlock(), createBlock(unref(SelectGroup), {
                                key: `group-${groupIndex}`,
                                class: ui.value.group({ class: (_a4 = props.ui) == null ? void 0 : _a4.group })
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index2) => {
                                    var _a5, _b4, _c2, _d2, _e, _f;
                                    return openBlock(), createBlock(Fragment, {
                                      key: `group-${groupIndex}-${index2}`
                                    }, [
                                      isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel), {
                                        key: 0,
                                        class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator), {
                                        key: 1,
                                        class: ui.value.separator({ class: [(_c2 = props.ui) == null ? void 0 : _c2.separator, (_d2 = item.ui) == null ? void 0 : _d2.separator, item.class] })
                                      }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem), {
                                        key: 2,
                                        class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                        disabled: isSelectItem(item) && item.disabled,
                                        value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                        onSelect: ($event) => {
                                          var _a6;
                                          return isSelectItem(item) && ((_a6 = item.onSelect) == null ? void 0 : _a6.call(item, $event));
                                        }
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "item", {
                                            item,
                                            index: index2
                                          }, () => {
                                            var _a6, _b5, _c3, _d3;
                                            return [
                                              renderSlot(_ctx.$slots, "item-leading", {
                                                item,
                                                index: index2
                                              }, () => {
                                                var _a7, _b6, _c4, _d4, _e2, _f2, _g, _h, _i, _j;
                                                return [
                                                  isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$4$1, {
                                                    key: 0,
                                                    name: item.icon,
                                                    class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                  }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$3$1, mergeProps({
                                                    key: 1,
                                                    size: ((_c4 = item.ui) == null ? void 0 : _c4.itemLeadingAvatarSize) || ((_d4 = props.ui) == null ? void 0 : _d4.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                  }, { ref_for: true }, item.avatar, {
                                                    class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                  }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$1$1, mergeProps({
                                                    key: 2,
                                                    size: ((_g = item.ui) == null ? void 0 : _g.itemLeadingChipSize) || ((_h = props.ui) == null ? void 0 : _h.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                    inset: "",
                                                    standalone: ""
                                                  }, { ref_for: true }, item.chip, {
                                                    class: ui.value.itemLeadingChip({ class: [(_i = props.ui) == null ? void 0 : _i.itemLeadingChip, (_j = item.ui) == null ? void 0 : _j.itemLeadingChip] })
                                                  }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                ];
                                              }),
                                              createVNode(unref(SelectItemText), {
                                                class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] })
                                              }, {
                                                default: withCtx(() => [
                                                  renderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index: index2
                                                  }, () => [
                                                    createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["class"]),
                                              createVNode("span", {
                                                class: ui.value.itemTrailing({ class: [(_c3 = props.ui) == null ? void 0 : _c3.itemTrailing, isSelectItem(item) && ((_d3 = item.ui) == null ? void 0 : _d3.itemTrailing)] })
                                              }, [
                                                renderSlot(_ctx.$slots, "item-trailing", {
                                                  item,
                                                  index: index2
                                                }),
                                                createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                                  default: withCtx(() => {
                                                    var _a7, _b6;
                                                    return [
                                                      createVNode(_sfc_main$4$1, {
                                                        name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                        class: ui.value.itemTrailingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                      }, null, 8, ["name", "class"])
                                                    ];
                                                  }),
                                                  _: 2
                                                }, 1024)
                                              ], 2)
                                            ];
                                          })
                                        ]),
                                        _: 2
                                      }, 1032, ["class", "disabled", "value", "onSelect"]))
                                    ], 64);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1032, ["class"]);
                            }), 128))
                          ], 2),
                          renderSlot(_ctx.$slots, "content-bottom"),
                          !!__props.arrow ? (openBlock(), createBlock(unref(SelectArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: (_d = props.ui) == null ? void 0 : _d.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(SelectContent), mergeProps({
                      class: ui.value.content({ class: (_b2 = props.ui) == null ? void 0 : _b2.content })
                    }, contentProps.value), {
                      default: withCtx(() => {
                        var _a3, _b3;
                        return [
                          renderSlot(_ctx.$slots, "content-top"),
                          createVNode("div", {
                            role: "presentation",
                            class: ui.value.viewport({ class: (_a3 = props.ui) == null ? void 0 : _a3.viewport })
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                              var _a4;
                              return openBlock(), createBlock(unref(SelectGroup), {
                                key: `group-${groupIndex}`,
                                class: ui.value.group({ class: (_a4 = props.ui) == null ? void 0 : _a4.group })
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index2) => {
                                    var _a5, _b4, _c, _d, _e, _f;
                                    return openBlock(), createBlock(Fragment, {
                                      key: `group-${groupIndex}-${index2}`
                                    }, [
                                      isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel), {
                                        key: 0,
                                        class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator), {
                                        key: 1,
                                        class: ui.value.separator({ class: [(_c = props.ui) == null ? void 0 : _c.separator, (_d = item.ui) == null ? void 0 : _d.separator, item.class] })
                                      }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem), {
                                        key: 2,
                                        class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                        disabled: isSelectItem(item) && item.disabled,
                                        value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                        onSelect: ($event) => {
                                          var _a6;
                                          return isSelectItem(item) && ((_a6 = item.onSelect) == null ? void 0 : _a6.call(item, $event));
                                        }
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "item", {
                                            item,
                                            index: index2
                                          }, () => {
                                            var _a6, _b5, _c2, _d2;
                                            return [
                                              renderSlot(_ctx.$slots, "item-leading", {
                                                item,
                                                index: index2
                                              }, () => {
                                                var _a7, _b6, _c3, _d3, _e2, _f2, _g, _h, _i, _j;
                                                return [
                                                  isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$4$1, {
                                                    key: 0,
                                                    name: item.icon,
                                                    class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                  }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$3$1, mergeProps({
                                                    key: 1,
                                                    size: ((_c3 = item.ui) == null ? void 0 : _c3.itemLeadingAvatarSize) || ((_d3 = props.ui) == null ? void 0 : _d3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                  }, { ref_for: true }, item.avatar, {
                                                    class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                  }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$1$1, mergeProps({
                                                    key: 2,
                                                    size: ((_g = item.ui) == null ? void 0 : _g.itemLeadingChipSize) || ((_h = props.ui) == null ? void 0 : _h.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                    inset: "",
                                                    standalone: ""
                                                  }, { ref_for: true }, item.chip, {
                                                    class: ui.value.itemLeadingChip({ class: [(_i = props.ui) == null ? void 0 : _i.itemLeadingChip, (_j = item.ui) == null ? void 0 : _j.itemLeadingChip] })
                                                  }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                ];
                                              }),
                                              createVNode(unref(SelectItemText), {
                                                class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] })
                                              }, {
                                                default: withCtx(() => [
                                                  renderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index: index2
                                                  }, () => [
                                                    createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["class"]),
                                              createVNode("span", {
                                                class: ui.value.itemTrailing({ class: [(_c2 = props.ui) == null ? void 0 : _c2.itemTrailing, isSelectItem(item) && ((_d2 = item.ui) == null ? void 0 : _d2.itemTrailing)] })
                                              }, [
                                                renderSlot(_ctx.$slots, "item-trailing", {
                                                  item,
                                                  index: index2
                                                }),
                                                createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                                  default: withCtx(() => {
                                                    var _a7, _b6;
                                                    return [
                                                      createVNode(_sfc_main$4$1, {
                                                        name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                        class: ui.value.itemTrailingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                      }, null, 8, ["name", "class"])
                                                    ];
                                                  }),
                                                  _: 2
                                                }, 1024)
                                              ], 2)
                                            ];
                                          })
                                        ]),
                                        _: 2
                                      }, 1032, ["class", "disabled", "value", "onSelect"]))
                                    ], 64);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1032, ["class"]);
                            }), 128))
                          ], 2),
                          renderSlot(_ctx.$slots, "content-bottom"),
                          !!__props.arrow ? (openBlock(), createBlock(unref(SelectArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: (_b3 = props.ui) == null ? void 0 : _b3.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }),
                      _: 3
                    }, 16, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(SelectTrigger), mergeProps({
                id: unref(id),
                class: ui.value.base({ class: [(_b = props.ui) == null ? void 0 : _b.base, props.class] })
              }, { ..._ctx.$attrs, ...unref(ariaAttrs) }), {
                default: withCtx(() => {
                  var _a2, _b2;
                  return [
                    unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: ui.value.leading({ class: (_a2 = props.ui) == null ? void 0 : _a2.leading })
                    }, [
                      renderSlot(_ctx.$slots, "leading", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => {
                        var _a3, _b3, _c;
                        return [
                          unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$4$1, {
                            key: 0,
                            name: unref(leadingIconName),
                            class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                          }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$3$1, mergeProps({
                            key: 1,
                            size: ((_b3 = props.ui) == null ? void 0 : _b3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                          }, __props.avatar, {
                            class: ui.value.itemLeadingAvatar({ class: (_c = props.ui) == null ? void 0 : _c.itemLeadingAvatar })
                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                        ];
                      })
                    ], 2)) : createCommentVNode("", true),
                    renderSlot(_ctx.$slots, "default", {
                      modelValue,
                      open
                    }, () => [
                      (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                        var _a4;
                        var _a3, _b3;
                        return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                          displayedModelValue ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: ui.value.value({ class: (_a3 = props.ui) == null ? void 0 : _a3.value })
                          }, toDisplayString(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: ui.value.placeholder({ class: (_b3 = props.ui) == null ? void 0 : _b3.placeholder })
                          }, toDisplayString((_a4 = __props.placeholder) != null ? _a4 : "\xA0"), 3))
                        ], 64);
                      }), 128))
                    ]),
                    unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: ui.value.trailing({ class: (_b2 = props.ui) == null ? void 0 : _b2.trailing })
                    }, [
                      renderSlot(_ctx.$slots, "trailing", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => {
                        var _a3;
                        return [
                          unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$4$1, {
                            key: 0,
                            name: unref(trailingIconName),
                            class: ui.value.trailingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.trailingIcon })
                          }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                        ];
                      })
                    ], 2)) : createCommentVNode("", true)
                  ];
                }),
                _: 2
              }, 1040, ["id", "class"]),
              createVNode(unref(SelectPortal), unref(portalProps), {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createVNode(unref(SelectContent), mergeProps({
                      class: ui.value.content({ class: (_a2 = props.ui) == null ? void 0 : _a2.content })
                    }, contentProps.value), {
                      default: withCtx(() => {
                        var _a3, _b2;
                        return [
                          renderSlot(_ctx.$slots, "content-top"),
                          createVNode("div", {
                            role: "presentation",
                            class: ui.value.viewport({ class: (_a3 = props.ui) == null ? void 0 : _a3.viewport })
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                              var _a4;
                              return openBlock(), createBlock(unref(SelectGroup), {
                                key: `group-${groupIndex}`,
                                class: ui.value.group({ class: (_a4 = props.ui) == null ? void 0 : _a4.group })
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index2) => {
                                    var _a5, _b3, _c, _d, _e, _f;
                                    return openBlock(), createBlock(Fragment, {
                                      key: `group-${groupIndex}-${index2}`
                                    }, [
                                      isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel), {
                                        key: 0,
                                        class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b3 = item.ui) == null ? void 0 : _b3.label, item.class] })
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator), {
                                        key: 1,
                                        class: ui.value.separator({ class: [(_c = props.ui) == null ? void 0 : _c.separator, (_d = item.ui) == null ? void 0 : _d.separator, item.class] })
                                      }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem), {
                                        key: 2,
                                        class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                        disabled: isSelectItem(item) && item.disabled,
                                        value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                        onSelect: ($event) => {
                                          var _a6;
                                          return isSelectItem(item) && ((_a6 = item.onSelect) == null ? void 0 : _a6.call(item, $event));
                                        }
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "item", {
                                            item,
                                            index: index2
                                          }, () => {
                                            var _a6, _b4, _c2, _d2;
                                            return [
                                              renderSlot(_ctx.$slots, "item-leading", {
                                                item,
                                                index: index2
                                              }, () => {
                                                var _a7, _b5, _c3, _d3, _e2, _f2, _g, _h, _i, _j;
                                                return [
                                                  isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$4$1, {
                                                    key: 0,
                                                    name: item.icon,
                                                    class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b5 = item.ui) == null ? void 0 : _b5.itemLeadingIcon] })
                                                  }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$3$1, mergeProps({
                                                    key: 1,
                                                    size: ((_c3 = item.ui) == null ? void 0 : _c3.itemLeadingAvatarSize) || ((_d3 = props.ui) == null ? void 0 : _d3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                  }, { ref_for: true }, item.avatar, {
                                                    class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                  }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$1$1, mergeProps({
                                                    key: 2,
                                                    size: ((_g = item.ui) == null ? void 0 : _g.itemLeadingChipSize) || ((_h = props.ui) == null ? void 0 : _h.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                    inset: "",
                                                    standalone: ""
                                                  }, { ref_for: true }, item.chip, {
                                                    class: ui.value.itemLeadingChip({ class: [(_i = props.ui) == null ? void 0 : _i.itemLeadingChip, (_j = item.ui) == null ? void 0 : _j.itemLeadingChip] })
                                                  }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                ];
                                              }),
                                              createVNode(unref(SelectItemText), {
                                                class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b4 = item.ui) == null ? void 0 : _b4.itemLabel)] })
                                              }, {
                                                default: withCtx(() => [
                                                  renderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index: index2
                                                  }, () => [
                                                    createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["class"]),
                                              createVNode("span", {
                                                class: ui.value.itemTrailing({ class: [(_c2 = props.ui) == null ? void 0 : _c2.itemTrailing, isSelectItem(item) && ((_d2 = item.ui) == null ? void 0 : _d2.itemTrailing)] })
                                              }, [
                                                renderSlot(_ctx.$slots, "item-trailing", {
                                                  item,
                                                  index: index2
                                                }),
                                                createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                                  default: withCtx(() => {
                                                    var _a7, _b5;
                                                    return [
                                                      createVNode(_sfc_main$4$1, {
                                                        name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                        class: ui.value.itemTrailingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemTrailingIcon)] })
                                                      }, null, 8, ["name", "class"])
                                                    ];
                                                  }),
                                                  _: 2
                                                }, 1024)
                                              ], 2)
                                            ];
                                          })
                                        ]),
                                        _: 2
                                      }, 1032, ["class", "disabled", "value", "onSelect"]))
                                    ], 64);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1032, ["class"]);
                            }), 128))
                          ], 2),
                          renderSlot(_ctx.$slots, "content-bottom"),
                          !!__props.arrow ? (openBlock(), createBlock(unref(SelectArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: (_b2 = props.ui) == null ? void 0 : _b2.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }),
                      _: 3
                    }, 16, ["class"])
                  ];
                }),
                _: 3
              }, 16)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Select.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Cadastro de Padre - AcessoCat\xF3lico",
      ogTitle: "Cadastro de Padre - AcessoCat\xF3lico",
      description: "Cadastre-se como padre na plataforma AcessoCat\xF3lico e conecte sua par\xF3quia com fi\xE9is de todo o Brasil.",
      ogDescription: "Cadastre-se como padre na plataforma AcessoCat\xF3lico e conecte sua par\xF3quia com fi\xE9is de todo o Brasil."
    });
    const schema = z.object({
      firstName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
      lastName: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
      email: z.string().email("Email inv\xE1lido"),
      phone: z.string().min(10, "Telefone inv\xE1lido"),
      birthDate: z.string().min(1, "Data de nascimento \xE9 obrigat\xF3ria"),
      cpf: z.string().min(11, "CPF inv\xE1lido"),
      bio: z.string().optional(),
      ordinationNumber: z.string().min(1, "N\xFAmero de ordena\xE7\xE3o \xE9 obrigat\xF3rio"),
      ordinationDate: z.string().min(1, "Data de ordena\xE7\xE3o \xE9 obrigat\xF3ria"),
      ordinationDiocese: z.string().min(1, "Diocese \xE9 obrigat\xF3ria"),
      seminary: z.string().optional(),
      specializations: z.array(z.string()).optional(),
      languages: z.array(z.string()).optional()
    });
    const currentStep = ref(0);
    const loading = ref(false);
    const uploading = ref({
      ordination: false,
      identity: false,
      recommendation: false
    });
    const formData = reactive({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: "",
      cpf: "",
      bio: "",
      ordinationNumber: "",
      ordinationDate: "",
      ordinationDiocese: "",
      seminary: "",
      specializations: [],
      languages: [],
      documents: {
        ordination: null,
        identity: null,
        recommendation: null
      }
    });
    const steps = [
      {
        id: "personal",
        title: "Dados Pessoais",
        description: "Informa\xE7\xF5es b\xE1sicas"
      },
      {
        id: "ecclesiastical",
        title: "Dados Eclesi\xE1sticos",
        description: "Informa\xE7\xF5es do minist\xE9rio"
      },
      {
        id: "documents",
        title: "Documenta\xE7\xE3o",
        description: "Upload de documentos"
      },
      {
        id: "confirmation",
        title: "Confirma\xE7\xE3o",
        description: "Revis\xE3o e envio"
      }
    ];
    const diocesesOptions = [
      { label: "Arquidiocese de S\xE3o Paulo", value: "arquidiocese-sao-paulo" },
      { label: "Arquidiocese do Rio de Janeiro", value: "arquidiocese-rio-janeiro" },
      { label: "Arquidiocese de Bras\xEDlia", value: "arquidiocese-brasilia" }
      // ... more dioceses
    ];
    const specializationOptions = [
      { label: "Teologia Moral", value: "teologia-moral" },
      { label: "Liturgia", value: "liturgia" },
      { label: "Catequese", value: "catequese" },
      { label: "Pastoral Familiar", value: "pastoral-familiar" },
      { label: "Pastoral Jovem", value: "pastoral-jovem" },
      { label: "Direito Can\xF4nico", value: "direito-canonico" }
    ];
    const languageOptions = [
      { label: "Portugu\xEAs", value: "portugues" },
      { label: "Espanhol", value: "espanhol" },
      { label: "Ingl\xEAs", value: "ingles" },
      { label: "Italiano", value: "italiano" },
      { label: "Latim", value: "latim" },
      { label: "Franc\xEAs", value: "frances" }
    ];
    const canProceed = computed(() => {
      switch (currentStep.value) {
        case 0:
          return formData.firstName && formData.lastName && formData.email && formData.phone && formData.birthDate && formData.cpf;
        case 1:
          return formData.ordinationNumber && formData.ordinationDate && formData.ordinationDiocese;
        case 2:
          return formData.documents.ordination && formData.documents.identity;
        default:
          return true;
      }
    });
    const canSubmit = computed(() => {
      return canProceed.value && currentStep.value === steps.length - 1;
    });
    const selectedDiocese = computed(() => {
      return diocesesOptions.find((d) => d.value === formData.ordinationDiocese);
    });
    const form = ref();
    const ordinationInput = ref();
    const identityInput = ref();
    const recommendationInput = ref();
    const nextStep = async () => {
      if (canProceed.value && currentStep.value < steps.length - 1) {
        currentStep.value++;
      }
    };
    const previousStep = () => {
      if (currentStep.value > 0) {
        currentStep.value--;
      }
    };
    const triggerFileUpload = (type) => {
      var _a;
      const inputMap = {
        ordination: ordinationInput.value,
        identity: identityInput.value,
        recommendation: recommendationInput.value
      };
      (_a = inputMap[type]) == null ? void 0 : _a.click();
    };
    const { submitRegistration, uploadDocument } = usePriest();
    const toast = useToast();
    const registrationId = ref(null);
    const handleFileUpload = async (type, event) => {
      var _a;
      const target = event.target;
      const file = (_a = target.files) == null ? void 0 : _a[0];
      if (file && type in uploading.value && type in formData.documents) {
        uploading.value[type] = true;
        try {
          ;
          formData.documents[type] = file;
          toast.add({
            title: "Documento selecionado",
            description: `${file.name} foi selecionado para upload`,
            color: "ui"
          });
        } catch (error) {
          toast.add({
            title: "Erro na sele\xE7\xE3o",
            description: "N\xE3o foi poss\xEDvel selecionar o documento",
            color: "ui"
          });
        } finally {
          uploading.value[type] = false;
        }
      }
    };
    const handleSubmit = async () => {
      loading.value = true;
      try {
        const registrationData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          birthDate: formData.birthDate,
          cpf: formData.cpf,
          bio: formData.bio || void 0,
          ordinationNumber: formData.ordinationNumber,
          ordinationDate: formData.ordinationDate,
          ordinationDiocese: formData.ordinationDiocese,
          seminary: formData.seminary || void 0,
          specializations: formData.specializations.length > 0 ? formData.specializations : void 0,
          languages: formData.languages.length > 0 ? formData.languages : void 0
        };
        const registrationResult = await submitRegistration(registrationData);
        if (registrationResult.success && registrationResult.registrationId) {
          registrationId.value = registrationResult.registrationId;
          const documentUploads = [];
          if (formData.documents.ordination) {
            documentUploads.push(
              uploadDocument(registrationId.value, "ORDINATION_CERTIFICATE", formData.documents.ordination)
            );
          }
          if (formData.documents.identity) {
            documentUploads.push(
              uploadDocument(registrationId.value, "IDENTITY_DOCUMENT", formData.documents.identity)
            );
          }
          if (formData.documents.recommendation) {
            documentUploads.push(
              uploadDocument(registrationId.value, "RECOMMENDATION_LETTER", formData.documents.recommendation)
            );
          }
          if (documentUploads.length > 0) {
            try {
              await Promise.all(documentUploads);
              console.log("All documents uploaded successfully");
            } catch (uploadError) {
              console.warn("Some documents failed to upload:", uploadError);
            }
          }
          toast.add({
            title: "Cadastro enviado com sucesso!",
            description: registrationResult.message,
            color: "primary"
          });
          await navigateTo("/cadastro/padre/sucesso");
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.add({
          title: "Erro no cadastro",
          description: error.message || "Ocorreu um erro ao processar seu cadastro. Tente novamente.",
          color: "ui"
        });
      } finally {
        loading.value = false;
      }
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("pt-BR");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_UForm = _sfc_main$2;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_UInput = _sfc_main$3;
      const _component_UTextarea = _sfc_main$4;
      const _component_USelect = _sfc_main$1;
      const _component_USelectMenu = _sfc_main$5;
      const _component_UButton = _sfc_main$6;
      const _component_UAlert = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "priest-registration" }, _attrs))} data-v-5fe63452><div class="registration-container" data-v-5fe63452><div class="registration-header" data-v-5fe63452><div class="header-content" data-v-5fe63452>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:academic-cap",
        class: "header-icon"
      }, null, _parent));
      _push(`<h1 class="header-title" data-v-5fe63452>Cadastro de Padre</h1><p class="header-description" data-v-5fe63452> Junte-se \xE0 nossa plataforma e conecte sua par\xF3quia com fi\xE9is de todo o Brasil </p></div></div><div class="registration-form" data-v-5fe63452>`);
      _push(ssrRenderComponent(_component_UForm, {
        ref_key: "form",
        ref: form,
        schema: unref(schema),
        state: unref(formData),
        onSubmit: handleSubmit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="step-indicator" data-v-5fe63452${_scopeId}><!--[-->`);
            ssrRenderList(steps, (step, index2) => {
              _push2(`<div class="${ssrRenderClass(["step-item", {
                "active": unref(currentStep) === index2,
                "completed": index2 < unref(currentStep)
              }])}" data-v-5fe63452${_scopeId}><div class="step-number" data-v-5fe63452${_scopeId}>${ssrInterpolate(index2 + 1)}</div><div class="step-info" data-v-5fe63452${_scopeId}><div class="step-title" data-v-5fe63452${_scopeId}>${ssrInterpolate(step.title)}</div><div class="step-description" data-v-5fe63452${_scopeId}>${ssrInterpolate(step.description)}</div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (unref(currentStep) === 0) {
              _push2(`<div class="form-step" data-v-5fe63452${_scopeId}><h2 class="step-title" data-v-5fe63452${_scopeId}>Informa\xE7\xF5es Pessoais</h2><div class="form-grid" data-v-5fe63452${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Nome Completo",
                name: "firstName",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).firstName,
                      "onUpdate:modelValue": ($event) => unref(formData).firstName = $event,
                      placeholder: "Padre Jo\xE3o",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).firstName,
                        "onUpdate:modelValue": ($event) => unref(formData).firstName = $event,
                        placeholder: "Padre Jo\xE3o",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Sobrenome",
                name: "lastName",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).lastName,
                      "onUpdate:modelValue": ($event) => unref(formData).lastName = $event,
                      placeholder: "Silva",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).lastName,
                        "onUpdate:modelValue": ($event) => unref(formData).lastName = $event,
                        placeholder: "Silva",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Email",
                name: "email",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).email,
                      "onUpdate:modelValue": ($event) => unref(formData).email = $event,
                      type: "email",
                      placeholder: "padre@paroquia.com.br",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).email,
                        "onUpdate:modelValue": ($event) => unref(formData).email = $event,
                        type: "email",
                        placeholder: "padre@paroquia.com.br",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Telefone",
                name: "phone",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).phone,
                      "onUpdate:modelValue": ($event) => unref(formData).phone = $event,
                      placeholder: "(11) 99999-9999",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).phone,
                        "onUpdate:modelValue": ($event) => unref(formData).phone = $event,
                        placeholder: "(11) 99999-9999",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Data de Nascimento",
                name: "birthDate",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).birthDate,
                      "onUpdate:modelValue": ($event) => unref(formData).birthDate = $event,
                      type: "date",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).birthDate,
                        "onUpdate:modelValue": ($event) => unref(formData).birthDate = $event,
                        type: "date",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "CPF",
                name: "cpf",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).cpf,
                      "onUpdate:modelValue": ($event) => unref(formData).cpf = $event,
                      placeholder: "000.000.000-00",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).cpf,
                        "onUpdate:modelValue": ($event) => unref(formData).cpf = $event,
                        placeholder: "000.000.000-00",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Biografia (opcional)",
                name: "bio"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UTextarea, {
                      modelValue: unref(formData).bio,
                      "onUpdate:modelValue": ($event) => unref(formData).bio = $event,
                      placeholder: "Conte um pouco sobre sua trajet\xF3ria e minist\xE9rio...",
                      rows: 4,
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UTextarea, {
                        modelValue: unref(formData).bio,
                        "onUpdate:modelValue": ($event) => unref(formData).bio = $event,
                        placeholder: "Conte um pouco sobre sua trajet\xF3ria e minist\xE9rio...",
                        rows: 4,
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(currentStep) === 1) {
              _push2(`<div class="form-step" data-v-5fe63452${_scopeId}><h2 class="step-title" data-v-5fe63452${_scopeId}>Informa\xE7\xF5es Eclesi\xE1sticas</h2><div class="form-grid" data-v-5fe63452${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "N\xFAmero de Ordena\xE7\xE3o",
                name: "ordinationNumber",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).ordinationNumber,
                      "onUpdate:modelValue": ($event) => unref(formData).ordinationNumber = $event,
                      placeholder: "000123",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).ordinationNumber,
                        "onUpdate:modelValue": ($event) => unref(formData).ordinationNumber = $event,
                        placeholder: "000123",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Data de Ordena\xE7\xE3o",
                name: "ordinationDate",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).ordinationDate,
                      "onUpdate:modelValue": ($event) => unref(formData).ordinationDate = $event,
                      type: "date",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).ordinationDate,
                        "onUpdate:modelValue": ($event) => unref(formData).ordinationDate = $event,
                        type: "date",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Diocese de Ordena\xE7\xE3o",
                name: "ordinationDiocese",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_USelect, {
                      modelValue: unref(formData).ordinationDiocese,
                      "onUpdate:modelValue": ($event) => unref(formData).ordinationDiocese = $event,
                      options: diocesesOptions,
                      placeholder: "Selecione a diocese",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_USelect, {
                        modelValue: unref(formData).ordinationDiocese,
                        "onUpdate:modelValue": ($event) => unref(formData).ordinationDiocese = $event,
                        options: diocesesOptions,
                        placeholder: "Selecione a diocese",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Semin\xE1rio",
                name: "seminary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).seminary,
                      "onUpdate:modelValue": ($event) => unref(formData).seminary = $event,
                      placeholder: "Nome do semin\xE1rio",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).seminary,
                        "onUpdate:modelValue": ($event) => unref(formData).seminary = $event,
                        placeholder: "Nome do semin\xE1rio",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Especializa\xE7\xF5es",
                name: "specializations"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_USelectMenu, {
                      modelValue: unref(formData).specializations,
                      "onUpdate:modelValue": ($event) => unref(formData).specializations = $event,
                      options: specializationOptions,
                      multiple: "",
                      placeholder: "Selecione suas especializa\xE7\xF5es",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_USelectMenu, {
                        modelValue: unref(formData).specializations,
                        "onUpdate:modelValue": ($event) => unref(formData).specializations = $event,
                        options: specializationOptions,
                        multiple: "",
                        placeholder: "Selecione suas especializa\xE7\xF5es",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Idiomas",
                name: "languages"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_USelectMenu, {
                      modelValue: unref(formData).languages,
                      "onUpdate:modelValue": ($event) => unref(formData).languages = $event,
                      options: languageOptions,
                      multiple: "",
                      placeholder: "Idiomas que fala",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_USelectMenu, {
                        modelValue: unref(formData).languages,
                        "onUpdate:modelValue": ($event) => unref(formData).languages = $event,
                        options: languageOptions,
                        multiple: "",
                        placeholder: "Idiomas que fala",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(currentStep) === 2) {
              _push2(`<div class="form-step" data-v-5fe63452${_scopeId}><h2 class="step-title" data-v-5fe63452${_scopeId}>Documenta\xE7\xE3o Necess\xE1ria</h2><div class="documents-section" data-v-5fe63452${_scopeId}><div class="document-item" data-v-5fe63452${_scopeId}><div class="document-info" data-v-5fe63452${_scopeId}><h3 class="document-title" data-v-5fe63452${_scopeId}>Certid\xE3o de Ordena\xE7\xE3o</h3><p class="document-description" data-v-5fe63452${_scopeId}> Documento oficial que comprova sua ordena\xE7\xE3o sacerdotal </p></div><div class="document-upload" data-v-5fe63452${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: ($event) => triggerFileUpload("ordination"),
                variant: "outline",
                loading: unref(uploading).ordination,
                disabled: unref(loading)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, { name: "heroicons:cloud-arrow-up" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(unref(formData).documents.ordination ? "Alterar" : "Upload")}`);
                  } else {
                    return [
                      createVNode(_component_Icon, { name: "heroicons:cloud-arrow-up" }),
                      createTextVNode(" " + toDisplayString(unref(formData).documents.ordination ? "Alterar" : "Upload"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<input type="file" accept=".pdf,.jpg,.jpeg,.png" style="${ssrRenderStyle({ "display": "none" })}" data-v-5fe63452${_scopeId}>`);
              if (unref(formData).documents.ordination) {
                _push2(`<span class="file-name" data-v-5fe63452${_scopeId}>${ssrInterpolate(unref(formData).documents.ordination.name)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="document-item" data-v-5fe63452${_scopeId}><div class="document-info" data-v-5fe63452${_scopeId}><h3 class="document-title" data-v-5fe63452${_scopeId}>Documento de Identidade</h3><p class="document-description" data-v-5fe63452${_scopeId}> RG ou CNH para verifica\xE7\xE3o de identidade </p></div><div class="document-upload" data-v-5fe63452${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: ($event) => triggerFileUpload("identity"),
                variant: "outline",
                loading: unref(uploading).identity,
                disabled: unref(loading)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, { name: "heroicons:cloud-arrow-up" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(unref(formData).documents.identity ? "Alterar" : "Upload")}`);
                  } else {
                    return [
                      createVNode(_component_Icon, { name: "heroicons:cloud-arrow-up" }),
                      createTextVNode(" " + toDisplayString(unref(formData).documents.identity ? "Alterar" : "Upload"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<input type="file" accept=".pdf,.jpg,.jpeg,.png" style="${ssrRenderStyle({ "display": "none" })}" data-v-5fe63452${_scopeId}>`);
              if (unref(formData).documents.identity) {
                _push2(`<span class="file-name" data-v-5fe63452${_scopeId}>${ssrInterpolate(unref(formData).documents.identity.name)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="document-item" data-v-5fe63452${_scopeId}><div class="document-info" data-v-5fe63452${_scopeId}><h3 class="document-title" data-v-5fe63452${_scopeId}>Carta de Apresenta\xE7\xE3o (opcional)</h3><p class="document-description" data-v-5fe63452${_scopeId}> Carta do bispo ou superior eclesi\xE1stico </p></div><div class="document-upload" data-v-5fe63452${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: ($event) => triggerFileUpload("recommendation"),
                variant: "outline",
                loading: unref(uploading).recommendation,
                disabled: unref(loading)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, { name: "heroicons:cloud-arrow-up" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(unref(formData).documents.recommendation ? "Alterar" : "Upload")}`);
                  } else {
                    return [
                      createVNode(_component_Icon, { name: "heroicons:cloud-arrow-up" }),
                      createTextVNode(" " + toDisplayString(unref(formData).documents.recommendation ? "Alterar" : "Upload"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<input type="file" accept=".pdf,.jpg,.jpeg,.png" style="${ssrRenderStyle({ "display": "none" })}" data-v-5fe63452${_scopeId}>`);
              if (unref(formData).documents.recommendation) {
                _push2(`<span class="file-name" data-v-5fe63452${_scopeId}>${ssrInterpolate(unref(formData).documents.recommendation.name)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(currentStep) === 3) {
              _push2(`<div class="form-step" data-v-5fe63452${_scopeId}><h2 class="step-title" data-v-5fe63452${_scopeId}>Confirma\xE7\xE3o de Dados</h2><div class="confirmation-section" data-v-5fe63452${_scopeId}><div class="confirmation-item" data-v-5fe63452${_scopeId}><h3 data-v-5fe63452${_scopeId}>Informa\xE7\xF5es Pessoais</h3><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Nome:</strong> ${ssrInterpolate(unref(formData).firstName)} ${ssrInterpolate(unref(formData).lastName)}</p><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Email:</strong> ${ssrInterpolate(unref(formData).email)}</p><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Telefone:</strong> ${ssrInterpolate(unref(formData).phone)}</p></div><div class="confirmation-item" data-v-5fe63452${_scopeId}><h3 data-v-5fe63452${_scopeId}>Informa\xE7\xF5es Eclesi\xE1sticas</h3><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Ordena\xE7\xE3o:</strong> ${ssrInterpolate(unref(formData).ordinationNumber)}</p><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Data:</strong> ${ssrInterpolate(formatDate(unref(formData).ordinationDate))}</p><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Diocese:</strong> ${ssrInterpolate((_a = unref(selectedDiocese)) == null ? void 0 : _a.label)}</p></div><div class="confirmation-item" data-v-5fe63452${_scopeId}><h3 data-v-5fe63452${_scopeId}>Documentos</h3><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Certid\xE3o de Ordena\xE7\xE3o:</strong> ${ssrInterpolate(unref(formData).documents.ordination ? "\u2705 Enviado" : "\u274C N\xE3o enviado")}</p><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Documento de Identidade:</strong> ${ssrInterpolate(unref(formData).documents.identity ? "\u2705 Enviado" : "\u274C N\xE3o enviado")}</p><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Carta de Apresenta\xE7\xE3o:</strong> ${ssrInterpolate(unref(formData).documents.recommendation ? "\u2705 Enviado" : "\u2796 Opcional")}</p></div>`);
              _push2(ssrRenderComponent(_component_UAlert, {
                icon: "heroicons:information-circle",
                color: "blue",
                variant: "soft",
                title: "Processo de Aprova\xE7\xE3o",
                description: "Ap\xF3s o envio, seus dados ser\xE3o analisados pela equipe de modera\xE7\xE3o. Voc\xEA receber\xE1 um email com o resultado em at\xE9 5 dias \xFAteis."
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="form-actions" data-v-5fe63452${_scopeId}>`);
            if (unref(currentStep) > 0) {
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: previousStep,
                variant: "outline",
                disabled: unref(loading)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, { name: "heroicons:arrow-left" }, null, _parent3, _scopeId2));
                    _push3(` Anterior `);
                  } else {
                    return [
                      createVNode(_component_Icon, { name: "heroicons:arrow-left" }),
                      createTextVNode(" Anterior ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="actions-right" data-v-5fe63452${_scopeId}>`);
            if (unref(currentStep) < steps.length - 1) {
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: nextStep,
                disabled: !unref(canProceed),
                loading: unref(loading)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Pr\xF3ximo `);
                    _push3(ssrRenderComponent(_component_Icon, { name: "heroicons:arrow-right" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createTextVNode(" Pr\xF3ximo "),
                      createVNode(_component_Icon, { name: "heroicons:arrow-right" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_UButton, {
                type: "submit",
                disabled: !unref(canSubmit),
                loading: unref(loading),
                color: "green"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, { name: "heroicons:check" }, null, _parent3, _scopeId2));
                    _push3(` Enviar Cadastro `);
                  } else {
                    return [
                      createVNode(_component_Icon, { name: "heroicons:check" }),
                      createTextVNode(" Enviar Cadastro ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "step-indicator" }, [
                (openBlock(), createBlock(Fragment, null, renderList(steps, (step, index2) => {
                  return createVNode("div", {
                    key: step.id,
                    class: ["step-item", {
                      "active": unref(currentStep) === index2,
                      "completed": index2 < unref(currentStep)
                    }]
                  }, [
                    createVNode("div", { class: "step-number" }, toDisplayString(index2 + 1), 1),
                    createVNode("div", { class: "step-info" }, [
                      createVNode("div", { class: "step-title" }, toDisplayString(step.title), 1),
                      createVNode("div", { class: "step-description" }, toDisplayString(step.description), 1)
                    ])
                  ], 2);
                }), 64))
              ]),
              unref(currentStep) === 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "form-step"
              }, [
                createVNode("h2", { class: "step-title" }, "Informa\xE7\xF5es Pessoais"),
                createVNode("div", { class: "form-grid" }, [
                  createVNode(_component_UFormGroup, {
                    label: "Nome Completo",
                    name: "firstName",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).firstName,
                        "onUpdate:modelValue": ($event) => unref(formData).firstName = $event,
                        placeholder: "Padre Jo\xE3o",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Sobrenome",
                    name: "lastName",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).lastName,
                        "onUpdate:modelValue": ($event) => unref(formData).lastName = $event,
                        placeholder: "Silva",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Email",
                    name: "email",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).email,
                        "onUpdate:modelValue": ($event) => unref(formData).email = $event,
                        type: "email",
                        placeholder: "padre@paroquia.com.br",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Telefone",
                    name: "phone",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).phone,
                        "onUpdate:modelValue": ($event) => unref(formData).phone = $event,
                        placeholder: "(11) 99999-9999",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Data de Nascimento",
                    name: "birthDate",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).birthDate,
                        "onUpdate:modelValue": ($event) => unref(formData).birthDate = $event,
                        type: "date",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "CPF",
                    name: "cpf",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).cpf,
                        "onUpdate:modelValue": ($event) => unref(formData).cpf = $event,
                        placeholder: "000.000.000-00",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  })
                ]),
                createVNode(_component_UFormGroup, {
                  label: "Biografia (opcional)",
                  name: "bio"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UTextarea, {
                      modelValue: unref(formData).bio,
                      "onUpdate:modelValue": ($event) => unref(formData).bio = $event,
                      placeholder: "Conte um pouco sobre sua trajet\xF3ria e minist\xE9rio...",
                      rows: 4,
                      disabled: unref(loading)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true),
              unref(currentStep) === 1 ? (openBlock(), createBlock("div", {
                key: 1,
                class: "form-step"
              }, [
                createVNode("h2", { class: "step-title" }, "Informa\xE7\xF5es Eclesi\xE1sticas"),
                createVNode("div", { class: "form-grid" }, [
                  createVNode(_component_UFormGroup, {
                    label: "N\xFAmero de Ordena\xE7\xE3o",
                    name: "ordinationNumber",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).ordinationNumber,
                        "onUpdate:modelValue": ($event) => unref(formData).ordinationNumber = $event,
                        placeholder: "000123",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Data de Ordena\xE7\xE3o",
                    name: "ordinationDate",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).ordinationDate,
                        "onUpdate:modelValue": ($event) => unref(formData).ordinationDate = $event,
                        type: "date",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Diocese de Ordena\xE7\xE3o",
                    name: "ordinationDiocese",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_USelect, {
                        modelValue: unref(formData).ordinationDiocese,
                        "onUpdate:modelValue": ($event) => unref(formData).ordinationDiocese = $event,
                        options: diocesesOptions,
                        placeholder: "Selecione a diocese",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Semin\xE1rio",
                    name: "seminary"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).seminary,
                        "onUpdate:modelValue": ($event) => unref(formData).seminary = $event,
                        placeholder: "Nome do semin\xE1rio",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Especializa\xE7\xF5es",
                    name: "specializations"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_USelectMenu, {
                        modelValue: unref(formData).specializations,
                        "onUpdate:modelValue": ($event) => unref(formData).specializations = $event,
                        options: specializationOptions,
                        multiple: "",
                        placeholder: "Selecione suas especializa\xE7\xF5es",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Idiomas",
                    name: "languages"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_USelectMenu, {
                        modelValue: unref(formData).languages,
                        "onUpdate:modelValue": ($event) => unref(formData).languages = $event,
                        options: languageOptions,
                        multiple: "",
                        placeholder: "Idiomas que fala",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  })
                ])
              ])) : createCommentVNode("", true),
              unref(currentStep) === 2 ? (openBlock(), createBlock("div", {
                key: 2,
                class: "form-step"
              }, [
                createVNode("h2", { class: "step-title" }, "Documenta\xE7\xE3o Necess\xE1ria"),
                createVNode("div", { class: "documents-section" }, [
                  createVNode("div", { class: "document-item" }, [
                    createVNode("div", { class: "document-info" }, [
                      createVNode("h3", { class: "document-title" }, "Certid\xE3o de Ordena\xE7\xE3o"),
                      createVNode("p", { class: "document-description" }, " Documento oficial que comprova sua ordena\xE7\xE3o sacerdotal ")
                    ]),
                    createVNode("div", { class: "document-upload" }, [
                      createVNode(_component_UButton, {
                        onClick: ($event) => triggerFileUpload("ordination"),
                        variant: "outline",
                        loading: unref(uploading).ordination,
                        disabled: unref(loading)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, { name: "heroicons:cloud-arrow-up" }),
                          createTextVNode(" " + toDisplayString(unref(formData).documents.ordination ? "Alterar" : "Upload"), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick", "loading", "disabled"]),
                      createVNode("input", {
                        ref_key: "ordinationInput",
                        ref: ordinationInput,
                        type: "file",
                        accept: ".pdf,.jpg,.jpeg,.png",
                        style: { "display": "none" },
                        onChange: ($event) => handleFileUpload("ordination", $event)
                      }, null, 40, ["onChange"]),
                      unref(formData).documents.ordination ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "file-name"
                      }, toDisplayString(unref(formData).documents.ordination.name), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "document-item" }, [
                    createVNode("div", { class: "document-info" }, [
                      createVNode("h3", { class: "document-title" }, "Documento de Identidade"),
                      createVNode("p", { class: "document-description" }, " RG ou CNH para verifica\xE7\xE3o de identidade ")
                    ]),
                    createVNode("div", { class: "document-upload" }, [
                      createVNode(_component_UButton, {
                        onClick: ($event) => triggerFileUpload("identity"),
                        variant: "outline",
                        loading: unref(uploading).identity,
                        disabled: unref(loading)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, { name: "heroicons:cloud-arrow-up" }),
                          createTextVNode(" " + toDisplayString(unref(formData).documents.identity ? "Alterar" : "Upload"), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick", "loading", "disabled"]),
                      createVNode("input", {
                        ref_key: "identityInput",
                        ref: identityInput,
                        type: "file",
                        accept: ".pdf,.jpg,.jpeg,.png",
                        style: { "display": "none" },
                        onChange: ($event) => handleFileUpload("identity", $event)
                      }, null, 40, ["onChange"]),
                      unref(formData).documents.identity ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "file-name"
                      }, toDisplayString(unref(formData).documents.identity.name), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "document-item" }, [
                    createVNode("div", { class: "document-info" }, [
                      createVNode("h3", { class: "document-title" }, "Carta de Apresenta\xE7\xE3o (opcional)"),
                      createVNode("p", { class: "document-description" }, " Carta do bispo ou superior eclesi\xE1stico ")
                    ]),
                    createVNode("div", { class: "document-upload" }, [
                      createVNode(_component_UButton, {
                        onClick: ($event) => triggerFileUpload("recommendation"),
                        variant: "outline",
                        loading: unref(uploading).recommendation,
                        disabled: unref(loading)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, { name: "heroicons:cloud-arrow-up" }),
                          createTextVNode(" " + toDisplayString(unref(formData).documents.recommendation ? "Alterar" : "Upload"), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick", "loading", "disabled"]),
                      createVNode("input", {
                        ref_key: "recommendationInput",
                        ref: recommendationInput,
                        type: "file",
                        accept: ".pdf,.jpg,.jpeg,.png",
                        style: { "display": "none" },
                        onChange: ($event) => handleFileUpload("recommendation", $event)
                      }, null, 40, ["onChange"]),
                      unref(formData).documents.recommendation ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "file-name"
                      }, toDisplayString(unref(formData).documents.recommendation.name), 1)) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ])) : createCommentVNode("", true),
              unref(currentStep) === 3 ? (openBlock(), createBlock("div", {
                key: 3,
                class: "form-step"
              }, [
                createVNode("h2", { class: "step-title" }, "Confirma\xE7\xE3o de Dados"),
                createVNode("div", { class: "confirmation-section" }, [
                  createVNode("div", { class: "confirmation-item" }, [
                    createVNode("h3", null, "Informa\xE7\xF5es Pessoais"),
                    createVNode("p", null, [
                      createVNode("strong", null, "Nome:"),
                      createTextVNode(" " + toDisplayString(unref(formData).firstName) + " " + toDisplayString(unref(formData).lastName), 1)
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Email:"),
                      createTextVNode(" " + toDisplayString(unref(formData).email), 1)
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Telefone:"),
                      createTextVNode(" " + toDisplayString(unref(formData).phone), 1)
                    ])
                  ]),
                  createVNode("div", { class: "confirmation-item" }, [
                    createVNode("h3", null, "Informa\xE7\xF5es Eclesi\xE1sticas"),
                    createVNode("p", null, [
                      createVNode("strong", null, "Ordena\xE7\xE3o:"),
                      createTextVNode(" " + toDisplayString(unref(formData).ordinationNumber), 1)
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Data:"),
                      createTextVNode(" " + toDisplayString(formatDate(unref(formData).ordinationDate)), 1)
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Diocese:"),
                      createTextVNode(" " + toDisplayString((_b = unref(selectedDiocese)) == null ? void 0 : _b.label), 1)
                    ])
                  ]),
                  createVNode("div", { class: "confirmation-item" }, [
                    createVNode("h3", null, "Documentos"),
                    createVNode("p", null, [
                      createVNode("strong", null, "Certid\xE3o de Ordena\xE7\xE3o:"),
                      createTextVNode(" " + toDisplayString(unref(formData).documents.ordination ? "\u2705 Enviado" : "\u274C N\xE3o enviado"), 1)
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Documento de Identidade:"),
                      createTextVNode(" " + toDisplayString(unref(formData).documents.identity ? "\u2705 Enviado" : "\u274C N\xE3o enviado"), 1)
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Carta de Apresenta\xE7\xE3o:"),
                      createTextVNode(" " + toDisplayString(unref(formData).documents.recommendation ? "\u2705 Enviado" : "\u2796 Opcional"), 1)
                    ])
                  ]),
                  createVNode(_component_UAlert, {
                    icon: "heroicons:information-circle",
                    color: "blue",
                    variant: "soft",
                    title: "Processo de Aprova\xE7\xE3o",
                    description: "Ap\xF3s o envio, seus dados ser\xE3o analisados pela equipe de modera\xE7\xE3o. Voc\xEA receber\xE1 um email com o resultado em at\xE9 5 dias \xFAteis."
                  })
                ])
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "form-actions" }, [
                unref(currentStep) > 0 ? (openBlock(), createBlock(_component_UButton, {
                  key: 0,
                  onClick: previousStep,
                  variant: "outline",
                  disabled: unref(loading)
                }, {
                  default: withCtx(() => [
                    createVNode(_component_Icon, { name: "heroicons:arrow-left" }),
                    createTextVNode(" Anterior ")
                  ]),
                  _: 1
                }, 8, ["disabled"])) : createCommentVNode("", true),
                createVNode("div", { class: "actions-right" }, [
                  unref(currentStep) < steps.length - 1 ? (openBlock(), createBlock(_component_UButton, {
                    key: 0,
                    onClick: nextStep,
                    disabled: !unref(canProceed),
                    loading: unref(loading)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Pr\xF3ximo "),
                      createVNode(_component_Icon, { name: "heroicons:arrow-right" })
                    ]),
                    _: 1
                  }, 8, ["disabled", "loading"])) : (openBlock(), createBlock(_component_UButton, {
                    key: 1,
                    type: "submit",
                    disabled: !unref(canSubmit),
                    loading: unref(loading),
                    color: "green"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "heroicons:check" }),
                      createTextVNode(" Enviar Cadastro ")
                    ]),
                    _: 1
                  }, 8, ["disabled", "loading"]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cadastro/padre/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5fe63452"]]);

export { index as default };
//# sourceMappingURL=index-9TLcawry.mjs.map
