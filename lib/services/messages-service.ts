/**
 * Сервис для работы с сообщениями
 */

import { api } from "@/lib/api-client"

export interface Message {
  id?: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  read: boolean
}

export class MessagesService {
  static async getAllMessages(): Promise<Message[]> {
    return api.get<Message[]>("/messages")
  }

  static async getMessageById(id: string): Promise<Message> {
    return api.get<Message>(`/messages/${id}`)
  }

  static async createMessage(data: Omit<Message, "id" | "timestamp" | "read">): Promise<Message> {
    return api.post<Message>("/messages", data)
  }

  static async markAsRead(id: string): Promise<Message> {
    return api.patch<Message>(`/messages/${id}/read`, { read: true })
  }

  static async deleteMessage(id: string): Promise<void> {
    return api.delete<void>(`/messages/${id}`)
  }
}
