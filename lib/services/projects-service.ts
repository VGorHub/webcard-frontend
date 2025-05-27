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

const FALLBACK_KEY = "projects"

export class ProjectsService {
  static async getAllProjects(): Promise<Project[]> {
    return api.get<Project[]>("/projects", FALLBACK_KEY)
  }

  static async getProjectById(id: string): Promise<Project> {
    const projects = await this.getAllProjects()
    const project = projects.find((proj) => proj.id === id)
    if (!project) {
      throw new Error("Проект не найден")
    }
    return project
  }

  static async createProject(data: Project): Promise<Project> {
    return api.post<Project>("/projects", data, FALLBACK_KEY)
  }

  static async updateProject(id: string, data: Project): Promise<Project> {
    const updatedData = { ...data, id }
    return api.put<Project>(`/projects/${id}`, updatedData, FALLBACK_KEY)
  }

  static async deleteProject(id: string): Promise<void> {
    await api.delete<void>(`/projects/${id}`, id, FALLBACK_KEY)
  }

  static async uploadProjectImage(id: string, file: File): Promise<{ url: string }> {
    return api.uploadFile<{ url: string }>(`/projects/${id}/image`, file, "image")
  }

  static async uploadScreenshots(id: string, files: File[]): Promise<{ urls: string[] }> {
    return api.uploadFiles<{ urls: string[] }>(`/projects/${id}/screenshots`, files, "screenshots")
  }
}
