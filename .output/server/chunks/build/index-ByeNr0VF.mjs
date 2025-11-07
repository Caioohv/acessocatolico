import __nuxt_component_1 from './index-B5rpN8hp.mjs';
import { _ as _sfc_main$1 } from './Form-ClTyhc7H.mjs';
import { _ as _sfc_main$2 } from './Input-CMCaI9pM.mjs';
import { _ as _sfc_main$3 } from './Textarea-0gyuVVm7.mjs';
import { _ as _sfc_main$4 } from './Select-dln4ivrK.mjs';
import { _ as _sfc_main$5 } from './SelectMenu-C0_KlmQW.mjs';
import { a as _sfc_main$6 } from './Button-BeuMp5nt.mjs';
import { _ as _sfc_main$7 } from './Alert-B71gfiAR.mjs';
import { defineComponent, ref, reactive, computed, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { z } from 'zod';
import { _ as _export_sfc, b as useSeoMeta, n as navigateTo } from './server.mjs';
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
import '@vueuse/core';
import 'reka-ui';
import './usePortal-BbZPQQY_.mjs';
import './Chip-DwZPpwbq.mjs';
import './useLocale-CtluvDKB.mjs';
import 'tailwind-variants';
import './NuxtImg-DFTKHYRn.mjs';
import './nuxt-link-Bn_O9NYZ.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Cadastro de Padre - AcessoCat\xF3lico",
      ogTitle: "Cadastro de Padre - AcessoCat\xF3lico",
      description: "Cadastre-se como padre na plataforma AcessoCat\xF3lico e conecte sua par\xF3quia com fi\xE9is de todo o Brasil.",
      ogDescription: "Cadastre-se como padre na plataforma AcessoCat\xF3lico e conecte sua par\xF3quia com fi\xE9is de todo o Brasil."
    });
    const schema = z.object({
      firstName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
      lastName: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
      email: z.string().email("Email inv\xE1lido"),
      phone: z.string().min(10, "Telefone inv\xE1lido"),
      birthDate: z.string().min(1, "Data de nascimento \xE9 obrigat\xF3ria"),
      cpf: z.string().min(11, "CPF inv\xE1lido"),
      bio: z.string().optional(),
      ordinationNumber: z.string().min(1, "N\xFAmero de ordena\xE7\xE3o \xE9 obrigat\xF3rio"),
      ordinationDate: z.string().min(1, "Data de ordena\xE7\xE3o \xE9 obrigat\xF3ria"),
      ordinationDiocese: z.string().min(1, "Diocese \xE9 obrigat\xF3ria"),
      seminary: z.string().optional(),
      specializations: z.array(z.string()).optional(),
      languages: z.array(z.string()).optional()
    });
    const currentStep = ref(0);
    const loading = ref(false);
    const uploading = ref({
      ordination: false,
      identity: false,
      recommendation: false
    });
    const formData = reactive({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: "",
      cpf: "",
      bio: "",
      ordinationNumber: "",
      ordinationDate: "",
      ordinationDiocese: "",
      seminary: "",
      specializations: [],
      languages: [],
      documents: {
        ordination: null,
        identity: null,
        recommendation: null
      }
    });
    const steps = [
      {
        id: "personal",
        title: "Dados Pessoais",
        description: "Informa\xE7\xF5es b\xE1sicas"
      },
      {
        id: "ecclesiastical",
        title: "Dados Eclesi\xE1sticos",
        description: "Informa\xE7\xF5es do minist\xE9rio"
      },
      {
        id: "documents",
        title: "Documenta\xE7\xE3o",
        description: "Upload de documentos"
      },
      {
        id: "confirmation",
        title: "Confirma\xE7\xE3o",
        description: "Revis\xE3o e envio"
      }
    ];
    const diocesesOptions = [
      { label: "Arquidiocese de S\xE3o Paulo", value: "arquidiocese-sao-paulo" },
      { label: "Arquidiocese do Rio de Janeiro", value: "arquidiocese-rio-janeiro" },
      { label: "Arquidiocese de Bras\xEDlia", value: "arquidiocese-brasilia" }
      // ... more dioceses
    ];
    const specializationOptions = [
      { label: "Teologia Moral", value: "teologia-moral" },
      { label: "Liturgia", value: "liturgia" },
      { label: "Catequese", value: "catequese" },
      { label: "Pastoral Familiar", value: "pastoral-familiar" },
      { label: "Pastoral Jovem", value: "pastoral-jovem" },
      { label: "Direito Can\xF4nico", value: "direito-canonico" }
    ];
    const languageOptions = [
      { label: "Portugu\xEAs", value: "portugues" },
      { label: "Espanhol", value: "espanhol" },
      { label: "Ingl\xEAs", value: "ingles" },
      { label: "Italiano", value: "italiano" },
      { label: "Latim", value: "latim" },
      { label: "Franc\xEAs", value: "frances" }
    ];
    const canProceed = computed(() => {
      switch (currentStep.value) {
        case 0:
          return formData.firstName && formData.lastName && formData.email && formData.phone && formData.birthDate && formData.cpf;
        case 1:
          return formData.ordinationNumber && formData.ordinationDate && formData.ordinationDiocese;
        case 2:
          return formData.documents.ordination && formData.documents.identity;
        default:
          return true;
      }
    });
    const canSubmit = computed(() => {
      return canProceed.value && currentStep.value === steps.length - 1;
    });
    const selectedDiocese = computed(() => {
      return diocesesOptions.find((d) => d.value === formData.ordinationDiocese);
    });
    const form = ref();
    const ordinationInput = ref();
    const identityInput = ref();
    const recommendationInput = ref();
    const nextStep = async () => {
      if (canProceed.value && currentStep.value < steps.length - 1) {
        currentStep.value++;
      }
    };
    const previousStep = () => {
      if (currentStep.value > 0) {
        currentStep.value--;
      }
    };
    const triggerFileUpload = (type) => {
      var _a;
      const inputMap = {
        ordination: ordinationInput.value,
        identity: identityInput.value,
        recommendation: recommendationInput.value
      };
      (_a = inputMap[type]) == null ? void 0 : _a.click();
    };
    const { submitRegistration, uploadDocument } = usePriest();
    const toast = useToast();
    const registrationId = ref(null);
    const handleFileUpload = async (type, event) => {
      var _a;
      const target = event.target;
      const file = (_a = target.files) == null ? void 0 : _a[0];
      if (file && type in uploading.value && type in formData.documents) {
        uploading.value[type] = true;
        try {
          ;
          formData.documents[type] = file;
          toast.add({
            title: "Documento selecionado",
            description: `${file.name} foi selecionado para upload`,
            color: "ui"
          });
        } catch (error) {
          toast.add({
            title: "Erro na sele\xE7\xE3o",
            description: "N\xE3o foi poss\xEDvel selecionar o documento",
            color: "ui"
          });
        } finally {
          uploading.value[type] = false;
        }
      }
    };
    const handleSubmit = async () => {
      loading.value = true;
      try {
        const registrationData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          birthDate: formData.birthDate,
          cpf: formData.cpf,
          bio: formData.bio || void 0,
          ordinationNumber: formData.ordinationNumber,
          ordinationDate: formData.ordinationDate,
          ordinationDiocese: formData.ordinationDiocese,
          seminary: formData.seminary || void 0,
          specializations: formData.specializations.length > 0 ? formData.specializations : void 0,
          languages: formData.languages.length > 0 ? formData.languages : void 0
        };
        const registrationResult = await submitRegistration(registrationData);
        if (registrationResult.success && registrationResult.registrationId) {
          registrationId.value = registrationResult.registrationId;
          const documentUploads = [];
          if (formData.documents.ordination) {
            documentUploads.push(
              uploadDocument(registrationId.value, "ORDINATION_CERTIFICATE", formData.documents.ordination)
            );
          }
          if (formData.documents.identity) {
            documentUploads.push(
              uploadDocument(registrationId.value, "IDENTITY_DOCUMENT", formData.documents.identity)
            );
          }
          if (formData.documents.recommendation) {
            documentUploads.push(
              uploadDocument(registrationId.value, "RECOMMENDATION_LETTER", formData.documents.recommendation)
            );
          }
          if (documentUploads.length > 0) {
            try {
              await Promise.all(documentUploads);
              console.log("All documents uploaded successfully");
            } catch (uploadError) {
              console.warn("Some documents failed to upload:", uploadError);
            }
          }
          toast.add({
            title: "Cadastro enviado com sucesso!",
            description: registrationResult.message,
            color: "primary"
          });
          await navigateTo("/cadastro/padre/sucesso");
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.add({
          title: "Erro no cadastro",
          description: error.message || "Ocorreu um erro ao processar seu cadastro. Tente novamente.",
          color: "ui"
        });
      } finally {
        loading.value = false;
      }
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("pt-BR");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_UForm = _sfc_main$1;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_UInput = _sfc_main$2;
      const _component_UTextarea = _sfc_main$3;
      const _component_USelect = _sfc_main$4;
      const _component_USelectMenu = _sfc_main$5;
      const _component_UButton = _sfc_main$6;
      const _component_UAlert = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "priest-registration" }, _attrs))} data-v-5fe63452><div class="registration-container" data-v-5fe63452><div class="registration-header" data-v-5fe63452><div class="header-content" data-v-5fe63452>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:academic-cap",
        class: "header-icon"
      }, null, _parent));
      _push(`<h1 class="header-title" data-v-5fe63452>Cadastro de Padre</h1><p class="header-description" data-v-5fe63452> Junte-se \xE0 nossa plataforma e conecte sua par\xF3quia com fi\xE9is de todo o Brasil </p></div></div><div class="registration-form" data-v-5fe63452>`);
      _push(ssrRenderComponent(_component_UForm, {
        ref_key: "form",
        ref: form,
        schema: unref(schema),
        state: unref(formData),
        onSubmit: handleSubmit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="step-indicator" data-v-5fe63452${_scopeId}><!--[-->`);
            ssrRenderList(steps, (step, index2) => {
              _push2(`<div class="${ssrRenderClass(["step-item", {
                "active": unref(currentStep) === index2,
                "completed": index2 < unref(currentStep)
              }])}" data-v-5fe63452${_scopeId}><div class="step-number" data-v-5fe63452${_scopeId}>${ssrInterpolate(index2 + 1)}</div><div class="step-info" data-v-5fe63452${_scopeId}><div class="step-title" data-v-5fe63452${_scopeId}>${ssrInterpolate(step.title)}</div><div class="step-description" data-v-5fe63452${_scopeId}>${ssrInterpolate(step.description)}</div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (unref(currentStep) === 0) {
              _push2(`<div class="form-step" data-v-5fe63452${_scopeId}><h2 class="step-title" data-v-5fe63452${_scopeId}>Informa\xE7\xF5es Pessoais</h2><div class="form-grid" data-v-5fe63452${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Nome Completo",
                name: "firstName",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).firstName,
                      "onUpdate:modelValue": ($event) => unref(formData).firstName = $event,
                      placeholder: "Padre Jo\xE3o",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).firstName,
                        "onUpdate:modelValue": ($event) => unref(formData).firstName = $event,
                        placeholder: "Padre Jo\xE3o",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Sobrenome",
                name: "lastName",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).lastName,
                      "onUpdate:modelValue": ($event) => unref(formData).lastName = $event,
                      placeholder: "Silva",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).lastName,
                        "onUpdate:modelValue": ($event) => unref(formData).lastName = $event,
                        placeholder: "Silva",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Email",
                name: "email",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).email,
                      "onUpdate:modelValue": ($event) => unref(formData).email = $event,
                      type: "email",
                      placeholder: "padre@paroquia.com.br",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).email,
                        "onUpdate:modelValue": ($event) => unref(formData).email = $event,
                        type: "email",
                        placeholder: "padre@paroquia.com.br",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Telefone",
                name: "phone",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).phone,
                      "onUpdate:modelValue": ($event) => unref(formData).phone = $event,
                      placeholder: "(11) 99999-9999",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).phone,
                        "onUpdate:modelValue": ($event) => unref(formData).phone = $event,
                        placeholder: "(11) 99999-9999",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Data de Nascimento",
                name: "birthDate",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).birthDate,
                      "onUpdate:modelValue": ($event) => unref(formData).birthDate = $event,
                      type: "date",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).birthDate,
                        "onUpdate:modelValue": ($event) => unref(formData).birthDate = $event,
                        type: "date",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "CPF",
                name: "cpf",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).cpf,
                      "onUpdate:modelValue": ($event) => unref(formData).cpf = $event,
                      placeholder: "000.000.000-00",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).cpf,
                        "onUpdate:modelValue": ($event) => unref(formData).cpf = $event,
                        placeholder: "000.000.000-00",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Biografia (opcional)",
                name: "bio"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UTextarea, {
                      modelValue: unref(formData).bio,
                      "onUpdate:modelValue": ($event) => unref(formData).bio = $event,
                      placeholder: "Conte um pouco sobre sua trajet\xF3ria e minist\xE9rio...",
                      rows: 4,
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UTextarea, {
                        modelValue: unref(formData).bio,
                        "onUpdate:modelValue": ($event) => unref(formData).bio = $event,
                        placeholder: "Conte um pouco sobre sua trajet\xF3ria e minist\xE9rio...",
                        rows: 4,
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(currentStep) === 1) {
              _push2(`<div class="form-step" data-v-5fe63452${_scopeId}><h2 class="step-title" data-v-5fe63452${_scopeId}>Informa\xE7\xF5es Eclesi\xE1sticas</h2><div class="form-grid" data-v-5fe63452${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "N\xFAmero de Ordena\xE7\xE3o",
                name: "ordinationNumber",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).ordinationNumber,
                      "onUpdate:modelValue": ($event) => unref(formData).ordinationNumber = $event,
                      placeholder: "000123",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).ordinationNumber,
                        "onUpdate:modelValue": ($event) => unref(formData).ordinationNumber = $event,
                        placeholder: "000123",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Data de Ordena\xE7\xE3o",
                name: "ordinationDate",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).ordinationDate,
                      "onUpdate:modelValue": ($event) => unref(formData).ordinationDate = $event,
                      type: "date",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).ordinationDate,
                        "onUpdate:modelValue": ($event) => unref(formData).ordinationDate = $event,
                        type: "date",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Diocese de Ordena\xE7\xE3o",
                name: "ordinationDiocese",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_USelect, {
                      modelValue: unref(formData).ordinationDiocese,
                      "onUpdate:modelValue": ($event) => unref(formData).ordinationDiocese = $event,
                      options: diocesesOptions,
                      placeholder: "Selecione a diocese",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_USelect, {
                        modelValue: unref(formData).ordinationDiocese,
                        "onUpdate:modelValue": ($event) => unref(formData).ordinationDiocese = $event,
                        options: diocesesOptions,
                        placeholder: "Selecione a diocese",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Semin\xE1rio",
                name: "seminary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(formData).seminary,
                      "onUpdate:modelValue": ($event) => unref(formData).seminary = $event,
                      placeholder: "Nome do semin\xE1rio",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).seminary,
                        "onUpdate:modelValue": ($event) => unref(formData).seminary = $event,
                        placeholder: "Nome do semin\xE1rio",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Especializa\xE7\xF5es",
                name: "specializations"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_USelectMenu, {
                      modelValue: unref(formData).specializations,
                      "onUpdate:modelValue": ($event) => unref(formData).specializations = $event,
                      options: specializationOptions,
                      multiple: "",
                      placeholder: "Selecione suas especializa\xE7\xF5es",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_USelectMenu, {
                        modelValue: unref(formData).specializations,
                        "onUpdate:modelValue": ($event) => unref(formData).specializations = $event,
                        options: specializationOptions,
                        multiple: "",
                        placeholder: "Selecione suas especializa\xE7\xF5es",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Idiomas",
                name: "languages"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_USelectMenu, {
                      modelValue: unref(formData).languages,
                      "onUpdate:modelValue": ($event) => unref(formData).languages = $event,
                      options: languageOptions,
                      multiple: "",
                      placeholder: "Idiomas que fala",
                      disabled: unref(loading)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_USelectMenu, {
                        modelValue: unref(formData).languages,
                        "onUpdate:modelValue": ($event) => unref(formData).languages = $event,
                        options: languageOptions,
                        multiple: "",
                        placeholder: "Idiomas que fala",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(currentStep) === 2) {
              _push2(`<div class="form-step" data-v-5fe63452${_scopeId}><h2 class="step-title" data-v-5fe63452${_scopeId}>Documenta\xE7\xE3o Necess\xE1ria</h2><div class="documents-section" data-v-5fe63452${_scopeId}><div class="document-item" data-v-5fe63452${_scopeId}><div class="document-info" data-v-5fe63452${_scopeId}><h3 class="document-title" data-v-5fe63452${_scopeId}>Certid\xE3o de Ordena\xE7\xE3o</h3><p class="document-description" data-v-5fe63452${_scopeId}> Documento oficial que comprova sua ordena\xE7\xE3o sacerdotal </p></div><div class="document-upload" data-v-5fe63452${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: ($event) => triggerFileUpload("ordination"),
                variant: "outline",
                loading: unref(uploading).ordination,
                disabled: unref(loading)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, { name: "heroicons:cloud-arrow-up" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(unref(formData).documents.ordination ? "Alterar" : "Upload")}`);
                  } else {
                    return [
                      createVNode(_component_Icon, { name: "heroicons:cloud-arrow-up" }),
                      createTextVNode(" " + toDisplayString(unref(formData).documents.ordination ? "Alterar" : "Upload"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<input type="file" accept=".pdf,.jpg,.jpeg,.png" style="${ssrRenderStyle({ "display": "none" })}" data-v-5fe63452${_scopeId}>`);
              if (unref(formData).documents.ordination) {
                _push2(`<span class="file-name" data-v-5fe63452${_scopeId}>${ssrInterpolate(unref(formData).documents.ordination.name)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="document-item" data-v-5fe63452${_scopeId}><div class="document-info" data-v-5fe63452${_scopeId}><h3 class="document-title" data-v-5fe63452${_scopeId}>Documento de Identidade</h3><p class="document-description" data-v-5fe63452${_scopeId}> RG ou CNH para verifica\xE7\xE3o de identidade </p></div><div class="document-upload" data-v-5fe63452${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: ($event) => triggerFileUpload("identity"),
                variant: "outline",
                loading: unref(uploading).identity,
                disabled: unref(loading)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, { name: "heroicons:cloud-arrow-up" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(unref(formData).documents.identity ? "Alterar" : "Upload")}`);
                  } else {
                    return [
                      createVNode(_component_Icon, { name: "heroicons:cloud-arrow-up" }),
                      createTextVNode(" " + toDisplayString(unref(formData).documents.identity ? "Alterar" : "Upload"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<input type="file" accept=".pdf,.jpg,.jpeg,.png" style="${ssrRenderStyle({ "display": "none" })}" data-v-5fe63452${_scopeId}>`);
              if (unref(formData).documents.identity) {
                _push2(`<span class="file-name" data-v-5fe63452${_scopeId}>${ssrInterpolate(unref(formData).documents.identity.name)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="document-item" data-v-5fe63452${_scopeId}><div class="document-info" data-v-5fe63452${_scopeId}><h3 class="document-title" data-v-5fe63452${_scopeId}>Carta de Apresenta\xE7\xE3o (opcional)</h3><p class="document-description" data-v-5fe63452${_scopeId}> Carta do bispo ou superior eclesi\xE1stico </p></div><div class="document-upload" data-v-5fe63452${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: ($event) => triggerFileUpload("recommendation"),
                variant: "outline",
                loading: unref(uploading).recommendation,
                disabled: unref(loading)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, { name: "heroicons:cloud-arrow-up" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(unref(formData).documents.recommendation ? "Alterar" : "Upload")}`);
                  } else {
                    return [
                      createVNode(_component_Icon, { name: "heroicons:cloud-arrow-up" }),
                      createTextVNode(" " + toDisplayString(unref(formData).documents.recommendation ? "Alterar" : "Upload"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<input type="file" accept=".pdf,.jpg,.jpeg,.png" style="${ssrRenderStyle({ "display": "none" })}" data-v-5fe63452${_scopeId}>`);
              if (unref(formData).documents.recommendation) {
                _push2(`<span class="file-name" data-v-5fe63452${_scopeId}>${ssrInterpolate(unref(formData).documents.recommendation.name)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(currentStep) === 3) {
              _push2(`<div class="form-step" data-v-5fe63452${_scopeId}><h2 class="step-title" data-v-5fe63452${_scopeId}>Confirma\xE7\xE3o de Dados</h2><div class="confirmation-section" data-v-5fe63452${_scopeId}><div class="confirmation-item" data-v-5fe63452${_scopeId}><h3 data-v-5fe63452${_scopeId}>Informa\xE7\xF5es Pessoais</h3><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Nome:</strong> ${ssrInterpolate(unref(formData).firstName)} ${ssrInterpolate(unref(formData).lastName)}</p><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Email:</strong> ${ssrInterpolate(unref(formData).email)}</p><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Telefone:</strong> ${ssrInterpolate(unref(formData).phone)}</p></div><div class="confirmation-item" data-v-5fe63452${_scopeId}><h3 data-v-5fe63452${_scopeId}>Informa\xE7\xF5es Eclesi\xE1sticas</h3><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Ordena\xE7\xE3o:</strong> ${ssrInterpolate(unref(formData).ordinationNumber)}</p><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Data:</strong> ${ssrInterpolate(formatDate(unref(formData).ordinationDate))}</p><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Diocese:</strong> ${ssrInterpolate((_a = unref(selectedDiocese)) == null ? void 0 : _a.label)}</p></div><div class="confirmation-item" data-v-5fe63452${_scopeId}><h3 data-v-5fe63452${_scopeId}>Documentos</h3><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Certid\xE3o de Ordena\xE7\xE3o:</strong> ${ssrInterpolate(unref(formData).documents.ordination ? "\u2705 Enviado" : "\u274C N\xE3o enviado")}</p><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Documento de Identidade:</strong> ${ssrInterpolate(unref(formData).documents.identity ? "\u2705 Enviado" : "\u274C N\xE3o enviado")}</p><p data-v-5fe63452${_scopeId}><strong data-v-5fe63452${_scopeId}>Carta de Apresenta\xE7\xE3o:</strong> ${ssrInterpolate(unref(formData).documents.recommendation ? "\u2705 Enviado" : "\u2796 Opcional")}</p></div>`);
              _push2(ssrRenderComponent(_component_UAlert, {
                icon: "heroicons:information-circle",
                color: "blue",
                variant: "soft",
                title: "Processo de Aprova\xE7\xE3o",
                description: "Ap\xF3s o envio, seus dados ser\xE3o analisados pela equipe de modera\xE7\xE3o. Voc\xEA receber\xE1 um email com o resultado em at\xE9 5 dias \xFAteis."
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="form-actions" data-v-5fe63452${_scopeId}>`);
            if (unref(currentStep) > 0) {
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: previousStep,
                variant: "outline",
                disabled: unref(loading)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, { name: "heroicons:arrow-left" }, null, _parent3, _scopeId2));
                    _push3(` Anterior `);
                  } else {
                    return [
                      createVNode(_component_Icon, { name: "heroicons:arrow-left" }),
                      createTextVNode(" Anterior ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="actions-right" data-v-5fe63452${_scopeId}>`);
            if (unref(currentStep) < steps.length - 1) {
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: nextStep,
                disabled: !unref(canProceed),
                loading: unref(loading)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Pr\xF3ximo `);
                    _push3(ssrRenderComponent(_component_Icon, { name: "heroicons:arrow-right" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createTextVNode(" Pr\xF3ximo "),
                      createVNode(_component_Icon, { name: "heroicons:arrow-right" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_UButton, {
                type: "submit",
                disabled: !unref(canSubmit),
                loading: unref(loading),
                color: "green"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, { name: "heroicons:check" }, null, _parent3, _scopeId2));
                    _push3(` Enviar Cadastro `);
                  } else {
                    return [
                      createVNode(_component_Icon, { name: "heroicons:check" }),
                      createTextVNode(" Enviar Cadastro ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "step-indicator" }, [
                (openBlock(), createBlock(Fragment, null, renderList(steps, (step, index2) => {
                  return createVNode("div", {
                    key: step.id,
                    class: ["step-item", {
                      "active": unref(currentStep) === index2,
                      "completed": index2 < unref(currentStep)
                    }]
                  }, [
                    createVNode("div", { class: "step-number" }, toDisplayString(index2 + 1), 1),
                    createVNode("div", { class: "step-info" }, [
                      createVNode("div", { class: "step-title" }, toDisplayString(step.title), 1),
                      createVNode("div", { class: "step-description" }, toDisplayString(step.description), 1)
                    ])
                  ], 2);
                }), 64))
              ]),
              unref(currentStep) === 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "form-step"
              }, [
                createVNode("h2", { class: "step-title" }, "Informa\xE7\xF5es Pessoais"),
                createVNode("div", { class: "form-grid" }, [
                  createVNode(_component_UFormGroup, {
                    label: "Nome Completo",
                    name: "firstName",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).firstName,
                        "onUpdate:modelValue": ($event) => unref(formData).firstName = $event,
                        placeholder: "Padre Jo\xE3o",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Sobrenome",
                    name: "lastName",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).lastName,
                        "onUpdate:modelValue": ($event) => unref(formData).lastName = $event,
                        placeholder: "Silva",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Email",
                    name: "email",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).email,
                        "onUpdate:modelValue": ($event) => unref(formData).email = $event,
                        type: "email",
                        placeholder: "padre@paroquia.com.br",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Telefone",
                    name: "phone",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).phone,
                        "onUpdate:modelValue": ($event) => unref(formData).phone = $event,
                        placeholder: "(11) 99999-9999",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Data de Nascimento",
                    name: "birthDate",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).birthDate,
                        "onUpdate:modelValue": ($event) => unref(formData).birthDate = $event,
                        type: "date",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "CPF",
                    name: "cpf",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).cpf,
                        "onUpdate:modelValue": ($event) => unref(formData).cpf = $event,
                        placeholder: "000.000.000-00",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  })
                ]),
                createVNode(_component_UFormGroup, {
                  label: "Biografia (opcional)",
                  name: "bio"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UTextarea, {
                      modelValue: unref(formData).bio,
                      "onUpdate:modelValue": ($event) => unref(formData).bio = $event,
                      placeholder: "Conte um pouco sobre sua trajet\xF3ria e minist\xE9rio...",
                      rows: 4,
                      disabled: unref(loading)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true),
              unref(currentStep) === 1 ? (openBlock(), createBlock("div", {
                key: 1,
                class: "form-step"
              }, [
                createVNode("h2", { class: "step-title" }, "Informa\xE7\xF5es Eclesi\xE1sticas"),
                createVNode("div", { class: "form-grid" }, [
                  createVNode(_component_UFormGroup, {
                    label: "N\xFAmero de Ordena\xE7\xE3o",
                    name: "ordinationNumber",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).ordinationNumber,
                        "onUpdate:modelValue": ($event) => unref(formData).ordinationNumber = $event,
                        placeholder: "000123",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Data de Ordena\xE7\xE3o",
                    name: "ordinationDate",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).ordinationDate,
                        "onUpdate:modelValue": ($event) => unref(formData).ordinationDate = $event,
                        type: "date",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Diocese de Ordena\xE7\xE3o",
                    name: "ordinationDiocese",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_USelect, {
                        modelValue: unref(formData).ordinationDiocese,
                        "onUpdate:modelValue": ($event) => unref(formData).ordinationDiocese = $event,
                        options: diocesesOptions,
                        placeholder: "Selecione a diocese",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Semin\xE1rio",
                    name: "seminary"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(formData).seminary,
                        "onUpdate:modelValue": ($event) => unref(formData).seminary = $event,
                        placeholder: "Nome do semin\xE1rio",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Especializa\xE7\xF5es",
                    name: "specializations"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_USelectMenu, {
                        modelValue: unref(formData).specializations,
                        "onUpdate:modelValue": ($event) => unref(formData).specializations = $event,
                        options: specializationOptions,
                        multiple: "",
                        placeholder: "Selecione suas especializa\xE7\xF5es",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Idiomas",
                    name: "languages"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_USelectMenu, {
                        modelValue: unref(formData).languages,
                        "onUpdate:modelValue": ($event) => unref(formData).languages = $event,
                        options: languageOptions,
                        multiple: "",
                        placeholder: "Idiomas que fala",
                        disabled: unref(loading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  })
                ])
              ])) : createCommentVNode("", true),
              unref(currentStep) === 2 ? (openBlock(), createBlock("div", {
                key: 2,
                class: "form-step"
              }, [
                createVNode("h2", { class: "step-title" }, "Documenta\xE7\xE3o Necess\xE1ria"),
                createVNode("div", { class: "documents-section" }, [
                  createVNode("div", { class: "document-item" }, [
                    createVNode("div", { class: "document-info" }, [
                      createVNode("h3", { class: "document-title" }, "Certid\xE3o de Ordena\xE7\xE3o"),
                      createVNode("p", { class: "document-description" }, " Documento oficial que comprova sua ordena\xE7\xE3o sacerdotal ")
                    ]),
                    createVNode("div", { class: "document-upload" }, [
                      createVNode(_component_UButton, {
                        onClick: ($event) => triggerFileUpload("ordination"),
                        variant: "outline",
                        loading: unref(uploading).ordination,
                        disabled: unref(loading)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, { name: "heroicons:cloud-arrow-up" }),
                          createTextVNode(" " + toDisplayString(unref(formData).documents.ordination ? "Alterar" : "Upload"), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick", "loading", "disabled"]),
                      createVNode("input", {
                        ref_key: "ordinationInput",
                        ref: ordinationInput,
                        type: "file",
                        accept: ".pdf,.jpg,.jpeg,.png",
                        style: { "display": "none" },
                        onChange: ($event) => handleFileUpload("ordination", $event)
                      }, null, 40, ["onChange"]),
                      unref(formData).documents.ordination ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "file-name"
                      }, toDisplayString(unref(formData).documents.ordination.name), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "document-item" }, [
                    createVNode("div", { class: "document-info" }, [
                      createVNode("h3", { class: "document-title" }, "Documento de Identidade"),
                      createVNode("p", { class: "document-description" }, " RG ou CNH para verifica\xE7\xE3o de identidade ")
                    ]),
                    createVNode("div", { class: "document-upload" }, [
                      createVNode(_component_UButton, {
                        onClick: ($event) => triggerFileUpload("identity"),
                        variant: "outline",
                        loading: unref(uploading).identity,
                        disabled: unref(loading)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, { name: "heroicons:cloud-arrow-up" }),
                          createTextVNode(" " + toDisplayString(unref(formData).documents.identity ? "Alterar" : "Upload"), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick", "loading", "disabled"]),
                      createVNode("input", {
                        ref_key: "identityInput",
                        ref: identityInput,
                        type: "file",
                        accept: ".pdf,.jpg,.jpeg,.png",
                        style: { "display": "none" },
                        onChange: ($event) => handleFileUpload("identity", $event)
                      }, null, 40, ["onChange"]),
                      unref(formData).documents.identity ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "file-name"
                      }, toDisplayString(unref(formData).documents.identity.name), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "document-item" }, [
                    createVNode("div", { class: "document-info" }, [
                      createVNode("h3", { class: "document-title" }, "Carta de Apresenta\xE7\xE3o (opcional)"),
                      createVNode("p", { class: "document-description" }, " Carta do bispo ou superior eclesi\xE1stico ")
                    ]),
                    createVNode("div", { class: "document-upload" }, [
                      createVNode(_component_UButton, {
                        onClick: ($event) => triggerFileUpload("recommendation"),
                        variant: "outline",
                        loading: unref(uploading).recommendation,
                        disabled: unref(loading)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, { name: "heroicons:cloud-arrow-up" }),
                          createTextVNode(" " + toDisplayString(unref(formData).documents.recommendation ? "Alterar" : "Upload"), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick", "loading", "disabled"]),
                      createVNode("input", {
                        ref_key: "recommendationInput",
                        ref: recommendationInput,
                        type: "file",
                        accept: ".pdf,.jpg,.jpeg,.png",
                        style: { "display": "none" },
                        onChange: ($event) => handleFileUpload("recommendation", $event)
                      }, null, 40, ["onChange"]),
                      unref(formData).documents.recommendation ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "file-name"
                      }, toDisplayString(unref(formData).documents.recommendation.name), 1)) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ])) : createCommentVNode("", true),
              unref(currentStep) === 3 ? (openBlock(), createBlock("div", {
                key: 3,
                class: "form-step"
              }, [
                createVNode("h2", { class: "step-title" }, "Confirma\xE7\xE3o de Dados"),
                createVNode("div", { class: "confirmation-section" }, [
                  createVNode("div", { class: "confirmation-item" }, [
                    createVNode("h3", null, "Informa\xE7\xF5es Pessoais"),
                    createVNode("p", null, [
                      createVNode("strong", null, "Nome:"),
                      createTextVNode(" " + toDisplayString(unref(formData).firstName) + " " + toDisplayString(unref(formData).lastName), 1)
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Email:"),
                      createTextVNode(" " + toDisplayString(unref(formData).email), 1)
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Telefone:"),
                      createTextVNode(" " + toDisplayString(unref(formData).phone), 1)
                    ])
                  ]),
                  createVNode("div", { class: "confirmation-item" }, [
                    createVNode("h3", null, "Informa\xE7\xF5es Eclesi\xE1sticas"),
                    createVNode("p", null, [
                      createVNode("strong", null, "Ordena\xE7\xE3o:"),
                      createTextVNode(" " + toDisplayString(unref(formData).ordinationNumber), 1)
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Data:"),
                      createTextVNode(" " + toDisplayString(formatDate(unref(formData).ordinationDate)), 1)
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Diocese:"),
                      createTextVNode(" " + toDisplayString((_b = unref(selectedDiocese)) == null ? void 0 : _b.label), 1)
                    ])
                  ]),
                  createVNode("div", { class: "confirmation-item" }, [
                    createVNode("h3", null, "Documentos"),
                    createVNode("p", null, [
                      createVNode("strong", null, "Certid\xE3o de Ordena\xE7\xE3o:"),
                      createTextVNode(" " + toDisplayString(unref(formData).documents.ordination ? "\u2705 Enviado" : "\u274C N\xE3o enviado"), 1)
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Documento de Identidade:"),
                      createTextVNode(" " + toDisplayString(unref(formData).documents.identity ? "\u2705 Enviado" : "\u274C N\xE3o enviado"), 1)
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Carta de Apresenta\xE7\xE3o:"),
                      createTextVNode(" " + toDisplayString(unref(formData).documents.recommendation ? "\u2705 Enviado" : "\u2796 Opcional"), 1)
                    ])
                  ]),
                  createVNode(_component_UAlert, {
                    icon: "heroicons:information-circle",
                    color: "blue",
                    variant: "soft",
                    title: "Processo de Aprova\xE7\xE3o",
                    description: "Ap\xF3s o envio, seus dados ser\xE3o analisados pela equipe de modera\xE7\xE3o. Voc\xEA receber\xE1 um email com o resultado em at\xE9 5 dias \xFAteis."
                  })
                ])
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "form-actions" }, [
                unref(currentStep) > 0 ? (openBlock(), createBlock(_component_UButton, {
                  key: 0,
                  onClick: previousStep,
                  variant: "outline",
                  disabled: unref(loading)
                }, {
                  default: withCtx(() => [
                    createVNode(_component_Icon, { name: "heroicons:arrow-left" }),
                    createTextVNode(" Anterior ")
                  ]),
                  _: 1
                }, 8, ["disabled"])) : createCommentVNode("", true),
                createVNode("div", { class: "actions-right" }, [
                  unref(currentStep) < steps.length - 1 ? (openBlock(), createBlock(_component_UButton, {
                    key: 0,
                    onClick: nextStep,
                    disabled: !unref(canProceed),
                    loading: unref(loading)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Pr\xF3ximo "),
                      createVNode(_component_Icon, { name: "heroicons:arrow-right" })
                    ]),
                    _: 1
                  }, 8, ["disabled", "loading"])) : (openBlock(), createBlock(_component_UButton, {
                    key: 1,
                    type: "submit",
                    disabled: !unref(canSubmit),
                    loading: unref(loading),
                    color: "green"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, { name: "heroicons:check" }),
                      createTextVNode(" Enviar Cadastro ")
                    ]),
                    _: 1
                  }, 8, ["disabled", "loading"]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cadastro/padre/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5fe63452"]]);

export { index as default };
//# sourceMappingURL=index-ByeNr0VF.mjs.map
