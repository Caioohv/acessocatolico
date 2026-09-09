# Project Definition

**Project:** Acesso Católico
**Created:** 2026-09-09

---

## Overview

Portal público católico — missas, eventos, comunidades e conteúdo por região — sustentado por
uma plataforma de gestão. A tese central: **a gestão produz o dado; o portal o expõe.** Construído
por uma pessoa, em incrementos pequenos, cada um útil sozinho. Produto **gratuito por princípio**,
sustentado só por links de afiliado.

Docs completos em [`docs/`](../docs/): visão em [`conceito.md`](../docs/conceito.md), ordem e
critério de pronto em [`roadmap.md`](../docs/roadmap.md), stack em
[`decisoes/stack.md`](../docs/decisoes/stack.md), detalhe de cada fase em
[`produtos/`](../docs/produtos/). **Esses docs são a fonte de verdade** — esta definição os resume.

## Problem

- **Católico comum:** não há um lugar simples para achar horário de missa, confissão e eventos da
  cidade. A informação vive espalhada em sites de paróquia desatualizados e grupos de WhatsApp.
- **Quem organiza comunidades/encontros:** hoje opera com Google Forms + planilha + WhatsApp. A
  informação some entre uma edição e outra, não há memória institucional, e inscrição, pagamento e
  escalação de servos ficam em ferramentas que não se conversam.

A **"aspirina"** (o que sozinho justifica migrar): formulário de inscrição bom + painel que
consolida inscritos/pagamentos/servos + **memória entre edições**.

## Goals

- Presença pública imediata (audiência, receita de afiliados, marca) antes de qualquer sistema de gestão.
- Dar a paróquias e comunidades um painel para manter os próprios dados — que alimenta o portal.
- Capturar o ciclo **encontrista → membro → servo**, que a planilha nunca captou.
- Manter o produto gratuito para quem usa; sustentar por afiliados.

## Non-goals

- Cobrar de quem usa: sem assinatura, sem taxa por transação, sem paywall.
- Multi-tenancy ou login no portal público (Fase 1 é só consumo).
- Automatizar validação de consentimento de menores — o sistema apenas **registra** (ver LGPD abaixo).
- Fluxo automatizado de "claim" de paróquia/comunidade no v1 — feito por contato (WhatsApp/e-mail).
- Esticar Nuxt Content além do blog: a gestão usa um backend de verdade (Nitro + Postgres).

## Users

- **Católico comum** — consome o portal (missas, eventos, blog, lojinha). Sem conta.
- **Admin de paróquia** *(Fase 2)* — mantém horários, eventos, contato da paróquia.
- **Admin de comunidade / Coordenador de grupo / Membro / Servo** *(Fase 3)* — RBAC por Vínculo
  (papel e permissões pertencem ao par Pessoa × tenant, não à pessoa globalmente).
- **Master (plataforma)** — o dono; vê e edita tudo.

## Key features

Entregues por fase (marcos de resultado, não datas — ver [`roadmap.md`](../docs/roadmap.md)):

- **Fase 1 — Portal Público (M1):** Home + blog em markdown (categorias, tags, busca, SEO) +
  lojinha de afiliados (foto, preço de referência, categoria, link; sem carrinho) + deploy/domínio/analytics.
- **Fase 2 — Gestão de Paróquias (M2):** auth + tenancy por paróquia + entidade `Local`/Paróquia +
  painel (horários recorrentes + exceções + eventos) + diretório público com `atualizado_em` e "reportar erro".
- **Fase 3 — Comunidades & Eventos (M3/M4):** Comunidade + Evento (Encontro), inscrição por
  **formulário dinâmico** (respostas em JSON), lista de espera, grupos & **escalação** (vagas em
  branco, servo convidado), cronograma, financeiro/mercadinho manuais, RBAC granular por módulo.

## Tech stack

Uma stack só para o projeto todo (dev solo → familiaridade > stack "ótima" fragmentada).

| Layer | Choice | Notes |
|-------|--------|-------|
| Language | TypeScript / Vue 3 (`<script setup>`) | Nuxt 4 |
| Framework | Nuxt 4 (SSR/SSG + Nitro server routes) | SSR/SSG resolve o SEO, coração do portal |
| Blog | @nuxt/content 3 | Markdown autorado no Obsidian, publicado via `git push` |
| Database | PostgreSQL único (Docker, já existente) | Fase 1: só a tabela `produtos` (lojinha). ORM a decidir. |
| UI/assets | @nuxt/image, @nuxt/fonts, @nuxt/icon | — |
| Busca (blog) | Nuxt Content nativo (categoria/tag/título) + Fuse.js (corpo, client-side) v1 | Migrar p/ Meilisearch se o volume crescer |
| Infra | VPS + Nginx (reverse proxy) + Postgres em Docker | Webhook no push → rebuild; backups (dump) desde a Fase 1 |

