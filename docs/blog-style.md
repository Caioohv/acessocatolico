# Estilo e Arquitetura do Blog — Formato Trilha / Plataforma de Formação (`blog-style.md`)

> **Status:** Proposta conceitual / Documento de viabilidade (não implementado).  
> **Objetivo:** Documentar a viabilidade, estrutura de UX e arquitetura técnica para transformar a página inicial do Blog (`/blog`) em uma experiência similar a plataformas de cursos/streaming (Netflix / LMS), com trilhas sequenciais de formação e carrosséis horizontais por categoria.

---

## 1. Visão Geral e Proposta de Valor

Em vez de um feed tradicional cronológico (comum a blogs jornalísticos), o blog do **Acesso Católico** assume a identidade de uma **Central de Formação Católica**.

### Por que esse modelo faz sentido para o público católico?
- **Aprendizado progressivo:** O católico que busca formação muitas vezes quer saber *"por onde começar"* (vida de oração, confissão, virtudes, doutrina básica). Trilhas estruturadas reduzem a dispersão.
- **Conteúdo evergreen:** Textos doutrinários e espirituais não "envelhecem" como notícias diárias; agrupá-los por temática e relevância valoriza o acervo ao longo dos anos.
- **Engajamento e retenção:** A interface visualmente organizada em trilhos/carrosséis estimula o consumo de múltiplos conteúdos em sequência.

---

## 2. Estrutura da Página (`/blog`)

A página inicial do blog é composta pelas seguintes seções:

```
+-------------------------------------------------------------+
| 1. Hero / Destaque Principal                                |
|    (Artigo em foco ou Trilha do Tempo Litúrgico atual)      |
+-------------------------------------------------------------+
| 2. Trilhas de Formação (Séries com ordem pedagógica)        |
|    [ Passo 1 ]  [ Passo 2 ]  [ Passo 3 ]  [ Passo 4 ]  -->   |
+-------------------------------------------------------------+
| 3. Carrosséis por Categoria Temática                        |
|    * Espiritualidade e Vida de Oração                 [Ver +]|
|      [ Card 1 ]  [ Card 2 ]  [ Card 3 ]  [ Card 4 ]   -->   |
|                                                             |
|    * Doutrina e Teologia                              [Ver +]|
|      [ Card 1 ]  [ Card 2 ]  [ Card 3 ]  [ Card 4 ]   -->   |
|                                                             |
|    * Liturgia e Sacramentos                           [Ver +]|
|      [ Card 1 ]  [ Card 2 ]  [ Card 3 ]  [ Card 4 ]   -->   |
+-------------------------------------------------------------+
| 4. Busca Global e Acesso a Todos os Artigos                 |
+-------------------------------------------------------------+
```

### Detalhamento das Seções:
1. **Hero de Destaque:** Exibe a formação prioritária (ex.: *"Guia Completo da Quaresma"* ou *"Como Iniciar a Oração Mental"*), com imagem de capa ampla, tempo de leitura e CTA direto.
2. **Trilhas de Formação:** Cards com identificação de etapa (ex.: *"Etapa 01/05"*, barra de progresso visual opcional) que orientam o leitor do início ao fim de um assunto.
3. **Carrosséis Horizontais por Categoria:** Linhas deslizáveis (touch/swipe no mobile e setas no desktop). Cada linha possui cabeçalho com título da categoria e link *"Ver todos (X) →"* levando para a listagem completa.
4. **Recursos de conveniência (Client-side / LocalStorage):**
   - Possibilidade de marcar artigos como "Lido" ou linha "Continuar lendo", sem necessidade de autenticação/login.

---

## 3. Viabilidade e Arquitetura Técnica

