import { k as useState } from './server.mjs';
import { readonly } from 'vue';

const useAppState = () => {
  const isLoading = useState("app.loading", () => false);
  const loadingMessage = useState("app.loadingMessage", () => "");
  const globalError = useState("app.error", () => null);
  const globalSuccess = useState("app.success", () => null);
  const activeModal = useState("app.activeModal", () => null);
  const modalData = useState("app.modalData", () => null);
  const sidebarOpen = useState("app.sidebarOpen", () => false);
  const breadcrumbs = useState("app.breadcrumbs", () => []);
  const setLoading = (loading, message = "") => {
    isLoading.value = loading;
    loadingMessage.value = message;
  };
  const setError = (error) => {
    globalError.value = error;
    if (error) {
      setTimeout(() => {
        if (globalError.value === error) {
          globalError.value = null;
        }
      }, 5e3);
    }
  };
  const setSuccess = (success) => {
    globalSuccess.value = success;
    if (success) {
      setTimeout(() => {
        if (globalSuccess.value === success) {
          globalSuccess.value = null;
        }
      }, 3e3);
    }
  };
  const openModal = (modalName, data = null) => {
    activeModal.value = modalName;
    modalData.value = data;
  };
  const closeModal = () => {
    activeModal.value = null;
    modalData.value = null;
  };
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };
  const setSidebar = (open) => {
    sidebarOpen.value = open;
  };
  const setBreadcrumbs = (crumbs) => {
    breadcrumbs.value = crumbs;
  };
  const addBreadcrumb = (crumb) => {
    breadcrumbs.value.push(crumb);
  };
  const clearBreadcrumbs = () => {
    breadcrumbs.value = [];
  };
  return {
    // States
    isLoading: readonly(isLoading),
    loadingMessage: readonly(loadingMessage),
    globalError: readonly(globalError),
    globalSuccess: readonly(globalSuccess),
    activeModal: readonly(activeModal),
    modalData: readonly(modalData),
    sidebarOpen: readonly(sidebarOpen),
    breadcrumbs: readonly(breadcrumbs),
    // Actions
    setLoading,
    setError,
    setSuccess,
    openModal,
    closeModal,
    toggleSidebar,
    setSidebar,
    setBreadcrumbs,
    addBreadcrumb,
    clearBreadcrumbs
  };
};

export { useAppState as u };
//# sourceMappingURL=useAppState-PaUPNW55.mjs.map
