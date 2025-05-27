/**
 * Сервис для работы с аутентификацией
 */

import { api } from "@/lib/api-client"

// Интерфейсы для типизации данных
export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    username: string
    role: string
  }
}

export interface User {
  id: string
  username: string
  role: string
}

// Класс для работы с аутентификацией
export class AuthService {
  // Вход в систему
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/login", credentials)

      // Сохраняем токен и статус аутентификации
      localStorage.setItem("authToken", response.token)
      localStorage.setItem("isAuthenticated", "true")

      return response
    } catch (error) {
      // Fallback для демо - простая проверка
      if (credentials.username === "admin" && credentials.password === "admin") {
        const mockResponse: AuthResponse = {
          token: "mock-token-" + Date.now(),
          user: {
            id: "1",
            username: "admin",
            role: "admin",
          },
        }

        localStorage.setItem("authToken", mockResponse.token)
        localStorage.setItem("isAuthenticated", "true")

        return mockResponse
      }

      throw new Error("Неверные учетные данные")
    }
  }

  // Выход из системы
  static async logout(): Promise<void> {
    try {
      await api.post<void>("/auth/logout", {})
    } catch (error) {
      console.warn("API недоступен, выполняем локальный выход")
    } finally {
      // В любом случае очищаем локальное хранилище
      localStorage.removeItem("authToken")
      localStorage.removeItem("isAuthenticated")
    }
  }

  // Получение информации о текущем пользователе
  static async getCurrentUser(): Promise<User> {
    try {
      return await api.get<User>("/auth/me")
    } catch (error) {
      // Fallback для демо
      return {
        id: "1",
        username: "admin",
        role: "admin",
      }
    }
  }

  // Проверка аутентификации
  static isAuthenticated(): boolean {
    if (typeof window === "undefined") return false
    return localStorage.getItem("isAuthenticated") === "true"
  }
}
