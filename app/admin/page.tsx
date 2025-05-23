"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { AdminHeader } from "@/components/admin-header"
import { ProjectsManager } from "@/components/projects-manager"
import { MessagesManager } from "@/components/messages-manager"
import { ExperienceManager } from "@/components/experience-manager"
import { SkillsManager } from "@/components/skills-manager"
import { EducationManager } from "@/components/education-manager"
import { AchievementsManager } from "@/components/achievements-manager"
import { Loader2, Save } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Форма для персональной информации
  const [personalInfo, setPersonalInfo] = useState({
    name: "Горохов Владимир",
    title: "Backend разработчик",
    bio: "Амбициозный и целеустремлённый разработчик с опытом создания backend-приложений на Python/Django и Java Spring Boot. Стремлюсь применять свои навыки и знания в сфере автоматизации и разработки комплексных систем.",
    phone: "+7 (909) 540 41 41",
    email: "vova-gorohov04@mail.ru",
    location: "Томск, Россия",
  })

  // Проверка аутентификации
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem("isAuthenticated")
      if (isAuthenticated !== "true") {
        router.push("/login")
      } else {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSavePersonalInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Сохраняем в localStorage
    localStorage.setItem("personalInfo", JSON.stringify(personalInfo))

    // Имитация сохранения данных
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Изменения сохранены",
      description: "Персональная информация успешно обновлена",
    })

    setIsSaving(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminHeader onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8"
        >
          Панель администратора
        </motion.h1>

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="bg-gray-900 border border-gray-800 flex-wrap">
            <TabsTrigger value="personal" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Персональная информация
            </TabsTrigger>
            <TabsTrigger value="experience" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Опыт работы
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Навыки
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Образование
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Достижения
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Проекты
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Сообщения
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="bg-gray-900/70 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Персональная информация</CardTitle>
                  <CardDescription className="text-gray-400">
                    Обновите вашу персональную информацию, которая отображается на сайте
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSavePersonalInfo} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">
                          Имя и фамилия
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={personalInfo.name}
                          onChange={handlePersonalInfoChange}
                          className="bg-gray-800/50 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-gray-300">
                          Должность
                        </Label>
                        <Input
                          id="title"
                          name="title"
                          value={personalInfo.title}
                          onChange={handlePersonalInfoChange}
                          className="bg-gray-800/50 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-gray-300">
                        О себе
                      </Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={personalInfo.bio}
                        onChange={handlePersonalInfoChange}
                        className="min-h-[100px] bg-gray-800/50 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-300">
                          Телефон
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={personalInfo.phone}
                          onChange={handlePersonalInfoChange}
                          className="bg-gray-800/50 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={personalInfo.email}
                          onChange={handlePersonalInfoChange}
                          className="bg-gray-800/50 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-gray-300">
                          Город
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          value={personalInfo.location}
                          onChange={handlePersonalInfoChange}
                          className="bg-gray-800/50 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white relative overflow-hidden group"
                        disabled={isSaving}
                      >
                        <span className="absolute inset-0 w-0 bg-white group-hover:w-full transition-all duration-500 ease-out opacity-10"></span>
                        {isSaving ? (
                          <span className="flex items-center gap-2 relative z-10">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Сохранение...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 relative z-10">
                            <Save className="h-4 w-4" />
                            Сохранить изменения
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-gray-900/70 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Фотография профиля</CardTitle>
                  <CardDescription className="text-gray-400">Загрузите новую фотографию профиля</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-red-500/30">
                      <img
                        src="/placeholder.png?height=96&width=96"
                        alt="Фото профиля"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        Загрузить новое фото
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-500/10">
                        Удалить фото
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceManager />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsManager />
          </TabsContent>

          <TabsContent value="education">
            <EducationManager />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementsManager />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
