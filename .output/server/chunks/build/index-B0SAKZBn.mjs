import __nuxt_component_1 from './index-B5rpN8hp.mjs';
import { a as _sfc_main$1 } from './Button-BeuMp5nt.mjs';
import { _ as _sfc_main$2 } from './Input-CMCaI9pM.mjs';
import { _ as _sfc_main$3 } from './SelectMenu-C0_KlmQW.mjs';
import { _ as _sfc_main$4 } from './Badge-CL_R2lGZ.mjs';
import { _ as _sfc_main$5 } from './Pagination-CBK9bYDh.mjs';
import { _ as _sfc_main$6 } from './Modal-CzBe1f86.mjs';
import { _ as _sfc_main$7 } from './Textarea-0gyuVVm7.mjs';
import { defineComponent, ref, reactive, watch, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, b as useSeoMeta } from './server.mjs';
import { u as usePriest } from './usePriest-8ZW8YgP9.mjs';
import { u as useToast } from './useToast-Bm7hVh5T.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
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
import './nuxt-link-Bn_O9NYZ.mjs';
import './useLocale-CtluvDKB.mjs';
import './usePortal-BbZPQQY_.mjs';
import './Chip-DwZPpwbq.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Painel Administrativo - Cadastro de Padres",
      description: "Gerencie e aprove cadastros de padres na plataforma AcessoCat\xF3lico."
    });
    const { getRegistrations, updateStatus, formatStatus, getStatusColor } = usePriest();
    const toast = useToast();
    const loading = ref(false);
    const refreshing = ref(false);
    const updatingStatus = ref(false);
    const currentPage = ref(1);
    const registrations = ref([]);
    const pagination = ref(null);
    const stats = ref({
      pending: 0,
      underReview: 0,
      approved: 0,
      rejected: 0
    });
    const filters = reactive({
      search: "",
      status: ""
    });
    const statusModal = reactive({
      isOpen: false,
      registration: null,
      newStatus: "",
      comments: ""
    });
    const statusOptions = [
      { label: "Todos os status", value: "" },
      { label: "Pendente", value: "PENDING" },
      { label: "Em An\xE1lise", value: "UNDER_REVIEW" },
      { label: "Aprovado", value: "APPROVED" },
      { label: "Rejeitado", value: "REJECTED" },
      { label: "Requer Documenta\xE7\xE3o", value: "REQUIRES_DOCUMENTATION" }
    ];
    const statusUpdateOptions = [
      { label: "Em An\xE1lise", value: "UNDER_REVIEW" },
      { label: "Aprovar", value: "APPROVED" },
      { label: "Rejeitar", value: "REJECTED" },
      { label: "Solicitar Documenta\xE7\xE3o", value: "REQUIRES_DOCUMENTATION" }
    ];
    const fetchRegistrations = async () => {
      loading.value = true;
      try {
        const params = {
          page: currentPage.value,
          limit: 10
        };
        if (filters.status) {
          params.status = filters.status;
        }
        if (filters.search.trim()) {
          params.search = filters.search.trim();
        }
        const result = await getRegistrations(params);
        registrations.value = result.registrations;
        pagination.value = result.pagination;
        updateStats();
      } catch (error) {
        toast.add({
          title: "Erro ao carregar dados",
          description: error.message,
          color: "ui"
        });
      } finally {
        loading.value = false;
      }
    };
    const updateStats = async () => {
      try {
        const [pending, underReview, approved, rejected] = await Promise.all([
          getRegistrations({ status: "PENDING", limit: 1 }),
          getRegistrations({ status: "UNDER_REVIEW", limit: 1 }),
          getRegistrations({ status: "APPROVED", limit: 1 }),
          getRegistrations({ status: "REJECTED", limit: 1 })
        ]);
        stats.value = {
          pending: pending.pagination.total,
          underReview: underReview.pagination.total,
          approved: approved.pagination.total,
          rejected: rejected.pagination.total
        };
      } catch (error) {
        console.error("Error updating stats:", error);
      }
    };
    const refreshData = async () => {
      refreshing.value = true;
      try {
        await fetchRegistrations();
      } finally {
        refreshing.value = false;
      }
    };
    const debouncedSearch = useDebounceFn(() => {
      currentPage.value = 1;
      fetchRegistrations();
    }, 500);
    const handlePageChange = (page) => {
      currentPage.value = page;
      fetchRegistrations();
    };
    const openStatusModal = (registration) => {
      statusModal.registration = registration;
      statusModal.newStatus = "";
      statusModal.comments = "";
      statusModal.isOpen = true;
    };
    const updateRegistrationStatus = async () => {
      if (!statusModal.registration || !statusModal.newStatus) return;
      updatingStatus.value = true;
      try {
        await updateStatus(
          statusModal.registration.id,
          statusModal.newStatus,
          statusModal.comments || void 0,
          "admin@acessocatolico.com"
          // TODO: Get from auth context
        );
        toast.add({
          title: "Status atualizado",
          description: "O status do cadastro foi atualizado com sucesso.",
          color: "primary"
        });
        statusModal.isOpen = false;
        await fetchRegistrations();
      } catch (error) {
        toast.add({
          title: "Erro ao atualizar",
          description: error.message,
          color: "ui"
        });
      } finally {
        updatingStatus.value = false;
      }
    };
    const getActionItems = (registration) => [
      [{
        label: "Ver Detalhes",
        icon: "heroicons:eye",
        click: () => {
          console.log("View details:", registration.id);
        }
      }],
      [{
        label: "Atualizar Status",
        icon: "heroicons:pencil-square",
        click: () => openStatusModal(registration)
      }]
    ];
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("pt-BR");
    };
    const formatTime = (dateString) => {
      return new Date(dateString).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    watch(() => filters.status, () => {
      currentPage.value = 1;
      fetchRegistrations();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_UButton = _sfc_main$1;
      const _component_UInput = _sfc_main$2;
      const _component_USelectMenu = _sfc_main$3;
      const _component_UBadge = _sfc_main$4;
      const _component_UDropdown = resolveComponent("UDropdown");
      const _component_UPagination = _sfc_main$5;
      const _component_UModal = _sfc_main$6;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_UTextarea = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-priest-panel" }, _attrs))} data-v-8251081e><div class="panel-header" data-v-8251081e><div class="header-content" data-v-8251081e><div class="header-title" data-v-8251081e>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:users",
        class: "header-icon"
      }, null, _parent));
      _push(`<div data-v-8251081e><h1 data-v-8251081e>Gerenciamento de Padres</h1><p data-v-8251081e>Visualize e gerencie os cadastros de padres pendentes</p></div></div><div class="header-actions" data-v-8251081e>`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: refreshData,
        loading: unref(refreshing),
        variant: "outline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, { name: "heroicons:arrow-path" }, null, _parent2, _scopeId));
            _push2(` Atualizar `);
          } else {
            return [
              createVNode(_component_Icon, { name: "heroicons:arrow-path" }),
              createTextVNode(" Atualizar ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="filters-section" data-v-8251081e><div class="filters-row" data-v-8251081e>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(filters).search,
        "onUpdate:modelValue": ($event) => unref(filters).search = $event,
        placeholder: "Buscar por nome, email ou CPF...",
        icon: "heroicons:magnifying-glass",
        class: "search-input",
        onInput: unref(debouncedSearch)
      }, null, _parent));
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: unref(filters).status,
        "onUpdate:modelValue": [($event) => unref(filters).status = $event, fetchRegistrations],
        options: statusOptions,
        placeholder: "Todos os status",
        class: "status-filter"
      }, null, _parent));
      _push(`</div></div><div class="stats-grid" data-v-8251081e><div class="stat-card" data-v-8251081e><div class="stat-icon pending" data-v-8251081e>`);
      _push(ssrRenderComponent(_component_Icon, { name: "heroicons:clock" }, null, _parent));
      _push(`</div><div class="stat-content" data-v-8251081e><div class="stat-number" data-v-8251081e>${ssrInterpolate(unref(stats).pending)}</div><div class="stat-label" data-v-8251081e>Pendentes</div></div></div><div class="stat-card" data-v-8251081e><div class="stat-icon review" data-v-8251081e>`);
      _push(ssrRenderComponent(_component_Icon, { name: "heroicons:eye" }, null, _parent));
      _push(`</div><div class="stat-content" data-v-8251081e><div class="stat-number" data-v-8251081e>${ssrInterpolate(unref(stats).underReview)}</div><div class="stat-label" data-v-8251081e>Em An\xE1lise</div></div></div><div class="stat-card" data-v-8251081e><div class="stat-icon approved" data-v-8251081e>`);
      _push(ssrRenderComponent(_component_Icon, { name: "heroicons:check-circle" }, null, _parent));
      _push(`</div><div class="stat-content" data-v-8251081e><div class="stat-number" data-v-8251081e>${ssrInterpolate(unref(stats).approved)}</div><div class="stat-label" data-v-8251081e>Aprovados</div></div></div><div class="stat-card" data-v-8251081e><div class="stat-icon rejected" data-v-8251081e>`);
      _push(ssrRenderComponent(_component_Icon, { name: "heroicons:x-circle" }, null, _parent));
      _push(`</div><div class="stat-content" data-v-8251081e><div class="stat-number" data-v-8251081e>${ssrInterpolate(unref(stats).rejected)}</div><div class="stat-label" data-v-8251081e>Rejeitados</div></div></div></div><div class="table-section" data-v-8251081e><div class="table-header" data-v-8251081e><h2 data-v-8251081e>Cadastros Recentes</h2>`);
      if (unref(pagination)) {
        _push(`<div class="pagination-info" data-v-8251081e> Mostrando ${ssrInterpolate((unref(pagination).page - 1) * unref(pagination).limit + 1)} a ${ssrInterpolate(Math.min(unref(pagination).page * unref(pagination).limit, unref(pagination).total))} de ${ssrInterpolate(unref(pagination).total)} registros </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(loading)) {
        _push(`<div class="loading-state" data-v-8251081e>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "loading-icon"
        }, null, _parent));
        _push(`<p data-v-8251081e>Carregando cadastros...</p></div>`);
      } else if (unref(registrations).length === 0) {
        _push(`<div class="empty-state" data-v-8251081e>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:document-text",
          class: "empty-icon"
        }, null, _parent));
        _push(`<h3 data-v-8251081e>Nenhum cadastro encontrado</h3><p data-v-8251081e>N\xE3o h\xE1 cadastros que correspondam aos filtros selecionados.</p></div>`);
      } else {
        _push(`<div class="registrations-table" data-v-8251081e><div class="table-header-row" data-v-8251081e><div class="table-cell" data-v-8251081e>Padre</div><div class="table-cell" data-v-8251081e>Email</div><div class="table-cell" data-v-8251081e>Diocese</div><div class="table-cell" data-v-8251081e>Status</div><div class="table-cell" data-v-8251081e>Data</div><div class="table-cell" data-v-8251081e>A\xE7\xF5es</div></div><!--[-->`);
        ssrRenderList(unref(registrations), (registration) => {
          _push(`<div class="table-row" data-v-8251081e><div class="table-cell" data-v-8251081e><div class="priest-info" data-v-8251081e><div class="priest-name" data-v-8251081e>${ssrInterpolate(registration.firstName)} ${ssrInterpolate(registration.lastName)}</div><div class="priest-details" data-v-8251081e> CPF: ${ssrInterpolate(registration.cpf)}</div></div></div><div class="table-cell" data-v-8251081e><div class="email-info" data-v-8251081e>${ssrInterpolate(registration.email)} `);
          if (registration.emailVerified) {
            _push(ssrRenderComponent(_component_UBadge, {
              size: "xs",
              color: "primary"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Verificado `);
                } else {
                  return [
                    createTextVNode(" Verificado ")
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="table-cell" data-v-8251081e>${ssrInterpolate(registration.ordinationDiocese.name)}</div><div class="table-cell" data-v-8251081e>`);
          _push(ssrRenderComponent(_component_UBadge, {
            color: unref(getStatusColor)(registration.status),
            variant: "soft"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(formatStatus)(registration.status))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(formatStatus)(registration.status)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="table-cell" data-v-8251081e><div class="date-info" data-v-8251081e><div data-v-8251081e>${ssrInterpolate(formatDate(registration.createdAt))}</div><div class="date-time" data-v-8251081e>${ssrInterpolate(formatTime(registration.createdAt))}</div></div></div><div class="table-cell" data-v-8251081e><div class="actions-menu" data-v-8251081e>`);
          _push(ssrRenderComponent(_component_UDropdown, {
            items: getActionItems(registration)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  size: "sm"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_Icon, { name: "heroicons:ellipsis-horizontal" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_Icon, { name: "heroicons:ellipsis-horizontal" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UButton, {
                    variant: "ghost",
                    size: "sm"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "heroicons:ellipsis-horizontal" })
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
      if (unref(pagination) && unref(pagination).totalPages > 1) {
        _push(`<div class="pagination-section" data-v-8251081e>`);
        _push(ssrRenderComponent(_component_UPagination, {
          modelValue: unref(currentPage),
          "onUpdate:modelValue": [($event) => isRef(currentPage) ? currentPage.value = $event : null, handlePageChange],
          "page-count": unref(pagination).limit,
          total: unref(pagination).total
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(statusModal).isOpen,
        "onUpdate:modelValue": ($event) => unref(statusModal).isOpen = $event,
        ui: { width: "sm:max-w-md" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="modal-content" data-v-8251081e${_scopeId}><div class="modal-header" data-v-8251081e${_scopeId}><h3 data-v-8251081e${_scopeId}>Atualizar Status</h3>`);
            _push2(ssrRenderComponent(_component_UButton, {
              onClick: ($event) => unref(statusModal).isOpen = false,
              variant: "ghost",
              size: "sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, { name: "heroicons:x-mark" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Icon, { name: "heroicons:x-mark" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="modal-body" data-v-8251081e${_scopeId}><div class="priest-summary" data-v-8251081e${_scopeId}><h4 data-v-8251081e${_scopeId}>${ssrInterpolate((_a = unref(statusModal).registration) == null ? void 0 : _a.firstName)} ${ssrInterpolate((_b = unref(statusModal).registration) == null ? void 0 : _b.lastName)}</h4><p data-v-8251081e${_scopeId}>${ssrInterpolate((_c = unref(statusModal).registration) == null ? void 0 : _c.email)}</p></div>`);
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Novo Status",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelectMenu, {
                    modelValue: unref(statusModal).newStatus,
                    "onUpdate:modelValue": ($event) => unref(statusModal).newStatus = $event,
                    options: statusUpdateOptions,
                    placeholder: "Selecione o status"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelectMenu, {
                      modelValue: unref(statusModal).newStatus,
                      "onUpdate:modelValue": ($event) => unref(statusModal).newStatus = $event,
                      options: statusUpdateOptions,
                      placeholder: "Selecione o status"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Coment\xE1rios" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UTextarea, {
                    modelValue: unref(statusModal).comments,
                    "onUpdate:modelValue": ($event) => unref(statusModal).comments = $event,
                    placeholder: "Coment\xE1rios sobre a decis\xE3o (opcional)",
                    rows: 3
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UTextarea, {
                      modelValue: unref(statusModal).comments,
                      "onUpdate:modelValue": ($event) => unref(statusModal).comments = $event,
                      placeholder: "Coment\xE1rios sobre a decis\xE3o (opcional)",
                      rows: 3
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="modal-actions" data-v-8251081e${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              onClick: ($event) => unref(statusModal).isOpen = false,
              variant: "outline",
              disabled: unref(updatingStatus)
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
              onClick: updateRegistrationStatus,
              loading: unref(updatingStatus),
              disabled: !unref(statusModal).newStatus
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Atualizar Status `);
                } else {
                  return [
                    createTextVNode(" Atualizar Status ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "modal-content" }, [
                createVNode("div", { class: "modal-header" }, [
                  createVNode("h3", null, "Atualizar Status"),
                  createVNode(_component_UButton, {
                    onClick: ($event) => unref(statusModal).isOpen = false,
                    variant: "ghost",
                    size: "sm"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "heroicons:x-mark" })
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                createVNode("div", { class: "modal-body" }, [
                  createVNode("div", { class: "priest-summary" }, [
                    createVNode("h4", null, toDisplayString((_d = unref(statusModal).registration) == null ? void 0 : _d.firstName) + " " + toDisplayString((_e = unref(statusModal).registration) == null ? void 0 : _e.lastName), 1),
                    createVNode("p", null, toDisplayString((_f = unref(statusModal).registration) == null ? void 0 : _f.email), 1)
                  ]),
                  createVNode(_component_UFormGroup, {
                    label: "Novo Status",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_USelectMenu, {
                        modelValue: unref(statusModal).newStatus,
                        "onUpdate:modelValue": ($event) => unref(statusModal).newStatus = $event,
                        options: statusUpdateOptions,
                        placeholder: "Selecione o status"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, { label: "Coment\xE1rios" }, {
                    default: withCtx(() => [
                      createVNode(_component_UTextarea, {
                        modelValue: unref(statusModal).comments,
                        "onUpdate:modelValue": ($event) => unref(statusModal).comments = $event,
                        placeholder: "Coment\xE1rios sobre a decis\xE3o (opcional)",
                        rows: 3
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "modal-actions" }, [
                  createVNode(_component_UButton, {
                    onClick: ($event) => unref(statusModal).isOpen = false,
                    variant: "outline",
                    disabled: unref(updatingStatus)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Cancelar ")
                    ]),
                    _: 1
                  }, 8, ["onClick", "disabled"]),
                  createVNode(_component_UButton, {
                    onClick: updateRegistrationStatus,
                    loading: unref(updatingStatus),
                    disabled: !unref(statusModal).newStatus
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Atualizar Status ")
                    ]),
                    _: 1
                  }, 8, ["loading", "disabled"])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/padres/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8251081e"]]);

export { index as default };
//# sourceMappingURL=index-B0SAKZBn.mjs.map
