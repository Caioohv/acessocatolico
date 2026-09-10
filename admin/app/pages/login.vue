<script setup lang="ts">
definePageMeta({ layout: false })
useHead({ title: 'Entrar — Acesso Católico' })

// If already authenticated, skip the login page.
const { loggedIn } = useUserSession()
if (loggedIn.value) {
  await navigateTo('/')
}

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const fieldErrors = ref<{ email?: string; password?: string }>({})
const loading = ref(false)

async function onSubmit() {
  errorMessage.value = ''
  fieldErrors.value = {}
  loading.value = true

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })

    // Success — go to admin home.
    await navigateTo('/')
  }
  catch (err: unknown) {
    const e = err as { data?: { error?: { code?: string; message?: string; fields?: Record<string, string> } } }
    const apiError = e?.data?.error

    if (apiError?.code === 'VALIDATION_ERROR') {
      fieldErrors.value = apiError.fields ?? {}
      // Surface a general message only if no field-level errors.
      if (!Object.keys(fieldErrors.value).length) {
        errorMessage.value = apiError.message ?? 'Preencha todos os campos.'
      }
    }
    else if (apiError?.code === 'INVALID_CREDENTIALS') {
      errorMessage.value = 'E-mail ou senha incorretos. Verifique e tente novamente.'
    }
    else {
      errorMessage.value = 'Não foi possível entrar no momento. Tente novamente em instantes.'
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-shell">
    <main class="login-card" role="main">
      <header class="login-card__header">
        <span class="login-card__eyebrow">Acesso Católico</span>
        <h1 class="login-card__title">Entrar no painel</h1>
      </header>

      <form
        class="login-form"
        novalidate
        @submit.prevent="onSubmit"
      >
        <!-- General error banner -->
        <div
          v-if="errorMessage"
          class="login-form__alert"
          role="alert"
          aria-live="assertive"
        >
          {{ errorMessage }}
        </div>

        <div class="login-form__field">
          <label for="email" class="login-form__label">
            E-mail
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            class="login-form__input"
            :class="{ 'login-form__input--error': fieldErrors.email }"
            autocomplete="email"
            inputmode="email"
            placeholder="seu@email.com"
            :aria-invalid="Boolean(fieldErrors.email)"
            :aria-describedby="fieldErrors.email ? 'email-error' : undefined"
            :disabled="loading"
            required
          >
          <span
            v-if="fieldErrors.email"
            id="email-error"
            class="login-form__field-error"
            role="alert"
          >
            {{ fieldErrors.email }}
          </span>
        </div>

        <div class="login-form__field">
          <label for="password" class="login-form__label">
            Senha
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            name="password"
            class="login-form__input"
            :class="{ 'login-form__input--error': fieldErrors.password }"
            autocomplete="current-password"
            placeholder="••••••••"
            :aria-invalid="Boolean(fieldErrors.password)"
            :aria-describedby="fieldErrors.password ? 'password-error' : undefined"
            :disabled="loading"
            required
          >
          <span
            v-if="fieldErrors.password"
            id="password-error"
            class="login-form__field-error"
            role="alert"
          >
            {{ fieldErrors.password }}
          </span>
        </div>

        <button
          type="submit"
          class="login-form__submit"
          :disabled="loading"
          :aria-busy="loading"
        >
          {{ loading ? 'Entrando…' : 'Entrar' }}
        </button>
      </form>
    </main>
  </div>
</template>

<style scoped>
/* =========================================================================
   /login — page layout & card
   Mobile-first; tudo via tokens, nenhum valor bruto.
   ========================================================================= */

/* Shell: ocupa a viewport inteira e centraliza o card */
.login-shell {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: var(--space-8);
  padding-inline: var(--space-4);
  background-color: var(--surface-sunken);
}

/* Card branco flutuante */
.login-card {
  width: 100%;
  max-width: 400px;
  background-color: var(--surface-card);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  padding: var(--space-8) var(--space-6);
}

@media (min-width: 30rem) {
  .login-card {
    padding: var(--space-10) var(--space-8);
  }
}

/* ── Cabeçalho ──────────────────────────────────────────────────────────── */
.login-card__header {
  margin-bottom: var(--space-8);
  text-align: center;
}

.login-card__eyebrow {
  display: block;
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--brand);
  margin-bottom: var(--space-2);
}

.login-card__title {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  color: var(--text-strong);
}

/* ── Formulário ─────────────────────────────────────────────────────────── */
.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

/* Banner de erro geral */
.login-form__alert {
  background-color: var(--danger-100);
  color: var(--danger-600);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
}

/* Grupo de campo (label + input + erro) */
.login-form__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.login-form__label {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--text-body);
}

.login-form__input {
  width: 100%;
  height: 44px; /* alvo de toque mínimo */
  padding-inline: var(--space-3);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--text-strong);
  background-color: var(--surface-card);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
  outline: none;
  transition:
    border-color var(--dur-fast) var(--ease-standard),
    box-shadow var(--dur-fast) var(--ease-standard);
}

.login-form__input::placeholder {
  color: var(--text-subtle);
}

.login-form__input:focus {
  border-color: var(--brand);
  box-shadow: var(--shadow-focus);
}

.login-form__input--error,
.login-form__input--error:focus {
  border-color: var(--danger-600);
  box-shadow: 0 0 0 3px oklch(0.58 0.16 26 / 0.20);
}

.login-form__input:disabled {
  background-color: var(--surface-sunken);
  color: var(--text-muted);
  cursor: not-allowed;
}

/* Erro de campo */
.login-form__field-error {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  color: var(--danger-600);
}

/* Botão de envio */
.login-form__submit {
  width: 100%;
  min-height: 44px; /* alvo de toque */
  padding-inline: var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--text-on-brand);
  background-color: var(--brand);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background-color var(--dur-fast) var(--ease-standard),
    box-shadow var(--dur-fast) var(--ease-standard);
  margin-top: var(--space-2);
}

.login-form__submit:hover:not(:disabled) {
  background-color: var(--brand-strong);
}

.login-form__submit:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.login-form__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
