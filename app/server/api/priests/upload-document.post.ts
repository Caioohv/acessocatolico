import { PrismaClient } from '@prisma/client'
import { promises as fs } from 'fs'
import { createError, defineEventHandler, getMethod, readMultipartFormData } from 'h3'
import * as path from 'path'

const prisma = new PrismaClient()

// Allowed file types for documents
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const formData = await readMultipartFormData(event)
    
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Nenhum arquivo enviado'
      })
    }

    const registrationId = formData.find(field => field.name === 'registrationId')?.data?.toString()
    const documentType = formData.find(field => field.name === 'documentType')?.data?.toString()
    const file = formData.find(field => field.name === 'file')

    if (!registrationId || !documentType || !file) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Dados obrigatórios: registrationId, documentType, file'
      })
    }

    // Validate file
    if (!file.data || file.data.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Arquivo vazio'
      })
    }

    if (file.data.length > MAX_FILE_SIZE) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Arquivo muito grande. Máximo 10MB'
      })
    }

    const mimeType = file.type || 'application/octet-stream'
    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tipo de arquivo não permitido. Use PDF, JPEG ou PNG'
      })
    }

    // Check if registration exists
    const registration = await prisma.priestRegistration.findUnique({
      where: { id: registrationId }
    })

    if (!registration) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Cadastro não encontrado'
      })
    }

    // Generate unique filename
    const fileExtension = path.extname(file.filename || '')
    const uniqueFileName = `${registrationId}_${documentType}_${Date.now()}${fileExtension}`
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads', 'priest-documents')
    try {
      await fs.mkdir(uploadsDir, { recursive: true })
    } catch (error) {
      console.error('Error creating uploads directory:', error)
    }
    
    const filePath = path.join(uploadsDir, uniqueFileName)
    
    try {
      // Save file to disk
      await fs.writeFile(filePath, file.data)
      
      // Save document record to database
      const document = await prisma.priestDocument.create({
        data: {
          registrationId,
          type: documentType as any,
          fileName: uniqueFileName,
          originalFileName: file.filename || 'unknown',
          filePath: filePath,
          fileSize: file.data.length,
          mimeType
        }
      })

      return {
        success: true,
        message: 'Documento enviado com sucesso',
        document: {
          id: document.id,
          type: document.type,
          fileName: document.fileName,
          originalFileName: document.originalFileName,
          fileSize: document.fileSize,
          mimeType: document.mimeType,
          status: document.status,
          uploadedAt: document.uploadedAt
        }
      }

    } catch (fileError) {
      console.error('Error saving file:', fileError)
      throw createError({
        statusCode: 500,
        statusMessage: 'Erro ao salvar arquivo'
      })
    }

  } catch (error) {
    console.error('Error uploading document:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
