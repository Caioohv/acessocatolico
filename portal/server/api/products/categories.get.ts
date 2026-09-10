import { prisma } from '../../utils/prisma'

/**
 * GET /api/products/categories — categorias disponíveis na lojinha (Fase 1).
 *
 * Agrupa os produtos ativos pela `category` (string livre) e devolve, para cada
 * categoria, o seu nome e a contagem de produtos ativos. Alimenta os chips de
 * filtragem da interface — o `name` é usado tanto como rótulo quanto como valor
 * do parâmetro `?categoria=` de `GET /api/products`.
 *
 * Ordena por contagem decrescente e, em empate, pelo nome (A→Z) para uma listagem
 * estável dos chips.
 *
 * Resiliência: se o banco estiver inacessível, registra o erro no servidor e
 * responde com lista vazia (200) em vez de vazar detalhes internos ou derrubar a
 * página. A skill `api-responses` orienta o envelope e a não-exposição de internals.
 */

export type ProductCategory = {
  name: string
  count: number
}

export default defineEventHandler(async (): Promise<{ data: ProductCategory[] }> => {
  try {
    const grouped = await prisma.product.groupBy({
      by: ['category'],
      where: { active: true },
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
