# Criar posts de exemplo

**Status:** done

## What to do

Criar 2–3 posts de exemplo em `content/blog/*.md` usando o frontmatter-padrão definido em `docs/decisoes/stack.md` (título, categoria, tags, data, capa, slug, resumo). Conteúdo em PT-BR (skill `content-writer-ptbr`). Os arquivos devem ser válidos e não gerar erro de parse do Nuxt Content. Se o padrão de frontmatter em `docs/decisoes/stack.md` não estiver claro, seguir o schema definido em `content.config.ts`.

## Original line

> - [ ] Criar 2–3 posts de exemplo em `content/blog/*.md` com o frontmatter-padrão (ver `docs/decisoes/stack.md`). ✔ arquivos válidos, sem erro de parse.

## Summary

Criados 3 posts de exemplo em `portal/content/blog/` (retiro, adoração eucarística, horário de missa) conforme o schema do step 20: `title`/`description` nativos + `category`, `tags`, `date` (string YAML entre aspas), `cover`, `coverAlt`, `slug`. Conteúdo em PT-BR seguindo `content-writer-ptbr`. `npx nuxi prepare` rodou sem erro; gotcha do `date` string registrado em project-memory.
