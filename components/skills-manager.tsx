"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Plus, Edit, Trash2, Code } from "lucide-react"

interface SkillCategory {
  id: string
  title: string
  icon: string
  skills: string[]
}

export function SkillsManager() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    icon: "Code",
    skills: "",
  })

  const iconOptions = [
    { value: "Code", label: "Код" },
    { value: "Database", label: "База данных" },
    { value: "Terminal", label: "Терминал" },
    { value: "GitBranch", label: "Git" },
    { value: "Server", label: "Сервер" },
    { value: "Smartphone", label: "Мобильные" },
    { value: "Globe", label: "Веб" },
    { value: "Cpu", label: "Процессор" },
  ]

  useEffect(() => {
    // Загружаем данные из localStorage
    const savedSkills = localStorage.getItem("skillCategories")
    if (savedSkills) {
      setSkillCategories(JSON.parse(savedSkills))
    } else {
      // Устанавливаем начальные данные
      const initialSkills: SkillCategory[] = [
        {
          id: "1",
          title: "Языки программирования",
          icon: "Code",
          skills: ["Python (Django, Django REST Framework)", "Java (Spring Boot)", "C# (ASP.NET Framework)"],
        },
        {
          id: "2",
          title: "Базы данных",
          icon: "Database",
          skills: ["PostgreSQL", "MySQL", "Redis (кэширование и оптимизация)"],
        },
        {
          id: "3",
          title: "Инструменты и технологии",
          icon: "Terminal",
          skills: [
            "Docker, Docker Compose",
            "Git (GitHub, GitLab)",
            "CI/CD (Jenkins, GitLab CI)",
            "Linux (администрирование)",
          ],
        },
        {
          id: "4",
          title: "Протоколы и стандарты",
          icon: "GitBranch",
          skills: ["RESTful API", "WebSocket"],
        },
      ]
      setSkillCategories(initialSkills)
      localStorage.setItem("skillCategories", JSON.stringify(initialSkills))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleIconChange = (value: string) => {
    setFormData((prev) => ({ ...prev, icon: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const categoryData: SkillCategory = {
      id: editingCategory?.id || Date.now().toString(),
      title: formData.title,
      icon: formData.icon,
      skills: formData.skills
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s),
    }

    let updatedCategories
    if (editingCategory) {
      updatedCategories = skillCategories.map((cat) => (cat.id === editingCategory.id ? categoryData : cat))
      toast({ title: "Категория навыков обновлена", description: "Изменения успешно сохранены" })
    } else {
      updatedCategories = [...skillCategories, categoryData]
      toast({ title: "Категория навыков добавлена", description: "Новая категория успешно создана" })
    }

    setSkillCategories(updatedCategories)
    localStorage.setItem("skillCategories", JSON.stringify(updatedCategories))
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      icon: "Code",
      skills: "",
    })
    setEditingCategory(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (category: SkillCategory) => {
    setEditingCategory(category)
    setFormData({
      title: category.title,
      icon: category.icon,
      skills: category.skills.join("\n"),
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    const updatedCategories = skillCategories.filter((cat) => cat.id !== id)
    setSkillCategories(updatedCategories)
    localStorage.setItem("skillCategories", JSON.stringify(updatedCategories))
    toast({ title: "Категория навыков удалена", description: "Категория успешно удалена" })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Управление навыками</CardTitle>
              <CardDescription className="text-gray-400">
                Добавляйте, редактируйте и удаляйте категории навыков
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить категорию
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingCategory ? "Редактировать категорию навыков" : "Добавить новую категорию навыков"}
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Заполните информацию о категории навыков
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-gray-300">
                        Название категории *
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Языки программирования"
                        required
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="icon" className="text-gray-300">
                        Иконка
                      </Label>
                      <Select value={formData.icon} onValueChange={handleIconChange}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                          <SelectValue placeholder="Выберите иконку" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {iconOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills" className="text-gray-300">
                      Навыки (каждый с новой строки) *
                    </Label>
                    <textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      placeholder="Python (Django, Django REST Framework)&#10;Java (Spring Boot)&#10;JavaScript (Node.js, React)"
                      required
                      className="w-full min-h-[120px] bg-gray-800/50 border border-gray-700 text-white rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="bg-red-600 hover:bg-red-700">
                      {editingCategory ? "Обновить" : "Создать"} категорию
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category) => (
              <Card key={category.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded">
                        <Code className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {category.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-300">
                        <span className="text-red-500">▹</span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {skillCategories.length === 0 && (
            <div className="text-center py-12">
              <Code className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">У вас пока нет категорий навыков</p>
              <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Добавить первую категорию
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
