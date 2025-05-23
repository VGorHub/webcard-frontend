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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Plus, Edit, Trash2, GraduationCap, Upload, Download } from "lucide-react"

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  period: string
  gpa?: string
  description?: string
  achievements?: string[]
  diploma?: string
  status: "completed" | "in-progress" | "planned"
}

export function EducationManager() {
  const [educations, setEducations] = useState<Education[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    field: "",
    period: "",
    gpa: "",
    description: "",
    achievements: "",
    diploma: "",
    status: "completed" as const,
  })

  useEffect(() => {
    // Загружаем данные из localStorage
    const savedEducations = localStorage.getItem("educations")
    if (savedEducations) {
      setEducations(JSON.parse(savedEducations))
    } else {
      // Устанавливаем начальные данные
      const initialEducations: Education[] = [
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
      ]
      setEducations(initialEducations)
      localStorage.setItem("educations", JSON.stringify(initialEducations))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value as "completed" | "in-progress" | "planned" }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const educationData: Education = {
      id: editingEducation?.id || Date.now().toString(),
      institution: formData.institution,
      degree: formData.degree,
      field: formData.field,
      period: formData.period,
      gpa: formData.gpa || undefined,
      description: formData.description || undefined,
      achievements: formData.achievements
        ? formData.achievements
            .split("\n")
            .map((a) => a.trim())
            .filter((a) => a)
        : undefined,
      diploma: formData.diploma || undefined,
      status: formData.status,
    }

    let updatedEducations
    if (editingEducation) {
      updatedEducations = educations.map((edu) => (edu.id === editingEducation.id ? educationData : edu))
      toast({ title: "Образование обновлено", description: "Изменения успешно сохранены" })
    } else {
      updatedEducations = [...educations, educationData]
      toast({ title: "Образование добавлено", description: "Новая запись успешно создана" })
    }

    setEducations(updatedEducations)
    localStorage.setItem("educations", JSON.stringify(updatedEducations))
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      institution: "",
      degree: "",
      field: "",
      period: "",
      gpa: "",
      description: "",
      achievements: "",
      diploma: "",
      status: "completed",
    })
    setEditingEducation(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (education: Education) => {
    setEditingEducation(education)
    setFormData({
      institution: education.institution,
      degree: education.degree,
      field: education.field,
      period: education.period,
      gpa: education.gpa || "",
      description: education.description || "",
      achievements: education.achievements?.join("\n") || "",
      diploma: education.diploma || "",
      status: education.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    const updatedEducations = educations.filter((edu) => edu.id !== id)
    setEducations(updatedEducations)
    localStorage.setItem("educations", JSON.stringify(updatedEducations))
    toast({ title: "Образование удалено", description: "Запись успешно удалена" })
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Управление образованием</CardTitle>
              <CardDescription className="text-gray-400">
                Добавляйте, редактируйте и удаляйте записи о вашем образовании
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить образование
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingEducation ? "Редактировать образование" : "Добавить новое образование"}
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">Заполните информацию об образовании</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="institution" className="text-gray-300">
                      Учебное заведение *
                    </Label>
                    <Input
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      placeholder="Название университета или колледжа"
                      required
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="degree" className="text-gray-300">
                        Степень/Уровень *
                      </Label>
                      <Input
                        id="degree"
                        name="degree"
                        value={formData.degree}
                        onChange={handleInputChange}
                        placeholder="Бакалавр, Магистр, Специалист"
                        required
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="field" className="text-gray-300">
                        Направление/Специальность *
                      </Label>
                      <Input
                        id="field"
                        name="field"
                        value={formData.field}
                        onChange={handleInputChange}
                        placeholder="Информатика и вычислительная техника"
                        required
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="period" className="text-gray-300">
                        Период обучения *
                      </Label>
                      <Input
                        id="period"
                        name="period"
                        value={formData.period}
                        onChange={handleInputChange}
                        placeholder="2020 - 2024"
                        required
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gpa" className="text-gray-300">
                        Средний балл
                      </Label>
                      <Input
                        id="gpa"
                        name="gpa"
                        value={formData.gpa}
                        onChange={handleInputChange}
                        placeholder="4.5"
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-gray-300">
                        Статус *
                      </Label>
                      <Select value={formData.status} onValueChange={handleStatusChange}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                          <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="completed">Завершено</SelectItem>
                          <SelectItem value="in-progress">В процессе</SelectItem>
                          <SelectItem value="planned">Планируется</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300">
                      Описание
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Дополнительная информация о факультете, кафедре, специализации"
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="achievements" className="text-gray-300">
                      Достижения и дополнительное образование (каждое с новой строки)
                    </Label>
                    <Textarea
                      id="achievements"
                      name="achievements"
                      value={formData.achievements}
                      onChange={handleInputChange}
                      placeholder="Красный диплом&#10;Участие в олимпиадах&#10;Дополнительные курсы"
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diploma" className="text-gray-300">
                      Диплом/Сертификат (URL)
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="diploma"
                        name="diploma"
                        value={formData.diploma}
                        onChange={handleInputChange}
                        placeholder="/path/to/diploma.pdf или https://example.com/diploma.pdf"
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="border-gray-600 text-gray-400 hover:bg-gray-700"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">Загрузите скан диплома или укажите ссылку на него</p>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="bg-red-600 hover:bg-red-700">
                      {editingEducation ? "Обновить" : "Создать"} запись
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
            {educations.map((education) => (
              <Card key={education.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{education.institution}</h3>
                        <p className="text-gray-400">
                          {education.degree} • {education.field}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="border-red-500/30 text-red-400">
                            {education.period}
                          </Badge>
                          {getStatusBadge(education.status)}
                          {education.gpa && (
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              GPA: {education.gpa}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                        onClick={() => handleEdit(education)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        onClick={() => handleDelete(education.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {education.description && <p className="text-gray-300 mb-4">{education.description}</p>}

                  {education.achievements && education.achievements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Достижения:</h4>
                      <ul className="space-y-1">
                        {education.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-400">
                            <span className="text-red-500 mt-1">▹</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {education.diploma && (
                    <div className="flex items-center gap-2 p-3 bg-gray-700/50 rounded border border-gray-600">
                      <GraduationCap className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-300">Диплом прикреплен</span>
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 ml-auto">
                        <Download className="h-3 w-3 mr-1" />
                        Скачать
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {educations.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">У вас пока нет записей об образовании</p>
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
