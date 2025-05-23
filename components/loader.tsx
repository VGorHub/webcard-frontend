"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return prevProgress + 5
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white">
          <span className="text-red-500">В</span>ладимир <span className="text-red-500">Г</span>орохов
        </h1>

        <div className="w-64 md:w-96 h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-red-500" />
        </div>

        <p className="text-gray-400 text-sm md:text-base">Загрузка... {progress}%</p>
      </motion.div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            className="absolute w-2 h-2 bg-red-500 rounded-full"
          />
        ))}
      </div>
    </div>
  )
}
