<script setup lang="ts">
/**
 * / — home do portal.
 * Totalmente JSON driven via ~/data/home.json.
 */
import homeData from '~/data/home.json'

useSeoMeta({
  title: homeData.seo.title,
  description: homeData.seo.description,
  ogTitle: homeData.seo.title,
  ogDescription: homeData.seo.description,
  ogType: 'website',
})
</script>

<template>
  <div class="home">
    <HeroHome />
    <ShortcutsHome />
    <LatestPosts />
    <LatestProducts />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  padding-bottom: var(--space-16);
}
</style>
