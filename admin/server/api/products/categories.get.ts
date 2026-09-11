/**
 * GET /api/products/categories — categorias já cadastradas (admin).
 *
 * Diferente do portal, agrupa TODOS os produtos (ativos e inativos) para que o
 * cadastro/edição de produto ofereça, num autocomplete, todas as categorias que
 * já existem — evitando duplicações por variação de grafia (ex.: "Terços" vs
 * "terços"). O admin ainda pode digitar uma categoria nova livremente.
 *
 * Protegido por sessão (requireUserSession lança 401 se não autenticado).
 * Ordena por contagem decrescente e, em empate, pelo nome (A→Z).
 */

export type AdminProductCategory = {
  name: string
  count: number
}

export default defineEventHandler(async (event): Promise<{ data: AdminProductCategory[] }> => {
  await requireUserSession(event)

  try {
    const grouped = await prisma.product.groupBy({
      by: ['category'],
      _count: { _all: true },
      orderBy: [
        { _count: { category: 'desc' } },
        { category: 'asc' },
      ],
    })

    const categories: AdminProductCategory[] = grouped
      .map((group) => ({ name: group.category, count: group._count._all }))
      .filter((category) => category.name.trim().length > 0)

    return { data: categories }
  }
  catch (error) {
    console.error('[admin GET /api/products/categories] failed to list categories:', error)
    throw createError({
      statusCode: 500,
      data: {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Algo deu errado ao consultar as categorias. Tente novamente.',
        },
      },
    })
  }
})
