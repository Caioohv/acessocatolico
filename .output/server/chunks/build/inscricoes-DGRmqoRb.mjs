import { _ as __nuxt_component_0 } from './nuxt-link-Bn_O9NYZ.mjs';
import __nuxt_component_1 from './index-B5rpN8hp.mjs';
import { a as _sfc_main$1 } from './Button-BeuMp5nt.mjs';
import { _ as _sfc_main$2 } from './Input-CMCaI9pM.mjs';
import { _ as _sfc_main$3 } from './SelectMenu-C0_KlmQW.mjs';
import { _ as _sfc_main$4 } from './Skeleton-BtGZGGaO.mjs';
import { _ as _sfc_main$5 } from './Checkbox-TTF3FY4d.mjs';
import { _ as _sfc_main$6 } from './Badge-CL_R2lGZ.mjs';
import { _ as _sfc_main$7 } from './Pagination-CBK9bYDh.mjs';
import { _ as _sfc_main$8 } from './Modal-CzBe1f86.mjs';
import { _ as _sfc_main$9 } from './Card-CRvp106L.mjs';
import { d as useRoute, n as navigateTo } from './server.mjs';
import { computed, ref, watch, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, isRef, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useToast } from './useToast-Bm7hVh5T.mjs';
import { u as useAuth } from './useAuth-CzBu1cjT.mjs';
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
import './Chip-DwZPpwbq.mjs';

