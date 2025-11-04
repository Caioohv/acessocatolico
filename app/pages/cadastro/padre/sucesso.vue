<template>
  <div class="success-page">
    <div class="success-container">
      <div class="success-content">
        <!-- Success Icon -->
        <div class="success-icon">
          <Icon name="heroicons:check-circle" />
        </div>

        <!-- Success Message -->
        <h1 class="success-title">Cadastro Enviado com Sucesso!</h1>
        <p class="success-description">
          Seu cadastro foi recebido e está sendo analisado pela nossa equipe de moderação.
        </p>

        <!-- Next Steps -->
        <div class="next-steps">
          <h2 class="next-steps-title">Próximos Passos</h2>

          <div class="steps-list">
            <div class="step-item">
              <div class="step-icon">
                <Icon name="heroicons:document-magnifying-glass" />
              </div>
              <div class="step-content">
                <h3 class="step-title">Análise de Documentos</h3>
                <p class="step-description">
                  Nossa equipe verificará seus documentos e informações eclesiásticas
                </p>
                <span class="step-time">1-2 dias úteis</span>
              </div>
            </div>

            <div class="step-item">
              <div class="step-icon">
                <Icon name="heroicons:phone" />
              </div>
              <div class="step-content">
                <h3 class="step-title">Contato de Verificação</h3>
                <p class="step-description">
                  Se necessário, entraremos em contato para esclarecimentos adicionais
                </p>
                <span class="step-time">2-3 dias úteis</span>
              </div>
            </div>

            <div class="step-item">
              <div class="step-icon">
                <Icon name="heroicons:envelope" />
              </div>
              <div class="step-content">
                <h3 class="step-title">Notificação por Email</h3>
                <p class="step-description">
                  Você receberá um email com o resultado da análise e próximas instruções
                </p>
                <span class="step-time">3-5 dias úteis</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Important Info -->
        <UAlert icon="heroicons:information-circle" color="blue" variant="soft" title="Informações Importantes"
          class="info-alert">
          <template #description>
            <ul class="info-list">
              <li>Mantenha seu email acessível para receber atualizações</li>
              <li>Verifique sua caixa de spam regularmente</li>
              <li>Em caso de dúvidas, entre em contato conosco</li>
              <li>O processo de aprovação pode levar até 5 dias úteis</li>
            </ul>
          </template>
        </UAlert>

        <!-- Contact Information -->
        <div class="contact-section">
          <h3 class="contact-title">Precisa de Ajuda?</h3>
          <div class="contact-methods">
            <div class="contact-item">
              <Icon name="heroicons:envelope" class="contact-icon" />
              <div>
                <div class="contact-label">Email</div>
                <div class="contact-value">cadastro@acessocatolico.org.br</div>
              </div>
            </div>
            <div class="contact-item">
              <Icon name="heroicons:phone" class="contact-icon" />
              <div>
                <div class="contact-label">Telefone</div>
                <div class="contact-value">(11) 3000-1234</div>
              </div>
            </div>
            <div class="contact-item">
              <Icon name="heroicons:chat-bubble-left-right" class="contact-icon" />
              <div>
                <div class="contact-label">WhatsApp</div>
                <div class="contact-value">(11) 99999-8888</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="success-actions">
          <UButton to="/" size="lg" variant="solid" color="primary">
            <Icon name="heroicons:home" />
            Voltar ao Início
          </UButton>

          <UButton to="/sobre" size="lg" variant="outline">
            Conhecer a Plataforma
          </UButton>
        </div>

        <!-- Reference Number -->
        <div class="reference-number">
          <p class="reference-label">Número de Referência do Cadastro:</p>
          <p class="reference-value">#{{ referenceNumber }}</p>
          <p class="reference-note">
            Guarde este número para futuras consultas
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  layout: 'guest',
  title: 'Cadastro Enviado - AcessoCatólico',
  description: 'Seu cadastro de padre foi enviado com sucesso e está sendo analisado pela nossa equipe.'
})

// SEO
useSeoMeta({
  title: 'Cadastro Enviado - AcessoCatólico',
  ogTitle: 'Cadastro Enviado - AcessoCatólico',
  description: 'Seu cadastro de padre foi enviado com sucesso e está sendo analisado pela nossa equipe.',
  ogDescription: 'Seu cadastro de padre foi enviado com sucesso e está sendo analisado pela nossa equipe.'
})

// Generate a reference number
const referenceNumber = computed(() => {
  return `PR${Date.now().toString().slice(-6)}`
})

// Auto redirect after 30 seconds (optional)
onMounted(() => {
  // Could add auto-redirect logic here if needed
})
</script>

<style scoped>
.success-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-green-50) 0%, var(--color-primary-50) 100%);
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-container {
  max-width: 600px;
  width: 100%;
}

.success-content {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 3rem 2rem;
  text-align: center;
}

.success-icon {
  margin-bottom: 2rem;
}

.success-icon svg {
  width: 5rem;
  height: 5rem;
  color: var(--color-green-600);
}

.success-title {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
  font-family: var(--font-heading);
}

.success-description {
  font-size: 1.125rem;
  color: var(--color-gray-600);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.next-steps {
  text-align: left;
  margin-bottom: 3rem;
}

.next-steps-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 1.5rem;
  text-align: center;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step-item {
  display: flex;
  align-items: start;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--color-gray-200);
  border-radius: 0.75rem;
  background-color: var(--color-gray-50);
}

.step-icon {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--color-primary-100);
  color: var(--color-primary-600);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 0.5rem;
}

.step-description {
  color: var(--color-gray-600);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.step-time {
  background-color: var(--color-blue-100);
  color: var(--color-blue-800);
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  display: inline-block;
}

.info-alert {
  margin-bottom: 2rem;
}

.info-list {
  list-style: disc;
  padding-left: 1.25rem;
  color: var(--color-blue-700);
}

.info-list li {
  margin-bottom: 0.25rem;
}

.contact-section {
  text-align: left;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background-color: var(--color-gray-50);
  border-radius: 0.75rem;
}

.contact-title {
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
  text-align: center;
}

.contact-methods {
  display: grid;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contact-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-primary-600);
  flex-shrink: 0;
}

.contact-label {
  font-size: 0.75rem;
  color: var(--color-gray-500);
  font-weight: 500;
}

.contact-value {
  color: var(--color-gray-900);
  font-weight: 500;
}

.success-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.reference-number {
  text-align: center;
  padding: 1.5rem;
  background-color: var(--color-gray-50);
  border-radius: 0.75rem;
  border: 1px dashed var(--color-gray-300);
}

.reference-label {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  margin-bottom: 0.5rem;
}

.reference-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color-primary-600);
  font-family: var(--font-mono, monospace);
  margin-bottom: 0.5rem;
}

.reference-note {
  font-size: 0.75rem;
  color: var(--color-gray-500);
}

@media (max-width: 767px) {
  .success-page {
    padding: 1rem;
  }

  .success-content {
    padding: 2rem 1.5rem;
  }

  .success-title {
    font-size: 1.5rem;
  }

  .success-description {
    font-size: 1rem;
  }

  .step-item {
    padding: 1rem;
  }

  .success-actions {
    flex-direction: column;
  }

  .contact-methods {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 768px) {
  .contact-methods {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
