/**
 * GET /api/metrics/articles — ranking of articles by read count.
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
 *     articles: {
 *       slug: string,
 *       reads: number,
 *     }[],             // ordered by reads desc
 *   }
 * }
 *
 * Algorithm:
 *   Group analytics_events WHERE type='article_read' by targetId (slug)
 *   to get read counts, then sort by reads desc. Resilient fallback: on any
 *   DB error, returns { data: { ..., articles: [] } } with HTTP 200.
 */

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const query = getQuery(event)
  const rawPeriod = typeof query.period === 'string' ? parseInt(query.period, 10) : NaN
  const periodDays = Number.isFinite(rawPeriod) && rawPeriod > 0 ? Math.min(rawPeriod, 365) : 30

  const from = new Date()
  from.setDate(from.getDate() - periodDays)
  from.setHours(0, 0, 0, 0)

  const fromStr = from.toISOString().split('T')[0]

  try {
    const readGroups = await prisma.analyticsEvent.groupBy({
      by: ['targetId'],
      where: {
        type: 'article_read',
        targetId: { not: null },
        createdAt: { gte: from },
      },
      _count: { _all: true },
      orderBy: { _count: { targetId: 'desc' } },
    })

    const articles = readGroups.map(group => ({
      slug: group.targetId as string,
      reads: group._count._all,
    }))

    return {
      data: {
        period: periodDays,
        from: fromStr,
        articles,
      },
    }
  }
  catch (error) {
    console.error('[admin GET /api/metrics/articles] aggregation failed:', error)
    return {
      data: {
        period: periodDays,
        from: fromStr,
        articles: [],
      },
    }
  }
})