## Architecture

- **Estratégia incremental:** portal público primeiro (sem gestão), depois gestão de paróquias,
  depois de comunidades. Cada camada de gestão produz, sem esforço extra, o dado que o portal expõe
  — o portal **cresce sozinho**.
- **Modelo de domínio (Fases 2–3):** separar **o que persiste** (Local/Paróquia, Comunidade, Pessoa,
  Vínculo, Grupo) **do que é de um evento** (Inscrição, Escalação daquela Edição). Entidades e
  detalhe em [`conceito.md §4`](../docs/conceito.md).
- **Núcleo genérico + template por movimento:** todo movimento (EJC, EAC, ECC…) compartilha o mesmo
  esqueleto; o que muda é **configuração** (vocabulário, grupos padrão, cronograma-modelo).
  Adicionar um movimento = preencher um template, não escrever código.
- **Tipos de evento** ligam/desligam módulos: Encontro/Retiro · Reunião recorrente · Evento público.
- **RBAC (Fase 3):** papel e permissões vivem no **Vínculo** (Pessoa × tenant); permissão granular
  ver/editar por módulo.
- **Multi-tenancy:** só a partir da Fase 2; isolamento por paróquia (Fase 2) e por comunidade
  (Fase 3). Estratégia (schema-por-tenant vs `tenant_id`) a decidir na Fase 2. Portal público **não**
  tem tenancy.
- **Camadas de código:** governadas pelas skills — `clean-architecture` e `ddd-tactical`
  (arquitetura), `nuxt-4-dev` / `vue-atomic-design` / `frontend-components` (frontend),
  backend Nitro na gestão. Frontend não hardcoda tokens: `workflow/design.md` é a fonte de verdade.

## Conventions

- **Idioma:** conteúdo e docs em **PT-BR** (skill `content-writer-ptbr`); código, nomes de
  identificadores e mensagens de commit em inglês.
- **Commits:** Conventional Commits (skill `commit-pr-conventions`) — mesma convenção já usada no
  histórico (`feat:`, `fix:`, `chore:`).
- **Layout de componentes:** Atomic Design em Vue SFC (`<script setup>`); reuso antes de criar novo;
  nada de valores hardcoded que existam como token de design.
- **Testes:** **pragmático / conforme a necessidade** — sem mandato geral na Fase 1; adicionar testes
  onde a lógica for não-trivial (server routes Nitro, lógica de domínio nas fases seguintes). A skill
  `testing-jest` orienta o que testar/mockar por camada quando testes forem escritos.
- **Nomes de arquivo de tarefa/step:** número zero-padded + slug hifenizado (ver `CLAUDE.md`).
- **Fluxo de trabalho:** pipeline de tarefas/steps descrito em [`CLAUDE.md`](../CLAUDE.md);
  `workflow/project-memory.md` guarda os "gotchas" — leia antes e acrescente quando aprender algo não-óbvio.

## Risks and constraints

- **LGPD / menores** *(ativa na Fase 3)*: inscrições pedem dados sensíveis (restrição alimentar,
  medicação, contato de emergência); EAC é de adolescentes. Mínimo: marcar campos sensíveis, restringir
  quem os vê, e **registrar** consentimento (validador, data/hora, canal, responsável autorizador). A
  validação em si é **manual**, feita pelo responsável pela inscrição.
- **Dev solo:** priorizar entregas pequenas e utilizáveis; não construir o que ainda não vai ser usado.
- **Pix e WhatsApp são o padrão** (não boleto/e-mail): no v1 pagamento e comunicação acontecem por
  fora; o design deixa ganchos para automatizar depois.
- **Sustentabilidade financeira** depende de afiliados/doação — se a manutenção pesar, o caminho é
  ampliar afiliados, nunca pôr o sistema atrás de paywall.
- **Decisões técnicas em aberto** (não bloqueiam o v1): ORM (Drizzle/Prisma/SQL direto), isolamento
  multi-tenant, hospedagem das fotos da lojinha (Nginx dir → Cloudflare R2), timing do Meilisearch,
  e o frescor dos horários de missa (ver [`produtos/paroquias.md`](../docs/produtos/paroquias.md)).