const _sfc_main = {
  __name: "inscricoes",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const eventId = computed(() => route.params.eventId);
    const { showToast } = useToast();
    const loading = ref(true);
    const bulkUpdating = ref(false);
    const eventData = ref(null);
    const submissions = ref([]);
    const selectedSubmissions = ref([]);
    const selectedSubmission = ref(null);
    const showDetailsModal = ref(false);
    const filters = ref({
      search: "",
      status: "",
      dateFrom: "",
      dateTo: ""
    });
    const pagination = ref({
      page: 1,
      limit: 20,
      total: 0
    });
    const stats = ref({
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      incomplete: 0
    });
    const statusOptions = [
      { value: "", label: "Todos os status" },
      { value: "PENDING", label: "Pendente" },
      { value: "APPROVED", label: "Aprovada" },
      { value: "REJECTED", label: "Rejeitada" },
      { value: "INCOMPLETE", label: "Incompleta" }
    ];
    const exportMenuItems = [
      [{
        label: "Exportar como CSV",
        icon: "heroicons:document-arrow-down",
        click: () => exportSubmissions("csv")
      }],
      [{
        label: "Exportar como XLSX",
        icon: "heroicons:table-cells",
        click: () => exportSubmissions("xlsx")
      }]
    ];
    const hasFilters = computed(() => {
      return filters.value.search || filters.value.status || filters.value.dateFrom;
    });
    const allSelected = computed(() => {
      return submissions.value.length > 0 && selectedSubmissions.value.length === submissions.value.length;
    });
    const someSelected = computed(() => {
      return selectedSubmissions.value.length > 0 && selectedSubmissions.value.length < submissions.value.length;
    });
    const debouncedSearch = useDebounceFn(() => {
      pagination.value.page = 1;
      loadSubmissions();
    }, 300);
    async function loadSubmissions() {
      try {
        loading.value = true;
        const params = new URLSearchParams({
          eventId: eventId.value.toString(),
          page: pagination.value.page.toString(),
          limit: pagination.value.limit.toString()
        });
        if (filters.value.search) params.append("search", filters.value.search);
        if (filters.value.status) params.append("status", filters.value.status);
        if (filters.value.dateFrom) params.append("dateFrom", filters.value.dateFrom);
        if (filters.value.dateTo) params.append("dateTo", filters.value.dateTo);
        const { auth } = useAuth();
        const response = await $fetch(`/api/admin/submissions?${params}`, {
          headers: {
            authorization: `Bearer ${auth.value.token}`
          }
        });
        submissions.value = response.submissions;
        pagination.value = { ...pagination.value, ...response.pagination };
        stats.value = {
          total: response.submissions.length,
          pending: response.submissions.filter((s) => s.status === "PENDING").length,
          approved: response.submissions.filter((s) => s.status === "APPROVED").length,
          rejected: response.submissions.filter((s) => s.status === "REJECTED").length,
          incomplete: response.submissions.filter((s) => s.status === "INCOMPLETE").length
        };
      } catch (error) {
        console.error("Error loading submissions:", error);
        showToast("Erro ao carregar inscri\xE7\xF5es", "error");
      } finally {
        loading.value = false;
      }
    }
    function toggleSelectAll() {
      if (allSelected.value) {
        selectedSubmissions.value = [];
      } else {
        selectedSubmissions.value = submissions.value.map((s) => s.id);
      }
    }
    function toggleSubmissionSelection(submissionId) {
      const index = selectedSubmissions.value.indexOf(submissionId);
      if (index >= 0) {
        selectedSubmissions.value.splice(index, 1);
      } else {
        selectedSubmissions.value.push(submissionId);
      }
    }
    function viewSubmissionDetails(submission) {
      selectedSubmission.value = submission;
      showDetailsModal.value = true;
    }
    async function updateSubmissionStatus(submissionId, status, reason = "") {
      try {
        const { success } = await $fetch(`/api/forms/submissions/${submissionId}/status`, {
          method: "PUT",
          body: { status, reason }
        });
        if (success) {
          const submission = submissions.value.find((s) => s.id === submissionId);
          if (submission) {
            submission.status = status;
            submission.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
          }
          await loadSubmissions();
          showToast(`Inscri\xE7\xE3o ${getStatusLabel(status).toLowerCase()} com sucesso!`, "success");
        }
      } catch (error) {
        console.error("Error updating submission status:", error);
        showToast("Erro ao atualizar status da inscri\xE7\xE3o", "error");
      }
    }
    async function bulkUpdateStatus(status) {
      if (selectedSubmissions.value.length === 0) return;
      try {
        bulkUpdating.value = true;
        const { auth } = useAuth();
        const response = await $fetch("/api/admin/submissions/bulk-update", {
          method: "PUT",
          headers: {
            authorization: `Bearer ${auth.value.token}`
          },
          body: {
            submissionIds: selectedSubmissions.value,
            status,
            reason: ""
            // TODO: Add reason modal if needed
          }
        });
        if (response.success) {
          selectedSubmissions.value = [];
          await loadSubmissions();
          showToast(`${response.updated} inscri\xE7\xF5es atualizadas!`, "success");
        }
      } catch (error) {
        console.error("Error bulk updating submissions:", error);
        showToast("Erro ao atualizar inscri\xE7\xF5es em lote", "error");
      } finally {
        bulkUpdating.value = false;
      }
    }
    async function exportSubmissions(format) {
      var _a;
      try {
        const { auth } = useAuth();
        const params = new URLSearchParams({
          eventId: eventId.value.toString(),
          format
        });
        if (filters.value.search) params.append("search", filters.value.search);
        if (filters.value.status) params.append("status", filters.value.status);
        if (filters.value.dateFrom) params.append("dateFrom", filters.value.dateFrom);
        if (filters.value.dateTo) params.append("dateTo", filters.value.dateTo);
        const response = await fetch(`/api/admin/events/${eventId.value}/export?${params}`, {
          headers: {
            authorization: `Bearer ${auth.value.token}`
          }
        });
        if (!response.ok) throw new Error("Export failed");
        const blob = await response.blob();
        const url = (void 0).URL.createObjectURL(blob);
        const a = (void 0).createElement("a");
        a.href = url;
        a.download = `inscricoes-${((_a = eventData.value) == null ? void 0 : _a.title) || eventId.value}.${format}`;
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
    function getSubmissionActions(submission) {
      return [
        [{
          label: "Ver detalhes",
          icon: "heroicons:eye",
          click: () => viewSubmissionDetails(submission)
        }],
        [{
          label: "Aprovar",
          icon: "heroicons:check-circle",
          click: () => updateSubmissionStatus(submission.id, "APPROVED"),
          disabled: submission.status === "APPROVED"
        }],
        [{
          label: "Rejeitar",
          icon: "heroicons:x-circle",
          click: () => updateSubmissionStatus(submission.id, "REJECTED"),
          disabled: submission.status === "REJECTED"
        }],
        [{
          label: "Marcar como incompleta",
          icon: "heroicons:exclamation-triangle",
          click: () => updateSubmissionStatus(submission.id, "INCOMPLETE"),
          disabled: submission.status === "INCOMPLETE"
        }]
      ];
    }
    function getParticipantName(submission) {
      var _a, _b;
      if ((_a = submission.user) == null ? void 0 : _a.profile) {
        return `${submission.user.profile.firstName} ${submission.user.profile.lastName}`.trim();
      }
      const nameResponse = (_b = submission.responses) == null ? void 0 : _b.find(
        (r) => {
          var _a2, _b2, _c, _d;
          return ((_b2 = (_a2 = r.field) == null ? void 0 : _a2.label) == null ? void 0 : _b2.toLowerCase().includes("nome")) || ((_c = r.field) == null ? void 0 : _c.type) === "TEXT" && ((_d = r.field) == null ? void 0 : _d.order) === 1;
        }
      );
      return (nameResponse == null ? void 0 : nameResponse.value) || "Nome n\xE3o informado";
    }
    function getParticipantEmail(submission) {
      var _a, _b;
      if ((_a = submission.user) == null ? void 0 : _a.email) {
        return submission.user.email;
      }
      const emailResponse = (_b = submission.responses) == null ? void 0 : _b.find(
        (r) => {
          var _a2;
          return ((_a2 = r.field) == null ? void 0 : _a2.type) === "EMAIL";
        }
      );
      return (emailResponse == null ? void 0 : emailResponse.value) || "Email n\xE3o informado";
    }
    function getInitials(firstName, lastName) {
      if (firstName && lastName) {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
      }
      return "??";
    }
    function getStatusColor(status) {
      const colors = {
        PENDING: "yellow",
        APPROVED: "green",
        REJECTED: "red",
        INCOMPLETE: "orange"
      };
      return colors[status] || "gray";
    }
    function getStatusLabel(status) {
      const labels = {
        PENDING: "Pendente",
        APPROVED: "Aprovada",
        REJECTED: "Rejeitada",
        INCOMPLETE: "Incompleta"
      };
      return labels[status] || status;
    }
    function formatDate(dateStr) {
      if (!dateStr) return "-";
      const date = new Date(dateStr);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    function refreshSubmissions() {
      loadSubmissions();
    }
    function clearFilters() {
      filters.value = {
        search: "",
        status: "",
        dateFrom: "",
        dateTo: ""
      };
      pagination.value.page = 1;
      loadSubmissions();
    }
    watch(
      () => [filters.value.status, filters.value.dateFrom, filters.value.dateTo],
      () => {
        pagination.value.page = 1;
        loadSubmissions();
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      const _component_UButton = _sfc_main$1;
      const _component_UDropdown = resolveComponent("UDropdown");
      const _component_UInput = _sfc_main$2;
      const _component_USelectMenu = _sfc_main$3;
      const _component_USkeleton = _sfc_main$4;
      const _component_UCheckbox = _sfc_main$5;
      const _component_UBadge = _sfc_main$6;
      const _component_UPagination = _sfc_main$7;
      const _component_UModal = _sfc_main$8;
      const _component_UCard = _sfc_main$9;
      const _component_SubmissionDetails = resolveComponent("SubmissionDetails");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><div class="bg-white border-b border-gray-200"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between py-6"><div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/eventos/${((_a = unref(eventData)) == null ? void 0 : _a.slug) || unref(eventId)}`,
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
      _push(`<div class="border-l border-gray-300 pl-4"><h1 class="text-2xl font-bold text-gray-900"> Inscri\xE7\xF5es do Evento </h1><p class="text-sm text-gray-600 mt-1">${ssrInterpolate(((_b = unref(eventData)) == null ? void 0 : _b.title) || "Carregando...")}</p></div></div><div class="flex items-center space-x-3">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        color: "gray",
        onClick: refreshSubmissions,
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
      _push(ssrRenderComponent(_component_UDropdown, { items: exportMenuItems }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "outline",
              color: "blue",
              "trailing-icon": "heroicons:chevron-down-20-solid",
              disabled: unref(submissions).length === 0
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "heroicons:arrow-down-tray",
                    class: "h-4 w-4 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Exportar `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "heroicons:arrow-down-tray",
                      class: "h-4 w-4 mr-2"
                    }),
                    createTextVNode(" Exportar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                variant: "outline",
                color: "blue",
                "trailing-icon": "heroicons:chevron-down-20-solid",
                disabled: unref(submissions).length === 0
              }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, {
                    name: "heroicons:arrow-down-tray",
                    class: "h-4 w-4 mr-2"
                  }),
                  createTextVNode(" Exportar ")
                ]),
                _: 1
              }, 8, ["disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/admin/eventos/${unref(eventId)}/formulario`)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:cog-6-tooth",
              class: "h-4 w-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Configurar Formul\xE1rio `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:cog-6-tooth",
                class: "h-4 w-4 mr-2"
              }),
              createTextVNode(" Configurar Formul\xE1rio ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"><div class="bg-white rounded-lg border border-gray-200 p-6"><div class="flex items-center"><div class="p-2 bg-blue-100 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:document-text",
        class: "h-6 w-6 text-blue-600"
      }, null, _parent));
      _push(`</div><div class="ml-4"><p class="text-sm text-gray-600">Total de Inscri\xE7\xF5es</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(stats).total)}</p></div></div></div><div class="bg-white rounded-lg border border-gray-200 p-6"><div class="flex items-center"><div class="p-2 bg-yellow-100 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:clock",
        class: "h-6 w-6 text-yellow-600"
      }, null, _parent));
      _push(`</div><div class="ml-4"><p class="text-sm text-gray-600">Pendentes</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(stats).pending)}</p></div></div></div><div class="bg-white rounded-lg border border-gray-200 p-6"><div class="flex items-center"><div class="p-2 bg-green-100 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:check-circle",
        class: "h-6 w-6 text-green-600"
      }, null, _parent));
      _push(`</div><div class="ml-4"><p class="text-sm text-gray-600">Aprovadas</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(stats).approved)}</p></div></div></div><div class="bg-white rounded-lg border border-gray-200 p-6"><div class="flex items-center"><div class="p-2 bg-red-100 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:x-circle",
        class: "h-6 w-6 text-red-600"
      }, null, _parent));
      _push(`</div><div class="ml-4"><p class="text-sm text-gray-600">Rejeitadas</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(stats).rejected)}</p></div></div></div></div><div class="bg-white rounded-lg border border-gray-200 p-4 mb-6"><div class="grid grid-cols-1 md:grid-cols-5 gap-4"><div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 mb-1"> Buscar inscri\xE7\xF5es </label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(filters).search,
        "onUpdate:modelValue": ($event) => unref(filters).search = $event,
        placeholder: "Nome, email, respostas...",
        icon: "heroicons:magnifying-glass",
        onInput: unref(debouncedSearch)
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Status </label>`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: unref(filters).status,
        "onUpdate:modelValue": ($event) => unref(filters).status = $event,
        options: statusOptions,
        placeholder: "Todos os status"
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Data de inscri\xE7\xE3o </label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(filters).dateFrom,
        "onUpdate:modelValue": ($event) => unref(filters).dateFrom = $event,
        type: "date",
        placeholder: "De"
      }, null, _parent));
      _push(`</div><div class="flex items-end space-x-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        color: "gray",
        onClick: clearFilters,
        class: "flex-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:x-mark",
              class: "h-4 w-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Limpar `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:x-mark",
                class: "h-4 w-4 mr-2"
              }),
              createTextVNode(" Limpar ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (unref(selectedSubmissions).length > 0) {
        _push(`<div class="mt-4 pt-4 border-t border-gray-200"><div class="flex items-center justify-between"><div class="text-sm text-gray-600">${ssrInterpolate(unref(selectedSubmissions).length)} inscri\xE7\xF5es selecionadas </div><div class="flex items-center space-x-2">`);
        _push(ssrRenderComponent(_component_UButton, {
          variant: "outline",
          color: "green",
          size: "sm",
          onClick: ($event) => bulkUpdateStatus("APPROVED"),
          loading: unref(bulkUpdating)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:check",
                class: "h-4 w-4 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` Aprovar selecionadas `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:check",
                  class: "h-4 w-4 mr-1"
                }),
                createTextVNode(" Aprovar selecionadas ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          variant: "outline",
          color: "red",
          size: "sm",
          onClick: ($event) => bulkUpdateStatus("REJECTED"),
          loading: unref(bulkUpdating)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:x-mark",
                class: "h-4 w-4 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` Rejeitar selecionadas `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:x-mark",
                  class: "h-4 w-4 mr-1"
                }),
                createTextVNode(" Rejeitar selecionadas ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-white rounded-lg border border-gray-200">`);
      if (unref(loading) && unref(submissions).length === 0) {
        _push(`<div class="p-6"><div class="space-y-4"><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<div class="flex items-center space-x-4">`);
          _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-4" }, null, _parent));
          _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-1/4" }, null, _parent));
          _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-1/6" }, null, _parent));
          _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-1/6" }, null, _parent));
          _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-1/6" }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (unref(submissions).length === 0) {
        _push(`<div class="text-center py-12">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:inbox",
          class: "h-12 w-12 mx-auto mb-4 text-gray-300"
        }, null, _parent));
        _push(`<h3 class="text-lg font-medium text-gray-900 mb-2">Nenhuma inscri\xE7\xE3o encontrada</h3><p class="text-gray-600 mb-6">${ssrInterpolate(unref(hasFilters) ? "Tente ajustar os filtros de busca" : "Ainda n\xE3o h\xE1 inscri\xE7\xF5es para este evento")}</p></div>`);
      } else {
        _push(`<div><div class="bg-gray-50 px-6 py-3 border-b border-gray-200"><div class="flex items-center space-x-4">`);
        _push(ssrRenderComponent(_component_UCheckbox, {
          checked: unref(allSelected),
          indeterminate: unref(someSelected),
          onChange: toggleSelectAll
        }, null, _parent));
        _push(`<div class="grid grid-cols-6 gap-4 w-full text-xs font-medium text-gray-500 uppercase tracking-wider"><div class="col-span-2">Participante</div><div>Status</div><div>Data de Inscri\xE7\xE3o</div><div>\xDAltima Atualiza\xE7\xE3o</div><div>A\xE7\xF5es</div></div></div></div><div class="divide-y divide-gray-200"><!--[-->`);
        ssrRenderList(unref(submissions), (submission) => {
          var _a2, _b2, _c, _d;
          _push(`<div class="px-6 py-4 hover:bg-gray-50 transition-colors"><div class="flex items-center space-x-4">`);
          _push(ssrRenderComponent(_component_UCheckbox, {
            checked: unref(selectedSubmissions).includes(submission.id),
            onChange: ($event) => toggleSubmissionSelection(submission.id)
          }, null, _parent));
          _push(`<div class="grid grid-cols-6 gap-4 w-full"><div class="col-span-2"><div class="flex items-center space-x-3"><div class="flex-shrink-0"><div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"><span class="text-sm font-medium text-gray-600">${ssrInterpolate(getInitials((_b2 = (_a2 = submission.user) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.firstName, (_d = (_c = submission.user) == null ? void 0 : _c.profile) == null ? void 0 : _d.lastName))}</span></div></div><div class="min-w-0 flex-1"><p class="text-sm font-medium text-gray-900 truncate">${ssrInterpolate(getParticipantName(submission))}</p><p class="text-sm text-gray-500 truncate">${ssrInterpolate(getParticipantEmail(submission))}</p></div></div></div><div>`);
          _push(ssrRenderComponent(_component_UBadge, {
            color: getStatusColor(submission.status),
            variant: "subtle"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(getStatusLabel(submission.status))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(getStatusLabel(submission.status)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="text-sm text-gray-600">${ssrInterpolate(formatDate(submission.submittedAt))}</div><div class="text-sm text-gray-600">${ssrInterpolate(formatDate(submission.updatedAt))}</div><div>`);
          _push(ssrRenderComponent(_component_UDropdown, {
            items: getSubmissionActions(submission)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  color: "gray",
                  "trailing-icon": "heroicons:chevron-down-20-solid",
                  size: "sm"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` A\xE7\xF5es `);
                    } else {
                      return [
                        createTextVNode(" A\xE7\xF5es ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UButton, {
                    variant: "ghost",
                    color: "gray",
                    "trailing-icon": "heroicons:chevron-down-20-solid",
                    size: "sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" A\xE7\xF5es ")
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div></div></div>`);
        });
        _push(`<!--]--></div><div class="bg-gray-50 px-6 py-3 border-t border-gray-200"><div class="flex items-center justify-between"><div class="text-sm text-gray-700"> Mostrando ${ssrInterpolate((unref(pagination).page - 1) * unref(pagination).limit + 1)} at\xE9 ${ssrInterpolate(Math.min(unref(pagination).page * unref(pagination).limit, unref(pagination).total))} de ${ssrInterpolate(unref(pagination).total)} inscri\xE7\xF5es </div>`);
        _push(ssrRenderComponent(_component_UPagination, {
          modelValue: unref(pagination).page,
          "onUpdate:modelValue": [($event) => unref(pagination).page = $event, loadSubmissions],
          "page-count": unref(pagination).limit,
          total: unref(pagination).total
        }, null, _parent));
        _push(`</div></div></div>`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showDetailsModal),
        "onUpdate:modelValue": ($event) => isRef(showDetailsModal) ? showDetailsModal.value = $event : null,
        ui: { width: "max-w-4xl" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, null, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><h3 class="text-lg font-semibold"${_scopeId2}>Detalhes da Inscri\xE7\xE3o</h3>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "gray",
                    variant: "ghost",
                    icon: "heroicons:x-mark-20-solid",
                    onClick: ($event) => showDetailsModal.value = false
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("h3", { class: "text-lg font-semibold" }, "Detalhes da Inscri\xE7\xE3o"),
                      createVNode(_component_UButton, {
                        color: "gray",
                        variant: "ghost",
                        icon: "heroicons:x-mark-20-solid",
                        onClick: ($event) => showDetailsModal.value = false
                      }, null, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(selectedSubmission)) {
                    _push3(ssrRenderComponent(_component_SubmissionDetails, {
                      submission: unref(selectedSubmission),
                      onUpdateStatus: updateSubmissionStatus,
                      onClose: ($event) => showDetailsModal.value = false
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(selectedSubmission) ? (openBlock(), createBlock(_component_SubmissionDetails, {
                      key: 0,
                      submission: unref(selectedSubmission),
                      onUpdateStatus: updateSubmissionStatus,
                      onClose: ($event) => showDetailsModal.value = false
                    }, null, 8, ["submission", "onClose"])) : createCommentVNode("", true)
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
                    createVNode("h3", { class: "text-lg font-semibold" }, "Detalhes da Inscri\xE7\xE3o"),
                    createVNode(_component_UButton, {
                      color: "gray",
                      variant: "ghost",
                      icon: "heroicons:x-mark-20-solid",
                      onClick: ($event) => showDetailsModal.value = false
                    }, null, 8, ["onClick"])
                  ])
                ]),
                default: withCtx(() => [
                  unref(selectedSubmission) ? (openBlock(), createBlock(_component_SubmissionDetails, {
                    key: 0,
                    submission: unref(selectedSubmission),
                    onUpdateStatus: updateSubmissionStatus,
                    onClose: ($event) => showDetailsModal.value = false
                  }, null, 8, ["submission", "onClose"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/eventos/[eventId]/inscricoes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=inscricoes-DGRmqoRb.mjs.map
