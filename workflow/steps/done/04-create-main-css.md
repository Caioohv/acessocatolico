# Criar main.css agregador

**Status:** done

## What to do

Criar `app/assets/css/main.css` que importa, nesta ordem exata: fonts → colors → spacing → typography → effects → um reset base. Usar `@import` apontando para os arquivos de token copiados em `app/assets/css/tokens/`. O arquivo deve importar os 5 grupos de tokens mais o reset.

## Original line

> - [ ] Criar `app/assets/css/main.css` que importa, na ordem: fonts → colors → spacing → typography → effects → um reset base. ✔ o arquivo importa os 5 tokens + reset.

## Summary

Criado `portal/app/assets/css/main.css` com `@import` na ordem exata fonts → colors → spacing → typography → effects → reset. Criado também `portal/app/assets/css/reset.css` (reset moderno mobile-first que consome os tokens: `--font-sans`, `--surface-page`, `--text-body`, `--leading-*`, alvos de toque ≥44px, `prefers-reduced-motion`). Caminhos sob `portal/` conforme project-memory.
