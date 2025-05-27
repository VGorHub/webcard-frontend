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

const FALLBACK_KEY = "skillCategories"

export class SkillsService {
  static async getAllSkillCategories(): Promise<SkillCategory[]> {
    return api.get<SkillCategory[]>("/skills", FALLBACK_KEY)
  }

  static async getSkillCategoryById(id: string): Promise<SkillCategory> {
    const categories = await this.getAllSkillCategories()
    const category = categories.find((cat) => cat.id === id)
    if (!category) {
      throw new Error("Категория навыков не найдена")
    }
    return category
  }

  static async createSkillCategory(data: SkillCategory): Promise<SkillCategory> {
    return api.post<SkillCategory>("/skills", data, FALLBACK_KEY)
  }

  static async updateSkillCategory(id: string, data: SkillCategory): Promise<SkillCategory> {
    const updatedData = { ...data, id }
    return api.put<SkillCategory>(`/skills/${id}`, updatedData, FALLBACK_KEY)
  }

  static async deleteSkillCategory(id: string): Promise<void> {
    await api.delete<void>(`/skills/${id}`, id, FALLBACK_KEY)
  }
}
