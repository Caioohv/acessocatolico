<template>
  <div class="priest-registration">
    <div class="registration-container">
      <!-- Header -->
      <div class="registration-header">
        <div class="header-content">
          <Icon name="heroicons:academic-cap" class="header-icon" />
          <h1 class="header-title">Cadastro de Padre</h1>
          <p class="header-description">
            Junte-se à nossa plataforma e conecte sua paróquia com fiéis de todo o Brasil
          </p>
        </div>
      </div>

      <!-- Form -->
      <div class="registration-form">
        <UForm ref="form" :schema="schema" :state="formData" @submit="handleSubmit">
          <!-- Step Indicator -->
          <div class="step-indicator">
            <div v-for="(step, index) in steps" :key="step.id" :class="['step-item', {
              'active': currentStep === index,
              'completed': index < currentStep
            }]">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-info">
                <div class="step-title">{{ step.title }}</div>
                <div class="step-description">{{ step.description }}</div>
              </div>
            </div>
          </div>

          <!-- Step 1: Informações Pessoais -->
          <div v-if="currentStep === 0" class="form-step">
            <h2 class="step-title">Informações Pessoais</h2>

            <div class="form-grid">
              <UFormGroup label="Nome Completo" name="firstName" required>
                <UInput v-model="formData.firstName" placeholder="Padre João" :disabled="loading" />
              </UFormGroup>

              <UFormGroup label="Sobrenome" name="lastName" required>
                <UInput v-model="formData.lastName" placeholder="Silva" :disabled="loading" />
              </UFormGroup>

              <UFormGroup label="Email" name="email" required>
                <UInput v-model="formData.email" type="email" placeholder="padre@paroquia.com.br" :disabled="loading" />
              </UFormGroup>

              <UFormGroup label="Telefone" name="phone" required>
                <UInput v-model="formData.phone" placeholder="(11) 99999-9999" :disabled="loading" />
              </UFormGroup>

              <UFormGroup label="Data de Nascimento" name="birthDate" required>
                <UInput v-model="formData.birthDate" type="date" :disabled="loading" />
              </UFormGroup>

              <UFormGroup label="CPF" name="cpf" required>
                <UInput v-model="formData.cpf" placeholder="000.000.000-00" :disabled="loading" />
              </UFormGroup>
            </div>

            <UFormGroup label="Biografia (opcional)" name="bio">
              <UTextarea v-model="formData.bio" placeholder="Conte um pouco sobre sua trajetória e ministério..."
                :rows="4" :disabled="loading" />
            </UFormGroup>
          </div>

          <!-- Step 2: Informações Eclesiásticas -->
          <div v-if="currentStep === 1" class="form-step">
            <h2 class="step-title">Informações Eclesiásticas</h2>

            <div class="form-grid">
              <UFormGroup label="Número de Ordenação" name="ordinationNumber" required>
                <UInput v-model="formData.ordinationNumber" placeholder="000123" :disabled="loading" />
              </UFormGroup>

              <UFormGroup label="Data de Ordenação" name="ordinationDate" required>
                <UInput v-model="formData.ordinationDate" type="date" :disabled="loading" />
              </UFormGroup>

              <UFormGroup label="Diocese de Ordenação" name="ordinationDiocese" required>
                <USelect v-model="formData.ordinationDiocese" :options="diocesesOptions"
                  placeholder="Selecione a diocese" :disabled="loading" />
              </UFormGroup>

              <UFormGroup label="Seminário" name="seminary">
                <UInput v-model="formData.seminary" placeholder="Nome do seminário" :disabled="loading" />
              </UFormGroup>

              <UFormGroup label="Especializações" name="specializations">
                <USelectMenu v-model="formData.specializations" :options="specializationOptions" multiple
                  placeholder="Selecione suas especializações" :disabled="loading" />
              </UFormGroup>

              <UFormGroup label="Idiomas" name="languages">
                <USelectMenu v-model="formData.languages" :options="languageOptions" multiple
                  placeholder="Idiomas que fala" :disabled="loading" />
              </UFormGroup>
            </div>
          </div>

          <!-- Step 3: Documentação -->
          <div v-if="currentStep === 2" class="form-step">
            <h2 class="step-title">Documentação Necessária</h2>

            <div class="documents-section">
              <div class="document-item">
                <div class="document-info">
                  <h3 class="document-title">Certidão de Ordenação</h3>
                  <p class="document-description">
                    Documento oficial que comprova sua ordenação sacerdotal
                  </p>
                </div>
                <div class="document-upload">
                  <UButton @click="triggerFileUpload('ordination')" variant="outline" :loading="uploading.ordination"
                    :disabled="loading">
                    <Icon name="heroicons:cloud-arrow-up" />
                    {{ formData.documents.ordination ? 'Alterar' : 'Upload' }}
                  </UButton>
                  <input ref="ordinationInput" type="file" accept=".pdf,.jpg,.jpeg,.png" style="display: none"
                    @change="handleFileUpload('ordination', $event)" />
                  <span v-if="formData.documents.ordination" class="file-name">
                    {{ formData.documents.ordination.name }}
                  </span>
                </div>
              </div>

              <div class="document-item">
                <div class="document-info">
                  <h3 class="document-title">Documento de Identidade</h3>
                  <p class="document-description">
                    RG ou CNH para verificação de identidade
                  </p>
                </div>
                <div class="document-upload">
                  <UButton @click="triggerFileUpload('identity')" variant="outline" :loading="uploading.identity"
                    :disabled="loading">
                    <Icon name="heroicons:cloud-arrow-up" />
                    {{ formData.documents.identity ? 'Alterar' : 'Upload' }}
                  </UButton>
                  <input ref="identityInput" type="file" accept=".pdf,.jpg,.jpeg,.png" style="display: none"
                    @change="handleFileUpload('identity', $event)" />
                  <span v-if="formData.documents.identity" class="file-name">
                    {{ formData.documents.identity.name }}
                  </span>
                </div>
              </div>

              <div class="document-item">
                <div class="document-info">
                  <h3 class="document-title">Carta de Apresentação (opcional)</h3>
                  <p class="document-description">
                    Carta do bispo ou superior eclesiástico
                  </p>
                </div>
                <div class="document-upload">
                  <UButton @click="triggerFileUpload('recommendation')" variant="outline"
                    :loading="uploading.recommendation" :disabled="loading">
                    <Icon name="heroicons:cloud-arrow-up" />
                    {{ formData.documents.recommendation ? 'Alterar' : 'Upload' }}
                  </UButton>
                  <input ref="recommendationInput" type="file" accept=".pdf,.jpg,.jpeg,.png" style="display: none"
                    @change="handleFileUpload('recommendation', $event)" />
                  <span v-if="formData.documents.recommendation" class="file-name">
                    {{ formData.documents.recommendation.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Confirmação -->
          <div v-if="currentStep === 3" class="form-step">
            <h2 class="step-title">Confirmação de Dados</h2>

            <div class="confirmation-section">
              <div class="confirmation-item">
                <h3>Informações Pessoais</h3>
                <p><strong>Nome:</strong> {{ formData.firstName }} {{ formData.lastName }}</p>
                <p><strong>Email:</strong> {{ formData.email }}</p>
                <p><strong>Telefone:</strong> {{ formData.phone }}</p>
              </div>

              <div class="confirmation-item">
                <h3>Informações Eclesiásticas</h3>
                <p><strong>Ordenação:</strong> {{ formData.ordinationNumber }}</p>
                <p><strong>Data:</strong> {{ formatDate(formData.ordinationDate) }}</p>
                <p><strong>Diocese:</strong> {{ selectedDiocese?.label }}</p>
              </div>

              <div class="confirmation-item">
                <h3>Documentos</h3>
                <p><strong>Certidão de Ordenação:</strong>
                  {{ formData.documents.ordination ? '✅ Enviado' : '❌ Não enviado' }}
                </p>
                <p><strong>Documento de Identidade:</strong>
                  {{ formData.documents.identity ? '✅ Enviado' : '❌ Não enviado' }}
                </p>
                <p><strong>Carta de Apresentação:</strong>
                  {{ formData.documents.recommendation ? '✅ Enviado' : '➖ Opcional' }}
                </p>
              </div>

              <UAlert icon="heroicons:information-circle" color="blue" variant="soft" title="Processo de Aprovação"
                description="Após o envio, seus dados serão analisados pela equipe de moderação. Você receberá um email com o resultado em até 5 dias úteis." />
            </div>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <UButton v-if="currentStep > 0" @click="previousStep" variant="outline" :disabled="loading">
              <Icon name="heroicons:arrow-left" />
              Anterior
            </UButton>

            <div class="actions-right">
              <UButton v-if="currentStep < steps.length - 1" @click="nextStep" :disabled="!canProceed"
                :loading="loading">
                Próximo
                <Icon name="heroicons:arrow-right" />
              </UButton>

              <UButton v-else type="submit" :disabled="!canSubmit" :loading="loading" color="green">
                <Icon name="heroicons:check" />
                Enviar Cadastro
              </UButton>
            </div>
          </div>
        </UForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

// Page meta
definePageMeta({
  layout: 'guest',
  title: 'Cadastro de Padre - AcessoCatólico',
  description: 'Cadastre-se como padre na plataforma AcessoCatólico e conecte sua paróquia com fiéis de todo o Brasil.'
})

// SEO
useSeoMeta({
  title: 'Cadastro de Padre - AcessoCatólico',
  ogTitle: 'Cadastro de Padre - AcessoCatólico',
  description: 'Cadastre-se como padre na plataforma AcessoCatólico e conecte sua paróquia com fiéis de todo o Brasil.',
  ogDescription: 'Cadastre-se como padre na plataforma AcessoCatólico e conecte sua paróquia com fiéis de todo o Brasil.'
})

// Form schema
const schema = z.object({
  firstName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  lastName: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  cpf: z.string().min(11, 'CPF inválido'),
  bio: z.string().optional(),
  ordinationNumber: z.string().min(1, 'Número de ordenação é obrigatório'),
  ordinationDate: z.string().min(1, 'Data de ordenação é obrigatória'),
  ordinationDiocese: z.string().min(1, 'Diocese é obrigatória'),
  seminary: z.string().optional(),
  specializations: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional()
})

// Reactive data
const currentStep = ref(0)
const loading = ref(false)
const uploading = ref({
  ordination: false,
  identity: false,
  recommendation: false
})

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  cpf: '',
  bio: '',
  ordinationNumber: '',
  ordinationDate: '',
  ordinationDiocese: '',
  seminary: '',
  specializations: [],
  languages: [],
  documents: {
    ordination: null as File | null,
    identity: null as File | null,
    recommendation: null as File | null
  }
})

