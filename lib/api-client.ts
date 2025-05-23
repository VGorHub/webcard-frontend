/**
 * API клиент для взаимодействия с бэкендом
 */

import { toast } from "@/components/ui/use-toast"

// Базовый URL API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Типы HTTP методов
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

// Интерфейс для опций запроса
interface RequestOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: any
  isFormData?: boolean
}

// Функция для получения токена из localStorage
const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken")
  }
  return null
}

// Основная функция для выполнения запросов к API
export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, isFormData = false } = options

  // Формируем заголовки
  const headers: Record<string, string> = {
    ...options.headers,
  }

  // Если это не FormData, добавляем Content-Type: application/json
  if (!isFormData) {
    headers["Content-Type"] = "application/json"
  }

  // Добавляем токен авторизации, если он есть
  const token = getAuthToken()
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  // Формируем параметры запроса
  const requestOptions: RequestInit = {
    method,
    headers,
    credentials: "include", // Включаем куки для кросс-доменных запросов
  }

  // Добавляем тело запроса, если оно есть
  if (body) {
    requestOptions.body = isFormData ? body : JSON.stringify(body)
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions)

    // Проверяем статус ответа
    if (!response.ok) {
      // Пытаемся получить сообщение об ошибке из ответа
      let errorMessage = "Произошла ошибка при выполнении запроса"
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || errorMessage
      } catch (e) {
        // Если не удалось распарсить JSON, используем статус текст
        errorMessage = response.statusText
      }

      // Обрабатываем специфические коды ошибок
      if (response.status === 401) {
        // Неавторизован - очищаем токен и перенаправляем на страницу входа
        localStorage.removeItem("authToken")
        localStorage.removeItem("isAuthenticated")
        if (typeof window !== "undefined") {
          window.location.href = "/login"
        }
      }

      throw new Error(errorMessage)
    }

    // Для запросов DELETE может не быть тела ответа
    if (method === "DELETE" && response.status === 204) {
      return {} as T
    }

    // Парсим JSON ответ
    const data = await response.json()
    return data as T
  } catch (error) {
    // Показываем ошибку пользователю
    toast({
      title: "Ошибка",
      description: error instanceof Error ? error.message : "Произошла неизвестная ошибка",
      variant: "destructive",
    })
    throw error
  }
}

// Вспомогательные функции для различных HTTP методов
export const api = {
  get: <T>(endpoint: string, options: Omit<RequestOptions, "method" | "body"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body: any, options: Omit<RequestOptions, "method"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "POST", body }),

  put: <T>(endpoint: string, body: any, options: Omit<RequestOptions, "method"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "PUT", body }),

  patch: <T>(endpoint: string, body: any, options: Omit<RequestOptions, "method"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "PATCH", body }),

  delete: <T>(endpoint: string, options: Omit<RequestOptions, "method"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),

  // Специальная функция для загрузки файлов
  uploadFile: <T>(endpoint: string, file: File, fieldName: string = "file", additionalData: Record<string, any> = {}) => {
    const formData = new FormData();
    formData.append(fieldName, file);
    
    // Добавляем дополнительные данные в FormData
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value)
    })
    
    return apiRequest<T>(endpoint, { 
      method: "POST", 
      body: formData,
      isFormData: true
    })
  },
  
  // Функция для загрузки нескольких файлов
  uploadFiles: <T>(endpoint: string, files: File[], fieldName: string = "files", additionalData: Record<string, any> = {}) => {
    const formData = new FormData()
    
    // Добавляем все файлы с одним и тем же именем поля
    files.forEach(file => {
      formData.append(fieldName, file)
    })
    
    // Добавляем дополнительные данные в FormData
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value)
    })
    
    return apiRequest<T>(endpoint, { 
      method: "POST", 
      body: formData,
      isFormData: true
    })
  }
}
