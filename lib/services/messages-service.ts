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

const FALLBACK_KEY = "contactMessages"

export class MessagesService {
  static async getAllMessages(): Promise<Message[]> {
    return api.get<Message[]>("/messages", FALLBACK_KEY)
  }

  static async getMessageById(id: string): Promise<Message> {
    const messages = await this.getAllMessages()
    const message = messages.find((msg) => msg.id === id)
    if (!message) {
      throw new Error("Сообщение не найдено")
    }
    return message
  }

  static async createMessage(data: Omit<Message, "id" | "timestamp" | "read">): Promise<Message> {
    const messageData = {
      ...data,
      timestamp: new Date().toISOString(),
      read: false,
    }
    return api.post<Message>("/messages", messageData, FALLBACK_KEY)
  }

  static async markAsRead(id: string): Promise<Message> {
    const messages = await this.getAllMessages()
    const message = messages.find((msg) => msg.id === id)
    if (!message) {
      throw new Error("Сообщение не найдено")
    }

    const updatedMessage = { ...message, read: true }
    return api.patch<Message>(`/messages/${id}/read`, updatedMessage, FALLBACK_KEY)
  }

  static async deleteMessage(id: string): Promise<void> {
    await api.delete<void>(`/messages/${id}`, id, FALLBACK_KEY)
  }
}
