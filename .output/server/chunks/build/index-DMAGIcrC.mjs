import __nuxt_component_1 from './index-B4nyd6v-.mjs';
import { defineComponent, computed, resolveComponent, unref, mergeProps, withCtx, createVNode, ref, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { f as useSeoMeta, _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-CnVzKLvW.mjs';
import { u as useParishes } from './useParishes-BoyW1DY0.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../nitro/nitro.mjs';
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
import 'node:module';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ParishFilters",
  __ssrInlineRender: true,
  props: {
    filters: {},
    states: {},
    cities: {},
    neighborhoods: {},
    dioceses: {},
    loading: { type: Boolean, default: false }
  },
  emits: ["apply-filters", "clear-filters", "state-change", "city-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localFilters = ref({ ...props.filters });
    watch(() => props.filters, (newFilters) => {
      localFilters.value = { ...newFilters };
    }, { deep: true });
    const hasActiveFilters = computed(() => {
      return !!(localFilters.value.search || localFilters.value.stateId || localFilters.value.cityId || localFilters.value.neighborhoodId || localFilters.value.dioceseId);
    });
    const applyFilters = () => {
      const cleanFilters = Object.fromEntries(
        Object.entries(localFilters.value).filter(([_, value]) => value !== "" && value !== void 0)
      );
      emit("apply-filters", cleanFilters);
    };
    const searchDebounce = ref();
    watch(() => localFilters.value.search, () => {
      if (searchDebounce.value) {
        clearTimeout(searchDebounce.value);
      }
      searchDebounce.value = setTimeout(() => {
        applyFilters();
      }, 500);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_LoadingSpinner = resolveComponent("LoadingSpinner");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "parish-filters" }, _attrs))} data-v-a8bc4605><div class="parish-filters__header" data-v-a8bc4605><h3 class="parish-filters__title" data-v-a8bc4605>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:funnel",
        class: "title__icon"
      }, null, _parent));
      _push(` Filtrar Par\xF3quias </h3>`);
      if (unref(hasActiveFilters)) {
        _push(`<button class="parish-filters__clear" type="button" data-v-a8bc4605>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:x-mark",
          class: "clear__icon"
        }, null, _parent));
        _push(` Limpar Filtros </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><form class="parish-filters__form" data-v-a8bc4605><div class="filter-group" data-v-a8bc4605><label for="search" class="filter-label" data-v-a8bc4605>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:magnifying-glass",
        class: "label__icon"
      }, null, _parent));
      _push(` Buscar </label><input id="search"${ssrRenderAttr("value", unref(localFilters).search)} type="text" placeholder="Nome da par\xF3quia, endere\xE7o..." class="filter-input" data-v-a8bc4605></div><div class="filter-group" data-v-a8bc4605><label for="state" class="filter-label" data-v-a8bc4605>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:map",
        class: "label__icon"
      }, null, _parent));
      _push(` Estado </label><select id="state" class="filter-select" data-v-a8bc4605><option value="" data-v-a8bc4605${ssrIncludeBooleanAttr(Array.isArray(unref(localFilters).stateId) ? ssrLooseContain(unref(localFilters).stateId, "") : ssrLooseEqual(unref(localFilters).stateId, "")) ? " selected" : ""}>Todos os estados</option><!--[-->`);
      ssrRenderList(_ctx.states, (state) => {
        var _a;
        _push(`<option${ssrRenderAttr("value", state.id)} data-v-a8bc4605${ssrIncludeBooleanAttr(Array.isArray(unref(localFilters).stateId) ? ssrLooseContain(unref(localFilters).stateId, state.id) : ssrLooseEqual(unref(localFilters).stateId, state.id)) ? " selected" : ""}>${ssrInterpolate(state.name)} (${ssrInterpolate(((_a = state._count) == null ? void 0 : _a.parishes) || 0)}) </option>`);
      });
      _push(`<!--]--></select></div>`);
      if (unref(localFilters).stateId) {
        _push(`<div class="filter-group" data-v-a8bc4605><label for="city" class="filter-label" data-v-a8bc4605>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:building-office-2",
          class: "label__icon"
        }, null, _parent));
        _push(` Cidade </label><select id="city" class="filter-select"${ssrIncludeBooleanAttr(_ctx.cities.length === 0) ? " disabled" : ""} data-v-a8bc4605><option value="" data-v-a8bc4605${ssrIncludeBooleanAttr(Array.isArray(unref(localFilters).cityId) ? ssrLooseContain(unref(localFilters).cityId, "") : ssrLooseEqual(unref(localFilters).cityId, "")) ? " selected" : ""}>Todas as cidades</option><!--[-->`);
        ssrRenderList(_ctx.cities, (city) => {
          var _a;
          _push(`<option${ssrRenderAttr("value", city.id)} data-v-a8bc4605${ssrIncludeBooleanAttr(Array.isArray(unref(localFilters).cityId) ? ssrLooseContain(unref(localFilters).cityId, city.id) : ssrLooseEqual(unref(localFilters).cityId, city.id)) ? " selected" : ""}>${ssrInterpolate(city.name)} (${ssrInterpolate(((_a = city._count) == null ? void 0 : _a.parishes) || 0)}) </option>`);
        });
        _push(`<!--]--></select></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(localFilters).cityId && _ctx.neighborhoods.length > 0) {
        _push(`<div class="filter-group" data-v-a8bc4605><label for="neighborhood" class="filter-label" data-v-a8bc4605>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:map-pin",
          class: "label__icon"
        }, null, _parent));
        _push(` Bairro </label><select id="neighborhood" class="filter-select" data-v-a8bc4605><option value="" data-v-a8bc4605${ssrIncludeBooleanAttr(Array.isArray(unref(localFilters).neighborhoodId) ? ssrLooseContain(unref(localFilters).neighborhoodId, "") : ssrLooseEqual(unref(localFilters).neighborhoodId, "")) ? " selected" : ""}>Todos os bairros</option><!--[-->`);
        ssrRenderList(_ctx.neighborhoods, (neighborhood) => {
          var _a;
          _push(`<option${ssrRenderAttr("value", neighborhood.id)} data-v-a8bc4605${ssrIncludeBooleanAttr(Array.isArray(unref(localFilters).neighborhoodId) ? ssrLooseContain(unref(localFilters).neighborhoodId, neighborhood.id) : ssrLooseEqual(unref(localFilters).neighborhoodId, neighborhood.id)) ? " selected" : ""}>${ssrInterpolate(neighborhood.name)} (${ssrInterpolate(((_a = neighborhood._count) == null ? void 0 : _a.parishes) || 0)}) </option>`);
        });
        _push(`<!--]--></select></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="filter-group" data-v-a8bc4605><label for="diocese" class="filter-label" data-v-a8bc4605>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:building-library",
        class: "label__icon"
      }, null, _parent));
      _push(` Diocese </label><select id="diocese" class="filter-select" data-v-a8bc4605><option value="" data-v-a8bc4605${ssrIncludeBooleanAttr(Array.isArray(unref(localFilters).dioceseId) ? ssrLooseContain(unref(localFilters).dioceseId, "") : ssrLooseEqual(unref(localFilters).dioceseId, "")) ? " selected" : ""}>Todas as dioceses</option><!--[-->`);
      ssrRenderList(_ctx.dioceses, (diocese) => {
        var _a;
        _push(`<option${ssrRenderAttr("value", diocese.id)} data-v-a8bc4605${ssrIncludeBooleanAttr(Array.isArray(unref(localFilters).dioceseId) ? ssrLooseContain(unref(localFilters).dioceseId, diocese.id) : ssrLooseEqual(unref(localFilters).dioceseId, diocese.id)) ? " selected" : ""}>${ssrInterpolate(diocese.name)} (${ssrInterpolate(((_a = diocese._count) == null ? void 0 : _a.parishes) || 0)}) </option>`);
      });
      _push(`<!--]--></select></div><div class="parish-filters__actions" data-v-a8bc4605><button type="submit" class="filter-button filter-button--primary"${ssrIncludeBooleanAttr(_ctx.loading) ? " disabled" : ""} data-v-a8bc4605>`);
      if (_ctx.loading) {
        _push(ssrRenderComponent(_component_LoadingSpinner, { class: "button__spinner" }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:magnifying-glass",
          class: "button__icon"
        }, null, _parent));
      }
      _push(` Filtrar </button></div></form></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Parish/ParishFilters.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-a8bc4605"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ParishCard",
  __ssrInlineRender: true,
  props: {
    parish: {}
  },
  setup(__props) {
    const props = __props;
    const mainPriest = computed(() => {
      return props.parish.priests.find((priest) => priest.isMain);
    });
    const socialContacts = computed(() => {
      return props.parish.contacts.filter(
        (contact) => ["facebook", "instagram", "whatsapp", "youtube", "twitter"].includes(contact.type)
      );
    });
    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + "...";
    };
    const getSocialUrl = (contact) => {
      switch (contact.type) {
        case "facebook":
          return contact.value.startsWith("http") ? contact.value : `https://facebook.com/${contact.value}`;
        case "instagram":
          return contact.value.startsWith("http") ? contact.value : `https://instagram.com/${contact.value.replace("@", "")}`;
        case "whatsapp":
          return `https://wa.me/${contact.value.replace(/\D/g, "")}`;
        case "youtube":
          return contact.value.startsWith("http") ? contact.value : `https://youtube.com/@${contact.value}`;
        case "twitter":
          return contact.value.startsWith("http") ? contact.value : `https://twitter.com/${contact.value.replace("@", "")}`;
        default:
          return contact.value;
      }
    };
    const getSocialIcon = (type) => {
      const icons = {
        facebook: "simple-icons:facebook",
        instagram: "simple-icons:instagram",
        whatsapp: "simple-icons:whatsapp",
        youtube: "simple-icons:youtube",
        twitter: "simple-icons:twitter"
      };
      return icons[type] || "heroicons:link";
    };
    const getSocialTitle = (type) => {
      const titles = {
        facebook: "Facebook",
        instagram: "Instagram",
        whatsapp: "WhatsApp",
        youtube: "YouTube",
        twitter: "Twitter"
      };
      return titles[type] || "Link";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "parish-card" }, _attrs))}><div class="parish-card__header"><div class="parish-card__image">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:building-library",
        class: "parish-card__icon"
      }, null, _parent));
      _push(`</div><div class="parish-card__badge"><span class="parish-card__diocese">${ssrInterpolate(_ctx.parish.diocese.name)}</span></div></div><div class="parish-card__content"><h3 class="parish-card__name">${ssrInterpolate(_ctx.parish.name)}</h3><div class="parish-card__location">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:map-pin",
        class: "parish-card__location-icon"
      }, null, _parent));
      _push(`<span class="parish-card__location-text">${ssrInterpolate(_ctx.parish.city.name)}, ${ssrInterpolate(_ctx.parish.state.code)} `);
      if (_ctx.parish.neighborhood) {
        _push(`<span> - ${ssrInterpolate(_ctx.parish.neighborhood.name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span></div>`);
      if (_ctx.parish.description) {
        _push(`<p class="parish-card__description">${ssrInterpolate(truncateText(_ctx.parish.description, 120))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="parish-card__stats"><div class="stat">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:calendar-days",
        class: "stat__icon"
      }, null, _parent));
      _push(`<span class="stat__value">${ssrInterpolate(_ctx.parish._count.events)}</span><span class="stat__label">Eventos</span></div><div class="stat">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:user-group",
        class: "stat__icon"
      }, null, _parent));
      _push(`<span class="stat__value">${ssrInterpolate(_ctx.parish._count.ministries)}</span><span class="stat__label">Minist\xE9rios</span></div></div>`);
      if (unref(mainPriest)) {
        _push(`<div class="parish-card__priest">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:user",
          class: "priest__icon"
        }, null, _parent));
        _push(`<span class="priest__name">${ssrInterpolate(unref(mainPriest).user.profile.firstName)} ${ssrInterpolate(unref(mainPriest).user.profile.lastName)}</span><span class="priest__role">P\xE1roco</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="parish-card__contact">`);
      if (_ctx.parish.phone) {
        _push(`<div class="contact-item">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:phone",
          class: "contact-item__icon"
        }, null, _parent));
        _push(`<span class="contact-item__text">${ssrInterpolate(_ctx.parish.phone)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.parish.email) {
        _push(`<div class="contact-item">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:envelope",
          class: "contact-item__icon"
        }, null, _parent));
        _push(`<span class="contact-item__text">${ssrInterpolate(_ctx.parish.email)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="parish-card__social"><!--[-->`);
      ssrRenderList(unref(socialContacts), (contact) => {
        _push(`<a${ssrRenderAttr("href", getSocialUrl(contact))} target="_blank" rel="noopener noreferrer" class="social-link"${ssrRenderAttr("title", getSocialTitle(contact.type))}>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: getSocialIcon(contact.type),
          class: "social-link__icon"
        }, null, _parent));
        _push(`</a>`);
      });
      _push(`<!--]--></div></div><div class="parish-card__footer">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/paroquias/${_ctx.parish.id}`,
        class: "parish-card__button"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Ver Detalhes</span>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:arrow-right",
              class: "button__icon"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("span", null, "Ver Detalhes"),
              createVNode(_component_Icon, {
                name: "heroicons:arrow-right",
                class: "button__icon"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Parish/ParishCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ParishPagination",
  __ssrInlineRender: true,
  props: {
    currentPage: {},
    totalPages: {},
    total: {},
    limit: {},
    hasNext: { type: Boolean },
    hasPrev: { type: Boolean }
  },
  emits: ["prev-page", "next-page", "go-to-page"],
  setup(__props) {
    const props = __props;
    const startItem = computed(() => {
      return (props.currentPage - 1) * props.limit + 1;
    });
    const endItem = computed(() => {
      return Math.min(props.currentPage * props.limit, props.total);
    });
    const visiblePages = computed(() => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];
      for (let i = Math.max(2, props.currentPage - delta); i <= Math.min(props.totalPages - 1, props.currentPage + delta); i++) {
        range.push(i);
      }
      if (props.currentPage - delta > 2) {
        rangeWithDots.push(2, "...");
      } else {
        for (let i = 2; i < Math.max(2, props.currentPage - delta); i++) {
          rangeWithDots.push(i);
        }
      }
      rangeWithDots.push(...range);
      if (props.currentPage + delta < props.totalPages - 1) {
        rangeWithDots.push("...", props.totalPages - 1);
      } else {
        for (let i = Math.min(props.totalPages - 1, props.currentPage + delta) + 1; i < props.totalPages; i++) {
          rangeWithDots.push(i);
        }
      }
      return range;
    });
    const showFirstPage = computed(() => {
      return props.totalPages > 1 && (props.currentPage > 3 || props.totalPages <= 5);
    });
    const showLastPage = computed(() => {
      return props.totalPages > 1 && (props.currentPage < props.totalPages - 2 || props.totalPages <= 5);
    });
    const showLeftEllipsis = computed(() => {
      return props.currentPage > 4 && props.totalPages > 7;
    });
    const showRightEllipsis = computed(() => {
      return props.currentPage < props.totalPages - 3 && props.totalPages > 7;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      if (_ctx.totalPages > 1) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "pagination" }, _attrs))}><div class="pagination__info"><span class="pagination__text"> Mostrando ${ssrInterpolate(unref(startItem))} - ${ssrInterpolate(unref(endItem))} de ${ssrInterpolate(_ctx.total)} par\xF3quias </span></div><div class="pagination__controls"><button${ssrIncludeBooleanAttr(!_ctx.hasPrev) ? " disabled" : ""} class="pagination__button pagination__button--prev" type="button">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-left",
          class: "button__icon"
        }, null, _parent));
        _push(` Anterior </button><div class="pagination__numbers">`);
        if (unref(showFirstPage)) {
          _push(`<button class="${ssrRenderClass([{ "pagination__number--active": _ctx.currentPage === 1 }, "pagination__number"])}" type="button"> 1 </button>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(showLeftEllipsis)) {
          _push(`<span class="pagination__ellipsis">...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(visiblePages), (pageNum) => {
          _push(`<button class="${ssrRenderClass([{ "pagination__number--active": _ctx.currentPage === pageNum }, "pagination__number"])}" type="button">${ssrInterpolate(pageNum)}</button>`);
        });
        _push(`<!--]-->`);
        if (unref(showRightEllipsis)) {
          _push(`<span class="pagination__ellipsis">...</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(showLastPage)) {
          _push(`<button class="${ssrRenderClass([{ "pagination__number--active": _ctx.currentPage === _ctx.totalPages }, "pagination__number"])}" type="button">${ssrInterpolate(_ctx.totalPages)}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button${ssrIncludeBooleanAttr(!_ctx.hasNext) ? " disabled" : ""} class="pagination__button pagination__button--next" type="button"> Pr\xF3xima `);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-right",
          class: "button__icon"
        }, null, _parent));
        _push(`</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Parish/ParishPagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Par\xF3quias Cat\xF3licas - AcessoCat\xF3lico",
      ogTitle: "Par\xF3quias Cat\xF3licas - AcessoCat\xF3lico",
      description: "Encontre par\xF3quias cat\xF3licas em todo o Brasil. Descubra hor\xE1rios de missa, eventos, minist\xE9rios e entre em contato com a comunidade local.",
      ogDescription: "Encontre par\xF3quias cat\xF3licas em todo o Brasil. Descubra hor\xE1rios de missa, eventos, minist\xE9rios e entre em contato com a comunidade local.",
      ogImage: "/og-parishes.jpg",
      twitterCard: "summary_large_image"
    });
    const {
      parishes,
      loading,
      error,
      pagination,
      states,
      cities,
      neighborhoods,
      dioceses,
      filters,
      loadParishes,
      loadCities,
      loadNeighborhoods,
      nextPage,
      prevPage,
      goToPage,
      clearFilters
    } = useParishes();
    const hasActiveFilters = computed(() => {
      return !!(filters.value.search || filters.value.stateId || filters.value.cityId || filters.value.neighborhoodId || filters.value.dioceseId);
    });
    const selectedState = computed(() => {
      return states.value.find((state) => state.id === filters.value.stateId);
    });
    const selectedCity = computed(() => {
      return cities.value.find((city) => city.id === filters.value.cityId);
    });
    const selectedNeighborhood = computed(() => {
      return neighborhoods.value.find((neighborhood) => neighborhood.id === filters.value.neighborhoodId);
    });
    const selectedDiocese = computed(() => {
      return dioceses.value.find((diocese) => diocese.id === filters.value.dioceseId);
    });
    const handleFiltersChange = (newFilters) => {
      loadParishes(1, newFilters);
    };
    const handleClearFilters = () => {
      clearFilters();
    };
    const handleStateChange = (stateId) => {
      loadCities(stateId);
    };
    const handleCityChange = (cityId) => {
      loadNeighborhoods(cityId);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ParishFilters = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      const _component_LoadingSpinner = resolveComponent("LoadingSpinner");
      const _component_ParishCard = _sfc_main$2;
      const _component_ParishPagination = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="parishes-header"><div class="header__content"><div class="header__text"><h1 class="header__title">Par\xF3quias Cat\xF3licas</h1><p class="header__description"> Encontre par\xF3quias cat\xF3licas em todo o Brasil. Descubra hor\xE1rios de missa, eventos, minist\xE9rios e entre em contato com a comunidade local. </p></div><div class="header__stats"><div class="stat-card"><div class="stat-card__value">${ssrInterpolate(unref(pagination).total)}</div><div class="stat-card__label">Par\xF3quias</div></div><div class="stat-card"><div class="stat-card__value">${ssrInterpolate(unref(states).length)}</div><div class="stat-card__label">Estados</div></div><div class="stat-card"><div class="stat-card__value">${ssrInterpolate(unref(dioceses).length)}</div><div class="stat-card__label">Dioceses</div></div></div></div></div><div class="parishes-content"><div class="content__layout"><aside class="content__sidebar">`);
      _push(ssrRenderComponent(_component_ParishFilters, {
        filters: unref(filters),
        states: unref(states),
        cities: unref(cities),
        neighborhoods: unref(neighborhoods),
        dioceses: unref(dioceses),
        loading: unref(loading),
        onApplyFilters: handleFiltersChange,
        onClearFilters: handleClearFilters,
        onStateChange: handleStateChange,
        onCityChange: handleCityChange
      }, null, _parent));
      _push(`</aside><main class="content__main"><div class="results-header"><div class="results-header__info"><h2 class="results-header__title">${ssrInterpolate(unref(pagination).total)} ${ssrInterpolate(unref(pagination).total === 1 ? "par\xF3quia encontrada" : "par\xF3quias encontradas")}</h2>`);
      if (unref(hasActiveFilters)) {
        _push(`<div class="active-filters"><span class="active-filters__label">Filtros ativos:</span><div class="active-filters__list">`);
        if (unref(filters).search) {
          _push(`<span class="filter-tag"> Busca: &quot;${ssrInterpolate(unref(filters).search)}&quot; <button class="filter-tag__remove">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:x-mark",
            class: "filter-tag__icon"
          }, null, _parent));
          _push(`</button></span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(selectedState)) {
          _push(`<span class="filter-tag"> Estado: ${ssrInterpolate(unref(selectedState).name)} <button class="filter-tag__remove">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:x-mark",
            class: "filter-tag__icon"
          }, null, _parent));
          _push(`</button></span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(selectedCity)) {
          _push(`<span class="filter-tag"> Cidade: ${ssrInterpolate(unref(selectedCity).name)} <button class="filter-tag__remove">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:x-mark",
            class: "filter-tag__icon"
          }, null, _parent));
          _push(`</button></span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(selectedNeighborhood)) {
          _push(`<span class="filter-tag"> Bairro: ${ssrInterpolate(unref(selectedNeighborhood).name)} <button class="filter-tag__remove">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:x-mark",
            class: "filter-tag__icon"
          }, null, _parent));
          _push(`</button></span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(selectedDiocese)) {
          _push(`<span class="filter-tag"> Diocese: ${ssrInterpolate(unref(selectedDiocese).name)} <button class="filter-tag__remove">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:x-mark",
            class: "filter-tag__icon"
          }, null, _parent));
          _push(`</button></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(loading)) {
        _push(`<div class="loading-state">`);
        _push(ssrRenderComponent(_component_LoadingSpinner, { class: "loading-state__spinner" }, null, _parent));
        _push(`<p class="loading-state__text">Carregando par\xF3quias...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="error-state">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:exclamation-triangle",
          class: "error-state__icon"
        }, null, _parent));
        _push(`<h3 class="error-state__title">Erro ao carregar par\xF3quias</h3><p class="error-state__message">${ssrInterpolate(unref(error))}</p><button class="error-state__button">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "button__icon"
        }, null, _parent));
        _push(` Tentar novamente </button></div>`);
      } else if (unref(parishes).length === 0) {
        _push(`<div class="empty-state">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:building-library",
          class: "empty-state__icon"
        }, null, _parent));
        _push(`<h3 class="empty-state__title">Nenhuma par\xF3quia encontrada</h3><p class="empty-state__message"> Tente ajustar os filtros ou fazer uma busca diferente. </p><button class="empty-state__button">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:x-mark",
          class: "button__icon"
        }, null, _parent));
        _push(` Limpar filtros </button></div>`);
      } else {
        _push(`<div class="parishes-grid"><!--[-->`);
        ssrRenderList(unref(parishes), (parish) => {
          _push(ssrRenderComponent(_component_ParishCard, {
            key: parish.id,
            parish
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      if (!unref(loading) && !unref(error) && unref(parishes).length > 0) {
        _push(ssrRenderComponent(_component_ParishPagination, {
          "current-page": unref(pagination).page,
          "total-pages": unref(pagination).totalPages,
          total: unref(pagination).total,
          limit: unref(pagination).limit,
          "has-next": unref(pagination).hasNext,
          "has-prev": unref(pagination).hasPrev,
          onPrevPage: unref(prevPage),
          onNextPage: unref(nextPage),
          onGoToPage: unref(goToPage)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/paroquias/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DMAGIcrC.mjs.map
