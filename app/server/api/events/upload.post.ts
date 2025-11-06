import { PrismaClient } from '@prisma/client'
import { createError, defineEventHandler, getHeader, readFormData } from 'h3'
import * as jwt from 'jsonwebtoken'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Verificar autenticação
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token de autenticação necessário'
      })
    }

    const token = authHeader.substring(7)
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any
    
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    })

    if (!user || (user.role !== 'ADMIN' && user.role !== 'PRIEST')) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Acesso negado'
      })
    }

    const formData = await readFormData(event)
    const files = formData.getAll('files') as File[]
    
    if (!files || files.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Nenhum arquivo foi enviado'
      })
    }

    const uploadedFiles = []
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'events')
    
    // Ensure upload directory exists
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // Directory already exists, ignore
    }

    for (const file of files) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        throw createError({
          statusCode: 400,
          statusMessage: `Tipo de arquivo não permitido: ${file.type}. Tipos permitidos: ${allowedTypes.join(', ')}`
        })
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        throw createError({
          statusCode: 400,
          statusMessage: `Arquivo muito grande: ${file.name}. Tamanho máximo: 5MB`
        })
      }

      // Generate unique filename
      const fileExtension = file.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExtension}`
      const filePath = join(uploadDir, fileName)
      
      // Convert file to buffer and save
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      await writeFile(filePath, buffer)
      
      const fileUrl = `/uploads/events/${fileName}`
      
      uploadedFiles.push({
        originalName: file.name,
        fileName,
        url: fileUrl,
        size: file.size,
        type: file.type
      })
    }

    return {
      success: true,
      message: `${uploadedFiles.length} arquivo(s) enviado(s) com sucesso`,
      data: uploadedFiles
    }

  } catch (error: any) {
    console.error('Error uploading files:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor ao fazer upload'
    })
  }
})
