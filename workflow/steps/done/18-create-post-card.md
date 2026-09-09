# Criar molécula PostCard

**Status:** done

## What to do

Criar a molécula `PostCard.vue` que recebe um post por prop e renderiza capa, categoria, título, data e resumo, com link para o post completo. Reutilizar os átomos existentes (`BaseHeading`, `BaseTag`, `PostMeta`) onde couber.

## Original line

> - [ ] Criar molécula `PostCard.vue` (capa, categoria, título, data, resumo → link do post). ✔ recebe um post por prop e renderiza o card.

## Summary

Criada a molécula `portal/app/components/molecules/PostCard.vue` (novo diretório `molecules/`): recebe um `post` por prop (interface `Post` exportada — path, title, description, category, date, cover, coverAlt), renderiza capa (`<NuxtImg>` com fallback em gradiente), título via `BaseHeading` e categoria/data via `PostMeta`, com link estendido tornando o cartão inteiro clicável. Só tokens de design; mobile-first. `PostMeta` (step 19) ainda não existe — a composição fica completa ao concluí-lo.
