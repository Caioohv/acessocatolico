<script setup lang="ts">
/**
 * TheFooter — organism de rodapé do portal.
 * Nota do projeto (o que é e como se sustenta) + links de navegação.
 * Renderizado em todas as páginas pelo layout default. Mobile-first: colunas
 * empilhadas no mobile, lado a lado a partir de --bp-md (48rem).
 */
const year = new Date().getFullYear()

const links = [
  { to: '/', label: 'Início' },
  { to: '/blog', label: 'Blog' },
]
</script>

<template>
  <footer class="the-footer">
    <AppContainer class="the-footer__inner">
      <div class="the-footer__note">
        <NuxtLink to="/" class="the-footer__brand">
          <span class="the-footer__mark" aria-hidden="true">✦</span>
          <span class="the-footer__name">Acesso Católico</span>
        </NuxtLink>
        <p class="the-footer__text">
          Missas, eventos e comunidades da sua região num só lugar. O acesso é
          gratuito para quem usa e se sustenta apenas por links de afiliado.
        </p>
      </div>

      <nav class="the-footer__nav" aria-label="Navegação do rodapé">
        <h2 class="the-footer__heading">Navegar</h2>
        <ul class="the-footer__list">
          <li v-for="link in links" :key="link.to">
            <NuxtLink :to="link.to" class="the-footer__link">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </AppContainer>

    <AppContainer class="the-footer__bottom">
      <p class="the-footer__copy">© {{ year }} Acesso Católico</p>
    </AppContainer>
  </footer>
</template>

<style scoped>
.the-footer {
  margin-top: var(--space-16);
  background: var(--surface-card);
  border-top: var(--border-width) solid var(--border);
}

.the-footer__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  padding-block: var(--space-10);
}

/* --- Nota do projeto ------------------------------------------------------ */
.the-footer__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  color: var(--text-strong);
  font-family: var(--font-display);
  font-weight: var(--weight-semibold);
  font-size: var(--text-h4);
  letter-spacing: var(--tracking-tight);
}

.the-footer__brand:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
  border-radius: var(--radius-sm);
}

.the-footer__mark {
  color: var(--brand);
  font-size: 1.25em;
  line-height: 1;
}

.the-footer__text {
  max-width: var(--measure-prose);
  margin: var(--space-3) 0 0;
  color: var(--text-muted);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

/* --- Navegação ------------------------------------------------------------ */
.the-footer__heading {
  margin: 0 0 var(--space-2);
  color: var(--text-strong);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.the-footer__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.the-footer__link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  text-decoration: none;
  color: var(--text-body);
  font-weight: var(--weight-medium);
  transition: color var(--dur-fast) var(--ease-standard);
}

.the-footer__link:hover {
  color: var(--text-link-hover);
}

.the-footer__link:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
  border-radius: var(--radius-sm);
}

/* --- Barra inferior ------------------------------------------------------- */
.the-footer__bottom {
  padding-block: var(--space-5);
  border-top: var(--border-width) solid var(--border);
}

.the-footer__copy {
  margin: 0;
  color: var(--text-subtle);
  font-size: var(--text-xs);
}

/* --- Desktop (≥ --bp-md, 48rem) ------------------------------------------- */
@media (min-width: 48rem) {
  .the-footer__inner {
    flex-direction: row;
    justify-content: space-between;
    gap: var(--space-16);
  }

  .the-footer__nav {
    flex-shrink: 0;
  }
}
</style>
