import { inject, computed, provide } from 'vue';

const portalTargetInjectionKey = Symbol("nuxt-ui.portal-target");
function usePortal(portal) {
  const portalTarget = inject(portalTargetInjectionKey, void 0);
  const to = computed(() => {
    var _a;
    if (typeof portal.value === "boolean" || portal.value === void 0) {
      return (_a = portalTarget == null ? void 0 : portalTarget.value) != null ? _a : "body";
    }
    return portal.value;
  });
  const disabled = computed(() => typeof portal.value === "boolean" ? !portal.value : false);
  provide(portalTargetInjectionKey, computed(() => to.value));
  return computed(() => ({
    to: to.value,
    disabled: disabled.value
  }));
}

export { usePortal as u };
//# sourceMappingURL=usePortal-BbZPQQY_.mjs.map
