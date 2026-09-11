import { prisma, type Prisma } from '@acesso/db'

/**
 * GET /api/products — lojinha de afiliados (Fase 1).
 *
 * Query string (todos opcionais):
 *   - `categoria`: filtra por categoria exata (ex.: "Terços").
 *   - `busca`: termo de busca livre, casa em título ou descrição (case-insensitive).
 *
 * Retorna apenas produtos ativos, do mais novo para o mais antigo. Expõe só o
 * contrato público de cada produto — campos internos (`active`, `createdAt`,
 * `updatedAt`) não vão para o cliente.
 */

const publicProductSelect = {
  id: true,
  title: true,
  description: true,
  priceRef: true,
  category: true,
  affiliateUrl: true,
  imageUrl: true,
} satisfies Prisma.ProductSelect

export type PublicProduct = Prisma.ProductGetPayload<{
  select: typeof publicProductSelect
}>

export default defineEventHandler(async (event): Promise<{ data: PublicProduct[] }> => {
  const query = getQuery(event)

  const categoria = typeof query.categoria === 'string' ? query.categoria.trim() : ''
  const busca = typeof query.busca === 'string' ? query.busca.trim() : ''

  const where: Prisma.ProductWhereInput = { active: true }

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
      select: publicProductSelect,
      orderBy: { createdAt: 'desc' },
    })

    return { data: products }
  } catch (error) {
    // Falha de banco (indisponível, credenciais ausentes, etc.): registra a causa
    // real no servidor e devolve um fallback gracioso, sem vazar internals ao cliente.
    console.error('[GET /api/products] falha ao consultar produtos:', error)
    return { data: [] }
  }
})
