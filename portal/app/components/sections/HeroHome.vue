<script setup lang="ts">
/**
 * HeroHome — section de topo da home (`/`).
 * Espelha exatamente o design em design-system/Home Portal.dc.html.
 * Fundo de marca (surface-brand), badge de valor, busca rápida por cidade/paróquia
 * e cartão com as próximas missas e o selo de frescor do dado.
 */
const masses = [
  { church: 'Catedral Metropolitana', place: 'Centro', time: '07h00' },
  { church: 'Paróquia N. Sra. de Fátima', place: 'Aldeota', time: '12h10' },
  { church: 'Santuário São José', place: 'Benfica', time: '19h00' },
]

const searchQuery = ref('')

function handleSearch() {
  // Ação de busca
}
</script>

<template>
  <section class="hero-home">
    <div class="hero-home__inner">
      <div class="hero-home__content">
        <span class="hero-home__badge">
          Gratuito · feito para a comunidade
        </span>
        <h1 class="hero-home__title">A sua fé, perto de você</h1>
        <p class="hero-home__lead">
          Missas, confissões, eventos e comunidades — atualizados e organizados
          por região.
        </p>
        <form class="hero-home__search" @submit.prevent="handleSearch">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Digite sua cidade ou paróquia"
            class="hero-home__search-input"
          />
          <button type="submit" class="hero-home__search-btn">
            Buscar
          </button>
        </form>
      </div>

      <div class="hero-home__card">
        <div class="hero-home__card-header">
          <span class="hero-home__card-title">Próximas missas · Fortaleza</span>
          <span class="hero-home__card-freshness">
            <span class="hero-home__fresh-dot"></span>atualizado hoje
          </span>
        </div>
        <div
          v-for="m in masses"
          :key="m.church"
          class="hero-home__mass-item"
        >
          <div>
            <div class="hero-home__church-name">{{ m.church }}</div>
            <div class="hero-home__church-place">{{ m.place }}</div>
          </div>
          <span class="hero-home__mass-time">{{ m.time }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-home {
  background: var(--surface-brand);
  color: var(--text-on-brand);
}

.hero-home__inner {
  max-width: var(--container-portal);
  margin: 0 auto;
  padding: var(--space-12) var(--space-6);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  align-items: center;
}

@media (min-width: 48rem) {
  .hero-home__inner {
    padding: var(--space-16) var(--space-6);
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    gap: var(--space-12);
  }
}

/* --- Coluna da esquerda ---------------------------------------------------- */
.hero-home__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.12);
  color: var(--amber-500);
  padding: 6px var(--space-3);
  border-radius: var(--radius-pill);
}

.hero-home__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-h1);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  margin: var(--space-5) 0 var(--space-4);
  color: var(--text-on-brand);
}

@media (min-width: 48rem) {
  .hero-home__title {
    font-size: var(--text-display);
  }
}

.hero-home__lead {
  font-size: var(--text-lg);
  line-height: var(--leading-snug);
  color: rgba(255, 255, 255, 0.82);
  max-width: 44ch;
  margin: 0 0 var(--space-8);
}

.hero-home__search {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  background: var(--surface-card);
  border-radius: var(--radius-lg);
  padding: var(--space-2);
  max-width: 520px;
  box-shadow: var(--shadow-lg);
}

.hero-home__search-input {
  flex: 1;
  min-width: 180px;
  border: none;
  background: transparent;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--text-strong);
  padding: 0 var(--space-3);
  outline: none;
}

.hero-home__search-btn {
  border: none;
  cursor: pointer;
  background: var(--accent);
  color: var(--text-on-accent);
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: var(--text-base);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  transition: background var(--dur-fast) var(--ease-standard);
}

.hero-home__search-btn:hover {
  background: var(--accent-strong);
}

/* --- Coluna da direita (Card de missas) ----------------------------------- */
.hero-home__card {
  background: var(--surface-card);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-lg);
  color: var(--text-body);
}

.hero-home__card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
  gap: var(--space-2);
  flex-wrap: wrap;
}

.hero-home__card-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-h4);
  color: var(--text-strong);
}

.hero-home__card-freshness {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.hero-home__fresh-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--fresh);
}

.hero-home__mass-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) 0;
  border-top: 1px solid var(--border);
}

.hero-home__church-name {
  font-weight: 600;
  color: var(--text-strong);
  font-size: var(--text-sm);
}

.hero-home__church-place {
  font-size: var(--text-xs);
  color: var(--text-muted);
}

.hero-home__mass-time {
  font-family: var(--font-mono);
  font-size: var(--text-meta);
  color: var(--brand);
  font-weight: 500;
}
</style>
