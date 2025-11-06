import { _ as _sfc_main$1 } from './Card-C4nTXWY5.mjs';
import { a as _sfc_main$4, _ as _sfc_main$4$1 } from './Button-DBP0kIks.mjs';
import { _ as _sfc_main$2 } from './Form-Do9OiOUk.mjs';
import { _ as _sfc_main$3 } from './Input-BWoDpkpH.mjs';
import { _ as _sfc_main$5 } from './Badge-BqObA7Dt.mjs';
import { defineComponent, ref, reactive, resolveComponent, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { u as useToast } from './useToast-Bm7hVh5T.mjs';
import { u as useHead } from './server.mjs';
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
import './index-CaK0uLlx.mjs';
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
import './NuxtImg-Cuy0dNDg.mjs';
import './nuxt-link-D39KbEgs.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "status",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    useHead({
      title: "Status do Cadastro - AcessoCat\xF3lico",
      meta: [
        { name: "description", content: "Consulte o status do seu cadastro de padre na plataforma AcessoCat\xF3lico" }
      ]
    });
    const loading = ref(false);
    const searched = ref(false);
    const searchForm = reactive({
      email: "",
      cpf: ""
    });
    const registration = ref(null);
    const history = ref([]);
    async function searchRegistration() {
      var _a;
      if (!searchForm.email || !searchForm.cpf) {
        toast.add({
          title: "Campos obrigat\xF3rios",
          description: "Por favor, preencha email e CPF.",
          color: "red"
        });
        return;
      }
      loading.value = true;
      searched.value = true;
      registration.value = null;
      history.value = [];
      try {
        const response = await $fetch("/api/priests/search", {
          method: "POST",
          body: {
            email: searchForm.email,
            cpf: searchForm.cpf.replace(/\D/g, "")
            // Remove formatting
          }
        });
        if (response.success && response.data) {
          registration.value = response.data;
          if (registration.value.id) {
            await loadHistory();
          }
        }
      } catch (error) {
        console.error("Search error:", error);
        toast.add({
          title: "Erro na consulta",
          description: ((_a = error.data) == null ? void 0 : _a.message) || "N\xE3o foi poss\xEDvel consultar o cadastro.",
          color: "red"
        });
      } finally {
        loading.value = false;
      }
    }
    async function loadHistory() {
      var _a, _b;
      if (!((_a = registration.value) == null ? void 0 : _a.id)) return;
      try {
        const response = await $fetch(`/api/priests/history?registrationId=${registration.value.id}`);
        if (response.success && ((_b = response.data) == null ? void 0 : _b.history)) {
          history.value = response.data.history;
        }
      } catch (error) {
        console.error("Error loading history:", error);
      }
    }
    function formatCPF(event) {
      let value = event.target.value.replace(/\D/g, "");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      searchForm.cpf = value;
    }
    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    function formatStatus(status) {
      const statusMap = {
        PENDING: "Pendente",
        UNDER_REVIEW: "Em An\xE1lise",
        APPROVED: "Aprovado",
        REJECTED: "Rejeitado",
        REQUIRES_DOCUMENTATION: "Documenta\xE7\xE3o Necess\xE1ria"
      };
      return statusMap[status] || status;
    }
    function getStatusColor(status) {
      const colors = {
        PENDING: "amber",
        UNDER_REVIEW: "blue",
        APPROVED: "green",
        REJECTED: "red",
        REQUIRES_DOCUMENTATION: "orange"
      };
      return colors[status] || "gray";
    }
    function getTimelineIcon(status) {
      const icons = {
        PENDING: "i-heroicons-clock",
        UNDER_REVIEW: "i-heroicons-eye",
        APPROVED: "i-heroicons-check-circle",
        REJECTED: "i-heroicons-x-circle",
        REQUIRES_DOCUMENTATION: "i-heroicons-document-text"
      };
      return icons[status] || "i-heroicons-clock";
    }
    function getTimelineIconClass(status) {
      const classes = {
        PENDING: "bg-amber-100 text-amber-600",
        UNDER_REVIEW: "bg-blue-100 text-blue-600",
        APPROVED: "bg-green-100 text-green-600",
        REJECTED: "bg-red-100 text-red-600",
        REQUIRES_DOCUMENTATION: "bg-orange-100 text-orange-600"
      };
      return classes[status] || "bg-gray-100 text-gray-600";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$1;
      const _component_UIcon = _sfc_main$4$1;
      const _component_UForm = _sfc_main$2;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_UInput = _sfc_main$3;
      const _component_UButton = _sfc_main$4;
      const _component_UBadge = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12" }, _attrs))}><div class="max-w-4xl mx-auto px-4"><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-900 mb-4">Status do Cadastro</h1><p class="text-gray-600">Consulte o andamento do seu cadastro de padre</p></div>`);
      _push(ssrRenderComponent(_component_UCard, { class: "mb-8 shadow-lg" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-magnifying-glass",
              class: "w-5 h-5 text-purple-600"
            }, null, _parent2, _scopeId));
            _push2(`<h2 class="text-lg font-semibold"${_scopeId}>Consultar Status</h2></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-magnifying-glass",
                  class: "w-5 h-5 text-purple-600"
                }),
                createVNode("h2", { class: "text-lg font-semibold" }, "Consultar Status")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UForm, {
              onSubmit: searchRegistration,
              class: "space-y-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Email",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(searchForm).email,
                          "onUpdate:modelValue": ($event) => unref(searchForm).email = $event,
                          type: "email",
                          placeholder: "seu.email@exemplo.com",
                          disabled: unref(loading)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(searchForm).email,
                            "onUpdate:modelValue": ($event) => unref(searchForm).email = $event,
                            type: "email",
                            placeholder: "seu.email@exemplo.com",
                            disabled: unref(loading)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "CPF",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(searchForm).cpf,
                          "onUpdate:modelValue": ($event) => unref(searchForm).cpf = $event,
                          placeholder: "000.000.000-00",
                          disabled: unref(loading),
                          onInput: formatCPF
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(searchForm).cpf,
                            "onUpdate:modelValue": ($event) => unref(searchForm).cpf = $event,
                            placeholder: "000.000.000-00",
                            disabled: unref(loading),
                            onInput: formatCPF
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="flex justify-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "submit",
                    loading: unref(loading),
                    size: "lg",
                    icon: "i-heroicons-magnifying-glass"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Consultar Status `);
                      } else {
                        return [
                          createTextVNode(" Consultar Status ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      createVNode(_component_UFormGroup, {
                        label: "Email",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(searchForm).email,
                            "onUpdate:modelValue": ($event) => unref(searchForm).email = $event,
                            type: "email",
                            placeholder: "seu.email@exemplo.com",
                            disabled: unref(loading)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormGroup, {
                        label: "CPF",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(searchForm).cpf,
                            "onUpdate:modelValue": ($event) => unref(searchForm).cpf = $event,
                            placeholder: "000.000.000-00",
                            disabled: unref(loading),
                            onInput: formatCPF
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode(_component_UButton, {
                        type: "submit",
                        loading: unref(loading),
                        size: "lg",
                        icon: "i-heroicons-magnifying-glass"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Consultar Status ")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UForm, {
                onSubmit: searchRegistration,
                class: "space-y-4"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode(_component_UFormGroup, {
                      label: "Email",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(searchForm).email,
                          "onUpdate:modelValue": ($event) => unref(searchForm).email = $event,
                          type: "email",
                          placeholder: "seu.email@exemplo.com",
                          disabled: unref(loading)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "CPF",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(searchForm).cpf,
                          "onUpdate:modelValue": ($event) => unref(searchForm).cpf = $event,
                          placeholder: "000.000.000-00",
                          disabled: unref(loading),
                          onInput: formatCPF
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode(_component_UButton, {
                      type: "submit",
                      loading: unref(loading),
                      size: "lg",
                      icon: "i-heroicons-magnifying-glass"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Consultar Status ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(registration)) {
        _push(`<div class="space-y-6">`);
        _push(ssrRenderComponent(_component_UCard, { class: "shadow-lg" }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-user",
                class: "w-5 h-5 text-purple-600"
              }, null, _parent2, _scopeId));
              _push2(`<h2 class="text-lg font-semibold"${_scopeId}>Informa\xE7\xF5es do Cadastro</h2></div>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: getStatusColor(unref(registration).status),
                variant: "subtle",
                size: "lg"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(formatStatus(unref(registration).status))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(formatStatus(unref(registration).status)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-user",
                      class: "w-5 h-5 text-purple-600"
                    }),
                    createVNode("h2", { class: "text-lg font-semibold" }, "Informa\xE7\xF5es do Cadastro")
                  ]),
                  createVNode(_component_UBadge, {
                    color: getStatusColor(unref(registration).status),
                    variant: "subtle",
                    size: "lg"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(formatStatus(unref(registration).status)), 1)
                    ]),
                    _: 1
                  }, 8, ["color"])
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div class="space-y-3"${_scopeId}><div${_scopeId}><span class="text-sm font-medium text-gray-500"${_scopeId}>Nome Completo</span><p class="text-gray-900"${_scopeId}>${ssrInterpolate(unref(registration).firstName)} ${ssrInterpolate(unref(registration).lastName)}</p></div><div${_scopeId}><span class="text-sm font-medium text-gray-500"${_scopeId}>Email</span><p class="text-gray-900"${_scopeId}>${ssrInterpolate(unref(registration).email)}</p></div><div${_scopeId}><span class="text-sm font-medium text-gray-500"${_scopeId}>N\xFAmero de Ordena\xE7\xE3o</span><p class="text-gray-900"${_scopeId}>${ssrInterpolate(unref(registration).ordinationNumber)}</p></div></div><div class="space-y-3"${_scopeId}><div${_scopeId}><span class="text-sm font-medium text-gray-500"${_scopeId}>Diocese de Ordena\xE7\xE3o</span><p class="text-gray-900"${_scopeId}>${ssrInterpolate(unref(registration).ordinationDiocese.name)}</p></div><div${_scopeId}><span class="text-sm font-medium text-gray-500"${_scopeId}>Data de Cadastro</span><p class="text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(unref(registration).createdAt))}</p></div><div${_scopeId}><span class="text-sm font-medium text-gray-500"${_scopeId}>\xDAltima Atualiza\xE7\xE3o</span><p class="text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(unref(registration).statusUpdatedAt))}</p></div></div></div><div class="${ssrRenderClass([unref(registration).emailVerified ? "bg-green-50" : "bg-yellow-50", "mt-6 p-4 rounded-lg"])}"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: unref(registration).emailVerified ? "i-heroicons-check-circle" : "i-heroicons-exclamation-triangle",
                class: [unref(registration).emailVerified ? "text-green-600" : "text-yellow-600", "w-5 h-5"]
              }, null, _parent2, _scopeId));
              _push2(`<div${_scopeId}><p class="${ssrRenderClass([unref(registration).emailVerified ? "text-green-900" : "text-yellow-900", "font-medium"])}"${_scopeId}>${ssrInterpolate(unref(registration).emailVerified ? "Email Verificado" : "Email N\xE3o Verificado")}</p><p class="${ssrRenderClass([unref(registration).emailVerified ? "text-green-700" : "text-yellow-700", "text-sm"])}"${_scopeId}>${ssrInterpolate(unref(registration).emailVerified ? "Seu email foi confirmado com sucesso." : "Verifique sua caixa de entrada e confirme seu email.")}</p></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                  createVNode("div", { class: "space-y-3" }, [
                    createVNode("div", null, [
                      createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Nome Completo"),
                      createVNode("p", { class: "text-gray-900" }, toDisplayString(unref(registration).firstName) + " " + toDisplayString(unref(registration).lastName), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Email"),
                      createVNode("p", { class: "text-gray-900" }, toDisplayString(unref(registration).email), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "text-sm font-medium text-gray-500" }, "N\xFAmero de Ordena\xE7\xE3o"),
                      createVNode("p", { class: "text-gray-900" }, toDisplayString(unref(registration).ordinationNumber), 1)
                    ])
                  ]),
                  createVNode("div", { class: "space-y-3" }, [
                    createVNode("div", null, [
                      createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Diocese de Ordena\xE7\xE3o"),
                      createVNode("p", { class: "text-gray-900" }, toDisplayString(unref(registration).ordinationDiocese.name), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Data de Cadastro"),
                      createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDate(unref(registration).createdAt)), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("span", { class: "text-sm font-medium text-gray-500" }, "\xDAltima Atualiza\xE7\xE3o"),
                      createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDate(unref(registration).statusUpdatedAt)), 1)
                    ])
                  ])
                ]),
                createVNode("div", {
                  class: ["mt-6 p-4 rounded-lg", unref(registration).emailVerified ? "bg-green-50" : "bg-yellow-50"]
                }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode(_component_UIcon, {
                      name: unref(registration).emailVerified ? "i-heroicons-check-circle" : "i-heroicons-exclamation-triangle",
                      class: [unref(registration).emailVerified ? "text-green-600" : "text-yellow-600", "w-5 h-5"]
                    }, null, 8, ["name", "class"]),
                    createVNode("div", null, [
                      createVNode("p", {
                        class: ["font-medium", unref(registration).emailVerified ? "text-green-900" : "text-yellow-900"]
                      }, toDisplayString(unref(registration).emailVerified ? "Email Verificado" : "Email N\xE3o Verificado"), 3),
                      createVNode("p", {
                        class: ["text-sm", unref(registration).emailVerified ? "text-green-700" : "text-yellow-700"]
                      }, toDisplayString(unref(registration).emailVerified ? "Seu email foi confirmado com sucesso." : "Verifique sua caixa de entrada e confirme seu email."), 3)
                    ])
                  ])
                ], 2)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UCard, { class: "shadow-lg" }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-clock",
                class: "w-5 h-5 text-purple-600"
              }, null, _parent2, _scopeId));
              _push2(`<h2 class="text-lg font-semibold"${_scopeId}>Hist\xF3rico do Processo</h2></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-3" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-clock",
                    class: "w-5 h-5 text-purple-600"
                  }),
                  createVNode("h2", { class: "text-lg font-semibold" }, "Hist\xF3rico do Processo")
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b;
            if (_push2) {
              if (unref(loading)) {
                _push2(`<div class="flex justify-center py-8"${_scopeId}><div class="animate-spin w-8 h-8"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-full h-full text-purple-600"
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else if ((_a = unref(history)) == null ? void 0 : _a.length) {
                _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
                ssrRenderList(unref(history), (item, index) => {
                  _push2(`<div class="${ssrRenderClass([{ "border-b": index < unref(history).length - 1 }, "flex gap-4 pb-4"])}"${_scopeId}><div class="flex flex-col items-center"${_scopeId}><div class="${ssrRenderClass([getTimelineIconClass(item.toStatus), "w-8 h-8 rounded-full flex items-center justify-center"])}"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: getTimelineIcon(item.toStatus),
                    class: "w-4 h-4"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                  if (index < unref(history).length - 1) {
                    _push2(`<div class="w-0.5 h-8 bg-gray-200 mt-2"${_scopeId}></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><div class="flex items-center gap-2 mb-1"${_scopeId}><span class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatStatus(item.toStatus))}</span><span class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(item.createdAt))}</span></div>`);
                  if (item.comments) {
                    _push2(`<p class="text-sm text-gray-600 mb-2"${_scopeId}>${ssrInterpolate(item.comments)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (item.adminEmail) {
                    _push2(`<p class="text-xs text-gray-500"${_scopeId}> Processado por: ${ssrInterpolate(item.adminEmail)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="text-center py-8 text-gray-500"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-clock",
                  class: "w-12 h-12 mx-auto mb-3 text-gray-300"
                }, null, _parent2, _scopeId));
                _push2(`<p${_scopeId}>Nenhum hist\xF3rico dispon\xEDvel ainda</p></div>`);
              }
            } else {
              return [
                unref(loading) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex justify-center py-8"
                }, [
                  createVNode("div", { class: "animate-spin w-8 h-8" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-path",
                      class: "w-full h-full text-purple-600"
                    })
                  ])
                ])) : ((_b = unref(history)) == null ? void 0 : _b.length) ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-4"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(history), (item, index) => {
                    return openBlock(), createBlock("div", {
                      key: item.id,
                      class: ["flex gap-4 pb-4", { "border-b": index < unref(history).length - 1 }]
                    }, [
                      createVNode("div", { class: "flex flex-col items-center" }, [
                        createVNode("div", {
                          class: ["w-8 h-8 rounded-full flex items-center justify-center", getTimelineIconClass(item.toStatus)]
                        }, [
                          createVNode(_component_UIcon, {
                            name: getTimelineIcon(item.toStatus),
                            class: "w-4 h-4"
                          }, null, 8, ["name"])
                        ], 2),
                        index < unref(history).length - 1 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "w-0.5 h-8 bg-gray-200 mt-2"
                        })) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                          createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(formatStatus(item.toStatus)), 1),
                          createVNode("span", { class: "text-sm text-gray-500" }, toDisplayString(formatDate(item.createdAt)), 1)
                        ]),
                        item.comments ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-gray-600 mb-2"
                        }, toDisplayString(item.comments), 1)) : createCommentVNode("", true),
                        item.adminEmail ? (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-xs text-gray-500"
                        }, " Processado por: " + toDisplayString(item.adminEmail), 1)) : createCommentVNode("", true)
                      ])
                    ], 2);
                  }), 128))
                ])) : (openBlock(), createBlock("div", {
                  key: 2,
                  class: "text-center py-8 text-gray-500"
                }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-clock",
                    class: "w-12 h-12 mx-auto mb-3 text-gray-300"
                  }),
                  createVNode("p", null, "Nenhum hist\xF3rico dispon\xEDvel ainda")
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UCard, { class: "shadow-lg" }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-right",
                class: "w-5 h-5 text-purple-600"
              }, null, _parent2, _scopeId));
              _push2(`<h2 class="text-lg font-semibold"${_scopeId}>Pr\xF3ximos Passos</h2></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-3" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-arrow-right",
                    class: "w-5 h-5 text-purple-600"
                  }),
                  createVNode("h2", { class: "text-lg font-semibold" }, "Pr\xF3ximos Passos")
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="prose max-w-none"${_scopeId}>`);
              if (unref(registration).status === "PENDING") {
                _push2(`<div${_scopeId}><p class="text-gray-600 mb-4"${_scopeId}>Seu cadastro foi recebido e est\xE1 na fila para an\xE1lise.</p><ul class="list-disc list-inside space-y-2 text-sm text-gray-600"${_scopeId}><li${_scopeId}>Confirme seu email se ainda n\xE3o o fez</li><li${_scopeId}>Aguarde a an\xE1lise da nossa equipe (2-3 dias \xFAteis)</li><li${_scopeId}>Voc\xEA receber\xE1 notifica\xE7\xF5es por email sobre mudan\xE7as de status</li></ul></div>`);
              } else if (unref(registration).status === "UNDER_REVIEW") {
                _push2(`<div${_scopeId}><p class="text-gray-600 mb-4"${_scopeId}>Sua documenta\xE7\xE3o est\xE1 sendo analisada pela nossa equipe.</p><ul class="list-disc list-inside space-y-2 text-sm text-gray-600"${_scopeId}><li${_scopeId}>Nossa equipe est\xE1 verificando seus documentos</li><li${_scopeId}>Tempo estimado: 2-3 dias \xFAteis</li><li${_scopeId}>Voc\xEA receber\xE1 um email com o resultado</li></ul></div>`);
              } else if (unref(registration).status === "APPROVED") {
                _push2(`<div${_scopeId}><div class="bg-green-50 p-4 rounded-lg"${_scopeId}><p class="text-green-800 font-medium mb-2"${_scopeId}>\u{1F389} Parab\xE9ns! Seu cadastro foi aprovado!</p><ul class="list-disc list-inside space-y-2 text-sm text-green-700"${_scopeId}><li${_scopeId}>Voc\xEA deve ter recebido um email com suas credenciais de acesso</li><li${_scopeId}>Acesse a plataforma e complete seu perfil</li><li${_scopeId}>Conecte-se \xE0 sua par\xF3quia</li></ul></div></div>`);
              } else if (unref(registration).status === "REJECTED") {
                _push2(`<div${_scopeId}><div class="bg-red-50 p-4 rounded-lg"${_scopeId}><p class="text-red-800 font-medium mb-2"${_scopeId}>Cadastro necessita corre\xE7\xF5es</p><ul class="list-disc list-inside space-y-2 text-sm text-red-700"${_scopeId}><li${_scopeId}>Verifique os coment\xE1rios da nossa equipe</li><li${_scopeId}>Corrija as informa\xE7\xF5es necess\xE1rias</li><li${_scopeId}>Reenvie sua documenta\xE7\xE3o</li></ul></div></div>`);
              } else if (unref(registration).status === "REQUIRES_DOCUMENTATION") {
                _push2(`<div${_scopeId}><div class="bg-yellow-50 p-4 rounded-lg"${_scopeId}><p class="text-yellow-800 font-medium mb-2"${_scopeId}>Documenta\xE7\xE3o adicional necess\xE1ria</p><ul class="list-disc list-inside space-y-2 text-sm text-yellow-700"${_scopeId}><li${_scopeId}>Alguns documentos precisam ser atualizados</li><li${_scopeId}>Verifique os coment\xE1rios espec\xEDficos</li><li${_scopeId}>Reenvie apenas os documentos solicitados</li></ul></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "prose max-w-none" }, [
                  unref(registration).status === "PENDING" ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("p", { class: "text-gray-600 mb-4" }, "Seu cadastro foi recebido e est\xE1 na fila para an\xE1lise."),
                    createVNode("ul", { class: "list-disc list-inside space-y-2 text-sm text-gray-600" }, [
                      createVNode("li", null, "Confirme seu email se ainda n\xE3o o fez"),
                      createVNode("li", null, "Aguarde a an\xE1lise da nossa equipe (2-3 dias \xFAteis)"),
                      createVNode("li", null, "Voc\xEA receber\xE1 notifica\xE7\xF5es por email sobre mudan\xE7as de status")
                    ])
                  ])) : unref(registration).status === "UNDER_REVIEW" ? (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("p", { class: "text-gray-600 mb-4" }, "Sua documenta\xE7\xE3o est\xE1 sendo analisada pela nossa equipe."),
                    createVNode("ul", { class: "list-disc list-inside space-y-2 text-sm text-gray-600" }, [
                      createVNode("li", null, "Nossa equipe est\xE1 verificando seus documentos"),
                      createVNode("li", null, "Tempo estimado: 2-3 dias \xFAteis"),
                      createVNode("li", null, "Voc\xEA receber\xE1 um email com o resultado")
                    ])
                  ])) : unref(registration).status === "APPROVED" ? (openBlock(), createBlock("div", { key: 2 }, [
                    createVNode("div", { class: "bg-green-50 p-4 rounded-lg" }, [
                      createVNode("p", { class: "text-green-800 font-medium mb-2" }, "\u{1F389} Parab\xE9ns! Seu cadastro foi aprovado!"),
                      createVNode("ul", { class: "list-disc list-inside space-y-2 text-sm text-green-700" }, [
                        createVNode("li", null, "Voc\xEA deve ter recebido um email com suas credenciais de acesso"),
                        createVNode("li", null, "Acesse a plataforma e complete seu perfil"),
                        createVNode("li", null, "Conecte-se \xE0 sua par\xF3quia")
                      ])
                    ])
                  ])) : unref(registration).status === "REJECTED" ? (openBlock(), createBlock("div", { key: 3 }, [
                    createVNode("div", { class: "bg-red-50 p-4 rounded-lg" }, [
                      createVNode("p", { class: "text-red-800 font-medium mb-2" }, "Cadastro necessita corre\xE7\xF5es"),
                      createVNode("ul", { class: "list-disc list-inside space-y-2 text-sm text-red-700" }, [
                        createVNode("li", null, "Verifique os coment\xE1rios da nossa equipe"),
                        createVNode("li", null, "Corrija as informa\xE7\xF5es necess\xE1rias"),
                        createVNode("li", null, "Reenvie sua documenta\xE7\xE3o")
                      ])
                    ])
                  ])) : unref(registration).status === "REQUIRES_DOCUMENTATION" ? (openBlock(), createBlock("div", { key: 4 }, [
                    createVNode("div", { class: "bg-yellow-50 p-4 rounded-lg" }, [
                      createVNode("p", { class: "text-yellow-800 font-medium mb-2" }, "Documenta\xE7\xE3o adicional necess\xE1ria"),
                      createVNode("ul", { class: "list-disc list-inside space-y-2 text-sm text-yellow-700" }, [
                        createVNode("li", null, "Alguns documentos precisam ser atualizados"),
                        createVNode("li", null, "Verifique os coment\xE1rios espec\xEDficos"),
                        createVNode("li", null, "Reenvie apenas os documentos solicitados")
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (unref(searched) && !unref(registration)) {
        _push(ssrRenderComponent(_component_UCard, { class: "shadow-lg" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-center py-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-magnifying-glass-minus",
                class: "w-16 h-16 mx-auto text-gray-300 mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-lg font-semibold text-gray-900 mb-2"${_scopeId}>Cadastro n\xE3o encontrado</h3><p class="text-gray-600 mb-6"${_scopeId}> N\xE3o encontramos nenhum cadastro com os dados informados. </p><div class="space-y-2 text-sm text-gray-500"${_scopeId}><p${_scopeId}>\u2022 Verifique se o email e CPF est\xE3o corretos</p><p${_scopeId}>\u2022 Certifique-se de que o cadastro foi submetido</p></div></div>`);
            } else {
              return [
                createVNode("div", { class: "text-center py-8" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-magnifying-glass-minus",
                    class: "w-16 h-16 mx-auto text-gray-300 mb-4"
                  }),
                  createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-2" }, "Cadastro n\xE3o encontrado"),
                  createVNode("p", { class: "text-gray-600 mb-6" }, " N\xE3o encontramos nenhum cadastro com os dados informados. "),
                  createVNode("div", { class: "space-y-2 text-sm text-gray-500" }, [
                    createVNode("p", null, "\u2022 Verifique se o email e CPF est\xE3o corretos"),
                    createVNode("p", null, "\u2022 Certifique-se de que o cadastro foi submetido")
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cadastro/padre/status.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=status-CsDCkzAI.mjs.map
