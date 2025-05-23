"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HeroSection } from "@/components/hero-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { EducationSection } from "@/components/education-section"
import { ProjectsSection } from "@/components/projects-section"
import { AchievementsSection } from "@/components/achievements-section"
import { ContactSection } from "@/components/contact-section"
import { Cursor } from "@/components/cursor"
import { Navbar } from "@/components/navbar"
import { Loader } from "@/components/loader"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    // Имитация загрузки
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "experience", "skills", "education", "projects", "achievements", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <Cursor />
      <AnimatePresence>
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black text-white overflow-hidden"
          >
            <Navbar activeSection={activeSection} />
            <HeroSection />
            <ExperienceSection />
            <SkillsSection />
            <EducationSection />
            <ProjectsSection />
            <AchievementsSection />
            <ContactSection />

            <footer className="border-t border-red-800 bg-black py-6">
              <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <motion.p
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  © {new Date().getFullYear()} Владимир Горохов. Все права защищены.
                </motion.p>
                <motion.div
                  className="flex items-center gap-4 mt-4 md:mt-0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <a href="/login" className="text-sm text-gray-500 hover:text-red-500 transition-colors duration-300">
                    Вход
                  </a>
                </motion.div>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}
