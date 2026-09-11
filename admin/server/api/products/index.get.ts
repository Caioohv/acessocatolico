import type { Prisma } from '@acesso/db'

/**
 * GET /api/products — admin product listing.
 *
 * Unlike the public portal endpoint, this returns ALL products including
 * inactive ones, so the admin can review and re-activate them.
 *
 * Protected by session (requireUserSession throws 401 if unauthenticated).
 *
 * Query string (all optional):
 *   - `categoria`: filter by exact category.
 *   - `busca`: free-text search in title or description (case-insensitive).
 *   - `ativo`: "true" | "false" to filter by active state; omit for all.
 */

const adminProductSelect = {
  id: true,
  title: true,
  description: true,
  priceRef: true,
  category: true,
  affiliateUrl: true,
  imageUrl: true,
  active: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ProductSelect

export type AdminProduct = Prisma.ProductGetPayload<{
  select: typeof adminProductSelect
}>

export default defineEventHandler(async (event): Promise<{ data: AdminProduct[] }> => {
  await requireUserSession(event)

  const query = getQuery(event)

  const categoria = typeof query.categoria === 'string' ? query.categoria.trim() : ''
  const busca = typeof query.busca === 'string' ? query.busca.trim() : ''
  const ativo = typeof query.ativo === 'string' ? query.ativo.trim() : ''

  const where: Prisma.ProductWhereInput = {}

  if (ativo === 'true') {
    where.active = true
  }
  else if (ativo === 'false') {
    where.active = false
  }
  // otherwise: no active filter — return all

  if (categoria) {
    where.category = categoria
  }

  if (busca) {
    where.OR = [
      { title: { contains: busca, mode: 'insensitive' } },
      { description: { contains: busca, mode: 'insensitive' } },
    ]
  }

  try {
    const products = await prisma.product.findMany({
      where,
      select: adminProductSelect,
      orderBy: { createdAt: 'desc' },
    })

    return { data: products }
  }
  catch (error) {
    console.error('[admin GET /api/products] failed to list products:', error)
    throw createError({
      statusCode: 500,
      data: {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Algo deu errado ao consultar os produtos. Tente novamente.',
        },
      },
    })
  }
})
