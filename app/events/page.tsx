"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Bookmark, Share2, User, Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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
    price: "Бесплатно",
    rating: 4.8,
    reviews: 47,
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
    price: "350.000 IDR",
    rating: 4.9,
    reviews: 89,
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
    price: "500.000 IDR",
    rating: 4.7,
    reviews: 124,
  },
  {
    id: 4,
    title: "Мастер-класс по гончарному искусству",
    description: "Создайте свое уникальное керамическое изделие под руководством опытного мастера. Все материалы включены в стоимость, подходит для начинающих.",
    image: "https://images.unsplash.com/photo-1532570204726-d10d25a9ce47?q=80&w=1000",
    category: "workshops",
    date: "30 марта",
    time: "15:00",
    likes: 145,
    author: "Анна Керамика",
    price: "400.000 IDR",
    rating: 4.9,
    reviews: 67,
  },
  {
    id: 5,
    title: "Электронная вечеринка на пляже",
    description: "Танцуйте до рассвета под звуки электронной музыки от известных диджеев. Специальные световые эффекты и незабываемая атмосфера на берегу океана.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000",
    category: "music",
    date: "1 апреля",
    time: "22:00",
    likes: 312,
    author: "DJ Волна",
    price: "250.000 IDR",
    rating: 4.6,
    reviews: 156,
  },
  {
    id: 6,
    title: "Выставка цифрового искусства",
    description: "Погрузитесь в мир NFT и цифрового искусства. Интерактивные инсталляции, VR-экспонаты и встречи с художниками нового поколения.",
    image: "https://images.unsplash.com/photo-1573152958734-1922c188fba3?q=80&w=1000",
    category: "art",
    date: "3 апреля",
    time: "11:00",
    likes: 220,
    author: "Крипто Арт",
    price: "150.000 IDR",
    rating: 4.7,
    reviews: 89,
  },
]

