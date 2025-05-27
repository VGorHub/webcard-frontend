/**
 * Сервис для работы с образованием
 */

import { api } from "@/lib/api-client"

export interface Education {
  id?: string
  institution: string
  degree: string
  field: string
  period: string
  gpa?: string
  description?: string
  achievements?: string[]
  diploma?: string
  status: "completed" | "in-progress" | "planned"
}

const FALLBACK_KEY = "educations"

export class EducationService {
  static async getAllEducations(): Promise<Education[]> {
    return api.get<Education[]>("/educations", FALLBACK_KEY)
  }

  static async getEducationById(id: string): Promise<Education> {
    const educations = await this.getAllEducations()
    const education = educations.find((edu) => edu.id === id)
    if (!education) {
      throw new Error("Образование не найдено")
    }
    return education
  }

  static async createEducation(data: Education): Promise<Education> {
    return api.post<Education>("/educations", data, FALLBACK_KEY)
  }

  static async updateEducation(id: string, data: Education): Promise<Education> {
    const updatedData = { ...data, id }
    return api.put<Education>(`/educations/${id}`, updatedData, FALLBACK_KEY)
  }

  static async deleteEducation(id: string): Promise<void> {
    await api.delete<void>(`/educations/${id}`, id, FALLBACK_KEY)
  }

  static async uploadDiploma(id: string, file: File): Promise<{ url: string }> {
    return api.uploadFile<{ url: string }>(`/educations/${id}/diploma`, file, "diploma")
  }
}
