# Definir breakpoints do projeto

**Status:** done

## What to do

Definir os breakpoints do projeto como convenção `min-width` (mobile-first), por exemplo `--bp-sm: 30rem`, `--bp-md: 48rem`, `--bp-lg: 64rem`, e documentá-los em comentário no topo do `main.css`. Como CSS custom properties não funcionam dentro de media queries, documentar os valores como convenção a ser seguida por todas as media queries do projeto (que devem usar esses valores literais).

## Original line

> - [ ] Definir os breakpoints do projeto como convenção `min-width` (ex.: `--bp-sm: 30rem`, `--bp-md: 48rem`, `--bp-lg: 64rem`) e documentá-los no topo do `main.css`. ✔ media queries do projeto usam esses valores.

## Summary

Documentei os breakpoints como convenção mobile-first (`--bp-sm: 30rem`, `--bp-md: 48rem`, `--bp-lg: 64rem`) em comentário no topo de `portal/app/assets/css/main.css`, com nota de que custom properties não funcionam em media queries e todas devem usar `min-width` com esses valores literais.
