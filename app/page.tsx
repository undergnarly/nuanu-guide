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
import { useRef } from "react"

const featuredEvents = [
  {
    id: 1,
    title: "Выставка современного искусства",
    description: "Погрузитесь в мир современного искусства на нашей новой выставке.",
    image: "https://images.unsplash.com/photo-1561488111-5d800fd56b8a?q=80&w=1000",
    date: "24 марта",
    time: "19:00",
    price: "Бесплатно",
    category: "art",
    rating: 4.8,
    reviews: 47
  },
  {
    id: 2,
    title: "Джазовый вечер под открытым небом",
    description: "Живая джазовая музыка в уютной атмосфере нашего сада.",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=1000",
    date: "26 марта",
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
    title: "Кулинарный мастер-класс",
    description: "Научитесь готовить аутентичные балийские блюда.",
    image: "https://images.unsplash.com/photo-1540648639573-8c848de23f0a?q=80&w=1000",
    date: "28 марта",
    price: "500.000 IDR",
    category: "food",
    rating: 4.7,
    reviews: 124
  },
  {
    id: 4,
    title: "Мастер-класс по гончарному искусству",
    description: "Создайте свое уникальное керамическое изделие.",
    image: "https://images.unsplash.com/photo-1532570204726-d10d25a9ce47?q=80&w=1000",
    date: "30 марта",
    price: "400.000 IDR",
    category: "workshops",
    rating: 4.9,
    reviews: 67
  }
]

const stats = [
  { label: "Мероприятий", value: "150+", icon: Calendar },
  { label: "Участников", value: "10k+", icon: Users },
  { label: "Рейтинг", value: "4.9", icon: Sparkles },
]

export default function Home() {
  const infoRef = useRef<HTMLDivElement>(null)
  const handleScrollDown = () => {
    if (infoRef.current) {
      infoRef.current.scrollIntoView({ behavior: 'smooth' })
    }
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
        {/* Top blur only for hero background */}
        <div className="absolute top-0 left-0 w-full h-[15vh] pointer-events-none z-0 blur-overlay"
          style={{maskImage: 'linear-gradient(to bottom, black, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)'}} />
        {/* Шапка hero */}
        <div className="sticky top-0 left-0 w-full flex items-center justify-between px-4 pt-3 z-50 bg-transparent" style={{backdropFilter: 'none', WebkitBackdropFilter: 'none'}}>
          <span className="text-lg md:text-xl font-bold text-white drop-shadow-lg">Nuanu Guide</span>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              <img src="/placeholder-user.jpg" alt="User" className="object-cover w-full h-full" />
            </div>
            <span className="text-white font-medium">User Name</span>
          </div>
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
        <div className="bg-white dark:bg-gray-800 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
              <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                Nuanu — это творческое пространство, где каждый день происходят уникальные события. 
                Здесь вы найдете выставки современного искусства, музыкальные вечера, кулинарные мастер-классы 
                и множество других интересных мероприятий.
              </p>
            </div>
            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex justify-start sm:justify-center items-center divide-x divide-gray-200 dark:divide-gray-700 min-w-max">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="px-4 sm:px-8 flex items-center gap-2 sm:gap-3"
                  >
                    <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 text-purple-500 flex-shrink-0" />
                    <div className="text-left">
                      <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* События сегодня */}
        <div className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
                События сегодня
              </h2>
              <Link 
                href="/events" 
                className="text-purple-500 hover:text-purple-600 transition-colors flex items-center gap-2"
              >
                Все события
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
                          <span className="text-sm text-white/90 px-3 py-1 rounded-full bg-purple-500">
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
                          <span className="text-purple-500 font-medium">{event.price}</span>
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
              Популярные события
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
                          <span className="text-sm text-white/90 px-3 py-1 rounded-full bg-purple-500">
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
                          <span className="text-purple-500 font-medium">{event.price}</span>
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
