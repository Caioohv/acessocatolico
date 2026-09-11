/**
 * POST /api/products — create a new product.
 *
 * Protected by session (requireUserSession throws 401 if unauthenticated).
 *
 * Body (all required):
 *   - title: string
 *   - description: string
 *   - priceRef: string (display price, e.g. "R$ 49,90")
 *   - category: string
 *   - affiliateUrl: string
 *   - imageUrl: string
 *   - active: boolean (optional, defaults to true)
 */
export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const body = await readBody(event).catch(() => null)

  // Validate required fields.
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

  const active = typeof body?.active === 'boolean' ? body.active : true

  try {
    const product = await prisma.product.create({
      data: { title, description, priceRef, category, affiliateUrl, imageUrl, active },
    })

    setResponseStatus(event, 201)
    return { data: product }
  }
  catch (error) {
    console.error('[admin POST /api/products] failed to create product:', error)
    throw createError({
      statusCode: 500,
      data: {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Algo deu errado ao criar o produto. Tente novamente.',
        },
      },
    })
  }
})