// Form steps
const steps = [
  {
    id: 'personal',
    title: 'Dados Pessoais',
    description: 'Informações básicas'
  },
  {
    id: 'ecclesiastical',
    title: 'Dados Eclesiásticos',
    description: 'Informações do ministério'
  },
  {
    id: 'documents',
    title: 'Documentação',
    description: 'Upload de documentos'
  },
  {
    id: 'confirmation',
    title: 'Confirmação',
    description: 'Revisão e envio'
  }
]

// Options
const diocesesOptions = [
  { label: 'Arquidiocese de São Paulo', value: 'arquidiocese-sao-paulo' },
  { label: 'Arquidiocese do Rio de Janeiro', value: 'arquidiocese-rio-janeiro' },
  { label: 'Arquidiocese de Brasília', value: 'arquidiocese-brasilia' },
  // ... more dioceses
]

const specializationOptions = [
  { label: 'Teologia Moral', value: 'teologia-moral' },
  { label: 'Liturgia', value: 'liturgia' },
  { label: 'Catequese', value: 'catequese' },
  { label: 'Pastoral Familiar', value: 'pastoral-familiar' },
  { label: 'Pastoral Jovem', value: 'pastoral-jovem' },
  { label: 'Direito Canônico', value: 'direito-canonico' }
]

