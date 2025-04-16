"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Map, MessageSquare, Calendar, Headphones } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Map",
      href: "/map",
      icon: Map,
    },
    {
      name: "Chat",
      href: "/chat",
      icon: MessageSquare,
    },
    {
      name: "Home",
      href: "/",
      icon: () => (
        <div className="flex items-center justify-center w-12 h-12 -mt-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
      ),
    },
    {
      name: "Events",
      href: "/events",
      icon: Calendar,
    },
    {
      name: "Guides",
      href: "/guides",
      icon: Headphones,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around h-16 px-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 dark:bg-gray-950/95 dark:border-gray-800">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full relative",
            pathname === item.href ? "text-purple-600 dark:text-purple-400" : "text-gray-500 dark:text-gray-400",
          )}
        >
          {pathname === item.href && item.name !== "Home" && (
            <motion.div
              layoutId="navigation-indicator"
              className="absolute bottom-0 w-8 h-1 bg-purple-600 dark:bg-purple-400 rounded-t-full"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <item.icon className={cn("w-5 h-5", item.name === "Home" ? "w-6 h-6" : "w-5 h-5")} />
          {item.name !== "Home" && <span className="text-xs mt-1">{item.name}</span>}
        </Link>
      ))}
    </div>
  )
}
