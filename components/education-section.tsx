"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Calendar } from "lucide-react"

export function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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

        <motion.div
          variants={itemVariants}
          initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
          animate={isInView ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Card className="bg-gray-900/50 backdrop-blur-sm border-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>

            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-red-500/10 text-red-500 border border-red-500/20">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl text-white">
                  Томский государственный университет систем управления и радиоэлектроники (ТУСУР)
                </CardTitle>
                <p className="text-gray-400">Неполное высшее</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>2022 - 2026 (ожидаемый год выпуска)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-medium text-xl text-white border-b border-red-500/30 pb-2">Детали обучения:</h4>
                  <ul className="space-y-3">
                    {[
                      "Факультет: Вычислительных систем (ФВС)",
                      "Кафедра: Компьютерные системы управления и обработки (КСУП)",
                      "Направление: Системы автоматизированного проектирования (САПР), код специальности 19.03.01",
                      "Средний балл: 4.5",
                    ].map((item, idx) => (
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

                <div className="space-y-4">
                  <h4 className="font-medium text-xl text-white border-b border-red-500/30 pb-2">
                    Дополнительное образование:
                  </h4>
                  <ul className="space-y-3">
                    {[
                      '"Python разработчик" дополнительная квалификация от IT Academy',
                      "Опыт написания научных статей",
                    ].map((item, idx) => (
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

                  <h4 className="font-medium text-xl text-white border-b border-red-500/30 pb-2 mt-6">Языки:</h4>
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
      </motion.div>
    </section>
  )
}
