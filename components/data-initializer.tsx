"use client"

import { useEffect } from "react"
import { initializeData } from "@/lib/data-initializer"

export function DataInitializer() {
  useEffect(() => {
    initializeData()
  }, [])

  return null
}
