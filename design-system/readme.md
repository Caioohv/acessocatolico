# Acesso Católico — Design System

Fundações de marca para o **Acesso Católico** (`acessocatolico.com.br`): um portal público católico
(missas, eventos, comunidades e conteúdo por região) sustentado por uma plataforma de gestão para
paróquias, comunidades e seus encontros (EJC, EAC, ECC, ENVIA-ME, Éfeta…).
Princípio de produto: **a gestão produz o dado; o portal o expõe.**

Este projeto define **cores, tipografia, brand tokens, logo e tom de voz** — as fundações. Ainda
**não** cobre UI kits nem componentes de tela (fora de escopo por ora).

**Fonte:** documentação de produto resumida pelo usuário (públicos, fases, superfícies, conceitos de
domínio). Nenhum logo, paleta ou fonte pré-existente foi fornecido — as escolhas abaixo são propostas
originais a partir do briefing, prontas para iteração.

---

## Direção visual

**“Católica, mas moderna e convidativa.”** Não datada, não institucional pesada. O sistema equilibra:

- **Tradição** — uma serifa editorial (Spectral) e o violeta litúrgico dão profundidade e fé.
- **Modernidade & acolhimento** — neutros quentes de papel, cantos suaves, muito respiro, uma sans
  humanista amigável (Figtree).
- **Confiança & generosidade** — o âmbar de vela como calor; o **frescor do dado** (`atualizado_em`,
  “reportar erro”) tratado como elemento de identidade, não detalhe. Monetização discreta e transparente.

---

## VISUAL FOUNDATIONS

### Cores
Paleta em `oklch` (harmônica e fácil de estender). Use **sempre os aliases semânticos** no produto.

- **Violeta litúrgico — primária/marca** (`--brand`, violet-700). Roxo do Advento/Quaresma: espiritual e
  sério sem ser antiquado. Botões primários, links, cabeçalhos de marca, superfícies de destaque.
- **Âmbar de vela — acento** (`--accent`, amber-500). Calor, luz, generosidade. Destaques, chamadas de
  apoio à comunidade, realces — **nunca** como cor de texto pequeno (é claro; use tinta escura por cima).
- **Verde esperança** (`--green-600`). Comunidade, confirmação e **dado fresco**.
- **Neutros quentes** — papel (`--paper-50`) e tinta (`--ink-900…400`) com um leve tom quente
  (hue ≈ 75–85). Nunca cinza-azulado frio. Fundo de página é papel quente; cards são branco puro.
- **Semânticos** — sucesso (verde), atenção (âmbar), erro (vermelho quente), info (azul calmo).

Máximo de 1–2 cores de fundo por tela. Violeta e âmbar aparecem em pequenas doses sobre papel/branco;
grandes áreas violeta apenas em faixas de marca (hero, rodapé, cabeçalho de painel).

**Contraste:** texto normal ≥ 4.5:1; títulos grandes ≥ 3:1. Texto sobre violeta usa `--text-on-brand`
(papel); sobre âmbar usa `--text-on-accent` (tinta escura). Nunca texto âmbar sobre branco.

### Tipografia
- **Spectral** (serifa) — `--font-display`. Títulos, heros, citações litúrgicas, momentos editoriais do
  blog. Pesos 400/500/600(+700); use `--tracking-tight` nos tamanhos grandes.
- **Figtree** (sans humanista) — `--font-sans`. Toda a UI, botões, formulários, leitura corrida densa.
- **JetBrains Mono** — `--font-mono`. Meta-dados técnicos: `atualizado_em`, IDs de inscrição, chave Pix,
  códigos. Reforça o sinal de “dado confiável e fresco”.

Escala de `--text-display` (56) a `--text-xs` (12); ver card **Escala tipográfica**. Corpo em
`--leading-normal` (1.55); blog em `--leading-relaxed` (1.7). Rótulos em caixa alta usam `--tracking-wide`.

> Substituição sinalizada: as três famílias vêm do **Google Fonts** (nenhuma fonte foi fornecida). Se
> houver preferência de marca por outras famílias, troque em `tokens/fonts.css` + `tokens/typography.css`.

### Espaçamento & layout
Base de **4px** (`--space-1`…`--space-24`). Larguras: portal `1120px`, painel `1360px`, formulários/
leitura `640px`, prosa de blog `68ch`. **Mobile-first**: componha do celular para cima.

