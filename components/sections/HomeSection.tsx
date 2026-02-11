"use client"

import { motion } from "framer-motion"
import { Calendar, Sparkles, Users, User, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import ThemeToggle from "@/components/theme-toggle"
import { useRef, useState, useEffect, useCallback } from "react"
import { EVENTS } from "@/lib/event-data"

const featuredEvents = EVENTS.slice(0, 2)
const trendingEvents = EVENTS.slice(2, 5)

const stats = [
  { label: "Events", value: "150+", icon: Calendar },
  { label: "Participants", value: "10k+", icon: Users },
  { label: "Rating", value: "4.9", icon: Sparkles },
]

function useScrollIndicators(ref: React.RefObject<HTMLDivElement | null>) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [ref])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    update()
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [ref, update])

  const scrollBy = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 300, behavior: "smooth" })
  }

  return { canScrollLeft, canScrollRight, scrollBy }
}

function ScrollArrows({ canLeft, canRight, onScroll }: { canLeft: boolean; canRight: boolean; onScroll: (dir: number) => void }) {
  if (!canLeft && !canRight) return null
  return (
    <>
      {canLeft && (
        <button
          onClick={() => onScroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white shadow-md hover:bg-black/70 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {canRight && (
        <button
          onClick={() => onScroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white shadow-md hover:bg-black/70 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </>
  )
}

export default function HomeSection() {
  const infoRef = useRef<HTMLDivElement>(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const upcomingRef = useRef<HTMLDivElement>(null)
  const moreRef = useRef<HTMLDivElement>(null)
  const upcoming = useScrollIndicators(upcomingRef)
  const more = useScrollIndicators(moreRef)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleScrollDown = () => {
    if (infoRef.current) {
      infoRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const handleLogout = () => {
    alert('Logged out successfully')
    setProfileOpen(false)
  }

  return (
    <div>
      {/* Fixed header */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 pt-3 pb-3 transition-colors duration-300"
        style={{ background: scrolled ? 'rgba(0,0,0,0.7)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none' }}
      >
        <span className="text-lg md:text-xl font-bold text-white drop-shadow-lg">Nuanu Guide</span>
        <button className="flex items-center gap-3 group focus:outline-none" onClick={() => setProfileOpen(true)}>
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border-2 border-white group-hover:ring-2 group-hover:ring-black transition-all">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <span className="text-white font-medium group-hover:underline drop-shadow-lg">User Name</span>
        </button>
      </div>
      {profileOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 min-w-[320px] flex flex-col items-center relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-black dark:hover:text-white text-2xl" onClick={() => setProfileOpen(false)}>&times;</button>
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center mb-3">
              <User className="w-5 h-5 text-gray-500" />
            </div>
            <div className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">User Name</div>
            <ThemeToggle />
            <button onClick={handleLogout} className="mt-6 w-full bg-black text-white rounded-full py-2 font-medium hover:bg-neutral-800 transition-colors">Log out</button>
          </div>
        </div>
      )}

      <div className="relative w-full" style={{ aspectRatio: '9/14', minHeight: '70vh', maxHeight: '100vh' }}>
        <video
          src="/Nuanu.mp4"
          poster="/nuanu-poster.webp"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute top-0 left-0 w-full h-[15vh] pointer-events-none z-0" style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.0) 100%)'}} />
        <div className="absolute bottom-0 left-0 w-full h-[35vh] pointer-events-none z-0" style={{background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.0) 100%)'}} />
        <div className="absolute bottom-20 left-0 right-0 px-5 z-10 pointer-events-none">
          <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg leading-tight">Welcome to Nuanu!</h2>
          <p className="text-sm sm:text-base text-white/80 mt-2 drop-shadow-md max-w-sm">Explore Bali&apos;s creative oceanfront city with us</p>
        </div>
        <button type="button" onClick={handleScrollDown} className="absolute bottom-6 left-0 w-full flex justify-center z-10 focus:outline-none group bg-transparent pointer-events-auto">
          <span className="animate-bounce text-white/90 text-4xl drop-shadow-lg group-hover:scale-110 transition-transform">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>
      </div>
      <div ref={infoRef} className="relative z-10 min-h-screen pb-16 bg-background overflow-x-hidden" style={{backgroundColor: 'hsl(38, 33%, 96%)'}}>
        {/* Statistics */}
        <div className="bg-white dark:bg-gray-800 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
              <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                Nuanu is a 44-hectare creative oceanfront community in Bali.
                Discover cultural events, art exhibitions, sound healing, immersive performances,
                and many other unique experiences.
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

        {/* Upcoming Events */}
        <div className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Upcoming Events
              </h2>
            </div>
            <div className="relative">
              <ScrollArrows canLeft={upcoming.canScrollLeft} canRight={upcoming.canScrollRight} onScroll={upcoming.scrollBy} />
              <div ref={upcomingRef} className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide">
                {featuredEvents.map((event) => (
                  <div key={event.id} className="flex-none w-[350px] snap-start">
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
                          sizes="350px"
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
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-black dark:text-white font-medium">{event.price}</span>
                          <span className="text-sm text-gray-500">{event.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* More Events */}
        <div className="py-16 px-4 bg-white/60 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              More Experiences
            </h2>
            <div className="relative">
              <ScrollArrows canLeft={more.canScrollLeft} canRight={more.canScrollRight} onScroll={more.scrollBy} />
              <div ref={moreRef} className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide">
                {trendingEvents.map((event) => (
                  <div key={event.id} className="flex-none w-[350px] snap-start">
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
                          sizes="350px"
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
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-black dark:text-white font-medium">{event.price}</span>
                          <span className="text-sm text-gray-500">{event.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
