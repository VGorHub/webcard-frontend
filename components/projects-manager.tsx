"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Plus, Edit, Trash2, ExternalLink, Github } from "lucide-react"

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

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Система управления задачами",
      description: "Высоконагруженное приложение для распределения задач среди сотрудников с real-time уведомлениями",
      technologies: ["Python", "Django", "PostgreSQL", "Redis", "WebSocket"],
      image: "/placeholder.png?height=300&width=400",
      githubUrl: "https://github.com/example/task-manager",
      liveUrl: "https://task-manager-demo.com",
      category: "Backend",
      fullDescription: "Комплексная система управления задачами, разработанная для крупных команд.",
      features: ["Real-time уведомления", "Система ролей", "Аналитика"],
      screenshots: ["/placeholder.png?height=400&width=600"],
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    image: "",
    liveUrl: "",
    githubUrl: "",
    category: "",
    fullDescription: "",
    features: "",
    screenshots: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const projectData: Project = {
      id: editingProject?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      technologies: formData.technologies.split(",").map((t) => t.trim()),
      image: formData.image || "/placeholder.png?height=300&width=400",
      liveUrl: formData.liveUrl || undefined,
      githubUrl: formData.githubUrl || undefined,
      category: formData.category,
      fullDescription: formData.fullDescription,
      features: formData.features.split("\n").filter((f) => f.trim()),
      screenshots: formData.screenshots.split("\n").filter((s) => s.trim()),
    }

    if (editingProject) {
      setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? projectData : p)))
      toast({ title: "Проект обновлен", description: "Изменения успешно сохранены" })
    } else {
      setProjects((prev) => [...prev, projectData])
      toast({ title: "Проект добавлен", description: "Новый проект успешно создан" })
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      technologies: "",
      image: "",
      liveUrl: "",
      githubUrl: "",
      category: "",
      fullDescription: "",
      features: "",
      screenshots: "",
    })
    setEditingProject(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      image: project.image,
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      category: project.category,
      fullDescription: project.fullDescription,
      features: project.features.join("\n"),
      screenshots: project.screenshots.join("\n"),
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
    toast({ title: "Проект удален", description: "Проект успешно удален" })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Управление проектами</CardTitle>
              <CardDescription className="text-gray-400">
                Добавляйте, редактируйте и удаляйте ваши проекты
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить проект
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingProject ? "Редактировать проект" : "Добавить новый проект"}
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">Заполните информацию о проекте</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-gray-300">
                        Название проекта *
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-gray-300">
                        Категория *
                      </Label>
                      <Select value={formData.category} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="Backend">Backend</SelectItem>
                          <SelectItem value="Full-stack">Full-stack</SelectItem>
                          <SelectItem value="AI/ML">AI/ML</SelectItem>
                          <SelectItem value="Mobile">Mobile</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300">
                      Краткое описание *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullDescription" className="text-gray-300">
                      Полное описание *
                    </Label>
                    <Textarea
                      id="fullDescription"
                      name="fullDescription"
                      value={formData.fullDescription}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="technologies" className="text-gray-300">
                      Технологии (через запятую) *
                    </Label>
                    <Input
                      id="technologies"
                      name="technologies"
                      value={formData.technologies}
                      onChange={handleInputChange}
                      placeholder="Python, Django, PostgreSQL"
                      required
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="features" className="text-gray-300">
                      Ключевые особенности (каждая с новой строки)
                    </Label>
                    <Textarea
                      id="features"
                      name="features"
                      value={formData.features}
                      onChange={handleInputChange}
                      placeholder="Real-time уведомления&#10;Система ролей&#10;Аналитика"
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="liveUrl" className="text-gray-300">
                        Ссылка на демо
                      </Label>
                      <Input
                        id="liveUrl"
                        name="liveUrl"
                        value={formData.liveUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com"
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="githubUrl" className="text-gray-300">
                        Ссылка на GitHub
                      </Label>
                      <Input
                        id="githubUrl"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleInputChange}
                        placeholder="https://github.com/username/repo"
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-gray-300">
                      URL изображения
                    </Label>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="/placeholder.png?height=300&width=400"
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="screenshots" className="text-gray-300">
                      Скриншоты (URL каждого с новой строки)
                    </Label>
                    <Textarea
                      id="screenshots"
                      name="screenshots"
                      value={formData.screenshots}
                      onChange={handleInputChange}
                      placeholder="/placeholder.png?height=400&width=600&#10;/placeholder.png?height=400&width=600"
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="bg-red-600 hover:bg-red-700">
                      {editingProject ? "Обновить" : "Создать"} проект
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="border-gray-600 text-gray-400"
                    >
                      Отмена
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="bg-gray-800/50 border-gray-700 overflow-hidden group">
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.png"}
                    alt={project.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white mb-2 line-clamp-1">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 2 && (
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                        +{project.technologies.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Изменить
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>

                  {(project.liveUrl || project.githubUrl) && (
                    <div className="flex gap-2 mt-2">
                      {project.liveUrl && (
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-1" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-1" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">У вас пока нет проектов</p>
              <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Добавить первый проект
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
