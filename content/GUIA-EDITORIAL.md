# Guia editorial do blog

Este guia define **como escrever os posts do blog** do Acesso Católico, tanto os
publicados em `../portal/content/blog/` quanto os rascunhos aqui em `content/`.
Ele existe para que qualquer pessoa que escreva um próximo post siga a mesma premissa.

## Duas fontes, uma premissa

Todo post obedece a duas coisas ao mesmo tempo:

1. **A skill `content-writer-ptbr`** governa o estilo do texto (PT-BR natural, voz
   ativa, frases curtas, e as proibições duras listadas mais abaixo). Ela vale
   sempre, sem exceção.
2. **Este guia** define a premissa de **blog institucional**: para que o texto serve,
   com que voz fala e o que ele nunca faz. É a camada que a skill genérica não cobre.

Quando os dois se cruzam, a regra é simples: as **proibições duras da skill valem
sempre**; as convenções de *marketing* da skill (título que promete benefício, CTA
com verbo no imperativo) são adaptadas à realidade de um artigo, conforme descrito aqui.

## O que é um blog institucional aqui

O blog é a **voz pública do Acesso Católico**, não um espaço de opinião pessoal nem
uma página de vendas. Cada post existe para **informar e formar o católico comum**: a
pessoa que busca entender a fé, viver um sacramento ou dar um passo concreto na vida
espiritual.

O post **serve o leitor**. Ele não converte, não vende e não empurra um produto. Não
há CTA comercial no fim do texto. Se um recurso (uma oração, um livro, um santo) ajuda
o leitor, ele aparece a serviço do conteúdo, nunca como isca.

**Fidelidade em primeiro lugar.** O conteúdo é católico e precisa ser fiel à doutrina e
ao Magistério. Na dúvida, o texto é sóbrio e remete às fontes, em vez de arriscar uma
afirmação incerta. Citações bíblicas trazem a referência entre parênteses (livro,
capítulo e versículo).

## Voz e tom

- **Fala com o leitor por "você".** Direto, próximo e respeitoso, como um irmão mais
  velho na fé que explica sem soar superior.
- **Acessível, sem jargão gratuito.** Quando um termo próprio da Igreja é necessário
  (contrição, jaculatória, preceito), explique na primeira vez que aparecer.
- **Acolhedor, nunca moralista.** O texto acolhe a fragilidade e aponta o caminho. Não
  julga o leitor nem usa medo como recurso.
- **Concreto.** Prefere o passo prático à abstração piedosa. O leitor deve terminar
  sabendo o que fazer.

## Proibições duras (da skill `content-writer-ptbr`)

Sem exceção estilística. Repetidas aqui para quem escreve direto no Obsidian:

1. Sem travessão (—) como recurso de ênfase ou suspense. Use ponto, vírgula ou dois pontos.
2. Sem emojis em título, texto ou legenda.
3. Sem "Não é sobre X, é sobre Y".
4. Sem tricolon por hábito (grupos de três só pela cadência).
5. Sem paralelismo em série só para soar poético.
6. Sem "Não apenas... mas também".
7. Sem conectivos de preenchimento: "Além disso", "Vale ressaltar", "Vale lembrar",
   "É importante notar", "Cabe destacar". Comece pela informação.
8. Sem conclusões de fechamento: "Em resumo", "Em suma", "No final das contas".
9. Sem hedging: "talvez", "de certa forma", "meio que". Afirme.

## Estrutura de um post

### Frontmatter (obrigatório)

Os campos são validados pelo schema em `../portal/content.config.ts`. Preencha todos:

```yaml
---
title: Título do post
description: Resumo em uma frase, usado no card e no SEO.
category: Espiritualidade        # categoria editorial
tags:
  - terço
  - oração
date: '2026-09-09'               # ISO YYYY-MM-DD
cover: /img/blog/arquivo.jpg     # capa
coverAlt: Descrição da imagem para acessibilidade
slug: titulo-do-post             # igual ao nome do arquivo
---
```

- **`title`**: claro e concreto. Diz do que trata o post, sem sensacionalismo.
- **`description`**: uma frase que completa o título e diz a quem serve. Não repete o título.
- **`coverAlt`**: descreve a imagem de verdade, para quem usa leitor de tela.

### Corpo

- **Abertura** que nomeia a dor ou a dúvida real do leitor antes de resolvê-la.
- **Subtítulos (`##`)** que dividem o caminho em partes navegáveis.
- **Passos numerados** quando o post é um guia prático.
- **Um parágrafo, uma ideia.** Até três frases por parágrafo.
- **Fecho que serve**, não que resume. Termine com o próximo passo do leitor, sem
  "em resumo" e sem CTA de venda.

## Fluxo das pastas

- `content/pendentes/`: rascunhos, não revisados ou não finalizados.
- `content/prontos/`: revisados, prontos, ainda não publicados.
- `../portal/content/blog/`: publicados. É o que o portal serve.

Ver `README.md` nesta pasta para o controle das pastas.

## Checklist antes de publicar

- [ ] Serve o leitor e forma na fé; não vende nem tem CTA comercial.
- [ ] Fiel à doutrina; citações bíblicas com referência.
- [ ] Nenhuma das nove proibições duras acima.
- [ ] Fala por "você", acolhe sem julgar, explica os termos próprios da Igreja.
- [ ] Frontmatter completo e válido (title, description, category, tags, date, cover, coverAlt, slug).
- [ ] Fecho aponta um próximo passo concreto, sem moral da história.
