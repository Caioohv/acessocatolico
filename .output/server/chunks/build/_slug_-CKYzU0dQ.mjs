import __nuxt_component_0 from './index-CaK0uLlx.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-D39KbEgs.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderStyle, ssrRenderTeleport } from 'vue/server-renderer';
import { e as useRoute, d as createError } from './server.mjs';
import { u as useAuth } from './useAuth-fre5CUak.mjs';
import { u as useEvents } from './useEvents-DRC8EejA.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    route.params.slug;
    const { user } = useAuth();
    const {
      event,
      loading,
      userRegistration,
      registrationCount,
      comments
    } = useEvents();
    const registering = ref(false);
    const newComment = ref("");
    const addingComment = ref(false);
    const galleryOpen = ref(false);
    const currentGalleryIndex = ref(0);
    const canRegister = computed(() => {
      if (!user.value || !event.value) return false;
      if (userRegistration.value) return false;
      if (event.value.maxParticipants && registrationCount.value >= event.value.maxParticipants) return false;
      if (event.value.registrationEnd && new Date(event.value.registrationEnd) < /* @__PURE__ */ new Date()) return false;
      return true;
    });
    const canEdit = computed(() => {
      if (!user.value || !event.value) return false;
      return user.value.id === event.value.organizerId || user.value.role === "ADMIN";
    });
    const formatEventDate = (startDate, endDate) => {
      const start = new Date(startDate);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      if (endDate) {
        const end = new Date(endDate);
        if (start.toDateString() === end.toDateString()) {
          return start.toLocaleDateString("pt-BR", options);
        } else {
          return `${start.toLocaleDateString("pt-BR", options)} - ${end.toLocaleDateString("pt-BR", options)}`;
        }
      }
      return start.toLocaleDateString("pt-BR", options);
    };
    const formatEventTime = (startDate, endDate) => {
      const start = new Date(startDate);
      const timeOptions = { hour: "2-digit", minute: "2-digit" };
      if (endDate) {
        const end = new Date(endDate);
        return `${start.toLocaleTimeString("pt-BR", timeOptions)} - ${end.toLocaleTimeString("pt-BR", timeOptions)}`;
      }
      return start.toLocaleTimeString("pt-BR", timeOptions);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const formatPrice = (price, currency = "BRL") => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency
      }).format(price);
    };
    const formatRole = (role) => {
      const roles = {
        PRIEST: "Padre",
        ADMIN: "Administrador",
        USER: "Usu\xE1rio"
      };
      return roles[role] || role;
    };
    watch(event, (newEvent) => {
      if (newEvent === null && !loading.value) {
        throw createError({
          statusCode: 404,
          statusMessage: "Evento n\xE3o encontrado"
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a, _b, _c;
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center items-center py-32">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "eos-icons:loading",
          class: "w-8 h-8 text-blue-600 animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(event)) {
        _push(`<div class="container mx-auto px-4 py-8"><nav class="flex items-center space-x-2 text-sm mb-6">`);
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
        _push(`<span class="text-gray-500">${ssrInterpolate(unref(event).title)}</span></nav><div class="bg-white rounded-lg shadow-sm overflow-hidden mb-8">`);
        if (unref(event).coverImage) {
          _push(`<div class="relative h-96"><img${ssrRenderAttr("src", unref(event).coverImage)}${ssrRenderAttr("alt", unref(event).title)} class="w-full h-full object-cover"><div class="absolute inset-0 bg-black bg-opacity-40 flex items-end"><div class="p-8 text-white"><h1 class="text-4xl font-bold mb-2">${ssrInterpolate(unref(event).title)}</h1><p class="text-xl opacity-90">${ssrInterpolate(unref(event).description)}</p></div></div></div>`);
        } else {
          _push(`<div class="p-8"><h1 class="text-4xl font-bold text-gray-900 mb-4">${ssrInterpolate(unref(event).title)}</h1><p class="text-xl text-gray-600">${ssrInterpolate(unref(event).description)}</p></div>`);
        }
        _push(`<div class="p-6 border-t flex flex-wrap gap-4">`);
        if (unref(canRegister)) {
          _push(`<button${ssrIncludeBooleanAttr(unref(registering)) ? " disabled" : ""} class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2">`);
          if (unref(registering)) {
            _push(ssrRenderComponent(_component_Icon, {
              name: "eos-icons:loading",
              class: "w-5 h-5 animate-spin"
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:ticket",
              class: "w-5 h-5"
            }, null, _parent));
          }
          _push(` ${ssrInterpolate(unref(registering) ? "Inscrevendo..." : "Inscrever-se")}</button>`);
        } else if (unref(userRegistration)) {
          _push(`<button class="bg-green-600 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 cursor-default">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:check-circle",
            class: "w-5 h-5"
          }, null, _parent));
          _push(` Inscrito </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:share",
          class: "w-5 h-5"
        }, null, _parent));
        _push(` Compartilhar </button>`);
        if (unref(canEdit)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/eventos/${unref(event).slug}/editar`,
            class: "border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "heroicons:pencil",
                  class: "w-5 h-5"
                }, null, _parent2, _scopeId));
                _push2(` Editar `);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "heroicons:pencil",
                    class: "w-5 h-5"
                  }),
                  createTextVNode(" Editar ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-8"><div class="bg-white rounded-lg shadow-sm p-8"><h2 class="text-2xl font-bold text-gray-900 mb-6">Sobre o evento</h2>`);
        if (unref(event).content) {
          _push(`<div class="prose prose-lg max-w-none">${(_a2 = unref(event).content) != null ? _a2 : ""}</div>`);
        } else {
          _push(`<p class="text-gray-600">${ssrInterpolate(unref(event).description)}</p>`);
        }
        _push(`</div>`);
        if (unref(event).gallery && unref(event).gallery.length > 0) {
          _push(`<div class="bg-white rounded-lg shadow-sm p-8"><h2 class="text-2xl font-bold text-gray-900 mb-6">Galeria</h2><div class="grid grid-cols-2 md:grid-cols-3 gap-4"><!--[-->`);
          ssrRenderList(unref(event).gallery, (image, index) => {
            _push(`<div class="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"><img${ssrRenderAttr("src", image)}${ssrRenderAttr("alt", `Imagem ${index + 1}`)} class="w-full h-full object-cover"></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bg-white rounded-lg shadow-sm p-8"><h2 class="text-2xl font-bold text-gray-900 mb-6">Coment\xE1rios</h2>`);
        if (unref(user)) {
          _push(`<div class="mb-8"><div class="flex gap-4"><img${ssrRenderAttr("src", ((_a = unref(user).profile) == null ? void 0 : _a.avatar) || "/default-avatar.png")}${ssrRenderAttr("alt", `${(_b = unref(user).profile) == null ? void 0 : _b.firstName} ${(_c = unref(user).profile) == null ? void 0 : _c.lastName}`)} class="w-10 h-10 rounded-full"><div class="flex-1"><textarea placeholder="Deixe seu coment\xE1rio..." rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">${ssrInterpolate(unref(newComment))}</textarea><div class="flex justify-end mt-2"><button${ssrIncludeBooleanAttr(!unref(newComment).trim() || unref(addingComment)) ? " disabled" : ""} class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-md transition-colors">${ssrInterpolate(unref(addingComment) ? "Enviando..." : "Comentar")}</button></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="space-y-6"><!--[-->`);
        ssrRenderList(unref(comments), (comment) => {
          _push(`<div class="flex gap-4"><img${ssrRenderAttr("src", comment.user.avatar || "/default-avatar.png")}${ssrRenderAttr("alt", comment.user.name)} class="w-10 h-10 rounded-full"><div class="flex-1"><div class="flex items-center gap-2 mb-1"><h4 class="font-medium text-gray-900">${ssrInterpolate(comment.user.name)}</h4><span class="text-sm text-gray-500">${ssrInterpolate(formatDate(comment.createdAt))}</span></div><p class="text-gray-600">${ssrInterpolate(comment.content)}</p></div></div>`);
        });
        _push(`<!--]-->`);
        if (unref(comments).length === 0) {
          _push(`<div class="text-center py-8 text-gray-500"> Seja o primeiro a comentar! </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="space-y-6"><div class="bg-white rounded-lg shadow-sm p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Informa\xE7\xF5es do evento</h3><div class="space-y-4"><div class="flex items-start gap-3">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:calendar-days",
          class: "w-5 h-5 text-gray-400 mt-0.5"
        }, null, _parent));
        _push(`<div><p class="font-medium text-gray-900">${ssrInterpolate(formatEventDate(unref(event).startDate, unref(event).endDate))}</p><p class="text-sm text-gray-500">${ssrInterpolate(formatEventTime(unref(event).startDate, unref(event).endDate))}</p></div></div><div class="flex items-start gap-3">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:map-pin",
          class: "w-5 h-5 text-gray-400 mt-0.5"
        }, null, _parent));
        _push(`<div><p class="font-medium text-gray-900">${ssrInterpolate(unref(event).location)}</p>`);
        if (unref(event).address) {
          _push(`<p class="text-sm text-gray-500">${ssrInterpolate(unref(event).address)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(event).isOnline) {
          _push(`<p class="text-sm text-blue-600">Evento online</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:tag",
          class: "w-5 h-5 text-gray-400"
        }, null, _parent));
        _push(`<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">${ssrInterpolate(unref(event).category)}</span></div>`);
        if (unref(event).price) {
          _push(`<div class="flex items-center gap-3">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:currency-dollar",
            class: "w-5 h-5 text-gray-400"
          }, null, _parent));
          _push(`<p class="font-medium text-gray-900">${ssrInterpolate(formatPrice(unref(event).price, unref(event).currency))}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(event).maxParticipants) {
          _push(`<div class="flex items-center gap-3">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:users",
            class: "w-5 h-5 text-gray-400"
          }, null, _parent));
          _push(`<p class="text-gray-600">${ssrInterpolate(unref(registrationCount))}/${ssrInterpolate(unref(event).maxParticipants)} inscritos </p><div class="flex-1 bg-gray-200 rounded-full h-2"><div class="bg-blue-600 h-2 rounded-full transition-all" style="${ssrRenderStyle({ width: `${unref(registrationCount) / unref(event).maxParticipants * 100}%` })}"></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(event).tags && unref(event).tags.length > 0) {
          _push(`<div class="flex items-start gap-3">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:hashtag",
            class: "w-5 h-5 text-gray-400 mt-0.5"
          }, null, _parent));
          _push(`<div class="flex flex-wrap gap-2"><!--[-->`);
          ssrRenderList(unref(event).tags, (tag) => {
            _push(`<span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"> #${ssrInterpolate(tag)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bg-white rounded-lg shadow-sm p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Organizador</h3><div class="flex items-center gap-4"><img${ssrRenderAttr("src", unref(event).organizer.avatar || "/default-avatar.png")}${ssrRenderAttr("alt", unref(event).organizer.name)} class="w-12 h-12 rounded-full"><div><h4 class="font-medium text-gray-900">${ssrInterpolate(unref(event).organizer.name)}</h4><p class="text-sm text-gray-500">${ssrInterpolate(formatRole(unref(event).organizer.role))}</p></div></div>`);
        if (unref(event).parish) {
          _push(`<div class="mt-4 pt-4 border-t"><p class="text-sm text-gray-600">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:building-office",
            class: "w-4 h-4 inline mr-1"
          }, null, _parent));
          _push(` ${ssrInterpolate(unref(event).parish.name)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(event).attachments && unref(event).attachments.length > 0) {
          _push(`<div class="bg-white rounded-lg shadow-sm p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Documentos</h3><div class="space-y-3"><!--[-->`);
          ssrRenderList(unref(event).attachments, (attachment) => {
            _push(`<a${ssrRenderAttr("href", attachment.url)} target="_blank" class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:document",
              class: "w-5 h-5 text-gray-400"
            }, null, _parent));
            _push(`<div class="flex-1"><p class="font-medium text-gray-900">${ssrInterpolate(attachment.name)}</p><p class="text-sm text-gray-500">${ssrInterpolate(attachment.type)}</p></div>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:arrow-top-right-on-square",
              class: "w-4 h-4 text-gray-400"
            }, null, _parent));
            _push(`</a>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<div class="text-center py-32">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:exclamation-triangle",
          class: "w-16 h-16 text-gray-300 mx-auto mb-4"
        }, null, _parent));
        _push(`<h1 class="text-2xl font-bold text-gray-900 mb-2">Evento n\xE3o encontrado</h1><p class="text-gray-600 mb-6">O evento que voc\xEA est\xE1 procurando n\xE3o existe ou foi removido.</p>`);
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
      }
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(galleryOpen)) {
          _push2(`<div class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"><div class="relative max-w-4xl max-h-full"><img${ssrRenderAttr("src", unref(event).gallery[unref(currentGalleryIndex)])}${ssrRenderAttr("alt", `Imagem ${unref(currentGalleryIndex) + 1}`)} class="max-w-full max-h-full object-contain"><button class="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"> \xD7 </button>`);
          if (unref(currentGalleryIndex) > 0) {
            _push2(`<button class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-2xl"> \u2190 </button>`);
          } else {
            _push2(`<!---->`);
          }
          if (unref(currentGalleryIndex) < unref(event).gallery.length - 1) {
            _push2(`<button class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-2xl"> \u2192 </button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/eventos/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CKYzU0dQ.mjs.map
