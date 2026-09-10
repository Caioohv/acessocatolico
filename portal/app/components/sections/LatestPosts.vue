<script setup lang="ts">
/**
 * LatestPosts — section da home com os posts mais recentes do blog.
 * JSON driven via ~/data/home.json + Nuxt Content (somente dados reais do blog).
 * A vitrine da lojinha vive na section `LatestProducts` (produtos reais de `/api/products`).
 */
import homeData from '~/data/home.json'

const { data: postsData } = await useAsyncData('home-latest-posts', () =>
  queryCollection('blog').order('date', 'DESC').limit(3).all(),
)

const posts = computed(() => {
  if (postsData.value && postsData.value.length > 0) {
    return postsData.value.map(p => ({
      cat: p.category || 'Blog',
      title: p.title,
      path: p.path,
      cover: p.cover,
    }))
  }
  return []
})
</script>

<template>
  <section class="latest-posts-section">
    <div class="latest-posts-section__inner">
      <div class="latest-posts-section__grid">
        <!-- Coluna do Blog -->
        <div class="latest-posts-section__blog-col">
          <div class="latest-posts-section__blog-header">
            <h3 class="latest-posts-section__h3">{{ homeData.blog.title }}</h3>
            <NuxtLink :to="homeData.blog.seeAllTo" class="latest-posts-section__see-all">
              {{ homeData.blog.seeAllText }}
            </NuxtLink>
          </div>

          <template v-if="posts.length > 0">
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
          </template>

          <p v-else class="latest-posts-section__empty">
            {{ homeData.blog.emptyText }}
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

.latest-posts-section__empty {
  font-size: var(--text-sm);
  color: var(--text-muted);
  padding: var(--space-4) 0;
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
  text-decoration: none;
}

.blog-post-item:hover .blog-post-item__title {
  text-decoration: none;
}
</style>
