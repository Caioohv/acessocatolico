# Imagens do blog — padrão e prompt de IA

Guia único para gerar as capas (`cover`) dos posts do blog com IA. Serve como **skill
da ferramenta de imagem**: cole o *prompt-base* abaixo trocando `{{TEMA}}`, e siga as
regras de estilo e iconografia. Deriva de `design-system/tokens/` — é a fonte de verdade
para o visual das capas, do mesmo jeito que os tokens são para a UI.

- **Onde as imagens entram:** frontmatter do post → `cover: /img/blog/<slug>.jpg` +
  `coverAlt: <descrição>`. Arquivos em `portal/public/img/blog/` (ou `/img/blog/`).
- **O texto do título NÃO vai na imagem** — ele é sobreposto pelo site. Gere arte limpa,
  com respiro para o título.

---

## 1. Decisão de estilo

**Ilustração editorial quente e texturizada, simbólica — não foto, não vetor flat, não cartoon.**

Por quê:
- **Segurança do conteúdo:** foto-realismo de figuras sagradas (Jesus, Maria, santos) sai
  com iconografia errada e ar irreverente. Ilustração lê como *interpretação*, não como
  *documento* — mais reverente e mais seguro.
- **Coerência de marca:** conversa com a Spectral serifada, o papel quente e a paleta
  litúrgica. Tom "católico moderno e convidativo", nunca kitsch nem santinho.
- **Consistência:** um estilo ilustrado fechado é mais fácil de manter uniforme entre
  dezenas de posts do que fotos avulsas.

O estilo: traço e pintura com textura (gouache/risograph suave, grão de papel), luz
contemplativa (vela, hora dourada, luz de vitral), composição serena com bastante respiro.

---

## 2. Iconografia — o que sim, o que não

**Prefira símbolo e metáfora, não a cena literal.**

**Use:** velas e chama, livro/Bíblia aberto, luz atravessando vitral ou janela, portas e
arcos, caminhos e degraus, mãos (abertas, unidas, oferecendo), pão e vinho, silhueta de
igreja, terço, água, pão, sementes/trigo, natureza (luz, campo, amanhecer), objetos
litúrgicos vistos de longe.

**Evite:**
- Rosto de Jesus, Maria ou santos em close / retrato realista. Se precisar de presença
  humana, use figuras **de costas, à distância ou parciais** (mãos, silhueta) — nunca o
  rosto de uma figura sagrada.
- Kitsch: santinho brilhante, glow exagerado, coração sangrando hiper-real, arco-íris.
- Denominacional específico que possa estar errado (paramentos, gestos litúrgicos
  detalhados) — mantenha simbólico e genérico.
- Texto, letras, watermark, logo dentro da arte.
- Cara de banco de imagens / clip-art / vetor corporativo flat.

Quando o tema for sensível (sofrimento, confissão, morte), resolva com **luz e espaço**,
nunca com dramatização gráfica.

---

## 3. Paleta (dos tokens → linguagem visual)

Não peça "roxo e amarelo" genéricos. Ancore nestes (hex são aproximações dos `oklch` de
`tokens/colors.css`):

| Papel na cena | Token | Aprox. | Uso na imagem |
|---|---|---|---|
| Marca / dominante | `--violet-700` | `#6B4C9A` | sombras, céu, tecido, penumbra |
| Profundidade | `--violet-900` | `#4C3A6E` | cantos, contraste, noite |
| Calor / luz (acento) | `--amber-500` | `#EDBE6A` | chama, luz dourada, brilho quente |
| Calor forte | `--amber-600` | `#DFA84E` | realces de vela, hora dourada |
| Fundo / respiro | `--paper-50` | `#FBF9F4` | papel quente, névoa, espaço vazio |
| Tinta / traço | `--ink-900` | `#38322B` | contornos, texto do site por cima |
| Esperança (pontual) | `--green-600` | `#5C9A6D` | folha, broto — só como toque |

Regra: **violeta litúrgico + âmbar de vela sobre papel quente**; verde só como acento raro.
Baixa saturação, nada néon. A luz é sempre quente e vinda de uma fonte (não plana).

---

## 4. Composição e formato

- **Um sujeito/metáfora claro**, centrado ou em terço, com **muito respiro** (o título
  entra por cima — deixe uma zona calma, geralmente à esquerda ou embaixo).
- Luz direcional e contemplativa; profundidade por camadas, não por detalhe barroco.
- **Formato:** `16:9` (1600×900) para a capa. Gere também/recorte `1200×630` para
  Open Graph quando o post for de destaque.
- Entrega: JPG otimizado, arquivo = `slug` do post. Sempre preencher `coverAlt` descrevendo
  a cena (acessibilidade + SEO).

---

## 5. Prompt-base reutilizável

> Cole no gerador de imagem, trocando `{{TEMA}}` por uma metáfora visual do post (ex.:
> "uma vela solitária acesa numa igreja vazia ao amanhecer"). Mantido em inglês por
> desempenho dos modelos; os termos de estilo abaixo são fixos.

```
Warm editorial illustration for a Catholic blog cover.
Subject: {{TEMA}}.
Style: hand-painted gouache with subtle grain and paper texture, soft ink linework,
contemplative and reverent mood, modern and inviting — not kitsch, not a holy card,
not flat corporate vector, not a cartoon, not a photograph.
Palette: liturgical violet (#6B4C9A) and deep violet (#4C3A6E) as the dominant tones,
warm candle amber (#EDBE6A / #DFA84E) for light and glow, warm paper cream (#FBF9F4) for
background and negative space; low saturation, warm directional light from a single source.
Composition: single clear symbolic subject, generous negative space with a calm area for a
title overlay, layered depth, gentle golden or stained-glass light.
Symbolic, not literal: no faces of Jesus, Mary or saints; if a person appears, show them
from behind, distant, or only hands/silhouette. No text, no letters, no watermark, no logo.
Aspect ratio 16:9.
```

**Negative prompt** (se a ferramenta aceitar):
```
text, letters, watermark, logo, signature, photorealistic, photograph, 3D render,
neon colors, oversaturated, glowing halos, kitsch holy card, cartoon, chibi, clip art,
flat corporate vector, deformed hands, extra fingers, distorted faces, close-up face of a
saint, bloody sacred heart, denominational vestment detail
```

---

## 6. Exemplos por categoria

| Categoria | `{{TEMA}}` sugerido |
|---|---|
| **Espiritualidade** | *a single lit candle in an empty church at dawn, light through a tall window* |
| **Formação** | *an open book on a wooden table beside a warm oil lamp, soft light* |
| **Guias** | *a stone path with steps leading through an arch toward warm light* |
| **Vida paroquial** | *distant silhouette of a small church at golden hour, people arriving from behind* |

Para o post *"Quando a vida dos outros parece mais fácil"*: `{{TEMA}}` =
*"two diverging paths under a warm sky, one figure walking alone seen from behind"*.

---

## 7. Checklist de aceite

- [ ] Estilo ilustrado texturizado — não parece foto nem vetor flat nem cartoon.
- [ ] Domina violeta litúrgico + âmbar de vela sobre papel quente; sem néon.
- [ ] Sem rosto de figura sagrada; presença humana só de costas/silhueta/mãos.
- [ ] Sem texto, letra ou watermark na arte; há zona calma para o título.
- [ ] Metáfora clara e reverente, coerente com o tema do post.
- [ ] Formato 16:9, arquivo nomeado pelo `slug`, `coverAlt` preenchido.
