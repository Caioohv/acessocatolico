export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    // Clear the auth cookie
    setCookie(event, 'auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0 // Expire immediately
    })

    return { message: 'Logout realizado com sucesso' }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro no logout'
    })
  }
})
