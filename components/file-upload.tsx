"use client"

import { useState, useRef, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { FileUploadService, isValidFileType, isValidFileSize } from "@/lib/file-upload"
import { Loader2, Upload, X, File, ImageIcon } from "lucide-react"

interface FileUploadProps {
  onUploadComplete: (fileUrl: string) => void
  allowedTypes?: string[]
  maxSize?: number
  category?: string
  buttonText?: string
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

export function FileUpload({
  onUploadComplete,
  allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"],
  maxSize = 5 * 1024 * 1024, // 5MB по умолчанию
  category = "general",
  buttonText = "Загрузить файл",
  className = "",
  variant = "outline",
  size = "default",
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Проверка типа файла
    if (!isValidFileType(file, allowedTypes)) {
      toast({
        title: "Неподдерживаемый формат файла",
        description: "Пожалуйста, выберите файл поддерживаемого формата",
        variant: "destructive",
      })
      return
    }

    // Проверка размера файла
    if (!isValidFileSize(file, maxSize)) {
      toast({
        title: "Файл слишком большой",
        description: `Максимальный размер файла: ${Math.round(maxSize / (1024 * 1024))}MB`,
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const result = await FileUploadService.uploadFile(file, category)
      onUploadComplete(result.url)
      toast({
        title: "Файл успешно загружен",
        description: `Файл ${file.name} успешно загружен`,
      })
    } catch (error) {
      console.error("Ошибка при загрузке файла:", error)
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить файл. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      // Сбрасываем значение input, чтобы можно было загрузить тот же файл повторно
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={allowedTypes.join(",")}
        className="hidden"
      />
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={handleButtonClick}
        disabled={isUploading}
        className="relative overflow-hidden group"
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Загрузка...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            {buttonText}
          </>
        )}
        <span className="absolute inset-0 w-0 bg-white group-hover:w-full transition-all duration-500 ease-out opacity-10"></span>
      </Button>
    </div>
  )
}

interface MultipleFileUploadProps {
  onUploadComplete: (fileUrls: string[]) => void
  allowedTypes?: string[]
  maxSize?: number
  category?: string
  buttonText?: string
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  maxFiles?: number
}

export function MultipleFileUpload({
  onUploadComplete,
  allowedTypes = ["image/jpeg", "image/png", "image/gif"],
  maxSize = 5 * 1024 * 1024, // 5MB по умолчанию
  category = "general",
  buttonText = "Загрузить файлы",
  className = "",
  variant = "outline",
  size = "default",
  maxFiles = 10,
}: MultipleFileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (files.length === 0) return

    // Проверка количества файлов
    if (selectedFiles.length + files.length > maxFiles) {
      toast({
        title: "Слишком много файлов",
        description: `Вы можете загрузить максимум ${maxFiles} файлов`,
        variant: "destructive",
      })
      return
    }

    // Проверка типов и размеров файлов
    const invalidTypeFiles = files.filter((file) => !isValidFileType(file, allowedTypes))
    const oversizedFiles = files.filter((file) => !isValidFileSize(file, maxSize))

    if (invalidTypeFiles.length > 0) {
      toast({
        title: "Неподдерживаемые форматы файлов",
        description: `${invalidTypeFiles.length} файл(ов) имеют неподдерживаемый формат`,
        variant: "destructive",
      })
      return
    }

    if (oversizedFiles.length > 0) {
      toast({
        title: "Файлы слишком большие",
        description: `${oversizedFiles.length} файл(ов) превышают максимальный размер ${Math.round(maxSize / (1024 * 1024))}MB`,
        variant: "destructive",
      })
      return
    }

    setSelectedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) return

    setIsUploading(true)

    try {
      const result = await FileUploadService.uploadMultipleFiles(selectedFiles, category)
      onUploadComplete(result.files.map((file) => file.url))
      setSelectedFiles([])
      toast({
        title: "Файлы успешно загружены",
        description: `${selectedFiles.length} файл(ов) успешно загружены`,
      })
    } catch (error) {
      console.error("Ошибка при загрузке файлов:", error)
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить файлы. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      // Сбрасываем значение input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4" />
    }
    return <File className="h-4 w-4" />
  }

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={allowedTypes.join(",")}
        multiple
        className="hidden"
      />

      <div className="flex flex-col gap-4">
        <Button
          type="button"
          variant={variant}
          size={size}
          onClick={handleButtonClick}
          disabled={isUploading || selectedFiles.length >= maxFiles}
          className="relative overflow-hidden group"
        >
          <Upload className="h-4 w-4 mr-2" />
          {buttonText}
          <span className="absolute inset-0 w-0 bg-white group-hover:w-full transition-all duration-500 ease-out opacity-10"></span>
        </Button>

        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm text-gray-400">Выбрано файлов: {selectedFiles.length}</div>

            <div className="max-h-40 overflow-y-auto space-y-1 p-2 bg-gray-800/50 rounded border border-gray-700">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between text-sm p-1 hover:bg-gray-700/50 rounded">
                  <div className="flex items-center gap-2 truncate">
                    {getFileIcon(file)}
                    <span className="truncate">{file.name}</span>
                    <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="button"
              onClick={uploadFiles}
              disabled={isUploading}
              className="w-full bg-red-600 hover:bg-red-700 relative overflow-hidden group"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Загрузить {selectedFiles.length} файл(ов)
                </>
              )}
              <span className="absolute inset-0 w-0 bg-white group-hover:w-full transition-all duration-500 ease-out opacity-10"></span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
