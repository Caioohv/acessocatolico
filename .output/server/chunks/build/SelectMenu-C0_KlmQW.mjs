import { mergeModels, useSlots, useModel, toRef, computed, unref, withCtx, createVNode, renderSlot, createTextVNode, toDisplayString, withModifiers, mergeProps, createBlock, createCommentVNode, openBlock, Fragment, renderList, toRaw, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { useFilter, useForwardPropsEmits, ComboboxGroup, ComboboxItem, ComboboxRoot, ComboboxAnchor, ComboboxTrigger, ComboboxPortal, ComboboxContent, FocusScope, ComboboxInput, ComboboxEmpty, ComboboxLabel, ComboboxSeparator, ComboboxItemIndicator, ComboboxArrow } from 'reka-ui';
import { K as defu } from '../nitro/nitro.mjs';
import { reactivePick, createReusableTemplate } from '@vueuse/core';
import { u as useFormField, e as useButtonGroup, g as useComponentIcons, t as tv, j as isArrayOfArray, i as get, k as compare, _ as _sfc_main$4, h as _sfc_main$3 } from './Button-BeuMp5nt.mjs';
import { u as useLocale } from './useLocale-CtluvDKB.mjs';
import { u as usePortal } from './usePortal-BbZPQQY_.mjs';
import { _ as _sfc_main$2 } from './Chip-DwZPpwbq.mjs';
import { _ as _sfc_main$1 } from './Input-CMCaI9pM.mjs';
import { i as useAppConfig } from './server.mjs';

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
    "content": [
      "max-h-60 w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
      "origin-(--reka-combobox-content-transform-origin) w-(--reka-combobox-trigger-width)"
    ],
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
    "itemLabel": "truncate",
    "input": "border-b border-default",
    "focusScope": "flex flex-col min-h-0"
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
const _sfc_main = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "SelectMenu",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    id: { type: String, required: false },
    placeholder: { type: String, required: false },
    searchInput: { type: [Boolean, Object], required: false, default: true },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    trailingIcon: { type: String, required: false },
    selectedIcon: { type: String, required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    valueKey: { type: null, required: false },
    labelKey: { type: null, required: false, default: "label" },
    items: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    multiple: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    createItem: { type: [Boolean, String, Object], required: false },
    filterFields: { type: Array, required: false },
    ignoreFilter: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    name: { type: String, required: false },
    resetSearchTermOnBlur: { type: Boolean, required: false, default: true },
    resetSearchTermOnSelect: { type: Boolean, required: false, default: true },
    highlightOnHover: { type: Boolean, required: false },
    icon: { type: String, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: String, required: false },
    trailing: { type: Boolean, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: String, required: false }
  }, {
    "searchTerm": { type: String, ...{ default: "" } },
    "searchTermModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["update:open", "change", "blur", "focus", "create", "highlight", "update:modelValue"], ["update:searchTerm"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const searchTerm = useModel(__props, "searchTerm", { type: String, ...{ default: "" } });
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const { contains } = useFilter({ sensitivity: "base" });
    const rootProps = useForwardPropsEmits(reactivePick(props, "modelValue", "defaultValue", "open", "defaultOpen", "required", "multiple", "resetSearchTermOnBlur", "resetSearchTermOnSelect", "highlightOnHover"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: "popper" }));
    const arrowProps = toRef(() => props.arrow);
    const searchInputProps = toRef(() => defu(props.searchInput, { placeholder: t("selectMenu.search"), variant: "none" }));
    const { emitFormBlur, emitFormFocus, emitFormInput, emitFormChange, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField(props);
    const { orientation, size: buttonGroupSize } = useButtonGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: appConfig.ui.icons.chevronDown })));
    const selectSize = computed(() => buttonGroupSize.value || formGroupSize.value);
    const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate();
    const ui = computed(() => {
      var _a;
      return tv({ extend: tv(theme), ...((_a = appConfig.ui) == null ? void 0 : _a.selectMenu) || {} })({
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
    function displayValue(value) {
      if (props.multiple && Array.isArray(value)) {
        return value.map((v) => displayValue(v)).filter(Boolean).join(", ");
      }
      if (!props.valueKey) {
        return value && (typeof value === "object" ? get(value, props.labelKey) : value);
      }
      const item = items.value.find((item2) => compare(typeof item2 === "object" ? get(item2, props.valueKey) : item2, value));
      return item && (typeof item === "object" ? get(item, props.labelKey) : item);
    }
    const groups = computed(
      () => {
        var _a;
        return ((_a = props.items) == null ? void 0 : _a.length) ? isArrayOfArray(props.items) ? props.items : [props.items] : [];
      }
    );
    const items = computed(() => groups.value.flatMap((group) => group));
    const filteredGroups = computed(() => {
      if (props.ignoreFilter || !searchTerm.value) {
        return groups.value;
      }
      const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey];
      return groups.value.map((items2) => items2.filter((item) => {
        if (typeof item !== "object" || item === null) {
          return contains(String(item), searchTerm.value);
        }
        if (item.type && ["label", "separator"].includes(item.type)) {
          return true;
        }
        return fields.some((field) => contains(get(item, field), searchTerm.value));
      })).filter((group) => group.filter(
        (item) => !isSelectItem(item) || (!item.type || !["label", "separator"].includes(item.type))
      ).length > 0);
    });
    const filteredItems = computed(() => filteredGroups.value.flatMap((group) => group));
    const createItem = computed(() => {
      if (!props.createItem || !searchTerm.value) {
        return false;
      }
      const newItem = props.valueKey ? { [props.valueKey]: searchTerm.value } : searchTerm.value;
      if (typeof props.createItem === "object" && props.createItem.when === "always" || props.createItem === "always") {
        return !filteredItems.value.find((item) => compare(item, newItem, props.valueKey));
      }
      return !filteredItems.value.length;
    });
    const createItemPosition = computed(() => typeof props.createItem === "object" ? props.createItem.position : "bottom");
    function onUpdate(value) {
      if (toRaw(props.modelValue) === value) {
        return;
      }
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
      if (props.resetSearchTermOnSelect) {
        searchTerm.value = "";
      }
    }
    function onUpdateOpen(value) {
      let timeoutId;
      if (!value) {
        const event = new FocusEvent("blur");
        emits("blur", event);
        emitFormBlur();
        if (props.resetSearchTermOnBlur) {
          const STATE_ANIMATION_DELAY_MS = 100;
          timeoutId = setTimeout(() => {
            searchTerm.value = "";
          }, STATE_ANIMATION_DELAY_MS);
        }
      } else {
        const event = new FocusEvent("focus");
        emits("focus", event);
        emitFormFocus();
        clearTimeout(timeoutId);
      }
    }
    function onSelect(e, item) {
      var _a;
      if (!isSelectItem(item)) {
        return;
      }
      if (item.disabled) {
        e.preventDefault();
        return;
      }
      (_a = item.onSelect) == null ? void 0 : _a.call(item, e);
    }
    function isSelectItem(item) {
      return typeof item === "object" && item !== null;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(DefineCreateItemTemplate), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(ComboboxGroup), {
              class: ui.value.group({ class: (_a = props.ui) == null ? void 0 : _a.group })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ComboboxItem), {
                    class: ui.value.item({ class: (_a2 = props.ui) == null ? void 0 : _a2.item }),
                    value: searchTerm.value,
                    onSelect: ($event) => emits("create", searchTerm.value)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a3, _b3;
                      if (_push4) {
                        _push4(`<span class="${ssrRenderClass(ui.value.itemLabel({ class: (_a3 = props.ui) == null ? void 0 : _a3.itemLabel }))}"${_scopeId3}>`);
                        ssrRenderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => {
                          _push4(`${ssrInterpolate(unref(t)("selectMenu.create", { label: searchTerm.value }))}`);
                        }, _push4, _parent4, _scopeId3);
                        _push4(`</span>`);
                      } else {
                        return [
                          createVNode("span", {
                            class: ui.value.itemLabel({ class: (_b3 = props.ui) == null ? void 0 : _b3.itemLabel })
                          }, [
                            renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [
                              createTextVNode(toDisplayString(unref(t)("selectMenu.create", { label: searchTerm.value })), 1)
                            ])
                          ], 2)
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ComboboxItem), {
                      class: ui.value.item({ class: (_b2 = props.ui) == null ? void 0 : _b2.item }),
                      value: searchTerm.value,
                      onSelect: withModifiers(($event) => emits("create", searchTerm.value), ["prevent"])
                    }, {
                      default: withCtx(() => {
                        var _a3;
                        return [
                          createVNode("span", {
                            class: ui.value.itemLabel({ class: (_a3 = props.ui) == null ? void 0 : _a3.itemLabel })
                          }, [
                            renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [
                              createTextVNode(toDisplayString(unref(t)("selectMenu.create", { label: searchTerm.value })), 1)
                            ])
                          ], 2)
                        ];
                      }),
                      _: 3
                    }, 8, ["class", "value", "onSelect"])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ComboboxGroup), {
                class: ui.value.group({ class: (_b = props.ui) == null ? void 0 : _b.group })
              }, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createVNode(unref(ComboboxItem), {
                      class: ui.value.item({ class: (_a2 = props.ui) == null ? void 0 : _a2.item }),
                      value: searchTerm.value,
                      onSelect: withModifiers(($event) => emits("create", searchTerm.value), ["prevent"])
                    }, {
                      default: withCtx(() => {
                        var _a3;
                        return [
                          createVNode("span", {
                            class: ui.value.itemLabel({ class: (_a3 = props.ui) == null ? void 0 : _a3.itemLabel })
                          }, [
                            renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [
                              createTextVNode(toDisplayString(unref(t)("selectMenu.create", { label: searchTerm.value })), 1)
                            ])
                          ], 2)
                        ];
                      }),
                      _: 3
                    }, 8, ["class", "value", "onSelect"])
                  ];
                }),
                _: 3
              }, 8, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(unref(ComboboxRoot), mergeProps({ id: unref(id) }, { ...unref(rootProps), ..._ctx.$attrs, ...unref(ariaAttrs) }, {
        "ignore-filter": "",
        "as-child": "",
        name: unref(name),
        disabled: unref(disabled),
        "onUpdate:modelValue": onUpdate,
        "onUpdate:open": onUpdateOpen
      }), {
        default: withCtx(({ modelValue, open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ComboboxAnchor), { "as-child": "" }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ComboboxTrigger), {
                    class: ui.value.base({ class: [(_a = props.ui) == null ? void 0 : _a.base, props.class] }),
                    tabindex: "0"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      var _a2, _b2, _c, _d;
                      if (_push4) {
                        if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
                          _push4(`<span class="${ssrRenderClass(ui.value.leading({ class: (_a2 = props.ui) == null ? void 0 : _a2.leading }))}"${_scopeId3}>`);
                          ssrRenderSlot(_ctx.$slots, "leading", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => {
                            var _a3, _b3, _c2;
                            if (unref(isLeading) && unref(leadingIconName)) {
                              _push4(ssrRenderComponent(_sfc_main$4, {
                                name: unref(leadingIconName),
                                class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                              }, null, _parent4, _scopeId3));
                            } else if (!!__props.avatar) {
                              _push4(ssrRenderComponent(_sfc_main$3, mergeProps({
                                size: ((_b3 = props.ui) == null ? void 0 : _b3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                              }, __props.avatar, {
                                class: ui.value.itemLeadingAvatar({ class: (_c2 = props.ui) == null ? void 0 : _c2.itemLeadingAvatar })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          _push4(`</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot(_ctx.$slots, "default", {
                          modelValue,
                          open
                        }, () => {
                          _push4(`<!--[-->`);
                          ssrRenderList([displayValue(modelValue)], (displayedModelValue) => {
                            var _a4;
                            var _a3, _b3;
                            _push4(`<!--[-->`);
                            if (displayedModelValue) {
                              _push4(`<span class="${ssrRenderClass(ui.value.value({ class: (_a3 = props.ui) == null ? void 0 : _a3.value }))}"${_scopeId3}>${ssrInterpolate(displayedModelValue)}</span>`);
                            } else {
                              _push4(`<span class="${ssrRenderClass(ui.value.placeholder({ class: (_b3 = props.ui) == null ? void 0 : _b3.placeholder }))}"${_scopeId3}>${ssrInterpolate((_a4 = __props.placeholder) != null ? _a4 : "\xA0")}</span>`);
                            }
                            _push4(`<!--]-->`);
                          });
                          _push4(`<!--]-->`);
                        }, _push4, _parent4, _scopeId3);
                        if (unref(isTrailing) || !!slots.trailing) {
                          _push4(`<span class="${ssrRenderClass(ui.value.trailing({ class: (_b2 = props.ui) == null ? void 0 : _b2.trailing }))}"${_scopeId3}>`);
                          ssrRenderSlot(_ctx.$slots, "trailing", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => {
                            var _a3;
                            if (unref(trailingIconName)) {
                              _push4(ssrRenderComponent(_sfc_main$4, {
                                name: unref(trailingIconName),
                                class: ui.value.trailingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.trailingIcon })
                              }, null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          _push4(`</span>`);
                        } else {
                          _push4(`<!---->`);
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
                                unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$4, {
                                  key: 0,
                                  name: unref(leadingIconName),
                                  class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                                }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
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
                                unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$4, {
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ComboboxTrigger), {
                      class: ui.value.base({ class: [(_b = props.ui) == null ? void 0 : _b.base, props.class] }),
                      tabindex: "0"
                    }, {
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
                                unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$4, {
                                  key: 0,
                                  name: unref(leadingIconName),
                                  class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                                }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
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
                                unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$4, {
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
                    }, 1032, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ComboboxPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ComboboxContent), mergeProps({
                    class: ui.value.content({ class: (_a = props.ui) == null ? void 0 : _a.content })
                  }, contentProps.value), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      var _a2, _b2, _c, _d;
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FocusScope), {
                          trapped: "",
                          class: ui.value.focusScope({ class: (_a2 = props.ui) == null ? void 0 : _a2.focusScope })
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            var _a3, _b3, _c2, _d2;
                            if (_push5) {
                              ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push5, _parent5, _scopeId4);
                              if (!!__props.searchInput) {
                                _push5(ssrRenderComponent(unref(ComboboxInput), {
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    var _a4, _b4;
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_sfc_main$1, mergeProps({
                                        autofocus: "",
                                        autocomplete: "off"
                                      }, searchInputProps.value, {
                                        class: ui.value.input({ class: (_a4 = props.ui) == null ? void 0 : _a4.input })
                                      }), null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_sfc_main$1, mergeProps({
                                          autofocus: "",
                                          autocomplete: "off"
                                        }, searchInputProps.value, {
                                          class: ui.value.input({ class: (_b4 = props.ui) == null ? void 0 : _b4.input })
                                        }), null, 16, ["class"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(ssrRenderComponent(unref(ComboboxEmpty), {
                                class: ui.value.empty({ class: (_a3 = props.ui) == null ? void 0 : _a3.empty })
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    ssrRenderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => {
                                      _push6(`${ssrInterpolate(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData"))}`);
                                    }, _push6, _parent6, _scopeId5);
                                  } else {
                                    return [
                                      renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                        createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                      ])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`<div role="presentation" class="${ssrRenderClass(ui.value.viewport({ class: (_b3 = props.ui) == null ? void 0 : _b3.viewport }))}"${_scopeId4}>`);
                              if (createItem.value && createItemPosition.value === "top") {
                                _push5(ssrRenderComponent(unref(ReuseCreateItemTemplate), null, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`<!--[-->`);
                              ssrRenderList(filteredGroups.value, (group, groupIndex) => {
                                var _a4;
                                _push5(ssrRenderComponent(unref(ComboboxGroup), {
                                  key: `group-${groupIndex}`,
                                  class: ui.value.group({ class: (_a4 = props.ui) == null ? void 0 : _a4.group })
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(group, (item, index) => {
                                        var _a5, _b4, _c3, _d3, _e, _f;
                                        _push6(`<!--[-->`);
                                        if (isSelectItem(item) && item.type === "label") {
                                          _push6(ssrRenderComponent(unref(ComboboxLabel), {
                                            class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                          }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                                              } else {
                                                return [
                                                  createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else if (isSelectItem(item) && item.type === "separator") {
                                          _push6(ssrRenderComponent(unref(ComboboxSeparator), {
                                            class: ui.value.separator({ class: [(_c3 = props.ui) == null ? void 0 : _c3.separator, (_d3 = item.ui) == null ? void 0 : _d3.separator, item.class] })
                                          }, null, _parent6, _scopeId5));
                                        } else {
                                          _push6(ssrRenderComponent(unref(ComboboxItem), {
                                            class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                            disabled: isSelectItem(item) && item.disabled,
                                            value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                            onSelect: ($event) => onSelect($event, item)
                                          }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                ssrRenderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index
                                                }, () => {
                                                  var _a6, _b5, _c4, _d4;
                                                  ssrRenderSlot(_ctx.$slots, "item-leading", {
                                                    item,
                                                    index
                                                  }, () => {
                                                    var _a7, _b6, _c5, _d5, _e2, _f2, _g, _h, _i;
                                                    if (isSelectItem(item) && item.icon) {
                                                      _push7(ssrRenderComponent(_sfc_main$4, {
                                                        name: item.icon,
                                                        class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                      }, null, _parent7, _scopeId6));
                                                    } else if (isSelectItem(item) && item.avatar) {
                                                      _push7(ssrRenderComponent(_sfc_main$3, mergeProps({
                                                        size: ((_c5 = item.ui) == null ? void 0 : _c5.itemLeadingAvatarSize) || ((_d5 = props.ui) == null ? void 0 : _d5.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                      }, { ref_for: true }, item.avatar, {
                                                        class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                      }), null, _parent7, _scopeId6));
                                                    } else if (isSelectItem(item) && item.chip) {
                                                      _push7(ssrRenderComponent(_sfc_main$2, mergeProps({
                                                        size: ((_g = props.ui) == null ? void 0 : _g.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                        inset: "",
                                                        standalone: ""
                                                      }, { ref_for: true }, item.chip, {
                                                        class: ui.value.itemLeadingChip({ class: [(_h = props.ui) == null ? void 0 : _h.itemLeadingChip, (_i = item.ui) == null ? void 0 : _i.itemLeadingChip] })
                                                      }), null, _parent7, _scopeId6));
                                                    } else {
                                                      _push7(`<!---->`);
                                                    }
                                                  }, _push7, _parent7, _scopeId6);
                                                  _push7(`<span class="${ssrRenderClass(ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] }))}"${_scopeId6}>`);
                                                  ssrRenderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index
                                                  }, () => {
                                                    _push7(`${ssrInterpolate(isSelectItem(item) ? unref(get)(item, props.labelKey) : item)}`);
                                                  }, _push7, _parent7, _scopeId6);
                                                  _push7(`</span><span class="${ssrRenderClass(ui.value.itemTrailing({ class: [(_c4 = props.ui) == null ? void 0 : _c4.itemTrailing, isSelectItem(item) && ((_d4 = item.ui) == null ? void 0 : _d4.itemTrailing)] }))}"${_scopeId6}>`);
                                                  ssrRenderSlot(_ctx.$slots, "item-trailing", {
                                                    item,
                                                    index
                                                  }, null, _push7, _parent7, _scopeId6);
                                                  _push7(ssrRenderComponent(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                    default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                      var _a7, _b6, _c5, _d5;
                                                      if (_push8) {
                                                        _push8(ssrRenderComponent(_sfc_main$4, {
                                                          name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                          class: ui.value.itemTrailingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                        }, null, _parent8, _scopeId7));
                                                      } else {
                                                        return [
                                                          createVNode(_sfc_main$4, {
                                                            name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                            class: ui.value.itemTrailingIcon({ class: [(_c5 = props.ui) == null ? void 0 : _c5.itemTrailingIcon, isSelectItem(item) && ((_d5 = item.ui) == null ? void 0 : _d5.itemTrailingIcon)] })
                                                          }, null, 8, ["name", "class"])
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent7, _scopeId6));
                                                  _push7(`</span>`);
                                                }, _push7, _parent7, _scopeId6);
                                              } else {
                                                return [
                                                  renderSlot(_ctx.$slots, "item", {
                                                    item,
                                                    index
                                                  }, () => {
                                                    var _a6, _b5, _c4, _d4;
                                                    return [
                                                      renderSlot(_ctx.$slots, "item-leading", {
                                                        item,
                                                        index
                                                      }, () => {
                                                        var _a7, _b6, _c5, _d5, _e2, _f2, _g, _h, _i;
                                                        return [
                                                          isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$4, {
                                                            key: 0,
                                                            name: item.icon,
                                                            class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                          }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                                                            key: 1,
                                                            size: ((_c5 = item.ui) == null ? void 0 : _c5.itemLeadingAvatarSize) || ((_d5 = props.ui) == null ? void 0 : _d5.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                          }, { ref_for: true }, item.avatar, {
                                                            class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                          }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$2, mergeProps({
                                                            key: 2,
                                                            size: ((_g = props.ui) == null ? void 0 : _g.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                            inset: "",
                                                            standalone: ""
                                                          }, { ref_for: true }, item.chip, {
                                                            class: ui.value.itemLeadingChip({ class: [(_h = props.ui) == null ? void 0 : _h.itemLeadingChip, (_i = item.ui) == null ? void 0 : _i.itemLeadingChip] })
                                                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                        ];
                                                      }),
                                                      createVNode("span", {
                                                        class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] })
                                                      }, [
                                                        renderSlot(_ctx.$slots, "item-label", {
                                                          item,
                                                          index
                                                        }, () => [
                                                          createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                        ])
                                                      ], 2),
                                                      createVNode("span", {
                                                        class: ui.value.itemTrailing({ class: [(_c4 = props.ui) == null ? void 0 : _c4.itemTrailing, isSelectItem(item) && ((_d4 = item.ui) == null ? void 0 : _d4.itemTrailing)] })
                                                      }, [
                                                        renderSlot(_ctx.$slots, "item-trailing", {
                                                          item,
                                                          index
                                                        }),
                                                        createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                          default: withCtx(() => {
                                                            var _a7, _b6;
                                                            return [
                                                              createVNode(_sfc_main$4, {
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
                                          }, _parent6, _scopeId5));
                                        }
                                        _push6(`<!--]-->`);
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                          var _a5, _b4, _c3, _d3, _e, _f;
                                          return openBlock(), createBlock(Fragment, {
                                            key: `group-${groupIndex}-${index}`
                                          }, [
                                            isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel), {
                                              key: 0,
                                              class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator), {
                                              key: 1,
                                              class: ui.value.separator({ class: [(_c3 = props.ui) == null ? void 0 : _c3.separator, (_d3 = item.ui) == null ? void 0 : _d3.separator, item.class] })
                                            }, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem), {
                                              key: 2,
                                              class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                              disabled: isSelectItem(item) && item.disabled,
                                              value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                              onSelect: ($event) => onSelect($event, item)
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index
                                                }, () => {
                                                  var _a6, _b5, _c4, _d4;
                                                  return [
                                                    renderSlot(_ctx.$slots, "item-leading", {
                                                      item,
                                                      index
                                                    }, () => {
                                                      var _a7, _b6, _c5, _d5, _e2, _f2, _g, _h, _i;
                                                      return [
                                                        isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$4, {
                                                          key: 0,
                                                          name: item.icon,
                                                          class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                        }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                                                          key: 1,
                                                          size: ((_c5 = item.ui) == null ? void 0 : _c5.itemLeadingAvatarSize) || ((_d5 = props.ui) == null ? void 0 : _d5.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                        }, { ref_for: true }, item.avatar, {
                                                          class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                        }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$2, mergeProps({
                                                          key: 2,
                                                          size: ((_g = props.ui) == null ? void 0 : _g.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                          inset: "",
                                                          standalone: ""
                                                        }, { ref_for: true }, item.chip, {
                                                          class: ui.value.itemLeadingChip({ class: [(_h = props.ui) == null ? void 0 : _h.itemLeadingChip, (_i = item.ui) == null ? void 0 : _i.itemLeadingChip] })
                                                        }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                      ];
                                                    }),
                                                    createVNode("span", {
                                                      class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-label", {
                                                        item,
                                                        index
                                                      }, () => [
                                                        createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                      ])
                                                    ], 2),
                                                    createVNode("span", {
                                                      class: ui.value.itemTrailing({ class: [(_c4 = props.ui) == null ? void 0 : _c4.itemTrailing, isSelectItem(item) && ((_d4 = item.ui) == null ? void 0 : _d4.itemTrailing)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-trailing", {
                                                        item,
                                                        index
                                                      }),
                                                      createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                        default: withCtx(() => {
                                                          var _a7, _b6;
                                                          return [
                                                            createVNode(_sfc_main$4, {
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
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                              if (createItem.value && createItemPosition.value === "bottom") {
                                _push5(ssrRenderComponent(unref(ReuseCreateItemTemplate), null, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div>`);
                              ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push5, _parent5, _scopeId4);
                            } else {
                              return [
                                renderSlot(_ctx.$slots, "content-top"),
                                !!__props.searchInput ? (openBlock(), createBlock(unref(ComboboxInput), {
                                  key: 0,
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => {
                                    var _a4;
                                    return [
                                      createVNode(_sfc_main$1, mergeProps({
                                        autofocus: "",
                                        autocomplete: "off"
                                      }, searchInputProps.value, {
                                        class: ui.value.input({ class: (_a4 = props.ui) == null ? void 0 : _a4.input })
                                      }), null, 16, ["class"])
                                    ];
                                  }),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : createCommentVNode("", true),
                                createVNode(unref(ComboboxEmpty), {
                                  class: ui.value.empty({ class: (_c2 = props.ui) == null ? void 0 : _c2.empty })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                      createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"]),
                                createVNode("div", {
                                  role: "presentation",
                                  class: ui.value.viewport({ class: (_d2 = props.ui) == null ? void 0 : _d2.viewport })
                                }, [
                                  createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                                    var _a4;
                                    return openBlock(), createBlock(unref(ComboboxGroup), {
                                      key: `group-${groupIndex}`,
                                      class: ui.value.group({ class: (_a4 = props.ui) == null ? void 0 : _a4.group })
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                          var _a5, _b4, _c3, _d3, _e, _f;
                                          return openBlock(), createBlock(Fragment, {
                                            key: `group-${groupIndex}-${index}`
                                          }, [
                                            isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel), {
                                              key: 0,
                                              class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator), {
                                              key: 1,
                                              class: ui.value.separator({ class: [(_c3 = props.ui) == null ? void 0 : _c3.separator, (_d3 = item.ui) == null ? void 0 : _d3.separator, item.class] })
                                            }, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem), {
                                              key: 2,
                                              class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                              disabled: isSelectItem(item) && item.disabled,
                                              value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                              onSelect: ($event) => onSelect($event, item)
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index
                                                }, () => {
                                                  var _a6, _b5, _c4, _d4;
                                                  return [
                                                    renderSlot(_ctx.$slots, "item-leading", {
                                                      item,
                                                      index
                                                    }, () => {
                                                      var _a7, _b6, _c5, _d5, _e2, _f2, _g, _h, _i;
                                                      return [
                                                        isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$4, {
                                                          key: 0,
                                                          name: item.icon,
                                                          class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                        }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                                                          key: 1,
                                                          size: ((_c5 = item.ui) == null ? void 0 : _c5.itemLeadingAvatarSize) || ((_d5 = props.ui) == null ? void 0 : _d5.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                        }, { ref_for: true }, item.avatar, {
                                                          class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                        }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$2, mergeProps({
                                                          key: 2,
                                                          size: ((_g = props.ui) == null ? void 0 : _g.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                          inset: "",
                                                          standalone: ""
                                                        }, { ref_for: true }, item.chip, {
                                                          class: ui.value.itemLeadingChip({ class: [(_h = props.ui) == null ? void 0 : _h.itemLeadingChip, (_i = item.ui) == null ? void 0 : _i.itemLeadingChip] })
                                                        }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                      ];
                                                    }),
                                                    createVNode("span", {
                                                      class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-label", {
                                                        item,
                                                        index
                                                      }, () => [
                                                        createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                      ])
                                                    ], 2),
                                                    createVNode("span", {
                                                      class: ui.value.itemTrailing({ class: [(_c4 = props.ui) == null ? void 0 : _c4.itemTrailing, isSelectItem(item) && ((_d4 = item.ui) == null ? void 0 : _d4.itemTrailing)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-trailing", {
                                                        item,
                                                        index
                                                      }),
                                                      createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                        default: withCtx(() => {
                                                          var _a7, _b6;
                                                          return [
                                                            createVNode(_sfc_main$4, {
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
                                  }), 128)),
                                  createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
                                ], 2),
                                renderSlot(_ctx.$slots, "content-bottom")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        if (!!__props.arrow) {
                          _push4(ssrRenderComponent(unref(ComboboxArrow), mergeProps(arrowProps.value, {
                            class: ui.value.arrow({ class: (_b2 = props.ui) == null ? void 0 : _b2.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(unref(FocusScope), {
                            trapped: "",
                            class: ui.value.focusScope({ class: (_c = props.ui) == null ? void 0 : _c.focusScope })
                          }, {
                            default: withCtx(() => {
                              var _a3, _b3;
                              return [
                                renderSlot(_ctx.$slots, "content-top"),
                                !!__props.searchInput ? (openBlock(), createBlock(unref(ComboboxInput), {
                                  key: 0,
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => {
                                    var _a4;
                                    return [
                                      createVNode(_sfc_main$1, mergeProps({
                                        autofocus: "",
                                        autocomplete: "off"
                                      }, searchInputProps.value, {
                                        class: ui.value.input({ class: (_a4 = props.ui) == null ? void 0 : _a4.input })
                                      }), null, 16, ["class"])
                                    ];
                                  }),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : createCommentVNode("", true),
                                createVNode(unref(ComboboxEmpty), {
                                  class: ui.value.empty({ class: (_a3 = props.ui) == null ? void 0 : _a3.empty })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                      createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"]),
                                createVNode("div", {
                                  role: "presentation",
                                  class: ui.value.viewport({ class: (_b3 = props.ui) == null ? void 0 : _b3.viewport })
                                }, [
                                  createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                                    var _a4;
                                    return openBlock(), createBlock(unref(ComboboxGroup), {
                                      key: `group-${groupIndex}`,
                                      class: ui.value.group({ class: (_a4 = props.ui) == null ? void 0 : _a4.group })
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                          var _a5, _b4, _c2, _d2, _e, _f;
                                          return openBlock(), createBlock(Fragment, {
                                            key: `group-${groupIndex}-${index}`
                                          }, [
                                            isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel), {
                                              key: 0,
                                              class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator), {
                                              key: 1,
                                              class: ui.value.separator({ class: [(_c2 = props.ui) == null ? void 0 : _c2.separator, (_d2 = item.ui) == null ? void 0 : _d2.separator, item.class] })
                                            }, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem), {
                                              key: 2,
                                              class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                              disabled: isSelectItem(item) && item.disabled,
                                              value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                              onSelect: ($event) => onSelect($event, item)
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index
                                                }, () => {
                                                  var _a6, _b5, _c3, _d3;
                                                  return [
                                                    renderSlot(_ctx.$slots, "item-leading", {
                                                      item,
                                                      index
                                                    }, () => {
                                                      var _a7, _b6, _c4, _d4, _e2, _f2, _g, _h, _i;
                                                      return [
                                                        isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$4, {
                                                          key: 0,
                                                          name: item.icon,
                                                          class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                        }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                                                          key: 1,
                                                          size: ((_c4 = item.ui) == null ? void 0 : _c4.itemLeadingAvatarSize) || ((_d4 = props.ui) == null ? void 0 : _d4.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                        }, { ref_for: true }, item.avatar, {
                                                          class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                        }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$2, mergeProps({
                                                          key: 2,
                                                          size: ((_g = props.ui) == null ? void 0 : _g.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                          inset: "",
                                                          standalone: ""
                                                        }, { ref_for: true }, item.chip, {
                                                          class: ui.value.itemLeadingChip({ class: [(_h = props.ui) == null ? void 0 : _h.itemLeadingChip, (_i = item.ui) == null ? void 0 : _i.itemLeadingChip] })
                                                        }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                      ];
                                                    }),
                                                    createVNode("span", {
                                                      class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-label", {
                                                        item,
                                                        index
                                                      }, () => [
                                                        createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                      ])
                                                    ], 2),
                                                    createVNode("span", {
                                                      class: ui.value.itemTrailing({ class: [(_c3 = props.ui) == null ? void 0 : _c3.itemTrailing, isSelectItem(item) && ((_d3 = item.ui) == null ? void 0 : _d3.itemTrailing)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-trailing", {
                                                        item,
                                                        index
                                                      }),
                                                      createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                        default: withCtx(() => {
                                                          var _a7, _b6;
                                                          return [
                                                            createVNode(_sfc_main$4, {
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
                                  }), 128)),
                                  createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
                                ], 2),
                                renderSlot(_ctx.$slots, "content-bottom")
                              ];
                            }),
                            _: 3
                          }, 8, ["class"]),
                          !!__props.arrow ? (openBlock(), createBlock(unref(ComboboxArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: (_d = props.ui) == null ? void 0 : _d.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ComboboxContent), mergeProps({
                      class: ui.value.content({ class: (_b = props.ui) == null ? void 0 : _b.content })
                    }, contentProps.value), {
                      default: withCtx(() => {
                        var _a2, _b2;
                        return [
                          createVNode(unref(FocusScope), {
                            trapped: "",
                            class: ui.value.focusScope({ class: (_a2 = props.ui) == null ? void 0 : _a2.focusScope })
                          }, {
                            default: withCtx(() => {
                              var _a3, _b3;
                              return [
                                renderSlot(_ctx.$slots, "content-top"),
                                !!__props.searchInput ? (openBlock(), createBlock(unref(ComboboxInput), {
                                  key: 0,
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => {
                                    var _a4;
                                    return [
                                      createVNode(_sfc_main$1, mergeProps({
                                        autofocus: "",
                                        autocomplete: "off"
                                      }, searchInputProps.value, {
                                        class: ui.value.input({ class: (_a4 = props.ui) == null ? void 0 : _a4.input })
                                      }), null, 16, ["class"])
                                    ];
                                  }),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : createCommentVNode("", true),
                                createVNode(unref(ComboboxEmpty), {
                                  class: ui.value.empty({ class: (_a3 = props.ui) == null ? void 0 : _a3.empty })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                      createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"]),
                                createVNode("div", {
                                  role: "presentation",
                                  class: ui.value.viewport({ class: (_b3 = props.ui) == null ? void 0 : _b3.viewport })
                                }, [
                                  createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                                    var _a4;
                                    return openBlock(), createBlock(unref(ComboboxGroup), {
                                      key: `group-${groupIndex}`,
                                      class: ui.value.group({ class: (_a4 = props.ui) == null ? void 0 : _a4.group })
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                          var _a5, _b4, _c, _d, _e, _f;
                                          return openBlock(), createBlock(Fragment, {
                                            key: `group-${groupIndex}-${index}`
                                          }, [
                                            isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel), {
                                              key: 0,
                                              class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator), {
                                              key: 1,
                                              class: ui.value.separator({ class: [(_c = props.ui) == null ? void 0 : _c.separator, (_d = item.ui) == null ? void 0 : _d.separator, item.class] })
                                            }, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem), {
                                              key: 2,
                                              class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                              disabled: isSelectItem(item) && item.disabled,
                                              value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                              onSelect: ($event) => onSelect($event, item)
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index
                                                }, () => {
                                                  var _a6, _b5, _c2, _d2;
                                                  return [
                                                    renderSlot(_ctx.$slots, "item-leading", {
                                                      item,
                                                      index
                                                    }, () => {
                                                      var _a7, _b6, _c3, _d3, _e2, _f2, _g, _h, _i;
                                                      return [
                                                        isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$4, {
                                                          key: 0,
                                                          name: item.icon,
                                                          class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                        }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                                                          key: 1,
                                                          size: ((_c3 = item.ui) == null ? void 0 : _c3.itemLeadingAvatarSize) || ((_d3 = props.ui) == null ? void 0 : _d3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                        }, { ref_for: true }, item.avatar, {
                                                          class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                        }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$2, mergeProps({
                                                          key: 2,
                                                          size: ((_g = props.ui) == null ? void 0 : _g.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                          inset: "",
                                                          standalone: ""
                                                        }, { ref_for: true }, item.chip, {
                                                          class: ui.value.itemLeadingChip({ class: [(_h = props.ui) == null ? void 0 : _h.itemLeadingChip, (_i = item.ui) == null ? void 0 : _i.itemLeadingChip] })
                                                        }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                      ];
                                                    }),
                                                    createVNode("span", {
                                                      class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-label", {
                                                        item,
                                                        index
                                                      }, () => [
                                                        createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                      ])
                                                    ], 2),
                                                    createVNode("span", {
                                                      class: ui.value.itemTrailing({ class: [(_c2 = props.ui) == null ? void 0 : _c2.itemTrailing, isSelectItem(item) && ((_d2 = item.ui) == null ? void 0 : _d2.itemTrailing)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-trailing", {
                                                        item,
                                                        index
                                                      }),
                                                      createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                        default: withCtx(() => {
                                                          var _a7, _b6;
                                                          return [
                                                            createVNode(_sfc_main$4, {
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
                                  }), 128)),
                                  createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
                                ], 2),
                                renderSlot(_ctx.$slots, "content-bottom")
                              ];
                            }),
                            _: 3
                          }, 8, ["class"]),
                          !!__props.arrow ? (openBlock(), createBlock(unref(ComboboxArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: (_b2 = props.ui) == null ? void 0 : _b2.arrow })
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
              createVNode(unref(ComboboxAnchor), { "as-child": "" }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode(unref(ComboboxTrigger), {
                      class: ui.value.base({ class: [(_a = props.ui) == null ? void 0 : _a.base, props.class] }),
                      tabindex: "0"
                    }, {
                      default: withCtx(() => {
                        var _a2, _b;
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
                              var _a3, _b2, _c;
                              return [
                                unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$4, {
                                  key: 0,
                                  name: unref(leadingIconName),
                                  class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                                }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                                  key: 1,
                                  size: ((_b2 = props.ui) == null ? void 0 : _b2.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
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
                              var _a3, _b2;
                              return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                                displayedModelValue ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: ui.value.value({ class: (_a3 = props.ui) == null ? void 0 : _a3.value })
                                }, toDisplayString(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: ui.value.placeholder({ class: (_b2 = props.ui) == null ? void 0 : _b2.placeholder })
                                }, toDisplayString((_a4 = __props.placeholder) != null ? _a4 : "\xA0"), 3))
                              ], 64);
                            }), 128))
                          ]),
                          unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                            key: 1,
                            class: ui.value.trailing({ class: (_b = props.ui) == null ? void 0 : _b.trailing })
                          }, [
                            renderSlot(_ctx.$slots, "trailing", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => {
                              var _a3;
                              return [
                                unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$4, {
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
                    }, 1032, ["class"])
                  ];
                }),
                _: 2
              }, 1024),
              createVNode(unref(ComboboxPortal), unref(portalProps), {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode(unref(ComboboxContent), mergeProps({
                      class: ui.value.content({ class: (_a = props.ui) == null ? void 0 : _a.content })
                    }, contentProps.value), {
                      default: withCtx(() => {
                        var _a2, _b;
                        return [
                          createVNode(unref(FocusScope), {
                            trapped: "",
                            class: ui.value.focusScope({ class: (_a2 = props.ui) == null ? void 0 : _a2.focusScope })
                          }, {
                            default: withCtx(() => {
                              var _a3, _b2;
                              return [
                                renderSlot(_ctx.$slots, "content-top"),
                                !!__props.searchInput ? (openBlock(), createBlock(unref(ComboboxInput), {
                                  key: 0,
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => {
                                    var _a4;
                                    return [
                                      createVNode(_sfc_main$1, mergeProps({
                                        autofocus: "",
                                        autocomplete: "off"
                                      }, searchInputProps.value, {
                                        class: ui.value.input({ class: (_a4 = props.ui) == null ? void 0 : _a4.input })
                                      }), null, 16, ["class"])
                                    ];
                                  }),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : createCommentVNode("", true),
                                createVNode(unref(ComboboxEmpty), {
                                  class: ui.value.empty({ class: (_a3 = props.ui) == null ? void 0 : _a3.empty })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                      createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"]),
                                createVNode("div", {
                                  role: "presentation",
                                  class: ui.value.viewport({ class: (_b2 = props.ui) == null ? void 0 : _b2.viewport })
                                }, [
                                  createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                                    var _a4;
                                    return openBlock(), createBlock(unref(ComboboxGroup), {
                                      key: `group-${groupIndex}`,
                                      class: ui.value.group({ class: (_a4 = props.ui) == null ? void 0 : _a4.group })
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                          var _a5, _b3, _c, _d, _e, _f;
                                          return openBlock(), createBlock(Fragment, {
                                            key: `group-${groupIndex}-${index}`
                                          }, [
                                            isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel), {
                                              key: 0,
                                              class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b3 = item.ui) == null ? void 0 : _b3.label, item.class] })
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator), {
                                              key: 1,
                                              class: ui.value.separator({ class: [(_c = props.ui) == null ? void 0 : _c.separator, (_d = item.ui) == null ? void 0 : _d.separator, item.class] })
                                            }, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem), {
                                              key: 2,
                                              class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                              disabled: isSelectItem(item) && item.disabled,
                                              value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                              onSelect: ($event) => onSelect($event, item)
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index
                                                }, () => {
                                                  var _a6, _b4, _c2, _d2;
                                                  return [
                                                    renderSlot(_ctx.$slots, "item-leading", {
                                                      item,
                                                      index
                                                    }, () => {
                                                      var _a7, _b5, _c3, _d3, _e2, _f2, _g, _h, _i;
                                                      return [
                                                        isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$4, {
                                                          key: 0,
                                                          name: item.icon,
                                                          class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b5 = item.ui) == null ? void 0 : _b5.itemLeadingIcon] })
                                                        }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                                                          key: 1,
                                                          size: ((_c3 = item.ui) == null ? void 0 : _c3.itemLeadingAvatarSize) || ((_d3 = props.ui) == null ? void 0 : _d3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                        }, { ref_for: true }, item.avatar, {
                                                          class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                        }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$2, mergeProps({
                                                          key: 2,
                                                          size: ((_g = props.ui) == null ? void 0 : _g.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                          inset: "",
                                                          standalone: ""
                                                        }, { ref_for: true }, item.chip, {
                                                          class: ui.value.itemLeadingChip({ class: [(_h = props.ui) == null ? void 0 : _h.itemLeadingChip, (_i = item.ui) == null ? void 0 : _i.itemLeadingChip] })
                                                        }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                      ];
                                                    }),
                                                    createVNode("span", {
                                                      class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b4 = item.ui) == null ? void 0 : _b4.itemLabel)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-label", {
                                                        item,
                                                        index
                                                      }, () => [
                                                        createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                      ])
                                                    ], 2),
                                                    createVNode("span", {
                                                      class: ui.value.itemTrailing({ class: [(_c2 = props.ui) == null ? void 0 : _c2.itemTrailing, isSelectItem(item) && ((_d2 = item.ui) == null ? void 0 : _d2.itemTrailing)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-trailing", {
                                                        item,
                                                        index
                                                      }),
                                                      createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                        default: withCtx(() => {
                                                          var _a7, _b5;
                                                          return [
                                                            createVNode(_sfc_main$4, {
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
                                  }), 128)),
                                  createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
                                ], 2),
                                renderSlot(_ctx.$slots, "content-bottom")
                              ];
                            }),
                            _: 3
                          }, 8, ["class"]),
                          !!__props.arrow ? (openBlock(), createBlock(unref(ComboboxArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: (_b = props.ui) == null ? void 0 : _b.arrow })
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/SelectMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=SelectMenu-C0_KlmQW.mjs.map
