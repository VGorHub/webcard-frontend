/**
 * Утилиты для работы с загрузкой файлов
 */

import { api } from "@/lib/api-client"

// Интерфейс для результата загрузки файла
export interface FileUploadResult {
  url: string
  filename: string
  id: string
  contentType: string
  size: number
}

// Интерфейс для результата загрузки нескольких файлов
export interface MultipleFileUploadResult {
  files: FileUploadResult[]
}

// Класс для работы с загрузкой файлов
export class FileUploadService {
  // Загрузка одного файла
  static async uploadFile(file: File, category = "general"): Promise<FileUploadResult> {
    return api.uploadFile<FileUploadResult>("/files/upload", file, "file", { category })
  }

  // Загрузка нескольких файлов
  static async uploadMultipleFiles(files: File[], category = "general"): Promise<MultipleFileUploadResult> {
    return api.uploadFiles<MultipleFileUploadResult>("/files/upload-multiple", files, "files", { category })
  }

  // Удаление файла
  static async deleteFile(fileId: string): Promise<void> {
    return api.delete<void>(`/files/${fileId}`)
  }

  // Получение URL для файла
  static getFileUrl(path: string): string {
    // Если путь уже является полным URL, возвращаем его как есть
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path
    }

    // Иначе формируем URL на основе базового URL API
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
    return `${baseUrl}/files/${path}`
  }
}

// Функция для проверки типа файла
export function isValidFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type)
}

// Функция для проверки размера файла (в байтах)
export function isValidFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize
}

// Константы для максимальных размеров файлов
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
export const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024 // 10MB

// Константы для допустимых типов файлов
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"]

export const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
