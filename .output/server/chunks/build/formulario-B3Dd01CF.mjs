import { _ as __nuxt_component_0 } from './nuxt-link-Bn_O9NYZ.mjs';
import __nuxt_component_1 from './index-B5rpN8hp.mjs';
import { a as _sfc_main$1 } from './Button-BeuMp5nt.mjs';
import { _ as _sfc_main$2 } from './Card-CRvp106L.mjs';
import { _ as _sfc_main$3 } from './Input-CMCaI9pM.mjs';
import { _ as _sfc_main$4 } from './Textarea-0gyuVVm7.mjs';
import { _ as _sfc_main$5 } from './Modal-CzBe1f86.mjs';
import { computed, ref, watch, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, openBlock, createCommentVNode, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import draggable from 'vuedraggable';
import { d as useRoute } from './server.mjs';
import { u as useEventForms } from './useEventForms-NvlLQMyl.mjs';
import { u as useToast } from './useToast-Bm7hVh5T.mjs';
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
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import './NuxtImg-DFTKHYRn.mjs';
import './useLocale-CtluvDKB.mjs';
import './usePortal-BbZPQQY_.mjs';

const _sfc_main = {
  __name: "formulario",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const eventId = computed(() => route.params.eventId);
    const { createEventForm, updateEventForm, createField, updateField: updateFieldAPI, deleteField: deleteFieldApi, reorderFields } = useEventForms();
    const { showToast } = useToast();
    const saving = ref(false);
    ref(true);
    const hasChanges = ref(false);
    const showPreviewModal = ref(false);
    const drag = ref(false);
    const eventTitle = ref("");
    const eventSlug = ref("");
    const form = ref({
      id: null,
      title: "",
      description: "",
      isActive: true,
      openDate: "",
      closeDate: "",
      fields: []
    });
    const fieldTypeMenuItems = [
      [{
        label: "Texto Curto",
        icon: "heroicons:pencil",
        click: () => addField("TEXT")
      }],
      [{
        label: "Texto Longo",
        icon: "heroicons:document-text",
        click: () => addField("TEXTAREA")
      }],
      [{
        label: "E-mail",
        icon: "heroicons:envelope",
        click: () => addField("EMAIL")
      }],
      [{
        label: "Telefone",
        icon: "heroicons:phone",
        click: () => addField("PHONE")
      }],
      [{
        label: "N\xFAmero",
        icon: "heroicons:hashtag",
        click: () => addField("NUMBER")
      }],
      [{
        label: "Data",
        icon: "heroicons:calendar-days",
        click: () => addField("DATE")
      }],
      [{
        label: "Sele\xE7\xE3o \xDAnica",
        icon: "heroicons:radio-group",
        click: () => addField("SELECT")
      }],
      [{
        label: "M\xFAltipla Escolha",
        icon: "heroicons:check-box",
        click: () => addField("CHECKBOX")
      }],
      [{
        label: "Upload de Arquivo",
        icon: "heroicons:paper-clip",
        click: () => addField("FILE")
      }]
    ];
    async function saveForm() {
      try {
        saving.value = true;
        const formData = {
          title: form.value.title,
          description: form.value.description || null,
          isActive: form.value.isActive,
          openDate: form.value.openDate ? new Date(form.value.openDate).toISOString() : null,
          closeDate: form.value.closeDate ? new Date(form.value.closeDate).toISOString() : null
        };
        let result;
        if (form.value.id) {
          result = await updateEventForm(form.value.id, formData);
        } else {
          result = await createEventForm(eventId.value, formData);
          if (result.data) {
            form.value.id = result.data.id;
          }
        }
        if (result.success) {
          hasChanges.value = false;
          showToast("Formul\xE1rio salvo com sucesso!", "success");
        }
      } catch (error) {
        console.error("Error saving form:", error);
        showToast("Erro ao salvar formul\xE1rio", "error");
      } finally {
        saving.value = false;
      }
    }
    async function addField(type) {
      if (!form.value.id) {
        showToast("Salve o formul\xE1rio antes de adicionar campos", "warning");
        return;
      }
      const fieldData = createFieldTemplate(type);
      try {
        const result = await createField(form.value.id, fieldData);
        if (result.success && result.data) {
          form.value.fields.push(result.data);
          hasChanges.value = true;
          showToast("Campo adicionado com sucesso!", "success");
        }
      } catch (error) {
        console.error("Error creating field:", error);
        showToast("Erro ao adicionar campo", "error");
      }
    }
    function createFieldTemplate(type) {
      var _a;
      const templates = {
        TEXT: {
          label: "Campo de texto",
          type: "TEXT",
          required: false,
          placeholder: "Digite aqui..."
        },
        TEXTAREA: {
          label: "Campo de texto longo",
          type: "TEXTAREA",
          required: false,
          placeholder: "Digite sua resposta..."
        },
        EMAIL: {
          label: "E-mail",
          type: "EMAIL",
          required: true,
          placeholder: "seu.email@exemplo.com"
        },
        PHONE: {
          label: "Telefone",
          type: "PHONE",
          required: false,
          placeholder: "(11) 99999-9999"
        },
        NUMBER: {
          label: "N\xFAmero",
          type: "NUMBER",
          required: false,
          placeholder: "0"
        },
        DATE: {
          label: "Data",
          type: "DATE",
          required: false
        },
        SELECT: {
          label: "Sele\xE7\xE3o \xFAnica",
          type: "SELECT",
          required: false,
          options: [
            { value: "opcao1", label: "Op\xE7\xE3o 1" },
            { value: "opcao2", label: "Op\xE7\xE3o 2" }
          ]
        },
        CHECKBOX: {
          label: "M\xFAltipla escolha",
          type: "CHECKBOX",
          required: false,
          options: [
            { value: "item1", label: "Item 1" },
            { value: "item2", label: "Item 2" }
          ]
        },
        FILE: {
          label: "Upload de arquivo",
          type: "FILE",
          required: false,
          acceptedTypes: "image/*,.pdf,.doc,.docx"
        }
      };
      const baseOrder = Math.max(...((_a = form.value.fields) == null ? void 0 : _a.map((f) => f.order)) || [0]) + 1;
      return {
        ...templates[type],
        order: baseOrder
      };
    }
    async function updateField(fieldId, updates) {
      try {
        const result = await updateFieldAPI(fieldId, updates);
        if (result.success) {
          const fieldIndex = form.value.fields.findIndex((f) => f.id === fieldId);
          if (fieldIndex >= 0) {
            Object.assign(form.value.fields[fieldIndex], updates);
          }
          hasChanges.value = true;
        }
      } catch (error) {
        console.error("Error updating field:", error);
        showToast("Erro ao atualizar campo", "error");
      }
    }
    async function deleteField(fieldId) {
      try {
        const result = await deleteFieldApi(fieldId);
        if (result.success) {
          form.value.fields = form.value.fields.filter((f) => f.id !== fieldId);
          hasChanges.value = true;
          showToast("Campo removido com sucesso!", "success");
        }
      } catch (error) {
        console.error("Error deleting field:", error);
        showToast("Erro ao remover campo", "error");
      }
    }
    function duplicateField(field) {
      const duplicatedField = {
        ...field,
        label: `${field.label} (c\xF3pia)`,
        order: Math.max(...form.value.fields.map((f) => f.order)) + 1
      };
      addField(duplicatedField.type);
    }
    async function onFieldReorder() {
      if (!form.value.id || drag.value) return;
      try {
        const fieldOrder = form.value.fields.map((field, index) => ({
          id: field.id,
          order: index + 1
        }));
        await reorderFields(form.value.id, fieldOrder);
        hasChanges.value = true;
      } catch (error) {
        console.error("Error reordering fields:", error);
        showToast("Erro ao reordenar campos", "error");
      }
    }
    function previewForm() {
      showPreviewModal.value = true;
    }
    watch(
      () => [form.value.title, form.value.description, form.value.isActive, form.value.openDate, form.value.closeDate],
      () => {
        hasChanges.value = true;
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      const _component_UButton = _sfc_main$1;
      const _component_UCard = _sfc_main$2;
      const _component_UToggle = resolveComponent("UToggle");
      const _component_UInput = _sfc_main$3;
      const _component_UTextarea = _sfc_main$4;
      const _component_UDropdown = resolveComponent("UDropdown");
      const _component_FormFieldEditor = resolveComponent("FormFieldEditor");
      const _component_FormPreview = resolveComponent("FormPreview");
      const _component_UModal = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><div class="bg-white border-b border-gray-200"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between py-6"><div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/eventos/${unref(eventSlug)}`,
        class: "flex items-center text-gray-600 hover:text-blue-600 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:arrow-left",
              class: "h-5 w-5 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Voltar ao evento `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:arrow-left",
                class: "h-5 w-5 mr-2"
              }),
              createTextVNode(" Voltar ao evento ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="border-l border-gray-300 pl-4"><h1 class="text-2xl font-bold text-gray-900"> Configurar Formul\xE1rio de Inscri\xE7\xE3o </h1><p class="text-sm text-gray-600 mt-1">${ssrInterpolate(unref(eventTitle) || "Carregando...")}</p></div></div><div class="flex items-center space-x-3">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        color: "gray",
        onClick: previewForm,
        disabled: !unref(form).id
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:eye",
              class: "h-4 w-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Visualizar `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:eye",
                class: "h-4 w-4 mr-2"
              }),
              createTextVNode(" Visualizar ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        onClick: saveForm,
        loading: unref(saving),
        disabled: !unref(hasChanges)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:check",
              class: "h-4 w-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Salvar altera\xE7\xF5es `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:check",
                class: "h-4 w-4 mr-2"
              }),
              createTextVNode(" Salvar altera\xE7\xF5es ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-6">`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold text-gray-900"${_scopeId}> Configura\xE7\xF5es do Formul\xE1rio </h3>`);
            _push2(ssrRenderComponent(_component_UToggle, {
              modelValue: unref(form).isActive,
              "onUpdate:modelValue": ($event) => unref(form).isActive = $event,
              disabled: unref(saving)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, " Configura\xE7\xF5es do Formul\xE1rio "),
                createVNode(_component_UToggle, {
                  modelValue: unref(form).isActive,
                  "onUpdate:modelValue": ($event) => unref(form).isActive = $event,
                  disabled: unref(saving)
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}> T\xEDtulo do formul\xE1rio </label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              placeholder: "Ex: Inscri\xE7\xE3o para Retiro Espiritual",
              disabled: unref(saving)
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}> Descri\xE7\xE3o (opcional) </label>`);
            _push2(ssrRenderComponent(_component_UTextarea, {
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              placeholder: "Descreva brevemente o que os participantes devem saber sobre a inscri\xE7\xE3o...",
              rows: "3",
              disabled: unref(saving)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}> Data de abertura </label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(form).openDate,
              "onUpdate:modelValue": ($event) => unref(form).openDate = $event,
              type: "datetime-local",
              disabled: unref(saving)
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}> Data de fechamento </label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(form).closeDate,
              "onUpdate:modelValue": ($event) => unref(form).closeDate = $event,
              type: "datetime-local",
              disabled: unref(saving)
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " T\xEDtulo do formul\xE1rio "),
                  createVNode(_component_UInput, {
                    modelValue: unref(form).title,
                    "onUpdate:modelValue": ($event) => unref(form).title = $event,
                    placeholder: "Ex: Inscri\xE7\xE3o para Retiro Espiritual",
                    disabled: unref(saving)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Descri\xE7\xE3o (opcional) "),
                  createVNode(_component_UTextarea, {
                    modelValue: unref(form).description,
                    "onUpdate:modelValue": ($event) => unref(form).description = $event,
                    placeholder: "Descreva brevemente o que os participantes devem saber sobre a inscri\xE7\xE3o...",
                    rows: "3",
                    disabled: unref(saving)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                ]),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Data de abertura "),
                    createVNode(_component_UInput, {
                      modelValue: unref(form).openDate,
                      "onUpdate:modelValue": ($event) => unref(form).openDate = $event,
                      type: "datetime-local",
                      disabled: unref(saving)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Data de fechamento "),
                    createVNode(_component_UInput, {
                      modelValue: unref(form).closeDate,
                      "onUpdate:modelValue": ($event) => unref(form).closeDate = $event,
                      type: "datetime-local",
                      disabled: unref(saving)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ])
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
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold text-gray-900"${_scopeId}> Campos do Formul\xE1rio </h3>`);
            _push2(ssrRenderComponent(_component_UDropdown, { items: fieldTypeMenuItems }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "primary",
                    variant: "outline",
                    "trailing-icon": "heroicons:chevron-down-20-solid"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "heroicons:plus",
                          class: "h-4 w-4 mr-2"
                        }, null, _parent4, _scopeId3));
                        _push4(` Adicionar Campo `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "heroicons:plus",
                            class: "h-4 w-4 mr-2"
                          }),
                          createTextVNode(" Adicionar Campo ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      color: "primary",
                      variant: "outline",
                      "trailing-icon": "heroicons:chevron-down-20-solid"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "heroicons:plus",
                          class: "h-4 w-4 mr-2"
                        }),
                        createTextVNode(" Adicionar Campo ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, " Campos do Formul\xE1rio "),
                createVNode(_component_UDropdown, { items: fieldTypeMenuItems }, {
                  default: withCtx(() => [
                    createVNode(_component_UButton, {
                      color: "primary",
                      variant: "outline",
                      "trailing-icon": "heroicons:chevron-down-20-solid"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "heroicons:plus",
                          class: "h-4 w-4 mr-2"
                        }),
                        createTextVNode(" Adicionar Campo ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}>`);
            if (((_a = unref(form).fields) == null ? void 0 : _a.length) === 0) {
              _push2(`<div class="text-center py-12 text-gray-500"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:document-text",
                class: "h-12 w-12 mx-auto mb-4 text-gray-300"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-lg font-medium"${_scopeId}>Nenhum campo adicionado</p><p class="text-sm mt-1"${_scopeId}>Clique em &quot;Adicionar Campo&quot; para come\xE7ar a criar seu formul\xE1rio</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(draggable), {
              modelValue: unref(form).fields,
              "onUpdate:modelValue": ($event) => unref(form).fields = $event,
              group: "fields",
              onStart: ($event) => drag.value = true,
              onEnd: onFieldReorder,
              "item-key": "id",
              class: "space-y-3"
            }, {
              item: withCtx(({ element: field, index }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_FormFieldEditor, {
                    key: field.id,
                    field,
                    index,
                    onUpdate: updateField,
                    onDelete: deleteField,
                    onDuplicate: duplicateField
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    (openBlock(), createBlock(_component_FormFieldEditor, {
                      key: field.id,
                      field,
                      index,
                      onUpdate: updateField,
                      onDelete: deleteField,
                      onDuplicate: duplicateField
                    }, null, 8, ["field", "index"]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                ((_b = unref(form).fields) == null ? void 0 : _b.length) === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-center py-12 text-gray-500"
                }, [
                  createVNode(_component_Icon, {
                    name: "heroicons:document-text",
                    class: "h-12 w-12 mx-auto mb-4 text-gray-300"
                  }),
                  createVNode("p", { class: "text-lg font-medium" }, "Nenhum campo adicionado"),
                  createVNode("p", { class: "text-sm mt-1" }, 'Clique em "Adicionar Campo" para come\xE7ar a criar seu formul\xE1rio')
                ])) : createCommentVNode("", true),
                createVNode(unref(draggable), {
                  modelValue: unref(form).fields,
                  "onUpdate:modelValue": ($event) => unref(form).fields = $event,
                  group: "fields",
                  onStart: ($event) => drag.value = true,
                  onEnd: onFieldReorder,
                  "item-key": "id",
                  class: "space-y-3"
                }, {
                  item: withCtx(({ element: field, index }) => [
                    (openBlock(), createBlock(_component_FormFieldEditor, {
                      key: field.id,
                      field,
                      index,
                      onUpdate: updateField,
                      onDelete: deleteField,
                      onDuplicate: duplicateField
                    }, null, 8, ["field", "index"]))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "onStart"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="lg:col-span-1"><div class="sticky top-8">`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:eye",
              class: "h-5 w-5 text-gray-500"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="text-lg font-semibold text-gray-900"${_scopeId}>Preview</h3></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-2" }, [
                createVNode(_component_Icon, {
                  name: "heroicons:eye",
                  class: "h-5 w-5 text-gray-500"
                }),
                createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "Preview")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_FormPreview, {
              form: unref(form),
              fields: unref(form).fields || [],
              class: "max-h-[600px] overflow-y-auto"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_FormPreview, {
                form: unref(form),
                fields: unref(form).fields || [],
                class: "max-h-[600px] overflow-y-auto"
              }, null, 8, ["form", "fields"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showPreviewModal),
        "onUpdate:modelValue": ($event) => isRef(showPreviewModal) ? showPreviewModal.value = $event : null,
        ui: { width: "max-w-4xl" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, null, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><h3 class="text-lg font-semibold"${_scopeId2}>Preview do Formul\xE1rio</h3>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "gray",
                    variant: "ghost",
                    icon: "heroicons:x-mark-20-solid",
                    onClick: ($event) => showPreviewModal.value = false
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("h3", { class: "text-lg font-semibold" }, "Preview do Formul\xE1rio"),
                      createVNode(_component_UButton, {
                        color: "gray",
                        variant: "ghost",
                        icon: "heroicons:x-mark-20-solid",
                        onClick: ($event) => showPreviewModal.value = false
                      }, null, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_FormPreview, {
                    form: unref(form),
                    fields: unref(form).fields || [],
                    "full-preview": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_FormPreview, {
                      form: unref(form),
                      fields: unref(form).fields || [],
                      "full-preview": ""
                    }, null, 8, ["form", "fields"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, null, {
                header: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("h3", { class: "text-lg font-semibold" }, "Preview do Formul\xE1rio"),
                    createVNode(_component_UButton, {
                      color: "gray",
                      variant: "ghost",
                      icon: "heroicons:x-mark-20-solid",
                      onClick: ($event) => showPreviewModal.value = false
                    }, null, 8, ["onClick"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode(_component_FormPreview, {
                    form: unref(form),
                    fields: unref(form).fields || [],
                    "full-preview": ""
                  }, null, 8, ["form", "fields"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/eventos/[eventId]/formulario.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=formulario-B3Dd01CF.mjs.map
