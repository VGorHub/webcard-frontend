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
import { Plus, Edit, Trash2, Trophy, Award, Calendar, MapPin, Users, Loader2, X } from "lucide-react"
import { type Achievement, AchievementsService } from "@/lib/services/achievements-service"
import { FileUpload, MultipleFileUpload } from "@/components/file-upload"
import { ALLOWED_DOCUMENT_TYPES, ALLOWED_IMAGE_TYPES, MAX_DOCUMENT_SIZE, MAX_IMAGE_SIZE } from "@/lib/file-upload"

export function AchievementsManager() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    highlight: false,
    date: "",
    location: "",
    fullDescription: "",
    photos: [] as string[],
    certificate: "",
    participants: "",
    position: "",
    organizer: "",
  })

  useEffect(() => {
    loadAchievements()
  }, [])

  const loadAchievements = async () => {
    setIsLoading(true)
    try {
      const data = await AchievementsService.getAllAchievements()
      setAchievements(data)
    } catch (error) {
      console.error("Ошибка при загрузке достижений:", error)
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить достижения. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const achievementData: Achievement = {
        id: editingAchievement?.id,
        title: formData.title,
        description: formData.description,
        highlight: formData.highlight,
        date: formData.date,
        location: formData.location,
        fullDescription: formData.fullDescription,
        photos: formData.photos,
        certificate: formData.certificate || undefined,
        participants: formData.participants ? Number.parseInt(formData.participants) : undefined,
        position: formData.position || undefined,
        organizer: formData.organizer,
      }

      let updatedAchievement
      if (editingAchievement) {
        updatedAchievement = await AchievementsService.updateAchievement(
          editingAchievement.id as string,
          achievementData,
        )
        setAchievements((prev) => prev.map((ach) => (ach.id === editingAchievement.id ? updatedAchievement : ach)))
        toast({ title: "Достижение обновлено", description: "Изменения успешно сохранены" })
      } else {
        updatedAchievement = await AchievementsService.createAchievement(achievementData)
        setAchievements((prev) => [...prev, updatedAchievement])
        toast({ title: "Достижение добавлено", description: "Новое достижение успешно создано" })
      }

      resetForm()
    } catch (error) {
      console.error("Ошибка при сохранении достижения:", error)
      toast({
        title: "Ошибка сохранения",
        description: "Не удалось сохранить достижение. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      highlight: false,
      date: "",
      location: "",
      fullDescription: "",
      photos: [],
      certificate: "",
      participants: "",
      position: "",
      organizer: "",
    })
    setEditingAchievement(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement)
    setFormData({
      title: achievement.title,
      description: achievement.description,
      highlight: achievement.highlight || false,
      date: achievement.date,
      location: achievement.location,
      fullDescription: achievement.fullDescription,
      photos: achievement.photos || [],
      certificate: achievement.certificate || "",
      participants: achievement.participants?.toString() || "",
      position: achievement.position || "",
      organizer: achievement.organizer,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await AchievementsService.deleteAchievement(id)
      setAchievements((prev) => prev.filter((ach) => ach.id !== id))
      toast({ title: "Достижение удалено", description: "Достижение успешно удалено" })
    } catch (error) {
      console.error("Ошибка при удалении достижения:", error)
      toast({
        title: "Ошибка удаления",
        description: "Не удалось удалить достижение. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      })
    }
  }

  const handleCertificateUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, certificate: url }))
  }

  const handlePhotosUpload = (urls: string[]) => {
    setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...urls] }))
  }

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gray-900/70 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Управление достижениями</CardTitle>
              <CardDescription className="text-gray-400">
                Добавляйте, редактируйте и удаляйте ваши достижения
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить достижение
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800 max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingAchievement ? "Редактировать достижение" : "Добавить новое достижение"}
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">Заполните информацию о достижении</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-300">
                      Название достижения *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="1 место на хакатоне IT Academy"
                      required
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
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
                      placeholder="Разработал платформу создания клубов по интересам"
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
                      placeholder="Подробное описание мероприятия, вашего участия и результатов"
                      required
                      className="bg-gray-800/50 border-gray-700 text-white min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-gray-300">
                        Дата мероприятия *
                      </Label>
                      <Input
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        placeholder="22-24 сентября 2023"
                        required
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-gray-300">
                        Место проведения *
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Томск, IT Academy"
                        required
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizer" className="text-gray-300">
                      Организатор *
                    </Label>
                    <Input
                      id="organizer"
                      name="organizer"
                      value={formData.organizer}
                      onChange={handleInputChange}
                      placeholder="IT Academy"
                      required
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="position" className="text-gray-300">
                        Результат/Позиция
                      </Label>
                      <Input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        placeholder="1 место, Участник, Финалист"
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="participants" className="text-gray-300">
                        Количество участников
                      </Label>
                      <Input
                        id="participants"
                        name="participants"
                        type="number"
                        value={formData.participants}
                        onChange={handleInputChange}
                        placeholder="80"
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Фотографии</Label>
                    <div className="space-y-4">
                      {formData.photos.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {formData.photos.map((photo, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={photo || "/placeholder.svg"}
                                alt={`Фото ${index + 1}`}
                                className="w-full h-24 object-cover rounded border border-gray-700"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removePhoto(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      <MultipleFileUpload
                        onUploadComplete={handlePhotosUpload}
                        allowedTypes={ALLOWED_IMAGE_TYPES}
                        maxSize={MAX_IMAGE_SIZE}
                        category="achievements"
                        buttonText="Загрузить фотографии"
                        variant="outline"
                        maxFiles={10}
                      />
                      <p className="text-xs text-gray-500">
                        Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер: 5MB.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Сертификат/Диплом</Label>
                    <div className="space-y-2">
                      {formData.certificate && (
                        <div className="flex items-center gap-4 p-3 bg-gray-800/50 rounded border border-gray-700">
                          <Award className="h-5 w-5 text-yellow-500" />
                          <div className="flex-1">
                            <p className="text-sm text-white">Сертификат загружен</p>
                            <a
                              href={formData.certificate}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-400 hover:underline"
                            >
                              Просмотреть
                            </a>
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => setFormData((prev) => ({ ...prev, certificate: "" }))}
                          >
                            Удалить
                          </Button>
                        </div>
                      )}

                      {!formData.certificate && (
                        <FileUpload
                          onUploadComplete={handleCertificateUpload}
                          allowedTypes={ALLOWED_DOCUMENT_TYPES}
                          maxSize={MAX_DOCUMENT_SIZE}
                          category="certificates"
                          buttonText="Загрузить сертификат"
                          variant="outline"
                        />
                      )}
                      <p className="text-xs text-gray-500">
                        Поддерживаемые форматы: PDF, DOC, DOCX. Максимальный размер: 10MB.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="highlight"
                      name="highlight"
                      checked={formData.highlight}
                      onChange={handleInputChange}
                      className="rounded border-gray-700 bg-gray-800/50 text-red-600 focus:ring-red-500"
                    />
                    <Label htmlFor="highlight" className="text-gray-300">
                      Выделить как особое достижение (золотая иконка)
                    </Label>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Сохранение...
                        </>
                      ) : (
                        <>{editingAchievement ? "Обновить" : "Создать"} достижение</>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="border-gray-600 text-gray-400"
                      disabled={isSaving}
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
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-red-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`bg-gray-800/50 border-gray-700 ${achievement.highlight ? "ring-2 ring-yellow-500/30" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded ${
                            achievement.highlight
                              ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                              : "bg-red-500/10 text-red-500 border border-red-500/20"
                          }`}
                        >
                          {achievement.highlight ? <Trophy className="h-5 w-5" /> : <Award className="h-5 w-5" />}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white line-clamp-2">{achievement.title}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                            <Calendar className="h-3 w-3" />
                            {achievement.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                          onClick={() => handleEdit(achievement)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                          onClick={() => handleDelete(achievement.id as string)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-3 line-clamp-3">{achievement.description}</p>

                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {achievement.location}
                      </div>
                      {achievement.participants && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {achievement.participants} участников
                        </div>
                      )}
                      {achievement.position && (
                        <Badge
                          variant="outline"
                          className={`${
                            achievement.highlight
                              ? "border-yellow-500/30 text-yellow-400"
                              : "border-red-500/30 text-red-400"
                          }`}
                        >
                          {achievement.position}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700">
                      <span className="text-xs text-gray-500">{achievement.organizer}</span>
                      <div className="flex gap-1">
                        {achievement.photos.length > 0 && (
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                            {achievement.photos.length} фото
                          </Badge>
                        )}
                        {achievement.certificate && (
                          <Badge variant="outline" className="text-xs border-green-600 text-green-400">
                            Сертификат
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && achievements.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">У вас пока нет достижений</p>
              <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Добавить первое достижение
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
