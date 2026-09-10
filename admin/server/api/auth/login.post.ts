import { compare } from 'bcryptjs'

/**
 * POST /api/auth/login
 *
 * Validates email + password against the User model and, on success,
 * creates a sealed session cookie via nuxt-auth-utils.
 *
 * Security notes:
 * - Returns the same 401 for "user not found" and "wrong password" —
 *   never reveals whether the email exists.
 * - Never exposes passwordHash, DB errors, or stack traces to the client.
 * - Session payload is minimal (id, email, role) — enough for middleware
 *   checks without leaking sensitive fields.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => null)

  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  // Validate presence of both fields.
  if (!email || !password) {
    throw createError({
      statusCode: 422,
      data: {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Informe o e-mail e a senha.',
          fields: {
            ...(!email ? { email: 'O e-mail é obrigatório.' } : {}),
            ...(!password ? { password: 'A senha é obrigatória.' } : {}),
          },
        },
      },
    })
  }

  // Credential error — same message regardless of whether the email exists.
  const INVALID_CREDENTIALS = createError({
    statusCode: 401,
    data: {
      error: {
        code: 'INVALID_CREDENTIALS',
        message: 'E-mail ou senha inválidos.',
      },
    },
  })

  let user: { id: string; email: string; passwordHash: string; name: string; role: string } | null = null

  try {
    user = await prisma.user.findUnique({ where: { email } })
  }
  catch (err) {
    console.error('[login] DB error while looking up user:', err)
    throw createError({
      statusCode: 500,
      data: {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Algo deu errado. Tente novamente.',
        },
      },
    })
  }

  if (!user) {
    // Constant-time guard: run a dummy compare so timing does not reveal
    // whether the email exists when no user record is found.
    await compare(password, '$2b$12$invalidhashpaddingtomakeitconstanttime000000000000000000')
    throw INVALID_CREDENTIALS
  }

  const passwordMatch = await compare(password, user.passwordHash)

  if (!passwordMatch) {
    throw INVALID_CREDENTIALS
  }

  // Set the sealed session cookie.
  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  })

  return { data: { email: user.email, name: user.name, role: user.role } }
})
