# Gestão de Paróquias — `painel.acessocatolico.com.br` (Fase 2)

> Cada paróquia mantém os **próprios dados** (horários, eventos, contato) num painel simples — e isso
> **alimenta o portal** com o diretório "onde tem missa". É a primeira camada de gestão e o primeiro
> *tenant*. Modelo de domínio em [`../conceito.md §4`](../conceito.md); stack em
> [`../decisoes/stack.md`](../decisoes/stack.md).

---

## Objetivo

Resolver, para o católico comum, o "onde e a que horas tem missa/confissão na minha cidade" — com o
dado vindo da **fonte certa: a própria paróquia**. Introduz autenticação, a entidade `Local` e a
tenancy (isolamento por paróquia) sobre a qual a Fase 3 se apoia.

---

## O que a paróquia mantém

- **Dados e contato:** nome, endereço, cidade, telefone/WhatsApp, redes, pároco (opcional).
- **Horários recorrentes:** missa, confissão e adoração — por dia da semana e horário (ex.: "Missa —
  domingo 8h, 19h; sábado 19h").
- **Exceções:** alterações pontuais em feriados/festas (ex.: "Cinzas — 19h", "sem missa dia 24").
  Evita o maior problema do domínio: horário desatualizado (ver Riscos).
- **Eventos públicos:** data, local, descrição — divulgados no portal (evento do tipo público, ver
  [`../conceito.md §4`](../conceito.md)).

---

## No portal (público)

- Buscar **paróquia por cidade**; ver horários de missa/confissão/adoração e próximos eventos.
- **`atualizado_em`** sempre visível — a pessoa sabe o quão fresco é o dado.
- Botão **"reportar horário errado"** (vai para a paróquia / para você).

---

## Onboarding — "reivindicar" por contato

Sem fluxo automatizado de *claim* no v1. A paróquia entra por **WhatsApp ou e-mail**: você cria o
acesso e a paróquia passa a manter os dados. **Começar só pelas paróquias das quais você já tem
contato** — cresce à mão, com dado confiável, antes de abrir para qualquer um.

---

## Modelo (resumo)

- **`Local` / Paróquia** — entidade de primeira classe (cidade → paróquia; diocese depois).
- **Tenancy por paróquia** — cada paróquia isola seus dados; papel **Admin de paróquia** mantém tudo
  (ver RBAC em [`../conceito.md §5`](../conceito.md)).
- Uma **Comunidade** (Fase 3) liga-se a uma paróquia — é o gancho do efeito de rede.

---

## Critério de pronto (M2)

Uma paróquia real mantém horários e eventos pelo painel, e eles aparecem no portal com `atualizado_em`
e opção de reportar erro.

---

## Riscos

- **Frescor do horário é tudo.** Missa errada é pior que missa ausente. Mitigações no design: exceções
  de horário, `atualizado_em` visível, reportar erro, e curadoria inicial só com paróquias conhecidas.
- **Adoção.** Paróquia raramente mantém coisa digital. Por isso o onboarding é assistido (por contato)
  e o painel, mínimo — só o que a paróquia realmente vai atualizar.
