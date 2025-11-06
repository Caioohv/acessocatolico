import { ref, readonly } from 'vue';

const useEvents = () => {
  const loading = ref(false);
  const error = ref(null);
  const createEvent = async (data) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch("/api/events", {
        method: "POST",
        body: data
      });
      return {
        success: response.success,
        event: response.event,
        message: response.message
      };
    } catch (err) {
      const errorMessage = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Erro ao criar evento";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };
  const updateEvent = async (id, data) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch(`/api/events/${id}`, {
        method: "PUT",
        body: data
      });
      return {
        success: response.success,
        event: response.event,
        message: response.message
      };
    } catch (err) {
      const errorMessage = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Erro ao atualizar evento";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };
  const getEvents = async (filters) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const queryParams = new URLSearchParams();
      if (filters == null ? void 0 : filters.page) queryParams.append("page", filters.page.toString());
      if (filters == null ? void 0 : filters.limit) queryParams.append("limit", filters.limit.toString());
      if (filters == null ? void 0 : filters.search) queryParams.append("search", filters.search);
      if (filters == null ? void 0 : filters.category) queryParams.append("category", filters.category);
      if (filters == null ? void 0 : filters.status) queryParams.append("status", filters.status);
      if (filters == null ? void 0 : filters.organizerId) queryParams.append("organizerId", filters.organizerId);
      if (filters == null ? void 0 : filters.parishId) queryParams.append("parishId", filters.parishId);
      if (filters == null ? void 0 : filters.cityId) queryParams.append("cityId", filters.cityId);
      if (filters == null ? void 0 : filters.startDate) queryParams.append("startDate", filters.startDate);
      if (filters == null ? void 0 : filters.endDate) queryParams.append("endDate", filters.endDate);
      if ((filters == null ? void 0 : filters.isPublic) !== void 0) queryParams.append("isPublic", filters.isPublic.toString());
      if ((filters == null ? void 0 : filters.isFeatured) !== void 0) queryParams.append("isFeatured", filters.isFeatured.toString());
      const url = "/api/events" + (queryParams.toString() ? `?${queryParams.toString()}` : "");
      const response = await $fetch(url);
      events.value = response.data.events;
      totalEvents.value = response.data.pagination.total;
      totalPages.value = response.data.pagination.pages;
      return response.data;
    } catch (err) {
      const errorMessage = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Erro ao buscar eventos";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };
  const getEvent = async (idOrSlug) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch(`/api/events/${idOrSlug}`);
      event.value = response.data;
      registrationCount.value = response.data.registrationCount || 0;
      userRegistration.value = response.data.userRegistration || null;
      return response.data;
    } catch (err) {
      if (err.status === 404) {
        event.value = null;
        return null;
      }
      const errorMessage = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Erro ao buscar evento";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };
  const deleteEvent = async (id) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch(`/api/events/${id}`, {
        method: "DELETE"
      });
      return response;
    } catch (err) {
      const errorMessage = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Erro ao excluir evento";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };
  const uploadCoverImage = async (eventId, file) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const formData = new FormData();
      formData.append("eventId", eventId);
      formData.append("file", file);
      const response = await $fetch("/api/events/upload-cover", {
        method: "POST",
        body: formData
      });
      return response;
    } catch (err) {
      const errorMessage = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Erro ao enviar imagem";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };
  const uploadGalleryImages = async (eventId, files) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const formData = new FormData();
      formData.append("eventId", eventId);
      files.forEach((file, index) => {
        formData.append(`files`, file);
      });
      const response = await $fetch("/api/events/upload-gallery", {
        method: "POST",
        body: formData
      });
      return response;
    } catch (err) {
      const errorMessage = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Erro ao enviar imagens";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };
  const getCategories = async () => {
    try {
      const response = await $fetch("/api/events/categories");
      categories.value = response.data;
      return response.data;
    } catch (err) {
      console.error("Error fetching categories:", err);
      categories.value = [];
      return [];
    }
  };
  const generateSlug = (title) => {
    return title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim().substring(0, 50);
  };
  const formatStatus = (status) => {
    const statusMap = {
      DRAFT: "Rascunho",
      PUBLISHED: "Publicado",
      CANCELLED: "Cancelado",
      COMPLETED: "Conclu\xEDdo"
    };
    return statusMap[status] || status;
  };
  const getStatusColor = (status) => {
    const colors = {
      DRAFT: "gray",
      PUBLISHED: "green",
      CANCELLED: "red",
      COMPLETED: "blue"
    };
    return colors[status] || "gray";
  };
  const isRegistrationOpen = (event2) => {
    var _a;
    const now = /* @__PURE__ */ new Date();
    const startDate = event2.registrationStart ? new Date(event2.registrationStart) : new Date(event2.createdAt);
    const endDate = event2.registrationEnd ? new Date(event2.registrationEnd) : new Date(event2.startDate);
    return event2.registrationRequired && event2.status === "PUBLISHED" && now >= startDate && now <= endDate && (!event2.maxParticipants || (((_a = event2._count) == null ? void 0 : _a.registrations) || 0) < event2.maxParticipants);
  };
  const getDaysUntilEvent = (event2) => {
    const now = /* @__PURE__ */ new Date();
    const eventDate = new Date(event2.startDate);
    const diffTime = eventDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
  };
  const registerForEvent = async (eventId) => {
    var _a;
    try {
      loading.value = true;
      const response = await $fetch(`/api/events/${eventId}/register`, {
        method: "POST"
      });
      userRegistration.value = response.data;
      return response.data;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Erro ao se inscrever no evento";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const getEventComments = async (eventId) => {
    var _a;
    try {
      const response = await $fetch(`/api/events/${eventId}/comments`);
      comments.value = response.data || [];
      return response.data;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Erro ao carregar coment\xE1rios";
      throw err;
    }
  };
  const addEventComment = async (eventId, content) => {
    var _a;
    try {
      const response = await $fetch(`/api/events/${eventId}/comments`, {
        method: "POST",
        body: { content }
      });
      return response.data;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Erro ao adicionar coment\xE1rio";
      throw err;
    }
  };
  const event = ref(null);
  const userRegistration = ref(null);
  const registrationCount = ref(0);
  const comments = ref([]);
  const events = ref([]);
  const categories = ref([]);
  const totalEvents = ref(0);
  const totalPages = ref(0);
  return {
    // State
    event: readonly(event),
    events: readonly(events),
    categories: readonly(categories),
    userRegistration: readonly(userRegistration),
    registrationCount: readonly(registrationCount),
    comments: readonly(comments),
    totalEvents: readonly(totalEvents),
    totalPages: readonly(totalPages),
    loading: readonly(loading),
    error: readonly(error),
    // Methods
    createEvent,
    updateEvent,
    getEvents,
    getEvent,
    deleteEvent,
    uploadCoverImage,
    uploadGalleryImages,
    getCategories,
    registerForEvent,
    getEventComments,
    addEventComment,
    generateSlug,
    formatStatus,
    getStatusColor,
    isRegistrationOpen,
    getDaysUntilEvent
  };
};

export { useEvents as u };
//# sourceMappingURL=useEvents-DRC8EejA.mjs.map
