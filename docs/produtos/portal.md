# Portal Público — `acessocatolico.com.br` (Fase 1)

> Presença pública imediata: capta audiência, gera receita de afiliados e constrói a marca antes de
> qualquer sistema de gestão. É só consumo — **sem login, sem multi-tenancy**. Depois, é alimentado
> pelas paróquias (Fase 2) e comunidades (Fase 3). Stack em [`../decisoes/stack.md`](../decisoes/stack.md).

---

## Páginas

### Home
- Proposta de valor do Acesso Católico.
- Atalhos para Blog, Lojinha e (à medida que existirem) Paróquias e Comunidades.
- Identidade visual católica, mas moderna e convidativa.

### Blog
- Posts por **categorias** (ex.: Estudos, Guias, Orações, Comunidades, Eventos).
- Cada post: título, capa, categoria, tags, data, slug amigável e corpo em markdown.
- **Filtragem e busca:** filtro por categoria/tag e busca em título/frontmatter resolvidos nativamente
  pelo Nuxt Content; busca no corpo via **Fuse.js** (client-side) no v1, migrando para **Meilisearch**
  se o volume crescer.
- **SEO desde o início** (meta tags, Open Graph, slug amigável) — é o motor de tráfego orgânico.

### Lojinha
- Indicações de produtos católicos (afiliados — Shopee, Amazon…). Sem carrinho: tudo redireciona ao parceiro.
- Cada produto: foto, nome, descrição curta, preço de referência, **categoria** e **link de afiliado**.
- Curadoria manual, por **categorias**: Terços e Rosários · Vestuário · Garrafas e Acessórios · Livros e
  Bíblias · Medalhas e Imagens · Acessórios de Retiro.
- Nota de transparência: *"Comprando por aqui você ajuda a manter o Acesso Católico gratuito."*

### Paróquias / Comunidades *(aparecem depois)*
- Itens de nav que só surgem quando as Fases 2/3 começam a popular o portal. Até lá, *coming soon* ou
  lista de espera por e-mail.

---

## Critério de pronto (M1)

- Portal no ar no domínio definitivo.
- ≥1 post publicado no blog.
- ≥1 produto na lojinha com link de afiliado funcionando.
- SEO básico e analytics ativos.

---

## Monetização

Afiliados são a única fonte de receita desta fase — sem assinatura, sem taxa. Estratégia geral em
[`../conceito.md §6`](../conceito.md).

---

## Ideia: módulo de Calendário Litúrgico *(evergreen, não comprometido)*

O calendário da Igreja é **calculável** (datas móveis derivam da Páscoa), então rende conteúdo de
**zero manutenção**. Biblioteca: [`romcal`](https://github.com/romcal/romcal) (JS/TS, calendários
nacionais, tempos, cores, solenidades). Possibilidades, do mais barato ao mais rico:

1. **Widget "Hoje na Igreja"** na home: tempo litúrgico, cor do dia, santo/solenidade. Auto-gerado.
2. **SEO evergreen** no blog: páginas por festa ("quando é a Páscoa de 2027", "o que é o Advento").
3. **Camada sobre os horários** (Fase 2): sinalizar solenidades para missas especiais.

**Cuidado:** o texto das **leituras diárias** (lecionário/CNBB) é protegido — calcular calendário e
santos é livre; para leituras, **linkar** à fonte oficial, não copiar.
