/**
 * GET /api/metrics/products — ranking of products by click count.
 *
 * Protected by session (requireUserSession throws 401 if unauthenticated).
 *
 * Query string (all optional):
 *   - `period`: integer number of days to look back (default 30, max 365).
 *
 * Response shape:
 * {
 *   data: {
 *     period: number,   // effective period in days
 *     from: string,     // ISO date (YYYY-MM-DD) at start of window
 *     products: {
 *       id: string,
 *       title: string,
 *       clicks: number,
 *     }[],             // ordered by clicks desc
 *   }
 * }
 *
 * Algorithm:
 *   1. Group analytics_events WHERE type='product_click' by targetId to get
 *      click counts (using Prisma groupBy).
 *   2. Fetch the matching Product rows in a single IN query to resolve titles.
 *   3. Merge results; products missing from the DB (deleted) keep their id but
 *      show title as null.
 *   4. Sort by clicks desc.
 */

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const query = getQuery(event)
  const rawPeriod = typeof query.period === 'string' ? parseInt(query.period, 10) : NaN
  const periodDays = Number.isFinite(rawPeriod) && rawPeriod > 0 ? Math.min(rawPeriod, 365) : 30

  const from = new Date()
  from.setDate(from.getDate() - periodDays)
  from.setHours(0, 0, 0, 0)

  try {
    // ── 1. Aggregate click counts by product id ────────────────────────────────
    const clickGroups = await prisma.analyticsEvent.groupBy({
      by: ['targetId'],
      where: {
        type: 'product_click',
        targetId: { not: null },
        createdAt: { gte: from },
      },
      _count: { _all: true },
      orderBy: { _count: { targetId: 'desc' } },
    })

    if (clickGroups.length === 0) {
      return {
        data: {
          period: periodDays,
          from: from.toISOString().split('T')[0],
          products: [],
        },
      }
    }

    // ── 2. Resolve product titles in one query ────────────────────────────────
    const productIds = clickGroups.map(g => g.targetId as string)

    const productRows = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, title: true },
    })

    const productMap = new Map(productRows.map(p => [p.id, p.title]))

    // ── 3. Merge click counts with product titles ─────────────────────────────
    const products = clickGroups.map(group => ({
      id: group.targetId as string,
      title: productMap.get(group.targetId as string) ?? null,
      clicks: group._count._all,
    }))

    return {
      data: {
        period: periodDays,
        from: from.toISOString().split('T')[0],
        products,
      },
    }
  }
  catch (error) {
    console.error('[admin GET /api/metrics/products] aggregation failed:', error)
    throw createError({
      statusCode: 500,
      data: {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Algo deu errado ao consultar as métricas de produtos. Tente novamente.',
        },
      },
    })
  }
})
