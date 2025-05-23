/**
 * Сервис для работы с проектами
 */

import { api } from "@/lib/api-client"

export interface Project {
  id?: string
  title: string
  description: string
  technologies: string[]
  image: string
  liveUrl?: string
  githubUrl?: string
  category: string
  fullDescription: string
  features: string[]
  screenshots: string[]
}

export class ProjectsService {
  static async getAllProjects(): Promise<Project[]> {
    return api.get<Project[]>("/projects")
  }

  static async getProjectById(id: string): Promise<Project> {
    return api.get<Project>(`/projects/${id}`)
  }

  static async createProject(data: Project): Promise<Project> {
    return api.post<Project>("/projects", data)
  }

  static async updateProject(id: string, data: Project): Promise<Project> {
    return api.put<Project>(`/projects/${id}`, data)
  }

  static async deleteProject(id: string): Promise<void> {
    return api.delete<void>(`/projects/${id}`)
  }

  static async uploadProjectImage(id: string, file: File): Promise<{ url: string }> {
    return api.uploadFile<{ url: string }>(`/projects/${id}/image`, file, "image")
  }

  static async uploadScreenshots(id: string, files: File[]): Promise<{ urls: string[] }> {
    return api.uploadFiles<{ urls: string[] }>(`/projects/${id}/screenshots`, files, "screenshots")
  }
}
