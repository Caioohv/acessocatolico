import { _ as __nuxt_component_0 } from './nuxt-link-D39KbEgs.mjs';
import __nuxt_component_0$1 from './index-CaK0uLlx.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-fre5CUak.mjs';
import { debounce } from 'lodash-es';
import { c as useSeoMeta, n as navigateTo } from './server.mjs';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "EventCard",
  __ssrInlineRender: true,
  props: {
    event: {}
  },
  emits: ["view-details", "edit", "delete"],
  setup(__props) {
    const props = __props;
    const { user } = useAuth();
    const canManage = computed(() => {
      if (!(user == null ? void 0 : user.value)) return false;
      return user.value.id === props.event.organizerId || user.value.role === "ADMIN";
    });
    const formatStatus = (status) => {
      const statusMap = {
        DRAFT: "Rascunho",
        PUBLISHED: "Publicado",
        CANCELLED: "Cancelado",
        COMPLETED: "Finalizado"
      };
      return statusMap[status] || status;
    };
    const getStatusColorClass = (status) => {
      const colors = {
        DRAFT: "bg-gray-100 text-gray-800",
        PUBLISHED: "bg-green-100 text-green-800",
        CANCELLED: "bg-red-100 text-red-800",
        COMPLETED: "bg-blue-100 text-blue-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    const formatEventDate = (startDate, endDate) => {
      const start = new Date(startDate);
      const options = {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      };
      if (endDate) {
        const end = new Date(endDate);
        if (start.toDateString() === end.toDateString()) {
          return `${start.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} \u2022 ${start.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}-${end.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
        } else {
          return `${start.toLocaleDateString("pt-BR", options)} - ${end.toLocaleDateString("pt-BR", options)}`;
        }
      }
      return start.toLocaleDateString("pt-BR", options);
    };
    const formatPrice = (price, currency = "BRL") => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency
      }).format(price);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow" }, _attrs))}><div class="relative"><img${ssrRenderAttr("src", _ctx.event.coverImage || "/default-event-cover.jpg")}${ssrRenderAttr("alt", _ctx.event.title)} class="w-full h-48 object-cover"><div class="absolute top-3 left-3"><span class="${ssrRenderClass([
        "px-2 py-1 rounded-full text-xs font-medium",
        getStatusColorClass(_ctx.event.status)
      ])}">${ssrInterpolate(formatStatus(_ctx.event.status))}</span></div>`);
      if (_ctx.event.isFeatured) {
        _push(`<div class="absolute top-3 right-3"><span class="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium"> Destaque </span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.event.price) {
        _push(`<div class="absolute bottom-3 right-3"><span class="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm font-medium">${ssrInterpolate(formatPrice(_ctx.event.price, _ctx.event.currency))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="p-6"><div class="mb-2"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">${ssrInterpolate(_ctx.event.category)}</span></div><h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">${ssrInterpolate(_ctx.event.title)}</h3><p class="text-gray-600 text-sm mb-4 line-clamp-3">${ssrInterpolate(_ctx.event.description)}</p><div class="space-y-2 mb-4"><div class="flex items-center gap-2 text-sm text-gray-500">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:calendar-days",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(formatEventDate(_ctx.event.startDate, _ctx.event.endDate))}</span></div><div class="flex items-center gap-2 text-sm text-gray-500">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:map-pin",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span class="truncate">${ssrInterpolate(_ctx.event.location)}</span></div>`);
      if (_ctx.event.maxParticipants) {
        _push(`<div class="flex items-center gap-2 text-sm text-gray-500">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:users",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(((_a = _ctx.event._count) == null ? void 0 : _a.registrations) || 0)}/${ssrInterpolate(_ctx.event.maxParticipants)} inscritos</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex justify-between items-center"><button class="text-blue-600 hover:text-blue-800 font-medium text-sm"> Ver detalhes </button>`);
      if (unref(canManage)) {
        _push(`<div class="flex gap-2"><button class="text-gray-500 hover:text-gray-700" title="Editar evento">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:pencil",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button><button class="text-red-500 hover:text-red-700" title="Excluir evento">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:trash",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EventCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "EventListItem",
  __ssrInlineRender: true,
  props: {
    event: {}
  },
  emits: ["view-details", "edit", "delete"],
  setup(__props) {
    const props = __props;
    const { user } = useAuth();
    const canManage = computed(() => {
      if (!(user == null ? void 0 : user.value)) return false;
      return user.value.id === props.event.organizerId || user.value.role === "ADMIN";
    });
    const formatStatus = (status) => {
      const statusMap = {
        DRAFT: "Rascunho",
        PUBLISHED: "Publicado",
        CANCELLED: "Cancelado",
        COMPLETED: "Finalizado"
      };
      return statusMap[status] || status;
    };
    const getStatusColorClass = (status) => {
      const colors = {
        DRAFT: "bg-gray-100 text-gray-800",
        PUBLISHED: "bg-green-100 text-green-800",
        CANCELLED: "bg-red-100 text-red-800",
        COMPLETED: "bg-blue-100 text-blue-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    const formatEventDate = (startDate, endDate) => {
      const start = new Date(startDate);
      const options = {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      };
      if (endDate) {
        const end = new Date(endDate);
        if (start.toDateString() === end.toDateString()) {
          return `${start.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} \u2022 ${start.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}-${end.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
        } else {
          return `${start.toLocaleDateString("pt-BR", options)} - ${end.toLocaleDateString("pt-BR", options)}`;
        }
      }
      return start.toLocaleDateString("pt-BR", options);
    };
    const formatPrice = (price, currency = "BRL") => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency
      }).format(price);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow" }, _attrs))}><div class="flex gap-6"><div class="flex-shrink-0"><img${ssrRenderAttr("src", _ctx.event.coverImage || "/default-event-cover.jpg")}${ssrRenderAttr("alt", _ctx.event.title)} class="w-32 h-24 object-cover rounded-lg"></div><div class="flex-1 min-w-0"><div class="flex items-start justify-between mb-2"><div class="flex items-center gap-2"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">${ssrInterpolate(_ctx.event.category)}</span><span class="${ssrRenderClass([
        "px-2 py-1 rounded-full text-xs font-medium",
        getStatusColorClass(_ctx.event.status)
      ])}">${ssrInterpolate(formatStatus(_ctx.event.status))}</span>`);
      if (_ctx.event.isFeatured) {
        _push(`<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium"> Destaque </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(canManage)) {
        _push(`<div class="flex gap-2"><button class="text-gray-400 hover:text-gray-600" title="Editar evento">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:pencil",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button><button class="text-gray-400 hover:text-red-600" title="Excluir evento">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:trash",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><h3 class="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">${ssrInterpolate(_ctx.event.title)}</h3><p class="text-gray-600 text-sm mb-3 line-clamp-2">${ssrInterpolate(_ctx.event.description)}</p><div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:calendar-days",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(formatEventDate(_ctx.event.startDate, _ctx.event.endDate))}</span></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:map-pin",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span class="truncate">${ssrInterpolate(_ctx.event.location)}</span></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: _ctx.event.maxParticipants ? "heroicons:users" : "heroicons:currency-dollar",
        class: "w-4 h-4"
      }, null, _parent));
      if (_ctx.event.maxParticipants) {
        _push(`<span>${ssrInterpolate(((_a = _ctx.event._count) == null ? void 0 : _a.registrations) || 0)}/${ssrInterpolate(_ctx.event.maxParticipants)} inscritos </span>`);
      } else if (_ctx.event.price) {
        _push(`<span>${ssrInterpolate(formatPrice(_ctx.event.price, _ctx.event.currency))}</span>`);
      } else {
        _push(`<span>Gratuito</span>`);
      }
      _push(`</div></div></div><div class="flex-shrink-0 flex flex-col justify-center"><button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"> Ver detalhes </button></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EventListItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EventCalendarView",
  __ssrInlineRender: true,
  props: {
    events: {}
  },
  emits: ["select-date", "view-event"],
  setup(__props) {
    const props = __props;
    const currentDate = ref(/* @__PURE__ */ new Date());
    const selectedDate = ref(null);
    const currentMonthYear = computed(() => {
      return currentDate.value.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric"
      });
    });
    const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xE1b"];
    const calendarDays = computed(() => {
      const year = currentDate.value.getFullYear();
      const month = currentDate.value.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - startDate.getDay());
      const endDate = new Date(lastDay);
      endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
      const days = [];
      const current = new Date(startDate);
      const today = /* @__PURE__ */ new Date();
      while (current <= endDate) {
        const dayEvents = getEventsForDate(current);
        days.push({
          date: new Date(current),
          day: current.getDate(),
          isCurrentMonth: current.getMonth() === month,
          isToday: current.toDateString() === today.toDateString(),
          hasEvents: dayEvents.length > 0,
          events: dayEvents
        });
        current.setDate(current.getDate() + 1);
      }
      return days;
    });
    const selectedDateEvents = computed(() => {
      if (!selectedDate.value) return [];
      return getEventsForDate(selectedDate.value);
    });
    const getEventsForDate = (date) => {
      const dateStr = date.toISOString().split("T")[0];
      return props.events.filter((event) => {
        const eventStart = new Date(event.startDate).toISOString().split("T")[0];
        const eventEnd = event.endDate ? new Date(event.endDate).toISOString().split("T")[0] : eventStart;
        return dateStr >= eventStart && dateStr <= eventEnd;
      });
    };
    const formatSelectedDate = (date) => {
      return date.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long"
      });
    };
    const formatEventTime = (startDate, endDate) => {
      const start = new Date(startDate);
      const timeOptions = { hour: "2-digit", minute: "2-digit" };
      if (endDate) {
        const end = new Date(endDate);
        if (start.toDateString() === end.toDateString()) {
          return `${start.toLocaleTimeString("pt-BR", timeOptions)} - ${end.toLocaleTimeString("pt-BR", timeOptions)}`;
        }
      }
      return start.toLocaleTimeString("pt-BR", timeOptions);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-lg shadow-sm p-6" }, _attrs))}><div class="flex justify-between items-center mb-6"><h3 class="text-lg font-semibold text-gray-900">Calend\xE1rio de Eventos</h3><div class="flex gap-2"><button class="p-2 text-gray-500 hover:text-gray-700">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:chevron-left",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button><div class="px-4 py-2 text-sm font-medium text-gray-700">${ssrInterpolate(unref(currentMonthYear))}</div><button class="p-2 text-gray-500 hover:text-gray-700">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:chevron-right",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button></div></div><div class="grid grid-cols-7 gap-1 mb-4"><!--[-->`);
      ssrRenderList(weekDays, (day) => {
        _push(`<div class="p-2 text-center text-sm font-medium text-gray-500">${ssrInterpolate(day)}</div>`);
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList(unref(calendarDays), (day, index) => {
        _push(`<div class="${ssrRenderClass([
          "relative p-2 text-center text-sm cursor-pointer rounded transition-colors",
          day.isCurrentMonth ? "text-gray-900 hover:bg-gray-50" : "text-gray-400",
          day.isToday ? "bg-blue-100 text-blue-900 font-semibold" : "",
          day.hasEvents ? "font-medium" : ""
        ])}">${ssrInterpolate(day.day)} `);
        if (day.events && day.events.length > 0) {
          _push(`<div class="absolute bottom-1 left-1/2 transform -translate-x-1/2"><div class="flex gap-1"><!--[-->`);
          ssrRenderList(day.events.slice(0, 3), (event, eventIndex) => {
            _push(`<div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>`);
          });
          _push(`<!--]-->`);
          if (day.events.length > 3) {
            _push(`<div class="text-xs text-blue-600 font-semibold"> +${ssrInterpolate(day.events.length - 3)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(selectedDateEvents).length > 0) {
        _push(`<div class="border-t pt-4"><h4 class="font-medium text-gray-900 mb-3"> Eventos em ${ssrInterpolate(formatSelectedDate(unref(selectedDate)))}</h4><div class="space-y-2"><!--[-->`);
        ssrRenderList(unref(selectedDateEvents), (event) => {
          _push(`<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"><div class="w-3 h-3 rounded-full bg-blue-600 flex-shrink-0"></div><div class="flex-1 min-w-0"><p class="font-medium text-gray-900 truncate">${ssrInterpolate(event.title)}</p><p class="text-sm text-gray-500">${ssrInterpolate(formatEventTime(event.startDate, event.endDate))} \u2022 ${ssrInterpolate(event.location)}</p></div><div class="text-xs text-gray-400">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:chevron-right",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (unref(selectedDate)) {
        _push(`<div class="border-t pt-4 text-center text-gray-500">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:calendar",
          class: "w-8 h-8 mx-auto mb-2 text-gray-300"
        }, null, _parent));
        _push(`<p class="text-sm">Nenhum evento em ${ssrInterpolate(formatSelectedDate(unref(selectedDate)))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EventCalendarView.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Eventos Cat\xF3licos",
      description: "Descubra eventos cat\xF3licos em sua regi\xE3o. Missas, retiros, palestras e muito mais.",
      ogTitle: "Eventos Cat\xF3licos - Acesso Cat\xF3lico",
      ogDescription: "Descubra eventos cat\xF3licos em sua regi\xE3o. Missas, retiros, palestras e muito mais.",
      ogType: "website"
    });
    const { user } = useAuth();
    const { events, categories, loading, totalEvents, totalPages, getEvents, deleteEvent: removeEvent } = useEvents();
    const currentPage = ref(1);
    const pageSize = ref(12);
    const currentViewMode = ref("grid");
    const filters = ref({
      search: "",
      category: "",
      date: "",
      location: "",
      status: "PUBLISHED"
    });
    const viewModes = [
      { value: "grid", label: "Grade", icon: "heroicons:squares-2x2" },
      { value: "list", label: "Lista", icon: "heroicons:list-bullet" },
      { value: "calendar", label: "Calend\xE1rio", icon: "heroicons:calendar-days" }
    ];
    const paginationPages = computed(() => {
      const pages = [];
      const start = Math.max(1, currentPage.value - 2);
      const end = Math.min(totalPages.value, start + 4);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });
    const loadEvents = async () => {
      await getEvents({
        page: currentPage.value,
        limit: pageSize.value,
        ...filters.value
      });
    };
    debounce(() => {
      currentPage.value = 1;
      loadEvents();
    }, 500);
    const navigateToEvent = (event) => {
      navigateTo(`/eventos/${event.slug}`);
    };
    const editEvent = (event) => {
      if (user.value && (user.value.id === event.organizerId || user.value.role === "ADMIN")) {
        navigateTo(`/eventos/${event.slug}/editar`);
      }
    };
    const deleteEvent = async (event) => {
      if (!confirm("Tem certeza que deseja excluir este evento?")) return;
      try {
        await removeEvent(event.id);
        await loadEvents();
      } catch (error) {
        console.error("Erro ao excluir evento:", error);
      }
    };
    const filterByDate = (date) => {
      filters.value.date = date;
      currentPage.value = 1;
      loadEvents();
    };
    watch(() => filters.value.category, () => {
      currentPage.value = 1;
      loadEvents();
    });
    watch(() => filters.value.date, () => {
      currentPage.value = 1;
      loadEvents();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      const _component_EventCard = _sfc_main$3;
      const _component_EventListItem = _sfc_main$2;
      const _component_EventCalendarView = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-4 py-8" }, _attrs))}><div class="flex justify-between items-center mb-8"><div><h1 class="text-3xl font-bold text-gray-900 mb-2">Eventos</h1><p class="text-gray-600">Descubra eventos cat\xF3licos em sua regi\xE3o</p></div>`);
      if (unref(user) && (unref(user).role === "ADMIN" || unref(user).role === "PRIEST")) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/eventos/criar",
          class: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:plus",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(` Criar Evento `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:plus",
                  class: "w-5 h-5"
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
      _push(`</div><div class="bg-white rounded-lg shadow-sm border p-6 mb-8"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label><input${ssrRenderAttr("value", unref(filters).search)} type="text" placeholder="Buscar eventos..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Categoria</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filters).category) ? ssrLooseContain(unref(filters).category, "") : ssrLooseEqual(unref(filters).category, "")) ? " selected" : ""}>Todas as categorias</option><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<option${ssrRenderAttr("value", cat.category)}${ssrIncludeBooleanAttr(Array.isArray(unref(filters).category) ? ssrLooseContain(unref(filters).category, cat.category) : ssrLooseEqual(unref(filters).category, cat.category)) ? " selected" : ""}>${ssrInterpolate(cat.category)} (${ssrInterpolate(cat.count)}) </option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Data</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filters).date) ? ssrLooseContain(unref(filters).date, "") : ssrLooseEqual(unref(filters).date, "")) ? " selected" : ""}>Todas as datas</option><option value="today"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).date) ? ssrLooseContain(unref(filters).date, "today") : ssrLooseEqual(unref(filters).date, "today")) ? " selected" : ""}>Hoje</option><option value="week"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).date) ? ssrLooseContain(unref(filters).date, "week") : ssrLooseEqual(unref(filters).date, "week")) ? " selected" : ""}>Esta semana</option><option value="month"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).date) ? ssrLooseContain(unref(filters).date, "month") : ssrLooseEqual(unref(filters).date, "month")) ? " selected" : ""}>Este m\xEAs</option><option value="upcoming"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).date) ? ssrLooseContain(unref(filters).date, "upcoming") : ssrLooseEqual(unref(filters).date, "upcoming")) ? " selected" : ""}>Pr\xF3ximos eventos</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Local</label><input${ssrRenderAttr("value", unref(filters).location)} type="text" placeholder="Cidade ou regi\xE3o..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></div></div><div class="flex justify-between items-center mt-4"><div class="flex gap-2"><!--[-->`);
      ssrRenderList(viewModes, (view) => {
        _push(`<button class="${ssrRenderClass([
          "px-3 py-2 rounded-md text-sm font-medium transition-colors",
          unref(currentViewMode) === view.value ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-700"
        ])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: view.icon,
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` ${ssrInterpolate(view.label)}</button>`);
      });
      _push(`<!--]--></div><div class="text-sm text-gray-500">${ssrInterpolate(unref(totalEvents))} eventos encontrados </div></div></div>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center py-12">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "eos-icons:loading",
          class: "w-8 h-8 text-blue-600 animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(events).length > 0) {
        _push(`<div>`);
        if (unref(currentViewMode) === "grid") {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"><!--[-->`);
          ssrRenderList(unref(events), (event) => {
            _push(ssrRenderComponent(_component_EventCard, {
              key: event.id,
              event,
              onViewDetails: navigateToEvent,
              onEdit: editEvent,
              onDelete: deleteEvent
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        } else if (unref(currentViewMode) === "list") {
          _push(`<div class="space-y-4 mb-8"><!--[-->`);
          ssrRenderList(unref(events), (event) => {
            _push(ssrRenderComponent(_component_EventListItem, {
              key: event.id,
              event,
              onViewDetails: navigateToEvent,
              onEdit: editEvent,
              onDelete: deleteEvent
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        } else if (unref(currentViewMode) === "calendar") {
          _push(`<div class="mb-8">`);
          _push(ssrRenderComponent(_component_EventCalendarView, {
            events: unref(events),
            onSelectDate: filterByDate,
            onViewEvent: navigateToEvent
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="text-center py-12">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:calendar",
          class: "w-16 h-16 text-gray-300 mx-auto mb-4"
        }, null, _parent));
        _push(`<h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum evento encontrado</h3><p class="text-gray-500 mb-4">Tente ajustar os filtros ou criar um novo evento.</p>`);
        if (unref(user) && (unref(user).role === "ADMIN" || unref(user).role === "PRIEST")) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/eventos/criar",
            class: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "heroicons:plus",
                  class: "w-5 h-5"
                }, null, _parent2, _scopeId));
                _push2(` Criar Primeiro Evento `);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "heroicons:plus",
                    class: "w-5 h-5"
                  }),
                  createTextVNode(" Criar Primeiro Evento ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      if (unref(totalPages) > 1) {
        _push(`<div class="flex justify-center"><nav class="flex items-center gap-2"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"> Anterior </button><!--[-->`);
        ssrRenderList(unref(paginationPages), (page) => {
          _push(`<button class="${ssrRenderClass([
            "px-3 py-2 text-sm font-medium rounded-md",
            page === unref(currentPage) ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
          ])}">${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--><button${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} class="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"> Pr\xF3xima </button></nav></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/eventos/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DTiSNOZm.mjs.map
