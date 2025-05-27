/**
 * Сервис для работы с достижениями
 */

import { api } from "@/lib/api-client"

export interface Achievement {
  id?: string
  title: string
  description: string
  highlight?: boolean
  date: string
  location: string
  fullDescription: string
  photos: string[]
  certificate?: string
  participants?: number
  position?: string
  organizer: string
}

const FALLBACK_KEY = "achievements"

export class AchievementsService {
  static async getAllAchievements(): Promise<Achievement[]> {
    return api.get<Achievement[]>("/achievements", FALLBACK_KEY)
  }

  static async getAchievementById(id: string): Promise<Achievement> {
    const achievements = await this.getAllAchievements()
    const achievement = achievements.find((ach) => ach.id === id)
    if (!achievement) {
      throw new Error("Достижение не найдено")
    }
    return achievement
  }

  static async createAchievement(data: Achievement): Promise<Achievement> {
    return api.post<Achievement>("/achievements", data, FALLBACK_KEY)
  }

  static async updateAchievement(id: string, data: Achievement): Promise<Achievement> {
    const updatedData = { ...data, id }
    return api.put<Achievement>(`/achievements/${id}`, updatedData, FALLBACK_KEY)
  }

  static async deleteAchievement(id: string): Promise<void> {
    await api.delete<void>(`/achievements/${id}`, id, FALLBACK_KEY)
  }

  static async uploadCertificate(id: string, file: File): Promise<{ url: string }> {
    return api.uploadFile<{ url: string }>(`/achievements/${id}/certificate`, file, "certificate")
  }

  static async uploadPhotos(id: string, files: File[]): Promise<{ urls: string[] }> {
    return api.uploadFiles<{ urls: string[] }>(`/achievements/${id}/photos`, files, "photos")
  }
}
