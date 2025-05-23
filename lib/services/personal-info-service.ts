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

export class PersonalInfoService {
  static async getPersonalInfo(): Promise<PersonalInfo> {
    return api.get<PersonalInfo>("/personal-info")
  }

  static async updatePersonalInfo(data: PersonalInfo): Promise<PersonalInfo> {
    return api.put<PersonalInfo>("/personal-info", data)
  }

  static async updateProfileImage(file: File): Promise<{ url: string }> {
    return api.uploadFile<{ url: string }>("/personal-info/profile-image", file, "image")
  }
}
