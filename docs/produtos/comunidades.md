# Gestão de Comunidades & Eventos — `painel.acessocatolico.com.br` (Fase 3)

> A "aspirina" que aposenta o Google Forms + planilha: inscrições, servos, cronograma e operação de
> um encontro. Roda sobre a base da Fase 2 (auth, tenancy, `Local`) e alimenta o portal com comunidades
> e eventos. Modelo de domínio, RBAC e monetização em [`../conceito.md`](../conceito.md).

---

## Objetivo

Centralizar inscrições, servos, cronograma, financeiro e mercadinho de encontros (EJC, EAC, ECC,
ENVIA-ME, Éfeta…) — **com memória entre edições**, que a planilha nunca teve.

**A "aspirina":** formulário de inscrição configurável + painel de inscritos consolidado + escalação de
servos com histórico entre edições. O resto é "vitamina".

---

## Módulos

**Núcleo (caminho crítico até dogfood)**
- **Comunidade & Evento** — criar comunidade (ligada a uma paróquia da Fase 2); criar evento do tipo
  **Encontro** (edição com numeração); multi-tenant por comunidade; RBAC.
- **Perfis-currículo** — cidade/estado, habilidades e **histórico de participações em destaque** (o
  servo mostra "servi em 8 encontros, 3 comunidades, equipe de música").
- **Inscrições** — formulário **dinâmico** (campos configuráveis; respostas em JSON), página pública
  aberto/fechado, **lista de espera**, painel com filtros e **exportação**, **LGPD**.
- **Grupos & Servos** — grupos permanentes (editor/leitor) + **escalação** por edição (vagas em branco,
  servo convidado).
- **Cronograma** — programação com visibilidade oculta/aberta aos escalados.
- **Página pública da comunidade** (no portal) — vitrine + botão condicional (inscrição) / lista de espera.

**Operação (vitamina)**
- **Financeiro** (manual): receitas/despesas, categorias, **tag por evento**, relatório simples.
- **Mercadinho** (manual): estoque + vendas ligadas à pessoa; **sugestões de compra** (afiliados da
  lojinha, filtradas pela categoria do item).
- **Brindes**: kits do encontrista (bolsa, crachá, cartão…).
- **Sorteios**: vagas e outras coisas da comunidade.
- **Enquetes / RSVP**: para grupos e comunidade.
- **Novos tipos de evento**: reunião recorrente (presença/RSVP) e evento público de comunidade.

> **M3** — inscrição real no ar (aposenta a planilha). **M4** — edição inteira gerida só pela plataforma.
> Ordem de construção detalhada em [`../roadmap.md`](../roadmap.md).

---

## Formulário de inscrição dinâmico

Cada comunidade tem necessidades diferentes: o admin define os campos (rótulo, tipo — texto, telefone,
e-mail, data, escolha, caixa — e se é obrigatório) e o sistema renderiza um form de verdade. As
respostas são guardadas como **JSON por campo** (esquema + respostas), não texto solto — mantém o banco
enxuto *e* tudo pesquisável, validável, filtrável, exportável e contável. Campos padrão (nome, contato)
sempre existem; campos sensíveis (saúde, dados de menor) ficam marcados.

---

## LGPD e menores

O consentimento de menor é **processo manual do responsável pela inscrição**. O sistema não valida —
apenas **registra**: quem validou, data/hora, canal (por onde) e o responsável que autorizou. Campos
sensíveis marcados e com visualização restrita. Ver [`../conceito.md §7-8`](../conceito.md).

---

## Relação com portal e paróquias

- Toda comunidade liga-se a uma **paróquia** (Fase 2) — a página da paróquia lista suas comunidades e a
  da comunidade aponta para a paróquia. É o **efeito de rede**.
- Comunidades e eventos passam a aparecer na **descoberta por região** no portal.

---

## Monetização

Gratuito. Sustentado pelos afiliados da lojinha ([`portal.md`](portal.md)) e pelas sugestões de compra
no Mercadinho. Ver [`../conceito.md §6`](../conceito.md).
