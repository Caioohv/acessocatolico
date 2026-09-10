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
- **Enquetes**: para grupos e comunidade.
- **Confirmação de ida (RSVP)**: antes do evento, a pessoa marca se vai ou não — headcount pra planejar lanche, material, transporte (ver seção abaixo).
- **Lista de presença**: no local, criador exibe um QR code; a pessoa escaneia e confirma presença logada — vira histórico da pessoa (ver seção abaixo).
- **Novos tipos de evento**: reunião recorrente e evento público de comunidade.

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

## Presença e confirmação de ida

São **dois registros diferentes**, que hoje vivem no caderno ou no grupo de WhatsApp:

| | **Confirmação de ida (RSVP)** | **Presença** |
|---|---|---|
| Pergunta | "Vou ou não vou?" | "Fui." |
| Quando | Antes do evento | No local, na hora |
| Para quê | Estimar quantos vão → planejar lanche, material, transporte | Registrar quem esteve → **histórico da pessoa** |
| Como | Pessoa marca sim/não/talvez na página do evento | Escaneia o QR code do criador e confirma logada |
| Valor | Intenção (pode mudar) | Fato (não se apaga) |

### Confirmação de ida (RSVP)

Antes do evento, a pessoa marca **se vai ou não** (sim / não / talvez). O painel mostra o **headcount**
pra quem organiza planejar — quantos lanches comprar, material, transporte. É intenção, não conta como
presença.

### Lista de presença

Substitui o **caderno de presença**. Feita **no local**: quem criou a lista **exibe um QR code**; as
pessoas o escaneiam e **confirmam presença logadas no site**. Cada confirmação registra **quem** e
**quando**, e — o ponto central — vira **registro por pessoa**: o perfil mostra de quais reuniões/eventos
ela participou (ex.: "participou de X, Y e Z nos últimos 3 meses"). Alimenta o **histórico de
participações** dos perfis-currículo, em vez de listas de papel que se perdem entre um mês e outro.

**Fluxo**
1. Criador (admin ou membro com permissão) abre uma lista de presença (ligada a uma reunião/evento ou avulsa).
2. O sistema gera um QR code que o criador mostra na tela/projeção.
3. A pessoa escaneia, faz login (se ainda não estiver) e confirma a presença.
4. O painel mostra em tempo real quem já confirmou; a presença entra no histórico da pessoa.

**Em aberto — evitar compartilhamento do link.** O risco é alguém repassar o QR/link e confirmar
presença sem estar no local. Estratégias a estudar (nenhuma decidida ainda): token que **expira** em
curto intervalo e **rotaciona** (QR que muda a cada X segundos), **janela de confirmação** aberta só
enquanto o criador quiser, **cerca por geolocalização** (confirmar só perto do local), **PIN/código**
exibido junto do QR, ou **limite/aprovação** pelo criador. Anotar como ponto a decidir antes de
implementar.

- Toda comunidade liga-se a uma **paróquia** (Fase 2) — a página da paróquia lista suas comunidades e a
  da comunidade aponta para a paróquia. É o **efeito de rede**.
- Comunidades e eventos passam a aparecer na **descoberta por região** no portal.

---

## Monetização

Gratuito. Sustentado pelos afiliados da lojinha ([`portal.md`](portal.md)) e pelas sugestões de compra
no Mercadinho. Ver [`../conceito.md §6`](../conceito.md).
