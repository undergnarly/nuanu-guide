"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, User, Users, Calendar as CalendarIcon, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SUPPORTED_LANGUAGES } from "@/lib/audio-guide-data"

interface GuidesSectionProps {
  onOpenAudioGuide?: (slug: string, lang: string) => void
}

// Minimalist flag component as circular tricolors
const FlagIcon = ({ code, size = 24 }: { code: string; size?: number }) => {
  const flags = {
    en: {
      colors: ['#B22234', '#FFFFFF', '#3C3B6E'],
      type: 'horizontal'
    },
    ru: {
      colors: ['#FFFFFF', '#0039A6', '#D52B1E'],
      type: 'horizontal'
    },
    id: {
      colors: ['#FF0000', '#FFFFFF'],
      type: 'horizontal'
    }
  }

  const flag = flags[code as keyof typeof flags]
  if (!flag) return null

  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
      {flag.colors.map((color, index) => {
        const segmentHeight = 24 / flag.colors.length
        const y = index * segmentHeight

        return (
          <g key={index}>
            <defs>
              <clipPath id={`clip-${code}-${index}`}>
                <circle cx="12" cy="12" r="10.5"/>
              </clipPath>
            </defs>
            <rect
              x="1.5"
              y={y}
              width="21"
              height={segmentHeight}
              fill={color}
              clipPath={`url(#clip-${code}-${index})`}
            />
          </g>
        )
      })}
    </svg>
  )
}

// Experience categories data
const EXPERIENCE_CATEGORIES = [
  {
    id: 'experiences',
    title: {
      en: 'Experiences',
      ru: 'Впечатления',
      id: 'Pengalaman'
    },
    description: {
      en: 'Discover unique activities and adventures in Nuanu Creative Village',
      ru: 'Откройте для себя уникальные активности и приключения в Nuanu Creative Village',
      id: 'Temukan aktivitas dan petualangan unik di Nuanu Creative Village'
    },
    videoUrl: '/videos/experiences.mp4',
    imageUrl: '/images/guides/art_village.jpg'
  },
  {
    id: 'accommodation',
    title: {
      en: 'Accommodation',
      ru: 'Размещение',
      id: 'Akomodasi'
    },
    description: {
      en: 'Find your perfect stay in our creative spaces',
      ru: 'Найдите идеальное место для проживания в наших креативных пространствах',
      id: 'Temukan tempat tinggal sempurna Anda di ruang kreatif kami'
    },
    videoUrl: '/videos/accommodation.mp4',
    imageUrl: '/images/guides/pacha-alpaca-new.jpg'
  },
  {
    id: 'food',
    title: {
      en: 'Food Venues',
      ru: 'Рестораны',
      id: 'Tempat Makan'
    },
    description: {
      en: 'Explore diverse culinary experiences and dining options',
      ru: 'Исследуйте разнообразные кулинарные впечатления и варианты питания',
      id: 'Jelajahi pengalaman kuliner yang beragam dan pilihan tempat makan'
    },
    videoUrl: '/videos/food.mp4',
    imageUrl: '/images/guides/horizon.jpg'
  }
]

