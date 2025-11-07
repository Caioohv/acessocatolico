import __nuxt_component_1$1 from './index-B5rpN8hp.mjs';
import { _ as _sfc_main$2 } from './NuxtImg-DFTKHYRn.mjs';
import { _ as _sfc_main$3 } from './Modal-CzBe1f86.mjs';
import { a as _sfc_main$4 } from './Button-BeuMp5nt.mjs';
import { defineComponent, ref, computed, resolveComponent, unref, withCtx, createVNode, createTextVNode, mergeProps, isRef, createBlock, createCommentVNode, toDisplayString, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { d as useRoute, _ as _export_sfc } from './server.mjs';
import { u as useParishes } from './useParishes-BoyW1DY0.mjs';
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
import './useLocale-CtluvDKB.mjs';
import './usePortal-BbZPQQY_.mjs';
import 'tailwind-variants';
import './nuxt-link-Bn_O9NYZ.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ParishGallery",
  __ssrInlineRender: true,
  props: {
    photos: { default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const lightboxOpen = ref(false);
    const currentIndex = ref(0);
    const currentPhoto = computed(() => {
      return props.photos[currentIndex.value] || null;
    });
    const closeLightbox = () => {
      lightboxOpen.value = false;
    };
    const nextPhoto = () => {
      if (currentIndex.value < props.photos.length - 1) {
        currentIndex.value++;
      }
    };
    const previousPhoto = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_NuxtImg = _sfc_main$2;
      const _component_UModal = _sfc_main$3;
      const _component_UButton = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "parish-gallery" }, _attrs))} data-v-1b06998e>`);
      if (_ctx.photos.length === 0) {
        _push(`<div class="gallery-empty" data-v-1b06998e>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:photo",
          class: "empty-icon"
        }, null, _parent));
        _push(`<p class="empty-text" data-v-1b06998e>Nenhuma foto dispon\xEDvel</p></div>`);
      } else {
        _push(`<div class="gallery-grid" data-v-1b06998e><!--[-->`);
        ssrRenderList(_ctx.photos, (photo, index) => {
          _push(`<div class="gallery-item" data-v-1b06998e>`);
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: photo.url,
            alt: photo.alt || "Foto da par\xF3quia",
            class: "gallery-image",
            placeholder: true,
            loading: "lazy",
            format: "webp",
            quality: "80",
            sizes: "sm:100vw md:50vw lg:33vw"
          }, null, _parent));
          _push(`<div class="gallery-overlay" data-v-1b06998e>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:magnifying-glass-plus",
            class: "overlay-icon"
          }, null, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(lightboxOpen),
        "onUpdate:modelValue": ($event) => isRef(lightboxOpen) ? lightboxOpen.value = $event : null,
        class: "lightbox-modal"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="lightbox-container" data-v-1b06998e${_scopeId}><div class="lightbox-header" data-v-1b06998e${_scopeId}><h3 class="lightbox-title" data-v-1b06998e${_scopeId}>${ssrInterpolate(((_a = unref(currentPhoto)) == null ? void 0 : _a.title) || "Foto da par\xF3quia")}</h3>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              icon: "i-heroicons-x-mark-20-solid",
              onClick: closeLightbox
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="lightbox-content" data-v-1b06998e${_scopeId}>`);
            if (unref(currentPhoto)) {
              _push2(ssrRenderComponent(_component_NuxtImg, {
                src: unref(currentPhoto).url,
                alt: unref(currentPhoto).alt || "Foto da par\xF3quia",
                class: "lightbox-image",
                format: "webp",
                quality: "90",
                placeholder: ""
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.photos.length > 1) {
              _push2(`<div class="lightbox-nav" data-v-1b06998e${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                disabled: unref(currentIndex) === 0,
                color: "neutral",
                variant: "soft",
                icon: "i-heroicons-chevron-left-20-solid",
                onClick: previousPhoto,
                class: "nav-button"
              }, null, _parent2, _scopeId));
              _push2(`<span class="nav-counter" data-v-1b06998e${_scopeId}>${ssrInterpolate(unref(currentIndex) + 1)} / ${ssrInterpolate(_ctx.photos.length)}</span>`);
              _push2(ssrRenderComponent(_component_UButton, {
                disabled: unref(currentIndex) === _ctx.photos.length - 1,
                color: "neutral",
                variant: "soft",
                icon: "i-heroicons-chevron-right-20-solid",
                onClick: nextPhoto,
                class: "nav-button"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if ((_b = unref(currentPhoto)) == null ? void 0 : _b.description) {
              _push2(`<div class="lightbox-footer" data-v-1b06998e${_scopeId}><p class="photo-description" data-v-1b06998e${_scopeId}>${ssrInterpolate(unref(currentPhoto).description)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "lightbox-container" }, [
                createVNode("div", { class: "lightbox-header" }, [
                  createVNode("h3", { class: "lightbox-title" }, toDisplayString(((_c = unref(currentPhoto)) == null ? void 0 : _c.title) || "Foto da par\xF3quia"), 1),
                  createVNode(_component_UButton, {
                    color: "neutral",
                    variant: "ghost",
                    icon: "i-heroicons-x-mark-20-solid",
                    onClick: closeLightbox
                  })
                ]),
                createVNode("div", { class: "lightbox-content" }, [
                  unref(currentPhoto) ? (openBlock(), createBlock(_component_NuxtImg, {
                    key: 0,
                    src: unref(currentPhoto).url,
                    alt: unref(currentPhoto).alt || "Foto da par\xF3quia",
                    class: "lightbox-image",
                    format: "webp",
                    quality: "90",
                    placeholder: ""
                  }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                  _ctx.photos.length > 1 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "lightbox-nav"
                  }, [
                    createVNode(_component_UButton, {
                      disabled: unref(currentIndex) === 0,
                      color: "neutral",
                      variant: "soft",
                      icon: "i-heroicons-chevron-left-20-solid",
                      onClick: previousPhoto,
                      class: "nav-button"
                    }, null, 8, ["disabled"]),
                    createVNode("span", { class: "nav-counter" }, toDisplayString(unref(currentIndex) + 1) + " / " + toDisplayString(_ctx.photos.length), 1),
                    createVNode(_component_UButton, {
                      disabled: unref(currentIndex) === _ctx.photos.length - 1,
                      color: "neutral",
                      variant: "soft",
                      icon: "i-heroicons-chevron-right-20-solid",
                      onClick: nextPhoto,
                      class: "nav-button"
                    }, null, 8, ["disabled"])
                  ])) : createCommentVNode("", true)
                ]),
                ((_d = unref(currentPhoto)) == null ? void 0 : _d.description) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "lightbox-footer"
                }, [
                  createVNode("p", { class: "photo-description" }, toDisplayString(unref(currentPhoto).description), 1)
                ])) : createCommentVNode("", true)
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Parish/ParishGallery.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1b06998e"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    route.params.id;
    const { getMassSchedule, getDayName } = useParishes();
    const parish = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const socialContacts = computed(() => {
      if (!parish.value) return [];
      return parish.value.contacts.filter(
        (contact) => ["facebook", "instagram", "whatsapp", "youtube", "twitter"].includes(contact.type)
      );
    });
    const massScheduleData = computed(() => {
      if (!parish.value || !parish.value.masses) return {};
      return getMassSchedule(parish.value.masses);
    });
    const parishPhotos = computed(() => {
      if (!parish.value) return [];
      return [
        {
          id: "1",
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
          alt: "Interior da igreja",
          title: "Interior da Igreja",
          description: "Vista interna do altar principal",
          order: 1
        },
        {
          id: "2",
          url: "https://images.unsplash.com/photo-1520637836862-4d197d17c35a?w=400&h=300&fit=crop",
          alt: "Fachada da par\xF3quia",
          title: "Fachada Principal",
          description: "Entrada principal da par\xF3quia",
          order: 2
        },
        {
          id: "3",
          url: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=400&h=300&fit=crop",
          alt: "Altar da igreja",
          title: "Altar Principal",
          description: "Altar onde s\xE3o celebradas as missas",
          order: 3
        },
        {
          id: "4",
          url: "https://images.unsplash.com/photo-1605130284535-7c2ad0e09e4b?w=400&h=300&fit=crop",
          alt: "Atividade paroquial",
          title: "Atividades Paroquiais",
          description: "Encontro da comunidade paroquial",
          order: 4
        }
      ];
    });
    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + "...";
    };
    const getMassTypeName = (type) => {
      const types = {
        normal: "Missa",
        children: "Missa das Crian\xE7as",
        youth: "Missa dos Jovens",
        healing: "Missa da Cura",
        special: "Missa Especial"
      };
      return types[type] || "Missa";
    };
    const formatEventDay = (date) => {
      return new Date(date).getDate().toString().padStart(2, "0");
    };
    const formatEventMonth = (date) => {
      const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
      return months[new Date(date).getMonth()];
    };
    const formatEventTime = (date) => {
      return new Date(date).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      });
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
      const _component_LoadingSpinner = resolveComponent("LoadingSpinner");
      const _component_Icon = __nuxt_component_1$1;
      const _component_CatholicButton = resolveComponent("CatholicButton");
      const _component_CalendarExport = resolveComponent("CalendarExport");
      const _component_ParishGallery = __nuxt_component_1;
      const _component_DonationSection = resolveComponent("DonationSection");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(loading)) {
        _push(`<div class="loading-container">`);
        _push(ssrRenderComponent(_component_LoadingSpinner, { class: "loading-spinner" }, null, _parent));
        _push(`<p class="loading-text">Carregando detalhes da par\xF3quia...</p></div>`);
      } else if (unref(error) || !unref(parish)) {
        _push(`<div class="error-container">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:exclamation-triangle",
          class: "error-icon"
        }, null, _parent));
        _push(`<h1 class="error-title">Par\xF3quia n\xE3o encontrada</h1><p class="error-message">${ssrInterpolate(unref(error) || "A par\xF3quia solicitada n\xE3o foi encontrada ou n\xE3o existe.")}</p><div class="error-actions">`);
        _push(ssrRenderComponent(_component_CatholicButton, {
          onClick: ($event) => _ctx.$router.go(-1),
          variant: "secondary",
          size: "md"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:arrow-left",
                class: "button-icon"
              }, null, _parent2, _scopeId));
              _push2(` Voltar `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:arrow-left",
                  class: "button-icon"
                }),
                createTextVNode(" Voltar ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_CatholicButton, {
          onClick: ($event) => _ctx.$router.push("/paroquias"),
          variant: "primary",
          size: "md"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:building-library",
                class: "button-icon"
              }, null, _parent2, _scopeId));
              _push2(` Ver todas as par\xF3quias `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:building-library",
                  class: "button-icon"
                }),
                createTextVNode(" Ver todas as par\xF3quias ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="parish-details"><div class="parish-hero"><div class="hero-background"><div class="hero-overlay"></div></div><div class="hero-content"><div class="hero-container"><div class="hero-main"><div class="hero-badge">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:building-library",
          class: "badge-icon"
        }, null, _parent));
        _push(` ${ssrInterpolate(unref(parish).diocese.name)}</div><h1 class="hero-title">${ssrInterpolate(unref(parish).name)}</h1><div class="hero-location">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:map-pin",
          class: "location-icon"
        }, null, _parent));
        _push(`<span class="location-text">${ssrInterpolate(unref(parish).address)} - ${ssrInterpolate(unref(parish).city.name)}, ${ssrInterpolate(unref(parish).state.code)} `);
        if (unref(parish).neighborhood) {
          _push(`<span> (${ssrInterpolate(unref(parish).neighborhood.name)})</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span></div>`);
        if (unref(parish).description) {
          _push(`<p class="hero-description">${ssrInterpolate(unref(parish).description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="hero-contact">`);
        if (unref(parish).phone) {
          _push(`<div class="contact-item"><a${ssrRenderAttr("href", `tel:${unref(parish).phone}`)} class="contact-link">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:phone",
            class: "contact-icon"
          }, null, _parent));
          _push(` ${ssrInterpolate(unref(parish).phone)}</a></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(parish).email) {
          _push(`<div class="contact-item"><a${ssrRenderAttr("href", `mailto:${unref(parish).email}`)} class="contact-link">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:envelope",
            class: "contact-icon"
          }, null, _parent));
          _push(` ${ssrInterpolate(unref(parish).email)}</a></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(parish).website) {
          _push(`<div class="contact-item"><a${ssrRenderAttr("href", unref(parish).website)} target="_blank" rel="noopener noreferrer" class="contact-link">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:globe-alt",
            class: "contact-icon"
          }, null, _parent));
          _push(` Website </a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div><div class="parish-content"><div class="container mx-auto px-4 py-8"><div class="content-grid"><div class="main-column">`);
        if (unref(parish).priests.length > 0) {
          _push(`<section class="content-section"><h2 class="section-title">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:user",
            class: "section-icon"
          }, null, _parent));
          _push(` Equipe Paroquial </h2><div class="priests-grid"><!--[-->`);
          ssrRenderList(unref(parish).priests, (priest) => {
            _push(`<div class="priest-card"><div class="priest-avatar">`);
            if (priest.user.profile.avatar) {
              _push(`<img${ssrRenderAttr("src", priest.user.profile.avatar)}${ssrRenderAttr("alt", `${priest.user.profile.firstName} ${priest.user.profile.lastName}`)} class="avatar-image">`);
            } else {
              _push(ssrRenderComponent(_component_Icon, {
                name: "heroicons:user",
                class: "avatar-icon"
              }, null, _parent));
            }
            _push(`</div><div class="priest-info"><h3 class="priest-name">${ssrInterpolate(priest.user.profile.firstName)} ${ssrInterpolate(priest.user.profile.lastName)}</h3><span class="priest-role">${ssrInterpolate(priest.isMain ? "P\xE1roco" : "Vig\xE1rio Paroquial")}</span>`);
            if (priest.user.profile.bio) {
              _push(`<p class="priest-bio">${ssrInterpolate(priest.user.profile.bio)}</p>`);
            } else {
              _push(`<!---->`);
            }
            if (priest.user.profile.phone) {
              _push(`<div class="priest-contact">`);
              _push(ssrRenderComponent(_component_Icon, {
                name: "heroicons:phone",
                class: "contact-icon"
              }, null, _parent));
              _push(`<a${ssrRenderAttr("href", `tel:${priest.user.profile.phone}`)} class="contact-text">${ssrInterpolate(priest.user.profile.phone)}</a></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(massScheduleData) && Object.keys(unref(massScheduleData)).length > 0) {
          _push(`<section class="content-section"><div class="section-header"><h2 class="section-title">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:clock",
            class: "section-icon"
          }, null, _parent));
          _push(` Hor\xE1rios de Missa </h2>`);
          _push(ssrRenderComponent(_component_CalendarExport, {
            masses: unref(parish).masses,
            "parish-name": unref(parish).name,
            "parish-address": `${unref(parish).address}, ${unref(parish).city.name}, ${unref(parish).state.code}`
          }, null, _parent));
          _push(`</div><div class="mass-schedule"><!--[-->`);
          ssrRenderList(unref(massScheduleData), (masses, dayOfWeek) => {
            _push(`<div class="schedule-day"><h3 class="day-name">${ssrInterpolate(unref(getDayName)(Number(dayOfWeek)))}</h3><div class="day-masses"><!--[-->`);
            ssrRenderList(masses, (mass, index) => {
              _push(`<div class="mass-item"><span class="mass-time">${ssrInterpolate(mass.time)}</span><div class="mass-details"><span class="mass-type">${ssrInterpolate(getMassTypeName(mass.type))}</span>`);
              if (mass.description) {
                _push(`<span class="mass-description">${ssrInterpolate(mass.description)}</span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div></div>`);
            });
            _push(`<!--]--></div></div>`);
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(parish).events && unref(parish).events.length > 0) {
          _push(`<section class="content-section"><h2 class="section-title">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:calendar-days",
            class: "section-icon"
          }, null, _parent));
          _push(` Pr\xF3ximos Eventos </h2><div class="events-list"><!--[-->`);
          ssrRenderList(unref(parish).events, (event) => {
            _push(`<div class="event-card"><div class="event-date"><span class="event-day">${ssrInterpolate(formatEventDay(event.startDate))}</span><span class="event-month">${ssrInterpolate(formatEventMonth(event.startDate))}</span></div><div class="event-info"><h3 class="event-title">${ssrInterpolate(event.title)}</h3>`);
            if (event.description) {
              _push(`<p class="event-description">${ssrInterpolate(truncateText(event.description, 100))}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="event-meta"><span class="event-time">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:clock",
              class: "meta-icon"
            }, null, _parent));
            _push(` ${ssrInterpolate(formatEventTime(event.startDate))}</span>`);
            if (event.location) {
              _push(`<span class="event-location">`);
              _push(ssrRenderComponent(_component_Icon, {
                name: "heroicons:map-pin",
                class: "meta-icon"
              }, null, _parent));
              _push(` ${ssrInterpolate(event.location)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div></div>`);
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(parish).ministries && unref(parish).ministries.length > 0) {
          _push(`<section class="content-section"><h2 class="section-title">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:user-group",
            class: "section-icon"
          }, null, _parent));
          _push(` Minist\xE9rios e Pastorais </h2><div class="ministries-grid"><!--[-->`);
          ssrRenderList(unref(parish).ministries, (ministry) => {
            _push(`<div class="ministry-card"><div class="ministry-header"><h3 class="ministry-name">${ssrInterpolate(ministry.name)}</h3><span class="ministry-members">${ssrInterpolate(ministry._count.members)} ${ssrInterpolate(ministry._count.members === 1 ? "membro" : "membros")}</span></div>`);
            if (ministry.description) {
              _push(`<p class="ministry-description">${ssrInterpolate(ministry.description)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(parishPhotos).length > 0) {
          _push(`<section class="content-section"><h2 class="section-title">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:photo",
            class: "section-icon"
          }, null, _parent));
          _push(` Galeria de Fotos </h2>`);
          _push(ssrRenderComponent(_component_ParishGallery, { photos: unref(parishPhotos) }, null, _parent));
          _push(`</section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><aside class="sidebar-column"><div class="sidebar-card"><h3 class="sidebar-title">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:phone",
          class: "sidebar-icon"
        }, null, _parent));
        _push(` Contato </h3><div class="contact-list">`);
        if (unref(parish).phone) {
          _push(`<div class="contact-item">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:phone",
            class: "contact-icon"
          }, null, _parent));
          _push(`<a${ssrRenderAttr("href", `tel:${unref(parish).phone}`)} class="contact-text">${ssrInterpolate(unref(parish).phone)}</a></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(parish).email) {
          _push(`<div class="contact-item">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:envelope",
            class: "contact-icon"
          }, null, _parent));
          _push(`<a${ssrRenderAttr("href", `mailto:${unref(parish).email}`)} class="contact-text">${ssrInterpolate(unref(parish).email)}</a></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(parish).website) {
          _push(`<div class="contact-item">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:globe-alt",
            class: "contact-icon"
          }, null, _parent));
          _push(`<a${ssrRenderAttr("href", unref(parish).website)} target="_blank" rel="noopener noreferrer" class="contact-text"> Website </a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="contact-item">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:map-pin",
          class: "contact-icon"
        }, null, _parent));
        _push(`<span class="contact-text">${ssrInterpolate(unref(parish).address)}<br> ${ssrInterpolate(unref(parish).city.name)}, ${ssrInterpolate(unref(parish).state.code)} `);
        if (unref(parish).neighborhood) {
          _push(`<span> - ${ssrInterpolate(unref(parish).neighborhood.name)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span></div></div></div>`);
        if (unref(socialContacts).length > 0) {
          _push(`<div class="sidebar-card"><h3 class="sidebar-title">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:share",
            class: "sidebar-icon"
          }, null, _parent));
          _push(` Redes Sociais </h3><div class="social-list"><!--[-->`);
          ssrRenderList(unref(socialContacts), (contact) => {
            _push(`<a${ssrRenderAttr("href", getSocialUrl(contact))} target="_blank" rel="noopener noreferrer" class="social-link">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: getSocialIcon(contact.type),
              class: "social-icon"
            }, null, _parent));
            _push(`<span class="social-name">${ssrInterpolate(getSocialTitle(contact.type))}</span></a>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="sidebar-card"><h3 class="sidebar-title">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chart-bar",
          class: "sidebar-icon"
        }, null, _parent));
        _push(` Informa\xE7\xF5es </h3><div class="stats-list"><div class="stat-item">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:calendar-days",
          class: "stat-icon"
        }, null, _parent));
        _push(`<span class="stat-text">${ssrInterpolate(unref(parish)._count.events)} ${ssrInterpolate(unref(parish)._count.events === 1 ? "evento" : "eventos")}</span></div><div class="stat-item">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:user-group",
          class: "stat-icon"
        }, null, _parent));
        _push(`<span class="stat-text">${ssrInterpolate(unref(parish)._count.ministries)} ${ssrInterpolate(unref(parish)._count.ministries === 1 ? "minist\xE9rio" : "minist\xE9rios")}</span></div><div class="stat-item">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:building-library",
          class: "stat-icon"
        }, null, _parent));
        _push(`<span class="stat-text">${ssrInterpolate(unref(parish).diocese.name)}</span></div></div></div><div class="sidebar-card donation-sidebar">`);
        _push(ssrRenderComponent(_component_DonationSection, {
          "parish-name": unref(parish).name,
          "parish-location": `${unref(parish).city.name}, ${unref(parish).state.code}`,
          "pix-key": unref(parish).pixKey || "pix@paroquia.com.br",
          "qr-code-url": unref(parish).qrCodeUrl
        }, null, _parent));
        _push(`</div></aside></div></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/paroquias/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CHOSWIju.mjs.map
