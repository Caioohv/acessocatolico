<script setup lang="ts">
/**
 * LatestPosts — section da home com os posts mais recentes do blog e o destaque da lojinha.
 * Espelha exatamente o design em design-system/Home Portal.dc.html.
 */

const { data: postsData } = await useAsyncData('home-latest-posts', () =>
  queryCollection('blog').order('date', 'DESC').limit(3).all(),
)

const defaultPosts = [
  { cat: 'Orações', title: 'Como rezar o terço em família', path: '/blog' },
  { cat: 'Guias', title: 'O que levar para um retiro de EJC', path: '/blog' },
  { cat: 'Estudos', title: 'O sentido do tempo litúrgico', path: '/blog' },
]

const posts = computed(() => {
  if (postsData.value && postsData.value.length > 0) {
    return postsData.value.map(p => ({
      cat: p.category || 'Blog',
      title: p.title,
      path: p.path,
      cover: p.cover,
    }))
  }
  return defaultPosts
})

const products = [
  { name: 'Terço de madeira', price: 'R$ 29,90' },
  { name: 'Bíblia de estudo', price: 'R$ 89,90' },
]
</script>

<template>
  <section class="latest-posts-section">
    <div class="latest-posts-section__inner">
      <div class="latest-posts-section__grid">
        <!-- Coluna do Blog -->
        <div class="latest-posts-section__blog-col">
          <div class="latest-posts-section__blog-header">
            <h3 class="latest-posts-section__h3">Do blog</h3>
            <NuxtLink to="/blog" class="latest-posts-section__see-all">
              Ver tudo
            </NuxtLink>
          </div>

          <NuxtLink
            v-for="p in posts"
            :key="p.title"
            :to="p.path"
            class="blog-post-item"
          >
            <div
              class="blog-post-item__thumb"
              :style="
                p.cover
                  ? { backgroundImage: `url(${p.cover})`, backgroundSize: 'cover' }
                  : {}
              "
            />
            <div class="blog-post-item__content">
              <span class="blog-post-item__cat">{{ p.cat }}</span>
              <div class="blog-post-item__title">{{ p.title }}</div>
            </div>
          </NuxtLink>
        </div>

        <!-- Coluna da Lojinha -->
        <div class="lojinha-card">
          <h3 class="latest-posts-section__h3">Da lojinha</h3>
          <div class="lojinha-card__grid">
            <div
              v-for="prod in products"
              :key="prod.name"
              class="product-item"
            >
              <div class="product-item__thumb" />
              <div class="product-item__name">{{ prod.name }}</div>
              <div class="product-item__price">{{ prod.price }}</div>
            </div>
          </div>
          <p class="lojinha-card__note">
            Comprando por aqui você ajuda a manter o Acesso Católico gratuito 🙏
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.latest-posts-section {
  width: 100%;
}

.latest-posts-section__inner {
  max-width: var(--container-portal);
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}

.latest-posts-section__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-6);
}

.latest-posts-section__h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-h3);
  color: var(--text-strong);
  margin: 0;
}

/* --- Coluna do Blog ------------------------------------------------------- */
.latest-posts-section__blog-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.latest-posts-section__see-all {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-link);
  text-decoration: none;
}

.latest-posts-section__see-all:hover {
  color: var(--text-link-hover);
}

.blog-post-item {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-3) 0;
  border-top: 1px solid var(--border);
  color: inherit;
  text-decoration: none;
  transition: opacity var(--dur-fast) var(--ease-standard);
}

.blog-post-item:hover {
  opacity: 0.85;
}

.blog-post-item__thumb {
  width: 72px;
  height: 56px;
  flex: none;
  border-radius: var(--radius-md);
  background: repeating-linear-gradient(
    135deg,
    var(--surface-sunken),
    var(--surface-sunken) 6px,
    var(--brand-tint-quiet) 6px,
    var(--brand-tint-quiet) 12px
  );
}

.blog-post-item__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.blog-post-item__cat {
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--brand);
}

.blog-post-item__title {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: var(--text-h4);
  color: var(--text-strong);
  line-height: var(--leading-snug);
}

/* --- Coluna da Lojinha ---------------------------------------------------- */
.lojinha-card {
  background: var(--amber-50);
  border: 1px solid var(--amber-200);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.lojinha-card__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.product-item {
  background: var(--surface-card);
  border-radius: var(--radius-md);
  padding: var(--space-3);
}

.product-item__thumb {
  height: 72px;
  border-radius: var(--radius-sm);
  background: repeating-linear-gradient(
    135deg,
    var(--surface-sunken),
    var(--surface-sunken) 6px,
    var(--amber-100) 6px,
    var(--amber-100) 12px
  );
  margin-bottom: var(--space-2);
}

.product-item__name {
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--text-strong);
}

.product-item__price {
  font-family: var(--font-mono);
  font-size: var(--text-meta);
  color: var(--text-body);
}

.lojinha-card__note {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--amber-700);
  line-height: var(--leading-snug);
}
</style>
