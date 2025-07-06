"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Heart, Bookmark, Share2, User, Star, Calendar, Clock, MapPin, Users, ChevronLeft } from "lucide-react"
import Link from "next/link"

// Using the same data as on the list page (in a real app, this would be from an API)
const events = [
  {
    id: 1,
    title: "Contemporary Art Exhibition",
    description: "Immerse yourself in the world of contemporary art at our new exhibition featuring works by local artists. A unique opportunity to see the works of talented Bali masters and meet them in person.",
    fullDescription: `We invite you to a unique contemporary art exhibition in the Nuanu Creative Village.

The exhibition will feature works by more than 20 talented Bali artists working in various styles and techniques. You will see paintings, sculptures, installations, and digital art.

Event program:
• 19:00 - Exhibition opening
• 19:30 - Curator's welcome speech
• 20:00 - Meet the artists
• 21:00 - Buffet and networking
• 22:00 - Music performance

All works are available for purchase. Part of the proceeds will go to support the local artist community.`,
    image: "https://images.unsplash.com/photo-1561488111-5d800fd56b8a?q=80&w=1000",
    category: "art",
    date: "March 24",
    time: "19:00",
    location: "Nuanu Gallery",
    capacity: 150,
    registered: 89,
    likes: 128,
    author: "Maria Artova",
    price: "Free",
    rating: 4.8,
    reviews: [
      { id: 1, author: "Anna M.", rating: 5, text: "Amazing exhibition! Very inspiring.", date: "March 15, 2024" },
      { id: 2, author: "Petr K.", rating: 4, text: "Interesting selection of works, but I would like more interactivity", date: "March 14, 2024" },
    ],
    bgColor: "from-purple-900/90 via-purple-900/80 to-purple-900/95",
  },
  {
    id: 2,
    title: "Jungle Kids - Детский центр развития",
    description: "Комплексный детский центр с дневным присмотром, летними лагерями и дополнительными занятиями. Для детей от 1 до 9 лет.",
    fullDescription: `Jungle Kids - это современный детский центр развития в Nuanu Creative City, предлагающий широкий спектр услуг для детей от 1 до 9 лет.

🎯 ДНЕВНОЙ ПРИСМОТР (5+ лет могут оставаться без родителей):
• Понедельник - Пятница: 8:00 - 20:00
• 2 часа = 120.000 IDR
• 3 часа = 180.000 IDR  
• Полный день = 550.000 IDR

🏕️ ДЕТСКИЕ ЛАГЕРЯ "Adventures in Nuanu" (5+ лет):
• Период: 23 июня - 3 августа
• КАЖДЫЙ ДЕНЬ - дневные и ночные программы
• 1 день = 550.000 IDR
• Недельные программы:
  - 5 дней без ночевки: 2.500.000 IDR
  - 7 дней без ночевки: 3.000.000 IDR
  - 5 дней с ночевкой: 5.000.000 IDR
  - 7 дней с ночевкой: 6.000.000 IDR

🎒 ДЕТСКИЙ САД (2 группы: 2-4 года и 4-6 лет):
• Максимум 12 детей в группе
• Понедельник - Пятница:
  - 9:00 - 13:00: 5.500.000 IDR/месяц
  - 9:00 - 17:00: 7.500.000 IDR/месяц
  - Разовое посещение: 550.000 IDR

🎓 ДОПОЛНИТЕЛЬНЫЕ ЗАНЯТИЯ:
• Робототехника (5-9 лет):
  - Разовое занятие: 300.000 IDR
  - 4 занятия: 1.000.000 IDR
• Акробатика (5-9 лет), Гимнастика (5-9 лет), Messy Play (1-2 года):
  - Разовое занятие: 200.000 IDR
  - 8 занятий: 1.000.000 IDR

🎁 БЕСПЛАТНЫЙ ПРОБНЫЙ ДЕНЬ для всех новых клиентов!

Наша команда профессиональных педагогов создает безопасную и развивающую среду для вашего ребенка. Мы используем современные методики обучения и развития, адаптированные под тропический климат Бали.`,
    image: "https://images.unsplash.com/photo-1607745963884-cd2eaa7a4e86?q=80&w=1000",
    category: "kids",
    date: "Пн-Пт",
    time: "8:00-20:00",
    location: "Jungle Kids, Nuanu Creative City",
    capacity: 50,
    registered: 32,
    likes: 245,
    author: "Jungle Kids Team",
    price: "От 120.000 IDR",
    rating: 4.9,
    reviews: [
      { id: 1, author: "Мария С.", rating: 5, text: "Потрясающий центр! Мой ребенок в восторге от занятий робототехникой.", date: "15 марта 2024" },
      { id: 2, author: "John D.", rating: 5, text: "Professional staff, great facilities. My daughter loves the gymnastics classes!", date: "12 марта 2024" },
      { id: 3, author: "Индира К.", rating: 4, text: "Отличный детский сад, но хотелось бы больше занятий на свежем воздухе.", date: "10 марта 2024" },
    ],
    bgColor: "from-green-900/90 via-emerald-900/80 to-green-900/95",
    videoUrl: "https://youtube.com/shorts/fbQaVcm5fAw?feature=share",
  },
  // Add more events here
]

