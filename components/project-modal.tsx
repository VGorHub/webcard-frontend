"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ExternalLink, Github } from "lucide-react"

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

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white hover:bg-red-500/20"
                onClick={onClose}
              >
                <X className="h-6 w-6" />
              </Button>

              <div className="relative h-64 md:h-80 overflow-hidden rounded-t-lg">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <Badge variant="secondary" className="bg-red-500/20 text-red-400 border border-red-500/30 mb-2">
                    {project.category}
                  </Badge>
                  <h2 className="text-3xl font-bold text-white">{project.title}</h2>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="border-gray-700 text-gray-300">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Описание проекта</h3>
                  <p className="text-gray-400 leading-relaxed">{project.fullDescription}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Ключевые особенности</h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-400">
                        <span className="text-red-500 mt-1">▹</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.screenshots.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Скриншоты</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.screenshots.map((screenshot, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg border border-gray-800">
                          <img
                            src={screenshot || "/placeholder.svg"}
                            alt={`Screenshot ${index + 1}`}
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4 border-t border-gray-800">
                  {project.liveUrl && (
                    <Button className="bg-red-600 hover:bg-red-700" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Посмотреть проект
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-700" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Исходный код
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
