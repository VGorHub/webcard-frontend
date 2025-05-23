"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height

        setMousePosition({ x: e.clientX, y: e.clientY })
        mouseX.set(x * 20)
        mouseY.set(y * 20)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-red-900 opacity-80"></div>

        {/* Animated grid */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
              style={{ top: `${i * 5}vh` }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-red-500/20 to-transparent"
              style={{ left: `${i * 5}vw` }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div style={{ x: springX, y: springY }} className="flex flex-col items-center md:items-start">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-sm md:text-base uppercase tracking-[0.3em] text-red-500 mb-2 font-mono">
                Backend разработчик
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                Горохов Владимир
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-gray-400 mb-8 max-w-lg text-center md:text-left text-lg">
                Амбициозный и целеустремлённый разработчик с опытом создания backend-приложений на Python/Django и Java
                Spring Boot. Стремлюсь применять свои навыки и знания в сфере автоматизации и разработки комплексных
                систем.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white border-none rounded-none px-8 py-6 relative overflow-hidden group"
                onClick={scrollToContact}
              >
                <span className="absolute inset-0 w-0 bg-white group-hover:w-full transition-all duration-500 ease-out opacity-10"></span>
                <span className="relative z-10 text-lg">Связаться со мной</span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white rounded-none px-8 py-6 relative overflow-hidden group"
                asChild
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <span className="absolute inset-0 w-0 bg-red-600 group-hover:w-full transition-all duration-500 ease-out opacity-10"></span>
                  <span className="relative z-10 text-lg">Скачать резюме</span>
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ x: springX.get() * -2, y: springY.get() * -2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-red-500/30 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
              <Image
                src="/images/photo.jpg"
                alt="Владимир Горохов"
                fill
                className="object-cover"
                priority
              />

              {/* Glitch effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-transparent mix-blend-overlay"></div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-transparent mix-blend-difference"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="flex justify-center mt-16"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 border border-red-500/20 rounded-full h-12 w-12"
              onClick={() => {
                document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <ChevronDown className="h-6 w-6" />
              <span className="sr-only">Прокрутить вниз</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
