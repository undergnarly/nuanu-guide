"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Map, MessageSquare, Calendar, Headphones } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"
import React from "react"

type Props = {
  active: string
  onNavigate: (key: string) => void
}

export default function BottomNavigation({ active, onNavigate }: Props) {
  const navItems = [
    {
      key: "map",
      name: "Map",
      icon: Map,
    },
    {
      key: "chat",
      name: "Chat",
      icon: MessageSquare,
    },
    {
      key: "home",
      name: "Home",
      icon: (isActive: boolean) => (
        <motion.div
          className={
            "flex items-center justify-center w-12 h-12 -mt-6 rounded-full shadow-lg"
          }
          animate={isActive ? { background: [
            "linear-gradient(90deg,rgb(135, 11, 146),rgb(180, 81, 131))",
            "linear-gradient(90deg, #ec4899,rgb(201, 90, 16))",
            "linear-gradient(90deg,rgb(167, 78, 18),rgb(131, 24, 158))"
          ] } : { background: "#111" }}
          transition={isActive ? { repeat: Infinity, duration: 3, ease: "linear" } : {}}
          style={{ background: isActive ? undefined : "#111" }}
        >
          <Image src="/nuanu_logo.png" alt="Nuanu Logo" width={32} height={32} className="object-contain" />
        </motion.div>
      ),
    },
    {
      key: "events",
      name: "Events",
      icon: Calendar,
    },
    {
      key: "guides",
      name: "Guides",
      icon: Headphones,
    },
  ]

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-around h-16 px-4 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-full shadow-2xl max-w-md w-[95vw]">
      {navItems.map((item) => {
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
          className={cn(
              "flex flex-col items-center justify-center flex-1 h-full relative focus:outline-none",
              isActive ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400",
          )}
            aria-label={item.name}
        >
            {isActive && item.key !== "home" && (
            <motion.div
              layoutId="navigation-indicator"
                className="absolute bottom-0 w-8 h-1 bg-black dark:bg-white rounded-t-full"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
            {item.key === "home"
              ? (typeof item.icon === 'function' ? item.icon(isActive) : null)
              : React.createElement(item.icon as React.ElementType, { className: 'w-5 h-5' })}
            {item.key !== "home" && <span className="text-xs mt-1">{item.name}</span>}
          </button>
        );
      })}
    </div>
  )
}
