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

const FALLBACK_KEY = "experiences"

export class ExperienceService {
  static async getAllExperiences(): Promise<Experience[]> {
    return api.get<Experience[]>("/experiences", FALLBACK_KEY)
  }

  static async getExperienceById(id: string): Promise<Experience> {
    const experiences = await this.getAllExperiences()
    const experience = experiences.find((exp) => exp.id === id)
    if (!experience) {
      throw new Error("Опыт работы не найден")
    }
    return experience
  }

  static async createExperience(data: Experience): Promise<Experience> {
    return api.post<Experience>("/experiences", data, FALLBACK_KEY)
  }

  static async updateExperience(id: string, data: Experience): Promise<Experience> {
    const updatedData = { ...data, id }
    return api.put<Experience>(`/experiences/${id}`, updatedData, FALLBACK_KEY)
  }

  static async deleteExperience(id: string): Promise<void> {
    await api.delete<void>(`/experiences/${id}`, id, FALLBACK_KEY)
  }
}
