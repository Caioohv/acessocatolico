<template>
  <div class="donation-section">
    <div class="donation-header">
      <Icon name="heroicons:heart" class="donation-icon" />
      <h3 class="donation-title">Apoie esta Paróquia</h3>
      <p class="donation-subtitle">
        Sua contribuição ajuda a manter as atividades pastorais e obras sociais
      </p>
    </div>

    <div class="donation-buttons">
      <UButton color="primary" variant="solid" size="lg" @click="showDonationModal = true" class="donation-button">
        <Icon name="heroicons:heart" class="button-icon" />
        Fazer Doação
      </UButton>

      <UButton color="secondary" variant="outline" size="lg" @click="showPixModal = true" class="pix-button">
        <Icon name="simple-icons:pix" class="button-icon" />
        PIX Rápido
      </UButton>
    </div>

    <!-- Donation Modal -->
    <UModal v-model="showDonationModal" class="donation-modal">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">Fazer Doação</h3>
          <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid"
            @click="showDonationModal = false" />
        </div>

        <div class="modal-content">
          <div class="parish-info">
            <h4 class="parish-name">{{ parishName }}</h4>
            <p class="parish-location">{{ parishLocation }}</p>
          </div>

          <form @submit.prevent="processDonation" class="donation-form">
            <div class="form-group">
              <label class="form-label">Valor da Doação</label>
              <div class="amount-options">
                <button v-for="amount in predefinedAmounts" :key="amount" type="button"
                  :class="['amount-button', { active: selectedAmount === amount }]" @click="selectAmount(amount)">
                  R$ {{ amount }}
                </button>
              </div>
              <UInput v-model="customAmount" type="number" placeholder="Ou digite um valor personalizado"
                class="custom-amount" @input="selectedAmount = null" />
            </div>

            <div class="form-group">
              <label class="form-label">Forma de Pagamento</label>
              <div class="payment-methods">
                <label class="payment-option">
                  <input v-model="paymentMethod" type="radio" value="pix" class="payment-radio" />
                  <div class="payment-content">
                    <Icon name="simple-icons:pix" class="payment-icon" />
                    <span>PIX (Instantâneo)</span>
                  </div>
                </label>
                <label class="payment-option">
                  <input v-model="paymentMethod" type="radio" value="card" class="payment-radio" />
                  <div class="payment-content">
                    <Icon name="heroicons:credit-card" class="payment-icon" />
                    <span>Cartão de Crédito</span>
                  </div>
                </label>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Informações do Doador (Opcional)</label>
              <UInput v-model="donorName" placeholder="Seu nome completo" class="donor-input" />
              <UInput v-model="donorEmail" type="email" placeholder="Seu e-mail" class="donor-input" />
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="monthlyDonation" type="checkbox" class="donation-checkbox" />
                <span class="checkbox-text">
                  Transformar em doação mensal recorrente
                </span>
              </label>
            </div>

            <div class="form-actions">
              <UButton type="button" color="neutral" variant="outline" @click="showDonationModal = false">
                Cancelar
              </UButton>
              <UButton type="submit" color="primary" variant="solid" :loading="processing" :disabled="!isValidDonation">
                <Icon name="heroicons:heart" class="button-icon" />
                {{ paymentMethod === 'pix' ? 'Gerar PIX' : 'Pagar com Cartão' }}
              </UButton>
            </div>
          </form>
        </div>
      </div>
    </UModal>

    <!-- PIX Quick Modal -->
    <UModal v-model="showPixModal" class="pix-modal">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">PIX Rápido</h3>
          <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="showPixModal = false" />
        </div>

        <div class="modal-content">
          <div class="pix-info">
            <p class="pix-description">
              Use a chave PIX da paróquia para fazer sua doação de forma rápida e segura
            </p>

            <div class="pix-key-section">
              <label class="form-label">Chave PIX da Paróquia</label>
              <div class="pix-key-container">
                <code class="pix-key">{{ pixKey }}</code>
                <UButton color="primary" variant="outline" size="sm" @click="copyPixKey" :disabled="!pixKey">
                  <Icon name="heroicons:clipboard-document" class="button-icon" />
                  {{ copied ? 'Copiado!' : 'Copiar' }}
                </UButton>
              </div>
            </div>

            <div v-if="qrCodeUrl" class="qr-code-section">
              <label class="form-label">QR Code PIX</label>
              <div class="qr-code-container">
                <img :src="qrCodeUrl" alt="QR Code PIX" class="qr-code" />
                <p class="qr-instructions">
                  Aponte a câmera do seu celular para o QR Code acima
                </p>
              </div>
            </div>

            <div class="pix-instructions">
              <h4 class="instructions-title">Como doar via PIX:</h4>
              <ol class="instructions-list">
                <li>Abra o app do seu banco</li>
                <li>Selecione a opção PIX</li>
                <li>Cole a chave PIX ou escaneie o QR Code</li>
                <li>Digite o valor da doação</li>
                <li>Confirme a transferência</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
interface Props {
  parishName: string
  parishLocation: string
  pixKey?: string
  qrCodeUrl?: string
}

const props = defineProps<Props>()

// State
const showDonationModal = ref(false)
const showPixModal = ref(false)
const processing = ref(false)
const copied = ref(false)

// Form data
const selectedAmount = ref<number | null>(null)
const customAmount = ref('')
const paymentMethod = ref('pix')
const donorName = ref('')
const donorEmail = ref('')
const monthlyDonation = ref(false)

// Predefined amounts
const predefinedAmounts = [10, 25, 50, 100, 200, 500]

// Computed
const isValidDonation = computed(() => {
  const amount = selectedAmount.value || parseFloat(customAmount.value)
  return amount && amount > 0 && paymentMethod.value
})