A viabilidade técnica no ecossistema atual do projeto ([Nuxt 4](file:///home/viier/projects/agencia/projetos/acessocatolico/portal/nuxt.config.ts) + [Nuxt Content v3](file:///home/viier/projects/agencia/projetos/acessocatolico/portal/content.config.ts) + Vue 3) é **100% positiva e sem atritos**.

### 3.1. Consultas no Nuxt Content v3
As coleções em SQLite/Markdown do Nuxt Content são executadas em tempo de build/SSR com altíssima performance:

```ts
// Exemplo de consulta agrupada ou paralela
const [featured, tracks, categories] = await Promise.all([
  queryCollection('blog').where('featured', '=', true).first(),
  queryCollection('blog').where('track', 'IS NOT NULL').order('trackOrder', 'ASC').all(),
  queryCollection('blog').order('date', 'DESC').all()
])
```

### 3.2. Carrossel Leve (Zero dependências externas)
Não há necessidade de instalar bibliotecas pesadas de carrossel (como Swiper ou Keen-slider), que podem gerar overhead de hidratação ou Cumulative Layout Shift (CLS).

Utiliza-se **CSS Moderno nativo**:
- `overflow-x: auto`
- `scroll-snap-type: x mandatory`
- `scroll-behavior: smooth`
- `scrollbar-width: none` (para esconder scrollbar mantendo acessibilidade)
- Botões de navegação lateral simples via JavaScript nativo (`element.scrollBy({ left: +/- offset, behavior: 'smooth' })`).

### 3.3. Atomic Design & Componentes Sugeridos
Na estrutura atual do `portal/app/components`:

- **Átomos:**
  - `TrackBadge.vue`: Indicador numérico de etapa (ex.: *"Parte 2"*).
- **Moléculas:**
  - `PostCard.vue`: Adaptação/extensão do card atual para suportar modo carrossel (largura fixa / flex-shrink-0).
  - `CarouselControls.vue`: Botões de seta anterior/próximo acessíveis via teclado/leitor de tela.
- **Organismos:**
  - `ContentRail.vue` ou `PostCarousel.vue`: Envolve a lista de cards, gerencia os controles de scroll e drag/touch.
  - `TrackRail.vue`: Variante estilizada para trilhas sequenciais com linha conectora.
- **Seções:**
  - `BlogHeroSection.vue`
  - `BlogTrackSection.vue`
  - `BlogCategoryCarouselSection.vue`

---

## 4. Modelagem de Conteúdo (Frontmatter)

Para suportar trilhas e destaques, os metadados dos posts em Markdown (`portal/content/blog/*.md`) receberão campos opcionais:

```yaml
---
title: "O que é a Oração Vocal e como praticá-la"
description: "Primeiros passos para quem deseja rezar com devoção e disciplina."
date: 2026-03-10
category: "Espiritualidade"
tags: ["oração", "vida-interior", "iniciantes"]
image: "/images/blog/oracao-vocal.webp"
featured: false

# Metadados para Trilhas de Formação:
track:
  id: "iniciando-na-oracao"
  name: "Iniciando na Vida de Oração"
  order: 1
  totalSteps: 4
---
```

---

## 5. SEO e Performance

- **Preservação de Crawling:** Mesmo em layout de carrossel horizontal, todos os cards e links para os posts (`<NuxtLink :to="...">`) permanecem no HTML renderizado pelo SSR do Nuxt. O Googlebot e outros motores de busca indexam normalmente.
- **Páginas de Arquivo:** Manter páginas canônicas em `/blog/categoria/[slug]` com paginação/listagem vertical completa, garantindo arquitetura de informação limpa e links internos sólidos.
- **Core Web Vitals:** Larguras e alturas de imagens dos cards pré-definidas para evitar layout shifts durante a rolagem horizontal.

---

## 6. Pré-requisitos Editoriais para Implementação

Antes de virar a chave da interface para carrosséis:
1. **Volume Mínimo de Artigos:** Carrosséis horizontais transmitem abundância quando têm entre **4 e 8 artigos por categoria**. Com apenas 1 ou 2 artigos, a linha pode parecer vazia.
2. **Definição das Trilhas Iniciais:** Planejar ao menos 1 ou 2 trilhas completas (ex.: 3 a 5 artigos sequenciais cada) para que o leitor experimente o fluxo contínuo desde o lançamento.
