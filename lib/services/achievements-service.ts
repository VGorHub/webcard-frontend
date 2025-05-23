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

export class AchievementsService {
  static async getAllAchievements(): Promise<Achievement[]> {
    return api.get<Achievement[]>("/achievements")
  }

  static async getAchievementById(id: string): Promise<Achievement> {
    return api.get<Achievement>(`/achievements/${id}`)
  }

  static async createAchievement(data: Achievement): Promise<Achievement> {
    return api.post<Achievement>("/achievements", data)
  }

  static async updateAchievement(id: string, data: Achievement): Promise<Achievement> {
    return api.put<Achievement>(`/achievements/${id}`, data)
  }

  static async deleteAchievement(id: string): Promise<void> {
    return api.delete<void>(`/achievements/${id}`)
  }

  static async uploadCertificate(id: string, file: File): Promise<{ url: string }> {
    return api.uploadFile<{ url: string }>(`/achievements/${id}/certificate`, file, "certificate")
  }

  static async uploadPhotos(id: string, files: File[]): Promise<{ urls: string[] }> {
    return api.uploadFiles<{ urls: string[] }>(`/achievements/${id}/photos`, files, "photos")
  }
}
