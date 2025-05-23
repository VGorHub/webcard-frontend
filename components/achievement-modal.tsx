"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Calendar, MapPin, Users, Award, Download } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  highlight?: boolean
  date: string
  location: string
  fullDescription: string
  photos: string[]
  certificate?: string
  participants?: number
  position?: string
  organizer: string
}

interface AchievementModalProps {
  achievement: Achievement | null
  isOpen: boolean
  onClose: () => void
}

export function AchievementModal({ achievement, isOpen, onClose }: AchievementModalProps) {
  if (!achievement) return null

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

              <div className="p-6 border-b border-gray-800">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      achievement.highlight
                        ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                        : "bg-red-500/10 text-red-500 border border-red-500/20"
                    }`}
                  >
                    {achievement.highlight ? <Award className="h-8 w-8" /> : <Award className="h-8 w-8" />}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-2">{achievement.title}</h2>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {achievement.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {achievement.location}
                      </div>
                      {achievement.participants && (
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {achievement.participants} участников
                        </div>
                      )}
                    </div>
                    {achievement.position && (
                      <Badge
                        variant="outline"
                        className={`mt-2 ${
                          achievement.highlight
                            ? "border-yellow-500/30 text-yellow-400"
                            : "border-red-500/30 text-red-400"
                        }`}
                      >
                        {achievement.position}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">О мероприятии</h3>
                  <p className="text-gray-400 leading-relaxed mb-3">{achievement.fullDescription}</p>
                  <p className="text-sm text-gray-500">
                    <strong>Организатор:</strong> {achievement.organizer}
                  </p>
                </div>

                {achievement.photos.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Фотографии с мероприятия</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {achievement.photos.map((photo, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg border border-gray-800 group">
                          <img
                            src={photo || "/placeholder.png"}
                            alt={`Фото ${index + 1}`}
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button size="sm" variant="outline" className="border-white/20 text-white">
                              Увеличить
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {achievement.certificate && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Подтверждение участия</h3>
                    <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="relative w-24 h-32 overflow-hidden rounded border border-gray-600">
                        <img
                          src={achievement.certificate || "/placeholder.png"}
                          alt="Сертификат"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white mb-1">Сертификат участника</h4>
                        <p className="text-sm text-gray-400 mb-3">Официальное подтверждение участия в мероприятии</p>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <Download className="h-4 w-4 mr-2" />
                          Скачать сертификат
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
