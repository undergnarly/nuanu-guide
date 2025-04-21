"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Bookmark, Share2, User, Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const categories = [
  { id: "all", label: "All" },
  { id: "art", label: "Art" },
  { id: "music", label: "Music" },
  { id: "food", label: "Food" },
  { id: "workshops", label: "Workshops" },
]

const events = [
  {
    id: 1,
    title: "Contemporary Art Exhibition",
    description: "Immerse yourself in the world of contemporary art at our new exhibition, featuring works by local artists. A unique opportunity to see the works of talented Balinese masters and meet them in person.",
    image: "https://images.unsplash.com/photo-1561488111-5d800fd56b8a?q=80&w=1000",
    category: "art",
    date: "March 24",
    time: "19:00",
    likes: 128,
    author: "Maria Artova",
    price: "Free",
    rating: 4.8,
    reviews: 47,
  },
  {
    id: 2,
    title: "Open-Air Jazz Evening",
    description: "Enjoy live jazz music in the cozy atmosphere of our garden. The best jazz musicians of the island perform, as well as special guests from Jakarta.",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=1000",
    category: "music",
    date: "March 26",
    time: "20:00",
    likes: 256,
    author: "John Smith",
    price: "350.000 IDR",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    title: "Balinese Cooking Masterclass",
    description: "Learn to cook authentic Balinese dishes under the guidance of an experienced chef. The program includes: traditional spices, sauces, and cooking techniques.",
    image: "https://images.unsplash.com/photo-1540648639573-8c848de23f0a?q=80&w=1000",
    category: "food",
    date: "March 28",
    time: "12:00",
    likes: 189,
    author: "Wayan Putu",
    price: "500.000 IDR",
    rating: 4.7,
    reviews: 124,
  },
  {
    id: 4,
    title: "Pottery Workshop",
    description: "Create your own unique ceramic piece under the guidance of an experienced master. All materials are included, suitable for beginners.",
    image: "https://images.unsplash.com/photo-1532570204726-d10d25a9ce47?q=80&w=1000",
    category: "workshops",
    date: "March 30",
    time: "15:00",
    likes: 145,
    author: "Anna Ceramics",
    price: "400.000 IDR",
    rating: 4.9,
    reviews: 67,
  },
  {
    id: 5,
    title: "Electronic Beach Party",
    description: "Dance until dawn to the sounds of electronic music from famous DJs. Special light effects and an unforgettable atmosphere on the ocean shore.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000",
    category: "music",
    date: "April 1",
    time: "22:00",
    likes: 312,
    author: "DJ Wave",
    price: "250.000 IDR",
    rating: 4.6,
    reviews: 156,
  },
  {
    id: 6,
    title: "Digital Art Exhibition",
    description: "Dive into the world of NFT and digital art. Interactive installations, VR exhibits, and meetings with new generation artists.",
    image: "https://images.unsplash.com/photo-1573152958734-1922c188fba3?q=80&w=1000",
    category: "art",
    date: "April 3",
    time: "11:00",
    likes: 220,
    author: "Crypto Art",
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

const TABS = [
  { key: 'events', label: 'Events' },
  { key: 'experiences', label: 'Experiences' },
]

export default function EventsSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeType, setActiveType] = useState<'events' | 'experiences'>('events')

  const filteredEvents = activeCategory === "all"
    ? events
    : events.filter(event => event.category === activeCategory)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="events-page"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="min-h-screen pb-16 bg-gray-50 dark:bg-gray-900"
      >
        {/* Плавающий селектор Events/Experiences */}
        <div className="fixed top-6 left-1/2 z-40 -translate-x-1/2 pointer-events-none">
          <div className="inline-flex rounded-full p-1 shadow-xl backdrop-blur-md bg-white/70 dark:bg-gray-900/70 pointer-events-auto">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveType(tab.key as 'events' | 'experiences')}
                className={`px-6 py-2 rounded-full font-medium transition-all text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 pointer-events-auto ${
                  activeType === tab.key
                    ? "bg-black text-white shadow-sm"
                    : "bg-transparent text-gray-700 dark:text-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* Плавающий селектор категорий */}
        <div className="fixed top-24 left-1/2 z-30 -translate-x-1/2 w-full flex justify-center pointer-events-none" style={{maxWidth: '100vw'}}>
          <div className="flex overflow-x-auto no-scrollbar gap-2 px-2 py-1 rounded-full shadow-lg backdrop-blur-md bg-white/60 dark:bg-gray-900/60 pointer-events-auto max-w-2xl">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all pointer-events-auto ${
                  activeCategory === category.id
                    ? "bg-black text-white scale-105"
                    : "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{height: '120px'}} />
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
                                  <span>More Info</span>
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
                                <span>More Info</span>
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

        {/* Scroll indicator */}
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 flex gap-1">
          {filteredEvents.map((_, index) => (
            <div
              key={index}
              className="w-1.5 h-1.5 rounded-full bg-white/30"
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 