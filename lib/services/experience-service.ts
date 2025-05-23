/**
 * Сервис для работы с опытом работы
 */

import { api } from "@/lib/api-client"

export interface Experience {
  id?: string
  period: string
  company: string
  position: string
  responsibilities: string[]
  technologies?: string[]
  description?: string
}

export class ExperienceService {
  static async getAllExperiences(): Promise<Experience[]> {
    return api.get<Experience[]>("/experiences")
  }

  static async getExperienceById(id: string): Promise<Experience> {
    return api.get<Experience>(`/experiences/${id}`)
  }

  static async createExperience(data: Experience): Promise<Experience> {
    return api.post<Experience>("/experiences", data)
  }

  static async updateExperience(id: string, data: Experience): Promise<Experience> {
    return api.put<Experience>(`/experiences/${id}`, data)
  }

  static async deleteExperience(id: string): Promise<void> {
    return api.delete<void>(`/experiences/${id}`)
  }
}
