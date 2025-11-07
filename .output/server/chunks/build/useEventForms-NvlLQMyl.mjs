const useEventForms = () => {
  const createForm = async (eventId, formData) => {
    return await $fetch(`/api/events/${eventId}/form`, {
      method: "POST",
      body: formData
    });
  };
  const updateForm = async (eventId, formData) => {
    return await $fetch(`/api/events/${eventId}/form`, {
      method: "PUT",
      body: formData
    });
  };
  const getForm = async (eventId) => {
    try {
      return await $fetch(`/api/events/${eventId}/form`);
    } catch (error) {
      if (error.statusCode === 404) return null;
      throw error;
    }
  };
  const deleteForm = async (eventId) => {
    return await $fetch(`/api/events/${eventId}/form`, {
      method: "DELETE"
    });
  };
  const addField = async (formId, fieldData) => {
    return await $fetch(`/api/forms/${formId}/fields`, {
      method: "POST",
      body: fieldData
    });
  };
  const updateField = async (fieldId, fieldData) => {
    return await $fetch(`/api/forms/fields/${fieldId}`, {
      method: "PUT",
      body: fieldData
    });
  };
  const deleteField = async (fieldId) => {
    return await $fetch(`/api/forms/fields/${fieldId}`, {
      method: "DELETE"
    });
  };
  const reorderFields = async (formId, fieldOrders) => {
    return await $fetch(`/api/forms/${formId}/fields/reorder`, {
      method: "PUT",
      body: { fieldOrders }
    });
  };
  const submitForm = async (eventId, submissionData, userInfo) => {
    return await $fetch(`/api/events/${eventId}/form/submit`, {
      method: "POST",
      body: {
        data: submissionData,
        userInfo
      }
    });
  };
  const getSubmissions = async (eventId, page = 1, limit = 20, status) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    if (status) {
      params.append("status", status);
    }
    return await $fetch(`/api/events/${eventId}/form/submissions?${params}`);
  };
  const getSubmission = async (submissionId) => {
    return await $fetch(`/api/forms/submissions/${submissionId}`);
  };
  const updateSubmissionStatus = async (submissionId, status, rejectedReason) => {
    return await $fetch(`/api/forms/submissions/${submissionId}/status`, {
      method: "PUT",
      body: { status, rejectedReason }
    });
  };
  const deleteSubmission = async (submissionId) => {
    return await $fetch(`/api/forms/submissions/${submissionId}`, {
      method: "DELETE"
    });
  };
  const exportSubmissions = async (eventId, format = "csv") => {
    const response = await $fetch(`/api/events/${eventId}/form/export?format=${format}`, {
      responseType: "blob"
    });
    const url = URL.createObjectURL(response);
    const link = (void 0).createElement("a");
    link.href = url;
    link.download = `event-registrations.${format}`;
    link.click();
    URL.revokeObjectURL(url);
  };
  const validateField = (field, value) => {
    if (field.isRequired && (!value || value === "")) {
      return `${field.label} \xE9 obrigat\xF3rio`;
    }
    if (!value || value === "") return null;
    switch (field.type) {
      case "EMAIL":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "Email inv\xE1lido";
        }
        break;
      case "PHONE":
        const phoneRegex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/;
        if (!phoneRegex.test(value)) {
          return "Telefone inv\xE1lido";
        }
        break;
      case "NUMBER":
        if (isNaN(Number(value))) {
          return "Deve ser um n\xFAmero v\xE1lido";
        }
        break;
      case "CPF":
        if (!validateCPF(value)) {
          return "CPF inv\xE1lido";
        }
        break;
      case "CEP":
        const cepRegex = /^\d{5}-?\d{3}$/;
        if (!cepRegex.test(value)) {
          return "CEP inv\xE1lido";
        }
        break;
    }
    if (field.minLength && value.length < field.minLength) {
      return `M\xEDnimo de ${field.minLength} caracteres`;
    }
    if (field.maxLength && value.length > field.maxLength) {
      return `M\xE1ximo de ${field.maxLength} caracteres`;
    }
    if (field.pattern) {
      const pattern = new RegExp(field.pattern);
      if (!pattern.test(value)) {
        return "Formato inv\xE1lido";
      }
    }
    return null;
  };
  const validateForm = (form, data) => {
    const errors = {};
    for (const field of form.fields) {
      if (field.showIfField && field.showIfValue) {
        const conditionFieldValue = data[field.showIfField];
        if (conditionFieldValue !== field.showIfValue) {
          continue;
        }
      }
      const error = validateField(field, data[field.name]);
      if (error) {
        errors[field.name] = error;
      }
    }
    return errors;
  };
  const getFieldTypeOptions = () => {
    return [
      { value: "TEXT", label: "Texto" },
      { value: "EMAIL", label: "Email" },
      { value: "PHONE", label: "Telefone" },
      { value: "NUMBER", label: "N\xFAmero" },
      { value: "DATE", label: "Data" },
      { value: "DATETIME", label: "Data e Hora" },
      { value: "TIME", label: "Hora" },
      { value: "SELECT", label: "Sele\xE7\xE3o \xDAnica" },
      { value: "RADIO", label: "Op\xE7\xF5es (Radio)" },
      { value: "CHECKBOX", label: "M\xFAltipla Escolha" },
      { value: "MULTISELECT", label: "Sele\xE7\xE3o M\xFAltipla" },
      { value: "TEXTAREA", label: "Texto Longo" },
      { value: "FILE", label: "Arquivo" },
      { value: "BOOLEAN", label: "Sim/N\xE3o" },
      { value: "CPF", label: "CPF" },
      { value: "RG", label: "RG" },
      { value: "CEP", label: "CEP" }
    ];
  };
  const isFieldVisible = (field, formData) => {
    if (!field.showIfField || !field.showIfValue) return true;
    return formData[field.showIfField] === field.showIfValue;
  };
  const generateSlug = (label) => {
    return label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "_").replace(/-+/g, "_").trim();
  };
  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = sum * 10 % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = sum * 10 % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;
    return true;
  };
  return {
    // Form management
    createForm,
    updateForm,
    getForm,
    deleteForm,
    // Field management
    addField,
    updateField,
    deleteField,
    reorderFields,
    // Submissions
    submitForm,
    getSubmissions,
    getSubmission,
    updateSubmissionStatus,
    deleteSubmission,
    exportSubmissions,
    // Validation
    validateField,
    validateForm,
    // Utilities
    getFieldTypeOptions,
    isFieldVisible,
    generateSlug,
    validateCPF
  };
};

export { useEventForms as u };
//# sourceMappingURL=useEventForms-NvlLQMyl.mjs.map
