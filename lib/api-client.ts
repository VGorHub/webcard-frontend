// Базовый URL API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

// Типы HTTP методов
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

// Интерфейс для опций запроса
interface RequestOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: any
  isFormData?: boolean
  fallbackKey?: string // Ключ для localStorage fallback
}

// Функция для получения токена из localStorage
const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken")
  }
  return null
}

// Функция для работы с localStorage как fallback
const localStorageFallback = {
  get: <T>(key: string): T | null => {
    if (typeof window === "undefined") return null
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  },
  
  set: <T>(key: string, data: T): void => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error("Ошибка сохранения в localStorage:", error)
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === "undefined") return
    localStorage.removeItem(key)
  }
}

// Основная функция для выполнения запросов к API
export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, isFormData = false, fallbackKey } = options

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
    credentials: "include",
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
      // let errorMessage = "Произошла ошибка при выполнении запроса"
      // try {
      //   const errorData = await response.json()
      //   errorMessage = errorData.message || errorData.error || errorMessage
      // } catch (e) {
      //   // Если не удалось распарсить JSON, используем статус текст
      //   errorMessage = response.statusText
      // }

      // // Обрабатываем специфические коды ошибок
      // if (response.status === 401) {
      //   // Неавторизован - очищаем токен и перенаправляем на страницу входа
      //   localStorage.removeItem("authToken")
      //   localStorage.removeItem("isAuthenticated")
      //   if (typeof window !== "undefined") {
      //     window.location.href = "/login"
      //   }
      // }

      // throw new Error(errorMessage)
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    // Для запросов DELETE может не быть тела ответа
    if (method === "DELETE" && response.status === 204) {
      return {} as T
    }

    // Парсим JSON ответ
    const data = await response.json()
    return data as T
  } catch (error) {
    console.warn(`API запрос неудачен для ${endpoint}, используем localStorage fallback:`, error)
    
    // Fallback на localStorage
    if (fallbackKey) {
      return handleLocalStorageFallback<T>(method, fallbackKey, body)
    }
    
    // Показываем ошибку пользователю
    // toast({
    //   title: "Ошибка",
    //   description: error instanceof Error ? error.message : "Произошла неизвестная ошибка",
    //   variant: "destructive",
    // })
    throw error
  }
}

// Обработка fallback на localStorage
function handleLocalStorageFallback<T>(method: HttpMethod, key: string, body?: any): T {
  switch (method) {
    case "GET":
      return localStorageFallback.get<T>(key) || ([] as unknown as T)
    
    case "POST":
      const existingData = localStorageFallback.get<T[]>(key) || []
      const newItem = { ...body, id: Date.now().toString() }
      const updatedData = Array.isArray(existingData) 
        ? [...existingData, newItem] 
        : [newItem]
      localStorageFallback.set(key, updatedData)
      return newItem as T
    
    case "PUT":
    case "PATCH":
      const currentData = localStorageFallback.get<T[]>(key) || []
      if (Array.isArray(currentData)) {
        const updatedArray = currentData.map((item: any) => 
          item.id === body.id ? { ...item, ...body } : item
        )
        localStorageFallback.set(key, updatedArray)
        return body as T
      }
      localStorageFallback.set(key, body)
      return body as T
    
    case "DELETE":
      const dataToDelete = localStorageFallback.get<T[]>(key) || []
      if (Array.isArray(dataToDelete)) {
        const filteredData = dataToDelete.filter((item: any) => item.id !== body?.id)
        localStorageFallback.set(key, filteredData)
      }
      return {} as T
    
    default:
      throw new Error(`Неподдерживаемый метод: ${method}`)
  }
}

// Вспомогательные функции для различных HTTP методов
export const api = {
  get: <T>(endpoint: string, fallbackKey?: string, options: Omit<RequestOptions, "method" | "body"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "GET", fallbackKey }),

  post: <T>(endpoint: string, body: any, fallbackKey?: string, options: Omit<RequestOptions, "method"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "POST", body, fallbackKey }),

  put: <T>(endpoint: string, body: any, fallbackKey?: string, options: Omit<RequestOptions, "method"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "PUT", body, fallbackKey }),

  patch: <T>(endpoint: string, body: any, fallbackKey?: string, options: Omit<RequestOptions, "method"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "PATCH", body, fallbackKey }),

  delete: <T>(endpoint: string, id: string, fallbackKey?: string, options: Omit<RequestOptions, "method"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE", body: { id }, fallbackKey }),

  // Специальная функция для загрузки файлов
  uploadFile: <T>(endpoint: string, file: File, fieldName: string = "file", additionalData: Record<string, any> = {}) => {
    const formData = new FormData()
    formData.append(fieldName, file)
    
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value)
    })
    
    // Для файлов возвращаем mock URL если API недоступен
    return apiRequest<T>(endpoint, { 
      method: "POST", 
      body: formData,
      isFormData: true
    }).catch(() => {
      // Mock URL для файлов
      const mockUrl = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(file.name)}`
      return { url: mockUrl } as T
    })
  },
  
  uploadFiles: <T>(endpoint: string, files: File[], fieldName: string = "files", additionalData: Record<string, any> = {}) => {
    const formData = new FormData()
    
    files.forEach(file => {
      formData.append(fieldName, file)
    })
    
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value)
    })
    
    return apiRequest<T>(endpoint, { 
      method: "POST", 
      body: formData,
      isFormData: true
    }).catch(() => {
      // Mock URLs для файлов
      const mockUrls = files.map(file => 
        `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(file.name)}`
      )
      return { urls: mockUrls } as T
    })
  }
}
