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

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-serif font-bold text-xl mb-4 text-gray-900 dark:text-white">Description</h3>
            <div className="prose max-w-none mb-8 text-gray-900 dark:prose-invert dark:text-white">
              {event.fullDescription.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-purple-400 hover:bg-purple-300 text-white font-medium py-4 rounded-2xl shadow-lg transition-colors"
            >
              {event.price === "Free" ? "Register" : "Buy ticket"}
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