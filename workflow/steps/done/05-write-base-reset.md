# Escrever o reset base

**Status:** done

## What to do

Escrever o reset base (em `app/assets/css/` importado pelo main.css) com: `box-sizing: border-box`, margens zeradas, `body` usando `--paper-50`, `--font-sans`, `--ink-700`, `--leading-normal`, `img/video { max-width: 100% }` e `overflow-x: hidden` no shell. Resultado esperado: sem estilos de user-agent aparentes e sem scroll horizontal em 360px. Usar sempre tokens, nunca valores brutos.

## Original line

> - [ ] Escrever o reset base (box-sizing, margens zeradas, `body` com `--paper-50`, `--font-sans`, `--ink-700`, `--leading-normal`, `img/video { max-width: 100% }`, `overflow-x: hidden` no shell). ✔ sem estilos de user-agent e sem scroll horizontal em 360px.

## Summary

`portal/app/assets/css/reset.css` já existia (step 04) com um reset mobile-first consumindo tokens. box-sizing, margens zeradas, `body` com `--font-sans`/`--surface-page`(→`--paper-50`)/`--text-body`(→`--ink-700`)/`--leading-normal` e `img/video { max-width: 100% }` já estavam presentes via aliases semânticos. Adicionado o único faltante: `overflow-x: hidden` no shell (`html` e `body`), garantindo ausência de scroll horizontal em 360px. Importado por `main.css`. Nenhum valor bruto — só tokens.
