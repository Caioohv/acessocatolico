import { ref, readonly } from 'vue';

const usePriest = () => {
  const loading = ref(false);
  const error = ref(null);
  const submitRegistration = async (data) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch("/api/priests/register", {
        method: "POST",
        body: data
      });
      return {
        success: response.success,
        registrationId: response.registrationId,
        message: response.message
      };
    } catch (err) {
      const errorMessage = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Erro ao submeter cadastro";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };
  const uploadDocument = async (registrationId, documentType, file) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const formData = new FormData();
      formData.append("registrationId", registrationId);
      formData.append("documentType", documentType);
      formData.append("file", file);
      const response = await $fetch("/api/priests/upload-document", {
        method: "POST",
        body: formData
      });
      return {
        success: response.success,
        document: response.document,
        message: response.message
      };
    } catch (err) {
      const errorMessage = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Erro ao enviar documento";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };
  const getRegistrations = async (params) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const query = new URLSearchParams();
      if (params == null ? void 0 : params.page) query.append("page", params.page.toString());
      if (params == null ? void 0 : params.limit) query.append("limit", params.limit.toString());
      if (params == null ? void 0 : params.status) query.append("status", params.status);
      if (params == null ? void 0 : params.search) query.append("search", params.search);
      const response = await $fetch(`/api/priests?${query.toString()}`);
      return response.data;
    } catch (err) {
      const errorMessage = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Erro ao buscar cadastros";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };
  const updateStatus = async (registrationId, status, comments, adminEmail) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch("/api/priests/update-status", {
        method: "PUT",
        body: {
          registrationId,
          status,
          comments,
          adminEmail
        }
      });
      return {
        success: response.success,
        message: response.message
      };
    } catch (err) {
      const errorMessage = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Erro ao atualizar status";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };
  const getStats = async () => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch("/api/priests/stats");
      return response.data;
    } catch (err) {
      const errorMessage = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Erro ao buscar estat\xEDsticas";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };
  const getApprovalHistory = async (registrationId) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch(`/api/priests/history?registrationId=${registrationId}`);
      return response.data;
    } catch (err) {
      const errorMessage = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Erro ao buscar hist\xF3rico";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };
  const formatDocumentType = (type) => {
    const types = {
      ORDINATION_CERTIFICATE: "Certid\xE3o de Ordena\xE7\xE3o",
      IDENTITY_DOCUMENT: "Documento de Identidade",
      RESIDENCE_PROOF: "Comprovante de Resid\xEAncia",
      RECOMMENDATION_LETTER: "Carta de Recomenda\xE7\xE3o",
      OTHER: "Outro"
    };
    return types[type] || type;
  };
  const formatStatus = (status) => {
    const statuses = {
      PENDING: "Pendente",
      UNDER_REVIEW: "Em An\xE1lise",
      APPROVED: "Aprovado",
      REJECTED: "Rejeitado",
      REQUIRES_DOCUMENTATION: "Requer Documenta\xE7\xE3o"
    };
    return statuses[status] || status;
  };
  const getStatusColor = (status) => {
    const colors = {
      PENDING: "amber",
      UNDER_REVIEW: "blue",
      APPROVED: "green",
      REJECTED: "red",
      REQUIRES_DOCUMENTATION: "orange"
    };
    return colors[status] || "gray";
  };
  return {
    loading: readonly(loading),
    error: readonly(error),
    submitRegistration,
    uploadDocument,
    getRegistrations,
    updateStatus,
    getStats,
    getApprovalHistory,
    formatDocumentType,
    formatStatus,
    getStatusColor
  };
};

export { usePriest as u };
//# sourceMappingURL=usePriest-8ZW8YgP9.mjs.map
