/**
 * GET /api/products/:id — fetch a single product by id.
 *
 * Protected by session (requireUserSession throws 401 if unauthenticated).
 */
export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const id = getRouterParam(event, 'id') ?? ''

  if (!id) {
    throw createError({
      statusCode: 400,
      data: {
        error: { code: 'BAD_REQUEST', message: 'ID do produto não informado.' },
      },
    })
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      throw createError({
        statusCode: 404,
        data: {
          error: { code: 'NOT_FOUND', message: 'Produto não encontrado.' },
        },
      })
    }

    return { data: product }
  }
  catch (error: unknown) {
    // Re-throw H3 errors created above.
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      throw error
    }

    console.error('[admin GET /api/products/:id] failed to fetch product:', error)
    throw createError({
      statusCode: 500,
      data: {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Algo deu errado ao buscar o produto. Tente novamente.',
        },
      },
    })
  }
})
