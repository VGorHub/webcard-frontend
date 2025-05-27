"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Calendar, Loader2 } from "lucide-react"
import { EducationService, type Education } from "@/lib/services/education-service"

export function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [educations, setEducations] = useState<Education[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadEducations = async () => {
      try {
        const data = await EducationService.getAllEducations()
        setEducations(data)
      } catch (error) {
        console.error("Ошибка при загрузке образования:", error)
        // Fallback данные
        setEducations([
          {
            id: "1",
            institution: "Томский государственный университет систем управления и радиоэлектроники (ТУСУР)",
            degree: "Бакалавр",
            field: "Системы автоматизированного проектирования (САПР)",
            period: "2022 - 2026",
            gpa: "4.5",
            status: "in-progress",
            description:
              "Факультет: Вычислительных систем (ФВС), Кафедра: Компьютерные системы управления и обработки (КСУП)",
            achievements: [
              '"Python разработчик" дополнительная квалификация от IT Academy',
              "Опыт написания научных статей",
              "Участие в научных конференциях",
            ],
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    loadEducations()
  }, [])

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Завершено</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">В процессе</Badge>
      case "planned":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Планируется</Badge>
      default:
        return null
    }
  }

  return (
    <section id="education" className="py-24 relative" ref={ref}>
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

        {/* Animated lines */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
              style={{ top: `${20 + i * 15}%` }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
                ease: "linear",
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
            Квалификация
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Образование
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Моя академическая подготовка и дополнительное образование</p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-red-600" />
          </div>
        ) : (
          <div className="space-y-8">
            {educations.map((education, index) => (
              <motion.div
                key={education.id}
                variants={itemVariants}
                initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                animate={isInView ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } : {}}
                transition={{ duration: 1.5, ease: "easeInOut", delay: index * 0.2 }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border-none overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>

                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-red-500/10 text-red-500 border border-red-500/20">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-white">{education.institution}</CardTitle>
                      <p className="text-gray-400">
                        {education.degree} • {education.field}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="h-4 w-4" />
                          <span>{education.period}</span>
                        </div>
                        {getStatusBadge(education.status)}
                        {education.gpa && (
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            GPA: {education.gpa}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {education.description && <p className="text-gray-300">{education.description}</p>}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {education.achievements && education.achievements.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-medium text-xl text-white border-b border-red-500/30 pb-2">
                            Достижения и дополнительное образование:
                          </h4>
                          <ul className="space-y-3">
                            {education.achievements.map((achievement, idx) => (
                              <motion.li
                                key={idx}
                                className="flex items-center gap-3 group"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <motion.div
                                  className="h-0.5 w-5 bg-red-500 transform origin-left"
                                  whileHover={{ scaleX: 1.6 }}
                                  transition={{ duration: 0.3 }}
                                />
                                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                                  {achievement}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="space-y-4">
                        <h4 className="font-medium text-xl text-white border-b border-red-500/30 pb-2">Языки:</h4>
                        <ul className="space-y-3">
                          {["Русский (родной)", "Английский (B2)"].map((item, idx) => (
                            <motion.li
                              key={idx}
                              className="flex items-center gap-3 group"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <motion.div
                                className="h-0.5 w-5 bg-red-500 transform origin-left"
                                whileHover={{ scaleX: 1.6 }}
                                transition={{ duration: 0.3 }}
                              />
                              <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                                {item}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && educations.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">Информация об образовании пока не добавлена</p>
          </div>
        )}
      </motion.div>
    </section>
  )
}
