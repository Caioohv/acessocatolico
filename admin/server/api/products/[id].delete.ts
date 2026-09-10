/**
 * DELETE /api/products/:id — permanently remove a product.
 *
 * Protected by session (requireUserSession throws 401 if unauthenticated).
 *
 * Returns 204 No Content on success (no body).
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
    await prisma.product.delete({ where: { id } })

    setResponseStatus(event, 204)
    return null
  }
  catch (error: unknown) {
    if (
      typeof error === 'object'
      && error !== null
      && 'code' in error
      && error.code === 'P2025'
    ) {
      throw createError({
        statusCode: 404,
        data: {
          error: { code: 'NOT_FOUND', message: 'Produto não encontrado.' },
        },
      })
    }

    console.error('[admin DELETE /api/products/:id] failed to delete product:', error)
    throw createError({
      statusCode: 500,
      data: {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Algo deu errado ao excluir o produto. Tente novamente.',
        },
      },
    })
  }
})
