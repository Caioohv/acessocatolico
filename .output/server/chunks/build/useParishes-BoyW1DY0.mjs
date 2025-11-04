import { ref } from 'vue';

const useParishes = () => {
  const parishes = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const pagination = ref({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  const states = ref([]);
  const cities = ref([]);
  const neighborhoods = ref([]);
  const dioceses = ref([]);
  const filters = ref({});
  const loadParishes = async (page = 1, newFilters) => {
    try {
      loading.value = true;
      error.value = null;
      if (newFilters !== void 0) {
        filters.value = { ...newFilters };
      }
      const query = new URLSearchParams({
        page: page.toString(),
        limit: pagination.value.limit.toString()
      });
      if (filters.value.search) query.append("search", filters.value.search);
      if (filters.value.stateId) query.append("stateId", filters.value.stateId);
      if (filters.value.cityId) query.append("cityId", filters.value.cityId);
      if (filters.value.neighborhoodId) query.append("neighborhoodId", filters.value.neighborhoodId);
      if (filters.value.dioceseId) query.append("dioceseId", filters.value.dioceseId);
      const response = await $fetch(`/api/parishes?${query.toString()}`);
      parishes.value = response.parishes;
      pagination.value = response.pagination;
    } catch (err) {
      error.value = err.message || "Erro ao carregar par\xF3quias";
      console.error("Error loading parishes:", err);
    } finally {
      loading.value = false;
    }
  };
  const loadParish = async (id) => {
    try {
      loading.value = true;
      error.value = null;
      const parish = await $fetch(`/api/parishes/${id}`);
      return parish;
    } catch (err) {
      error.value = err.message || "Erro ao carregar par\xF3quia";
      console.error("Error loading parish:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const loadStates = async () => {
    try {
      const { states: statesList } = await $fetch("/api/locations/states");
      states.value = statesList;
    } catch (err) {
      console.error("Error loading states:", err);
    }
  };
  const loadCities = async (stateId) => {
    try {
      const { cities: citiesList } = await $fetch(`/api/locations/cities?stateId=${stateId}`);
      cities.value = citiesList;
    } catch (err) {
      console.error("Error loading cities:", err);
    }
  };
  const loadNeighborhoods = async (cityId) => {
    try {
      const { neighborhoods: neighborhoodsList } = await $fetch(`/api/locations/neighborhoods?cityId=${cityId}`);
      neighborhoods.value = neighborhoodsList;
    } catch (err) {
      console.error("Error loading neighborhoods:", err);
    }
  };
  const loadDioceses = async () => {
    try {
      const { dioceses: diocesesList } = await $fetch("/api/locations/dioceses");
      dioceses.value = diocesesList;
    } catch (err) {
      console.error("Error loading dioceses:", err);
    }
  };
  const nextPage = () => {
    if (pagination.value.hasNext) {
      loadParishes(pagination.value.page + 1);
    }
  };
  const prevPage = () => {
    if (pagination.value.hasPrev) {
      loadParishes(pagination.value.page - 1);
    }
  };
  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      loadParishes(page);
    }
  };
  const clearFilters = () => {
    filters.value = {};
    cities.value = [];
    neighborhoods.value = [];
    loadParishes(1);
  };
  const getMassSchedule = (masses) => {
    const schedule = {};
    masses.forEach((mass) => {
      if (!schedule[mass.dayOfWeek]) {
        schedule[mass.dayOfWeek] = [];
      }
      schedule[mass.dayOfWeek].push({
        time: mass.time,
        type: mass.type,
        description: mass.description
      });
    });
    return schedule;
  };
  const getDayName = (dayOfWeek) => {
    const days = ["Domingo", "Segunda", "Ter\xE7a", "Quarta", "Quinta", "Sexta", "S\xE1bado"];
    return days[dayOfWeek] || "";
  };
  const getMainPriest = (priests) => {
    return priests.find((priest) => priest.isMain);
  };
  const getSocialContact = (contacts, type) => {
    return contacts.find((contact) => contact.type === type);
  };
  return {
    // State
    parishes,
    loading,
    error,
    pagination,
    states,
    cities,
    neighborhoods,
    dioceses,
    filters,
    // Methods
    loadParishes,
    loadParish,
    loadStates,
    loadCities,
    loadNeighborhoods,
    loadDioceses,
    nextPage,
    prevPage,
    goToPage,
    clearFilters,
    // Utilities
    getMassSchedule,
    getDayName,
    getMainPriest,
    getSocialContact
  };
};

export { useParishes as u };
//# sourceMappingURL=useParishes-BoyW1DY0.mjs.map
