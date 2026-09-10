# Atualizar navegação global e atalhos

**Status:** done

## What to do

Atualizar o arquivo `portal/app/data/navigation.json` para adicionar o link para `/loja` (com rótulo "Lojinha") no menu do cabeçalho. Atualizar o arquivo `portal/app/data/home.json` para ativar o atalho ou card correspondente na Home. Garantir que a navegação reflita tanto na versão desktop quanto no drawer mobile do `TheHeader`.

## Original line

> - [ ] Atualizar navegação global em `portal/app/data/navigation.json` (header e menu mobile) e ativar atalho no `portal/app/data/home.json`. ✔ Link da lojinha visível na barra de navegação e atalhos da home.

## Summary

Adicionado link "Lojinha" → `/loja` em `portal/app/data/navigation.json` (`header.links`), que alimenta desktop e drawer mobile do `TheHeader` (JSON driven). Em `portal/app/data/home.json` incluído um card de atalho "Lojinha" ativo (`to: /loja`) na seção de atalhos. Resolvida a duplicação do step 49: removida a coluna fake "Da lojinha" de `sections/LatestPosts.vue` (agora só blog) e o bloco `lojinha` órfão de `home.json`. Validado com `npx nuxi prepare` + eslint (limpos).
