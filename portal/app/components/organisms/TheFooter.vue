<script setup lang="ts">
/**
 * TheFooter — organism de rodapé do portal.
 * Totalmente JSON driven via ~/data/navigation.json.
 */
import navData from '~/data/navigation.json'
</script>

<template>
  <footer class="the-footer">
    <div class="the-footer__inner">
      <span class="the-footer__copy">
        {{ navData.footer.copy }}
      </span>
      <NuxtLink :to="navData.footer.reportTo" class="the-footer__report-btn">
        {{ navData.footer.reportText }}
      </NuxtLink>
    </div>
  </footer>
</template>

<style scoped>
.the-footer {
  width: 100%;
}

.the-footer__inner {
  max-width: var(--container-portal);
  margin: var(--space-12) auto 0;
  padding: var(--space-8) var(--space-6) var(--space-8);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.the-footer__copy {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-muted);
}

.the-footer__report-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-link);
  border: 1px solid var(--border);
  background: var(--surface-card);
  border-radius: var(--radius-pill);
  padding: 6px var(--space-3);
  text-decoration: none;
  transition:
    background var(--dur-fast) var(--ease-standard),
    border-color var(--dur-fast) var(--ease-standard);
}

.the-footer__report-btn:hover {
  background: var(--surface-sunken);
  border-color: var(--border-strong);
}
</style>
