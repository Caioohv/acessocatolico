# Estilizar o corpo do post (prose)

**Status:** done

## What to do

Estilizar o corpo do post renderizado: largura de leitura `--measure-prose` (~68ch), `--leading-relaxed` no texto e títulos em serifa (Spectral). O objetivo é leitura confortável com medida próxima de 68ch. Escopar os estilos ao container de prose para não vazar para o resto do site.

## Original line

> - [ ] Estilizar o corpo do post (prose): largura `--measure-prose`, `--leading-relaxed`, títulos em serifa. ✔ leitura confortável, medida ~68ch.

## Summary

Corpo do post em `portal/app/pages/blog/[...slug].vue` estilizado com tokens de design, escopado a `.post__body` via `:deep()`. A largura de leitura ~68ch (`--measure-prose`) já vinha de `<AppContainer size="prose">`, o texto usa `--leading-relaxed` e os títulos serifa `--font-display` (Spectral). Completei os elementos markdown que faltavam: `h4`, `strong`, `code` inline, blocos `pre`/`pre code`, `hr` e tabelas (`table`/`th`/`td`), todos com tokens. `npx nuxi prepare` roda sem erro.
