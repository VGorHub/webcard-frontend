"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Lock } from "lucide-react"
import { AuthService } from "@/lib/auth-service"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [glitchEffect, setGlitchEffect] = useState(false)

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    if (AuthService.isAuthenticated()) {
      router.push("/admin")
    }

    // Создаем эффект глитча при ошибке входа
    const glitchInterval = setInterval(() => {
      if (glitchEffect) {
        setGlitchEffect(false)
      }
    }, 1000)

    return () => clearInterval(glitchInterval)
  }, [glitchEffect, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await AuthService.login({ username, password })
      toast({
        title: "Успешный вход",
        description: "Вы успешно вошли в систему",
      })
      router.push("/admin")
    } catch (error) {
      setGlitchEffect(true)
      toast({
        title: "Ошибка входа",
        description: "Неверное имя пользователя или пароль",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[url('/images/matrix.png')] opacity-5 mix-blend-screen"></div>

        {/* Animated grid */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
              style={{
                top: `${i * 5}vh`,
                animationDelay: `${i * 0.1}s`,
                animation: "pulse 8s infinite ease-in-out",
              }}
            ></div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          animate={{
            x: glitchEffect ? [0, -5, 5, -5, 5, 0] : 0,
            filter: glitchEffect
              ? [
                  "hue-rotate(0deg)",
                  "hue-rotate(90deg)",
                  "hue-rotate(180deg)",
                  "hue-rotate(270deg)",
                  "hue-rotate(0deg)",
                ]
              : "hue-rotate(0deg)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-800 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"></div>

            <CardHeader className="space-y-1 text-center relative z-10">
              <div className="flex justify-center mb-2">
                <div className="p-3 rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
                  <Lock className="h-6 w-6" />
                </div>
              </div>
              <CardTitle className="text-2xl text-white">Вход в панель администратора</CardTitle>
              <CardDescription className="text-gray-400">
                Введите свои учетные данные для доступа к панели администратора
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 relative z-10">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300">
                    Имя пользователя
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Введите имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-300">
                      Пароль
                    </Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col relative z-10">
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white border-none relative overflow-hidden group"
                  disabled={isLoading}
                >
                  <span className="absolute inset-0 w-0 bg-white group-hover:w-full transition-all duration-500 ease-out opacity-10"></span>
                  {isLoading ? (
                    <span className="flex items-center gap-2 relative z-10">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Вход...
                    </span>
                  ) : (
                    <span className="relative z-10">Войти</span>
                  )}
                </Button>
                <p className="mt-4 text-center text-sm text-gray-400">
                  <Link href="/" className="hover:text-red-400 transition-colors duration-300">
                    Вернуться на главную
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
