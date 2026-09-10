/**
 * PUT /api/products/:id — replace all editable fields of an existing product.
 *
 * Protected by session (requireUserSession throws 401 if unauthenticated).
 *
 * Body (all required):
 *   - title: string
 *   - description: string
 *   - priceRef: string
 *   - category: string
 *   - affiliateUrl: string
 *   - imageUrl: string
 *   - active: boolean
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

  const fields: Record<string, string> = {}

  const title = typeof body?.title === 'string' ? body.title.trim() : ''
  const description = typeof body?.description === 'string' ? body.description.trim() : ''
  const priceRef = typeof body?.priceRef === 'string' ? body.priceRef.trim() : ''
  const category = typeof body?.category === 'string' ? body.category.trim() : ''
  const affiliateUrl = typeof body?.affiliateUrl === 'string' ? body.affiliateUrl.trim() : ''
  const imageUrl = typeof body?.imageUrl === 'string' ? body.imageUrl.trim() : ''

  if (!title) fields.title = 'O título é obrigatório.'
  if (!description) fields.description = 'A descrição é obrigatória.'
  if (!priceRef) fields.priceRef = 'O preço de referência é obrigatório.'
  if (!category) fields.category = 'A categoria é obrigatória.'
  if (!affiliateUrl) fields.affiliateUrl = 'O link de afiliado é obrigatório.'
  if (!imageUrl) fields.imageUrl = 'A URL da imagem é obrigatória.'

  if (typeof body?.active !== 'boolean') {
    fields.active = 'O campo ativo deve ser verdadeiro ou falso.'
  }

  if (Object.keys(fields).length > 0) {
    throw createError({
      statusCode: 422,
      data: {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Alguns campos precisam de atenção.',
          fields,
        },
      },
    })
  }

  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        priceRef,
        category,
        affiliateUrl,
        imageUrl,
        active: body.active as boolean,
      },
    })

    return { data: product }
  }
  catch (error: unknown) {
    // Prisma "record not found" error code.
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

    console.error('[admin PUT /api/products/:id] failed to update product:', error)
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
