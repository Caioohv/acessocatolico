import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { randomBytes } from 'crypto'

const prisma = new PrismaClient()

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido')
})

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const body = await readBody(event)
    const { email } = forgotPasswordSchema.parse(body)

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    // Don't reveal if user exists or not
    if (user) {
      // Generate reset token
      const resetToken = randomBytes(32).toString('hex')
      const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

      // Save token to database
      await prisma.passwordResetToken.create({
        data: {
          email: user.email,
          token: resetToken,
          expiresAt: tokenExpiry
        }
      })

      // TODO: Send email with reset link
      // For now, we'll just log it (in production, use proper email service)
      console.log(`Password reset link for ${email}: /reset-password?token=${resetToken}`)
    }

    // Always return success to prevent email enumeration
    return {
      message: 'Se o email existir em nossa base, você receberá um link de recuperação'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 400,
      statusMessage: error.message || 'Erro ao processar solicitação'
    })
  }
})
