import __nuxt_component_1 from './index-B5rpN8hp.mjs';
import { _ as _sfc_main$1 } from './Alert-IcwFp6fa.mjs';
import { a as _sfc_main$2 } from './Button-DT_x6Bpp.mjs';
import { defineComponent, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, b as useSeoMeta } from './server.mjs';
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
import './useLocale-DPPClItX.mjs';
import '@vueuse/core';
import 'tailwind-variants';
import './NuxtImg-DFTKHYRn.mjs';
import './nuxt-link-Bn_O9NYZ.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "sucesso",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Cadastro Enviado - AcessoCat\xF3lico",
      ogTitle: "Cadastro Enviado - AcessoCat\xF3lico",
      description: "Seu cadastro de padre foi enviado com sucesso e est\xE1 sendo analisado pela nossa equipe.",
      ogDescription: "Seu cadastro de padre foi enviado com sucesso e est\xE1 sendo analisado pela nossa equipe."
    });
    const referenceNumber = computed(() => {
      return `PR${Date.now().toString().slice(-6)}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_UAlert = _sfc_main$1;
      const _component_UButton = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "success-page" }, _attrs))} data-v-2f2f97c0><div class="success-container" data-v-2f2f97c0><div class="success-content" data-v-2f2f97c0><div class="success-icon" data-v-2f2f97c0>`);
      _push(ssrRenderComponent(_component_Icon, { name: "heroicons:check-circle" }, null, _parent));
      _push(`</div><h1 class="success-title" data-v-2f2f97c0>Cadastro Enviado com Sucesso!</h1><p class="success-description" data-v-2f2f97c0> Seu cadastro foi recebido e est\xE1 sendo analisado pela nossa equipe de modera\xE7\xE3o. </p><div class="next-steps" data-v-2f2f97c0><h2 class="next-steps-title" data-v-2f2f97c0>Pr\xF3ximos Passos</h2><div class="steps-list" data-v-2f2f97c0><div class="step-item" data-v-2f2f97c0><div class="step-icon" data-v-2f2f97c0>`);
      _push(ssrRenderComponent(_component_Icon, { name: "heroicons:document-magnifying-glass" }, null, _parent));
      _push(`</div><div class="step-content" data-v-2f2f97c0><h3 class="step-title" data-v-2f2f97c0>An\xE1lise de Documentos</h3><p class="step-description" data-v-2f2f97c0> Nossa equipe verificar\xE1 seus documentos e informa\xE7\xF5es eclesi\xE1sticas </p><span class="step-time" data-v-2f2f97c0>1-2 dias \xFAteis</span></div></div><div class="step-item" data-v-2f2f97c0><div class="step-icon" data-v-2f2f97c0>`);
      _push(ssrRenderComponent(_component_Icon, { name: "heroicons:phone" }, null, _parent));
      _push(`</div><div class="step-content" data-v-2f2f97c0><h3 class="step-title" data-v-2f2f97c0>Contato de Verifica\xE7\xE3o</h3><p class="step-description" data-v-2f2f97c0> Se necess\xE1rio, entraremos em contato para esclarecimentos adicionais </p><span class="step-time" data-v-2f2f97c0>2-3 dias \xFAteis</span></div></div><div class="step-item" data-v-2f2f97c0><div class="step-icon" data-v-2f2f97c0>`);
      _push(ssrRenderComponent(_component_Icon, { name: "heroicons:envelope" }, null, _parent));
      _push(`</div><div class="step-content" data-v-2f2f97c0><h3 class="step-title" data-v-2f2f97c0>Notifica\xE7\xE3o por Email</h3><p class="step-description" data-v-2f2f97c0> Voc\xEA receber\xE1 um email com o resultado da an\xE1lise e pr\xF3ximas instru\xE7\xF5es </p><span class="step-time" data-v-2f2f97c0>3-5 dias \xFAteis</span></div></div></div></div>`);
      _push(ssrRenderComponent(_component_UAlert, {
        icon: "heroicons:information-circle",
        color: "blue",
        variant: "soft",
        title: "Informa\xE7\xF5es Importantes",
        class: "info-alert"
      }, {
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="info-list" data-v-2f2f97c0${_scopeId}><li data-v-2f2f97c0${_scopeId}>Mantenha seu email acess\xEDvel para receber atualiza\xE7\xF5es</li><li data-v-2f2f97c0${_scopeId}>Verifique sua caixa de spam regularmente</li><li data-v-2f2f97c0${_scopeId}>Em caso de d\xFAvidas, entre em contato conosco</li><li data-v-2f2f97c0${_scopeId}>O processo de aprova\xE7\xE3o pode levar at\xE9 5 dias \xFAteis</li></ul>`);
          } else {
            return [
              createVNode("ul", { class: "info-list" }, [
                createVNode("li", null, "Mantenha seu email acess\xEDvel para receber atualiza\xE7\xF5es"),
                createVNode("li", null, "Verifique sua caixa de spam regularmente"),
                createVNode("li", null, "Em caso de d\xFAvidas, entre em contato conosco"),
                createVNode("li", null, "O processo de aprova\xE7\xE3o pode levar at\xE9 5 dias \xFAteis")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="contact-section" data-v-2f2f97c0><h3 class="contact-title" data-v-2f2f97c0>Precisa de Ajuda?</h3><div class="contact-methods" data-v-2f2f97c0><div class="contact-item" data-v-2f2f97c0>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:envelope",
        class: "contact-icon"
      }, null, _parent));
      _push(`<div data-v-2f2f97c0><div class="contact-label" data-v-2f2f97c0>Email</div><div class="contact-value" data-v-2f2f97c0>cadastro@acessocatolico.org.br</div></div></div><div class="contact-item" data-v-2f2f97c0>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:phone",
        class: "contact-icon"
      }, null, _parent));
      _push(`<div data-v-2f2f97c0><div class="contact-label" data-v-2f2f97c0>Telefone</div><div class="contact-value" data-v-2f2f97c0>(11) 3000-1234</div></div></div><div class="contact-item" data-v-2f2f97c0>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:chat-bubble-left-right",
        class: "contact-icon"
      }, null, _parent));
      _push(`<div data-v-2f2f97c0><div class="contact-label" data-v-2f2f97c0>WhatsApp</div><div class="contact-value" data-v-2f2f97c0>(11) 99999-8888</div></div></div></div></div><div class="success-actions" data-v-2f2f97c0>`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/",
        size: "lg",
        variant: "solid",
        color: "primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, { name: "heroicons:home" }, null, _parent2, _scopeId));
            _push2(` Voltar ao In\xEDcio `);
          } else {
            return [
              createVNode(_component_Icon, { name: "heroicons:home" }),
              createTextVNode(" Voltar ao In\xEDcio ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        to: "/sobre",
        size: "lg",
        variant: "outline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Conhecer a Plataforma `);
          } else {
            return [
              createTextVNode(" Conhecer a Plataforma ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="reference-number" data-v-2f2f97c0><p class="reference-label" data-v-2f2f97c0>N\xFAmero de Refer\xEAncia do Cadastro:</p><p class="reference-value" data-v-2f2f97c0>#${ssrInterpolate(unref(referenceNumber))}</p><p class="reference-note" data-v-2f2f97c0> Guarde este n\xFAmero para futuras consultas </p></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cadastro/padre/sucesso.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sucesso = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2f2f97c0"]]);

export { sucesso as default };
//# sourceMappingURL=sucesso-Z0rvZhqW.mjs.map
