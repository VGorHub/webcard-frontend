"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Award, Eye } from "lucide-react"
import { AchievementModal } from "@/components/achievement-modal"

interface Achievement {
  id: string
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

export function AchievementsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Участие на хакатоне от IT Academy и Газпрома",
      description:
        "Разработал web-систему занятости рабочих пространств компании. Получил приглашение на практику в компанию.",
      date: "15-17 марта 2024",
      location: "Томск, IT Academy",
      organizer: "IT Academy совместно с ПАО Газпром",
      fullDescription:
        "Трехдневный хакатон, посвященный разработке корпоративных решений для оптимизации рабочих процессов. Наша команда разработала инновационную систему управления рабочими пространствами с использованием современных технологий.",
      photos: [
        "/placeholder.png?height=400&width=600",
        "/placeholder.png?height=400&width=600",
        "/placeholder.png?height=400&width=600",
      ],
      participants: 120,
      position: "Участник",
    },
    {
      id: "2",
      title: "1 место на хакатоне IT Academy",
      description: "Разработал платформу создания клубов по интересам.",
      highlight: true,
      date: "22-24 сентября 2023",
      location: "Томск, IT Academy",
      organizer: "IT Academy",
      fullDescription:
        "Победа в престижном хакатоне IT Academy. Разработанная платформа для создания клубов по интересам получила высшую оценку жюри за инновационный подход и качество реализации.",
      photos: ["/placeholder.png?height=400&width=600", "/placeholder.png?height=400&width=600"],
      certificate: "/placeholder.png?height=600&width=400",
      participants: 80,
      position: "1 место",
    },
    {
      id: "3",
      title: '6 место на международном экотоне "Зеленый код Москвы"',
      description: "Разработал проект по экологическому мониторингу биологических видов.",
      date: "10-12 июня 2023",
      location: "Москва (онлайн)",
      organizer: "Правительство Москвы",
      fullDescription:
        "Международный экологический хакатон, направленный на создание технологических решений для защиты окружающей среды. Проект по мониторингу биологических видов с использованием ИИ занял 6 место среди 200+ команд.",
      photos: ["/placeholder.png?height=400&width=600"],
      participants: 200,
      position: "6 место",
    },
    {
      id: "4",
      title: "6 место на хакатоне IT INNO HACK",
      description: "Разработал высоконагруженное приложение для распределения задач среди сотрудников (Task manager).",
      date: "5-7 ноября 2022",
      location: "Новосибирск",
      organizer: "IT INNO",
      fullDescription:
        "Хакатон, посвященный разработке корпоративных решений. Команда создала масштабируемую систему управления задачами с поддержкой real-time уведомлений и аналитики производительности.",
      photos: ["/placeholder.png?height=400&width=600", "/placeholder.png?height=400&width=600"],
      participants: 150,
      position: "6 место",
    },
  ]

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

  const cardVariants = {
    hidden: { opacity: 0, y: 100, rotateX: 10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="achievements" className="py-24 relative" ref={ref}>
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-yellow-500/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -10, 10, 0],
                x: [0, 10, -10, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
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
            Успехи
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Достижения
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Мои профессиональные успехи и участие в соревнованиях</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedAchievement(achievement)}
            >
              <Card
                className={`h-full bg-gray-900/50 backdrop-blur-sm border-none hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] transition-all duration-500 group overflow-hidden ${
                  achievement.highlight ? "ring-2 ring-yellow-500/30" : ""
                }`}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {achievement.highlight && (
                  <div className="absolute -right-12 -top-12 w-24 h-24 bg-yellow-500/20 rotate-45"></div>
                )}

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-red-600 text-white p-2 rounded-full">
                    <Eye className="h-4 w-4" />
                  </div>
                </div>

                <CardHeader className="flex flex-row items-center gap-4">
                  <motion.div
                    className={`p-3 ${
                      achievement.highlight
                        ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                        : "bg-red-500/10 text-red-500 border border-red-500/20"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {achievement.highlight ? <Trophy className="h-6 w-6" /> : <Award className="h-6 w-6" />}
                  </motion.div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-white group-hover:text-red-400 transition-colors duration-300">
                      {achievement.title}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{achievement.date}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-3">
                    {achievement.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{achievement.location}</span>
                    {achievement.position && (
                      <Badge variant="outline" className="border-gray-700 text-gray-400">
                        {achievement.position}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievement Modal */}
      <AchievementModal
        achievement={selectedAchievement}
        isOpen={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </section>
  )
}