const experiences = [
  { id: 1, title: "Girl Power Yoga", day: "Monday", description: "", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 2, title: "Multi-Media Installations", day: "Everyday", description: "", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 3, title: "Kids Gambelan", day: "Monday", description: "", image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 4, title: "THK Tower Light Show", day: "Everyday", description: "", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 5, title: "Earth Sentinels Projection Mapping", day: "Everyday", description: "", image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 6, title: "Sunset Yoga with Desak Henny", day: "Wednesday", description: "", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 7, title: "Kids Bamboo Stick Architecture", day: "Tuesday", description: "", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 8, title: "Kids Balinese Dance", day: "Wednesday", description: "", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 9, title: "Beach + Mangrove Clean Up", day: "Thursday", description: "", image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 10, title: "Kids Art Class", day: "Thursday", description: "", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 11, title: "Kids English Class", day: "Friday", description: "", image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 12, title: "Canang Making Workshop with Diah", day: "Tuesday", description: "", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 13, title: "Bachata Dance", day: "Friday", description: "", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 14, title: "Kartini Kreatif Day", day: "Saturday", description: "", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 15, title: "High Heels Dance Free Class", day: "Tuesday", description: "", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 16, title: "Lady Style Dance Free Lesson", day: "Wednesday", description: "", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 17, title: "Body Conditioning with Dewa", day: "Monday", description: "", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 18, title: "Family Day", day: "Saturday", description: "", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 19, title: "Penjor Making Workshop with Beraban Youth", day: "Sunday", description: "", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
  { id: 20, title: "Sunrise Yoga with Desak Henny", day: "Tuesday", description: "", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800", link: "https://www.nuanu.com/visit/experience" },
]

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeType, setActiveType] = useState<'events' | 'experiences'>('events')

  const filteredEvents = activeCategory === "all"
    ? events
    : events.filter(event => event.category === activeCategory)

  return (
    <div className="min-h-screen pb-16 bg-gray-50 dark:bg-gray-900">
      {/* Селектор Events/Experiences — sliding radio button */}
      <div className="flex justify-center pt-6 pb-2 bg-transparent">
        <div className="inline-flex items-center justify-center rounded-full bg-muted p-1 text-muted-foreground shadow-md border border-gray-200 dark:border-gray-700">
          <button
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              activeType === 'events'
                ? 'bg-black text-white shadow-sm'
                : 'bg-muted text-muted-foreground'
            }`}
            onClick={() => setActiveType('events')}
          >
            Events
          </button>
          <button
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              activeType === 'experiences'
                ? 'bg-black text-white shadow-sm'
                : 'bg-muted text-muted-foreground'
            }`}
            onClick={() => setActiveType('experiences')}
          >
            Experiences
          </button>
        </div>
      </div>
      {/* Категории */}
      <div className="sticky top-0 z-10 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-md">
        <div className="flex overflow-x-auto no-scrollbar gap-2 p-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? "bg-black text-white scale-105"
                  : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-white/90 dark:hover:bg-gray-800/90"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* События */}
      {activeType === 'events' ? (
        <div className="h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="px-4 py-4">
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 15,
                      mass: 1
                    }}
                    className="relative max-w-xl mx-auto"
                  >
                    <div 
                      className="relative rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group p-3 pb-4"
                      style={{
                        background: `linear-gradient(to bottom, 
                          ${event.category === 'art' ? 'rgb(88, 28, 135)' : 
                          event.category === 'music' ? 'rgb(30, 58, 138)' : 
                          event.category === 'food' ? 'rgb(124, 45, 18)' : 
                          'rgb(88, 28, 135)'} 0%,
                          ${event.category === 'art' ? 'rgb(126, 34, 206)' : 
                          event.category === 'music' ? 'rgb(59, 130, 246)' : 
                          event.category === 'food' ? 'rgb(234, 88, 12)' : 
                          'rgb(126, 34, 206)'} 100%)`
                      }}
                    >
                      <Link href={`/events/${event.id}`} className="block">
                        {/* Изображение */}
                        <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        
                        {/* Контент */}
                        <div className="relative mt-4 px-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-3 text-sm">
                                <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center">
                                  <User className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-white/90">{event.author}</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                  <span className="text-white">{event.rating}</span>
                                  <span className="text-white/60">({event.reviews})</span>
                                </div>
                              </div>
                              <h3 className="text-2xl font-serif font-bold mb-3 leading-tight text-white group-hover:opacity-80 transition-opacity">
                                {event.title}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-white/90 mb-3">
                                <span>{event.date}</span>
                                <span>•</span>
                                <span>{event.time}</span>
                                <span>•</span>
                                <span className="text-white">{event.price}</span>
                              </div>
                              <p className="text-base text-white/80 line-clamp-3 leading-relaxed mb-4">
                                {event.description}
                              </p>
                              <div className="inline-flex items-center gap-2 text-white group-hover:gap-3 transition-all">
                                <span>Подробнее</span>
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </div>
                            <div className="flex flex-col items-center gap-3 ml-4">
                              <button className="p-2 hover:bg-white/10 rounded-full transition-colors" onClick={(e) => e.preventDefault()}>
                                <Heart className="w-6 h-6 text-white" />
                              </button>
                              <button className="p-2 hover:bg-white/10 rounded-full transition-colors" onClick={(e) => e.preventDefault()}>
                                <Bookmark className="w-6 h-6 text-white" />
                              </button>
                              <button className="p-2 hover:bg-white/10 rounded-full transition-colors" onClick={(e) => e.preventDefault()}>
                                <Share2 className="w-6 h-6 text-white" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="px-4 py-4">
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {experiences.map((exp) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 15,
                      mass: 1
                    }}
                    className="relative max-w-xl mx-auto"
                  >
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group p-3 pb-4"
                      style={{
                        background: 'linear-gradient(to bottom, rgb(30,30,30) 0%, rgb(60,60,60) 100%)'
                      }}
                    >
                      {/* Изображение */}
                      <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                        <img
                          src={exp.image}
                          alt={exp.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      {/* Контент */}
                      <div className="relative mt-4 px-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-2xl font-serif font-bold mb-3 leading-tight text-white group-hover:opacity-80 transition-opacity">
                              {exp.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-white/90 mb-3">
                              <span>{exp.day}</span>
                            </div>
                            <div className="inline-flex items-center gap-2 text-white group-hover:gap-3 transition-all">
                              <span>Подробнее</span>
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .overflow-y-auto {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Индикатор скролла */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 flex gap-1">
        {filteredEvents.map((_, index) => (
          <div
            key={index}
            className="w-1.5 h-1.5 rounded-full bg-white/30"
          />
        ))}
      </div>
    </div>
  )
}