const languageOptions = [
  { label: 'Português', value: 'portugues' },
  { label: 'Espanhol', value: 'espanhol' },
  { label: 'Inglês', value: 'ingles' },
  { label: 'Italiano', value: 'italiano' },
  { label: 'Latim', value: 'latim' },
  { label: 'Francês', value: 'frances' }
]

// Computed
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 0:
      return formData.firstName && formData.lastName && formData.email && formData.phone && formData.birthDate && formData.cpf
    case 1:
      return formData.ordinationNumber && formData.ordinationDate && formData.ordinationDiocese
    case 2:
      return formData.documents.ordination && formData.documents.identity
    default:
      return true
  }
})

const canSubmit = computed(() => {
  return canProceed.value && currentStep.value === steps.length - 1
})

const selectedDiocese = computed(() => {
  return diocesesOptions.find(d => d.value === formData.ordinationDiocese)
})

// Refs
const form = ref()
const ordinationInput = ref()
const identityInput = ref()
const recommendationInput = ref()

// Methods
const nextStep = async () => {
  if (canProceed.value && currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const triggerFileUpload = (type: string) => {
  const inputMap = {
    ordination: ordinationInput.value,
    identity: identityInput.value,
    recommendation: recommendationInput.value
  }
  inputMap[type]?.click()
}

// Composables
const { submitRegistration, uploadDocument, loading: priestLoading } = usePriest()
const toast = useToast()

// Store registration ID for document uploads
const registrationId = ref<string | null>(null)

const handleFileUpload = async (type: string, event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file && (type in uploading.value) && (type in formData.documents)) {
    ; (uploading.value as any)[type] = true
    try {
      // Store file temporarily for later upload
      ; (formData.documents as any)[type] = file

      toast.add({
        title: 'Documento selecionado',
        description: `${file.name} foi selecionado para upload`,
        color: 'ui'
      })
    } catch (error) {
      toast.add({
        title: 'Erro na seleção',
        description: 'Não foi possível selecionar o documento',
        color: 'ui'
      })
    } finally {
      ; (uploading.value as any)[type] = false
    }
  }
}

const handleSubmit = async () => {
  loading.value = true

  try {
    // Step 1: Submit registration
    const registrationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      birthDate: formData.birthDate,
      cpf: formData.cpf,
      bio: formData.bio || undefined,
      ordinationNumber: formData.ordinationNumber,
      ordinationDate: formData.ordinationDate,
      ordinationDiocese: formData.ordinationDiocese,
      seminary: formData.seminary || undefined,
      specializations: formData.specializations.length > 0 ? formData.specializations : undefined,
      languages: formData.languages.length > 0 ? formData.languages : undefined
    }

    const registrationResult = await submitRegistration(registrationData)

    if (registrationResult.success && registrationResult.registrationId) {
      registrationId.value = registrationResult.registrationId

      // Step 2: Upload documents
      const documentUploads = []

      if (formData.documents.ordination) {
        documentUploads.push(
          uploadDocument(registrationId.value, 'ORDINATION_CERTIFICATE', formData.documents.ordination)
        )
      }

      if (formData.documents.identity) {
        documentUploads.push(
          uploadDocument(registrationId.value, 'IDENTITY_DOCUMENT', formData.documents.identity)
        )
      }

      if (formData.documents.recommendation) {
        documentUploads.push(
          uploadDocument(registrationId.value, 'RECOMMENDATION_LETTER', formData.documents.recommendation)
        )
      }

      // Wait for all uploads to complete
      if (documentUploads.length > 0) {
        try {
          await Promise.all(documentUploads)
          console.log('All documents uploaded successfully')
        } catch (uploadError) {
          console.warn('Some documents failed to upload:', uploadError)
          // Continue anyway - documents can be uploaded later
        }
      }

      toast.add({
        title: 'Cadastro enviado com sucesso!',
        description: registrationResult.message,
        color: 'primary'
      })

      // Redirect to success page
      await navigateTo('/cadastro/padre/sucesso')
    }
  } catch (error: any) {
    console.error('Registration error:', error)
    toast.add({
      title: 'Erro no cadastro',
      description: error.message || 'Ocorreu um erro ao processar seu cadastro. Tente novamente.',
      color: 'ui'
    })
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('pt-BR')
}
</script>

<style scoped>
.priest-registration {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-secondary-50) 100%);
  padding: 2rem 1rem;
}

