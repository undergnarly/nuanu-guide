"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Check, User, Users, Calendar as CalendarIcon, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SUPPORTED_LANGUAGES } from "@/lib/audio-guide-data"

interface GuidesSectionProps {
  onOpenAudioGuide?: (slug: string, lang: string) => void
}

// Minimalist flag component as circular flags
const FlagIcon = ({ code, size = 24 }: { code: string; size?: number }) => {
  if (code === 'en') {
    // UK Flag (Union Jack)
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <defs>
          <clipPath id="circle-clip">
            <circle cx="12" cy="12" r="10.5"/>
          </clipPath>
        </defs>
        <circle cx="12" cy="12" r="11" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
        <g clipPath="url(#circle-clip)">
          {/* Blue background */}
          <rect x="1.5" y="1.5" width="21" height="21" fill="#012169"/>

          {/* White diagonal cross */}
          <path d="M 1.5 1.5 L 22.5 22.5 M 22.5 1.5 L 1.5 22.5" stroke="white" strokeWidth="3.5"/>

          {/* Red diagonal cross */}
          <path d="M 1.5 1.5 L 22.5 22.5 M 22.5 1.5 L 1.5 22.5" stroke="#C8102E" strokeWidth="2"/>

          {/* White main cross */}
          <path d="M 12 1.5 L 12 22.5 M 1.5 12 L 22.5 12" stroke="white" strokeWidth="4"/>

          {/* Red main cross */}
          <path d="M 12 1.5 L 12 22.5 M 1.5 12 L 22.5 12" stroke="#C8102E" strokeWidth="2.5"/>
        </g>
      </svg>
    )
  }

  if (code === 'ru') {
    // Russian Flag
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <defs>
          <clipPath id="circle-clip-ru">
            <circle cx="12" cy="12" r="10.5"/>
          </clipPath>
        </defs>
        <circle cx="12" cy="12" r="11" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
        <g clipPath="url(#circle-clip-ru)">
          <rect x="1.5" y="1.5" width="21" height="7" fill="#FFFFFF"/>
          <rect x="1.5" y="8.5" width="21" height="7" fill="#0039A6"/>
          <rect x="1.5" y="15.5" width="21" height="7" fill="#D52B1E"/>
        </g>
      </svg>
    )
  }

  if (code === 'id') {
    // Indonesian Flag
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <defs>
          <clipPath id="circle-clip-id">
            <circle cx="12" cy="12" r="10.5"/>
          </clipPath>
        </defs>
        <circle cx="12" cy="12" r="11" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
        <g clipPath="url(#circle-clip-id)">
          <rect x="1.5" y="1.5" width="21" height="10.5" fill="#FF0000"/>
          <rect x="1.5" y="12" width="21" height="10.5" fill="#FFFFFF"/>
        </g>
      </svg>
    )
  }

  return null
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
    videoUrl: '/video/experiences.mp4',
    posterUrl: '/video/experiences-poster.jpg',
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
    videoUrl: '/video/accommodation.mp4',
    posterUrl: '/video/accommodation-poster.jpg',
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
    videoUrl: '/video/food.mp4',
    posterUrl: '/video/food-poster.jpg',
    imageUrl: '/images/guides/horizon.jpg'
  }
]

