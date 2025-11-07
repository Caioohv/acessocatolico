import __nuxt_component_1 from './index-B5rpN8hp.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-Bn_O9NYZ.mjs';
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { d as useRoute, b as useSeoMeta } from './server.mjs';
import { u as useAuth } from './useAuth-CzBu1cjT.mjs';
import { u as useEvents } from './useEvents-DRC8EejA.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
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
import 'pinia';
import 'vue-router';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "editar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    route.params.slug;
    useSeoMeta({
      title: "Editar Evento - Acesso Cat\xF3lico",
      description: "Edite as informa\xE7\xF5es do seu evento cat\xF3lico",
      robots: "noindex, nofollow"
    });
    useAuth();
    const { event, loading, generateSlug } = useEvents();
    const saving = ref(false);
    const deleting = ref(false);
    const tagsInput = ref("");
    const form = ref({
      title: "",
      description: "",
      category: "",
      status: "DRAFT",
      startDate: "",
      endDate: "",
      location: "",
      address: "",
      isOnline: false,
      onlineUrl: "",
      registrationRequired: true,
      maxParticipants: null,
      minParticipants: 1,
      registrationStart: "",
      registrationEnd: "",
      requiresApproval: false,
      price: null,
      tags: [],
      ageMin: null,
      ageMax: null,
      isPublic: true,
      isFeatured: false,
      metaTitle: "",
      metaDescription: ""
    });
    const formatDateForInput = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toISOString().slice(0, 16);
    };
    const populateForm = () => {
      if (!event.value) return;
      form.value = {
        title: event.value.title,
        description: event.value.description,
        category: event.value.category,
        status: event.value.status,
        startDate: formatDateForInput(event.value.startDate),
        endDate: formatDateForInput(event.value.endDate || ""),
        location: event.value.location,
        address: event.value.address || "",
        isOnline: event.value.isOnline,
        onlineUrl: event.value.onlineUrl || "",
        registrationRequired: event.value.registrationRequired,
        maxParticipants: event.value.maxParticipants,
        minParticipants: event.value.minParticipants,
        registrationStart: formatDateForInput(event.value.registrationStart || ""),
        registrationEnd: formatDateForInput(event.value.registrationEnd || ""),
        requiresApproval: event.value.requiresApproval,
        price: event.value.price ? Number(event.value.price) : null,
        tags: Array.isArray(event.value.tags) ? event.value.tags : [],
        ageMin: event.value.ageMin,
        ageMax: event.value.ageMax,
        isPublic: event.value.isPublic,
        isFeatured: event.value.isFeatured,
        metaTitle: event.value.metaTitle || "",
        metaDescription: event.value.metaDescription || ""
      };
    };
    watch(event, (newEvent) => {
      if (newEvent) {
        populateForm();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-4 py-8" }, _attrs))}>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center items-center py-32">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "eos-icons:loading",
          class: "w-8 h-8 text-blue-600 animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else if (!unref(event)) {
        _push(`<div class="text-center py-32">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:exclamation-triangle",
          class: "w-16 h-16 text-gray-300 mx-auto mb-4"
        }, null, _parent));
        _push(`<h1 class="text-2xl font-bold text-gray-900 mb-2">Evento n\xE3o encontrado</h1><p class="text-gray-600 mb-6">O evento que voc\xEA est\xE1 tentando editar n\xE3o existe ou foi removido.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/eventos",
          class: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:arrow-left",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(` Voltar aos eventos `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:arrow-left",
                  class: "w-5 h-5"
                }),
                createTextVNode(" Voltar aos eventos ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div><div class="mb-8"><nav class="flex items-center space-x-2 text-sm mb-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/eventos",
          class: "text-blue-600 hover:text-blue-800"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Eventos`);
            } else {
              return [
                createTextVNode("Eventos")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-right",
          class: "w-4 h-4 text-gray-400"
        }, null, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/eventos/${unref(event).slug}`,
          class: "text-blue-600 hover:text-blue-800"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(event).title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(event).title), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-right",
          class: "w-4 h-4 text-gray-400"
        }, null, _parent));
        _push(`<span class="text-gray-500">Editar</span></nav><h1 class="text-3xl font-bold text-gray-900">Editar evento</h1><p class="text-gray-600 mt-2">Atualize as informa\xE7\xF5es do seu evento</p></div><form class="space-y-8"><div class="bg-white rounded-lg shadow-sm border p-6"><h2 class="text-xl font-semibold text-gray-900 mb-6">Informa\xE7\xF5es b\xE1sicas</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 mb-2"> T\xEDtulo do evento * </label><input${ssrRenderAttr("value", unref(form).title)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: Retiro de Carnaval 2024">`);
        if (unref(form).title) {
          _push(`<p class="text-sm text-gray-500 mt-1"> URL: /eventos/${ssrInterpolate(unref(generateSlug)(unref(form).title))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Categoria * </label><select required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "") : ssrLooseEqual(unref(form).category, "")) ? " selected" : ""}>Selecione uma categoria</option><option value="Retiro"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Retiro") : ssrLooseEqual(unref(form).category, "Retiro")) ? " selected" : ""}>Retiro</option><option value="Missa"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Missa") : ssrLooseEqual(unref(form).category, "Missa")) ? " selected" : ""}>Missa</option><option value="Palestra"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Palestra") : ssrLooseEqual(unref(form).category, "Palestra")) ? " selected" : ""}>Palestra</option><option value="Forma\xE7\xE3o"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Forma\xE7\xE3o") : ssrLooseEqual(unref(form).category, "Forma\xE7\xE3o")) ? " selected" : ""}>Forma\xE7\xE3o</option><option value="Encontro"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Encontro") : ssrLooseEqual(unref(form).category, "Encontro")) ? " selected" : ""}>Encontro</option><option value="Celebra\xE7\xE3o"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Celebra\xE7\xE3o") : ssrLooseEqual(unref(form).category, "Celebra\xE7\xE3o")) ? " selected" : ""}>Celebra\xE7\xE3o</option><option value="Peregrina\xE7\xE3o"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Peregrina\xE7\xE3o") : ssrLooseEqual(unref(form).category, "Peregrina\xE7\xE3o")) ? " selected" : ""}>Peregrina\xE7\xE3o</option><option value="Adora\xE7\xE3o"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Adora\xE7\xE3o") : ssrLooseEqual(unref(form).category, "Adora\xE7\xE3o")) ? " selected" : ""}>Adora\xE7\xE3o</option><option value="Novena"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Novena") : ssrLooseEqual(unref(form).category, "Novena")) ? " selected" : ""}>Novena</option><option value="Outro"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Outro") : ssrLooseEqual(unref(form).category, "Outro")) ? " selected" : ""}>Outro</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Status </label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="DRAFT"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "DRAFT") : ssrLooseEqual(unref(form).status, "DRAFT")) ? " selected" : ""}>Rascunho</option><option value="PUBLISHED"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "PUBLISHED") : ssrLooseEqual(unref(form).status, "PUBLISHED")) ? " selected" : ""}>Publicado</option><option value="CANCELLED"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "CANCELLED") : ssrLooseEqual(unref(form).status, "CANCELLED")) ? " selected" : ""}>Cancelado</option><option value="COMPLETED"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "COMPLETED") : ssrLooseEqual(unref(form).status, "COMPLETED")) ? " selected" : ""}>Finalizado</option></select></div></div><div class="mt-6"><label class="block text-sm font-medium text-gray-700 mb-2"> Descri\xE7\xE3o * </label><textarea required rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Breve descri\xE7\xE3o do evento...">${ssrInterpolate(unref(form).description)}</textarea></div></div><div class="bg-white rounded-lg shadow-sm border p-6"><h2 class="text-xl font-semibold text-gray-900 mb-6">Data e local</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 mb-2"> Data e hora de in\xEDcio * </label><input${ssrRenderAttr("value", unref(form).startDate)} type="datetime-local" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Data e hora de fim </label><input${ssrRenderAttr("value", unref(form).endDate)} type="datetime-local" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Local * </label><input${ssrRenderAttr("value", unref(form).location)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: Igreja S\xE3o Jo\xE3o Batista"></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Endere\xE7o completo </label><input${ssrRenderAttr("value", unref(form).address)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Rua, n\xFAmero, bairro, cidade - UF"></div></div><div class="mt-6"><label class="flex items-center gap-3"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).isOnline) ? ssrLooseContain(unref(form).isOnline, null) : unref(form).isOnline) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><span class="text-sm font-medium text-gray-700"> Este \xE9 um evento online </span></label>`);
        if (unref(form).isOnline) {
          _push(`<div class="mt-4"><label class="block text-sm font-medium text-gray-700 mb-2"> Link da transmiss\xE3o </label><input${ssrRenderAttr("value", unref(form).onlineUrl)} type="url" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..."></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bg-white rounded-lg shadow-sm border p-6"><h2 class="text-xl font-semibold text-gray-900 mb-6">Inscri\xE7\xF5es</h2><div class="space-y-6"><div><label class="flex items-center gap-3"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).registrationRequired) ? ssrLooseContain(unref(form).registrationRequired, null) : unref(form).registrationRequired) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><span class="text-sm font-medium text-gray-700"> Requer inscri\xE7\xE3o pr\xE9via </span></label></div>`);
        if (unref(form).registrationRequired) {
          _push(`<div class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 mb-2"> N\xFAmero m\xE1ximo de participantes </label><input${ssrRenderAttr("value", unref(form).maxParticipants)} type="number" min="1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: 100"></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> N\xFAmero m\xEDnimo de participantes </label><input${ssrRenderAttr("value", unref(form).minParticipants)} type="number" min="1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: 10"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 mb-2"> In\xEDcio das inscri\xE7\xF5es </label><input${ssrRenderAttr("value", unref(form).registrationStart)} type="datetime-local" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Fim das inscri\xE7\xF5es </label><input${ssrRenderAttr("value", unref(form).registrationEnd)} type="datetime-local" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></div></div><div><label class="flex items-center gap-3"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).requiresApproval) ? ssrLooseContain(unref(form).requiresApproval, null) : unref(form).requiresApproval) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><span class="text-sm font-medium text-gray-700"> Inscri\xE7\xF5es requerem aprova\xE7\xE3o manual </span></label></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bg-white rounded-lg shadow-sm border p-6"><h2 class="text-xl font-semibold text-gray-900 mb-6">Pre\xE7o</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 mb-2"> Valor (R$) </label><input${ssrRenderAttr("value", unref(form).price)} type="number" min="0" step="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00"><p class="text-sm text-gray-500 mt-1"> Deixe vazio para evento gratuito </p></div></div></div><div class="bg-white rounded-lg shadow-sm border p-6"><h2 class="text-xl font-semibold text-gray-900 mb-6">Configura\xE7\xF5es avan\xE7adas</h2><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2"> Tags </label><input${ssrRenderAttr("value", unref(tagsInput))} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="jovens, fam\xEDlia, ora\xE7\xE3o (separadas por v\xEDrgula)">`);
        if (unref(form).tags && unref(form).tags.length > 0) {
          _push(`<div class="flex flex-wrap gap-2 mt-2"><!--[-->`);
          ssrRenderList(unref(form).tags, (tag, index) => {
            _push(`<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"> #${ssrInterpolate(tag)} <button type="button" class="text-blue-600 hover:text-blue-800"> \xD7 </button></span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 mb-2"> Idade m\xEDnima </label><input${ssrRenderAttr("value", unref(form).ageMin)} type="number" min="0" max="120" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: 16"></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Idade m\xE1xima </label><input${ssrRenderAttr("value", unref(form).ageMax)} type="number" min="0" max="120" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: 35"></div></div><div class="space-y-4"><div><label class="flex items-center gap-3"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).isPublic) ? ssrLooseContain(unref(form).isPublic, null) : unref(form).isPublic) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><span class="text-sm font-medium text-gray-700"> Evento p\xFAblico (vis\xEDvel na listagem) </span></label></div><div><label class="flex items-center gap-3"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).isFeatured) ? ssrLooseContain(unref(form).isFeatured, null) : unref(form).isFeatured) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><span class="text-sm font-medium text-gray-700"> Destacar evento </span></label></div></div></div></div><div class="bg-white rounded-lg shadow-sm border p-6"><h2 class="text-xl font-semibold text-gray-900 mb-6">SEO e Metadata</h2><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2"> T\xEDtulo SEO </label><input${ssrRenderAttr("value", unref(form).metaTitle)} type="text" maxlength="60" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="T\xEDtulo para mecanismos de busca (m\xE1x. 60 caracteres)"><p class="text-sm text-gray-500 mt-1">${ssrInterpolate((unref(form).metaTitle || "").length)}/60 caracteres </p></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Descri\xE7\xE3o SEO </label><textarea maxlength="160" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Descri\xE7\xE3o para mecanismos de busca (m\xE1x. 160 caracteres)">${ssrInterpolate(unref(form).metaDescription)}</textarea><p class="text-sm text-gray-500 mt-1">${ssrInterpolate((unref(form).metaDescription || "").length)}/160 caracteres </p></div></div></div><div class="flex justify-between items-center pt-6 border-t"><div class="flex gap-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/eventos/${unref(event).slug}`,
          class: "text-gray-600 hover:text-gray-800 px-6 py-3 rounded-lg transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Cancelar `);
            } else {
              return [
                createTextVNode(" Cancelar ")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(event).status === "PUBLISHED") {
          _push(`<button type="button"${ssrIncludeBooleanAttr(unref(deleting)) ? " disabled" : ""} class="border border-red-300 hover:bg-red-50 text-red-700 px-6 py-3 rounded-lg transition-colors disabled:opacity-50">${ssrInterpolate(unref(deleting) ? "Excluindo..." : "Excluir evento")}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex gap-4"><button type="button"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg transition-colors disabled:opacity-50">${ssrInterpolate(unref(saving) ? "Salvando..." : "Salvar rascunho")}</button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50">${ssrInterpolate(unref(saving) ? "Salvando..." : "Salvar altera\xE7\xF5es")}</button></div></div></form></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/eventos/[slug]/editar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=editar-BdQFRxbu.mjs.map
