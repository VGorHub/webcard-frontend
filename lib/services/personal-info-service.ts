/**
 * Сервис для работы с персональной информацией
 */

import { api } from "@/lib/api-client"

export interface PersonalInfo {
  id?: string
  name: string
  title: string
  bio: string
  phone: string
  email: string
  location: string
  profileImage?: string
}

const FALLBACK_KEY = "personalInfo"

export class PersonalInfoService {
  static async getPersonalInfo(): Promise<PersonalInfo> {
    try {
      return await api.get<PersonalInfo>("/personal-info", FALLBACK_KEY)
    } catch (error) {
      // Возвращаем дефолтные данные если нет сохраненных
      return {
        name: "Горохов Владимир",
        title: "Backend разработчик",
        bio: "Амбициозный и целеустремлённый разработчик с опытом создания backend-приложений на Python/Django и Java Spring Boot.",
        phone: "+7 (909) 540 41 41",
        email: "vova-gorohov04@mail.ru",
        location: "Томск, Россия",
      }
    }
  }

  static async updatePersonalInfo(data: PersonalInfo): Promise<PersonalInfo> {
    return api.put<PersonalInfo>("/personal-info", data, FALLBACK_KEY)
  }

  static async updateProfileImage(file: File): Promise<{ url: string }> {
    return api.uploadFile<{ url: string }>("/personal-info/profile-image", file, "image")
  }
}
