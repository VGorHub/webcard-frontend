"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Database, Terminal, GitBranch } from "lucide-react"

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const skillCategories = [
    {
      title: "Языки программирования",
      icon: <Code className="h-6 w-6" />,
      skills: ["Python (Django, Django REST Framework)", "Java (Spring Boot)", "C# (ASP.NET Framework)"],
    },
    {
      title: "Базы данных",
      icon: <Database className="h-6 w-6" />,
      skills: ["PostgreSQL", "MySQL", "Redis (кэширование и оптимизация)"],
    },
    {
      title: "Инструменты и технологии",
      icon: <Terminal className="h-6 w-6" />,
      skills: [
        "Docker, Docker Compose",
        "Git (GitHub, GitLab)",
        "CI/CD (Jenkins, GitLab CI)",
        "Linux (администрирование)",
      ],
    },
    {
      title: "Протоколы и стандарты",
      icon: <GitBranch className="h-6 w-6" />,
      skills: ["RESTful API", "WebSocket"],
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
    hidden: { opacity: 0, y: 100, rotateY: 15, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-red-500/30"
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
            Компетенции
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Навыки
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Технические навыки и инструменты, которыми я владею</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-gray-900/50 backdrop-blur-sm border-none hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] transition-all duration-500 group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <CardHeader className="flex flex-row items-center gap-4">
                  <motion.div
                    className="p-3 rounded-none bg-red-500/10 text-red-500 border border-red-500/20"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {category.icon}
                  </motion.div>
                  <CardTitle className="text-xl text-white">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.skills.map((skill, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center gap-3 group/skill"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <motion.div
                          className="h-0.5 w-5 bg-red-500 transform origin-left"
                          whileHover={{ scaleX: 1.6 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="text-gray-300 group-hover/skill:text-white transition-colors duration-300">
                          {skill}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
