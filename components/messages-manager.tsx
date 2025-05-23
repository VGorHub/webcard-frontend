"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Mail, Trash2, Eye, Calendar, User } from "lucide-react"

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  read: boolean
}

export function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    // Загружаем сообщения из localStorage
    const savedMessages = localStorage.getItem("contactMessages")
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message)
    setIsDialogOpen(true)

    // Отмечаем сообщение как прочитанное
    if (!message.read) {
      const updatedMessages = messages.map((m) => (m.id === message.id ? { ...m, read: true } : m))
      setMessages(updatedMessages)
      localStorage.setItem("contactMessages", JSON.stringify(updatedMessages))
    }
  }

  const handleDeleteMessage = (id: string) => {
    const updatedMessages = messages.filter((m) => m.id !== id)
    setMessages(updatedMessages)
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages))
    toast({ title: "Сообщение удалено", description: "Сообщение успешно удалено" })
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Сообщения
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="bg-red-600">
                    {unreadCount}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-gray-400">
                Все сообщения, отправленные через форму обратной связи
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message) => (
                <Card
                  key={message.id}
                  className={`bg-gray-800/50 border-gray-700 cursor-pointer transition-all duration-300 hover:bg-gray-800/70 ${
                    !message.read ? "border-red-500/30 bg-red-500/5" : ""
                  }`}
                  onClick={() => handleViewMessage(message)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-white">{message.name}</span>
                        {!message.read && (
                          <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs">
                            Новое
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewMessage(message)
                          }}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteMessage(message.id)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">{message.email}</p>
                      <h3 className="font-medium text-white line-clamp-1">{message.subject}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{message.message}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                        <Calendar className="h-3 w-3" />
                        {formatDate(message.timestamp)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Сообщений пока нет</p>
              <p className="text-gray-600 text-sm">
                Когда кто-то отправит сообщение через форму обратной связи, оно появится здесь
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Сообщение от {selectedMessage?.name}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedMessage && formatDate(selectedMessage.timestamp)}
            </DialogDescription>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-gray-300">Имя</label>
                  <p className="text-white">{selectedMessage.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Email</label>
                  <p className="text-white">{selectedMessage.email}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300">Тема</label>
                <p className="text-white font-medium">{selectedMessage.subject}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300">Сообщение</label>
                <div className="mt-2 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <p className="text-gray-300 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-800">
                <Button className="bg-red-600 hover:bg-red-700" asChild>
                  <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>Ответить</a>
                </Button>
                <Button
                  variant="outline"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                  onClick={() => {
                    handleDeleteMessage(selectedMessage.id)
                    setIsDialogOpen(false)
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Удалить
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