export default function GuidesSection({ onOpenAudioGuide }: GuidesSectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [visitDate, setVisitDate] = useState<Date | null>(null)
  const [visitTiming, setVisitTiming] = useState<"now" | "later" | null>(null)
  const [peopleCount, setPeopleCount] = useState(1)
  const [knobRotation, setKnobRotation] = useState(0)
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleNextStep = () => {
    console.log('Selected categories:', selectedCategories)
    console.log('Visit timing:', visitTiming)
    console.log('Visit date:', visitDate)
    console.log('People count:', peopleCount)
    // TODO: Navigate to next step
  }

  // Calendar helpers
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  useEffect(() => {
    const observers = EXPERIENCE_CATEGORIES.map((category) => {
      const element = document.getElementById(`card-${category.id}`)
      if (!element) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveCardId(category.id)
            }
          })
        },
        {
          threshold: [0, 0.5, 1],
          rootMargin: '-20% 0px -20% 0px'
        }
      )

      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  useEffect(() => {
    // Управление воспроизведением видео
    Object.keys(videoRefs.current).forEach((key) => {
      const video = videoRefs.current[key]
      if (video) {
        if (key === activeCardId) {
          video.play().catch(() => {
            // Ignore autoplay errors
          })
        } else {
          video.pause()
        }
      }
    })
  }, [activeCardId])

  return (
    <div className="min-h-screen">
      {/* Sticky Header with Title and Language Selector */}
      <div className="fixed top-6 left-0 right-0 z-40 px-4 pointer-events-none">
        <div className="max-w-xl mx-auto relative">
          {/* Choose your experience block - centered - hide when categories selected */}
          {selectedCategories.length === 0 && (
            <div className="flex justify-center">
              <div className="rounded-full px-5 py-3 shadow-xl backdrop-blur-md bg-white/70 dark:bg-gray-900/70 pointer-events-auto">
                <span className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  Choose your experience
                </span>
              </div>
            </div>
          )}

          {/* Language selector block - absolute positioned right */}
          <DropdownMenu modal={true}>
            <DropdownMenuTrigger asChild>
              <button className="absolute right-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 pointer-events-auto">
                <FlagIcon code={selectedLanguage} size={28} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              side="bottom"
              sideOffset={20}
              className="w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-2"
              style={{
                position: 'fixed',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {SUPPORTED_LANGUAGES.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => setSelectedLanguage(language.code)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-2xl ${
                    selectedLanguage === language.code
                      ? 'bg-gray-100 dark:bg-gray-800'
                      : ''
                  }`}
                >
                  <FlagIcon code={language.code} size={24} />
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{language.native_name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{language.name}</span>
                  </div>
                  {selectedLanguage === language.code && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-black dark:bg-white" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Spacer for sticky header */}
      <div className="h-24" />

      {/* Fullscreen Experience Cards */}
      <div className="container px-4 space-y-6 pb-32">
        {EXPERIENCE_CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category.id)
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative max-w-xl mx-auto"
              id={`card-${category.id}`}
            >
              <div
                className={`relative h-[70vh] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] ${
                  isSelected ? 'ring-4 ring-black dark:ring-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]' : ''
                }`}
                onClick={() => toggleCategory(category.id)}
              >
                {/* Video Background */}
                <div className="absolute inset-0 pointer-events-none">
                  <video
                    ref={(el) => {
                      videoRefs.current[category.id] = el
                    }}
                    className="w-full h-full object-cover pointer-events-none"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src="/video/lv_0_20251022190538.mp4" type="video/mp4" />
                  </video>
                </div>

                {/* Gradient overlay - blur and darkening from top to bottom */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none" />
                <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-b from-transparent to-black/60 pointer-events-none"
                     style={{ maskImage: 'linear-gradient(to bottom, transparent 40%, black 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 40%, black 100%)' }} />

                {/* Selection Checkbox */}
                <div className="absolute top-6 right-6 z-10">
                  <div className={`w-10 h-10 rounded-full backdrop-blur-md transition-all flex items-center justify-center ${
                    isSelected
                      ? 'bg-white dark:bg-white shadow-lg'
                      : 'bg-white/30 dark:bg-gray-900/30'
                  }`}>
                    {isSelected && (
                      <Check className="w-6 h-6 text-black stroke-[3]" />
                    )}
                  </div>
                </div>

                {/* Content - Title and Description */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                  <h2 className="font-serif text-white mb-3" style={{ fontSize: '2rem', lineHeight: '2.5rem', fontWeight: 700 }}>
                    {category.title[selectedLanguage as keyof typeof category.title]}
                  </h2>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {category.description[selectedLanguage as keyof typeof category.description]}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* When Section */}
      {selectedCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container px-4 pb-8"
        >
          <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">When</h3>

            <div className="flex gap-4 mb-8">
              <button
                onClick={() => {
                  setVisitTiming("now")
                  setVisitDate(null)
                }}
                className={`flex-1 py-4 px-6 rounded-2xl font-medium transition-all duration-300 ${
                  visitTiming === "now"
                    ? 'bg-black text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:scale-105'
                }`}
              >
                Now
              </button>
              <button
                onClick={() => {
                  setVisitTiming("later")
                  setShowCalendar(true)
                }}
                className={`flex-1 py-4 px-6 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  visitTiming === "later"
                    ? 'bg-black text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:scale-105'
                }`}
              >
                <CalendarIcon className="w-5 h-5" />
                Choose Date
              </button>
            </div>

            {/* People Count Volume Knob */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">How many people?</h4>

              <div className="flex items-center justify-center gap-12">
                <div className="flex flex-col items-center gap-2">
                  <User className="w-6 h-6 text-gray-400" />
                  <span className="text-xs font-bold text-gray-400 uppercase">Min</span>
                </div>

                <div className="relative">
                  {/* Outer ring with tick marks */}
                  <div className="absolute inset-0 w-48 h-48">
                    {Array.from({ length: 10 }).map((_, i) => {
                      const angle = -135 + (i * 270) / 9
                      const isActive = i < peopleCount
                      return (
                        <div
                          key={i}
                          className="absolute left-1/2 top-1/2 w-1 h-3 -ml-0.5 origin-bottom transition-all duration-300"
                          style={{
                            transform: `rotate(${angle}deg) translateY(-96px)`,
                            backgroundColor: isActive
                              ? 'rgb(40, 40, 40)'
                              : 'rgb(161, 161, 161)',
                            opacity: isActive ? 1 : 0.4,
                            height: i % 1 === 0 ? '14px' : '10px'
                          }}
                        />
                      )
                    })}
                  </div>

                  {/* Main knob container with shadows */}
                  <div className="w-48 h-48 rounded-full relative" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(0,0,0,0.45) 100%)',
                    boxShadow: '0 56px 70px 8px rgba(0,0,0,0.45), 0 -50px 45px 26px rgba(255,255,255,0.6)'
                  }}>
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#e8e8e8] to-[#f5f5f5] dark:from-gray-700 dark:to-gray-800 shadow-[inset_0_2px_20px_rgba(0,0,0,0.25)] flex items-center justify-center">
                      {/* Knob face */}
                      <div
                        className="w-36 h-36 rounded-full cursor-grab active:cursor-grabbing relative transition-shadow duration-100"
                        style={{
                          transform: `rotate(${knobRotation}deg)`,
                          background: 'linear-gradient(180deg, #f1f1f1 0%, #ffffff 100%)',
                          border: '5px solid transparent',
                          borderImage: 'linear-gradient(180deg, #ffffff 34%, #d1d1d1 100%) 1',
                          boxShadow: '0 0 0 0 rgba(0,0,0,0.6)',
                          transition: 'transform 500ms cubic-bezier(0.18, 0.89, 0.32, 1.28), box-shadow 100ms ease-out'
                        }}
                        onMouseDown={(e) => {
                          const startY = e.clientY
                          const startRotation = knobRotation
                          const knobElement = e.currentTarget as HTMLElement
                          knobElement.style.cursor = 'grabbing'

                          const handleMouseMove = (moveEvent: MouseEvent) => {
                            const deltaY = startY - moveEvent.clientY
                            const newRotation = Math.max(-135, Math.min(135, startRotation + deltaY))
                            setKnobRotation(newRotation)
                            const newCount = Math.round(((newRotation + 135) / 270) * 9) + 1
                            setPeopleCount(newCount)
                          }

                          const handleMouseUp = () => {
                            knobElement.style.cursor = 'grab'
                            document.removeEventListener('mousemove', handleMouseMove)
                            document.removeEventListener('mouseup', handleMouseUp)
                          }

                          document.addEventListener('mousemove', handleMouseMove)
                          document.addEventListener('mouseup', handleMouseUp)
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = '0 0 7em 0 rgba(0,0,0,0.6)'
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 rgba(0,0,0,0.6)'
                        }}
                      >
                        {/* Pointer indicator */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-8 bg-[#282828] rounded-full" />

                        {/* Center display */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl font-bold text-gray-900 select-none" style={{
                            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}>{peopleCount}</span>
                        </div>
                      </div>

                      {/* Min/Max dots indicators */}
                      <div className="absolute bottom-6 left-[32%] w-2.5 h-2.5 rounded-full bg-[#282828] opacity-90" />
                      <div className="absolute bottom-6 right-[32%] w-2.5 h-2.5 rounded-full bg-[#282828] opacity-90" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Users className="w-8 h-8 text-gray-900 dark:text-white" />
                  <span className="text-xs font-bold text-gray-900 dark:text-white uppercase">Max</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Calendar Modal */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCalendar(false)}
          >
            {/* Blur Backdrop */}
            <div className="absolute inset-0 backdrop-blur-md bg-black/30" />

            {/* Calendar Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCalendar(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(currentMonth).map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} />
                  }

                  const isSelected = visitDate &&
                    day.getDate() === visitDate.getDate() &&
                    day.getMonth() === visitDate.getMonth() &&
                    day.getFullYear() === visitDate.getFullYear()

                  const isToday =
                    day.getDate() === new Date().getDate() &&
                    day.getMonth() === new Date().getMonth() &&
                    day.getFullYear() === new Date().getFullYear()

                  const isPast = day < new Date(new Date().setHours(0, 0, 0, 0))

                  return (
                    <button
                      key={index}
                      onClick={() => !isPast && setVisitDate(day)}
                      disabled={isPast}
                      className={`aspect-square rounded-xl font-medium transition-all ${
                        isSelected
                          ? 'bg-black text-white dark:bg-white dark:text-black scale-110 shadow-lg'
                          : isToday
                          ? 'bg-gray-200 dark:bg-gray-700 hover:scale-110'
                          : isPast
                          ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110'
                      }`}
                    >
                      {day.getDate()}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => {
                  setShowCalendar(false)
                  if (visitDate) {
                    setVisitTiming("later")
                  }
                }}
                disabled={!visitDate}
                className={`w-full mt-6 py-4 rounded-2xl font-medium transition-all ${
                  visitDate
                    ? 'bg-black dark:bg-white text-white dark:text-black hover:scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {visitDate ? `Confirm - ${visitDate.toLocaleDateString()}` : 'Select a date'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Button */}
      {selectedCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-0 right-0 z-40 px-4 pointer-events-none"
        >
          <div className="max-w-xl mx-auto flex justify-center">
            <Button
              onClick={handleNextStep}
              className="rounded-full px-8 py-6 shadow-xl backdrop-blur-md bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 pointer-events-auto text-base font-medium"
            >
              Continue ({selectedCategories.length} selected)
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
