# Esvaziar app.vue para shell mínimo

**Status:** done

## What to do

Reduzir `app/app.vue` a um shell mínimo contendo apenas `<NuxtLayout>` envolvendo `<NuxtPage>`, removendo qualquer markup/estilo de demonstração do starter. Garantir que a Home continua renderizando em `/` após a mudança.

## Original line

> - [ ] Esvaziar `app/app.vue` para um shell mínimo com `<NuxtLayout>` + `<NuxtPage>`. ✔ Home ainda renderiza em `/`.

## Summary

Reduzi `portal/app/app.vue` a `<NuxtLayout><NuxtPage /></NuxtLayout>`, removendo o `<NuxtRouteAnnouncer />` do starter. Verificado via `nuxi dev`: Home responde 200 em `/` renderizando o conteúdo de `content/index.md` ("Acesso Católico").
