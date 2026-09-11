import { Prisma } from '@acesso/db'

/**
 * GET /api/metrics/site — site-wide analytics aggregates for the admin panel.
 *
 * Protected by session (requireUserSession throws 401 if unauthenticated).
 *
 * Query string (all optional):
 *   - `period`: integer number of days to look back (default 30, max 365).
 *
 * Response shape:
 * {
 *   data: {
 *     period: number,          // effective period in days
 *     from: string,            // ISO date (YYYY-MM-DD) at start of window
 *     pageviewsPerDay: { date: string; count: number }[],
 *     topPaths: { path: string; count: number }[],  // top 10 most-viewed paths
 *     uniqueSessions: number,  // approximate unique sessions in the period
 *   }
 * }
 *
 * Raw SQL is used for date-level grouping (Prisma groupBy does not support date
 * truncation expressions). COUNT(*) in Postgres returns BigInt — converted to
 * Number before returning.
 */

type PageviewRow = { date: string; count: bigint }
type UniqueSessionRow = { unique_sessions: bigint }

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const query = getQuery(event)
  const rawPeriod = typeof query.period === 'string' ? parseInt(query.period, 10) : NaN
  const periodDays = Number.isFinite(rawPeriod) && rawPeriod > 0 ? Math.min(rawPeriod, 365) : 30

  const from = new Date()
  from.setDate(from.getDate() - periodDays)
  from.setHours(0, 0, 0, 0)

  try {
    // ── 1. Pageviews per day ──────────────────────────────────────────────────
    // Uses raw SQL because Prisma groupBy cannot group by a date expression.
    // created_at is stored as TIMESTAMP(3); truncating to date in UTC keeps the
    // result consistent regardless of the server timezone.
    const pageviewRows = await prisma.$queryRaw<PageviewRow[]>(
      Prisma.sql`
        SELECT
          TO_CHAR(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS date,
          COUNT(*) AS count
        FROM analytics_events
        WHERE type = 'pageview'
          AND created_at >= ${from}
        GROUP BY TO_CHAR(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD')
        ORDER BY date ASC
      `,
    )

    const pageviewsPerDay = pageviewRows.map(row => ({
      date: row.date,
      count: Number(row.count),
    }))

    // ── 2. Most-accessed paths (top 10, pageview events only) ────────────────
    const topPathRows = await prisma.analyticsEvent.groupBy({
      by: ['path'],
      where: {
        type: 'pageview',
        createdAt: { gte: from },
      },
      _count: { _all: true },
      orderBy: { _count: { path: 'desc' } },
      take: 10,
    })

    const topPaths = topPathRows.map(row => ({
      path: row.path,
      count: row._count._all,
    }))

    // ── 3. Approximate unique sessions in the period ──────────────────────────
    // Counts distinct sessionId values across ALL event types (not just
    // pageview) to capture sessions that only generated product_click /
    // article_read events without an explicit pageview.
    const uniqueSessionRows = await prisma.$queryRaw<UniqueSessionRow[]>(
      Prisma.sql`
        SELECT COUNT(DISTINCT session_id) AS unique_sessions
        FROM analytics_events
        WHERE created_at >= ${from}
      `,
    )
    const uniqueSessions = Number(uniqueSessionRows[0]?.unique_sessions ?? 0)

    return {
      data: {
        period: periodDays,
        from: from.toISOString().split('T')[0],
        pageviewsPerDay,
        topPaths,
        uniqueSessions,
      },
    }
  }
  catch (error) {
    console.error('[admin GET /api/metrics/site] aggregation failed:', error)
    throw createError({
      statusCode: 500,
      data: {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Algo deu errado ao consultar as métricas. Tente novamente.',
        },
      },
    })
  }
})
