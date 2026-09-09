# Criar organism TheHeader

**Status:** done

## What to do

Criar o organism `TheHeader.vue` com logo e navegação (Home, Blog). No mobile a nav vira menu hambúrguer com toggle acessível (aria-expanded, foco, alvo de toque ≥44px); a partir de `--bp-md` a nav fica inline. Os links devem navegar via `<NuxtLink>` (SPA, sem recarregar a página). Menu deve abrir/fechar no mobile.

## Original line

> - [ ] Criar organism `TheHeader.vue`: logo + nav (Home, Blog). No mobile, nav em menu hambúrguer (toggle acessível, ≥44px); a partir de `--bp-md`, nav inline. ✔ menu abre/fecha no mobile e vira barra inline no desktop; links navegam sem recarregar.

## Summary

Criado `portal/app/components/organisms/TheHeader.vue`: logo (link Home) + nav (Início `/`, Blog `/blog`) via `<NuxtLink>`. Mobile-first — botão hambúrguer acessível (`aria-expanded`/`aria-controls`, alvo ≥44px, fecha com Esc e ao navegar); a partir de `48rem` (`--bp-md`) a nav vira inline e o botão some. Só tokens do design (nada hardcoded); ícones em SVG inline. Adicionado `<TheHeader />` ao `default.vue`. ESLint limpo.
