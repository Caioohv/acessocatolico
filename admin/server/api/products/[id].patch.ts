/**
 * PATCH /api/products/:id — toggle the active state of a product.
 *
 * Protected by session (requireUserSession throws 401 if unauthenticated).
 *
 * Body:
 *   - active: boolean (required)
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

  const body = await readBody(event).catch(() => null)

  if (typeof body?.active !== 'boolean') {
    throw createError({
      statusCode: 422,
      data: {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Alguns campos precisam de atenção.',
          fields: { active: 'O campo ativo deve ser verdadeiro ou falso.' },
        },
      },
    })
  }

  try {
    const product = await prisma.product.update({
      where: { id },
      data: { active: body.active as boolean },
      select: { id: true, active: true },
    })

    return { data: product }
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

    console.error('[admin PATCH /api/products/:id] failed to toggle product active state:', error)
    throw createError({
      statusCode: 500,
      data: {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Algo deu errado ao atualizar o produto. Tente novamente.',
        },
      },
    })
  }
})
