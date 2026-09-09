# Acesso Católico — Roadmap

> A **ordem de construção** e o **critério de pronto** de cada fase. O *quê*/*porquê* está em
> [`conceito.md`](conceito.md); o detalhe de cada fase em [`produtos/`](produtos/). Baseado em
> **marcos de resultado, não em datas** — projeto tocado por uma pessoa, em entregáveis pequenos, cada
> um útil sozinho.

## Princípios

1. **Entregas pequenas e utilizáveis.** Cada fase termina em algo no ar, não numa peça de bastidor.
2. **Não construir o que ainda não vai ser usado.**
3. **O portal cresce sozinho.** Cada camada de gestão alimenta o portal público com dado novo.
4. **Multi-tenant a partir da gestão** (Fase 2), com isolamento por paróquia e por comunidade. O portal
   público não tem tenancy.

## Visão geral

| Fase | Objetivo | Marco | Status |
|---|---|---|---|
| **1 — Portal Público** | Home + blog + lojinha de afiliados | **M1** — portal no ar | ⬜ Planejado |
| **2 — Gestão de Paróquias** | Paróquias mantêm missas/eventos → alimenta o portal | **M2** — 1 paróquia real no ar | ⬜ Planejado |
| **3 — Gestão de Comunidades & Eventos** | Inscrição, servos e cronograma de um encontro | **M3** inscrição real · **M4** edição inteira | ⬜ Planejado |
| **Futuro** | Pix automático, WhatsApp, logística de retiro | — | 💤 Backlog |

---

## Fase 1 — Portal Público

**Objetivo.** Presença pública imediata: audiência, receita de afiliados e marca, antes de qualquer
sistema de gestão. Detalhe em [`produtos/portal.md`](produtos/portal.md).

**Entregáveis:** Home (proposta de valor + atalhos) · Blog em markdown com categorias, tags, busca e
SEO · Lojinha de afiliados (foto, preço de referência, categoria, link; sem carrinho) · deploy,
domínio e analytics.

**Pronto quando (M1).** Portal no ar no domínio definitivo, com ≥1 post no blog e ≥1 produto na lojinha
com link de afiliado funcionando.

**Depende de.** Nada.

---

## Fase 2 — Gestão de Paróquias

**Objetivo.** Dar a cada paróquia um painel para manter os próprios dados — e com isso alimentar o
portal com o diretório "onde tem missa". Detalhe em [`produtos/paroquias.md`](produtos/paroquias.md).

**Entregáveis**
- Autenticação e conta de usuário; **isolamento de dados por paróquia** (primeiro tenant).
- Entidade **`Local` / Paróquia** (cidade → paróquia; diocese depois).
- Painel da paróquia: dados, contato, **horários recorrentes** (missa, confissão, adoração) + **exceções**
  (feriados/festas), e **eventos** públicos.
- **Diretório público no portal**: buscar paróquia por cidade, ver horários e eventos, com
  **`atualizado_em`** visível e botão **reportar erro**.
- Onboarding por **contato (WhatsApp/e-mail)** — sem fluxo automatizado de "claim".

**Ordem de construção**
1. Auth + `Local`/Paróquia + tenancy por paróquia.
2. Painel: dados/contato + horários recorrentes.
3. Exceções de horário + eventos da paróquia.
4. Diretório público no portal (com `atualizado_em` + reportar erro) — **M2**.

**Pronto quando (M2).** Uma paróquia real (das que você tem contato) mantém seus horários e eventos
pelo painel, e eles aparecem no portal.

**Depende de.** Fase 1 (o portal onde os dados aparecem).

---

## Fase 3 — Gestão de Comunidades & Eventos

**Objetivo.** Rodar a inscrição e a escalação de servos de uma edição de encontro inteiramente pela
plataforma. É a "aspirina". Detalhe em [`produtos/comunidades.md`](produtos/comunidades.md).

**Entregáveis**
- **Comunidade & Evento** (tipo **Encontro** com numeração), ligada a uma paróquia; multi-tenant por
  comunidade; RBAC (Admin/Coordenador de grupo/Membro).
- **Perfis-currículo**: cidade/estado, habilidades e histórico de participações em destaque.
- **Inscrições**: formulário **dinâmico** (campos configuráveis; respostas em JSON), página pública com
  estado aberto/fechado, **lista de espera**, painel com filtros e **exportação**, **LGPD** (campos
  sensíveis marcados + registro de consentimento — ver Transversais).
- **Grupos & Servos**: grupos permanentes (editor/leitor) + **escalação** por edição (vagas em branco e
  servo convidado).
- **Cronograma**: programação com visibilidade oculta/aberta aos escalados.
- **Página pública da comunidade** (no portal): vitrine + botão condicional (inscrição) / lista de espera.
- **Operação**: Financeiro (manual, tag por evento) · Mercadinho (manual + sugestões de afiliado) ·
  Brindes · Sorteios · Enquetes/RSVP.
- **Novos tipos de evento**: reunião recorrente e evento público de comunidade.

**Ordem de construção** (caminho crítico até dogfood)
1. Comunidade + Evento (Encontro) — o esqueleto.
2. Formulário dinâmico + página pública de inscrição — a porta de entrada.
3. Painel de inscritos (lista, filtros, exportação) — **M3: já dá pra usar numa inscrição real**.
4. Lista de espera + abrir/fechar inscrições.
5. Grupos + escalação (servo convidado, editor/leitor).
6. Cronograma + visibilidade.
7. Página pública da comunidade no portal.
8. Dashboard consolidado.
9. Operação (financeiro, mercadinho, brindes, sorteios, enquetes) + novos tipos de evento.

**Pronto quando (M4).** Sua comunidade faz inscrição, monta as equipes e publica o cronograma da
próxima edição só pela plataforma.

**Depende de.** Fase 2 (auth, tenancy e `Local` já existem; a comunidade se liga a uma paróquia).

---

## Futuro (backlog)

Entra quando fizer sentido, sem data: **Pix/gateway** com confirmação automática · **integração
WhatsApp** · **escalas avançadas** (turnos) · **logística de retiro** (alojamento, refeições, transporte)
· **calendário litúrgico** rico no portal (ver [`produtos/portal.md`](produtos/portal.md)).

---

## Transversais (atravessam as fases)

- **LGPD / menores.** Ativa na **Fase 3**, na primeira inscrição. Processo de consentimento é **manual**
  (do responsável pela inscrição); o sistema **registra** validador, data/hora, canal e responsável
  autorizador, e restringe quem vê campos sensíveis. Ver [`conceito.md §8`](conceito.md).
- **Infra e operação.** Deploy, backups e monitoramento desde a **Fase 1**.

*Todas as decisões estruturais estão resolvidas em [`conceito.md §8`](conceito.md); a única questão em
aberto é o frescor dos horários de missa, tratada em [`produtos/paroquias.md`](produtos/paroquias.md).*
