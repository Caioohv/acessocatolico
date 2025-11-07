import { a as _sfc_main$1 } from './Button-BeuMp5nt.mjs';
import __nuxt_component_1 from './index-B5rpN8hp.mjs';
import { _ as _sfc_main$2 } from './Input-CMCaI9pM.mjs';
import { _ as _sfc_main$3 } from './SelectMenu-C0_KlmQW.mjs';
import { _ as _sfc_main$4 } from './Skeleton-BtGZGGaO.mjs';
import { _ as _sfc_main$5 } from './Badge-CL_R2lGZ.mjs';
import { _ as _sfc_main$6 } from './Pagination-CBK9bYDh.mjs';
import { ref, computed, watch, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useToast } from './useToast-Bm7hVh5T.mjs';
import { u as useEventForms } from './useEventForms-NvlLQMyl.mjs';
import { n as navigateTo } from './server.mjs';
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
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import './NuxtImg-DFTKHYRn.mjs';
import './nuxt-link-Bn_O9NYZ.mjs';
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
import './useLocale-CtluvDKB.mjs';
import './usePortal-BbZPQQY_.mjs';
import './Chip-DwZPpwbq.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { showToast } = useToast();
    const { createEventForm: createFormAPI } = useEventForms();
    const loading = ref(true);
    const creatingForm = ref(null);
    const events = ref([]);
    const filters = ref({
      search: "",
      status: "",
      formStatus: ""
    });
    const pagination = ref({
      page: 1,
      limit: 10,
      total: 0
    });
    const statusOptions = [
      { value: "", label: "Todos os status" },
      { value: "DRAFT", label: "Rascunho" },
      { value: "PUBLISHED", label: "Publicado" },
      { value: "CANCELLED", label: "Cancelado" },
      { value: "COMPLETED", label: "Finalizado" }
    ];
    const formStatusOptions = [
      { value: "", label: "Todos" },
      { value: "with_form", label: "Com formul\xE1rio" },
      { value: "without_form", label: "Sem formul\xE1rio" },
      { value: "active_form", label: "Formul\xE1rio ativo" },
      { value: "inactive_form", label: "Formul\xE1rio inativo" }
    ];
    const hasFilters = computed(() => {
      return filters.value.search || filters.value.status || filters.value.formStatus;
    });
    const debouncedSearch = useDebounceFn(() => {
      pagination.value.page = 1;
      loadEvents();
    }, 300);
    async function loadEvents() {
      try {
        loading.value = true;
        const params = new URLSearchParams({
          page: pagination.value.page.toString(),
          limit: pagination.value.limit.toString()
        });
        if (filters.value.search) params.append("search", filters.value.search);
        if (filters.value.status) params.append("status", filters.value.status);
        if (filters.value.formStatus) params.append("formStatus", filters.value.formStatus);
        const { data } = await $fetch(`/api/admin/events?${params}`);
        events.value = data.events;
        pagination.value.total = data.total;
      } catch (error) {
        console.error("Error loading events:", error);
        showToast("Erro ao carregar eventos", "error");
      } finally {
        loading.value = false;
      }
    }
    function getEventActions(event) {
      return [
        [{
          label: "Ver evento",
          icon: "heroicons:eye",
          click: () => navigateTo(`/eventos/${event.slug}`)
        }],
        [{
          label: "Editar evento",
          icon: "heroicons:pencil",
          click: () => navigateTo(`/eventos/${event.slug}/editar`)
        }],
        [{
          label: "Ver inscri\xE7\xF5es",
          icon: "heroicons:users",
          click: () => navigateTo(`/admin/eventos/${event.id}/inscricoes`),
          disabled: !event.form
        }]
      ];
    }
    function getFormActions(event) {
      return [
        [{
          label: "Configurar formul\xE1rio",
          icon: "heroicons:cog-6-tooth",
          click: () => navigateTo(`/admin/eventos/${event.id}/formulario`)
        }],
        [{
          label: "Ver inscri\xE7\xF5es",
          icon: "heroicons:users",
          click: () => navigateTo(`/admin/eventos/${event.id}/inscricoes`)
        }],
        [{
          label: "Exportar inscri\xE7\xF5es",
          icon: "heroicons:arrow-down-tray",
          click: () => exportSubmissions(event.id)
        }]
      ];
    }
    async function createEventForm(eventId) {
      try {
        creatingForm.value = eventId;
        const result = await createFormAPI(eventId, {
          title: "Formul\xE1rio de Inscri\xE7\xE3o",
          isActive: false
        });
        if (result.success) {
          showToast("Formul\xE1rio criado com sucesso!", "success");
          await loadEvents();
          navigateTo(`/admin/eventos/${eventId}/formulario`);
        }
      } catch (error) {
        console.error("Error creating form:", error);
        showToast("Erro ao criar formul\xE1rio", "error");
      } finally {
        creatingForm.value = null;
      }
    }
    async function exportSubmissions(eventId) {
      try {
        const response = await $fetch(`/api/events/${eventId}/form/export`, {
          method: "GET"
        });
        const blob = new Blob([response], { type: "text/csv" });
        const url = (void 0).URL.createObjectURL(blob);
        const a = (void 0).createElement("a");
        a.href = url;
        a.download = `inscricoes-evento-${eventId}.csv`;
        (void 0).body.appendChild(a);
        a.click();
        (void 0).body.removeChild(a);
        (void 0).URL.revokeObjectURL(url);
        showToast("Arquivo exportado com sucesso!", "success");
      } catch (error) {
        console.error("Error exporting submissions:", error);
        showToast("Erro ao exportar inscri\xE7\xF5es", "error");
      }
    }
    function getEventStatusColor(status) {
      const colors = {
        DRAFT: "yellow",
        PUBLISHED: "green",
        CANCELLED: "red",
        COMPLETED: "blue"
      };
      return colors[status] || "gray";
    }
    function getEventStatusLabel(status) {
      const labels = {
        DRAFT: "Rascunho",
        PUBLISHED: "Publicado",
        CANCELLED: "Cancelado",
        COMPLETED: "Finalizado"
      };
      return labels[status] || status;
    }
    function formatEventDate(startDate, endDate) {
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : null;
      const formatDate = (date) => date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
      if (end && start.toDateString() !== end.toDateString()) {
        return `${formatDate(start)} - ${formatDate(end)}`;
      }
      return formatDate(start);
    }
    function refreshEvents() {
      loadEvents();
    }
    function clearFilters() {
      filters.value = {
        search: "",
        status: "",
        formStatus: ""
      };
      pagination.value.page = 1;
      loadEvents();
    }
    watch(
      () => [filters.value.status, filters.value.formStatus],
      () => {
        pagination.value.page = 1;
        loadEvents();
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      const _component_Icon = __nuxt_component_1;
      const _component_UInput = _sfc_main$2;
      const _component_USelectMenu = _sfc_main$3;
      const _component_USkeleton = _sfc_main$4;
      const _component_UBadge = _sfc_main$5;
      const _component_UDropdown = resolveComponent("UDropdown");
      const _component_UPagination = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><div class="bg-white border-b border-gray-200"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between py-6"><div><h1 class="text-2xl font-bold text-gray-900"> Administra\xE7\xE3o de Eventos </h1><p class="text-sm text-gray-600 mt-1"> Gerencie eventos e seus formul\xE1rios de inscri\xE7\xE3o </p></div><div class="flex items-center space-x-3">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        color: "gray",
        onClick: refreshEvents,
        loading: unref(loading)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:arrow-path",
              class: "h-4 w-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Atualizar `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:arrow-path",
                class: "h-4 w-4 mr-2"
              }),
              createTextVNode(" Atualizar ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        to: "/eventos/criar"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:plus",
              class: "h-4 w-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Novo Evento `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:plus",
                class: "h-4 w-4 mr-2"
              }),
              createTextVNode(" Novo Evento ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="bg-white rounded-lg border border-gray-200 p-4 mb-6"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Buscar eventos </label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(filters).search,
        "onUpdate:modelValue": ($event) => unref(filters).search = $event,
        placeholder: "Nome, descri\xE7\xE3o...",
        icon: "heroicons:magnifying-glass",
        onInput: unref(debouncedSearch)
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Status do evento </label>`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: unref(filters).status,
        "onUpdate:modelValue": ($event) => unref(filters).status = $event,
        options: statusOptions,
        placeholder: "Todos os status"
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Formul\xE1rio </label>`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: unref(filters).formStatus,
        "onUpdate:modelValue": ($event) => unref(filters).formStatus = $event,
        options: formStatusOptions,
        placeholder: "Todos"
      }, null, _parent));
      _push(`</div><div class="flex items-end">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        color: "gray",
        onClick: clearFilters,
        class: "w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:x-mark",
              class: "h-4 w-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Limpar filtros `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:x-mark",
                class: "h-4 w-4 mr-2"
              }),
              createTextVNode(" Limpar filtros ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      if (unref(loading)) {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="bg-white rounded-lg border border-gray-200 p-6">`);
          _push(ssrRenderComponent(_component_USkeleton, { class: "h-6 w-1/3 mb-3" }, null, _parent));
          _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-2/3 mb-2" }, null, _parent));
          _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-1/2" }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(events).length === 0) {
        _push(`<div class="text-center py-12 bg-white rounded-lg border border-gray-200">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:calendar-days",
          class: "h-12 w-12 mx-auto mb-4 text-gray-300"
        }, null, _parent));
        _push(`<h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum evento encontrado</h3><p class="text-gray-600 mb-6">${ssrInterpolate(unref(hasFilters) ? "Tente ajustar os filtros de busca" : "Comece criando seu primeiro evento")}</p>`);
        if (!unref(hasFilters)) {
          _push(ssrRenderComponent(_component_UButton, {
            color: "primary",
            to: "/eventos/criar"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "heroicons:plus",
                  class: "h-4 w-4 mr-2"
                }, null, _parent2, _scopeId));
                _push2(` Criar Evento `);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "heroicons:plus",
                    class: "h-4 w-4 mr-2"
                  }),
                  createTextVNode(" Criar Evento ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(events), (event) => {
          var _a;
          _push(`<div class="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 transition-colors"><div class="flex items-start justify-between"><div class="flex-1 min-w-0"><div class="flex items-center space-x-3 mb-2"><h3 class="text-lg font-semibold text-gray-900 truncate">${ssrInterpolate(event.title)}</h3>`);
          _push(ssrRenderComponent(_component_UBadge, {
            color: getEventStatusColor(event.status),
            variant: "subtle"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(getEventStatusLabel(event.status))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(getEventStatusLabel(event.status)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          if (event.form) {
            _push(ssrRenderComponent(_component_UBadge, {
              color: event.form.isActive ? "green" : "gray",
              variant: "subtle"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_Icon, {
                    name: event.form.isActive ? "heroicons:check-circle" : "heroicons:x-circle",
                    class: "h-3 w-3 mr-1"
                  }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(event.form.isActive ? "Form Ativo" : "Form Inativo")}`);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: event.form.isActive ? "heroicons:check-circle" : "heroicons:x-circle",
                      class: "h-3 w-3 mr-1"
                    }, null, 8, ["name"]),
                    createTextVNode(" " + toDisplayString(event.form.isActive ? "Form Ativo" : "Form Inativo"), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(ssrRenderComponent(_component_UBadge, {
              color: "yellow",
              variant: "subtle"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_Icon, {
                    name: "heroicons:exclamation-triangle",
                    class: "h-3 w-3 mr-1"
                  }, null, _parent2, _scopeId));
                  _push2(` Sem formul\xE1rio `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "heroicons:exclamation-triangle",
                      class: "h-3 w-3 mr-1"
                    }),
                    createTextVNode(" Sem formul\xE1rio ")
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          _push(`</div><p class="text-gray-600 text-sm mb-3 line-clamp-2">${ssrInterpolate(event.description)}</p><div class="flex items-center space-x-6 text-sm text-gray-500"><div class="flex items-center space-x-1">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:calendar-days",
            class: "h-4 w-4"
          }, null, _parent));
          _push(`<span>${ssrInterpolate(formatEventDate(event.startDate, event.endDate))}</span></div><div class="flex items-center space-x-1">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:map-pin",
            class: "h-4 w-4"
          }, null, _parent));
          _push(`<span>${ssrInterpolate(event.location || "Local n\xE3o definido")}</span></div>`);
          if (event.maxParticipants) {
            _push(`<div class="flex items-center space-x-1">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:users",
              class: "h-4 w-4"
            }, null, _parent));
            _push(`<span>${ssrInterpolate(((_a = event._count) == null ? void 0 : _a.registrations) || 0)}/${ssrInterpolate(event.maxParticipants)} inscritos</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="flex items-center space-x-2 ml-4">`);
          if (event.form) {
            _push(ssrRenderComponent(_component_UDropdown, {
              items: getFormActions(event),
              popper: { placement: "bottom-end" }
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_UButton, {
                    variant: "outline",
                    color: "blue",
                    "trailing-icon": "heroicons:chevron-down-20-solid"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_component_Icon, {
                          name: "heroicons:document-text",
                          class: "h-4 w-4 mr-2"
                        }, null, _parent3, _scopeId2));
                        _push3(` Formul\xE1rio `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "heroicons:document-text",
                            class: "h-4 w-4 mr-2"
                          }),
                          createTextVNode(" Formul\xE1rio ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      variant: "outline",
                      color: "blue",
                      "trailing-icon": "heroicons:chevron-down-20-solid"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "heroicons:document-text",
                          class: "h-4 w-4 mr-2"
                        }),
                        createTextVNode(" Formul\xE1rio ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(ssrRenderComponent(_component_UButton, {
              variant: "outline",
              color: "blue",
              onClick: ($event) => createEventForm(event.id),
              loading: unref(creatingForm) === event.id
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_Icon, {
                    name: "heroicons:plus",
                    class: "h-4 w-4 mr-2"
                  }, null, _parent2, _scopeId));
                  _push2(` Criar Formul\xE1rio `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "heroicons:plus",
                      class: "h-4 w-4 mr-2"
                    }),
                    createTextVNode(" Criar Formul\xE1rio ")
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          _push(ssrRenderComponent(_component_UDropdown, {
            items: getEventActions(event),
            popper: { placement: "bottom-end" }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UButton, {
                  variant: "outline",
                  color: "gray",
                  "trailing-icon": "heroicons:chevron-down-20-solid"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_Icon, {
                        name: "heroicons:cog-6-tooth",
                        class: "h-4 w-4 mr-2"
                      }, null, _parent3, _scopeId2));
                      _push3(` A\xE7\xF5es `);
                    } else {
                      return [
                        createVNode(_component_Icon, {
                          name: "heroicons:cog-6-tooth",
                          class: "h-4 w-4 mr-2"
                        }),
                        createTextVNode(" A\xE7\xF5es ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UButton, {
                    variant: "outline",
                    color: "gray",
                    "trailing-icon": "heroicons:chevron-down-20-solid"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "heroicons:cog-6-tooth",
                        class: "h-4 w-4 mr-2"
                      }),
                      createTextVNode(" A\xE7\xF5es ")
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (unref(events).length > 0) {
        _push(`<div class="mt-8 flex items-center justify-between"><div class="text-sm text-gray-700"> Mostrando ${ssrInterpolate((unref(pagination).page - 1) * unref(pagination).limit + 1)} at\xE9 ${ssrInterpolate(Math.min(unref(pagination).page * unref(pagination).limit, unref(pagination).total))} de ${ssrInterpolate(unref(pagination).total)} eventos </div>`);
        _push(ssrRenderComponent(_component_UPagination, {
          modelValue: unref(pagination).page,
          "onUpdate:modelValue": [($event) => unref(pagination).page = $event, loadEvents],
          "page-count": unref(pagination).limit,
          total: unref(pagination).total
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/eventos/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C4LRELeX.mjs.map
