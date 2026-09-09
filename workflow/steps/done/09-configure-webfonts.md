# Configurar webfonts

**Status:** done

## What to do

Configurar as webfonts do projeto — Spectral (serifa/títulos), Figtree (sans/corpo) e JetBrains Mono (mono/meta) — via `@nuxt/fonts` (preferencial, já no stack) ou pelo `@import` de `fonts.css`. No navegador, títulos devem sair em serifa e o corpo em sans.

## Original line

> - [ ] Configurar as webfonts (Spectral, Figtree, JetBrains Mono) via `@nuxt/fonts` ou o `@import` de `fonts.css`. ✔ títulos em serifa, corpo em sans no navegador.

## Summary

Configurado `@nuxt/fonts` em `portal/nuxt.config.ts` (`fonts.families`: Spectral 400/500/600/700 + itálico, Figtree 400–800, JetBrains Mono 400/500) e removido o `@import` externo do Google de `portal/app/assets/css/tokens/fonts.css` para self-hospedagem. Build (`npm run build`) gerou @font-face para as três famílias e 56 arquivos woff2 em `.output/public/_fonts`. Títulos em Spectral (serifa via `--font-display`), corpo em Figtree (sans via `--font-sans`).
