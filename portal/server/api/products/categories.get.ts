import { prisma, type Prisma } from '@acesso/db'

/**
 * GET /api/products/categories — categorias disponíveis na lojinha (Fase 1).
 *
 * Agrupa os produtos ativos pela `category` (string livre) e devolve, para cada
 * categoria, o seu nome e a contagem de produtos ativos. Alimenta os chips de
 * filtragem da interface — o `name` é usado tanto como rótulo quanto como valor
 * do parâmetro `?categoria=` de `GET /api/products`.
 *
 * Query string (opcional):
 *   - `fonte`: "organizacional" agrupa produtos com `showOrg`; qualquer outro
 *     valor (ou ausência) agrupa a loja pública (`showPublic`). Assim os chips
 *     de filtro batem com os produtos exibidos em cada loja.
 *
 * Ordena por contagem decrescente e, em empate, pelo nome (A→Z) para uma listagem
 * estável dos chips.
 */

export type ProductCategory = {
  name: string
  count: number
}

export default defineEventHandler(async (event): Promise<{ data: ProductCategory[] }> => {
  const query = getQuery(event)
  const fonte = typeof query.fonte === 'string' ? query.fonte.trim() : ''

  const where: Prisma.ProductWhereInput = { active: true }
  if (fonte === 'organizacional') {
    where.showOrg = true
  }
  else {
    where.showPublic = true
  }

  try {
    const grouped = await prisma.product.groupBy({
      by: ['category'],
      where,
      _count: { _all: true },
      orderBy: [
        { _count: { category: 'desc' } },
        { category: 'asc' },
      ],
    })

    const categories: ProductCategory[] = grouped.map((group) => ({
      name: group.category,
      count: group._count._all,
    }))

    return { data: categories }
  } catch (error) {
    // Falha de banco (indisponível, credenciais ausentes, etc.): registra a causa
    // real no servidor e devolve um fallback gracioso, sem vazar internals ao cliente.
    console.error('[GET /api/products/categories] falha ao consultar categorias:', error)
    return { data: [] }
  }
})