const finalAmount = computed(() => {
  return selectedAmount.value || parseFloat(customAmount.value) || 0
})

// Methods
const selectAmount = (amount: number) => {
  selectedAmount.value = amount
  customAmount.value = ''
}

const copyPixKey = async () => {
  if (!props.pixKey) return

  try {
    await navigator.clipboard.writeText(props.pixKey)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)

    // Show toast notification
    const toast = useToast()
    toast.add({
      title: 'Chave PIX copiada!',
      description: 'A chave PIX foi copiada para a área de transferência.',
      color: 'primary'
    })
  } catch (error) {
    console.error('Erro ao copiar chave PIX:', error)
  }
}

const processDonation = async () => {
  if (!isValidDonation.value) return

  processing.value = true

  try {
    const donationData = {
      parishId: 'parish-id', // This would come from props
      amount: finalAmount.value,
      paymentMethod: paymentMethod.value,
      donorName: donorName.value || null,
      donorEmail: donorEmail.value || null,
      recurring: monthlyDonation.value
    }

    // Here you would integrate with a payment processor
    // For now, we'll just simulate the process
    await new Promise(resolve => setTimeout(resolve, 2000))

    if (paymentMethod.value === 'pix') {
      // Show PIX payment details
      showDonationModal.value = false
      showPixModal.value = true
    } else {
      // Redirect to card payment processor
      // window.location.href = payment_url
    }

    const toast = useToast()
    toast.add({
      title: 'Doação iniciada!',
      description: `Sua doação de R$ ${finalAmount.value.toFixed(2)} está sendo processada.`,
      color: 'primary'
    })

  } catch (error) {
    console.error('Erro ao processar doação:', error)
    const toast = useToast()
    toast.add({
      title: 'Erro na doação',
      description: 'Houve um problema ao processar sua doação. Tente novamente.',
      color: 'ui-dark'
    })
  } finally {
    processing.value = false
  }
}
</script>

<style scoped>
.donation-section {
  background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-secondary-50) 100%);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  border: 1px solid var(--color-primary-200);
}

.donation-header {
  margin-bottom: 1.5rem;
}

.donation-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--color-primary-600);
  margin-bottom: 1rem;
}

.donation-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 0.5rem;
  font-family: var(--font-heading);
}

.donation-subtitle {
  color: var(--color-gray-600);
  max-width: 32rem;
  margin: 0 auto;
}

.donation-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.donation-button,
.pix-button {
  min-width: 10rem;
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.modal-container {
  padding: 0;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-gray-200);
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);
}

.modal-content {
  padding: 1.5rem;
}

.parish-info {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--color-gray-50);
  border-radius: 0.5rem;
}

.parish-name {
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 0.25rem;
}

.parish-location {
  color: var(--color-gray-600);
  font-size: 0.875rem;
}

.donation-form {
  max-width: 28rem;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 500;
  color: var(--color-gray-700);
  margin-bottom: 0.5rem;
}

.amount-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.amount-button {
  padding: 0.75rem;
  border: 1px solid var(--color-gray-300);
  border-radius: 0.5rem;
  background: white;
  color: var(--color-gray-700);
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
}

.amount-button:hover {
  border-color: var(--color-primary-300);
  background: var(--color-primary-50);
}

.amount-button.active {
  border-color: var(--color-primary-500);
  background: var(--color-primary-500);
  color: white;
}

.custom-amount {
  width: 100%;
}

.payment-methods {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.payment-option {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--color-gray-300);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.payment-option:has(.payment-radio:checked) {
  border-color: var(--color-primary-500);
  background: var(--color-primary-50);
}

.payment-radio {
  margin-right: 0.75rem;
}

.payment-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.payment-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.donor-input {
  width: 100%;
  margin-bottom: 0.75rem;
}

.checkbox-label {
  display: flex;
  align-items: start;
  gap: 0.5rem;
  cursor: pointer;
}

.donation-checkbox {
  margin-top: 0.125rem;
}

.checkbox-text {
  color: var(--color-gray-700);
  font-size: 0.875rem;
  line-height: 1.4;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-gray-200);
}

.pix-info {
  text-align: center;
}

.pix-description {
  color: var(--color-gray-600);
  margin-bottom: 2rem;
}

.pix-key-section {
  margin-bottom: 2rem;
}

.pix-key-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-gray-50);
  border-radius: 0.5rem;
  margin-top: 0.5rem;
}

.pix-key {
  flex: 1;
  font-family: 'Courier New', monospace;
  background: white;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid var(--color-gray-200);
}

.qr-code-section {
  margin-bottom: 2rem;
}

.qr-code-container {
  margin-top: 1rem;
}

.qr-code {
  width: 12rem;
  height: 12rem;
  border: 1px solid var(--color-gray-200);
  border-radius: 0.5rem;
}

.qr-instructions {
  margin-top: 1rem;
  color: var(--color-gray-600);
  font-size: 0.875rem;
}

.pix-instructions {
  text-align: left;
  background: var(--color-gray-50);
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.instructions-title {
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
}

.instructions-list {
  color: var(--color-gray-700);
  padding-left: 1.25rem;
}

.instructions-list li {
  margin-bottom: 0.5rem;
}

/* Responsive */
@media (max-width: 640px) {
  .donation-section {
    padding: 1.5rem;
  }

  .donation-buttons {
    flex-direction: column;
    align-items: center;
  }

  .donation-button,
  .pix-button {
    width: 100%;
    max-width: 16rem;
  }

  .payment-methods {
    grid-template-columns: 1fr;
  }

  .amount-options {
    grid-template-columns: repeat(2, 1fr);
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions button {
    width: 100%;
  }
}
</style>
