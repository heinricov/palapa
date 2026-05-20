"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@workspace/ui/components/button"

export default function ButtonTheme() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent SSR flicker and hydration mismatch
  if (!mounted) {
    return <Button variant="ghost" className="rounded-full" size="icon" />
  }

  return (
    <Button
      variant="ghost"
      className="rounded-full"
      onClick={toggleTheme}
      size="icon"
    >
      {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
