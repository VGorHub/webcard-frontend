"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { toast } from "@/components/ui/use-toast"
import { Plus, Edit, Trash2, Briefcase } from "lucide-react"

interface Experience {
  id: string
  period: string
  company: string
  position: string
  responsibilities: string[]
  technologies?: string[]
  description?: string
}

export function ExperienceManager() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [formData, setFormData] = useState({
    period: "",
    company: "",
    position: "",
    responsibilities: "",
    technologies: "",
    description: "",
  })

  useEffect(() => {
    // Загружаем данные из localStorage
    const savedExperiences = localStorage.getItem("experiences")
    if (savedExperiences) {
      setExperiences(JSON.parse(savedExperiences))
    } else {
      // Устанавливаем начальные данные
      const initialExperiences: Experience[] = [
        {
          id: "1",
          period: "Июль 2024 - Сентябрь 2024",
          company: 'ООО "Газпром Трансгаз Томск"',
          position: "Backend разработчик",
          responsibilities: [
            "Разработка серверной части корпоративных приложений на Python/Django",
            "Создание и интеграция RESTful API с использованием Django REST Framework",
            "Оптимизация баз данных и повышение производительности систем",
            "Внедрение контейнеризации приложений с помощью Docker",
          ],
          technologies: ["Python", "Django", "PostgreSQL", "Docker", "REST API"],
        },
        {
          id: "2",
          period: "Февраль 2025 - Март 2025",
          company: 'ООО "Газпром Трансгаз Томск"',
          position: "Backend разработчик",
          responsibilities: [],
          description: "Планируемая стажировка",
        },
      ]
      setExperiences(initialExperiences)
      localStorage.setItem("experiences", JSON.stringify(initialExperiences))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const experienceData: Experience = {
      id: editingExperience?.id || Date.now().toString(),
      period: formData.period,
      company: formData.company,
      position: formData.position,
      responsibilities: formData.responsibilities
        .split("\n")
        .map((r) => r.trim())
        .filter((r) => r),
      technologies: formData.technologies
        ? formData.technologies
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t)
        : undefined,
      description: formData.description || undefined,
    }

    let updatedExperiences
    if (editingExperience) {
      updatedExperiences = experiences.map((exp) => (exp.id === editingExperience.id ? experienceData : exp))
      toast({ title: "Опыт работы обновлен", description: "Изменения успешно сохранены" })
    } else {
      updatedExperiences = [...experiences, experienceData]
      toast({ title: "Опыт работы добавлен", description: "Новая запись успешно создана" })
    }

    setExperiences(updatedExperiences)
    localStorage.setItem("experiences", JSON.stringify(updatedExperiences))
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      period: "",
      company: "",
      position: "",
      responsibilities: "",
      technologies: "",
      description: "",
    })
    setEditingExperience(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience)
    setFormData({
      period: experience.period,
      company: experience.company,
      position: experience.position,
      responsibilities: experience.responsibilities.join("\n"),
      technologies: experience.technologies?.join(", ") || "",
      description: experience.description || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    const updatedExperiences = experiences.filter((exp) => exp.id !== id)
    setExperiences(updatedExperiences)
    localStorage.setItem("experiences", JSON.stringify(updatedExperiences))
    toast({ title: "Опыт работы удален", description: "Запись успешно удалена" })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Управление опытом работы</CardTitle>
              <CardDescription className="text-gray-400">
                Добавляйте, редактируйте и удаляйте записи о вашем опыте работы
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить опыт
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingExperience ? "Редактировать опыт работы" : "Добавить новый опыт работы"}
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">Заполните информацию о месте работы</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="period" className="text-gray-300">
                        Период работы *
                      </Label>
                      <Input
                        id="period"
                        name="period"
                        value={formData.period}
                        onChange={handleInputChange}
                        placeholder="Январь 2023 - Декабрь 2023"
                        required
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position" className="text-gray-300">
                        Должность *
                      </Label>
                      <Input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        placeholder="Backend разработчик"
                        required
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-gray-300">
                      Компания *
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder='ООО "Название компании"'
                      required
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300">
                      Краткое описание
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Краткое описание работы или проекта"
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="responsibilities" className="text-gray-300">
                      Обязанности и достижения (каждая с новой строки)
                    </Label>
                    <Textarea
                      id="responsibilities"
                      name="responsibilities"
                      value={formData.responsibilities}
                      onChange={handleInputChange}
                      placeholder="Разработка серверной части приложений&#10;Создание и интеграция API&#10;Оптимизация производительности"
                      className="bg-gray-800/50 border-gray-700 text-white min-h-[120px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="technologies" className="text-gray-300">
                      Технологии (через запятую)
                    </Label>
                    <Input
                      id="technologies"
                      name="technologies"
                      value={formData.technologies}
                      onChange={handleInputChange}
                      placeholder="Python, Django, PostgreSQL, Docker"
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="bg-red-600 hover:bg-red-700">
                      {editingExperience ? "Обновить" : "Создать"} запись
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
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <Card key={experience.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{experience.position}</h3>
                        <p className="text-gray-400">{experience.company}</p>
                        <Badge variant="outline" className="mt-1 border-red-500/30 text-red-400">
                          {experience.period}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                        onClick={() => handleEdit(experience)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        onClick={() => handleDelete(experience.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {experience.description && <p className="text-gray-300 mb-4 italic">{experience.description}</p>}

                  {experience.responsibilities.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Обязанности и достижения:</h4>
                      <ul className="space-y-1">
                        {experience.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-400">
                            <span className="text-red-500 mt-1">▹</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {experience.technologies && experience.technologies.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Технологии:</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="border-gray-600 text-gray-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {experiences.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">У вас пока нет записей об опыте работы</p>
              <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Добавить первую запись
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
