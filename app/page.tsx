"use client"

import { useState, useEffect, Suspense } from "react"
import { AnimatePresence, motion } from "framer-motion"
import HomeSection from "@/components/sections/HomeSection"
import AudioGuideSection from "@/components/sections/AudioGuideSection"
import BottomNavigation from "@/components/bottom-navigation"
import MapContent from "@/app/map/MapContent"
import ChatContent from "@/app/chat/ChatContent"
import ExploreContent from "@/app/explore/ExploreContent"
import EventsContent from "@/app/events/EventsContent"
import { AUDIO_GUIDE_OBJECTS } from "@/lib/audio-guide-data"

function AppContent() {
  const [activeTab, setActiveTab] = useState("home")
  const [audioGuideSlug, setAudioGuideSlug] = useState<string | null>(null)
  const [audioGuideLang, setAudioGuideLang] = useState<string>("en")
  const [chatInputFocused, setChatInputFocused] = useState(false)

  useEffect(() => {
    const path = window.location.pathname
    let slug = path.substring(1)

    // Support /guide/slug and /audio-guide/slug URL formats
    if (slug.startsWith('guide/')) {
      slug = slug.replace('guide/', '')
    } else if (slug.startsWith('audio-guide/')) {
      slug = slug.replace('audio-guide/', '')
    }

    if (slug) {
      const guideExists = AUDIO_GUIDE_OBJECTS.some(g => g.slug === slug)
      if (guideExists) {
        setAudioGuideSlug(slug)
      }
    }
  }, [])

  const handleOpenAudioGuide = (slug: string) => {
    setAudioGuideSlug(slug)
    setAudioGuideLang('en')
    window.history.pushState({}, '', `/${slug}`)
  }

  const handleCloseAudioGuide = () => {
    setActiveTab("guides")
    setAudioGuideSlug(null)
    window.history.replaceState({}, '', '/')
  }

  const handleNavigate = (key: string) => {
    setActiveTab(key)
    setAudioGuideSlug(null)
    window.history.pushState({}, '', '/')
  }

  if (audioGuideSlug) {
    const audioGuideObject = AUDIO_GUIDE_OBJECTS.find(obj => obj.slug === audioGuideSlug)

    if (!audioGuideObject) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Audio Guide Not Found</h2>
            <p className="text-gray-600 mb-4">The requested audio guide could not be found.</p>
            <button
              onClick={handleCloseAudioGuide}
              className="px-4 py-2 bg-black text-white rounded-full hover:bg-neutral-800"
            >
              Go Back
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen">
        <AudioGuideSection
          audioGuide={audioGuideObject}
          language={audioGuideLang as 'en' | 'ru' | 'id'}
          onClose={handleCloseAudioGuide}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "home" && <HomeSection />}
          {activeTab === "map" && <MapContent />}
          {activeTab === "chat" && <ChatContent onInputFocus={setChatInputFocused} />}
          {activeTab === "events" && <EventsContent />}
          {activeTab === "guides" && <ExploreContent onOpenGuide={handleOpenAudioGuide} />}
        </motion.div>
      </AnimatePresence>
      {!chatInputFocused && <BottomNavigation active={activeTab} onNavigate={handleNavigate} />}
    </div>
  )
}

export default function AppSPA() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppContent />
    </Suspense>
  )
}
