import { PrismaClient } from '@prisma/client'
import { createError, defineEventHandler, getMethod, readBody } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    if (getMethod(event) !== 'POST') {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
    }

    const body = await readBody(event)
    const { email, cpf } = body

    if (!email || !cpf) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email e CPF são obrigatórios'
      })
    }

    // Clean CPF (remove formatting)
    const cleanCpf = cpf.replace(/\D/g, '')

    // Find registration by email and CPF
    const registration = await prisma.priestRegistration.findFirst({
      where: {
        AND: [
          { email: email.toLowerCase().trim() },
          { cpf: cleanCpf }
        ]
      },
      include: {
        ordinationDiocese: {
          select: {
            id: true,
            name: true
          }
        },
        documents: {
          select: {
            id: true,
            type: true,
            status: true
          }
        }
      }
    })

    if (!registration) {
      return {
        success: false,
        message: 'Cadastro não encontrado com os dados informados',
        data: null
      }
    }

    // Format response data
    const responseData = {
      id: registration.id,
      firstName: registration.firstName,
      lastName: registration.lastName,
      email: registration.email,
      phone: registration.phone,
      cpf: registration.cpf,
      ordinationNumber: registration.ordinationNumber,
      ordinationDate: registration.ordinationDate.toISOString(),
      ordinationDiocese: registration.ordinationDiocese,
      status: registration.status,
      statusUpdatedAt: registration.statusUpdatedAt.toISOString(),
      emailVerified: registration.emailVerified,
      createdAt: registration.createdAt.toISOString(),
      updatedAt: registration.updatedAt.toISOString(),
      documentsCount: registration.documents.length,
      reviewComments: registration.reviewComments
    }

    return {
      success: true,
      message: 'Cadastro encontrado com sucesso',
      data: responseData
    }

  } catch (error) {
    console.error('Error searching priest registration:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