.registration-container {
  max-width: 800px;
  margin: 0 auto;
}

.registration-header {
  text-align: center;
  margin-bottom: 3rem;
}

.header-content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.header-icon {
  width: 4rem;
  height: 4rem;
  color: var(--color-primary-600);
  margin: 0 auto 1rem;
}

.header-title {
  font-size: 2.25rem;
  font-weight: bold;
  color: var(--color-gray-900);
  margin-bottom: 0.5rem;
  font-family: var(--font-heading);
}

.header-description {
  font-size: 1.125rem;
  color: var(--color-gray-600);
  max-width: 600px;
  margin: 0 auto;
}

.registration-form {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.step-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  position: relative;
}

.step-indicator::before {
  content: '';
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  height: 2px;
  background-color: var(--color-gray-200);
  z-index: 1;
}

.step-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 2;
}

.step-number {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--color-gray-200);
  color: var(--color-gray-600);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: all 0.3s;
}

.step-item.active .step-number {
  background-color: var(--color-primary-600);
  color: white;
}

.step-item.completed .step-number {
  background-color: var(--color-green-600);
  color: white;
}

.step-info {
  max-width: 120px;
}

.step-title {
  font-weight: 600;
  color: var(--color-gray-900);
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.step-description {
  font-size: 0.75rem;
  color: var(--color-gray-500);
}

.form-step {
  margin-bottom: 2rem;
}

.form-step .step-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 1.5rem;
  font-family: var(--font-heading);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.documents-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.document-item {
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 1.5rem;
  border: 1px solid var(--color-gray-200);
  border-radius: 0.5rem;
  background-color: var(--color-gray-50);
}

.document-info {
  flex: 1;
  margin-right: 1rem;
}

.document-title {
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 0.5rem;
}

.document-description {
  color: var(--color-gray-600);
  font-size: 0.875rem;
}

.document-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.file-name {
  font-size: 0.75rem;
  color: var(--color-gray-600);
  max-width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.confirmation-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.confirmation-item {
  padding: 1.5rem;
  border: 1px solid var(--color-gray-200);
  border-radius: 0.5rem;
  background-color: var(--color-gray-50);
}

.confirmation-item h3 {
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
}

.confirmation-item p {
  margin-bottom: 0.5rem;
  color: var(--color-gray-700);
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-gray-200);
}

.actions-right {
  display: flex;
  gap: 1rem;
}

@media (max-width: 767px) {
  .priest-registration {
    padding: 1rem;
  }

  .registration-form {
    padding: 1.5rem;
  }

  .step-indicator {
    flex-direction: column;
    gap: 1rem;
  }

  .step-indicator::before {
    display: none;
  }

  .step-item {
    flex-direction: row;
    text-align: left;
  }

  .step-number {
    margin-right: 1rem;
    margin-bottom: 0;
  }

  .step-info {
    max-width: none;
  }

  .document-item {
    flex-direction: column;
    align-items: stretch;
  }

  .document-info {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .form-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .actions-right {
    width: 100%;
    justify-content: stretch;
  }
}
</style>
