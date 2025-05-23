"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleLinkHoverStart = () => setLinkHovered(true)
    const handleLinkHoverEnd = () => setLinkHovered(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseleave", () => setHidden(true))
    window.addEventListener("mouseenter", () => setHidden(false))

    const addLinkEvents = () => {
      const links = document.querySelectorAll("a, button, [role='button']")
      links.forEach((link) => {
        link.addEventListener("mouseenter", handleLinkHoverStart)
        link.addEventListener("mouseleave", handleLinkHoverEnd)
      })
    }

    // Initial setup
    addLinkEvents()

    // Setup mutation observer to handle dynamically added links
    const observer = new MutationObserver(addLinkEvents)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", () => setHidden(true))
      window.removeEventListener("mouseenter", () => setHidden(false))

      const links = document.querySelectorAll("a, button, [role='button']")
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverStart)
        link.removeEventListener("mouseleave", handleLinkHoverEnd)
      })

      observer.disconnect()
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-red-500 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.5,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-red-500 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: clicked ? 1.5 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 500,
          mass: 0.3,
        }}
      />
    </>
  )
}
