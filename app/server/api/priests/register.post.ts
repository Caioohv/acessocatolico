import { PrismaClient } from '@prisma/client'
import { createError, defineEventHandler, getMethod, readBody } from 'h3'

const prisma = new PrismaClient()

// Simple validation function
function validatePriestRegistration(data: any) {
  const errors: string[] = []
  
  if (!data.firstName || data.firstName.length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres')
  }
  
  if (!data.lastName || data.lastName.length < 2) {
    errors.push('Sobrenome deve ter pelo menos 2 caracteres')
  }
  
  if (!data.email || !data.email.includes('@')) {
    errors.push('Email inválido')
  }
  
  if (!data.phone || data.phone.length < 10) {
    errors.push('Telefone inválido')
  }
  
  if (!data.birthDate || isNaN(Date.parse(data.birthDate))) {
    errors.push('Data de nascimento inválida')
  }
  
  if (!data.cpf) {
    errors.push('CPF é obrigatório')
  }
  
  if (!data.ordinationNumber) {
    errors.push('Número de ordenação é obrigatório')
  }
  
  if (!data.ordinationDate || isNaN(Date.parse(data.ordinationDate))) {
    errors.push('Data de ordenação inválida')
  }
  
  if (!data.ordinationDiocese) {
    errors.push('Diocese de ordenação é obrigatória')
  }
  
  return errors
}

export default defineEventHandler(async (event) => {
  try {
    // Only allow POST method
    if (getMethod(event) !== 'POST') {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
    }
    
    const body = await readBody(event)
    
    // Validate input
    const validationErrors = validatePriestRegistration(body)
    if (validationErrors.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: validationErrors.join(', ')
      })
    }
    
    // Check if email already exists
    const existingRegistration = await prisma.priestRegistration.findFirst({
      where: {
        OR: [
          { email: body.email },
          { cpf: body.cpf },
          { ordinationNumber: body.ordinationNumber }
        ]
      }
    })
    
    if (existingRegistration) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Já existe um cadastro com estes dados (email, CPF ou número de ordenação)'
      })
    }
    
    // Check if diocese exists
    const diocese = await prisma.diocese.findUnique({
      where: { id: body.ordinationDiocese }
    })
    
    if (!diocese) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Diocese não encontrada'
      })
    }
    
    // Generate simple verification token
    const emailVerificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    
    // Create priest registration
    const registration = await prisma.priestRegistration.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        birthDate: new Date(body.birthDate),
        cpf: body.cpf,
        bio: body.bio || null,
        ordinationNumber: body.ordinationNumber,
        ordinationDate: new Date(body.ordinationDate),
        ordinationDioceseId: body.ordinationDiocese,
        seminary: body.seminary || null,
        specializations: body.specializations || [],
        languages: body.languages || [],
        emailVerificationToken,
        emailVerificationSentAt: new Date()
      },
      include: {
        ordinationDiocese: true
      }
    })
    
    // Mock email sending (log to console)
    console.log('📧 [MOCK EMAIL] Verification email would be sent to:', registration.email)
    console.log('📧 [MOCK EMAIL] Verification token:', emailVerificationToken)
    
    // Create approval history entry
    await prisma.priestApprovalHistory.create({
      data: {
        registrationId: registration.id,
        fromStatus: 'PENDING',
        toStatus: 'PENDING',
        comments: 'Cadastro inicial submetido'
      }
    })
    
    return {
      success: true,
      message: 'Cadastro submetido com sucesso! Verifique seus dados e aguarde aprovação.',
      registrationId: registration.id,
      status: registration.status
    }
    
  } catch (error) {
    console.error('Error creating priest registration:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
