# Fire article_read on the blog article page

**Status:** todo

## What to do

Fire an `article_read` event (with `targetId` = article slug) on the blog article page in the portal, via `POST /api/track`. Fire it once per article view, non-blocking. This feeds the article-reading dashboard in the admin.

## Done criteria

Opening an article generates an `article_read` event with the correct slug.

## Original line

> Disparar `article_read` (com `targetId` = slug) na página de artigo do blog. ✔ Abrir um artigo gera um evento `article_read` com o slug correto.
