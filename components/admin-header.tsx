"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import { AuthService } from "@/lib/auth-service"
import { useRouter } from "next/navigation"

interface AdminHeaderProps {
  onLogout?: () => void
}

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await AuthService.logout()
      if (onLogout) {
        onLogout()
      } else {
        router.push("/login")
      }
    } catch (error) {
      console.error("Ошибка при выходе из системы:", error)
    }
  }

  return (
    <header className="border-b border-gray-800 bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-3 flex items-center justify-between"
      >
        <Link href="/admin" className="font-bold text-lg flex items-center gap-2 text-white">
          <User className="h-5 w-5 text-red-500" />
          <span>Панель администратора</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
            Просмотр сайта
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Выйти
          </Button>
        </div>
      </motion.div>
    </header>
  )
}
