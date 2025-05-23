"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const experiences = [
    {
      period: "Июль 2024 - Сентябрь 2024",
      company: 'ООО "Газпром Трансгаз Томск"',
      position: "Backend разработчик",
      responsibilities: [
        "Разработка серверной части корпоративных приложений на Python/Django",
        "Создание и интеграция RESTful API с использованием Django REST Framework",
        "Оптимизация баз данных и повышение производительности систем",
        "Внедрение контейнеризации приложений с помощью Docker",
      ],
    },
    {
      period: "Февраль 2025 - Март 2025",
      company: 'ООО "Газпром Трансгаз Томск"',
      position: "Backend разработчик",
      responsibilities: [],
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

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge variant="outline" className="mb-2 border-red-500 text-red-500 uppercase tracking-widest px-4 py-1">
            Карьера
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Опыт работы
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Мой профессиональный путь в сфере разработки программного обеспечения
          </p>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div key={index} variants={itemVariants} className="relative">
              {index !== experiences.length - 1 && (
                <div className="absolute left-[50%] top-full w-px h-12 bg-gradient-to-b from-red-500 to-transparent"></div>
              )}

              <Card className="border-none bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-500 overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute left-0 top-0 h-full w-1 bg-red-500 transform origin-bottom scale-y-0"
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <div>
                      <CardTitle className="text-2xl text-white">{exp.position}</CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-400">{exp.company}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="w-fit bg-red-500/10 text-red-400 border border-red-500/20">
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                {exp.responsibilities.length > 0 && (
                  <CardContent>
                    <ul className="space-y-2 text-gray-300">
                      {exp.responsibilities.map((resp, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <span className="text-red-500 mt-1">▹</span>
                          <span>{resp}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
