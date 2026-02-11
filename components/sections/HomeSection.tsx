"use client"

import { motion } from "framer-motion"
import { Calendar, Sparkles, TrendingUp, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Headphones, Smartphone, Compass } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import { useRef, useState } from "react"

const featuredEvents = [
  {
    id: 1,
    title: "Contemporary Art Exhibition",
    description: "Immerse yourself in the world of contemporary art at our new exhibition.",
    image: "https://images.unsplash.com/photo-1561488111-5d800fd56b8a?q=80&w=1000",
    date: "March 24",
    time: "19:00",
    price: "Free",
    category: "art",
    rating: 4.8,
    reviews: 47
  },
  {
    id: 2,
    title: "Open-Air Jazz Evening",
    description: "Live jazz music in the cozy atmosphere of our garden.",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=1000",
    date: "March 26",
    time: "20:00",
    price: "350.000 IDR",
    category: "music",
    rating: 4.9,
    reviews: 89
  }
]

const trendingEvents = [
  {
    id: 3,
    title: "Balinese Cooking Masterclass",
    description: "Learn to cook authentic Balinese dishes.",
    image: "https://images.unsplash.com/photo-1540648639573-8c848de23f0a?q=80&w=1000",
    date: "March 28",
    price: "500.000 IDR",
    category: "food",
    rating: 4.7,
    reviews: 124
  },
  {
    id: 4,
    title: "Pottery Workshop",
    description: "Create your own unique ceramic piece.",
    image: "https://images.unsplash.com/photo-1532570204726-d10d25a9ce47?q=80&w=1000",
    date: "March 30",
    price: "400.000 IDR",
    category: "workshops",
    rating: 4.9,
    reviews: 67
  }
]

const stats = [
  { label: "Events", value: "150+", icon: Calendar },
  { label: "Participants", value: "10k+", icon: Users },
  { label: "Rating", value: "4.9", icon: Sparkles },
]

export default function HomeSection() {
  const infoRef = useRef<HTMLDivElement>(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const handleScrollDown = () => {
    if (infoRef.current) {
      infoRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const handleLogout = () => {
    alert('Выход выполнен')
    setProfileOpen(false)
  }

  return (
    <div>
      <div className="relative w-full" style={{ aspectRatio: '9/14', minHeight: '70vh', maxHeight: '100vh' }}>
        <video
          src="/Nuanu.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Top black gradient overlay for hero background (без blur) */}
        <div className="absolute top-0 left-0 w-full h-[15vh] pointer-events-none z-0" style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.0) 100%)'}} />
        {/* Верхний blur удалён */}
        {/* Шапка hero */}
        <div className="sticky top-0 left-0 w-full flex items-center justify-between px-4 pt-3 z-50 bg-transparent" style={{backdropFilter: 'none', WebkitBackdropFilter: 'none'}}>
          <span className="text-lg md:text-xl font-bold text-white drop-shadow-lg">Nuanu Guide</span>
          <button className="flex items-center gap-3 group focus:outline-none" onClick={() => setProfileOpen(true)}>
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border-2 border-white group-hover:ring-2 group-hover:ring-black transition-all">
              <img src="/placeholder-user.jpg" alt="User" className="object-cover w-full h-full" />
            </div>
            <span className="text-white font-medium group-hover:underline">User Name</span>
          </button>
          {profileOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 min-w-[320px] flex flex-col items-center relative">
                <button className="absolute top-3 right-3 text-gray-400 hover:text-black dark:hover:text-white text-2xl" onClick={() => setProfileOpen(false)}>&times;</button>
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center mb-3">
                  <img src="/placeholder-user.jpg" alt="User" className="object-cover w-full h-full" />
                </div>
                <div className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">User Name</div>
                <ThemeToggle />
                <button onClick={handleLogout} className="mt-6 w-full bg-black text-white rounded-full py-2 font-medium hover:bg-neutral-800 transition-colors">Log out</button>
              </div>
            </div>
          )}
        </div>
        <div className="pt-14" />
        {/* Кликабельная стрелочка вниз */}
        <button type="button" onClick={handleScrollDown} className="absolute bottom-6 left-0 w-full flex justify-center z-10 focus:outline-none group bg-transparent pointer-events-auto">
          <span className="animate-bounce text-white/90 text-4xl drop-shadow-lg group-hover:scale-110 transition-transform">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>
      </div>
      <div ref={infoRef} className="relative z-10 min-h-screen pb-16 bg-gray-50 dark:bg-gray-900 overflow-x-hidden" style={{background: 'transparent'}}>
        {/* Статистика */}
        <div className="bg-white dark:bg-gray-800 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
              <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                Nuanu is a creative space where unique events happen every day.
                Here you will find contemporary art exhibitions, music evenings, cooking masterclasses,
                and many other interesting activities.
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center gap-2 min-w-[90px]"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/90 dark:bg-white/10 mb-2">
                    <stat.icon className="w-6 h-6 text-white dark:text-black" />
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* События сегодня */}
        <div className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
                Today's Events
              </h2>
              <Link 
                href="/events" 
                className="text-black hover:text-black transition-colors flex items-center gap-2"
              >
                All events
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide">
                {featuredEvents.map((event) => (
                  <Link key={event.id} href={`/events/${event.id}`} className="flex-none w-[350px] snap-start">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      className="group relative rounded-3xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg h-full"
                    >
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm text-white/90 px-3 py-1 rounded-full bg-black">
                            {event.date}
                          </span>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm">{event.rating}</span>
                            <span className="text-sm text-gray-500">({event.reviews})</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {event.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-black font-medium">{event.price}</span>
                          <span className="text-sm text-gray-500">{event.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Популярные события */}
        <div className="py-16 px-4 bg-gray-100 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8">
              Popular Events
            </h2>
            <div className="relative">
              <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide">
                {trendingEvents.map((event) => (
                  <Link key={event.id} href={`/events/${event.id}`} className="flex-none w-[350px] snap-start">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      className="group relative rounded-3xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg h-full"
                    >
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm text-white/90 px-3 py-1 rounded-full bg-black">
                            {event.date}
                          </span>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm">{event.rating}</span>
                            <span className="text-sm text-gray-500">({event.reviews})</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {event.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-black font-medium">{event.price}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 