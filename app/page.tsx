"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import HomeSection from "@/components/sections/HomeSection"
import EventsSection from "@/components/sections/EventsSection"
import GuidesSection from "@/components/sections/GuidesSection"
import ChatSection from "@/components/sections/ChatSection"
import MapSection from "@/components/sections/MapSection"
import AudioGuideSection from "@/components/sections/AudioGuideSection"
import BottomNavigation from "@/components/bottom-navigation"
import { AUDIO_GUIDE_OBJECTS } from "@/lib/audio-guide-data"

const NAV = [
  { key: "home", label: "Home" },
  { key: "events", label: "Events" },
  { key: "guides", label: "Guides" },
  { key: "chat", label: "Chat" },
  { key: "map", label: "Map" },
]

function AppContent() {
  const [active, setActive] = useState("guides")
  const [audioGuideSlug, setAudioGuideSlug] = useState<string | null>(null)
  const [audioGuideLang, setAudioGuideLang] = useState<string>("en")
  const searchParams = useSearchParams()

  useEffect(() => {
    const path = window.location.pathname
    const slug = path.substring(1) // Убираем / в начале

    if (slug) {
      const guideExists = AUDIO_GUIDE_OBJECTS.some(g => g.slug === slug)
      if (guideExists) {
        setAudioGuideSlug(slug)
        // Можно также установить язык, если он передается, например, в query-параметрах
        // const lang = new URLSearchParams(window.location.search).get('lang');
        // if (lang) setAudioGuideLang(lang);
      }
    }
  }, [])

  const handleOpenAudioGuide = (slug: string, lang: string) => {
    setAudioGuideSlug(slug)
    setAudioGuideLang(lang)
    window.history.pushState({}, '', `/${slug}`)
  }

  const handleCloseAudioGuide = () => {
    setAudioGuideSlug(null)
    window.history.pushState({}, '', '/')
  }

  // Если открыт аудиогид, показываем его
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
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {active === "home" && <HomeSection />}
        {active === "events" && <EventsSection />}
        {active === "guides" && (
          <GuidesSection onOpenAudioGuide={handleOpenAudioGuide} />
        )}
        {active === "chat" && <ChatSection />}
        {active === "map" && <MapSection />}
      </div>
      {!audioGuideSlug && (
        <BottomNavigation active={active} onNavigate={setActive} />
      )}
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
