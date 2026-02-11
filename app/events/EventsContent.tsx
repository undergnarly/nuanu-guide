"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Sparkles, MapPin, Users, X } from "lucide-react"
import { EVENTS, type EventCard } from "@/lib/event-data"

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "cultural", label: "Cultural" },
  { key: "art", label: "Art" },
  { key: "music", label: "Music" },
  { key: "wellness", label: "Wellness" },
]

export default function EventsContent() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState<EventCard | null>(null)

  const filteredEvents = activeCategory === "all"
    ? EVENTS
    : EVENTS.filter(e => e.category === activeCategory)

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="px-4 pt-6 pb-3">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Events</h1>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.key
                    ? "bg-black text-white shadow-sm"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Event cards */}
      <div className="px-4 pt-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedEvent(event)}
              className="group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-md cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="aspect-[16/9] relative">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <span>{event.date} &middot; {event.time}</span>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                      <span>{event.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{event.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{event.price}</span>
                  {event.location && (
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {event.location}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Event detail modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            >
              <div className="relative aspect-video">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover rounded-t-3xl"
                />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-3 right-3 p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{selectedEvent.title}</h2>
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span>{selectedEvent.date} &middot; {selectedEvent.time}</span>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Sparkles className="w-4 h-4" />
                    <span>{selectedEvent.rating}</span>
                    <span className="text-gray-400">({selectedEvent.reviews})</span>
                  </div>
                </div>
                {selectedEvent.location && (
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
                    <MapPin className="w-4 h-4" />
                    {selectedEvent.location}
                  </div>
                )}
                {selectedEvent.capacity && (
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
                    <Users className="w-4 h-4" />
                    {selectedEvent.registered || 0} / {selectedEvent.capacity} registered
                  </div>
                )}
                <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line mb-5">
                  {selectedEvent.fullDescription || selectedEvent.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{selectedEvent.price}</span>
                  {selectedEvent.ticketUrl ? (
                    <a
                      href={selectedEvent.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition-colors inline-block"
                    >
                      Get Tickets
                    </a>
                  ) : (
                    <span className="px-6 py-2.5 bg-gray-200 text-gray-600 rounded-full font-medium">
                      Included
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
