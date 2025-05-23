"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { MessagesService } from "@/lib/services/messages-service"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await MessagesService.createMessage(formData)
      toast({
        title: "Сообщение отправлено",
        description: "Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error)
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при отправке сообщения. Попробуйте еще раз.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

        {/* Animated grid */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
              style={{ top: `${10 + i * 10}%` }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge variant="outline" className="mb-2 border-red-500 text-red-500 uppercase tracking-widest px-4 py-1">
            Связь
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Контакты
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Свяжитесь со мной для обсуждения возможностей сотрудничества
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="space-y-6">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-none hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] transition-all duration-500 group overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <CardContent className="flex items-center gap-4 p-6">
                  <motion.div
                    className="p-3 bg-red-500/10 text-red-500 border border-red-500/20"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Phone className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-lg text-white">Телефон</h3>
                    <a
                      href="tel:+79095404141"
                      className="text-gray-400 hover:text-red-400 transition-colors duration-300"
                    >
                      +7 (909) 540 41 41
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-none hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] transition-all duration-500 group overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <CardContent className="flex items-center gap-4 p-6">
                  <motion.div
                    className="p-3 bg-red-500/10 text-red-500 border border-red-500/20"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Mail className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-lg text-white">Email</h3>
                    <a
                      href="mailto:vova-gorohov04@mail.ru"
                      className="text-gray-400 hover:text-red-400 transition-colors duration-300"
                    >
                      vova-gorohov04@mail.ru
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-none hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] transition-all duration-500 group overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <CardContent className="flex items-center gap-4 p-6">
                  <motion.div
                    className="p-3 bg-red-500/10 text-red-500 border border-red-500/20"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MapPin className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-lg text-white">Город</h3>
                    <p className="text-gray-400">Томск, Россия</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="bg-gray-900/50 backdrop-blur-sm border-none overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 rounded-full blur-3xl"></div>

              <CardContent className="p-6 relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-white">Отправить сообщение</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-300">
                        Имя *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Ваше имя"
                        className="bg-gray-800/50 border-gray-700 text-white focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-300">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Ваш email"
                        className="bg-gray-800/50 border-gray-700 text-white focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                      Тема *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Тема сообщения"
                      className="bg-gray-800/50 border-gray-700 text-white focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300">
                      Сообщение *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Ваше сообщение"
                      className="min-h-[150px] bg-gray-800/50 border-gray-700 text-white focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white border-none relative overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    <span className="absolute inset-0 w-0 bg-white group-hover:w-full transition-all duration-500 ease-out opacity-10"></span>
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 relative z-10">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Отправка...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 relative z-10">
                        <Send className="h-4 w-4" />
                        Отправить сообщение
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
