/**
 * Сервис для работы с навыками
 */

import { api } from "@/lib/api-client"

export interface SkillCategory {
  id?: string
  title: string
  icon: string
  skills: string[]
}

export class SkillsService {
  static async getAllSkillCategories(): Promise<SkillCategory[]> {
    return api.get<SkillCategory[]>("/skills")
  }

  static async getSkillCategoryById(id: string): Promise<SkillCategory> {
    return api.get<SkillCategory>(`/skills/${id}`)
  }

  static async createSkillCategory(data: SkillCategory): Promise<SkillCategory> {
    return api.post<SkillCategory>("/skills", data)
  }

  static async updateSkillCategory(id: string, data: SkillCategory): Promise<SkillCategory> {
    return api.put<SkillCategory>(`/skills/${id}`, data)
  }

  static async deleteSkillCategory(id: string): Promise<void> {
    return api.delete<void>(`/skills/${id}`)
  }
}