export default function EventPage() {
  const router = useRouter()
  const params = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const event = events.find(e => e.id === Number(params.id))

  if (!event) {
    return <div>Event not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto bg-[#f6f7fa] dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative h-[40vh] sm:h-[50vh]">
          <Link 
            href="/events"
            className="absolute top-6 left-6 z-20 bg-black/20 backdrop-blur-lg rounded-full p-2 text-white hover:bg-black/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Main content */}
        <div 
          className="p-6 sm:p-8 lg:p-10 -mt-20 relative z-10 transition-all duration-500 bg-[#f6f7fa] dark:bg-gray-900"
        >
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-sm mb-2 text-gray-900 dark:text-white">
                <div className="flex items-center gap-1 bg-gray-200 dark:bg-black/20 backdrop-blur-lg rounded-full px-3 py-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-medium">{event.rating}</span>
                  <span className="opacity-80">({event.reviews.length} reviews)</span>
                </div>
                <div className="bg-gray-200 dark:bg-black/20 backdrop-blur-lg rounded-full px-3 py-1">
                  <span>{event.price}</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4 text-gray-900 dark:text-white">
                {event.title}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full backdrop-blur-lg transition-colors ${
                  isLiked ? "bg-gray-300 dark:bg-white/30" : "bg-gray-200 dark:bg-black/20 hover:bg-gray-300 dark:hover:bg-black/30"
                }`}
              >
                <Heart className={`w-6 h-6 text-gray-900 dark:text-white ${isLiked ? "fill-gray-900 dark:fill-white" : ""}`} />
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-full backdrop-blur-lg transition-colors ${
                  isBookmarked ? "bg-gray-300 dark:bg-white/30" : "bg-gray-200 dark:bg-black/20 hover:bg-gray-300 dark:hover:bg-black/30"
                }`}
              >
                <Bookmark className={`w-6 h-6 text-gray-900 dark:text-white ${isBookmarked ? "fill-gray-900 dark:fill-white" : ""}`} />
              </button>
              <button className="p-2 rounded-full backdrop-blur-lg bg-gray-200 dark:bg-black/20 hover:bg-gray-300 dark:hover:bg-black/30 transition-colors">
                <Share2 className="w-6 h-6 text-gray-900 dark:text-white" />
              </button>
            </div>
          </div>

          {/* Event details */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                <Calendar className="w-5 h-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                <Clock className="w-5 h-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                <MapPin className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                <Users className="w-5 h-5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span>Remaining seats: {event.capacity - event.registered}</span>
                    <span className="text-sm">{event.registered}/{event.capacity}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-black/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gray-400 dark:bg-white/30 rounded-full transition-all duration-500"
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-black/20 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="font-serif font-bold text-xl mb-4 text-gray-900 dark:text-white">About the organizer</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-white/10" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{event.author}</div>
                  <div className="text-sm text-gray-500 dark:text-white/70">Organizer</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm text-gray-900 dark:text-white">{event.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Section */}
          {event.videoUrl && (
            <div className="mb-8">
              <h3 className="font-serif font-bold text-xl mb-4 text-gray-900 dark:text-white">Видео</h3>
              <div className="bg-gray-100 dark:bg-black/20 backdrop-blur-lg rounded-2xl p-6">
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe
                    src={event.videoUrl.replace('youtube.com/shorts/', 'youtube.com/embed/').replace('?feature=share', '')}
                    title={`${event.title} - Video`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-white/70">
                  Посмотрите видео о наших занятиях и детских программах
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-serif font-bold text-xl mb-4 text-gray-900 dark:text-white">Описание</h3>
            <div className="prose max-w-none mb-8 text-gray-900 dark:prose-invert dark:text-white whitespace-pre-line">
              {event.fullDescription.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full font-medium py-4 rounded-2xl shadow-lg transition-colors ${
                event.id === 2 
                  ? "bg-green-500 hover:bg-green-400 text-white" 
                  : "bg-purple-400 hover:bg-purple-300 text-white"
              }`}
            >
              {event.id === 2 ? "Записаться на пробный день" : event.price === "Free" ? "Register" : "Buy ticket"}
            </motion.button>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-4 text-gray-900 dark:text-white">Reviews</h3>
            <div className="space-y-4">
              {event.reviews.map(review => (
                <div key={review.id} className="bg-gray-100 dark:bg-black/20 backdrop-blur-lg rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900 dark:text-white">{review.author}</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-gray-900 dark:text-white">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-white/80 mb-2">{review.text}</p>
                  <div className="text-sm text-gray-500 dark:text-white/60">{review.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 