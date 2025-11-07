import { _ as __nuxt_component_0 } from './nuxt-link-Bn_O9NYZ.mjs';
import __nuxt_component_1 from './index-B5rpN8hp.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { b as useSeoMeta, c as createError } from './server.mjs';
import { u as useAuth } from './useAuth-CzBu1cjT.mjs';
import { u as useEvents } from './useEvents-DRC8EejA.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "criar",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Criar Evento - Acesso Cat\xF3lico",
      description: "Crie um novo evento cat\xF3lico na plataforma Acesso Cat\xF3lico",
      robots: "noindex, nofollow"
    });
    const { user } = useAuth();
    const { generateSlug } = useEvents();
    if (!user.value || user.value.role !== "ADMIN" && user.value.role !== "PRIEST") {
      throw createError({
        statusCode: 403,
        statusMessage: "Acesso negado"
      });
    }
    const saving = ref(false);
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-4 py-8" }, _attrs))}><div class="mb-8"><nav class="flex items-center space-x-2 text-sm mb-4">`);
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
      _push(`<span class="text-gray-500">Criar evento</span></nav><h1 class="text-3xl font-bold text-gray-900">Criar novo evento</h1><p class="text-gray-600 mt-2">Preencha as informa\xE7\xF5es para criar seu evento cat\xF3lico</p></div><form class="space-y-8"><div class="bg-white rounded-lg shadow-sm border p-6"><h2 class="text-xl font-semibold text-gray-900 mb-6">Informa\xE7\xF5es b\xE1sicas</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 mb-2"> T\xEDtulo do evento * </label><input${ssrRenderAttr("value", unref(form).title)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: Retiro de Carnaval 2024">`);
      if (unref(form).title) {
        _push(`<p class="text-sm text-gray-500 mt-1"> URL: /eventos/${ssrInterpolate(unref(generateSlug)(unref(form).title))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Categoria * </label><select required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "") : ssrLooseEqual(unref(form).category, "")) ? " selected" : ""}>Selecione uma categoria</option><option value="Retiro"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Retiro") : ssrLooseEqual(unref(form).category, "Retiro")) ? " selected" : ""}>Retiro</option><option value="Missa"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Missa") : ssrLooseEqual(unref(form).category, "Missa")) ? " selected" : ""}>Missa</option><option value="Palestra"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Palestra") : ssrLooseEqual(unref(form).category, "Palestra")) ? " selected" : ""}>Palestra</option><option value="Forma\xE7\xE3o"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Forma\xE7\xE3o") : ssrLooseEqual(unref(form).category, "Forma\xE7\xE3o")) ? " selected" : ""}>Forma\xE7\xE3o</option><option value="Encontro"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Encontro") : ssrLooseEqual(unref(form).category, "Encontro")) ? " selected" : ""}>Encontro</option><option value="Celebra\xE7\xE3o"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Celebra\xE7\xE3o") : ssrLooseEqual(unref(form).category, "Celebra\xE7\xE3o")) ? " selected" : ""}>Celebra\xE7\xE3o</option><option value="Peregrina\xE7\xE3o"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Peregrina\xE7\xE3o") : ssrLooseEqual(unref(form).category, "Peregrina\xE7\xE3o")) ? " selected" : ""}>Peregrina\xE7\xE3o</option><option value="Adora\xE7\xE3o"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Adora\xE7\xE3o") : ssrLooseEqual(unref(form).category, "Adora\xE7\xE3o")) ? " selected" : ""}>Adora\xE7\xE3o</option><option value="Novena"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Novena") : ssrLooseEqual(unref(form).category, "Novena")) ? " selected" : ""}>Novena</option><option value="Outro"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "Outro") : ssrLooseEqual(unref(form).category, "Outro")) ? " selected" : ""}>Outro</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Status </label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="DRAFT"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "DRAFT") : ssrLooseEqual(unref(form).status, "DRAFT")) ? " selected" : ""}>Rascunho</option><option value="PUBLISHED"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "PUBLISHED") : ssrLooseEqual(unref(form).status, "PUBLISHED")) ? " selected" : ""}>Publicado</option></select><p class="text-sm text-gray-500 mt-1"> Rascunhos n\xE3o ficam vis\xEDveis publicamente </p></div></div><div class="mt-6"><label class="block text-sm font-medium text-gray-700 mb-2"> Descri\xE7\xE3o * </label><textarea required rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Breve descri\xE7\xE3o do evento...">${ssrInterpolate(unref(form).description)}</textarea></div></div><div class="bg-white rounded-lg shadow-sm border p-6"><h2 class="text-xl font-semibold text-gray-900 mb-6">Data e local</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 mb-2"> Data e hora de in\xEDcio * </label><input${ssrRenderAttr("value", unref(form).startDate)} type="datetime-local" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Data e hora de fim </label><input${ssrRenderAttr("value", unref(form).endDate)} type="datetime-local" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Local * </label><input${ssrRenderAttr("value", unref(form).location)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: Igreja S\xE3o Jo\xE3o Batista"></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Endere\xE7o completo </label><input${ssrRenderAttr("value", unref(form).address)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Rua, n\xFAmero, bairro, cidade - UF"></div></div><div class="mt-6"><label class="flex items-center gap-3"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).isOnline) ? ssrLooseContain(unref(form).isOnline, null) : unref(form).isOnline) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><span class="text-sm font-medium text-gray-700"> Este \xE9 um evento online </span></label>`);
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
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 mb-2"> Idade m\xEDnima </label><input${ssrRenderAttr("value", unref(form).ageMin)} type="number" min="0" max="120" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: 16"></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Idade m\xE1xima </label><input${ssrRenderAttr("value", unref(form).ageMax)} type="number" min="0" max="120" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: 35"></div></div><div class="space-y-4"><div><label class="flex items-center gap-3"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).isPublic) ? ssrLooseContain(unref(form).isPublic, null) : unref(form).isPublic) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><span class="text-sm font-medium text-gray-700"> Evento p\xFAblico (vis\xEDvel na listagem) </span></label></div><div><label class="flex items-center gap-3"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).isFeatured) ? ssrLooseContain(unref(form).isFeatured, null) : unref(form).isFeatured) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><span class="text-sm font-medium text-gray-700"> Destacar evento </span></label></div></div></div></div><div class="bg-white rounded-lg shadow-sm border p-6"><h2 class="text-xl font-semibold text-gray-900 mb-6">SEO e Metadata</h2><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2"> T\xEDtulo SEO </label><input${ssrRenderAttr("value", unref(form).metaTitle)} type="text" maxlength="60" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="T\xEDtulo para mecanismos de busca (m\xE1x. 60 caracteres)"><p class="text-sm text-gray-500 mt-1">${ssrInterpolate((unref(form).metaTitle || "").length)}/60 caracteres </p></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Descri\xE7\xE3o SEO </label><textarea maxlength="160" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Descri\xE7\xE3o para mecanismos de busca (m\xE1x. 160 caracteres)">${ssrInterpolate(unref(form).metaDescription)}</textarea><p class="text-sm text-gray-500 mt-1">${ssrInterpolate((unref(form).metaDescription || "").length)}/160 caracteres </p></div></div></div><div class="flex justify-between items-center pt-6 border-t">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/eventos",
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
      _push(`<div class="flex gap-4"><button type="button"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg transition-colors disabled:opacity-50">${ssrInterpolate(unref(saving) ? "Salvando..." : "Salvar rascunho")}</button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50">${ssrInterpolate(unref(saving) ? "Criando..." : "Criar evento")}</button></div></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/eventos/criar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=criar-ZV6Nq-jX.mjs.map
