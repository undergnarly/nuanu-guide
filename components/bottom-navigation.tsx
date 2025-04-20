"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Map, MessageSquare, Calendar, Headphones } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"

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
      icon: (isActive: boolean) => (
        <motion.div
          className={
            "flex items-center justify-center w-12 h-12 -mt-6 rounded-full shadow-lg"
          }
          animate={isActive ? { background: [
            "linear-gradient(90deg, #7c3aed, #f59e42)",
            "linear-gradient(90deg, #f59e42, #7c3aed)",
            "linear-gradient(90deg, #7c3aed, #f59e42)"
          ] } : { background: "#111" }}
          transition={isActive ? { repeat: Infinity, duration: 2, ease: "linear" } : {}}
          style={{ background: isActive ? undefined : "#111" }}
        >
          <Image src="/nuanu_logo.png" alt="Nuanu Logo" width={32} height={32} className="object-contain" />
        </motion.div>
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
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-around h-16 px-4 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-full shadow-2xl max-w-md w-[95vw]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full relative",
              isActive ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400",
            )}
          >
            {isActive && item.name !== "Home" && (
              <motion.div
                layoutId="navigation-indicator"
                className="absolute bottom-0 w-8 h-1 bg-black dark:bg-white rounded-t-full"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            {item.name === "Home"
              ? item.icon(isActive)
              : <item.icon className={cn("w-5 h-5", item.name === "Home" ? "w-6 h-6" : "w-5 h-5")} />}
            {item.name !== "Home" && <span className="text-xs mt-1">{item.name}</span>}
          </Link>
        );
      })}
    </div>
  )
}
