"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Bookmark, Share2, User } from "lucide-react"
import Image from "next/image"

const categories = [
  { id: "all", label: "Все" },
  { id: "art", label: "Искусство" },
  { id: "music", label: "Музыка" },
  { id: "food", label: "Еда" },
  { id: "workshops", label: "Мастер-классы" },
]

const events = [
  {
    id: 1,
    title: "Выставка современного искусства",
    description: "Погрузитесь в мир современного искусства на нашей новой выставке, где представлены работы местных художников. Уникальная возможность увидеть работы талантливых мастеров Бали и пообщаться с ними лично.",
    image: "https://images.unsplash.com/photo-1561488111-5d800fd56b8a?q=80&w=1000",
    category: "art",
    date: "24 марта",
    time: "19:00",
    likes: 128,
    author: "Мария Артова",
    bgColor: "from-purple-900/80 to-purple-800/20",
  },
  {
    id: 2,
    title: "Джазовый вечер под открытым небом",
    description: "Насладитесь живой джазовой музыкой в уютной атмосфере нашего сада. Выступают лучшие джазовые музыканты острова, а также специальные гости из Джакарты.",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=1000",
    category: "music",
    date: "26 марта",
    time: "20:00",
    likes: 256,
    author: "Джон Смит",
    bgColor: "from-blue-900/80 to-blue-800/20",
  },
  {
    id: 3,
    title: "Кулинарный мастер-класс балийской кухни",
    description: "Научитесь готовить аутентичные балийские блюда под руководством опытного шеф-повара. В программе: традиционные специи, соусы и техники приготовления.",
    image: "https://images.unsplash.com/photo-1540648639573-8c848de23f0a?q=80&w=1000",
    category: "food",
    date: "28 марта",
    time: "12:00",
    likes: 189,
    author: "Вайан Путу",
    bgColor: "from-orange-900/80 to-orange-800/20",
  },
]

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredEvents = activeCategory === "all" 
    ? events 
    : events.filter(event => event.category === activeCategory)

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
      {/* Категории */}
      <div className="sticky top-0 z-10 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-lg">
        <div className="flex overflow-x-auto no-scrollbar gap-2 p-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? "bg-purple-500 text-white scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* События */}
      <div className="space-y-6 p-4">
        <AnimatePresence mode="wait">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative rounded-[2rem] overflow-hidden bg-white dark:bg-gray-800 shadow-xl"
            >
              <div className="aspect-[3/4] sm:aspect-[2/1] relative">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${event.bgColor}`} />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="opacity-90">{event.author}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-2 leading-tight">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm opacity-90 mb-3">
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>{event.time}</span>
                    </div>
                    <p className="text-base opacity-90 line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-3 ml-4">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <Heart className="w-6 h-6" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <Bookmark className="w-6 h-6" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <Share2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
