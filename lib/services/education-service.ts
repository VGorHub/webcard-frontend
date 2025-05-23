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

export class EducationService {
  static async getAllEducations(): Promise<Education[]> {
    return api.get<Education[]>("/educations")
  }

  static async getEducationById(id: string): Promise<Education> {
    return api.get<Education>(`/educations/${id}`)
  }

  static async createEducation(data: Education): Promise<Education> {
    return api.post<Education>("/educations", data)
  }

  static async updateEducation(id: string, data: Education): Promise<Education> {
    return api.put<Education>(`/educations/${id}`, data)
  }

  static async deleteEducation(id: string): Promise<void> {
    return api.delete<void>(`/educations/${id}`)
  }

  static async uploadDiploma(id: string, file: File): Promise<{ url: string }> {
    return api.uploadFile<{ url: string }>(`/educations/${id}/diploma`, file, "diploma")
  }
}