export default function GuidesSection({ onOpenAudioGuide }: GuidesSectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [visitDate, setVisitDate] = useState<Date | null>(null)
  const [visitTiming, setVisitTiming] = useState<"now" | "later" | null>(null)
  const [peopleCount, setPeopleCount] = useState(1)
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleNextStep = () => {
    // Format categories list
    const categoriesText = selectedCategories
      .map(id => EXPERIENCE_CATEGORIES.find(cat => cat.id === id)?.title.en)
      .filter(Boolean)
      .join(' and ')

    // Format date
    const dateText = visitTiming === 'now'
      ? 'today'
      : visitDate
        ? visitDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
        : 'a future date'

    // Create WhatsApp message
    const message = `Hello! I want to book ${categoriesText} in Nuanu for ${peopleCount} ${peopleCount === 1 ? 'person' : 'people'} at ${dateText}`

    // WhatsApp URL
    const whatsappUrl = `https://wa.me/6285235948856?text=${encodeURIComponent(message)}`

    // Open WhatsApp
    window.open(whatsappUrl, '_blank')
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
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* First Slide - Experience Cards */}
      <section className="min-h-screen snap-start relative">
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

          {/* Language selector button - absolute positioned right */}
          <button
            onClick={() => setShowLanguageModal(true)}
            className="absolute right-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 pointer-events-auto"
          >
            <FlagIcon code={selectedLanguage} size={28} />
          </button>
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
                    preload={category.id === 'experiences' ? 'metadata' : 'none'}
                    loading={category.id === 'experiences' ? undefined : 'lazy'}
                    poster={category.posterUrl}
                  >
                    <source src={category.videoUrl} type="video/mp4" />
                  </video>
                </div>

                {/* Gradient overlay - blur and darkening from top to bottom */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none" />
                <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-b from-transparent to-black/60 pointer-events-none"
                     style={{ maskImage: 'linear-gradient(to bottom, transparent 40%, black 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 40%, black 100%)' }} />

                {/* Selection Checkbox */}
                <div className="absolute top-6 right-6 z-10">
                  <div className={`w-12 h-12 rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center ${
                    isSelected
                      ? 'bg-white dark:bg-white shadow-lg scale-110'
                      : 'bg-white/20 dark:bg-gray-900/20 ring-2 ring-white/60 dark:ring-white/60'
                  }`}>
                    <Check className={`w-7 h-7 transition-all duration-300 stroke-[3] ${
                      isSelected
                        ? 'text-black opacity-100 scale-100'
                        : 'text-white opacity-40 scale-90'
                    }`} />
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
      </section>

      {/* Second Slide - Form Section */}
      {selectedCategories.length > 0 && (
        <section className="h-screen snap-start bg-white dark:bg-gray-900 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container px-4 max-w-xl mx-auto"
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              {selectedLanguage === 'en' && 'When'}
              {selectedLanguage === 'ru' && 'Когда'}
              {selectedLanguage === 'id' && 'Kapan'}
            </h3>

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
                {selectedLanguage === 'en' && 'Now'}
                {selectedLanguage === 'ru' && 'Сейчас'}
                {selectedLanguage === 'id' && 'Sekarang'}
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
                {selectedLanguage === 'en' && 'Choose Date'}
                {selectedLanguage === 'ru' && 'Выбрать дату'}
                {selectedLanguage === 'id' && 'Pilih Tanggal'}
              </button>
            </div>

            {/* People Count Slider */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                {selectedLanguage === 'en' && 'How many people?'}
                {selectedLanguage === 'ru' && 'Сколько человек?'}
                {selectedLanguage === 'id' && 'Berapa orang?'}
              </h4>

              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-xs font-medium text-gray-500">1</span>
                </div>

                <div className="flex-1">
                  {/* Number Display */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-black dark:bg-white text-white dark:text-black rounded-2xl px-6 py-3 shadow-lg">
                      <span className="text-3xl font-bold">
                        {peopleCount === 10 ? '10+' : peopleCount}
                      </span>
                      <span className="text-sm ml-2 opacity-70">
                        {peopleCount === 1
                          ? (selectedLanguage === 'en' ? 'person' : selectedLanguage === 'ru' ? 'человек' : 'orang')
                          : (selectedLanguage === 'en' ? 'people' : selectedLanguage === 'ru' ? 'человек' : 'orang')
                        }
                      </span>
                    </div>
                  </div>

                  {/* Modern Slider */}
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={peopleCount}
                      onChange={(e) => setPeopleCount(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-7
                        [&::-webkit-slider-thumb]:h-7
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-black
                        [&::-webkit-slider-thumb]:dark:bg-white
                        [&::-webkit-slider-thumb]:shadow-lg
                        [&::-webkit-slider-thumb]:cursor-grab
                        [&::-webkit-slider-thumb]:active:cursor-grabbing
                        [&::-webkit-slider-thumb]:hover:scale-110
                        [&::-webkit-slider-thumb]:transition-transform
                        [&::-moz-range-thumb]:w-7
                        [&::-moz-range-thumb]:h-7
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:bg-black
                        [&::-moz-range-thumb]:dark:bg-white
                        [&::-moz-range-thumb]:border-0
                        [&::-moz-range-thumb]:shadow-lg
                        [&::-moz-range-thumb]:cursor-grab
                        [&::-moz-range-thumb]:active:cursor-grabbing
                        [&::-moz-range-thumb]:hover:scale-110
                        [&::-moz-range-thumb]:transition-transform"
                      style={{
                        background: `linear-gradient(to right,
                          rgb(0, 0, 0) 0%,
                          rgb(0, 0, 0) ${((peopleCount - 1) / 9) * 100}%,
                          rgb(229, 231, 235) ${((peopleCount - 1) / 9) * 100}%,
                          rgb(229, 231, 235) 100%)`
                      }}
                    />

                    {/* Tick marks */}
                    <div className="flex justify-between mt-2 px-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-0.5 h-2 rounded-full transition-all duration-200 ${
                            i < peopleCount ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Users className="w-6 h-6 text-gray-900 dark:text-white" />
                  <span className="text-xs font-medium text-gray-500">10+</span>
                </div>
              </div>
            </div>
            </div>
          </motion.div>
        </section>
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

      {/* Language Selector Modal */}
      <AnimatePresence>
        {showLanguageModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowLanguageModal(false)}
          >
            {/* Blur Backdrop - appears instantly */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 backdrop-blur-md bg-black/30"
            />

            {/* Language Modal Content - animates with spring */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLanguageModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Choose Language</h3>

              <div className="space-y-3">
                {SUPPORTED_LANGUAGES.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      setSelectedLanguage(language.code)
                      setShowLanguageModal(false)
                    }}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                      selectedLanguage === language.code
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg scale-105'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:scale-105'
                    }`}
                  >
                    <FlagIcon code={language.code} size={32} />
                    <div className="flex flex-col items-start flex-1">
                      <span className="font-bold text-lg">{language.native_name}</span>
                      <span className="text-sm opacity-70">{language.name}</span>
                    </div>
                    {selectedLanguage === language.code && (
                      <Check className="w-6 h-6" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Button - Only show when categories AND timing are selected */}
      {selectedCategories.length > 0 && visitTiming && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-0 right-0 z-50 px-4 pointer-events-none"
        >
          <div className="max-w-xl mx-auto flex justify-center">
            <Button
              onClick={handleNextStep}
              className="rounded-full px-8 py-6 shadow-xl backdrop-blur-md bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 pointer-events-auto text-base font-medium"
            >
              {selectedLanguage === 'en' && 'Book via WhatsApp'}
              {selectedLanguage === 'ru' && 'Забронировать через WhatsApp'}
              {selectedLanguage === 'id' && 'Pesan via WhatsApp'}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
