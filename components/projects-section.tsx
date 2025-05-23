"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Eye } from "lucide-react"
import { ProjectModal } from "@/components/project-modal"

interface Project {
  id: string
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

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Демо проекты
  const projects: Project[] = [
    {
      id: "1",
      title: "Система управления задачами",
      description: "Высоконагруженное приложение для распределения задач среди сотрудников с real-time уведомлениями",
      technologies: ["Python", "Django", "PostgreSQL", "Redis", "WebSocket"],
      image: "/placeholder.png?height=300&width=400",
      githubUrl: "https://github.com/example/task-manager",
      liveUrl: "https://task-manager-demo.com",
      category: "Backend",
      fullDescription:
        "Комплексная система управления задачами, разработанная для крупных команд. Включает в себя распределение задач, отслеживание прогресса, систему уведомлений и аналитику производительности.",
      features: [
        "Real-time уведомления через WebSocket",
        "Система ролей и прав доступа",
        "Аналитика и отчеты",
        "API для интеграции с внешними системами",
        "Масштабируемая архитектура",
      ],
      screenshots: [
        "/placeholder.png?height=400&width=600",
        "/placeholder.png?height=400&width=600",
        "/placeholder.png?height=400&width=600",
      ],
    },
    {
      id: "2",
      title: "Платформа клубов по интересам",
      description: "Web-платформа для создания и управления клубами по интересам с системой мероприятий",
      technologies: ["Java", "Spring Boot", "MySQL", "React", "Docker"],
      image: "/placeholder.png?height=300&width=400",
      githubUrl: "https://github.com/example/clubs-platform",
      category: "Full-stack",
      fullDescription:
        "Социальная платформа, позволяющая пользователям создавать клубы по интересам, организовывать мероприятия и находить единомышленников.",
      features: [
        "Создание и управление клубами",
        "Система мероприятий и записи",
        "Чат между участниками",
        "Геолокация мероприятий",
        "Система рейтингов и отзывов",
      ],
      screenshots: ["/placeholder.png?height=400&width=600", "/placeholder.png?height=400&width=600"],
    },
    {
      id: "3",
      title: "Система занятости рабочих пространств",
      description: "Корпоративная система для отслеживания и бронирования рабочих мест в офисе",
      technologies: ["Python", "Django REST", "PostgreSQL", "Vue.js"],
      image: "/placeholder.png?height=300&width=400",
      liveUrl: "https://workspace-demo.com",
      category: "Backend",
      fullDescription:
        "Система для управления рабочими пространствами в корпоративной среде. Позволяет сотрудникам бронировать места, а администраторам отслеживать загруженность офиса.",
      features: [
        "Бронирование рабочих мест",
        "Интерактивная карта офиса",
        "Аналитика использования пространств",
        "Интеграция с корпоративным календарем",
        "Мобильное приложение",
      ],
      screenshots: ["/placeholder.png?height=400&width=600"],
    },
    {
      id: "4",
      title: "Экологический мониторинг",
      description: "Система мониторинга биологических видов с использованием машинного обучения",
      technologies: ["Python", "TensorFlow", "FastAPI", "MongoDB"],
      image: "/placeholder.png?height=300&width=400",
      githubUrl: "https://github.com/example/eco-monitoring",
      category: "AI/ML",
      fullDescription:
        "Проект для экологического мониторинга с использованием компьютерного зрения для автоматического распознавания и подсчета биологических видов.",
      features: [
        "Распознавание видов животных",
        "Автоматический подсчет популяции",
        "Геопривязка наблюдений",
        "Статистика и тренды",
        "API для исследователей",
      ],
      screenshots: ["/placeholder.png?height=400&width=600", "/placeholder.png?height=400&width=600"],
    },
  ]

  const categories = ["Все", "Backend", "Full-stack", "AI/ML"]
  const [activeCategory, setActiveCategory] = useState("Все")

  const filteredProjects =
    activeCategory === "Все" ? projects : projects.filter((project) => project.category === activeCategory)

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
    <section id="projects" className="py-24 relative" ref={ref}>
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

        {/* Animated code pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-500 font-mono text-xs"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
              }}
            >
              {`{code: "${Math.random().toString(36).substring(7)}"}`}
            </motion.div>
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
            Портфолио
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Мои проекты
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Коллекция проектов, которые демонстрируют мои навыки и опыт в разработке
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 p-1 bg-gray-900/50 rounded-lg border border-gray-800">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "ghost"}
                size="sm"
                className={`${
                  activeCategory === category
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                } transition-all duration-300`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full bg-gray-900/50 backdrop-blur-sm border-none hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] transition-all duration-500 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.png"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-red-500/20 text-red-400 border border-red-500/30">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Подробнее
                      </Button>
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-white group-hover:text-red-400 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-400 text-sm line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs border-gray-700 text-gray-300">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-700 text-gray-300">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                        asChild
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-gray-600 text-gray-400 hover:bg-gray-700"
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
