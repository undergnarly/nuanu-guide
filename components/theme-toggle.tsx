"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="relative inline-flex h-10 rounded-full bg-gray-100 dark:bg-gray-800">
      <button
        onClick={() => setTheme("light")}
        className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
          theme === "light" ? "text-yellow-500" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        }`}
      >
        <Sun className="h-5 w-5" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
          theme === "dark" ? "text-purple-500" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        }`}
      >
        <Moon className="h-5 w-5" />
      </button>
    </div>
  )
} 