"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Heart, Bookmark, Share2, User, Star, Calendar, Clock, MapPin, Users, ChevronLeft } from "lucide-react"
import Link from "next/link"

// Используем те же данные, что и на странице списка (в реальном приложении будет API)
const events = [
  {
    id: 1,
    title: "Выставка современного искусства",
    description: "Погрузитесь в мир современного искусства на нашей новой выставке, где представлены работы местных художников. Уникальная возможность увидеть работы талантливых мастеров Бали и пообщаться с ними лично.",
    fullDescription: `Приглашаем вас на уникальную выставку современного искусства в креативной деревне Nuanu. 

На выставке будут представлены работы более 20 талантливых художников Бали, работающих в различных стилях и техниках. Вы сможете увидеть живопись, скульптуру, инсталляции и цифровое искусство.

Программа мероприятия:
• 19:00 - Открытие выставки
• 19:30 - Приветственное слово куратора
• 20:00 - Встреча с художниками
• 21:00 - Фуршет и нетворкинг
• 22:00 - Музыкальное сопровождение

Все работы доступны для приобретения. Часть средств будет направлена на поддержку местного сообщества художников.`,
    image: "https://images.unsplash.com/photo-1561488111-5d800fd56b8a?q=80&w=1000",
    category: "art",
    date: "24 марта",
    time: "19:00",
    location: "Галерея Nuanu",
    capacity: 150,
    registered: 89,
    likes: 128,
    author: "Мария Артова",
    price: "Бесплатно",
    rating: 4.8,
    reviews: [
      { id: 1, author: "Анна М.", rating: 5, text: "Потрясающая выставка! Очень вдохновляет.", date: "15 марта 2024" },
      { id: 2, author: "Петр К.", rating: 4, text: "Интересная подборка работ, но хотелось бы больше интерактива", date: "14 марта 2024" },
    ],
    bgColor: "from-purple-900/90 via-purple-900/80 to-purple-900/95",
  },
  // Добавьте остальные события здесь
]

export default function EventPage() {
  const router = useRouter()
  const params = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const event = events.find(e => e.id === Number(params.id))

  if (!event) {
    return <div>Событие не найдено</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
        {/* Шапка */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-indigo-900/50 to-transparent" />
        </div>

        {/* Основной контент */}
        <div 
          className="p-6 sm:p-8 lg:p-10 -mt-20 relative z-10 transition-all duration-500"
          style={{
            background: `linear-gradient(to bottom, 
              rgba(30, 58, 138, 0) 0%,
              rgba(30, 58, 138, 0.7) 10%,
              rgba(30, 58, 138, 0.8) 20%,
              rgba(30, 58, 138, 0.9) 30%,
              rgba(30, 58, 138, 0.95) 40%,
              rgba(30, 58, 138, 1) 100%)`
          }}
        >
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-sm text-white mb-2">
                <div className="flex items-center gap-1 bg-black/20 backdrop-blur-lg rounded-full px-3 py-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-medium">{event.rating}</span>
                  <span className="opacity-80">({event.reviews.length} отзывов)</span>
                </div>
                <div className="bg-black/20 backdrop-blur-lg rounded-full px-3 py-1">
                  <span>{event.price}</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
                {event.title}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full backdrop-blur-lg transition-colors ${
                  isLiked ? "bg-white/30" : "bg-black/20 hover:bg-black/30"
                }`}
              >
                <Heart className={`w-6 h-6 text-white ${isLiked ? "fill-white" : ""}`} />
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-full backdrop-blur-lg transition-colors ${
                  isBookmarked ? "bg-white/30" : "bg-black/20 hover:bg-black/30"
                }`}
              >
                <Bookmark className={`w-6 h-6 text-white ${isBookmarked ? "fill-white" : ""}`} />
              </button>
              <button className="p-2 rounded-full backdrop-blur-lg bg-black/20 hover:bg-black/30 transition-colors">
                <Share2 className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Детали события */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/90">
                <Calendar className="w-5 h-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Clock className="w-5 h-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <MapPin className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Users className="w-5 h-5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span>Осталось мест: {event.capacity - event.registered}</span>
                    <span className="text-sm">{event.registered}/{event.capacity}</span>
                  </div>
                  <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white/30 rounded-full transition-all duration-500"
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="font-serif font-bold text-xl mb-4 text-white">Об организаторе</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/10" />
                <div>
                  <div className="font-medium text-white">{event.author}</div>
                  <div className="text-sm text-white/70">Организатор</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm text-white">{event.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Описание */}
          <div className="mb-8">
            <h3 className="font-serif font-bold text-xl mb-4 text-white">Описание</h3>
            <div className="prose prose-invert max-w-none mb-8">
              {event.fullDescription.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-white/90">{paragraph}</p>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-purple-400 hover:bg-purple-300 text-white font-medium py-4 rounded-2xl shadow-lg transition-colors"
            >
              {event.price === "Бесплатно" ? "Зарегистрироваться" : "Купить билет"}
            </motion.button>
          </div>

          {/* Отзывы */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-4 text-white">Отзывы</h3>
            <div className="space-y-4">
              {event.reviews.map(review => (
                <div key={review.id} className="bg-black/20 backdrop-blur-lg rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-white">{review.author}</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-white">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-white/80 mb-2">{review.text}</p>
                  <div className="text-sm text-white/60">{review.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 