"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Sparkles, MapPin, Users, ArrowLeft, Calendar, Clock } from "lucide-react"
import { EVENTS, type EventCard } from "@/lib/event-data"

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "cultural", label: "Cultural" },
  { key: "art", label: "Art" },
  { key: "music", label: "Music" },
  { key: "wellness", label: "Wellness" },
]

function EventDetail({ event, onClose }: { event: EventCard; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: '#f9f6f1' }}
    >
      <div className="w-full h-full sm:max-w-2xl sm:max-h-[95vh] overflow-y-auto">
        {/* Floating back button */}
        <div className="fixed top-3 left-0 right-0 flex items-center px-4 z-[110] pointer-events-none sm:max-w-2xl sm:mx-auto">
          <button
            onClick={onClose}
            className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors shadow-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Hero image */}
        <div className="relative">
          <div className="aspect-[4/3] sm:aspect-video relative overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs mb-2 capitalize">
              {event.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{event.title}</h1>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-5 space-y-5">
          {/* Date, time, rating */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {event.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {event.time}
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">{event.rating}</span>
              <span className="text-gray-400 text-xs">({event.reviews})</span>
            </div>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400" />
              {event.location}
            </div>
          )}

          {/* Capacity */}
          {event.capacity && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4 text-gray-400" />
              {event.registered || 0} / {event.capacity} registered
            </div>
          )}

          {/* Description */}
          <div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {event.fullDescription || event.description}
            </p>
          </div>

          {/* Spacer for fixed bottom bar */}
          <div className="h-24" />
        </div>

        {/* Fixed bottom price + CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-[110] sm:max-w-2xl sm:mx-auto">
          <div className="bg-white/90 backdrop-blur-md border-t border-gray-200/50 px-5 py-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500">Price</span>
              <div className="text-lg font-bold text-gray-900">{event.price}</div>
            </div>
            {event.ticketUrl ? (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition-colors text-sm"
              >
                Get Tickets
              </a>
            ) : (
              <span className="px-7 py-3 bg-gray-100 text-gray-500 rounded-full font-medium text-sm">
                Included
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function EventsContent() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState<EventCard | null>(null)

  const closeEvent = useCallback(() => {
    setSelectedEvent(null)
  }, [])

  const openEvent = (event: EventCard) => {
    setSelectedEvent(event)
    window.history.pushState({ eventOpen: true }, "")
  }

  useEffect(() => {
    const onPopState = () => {
      if (selectedEvent) {
        setSelectedEvent(null)
      }
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [selectedEvent])

  const handleClose = () => {
    if (selectedEvent) {
      window.history.back()
    }
  }

  const filteredEvents = activeCategory === "all"
    ? EVENTS
    : EVENTS.filter(e => e.category === activeCategory)

  if (selectedEvent) {
    return <EventDetail event={selectedEvent} onClose={handleClose} />
  }

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#f9f6f1' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-lg border-b border-gray-200/50" style={{ backgroundColor: 'rgba(249,246,241,0.8)' }}>
        <div className="px-4 pt-6 pb-3">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Events</h1>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.key
                    ? "bg-black text-white shadow-sm"
                    : "bg-white text-gray-700"
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
              onClick={() => openEvent(event)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md cursor-pointer active:scale-[0.98] transition-transform"
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                <p className="text-sm text-white/70 line-clamp-2 mb-2">{event.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <span>{event.date} &middot; {event.time}</span>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                      <span>{event.rating}</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-white">{event.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