### Forma, sombra e movimento
- **Raios** — sm 6 (chips/inputs), md 10 (botões), **lg 14 (cards)**, xl 20 (painéis/modais/imagens),
  pill para tags e selos. Suave, nunca “bolha” totalmente arredondada.
- **Cards** — branco, borda `--border` de 1px **ou** `--shadow-sm`; raio lg; sem borda colorida à
  esquerda (evitar esse clichê).
- **Sombras** — quentes e discretas (tinta marrom, baixa opacidade): `sm` (repouso), `md` (elevado/
  hover), `lg` (modal/menu). Nunca sombras duras ou azuladas.
- **Bordas** — 1px `--border`; `--border-strong` para divisões importantes.
- **Movimento** — sereno. `--ease-standard`, durações 120/200/320ms. Fades e leves deslizes; **sem**
  bounces ou animações chamativas. Foco visível com `--shadow-focus` (anel violeta).
- **Hover** — primária escurece para `--brand-hover`; superfícies ganham `--shadow-md`. **Press** —
  leve escurecimento, sem encolher demais.
- **Transparência/blur** — usar com parcimônia (overlays de modal, cabeçalho fixo translúcido). Não é
  motivo visual dominante. Sem gradientes chamativos; no máximo faixas sólidas de marca.

### Elemento-assinatura: frescor do dado
`atualizado_em` em mono + um ponto colorido (`--fresh`/`--stale`/`--old`) e “reportar erro” sempre
visíveis onde há dado sensível ao tempo (horários de missa, eventos). É identidade, não enfeite.

---

## CONTENT FUNDAMENTALS (tom de voz)
- **Acolhedor e próximo**, tratando o leitor por “você”. Convida, não impõe.
- **Generoso, nunca comercial** — reforça “gratuito e feito para a comunidade”. Sem urgência de venda.
- **Transparente** — sobre afiliados: *“Comprando por aqui você ajuda a manter o Acesso Católico gratuito 🙏”*
  (único uso aprovado de emoji: as mãos em oração 🙏, e com moderação).
- **Claro antes de litúrgico** — explica o jargão (EJC, escalação, encontrista→membro→servo) quando aparece.
- **Casing** — títulos em Sentence case; rótulos de UI curtos; sem CAPS gritado (exceto micro-rótulos com tracking).
- Exemplos: “Encontre a missa mais perto de você.” · “Viu algo errado? Nos ajude a corrigir.”

---

## ICONOGRAPHY
Nenhum conjunto de ícones foi fornecido. **Recomendação:** [**Lucide**](https://lucide.dev) via CDN —
traço aberto e amigável (peso ~1.75–2px), coerente com Figtree e com o tom convidativo. Alternativa de
mesmo espírito: Phosphor (regular). Usar SVG com `currentColor`, tamanho base 20–24px, `stroke-width` 2.

- **Emoji** — apenas 🙏 na nota de transparência de afiliados; em nenhum outro lugar.
- **Selos de dado** usam um ponto colorido (não ícone); “reportar erro” pode usar ⚑/ícone `flag`.
- Mapeamento de categorias (a definir por ícone Lucide): Blog — Estudos, Guias, Orações, Comunidades,
  Eventos · Lojinha — Terços, Vestuário, Garrafas, Livros/Bíblias, Medalhas/Imagens, Acessórios de Retiro.

> Substituição sinalizada: Lucide é sugestão. Se houver preferência, ajuste antes de espalhar pelo produto.

---

## Índice / manifesto
- **`styles.css`** — ponto de entrada; só `@import`s. Consumidores linkam este arquivo.
- **`tokens/`** — `fonts.css` (Google Fonts), `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- **`assets/logo-mark.svg`** — a marca (cruz âmbar sobre ladrilho violeta). Wordmark = “Acesso” em tinta
  + “Católico” em violeta, Spectral 600. Ver card **Logo — assinatura**.
- **`cards/`** — especímens que populam a aba Design System (grupos: Marca, Cores, Tipografia, Espaço & Forma).
- **`SKILL.md`** — torna este sistema utilizável como skill (ex.: Claude Code).

### Como usar
Linke `styles.css` e use os aliases: `color: var(--text-body)`, `background: var(--brand)`,
`font-family: var(--font-display)`, `border-radius: var(--radius-lg)`, etc.

---

## Próximos passos (fora do escopo atual)
Quando quiser evoluir: componentes reutilizáveis (Botão, Input, Card, Badge, Selo-de-dado, Chip de
categoria) e UI kits (Portal público, Painel de gestão). Peça e eu monto sobre estas fundações.
