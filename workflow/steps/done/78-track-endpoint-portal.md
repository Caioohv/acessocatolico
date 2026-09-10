# Create the `POST /api/track` endpoint in the portal

**Status:** done

## What to do

Create `POST /api/track` in the portal that writes an `AnalyticsEvent`, deriving `sessionId` from a rotating hash with no PII (no third-party tracking cookie). Make it resilient and non-blocking: a database failure must not return an error that breaks the page (mirror the portal's existing try/catch + graceful fallback pattern). This is the single collection endpoint for pageviews, product clicks, and article reads.

## Done criteria

A sample POST inserts a row into `AnalyticsEvent`; a database failure does not return an error that breaks the page.

## Original line

> Criar `POST /api/track` no portal que grava um `AnalyticsEvent` (deriva `sessionId` por hash rotativo sem PII), resiliente e não-bloqueante. ✔ Um POST de exemplo insere uma linha em `AnalyticsEvent`; falha do banco não retorna erro que quebre a página.

## Summary

Created `portal/server/api/track.post.ts` — accepts JSON body `{ type, path, targetId?, referrer? }`, derives a daily-rotating SHA-256 `sessionId` from IP + User-Agent (no PII stored), calls `prisma.analyticsEvent.create()`; a database failure is caught and logged server-side while the response stays `{ ok: true }`, matching the portal's existing graceful-fallback pattern. Lint passed clean.
