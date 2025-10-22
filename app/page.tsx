"use client"

import { useState, useEffect, Suspense } from "react"
import GuidesSection from "@/components/sections/GuidesSection"
import AudioGuideSection from "@/components/sections/AudioGuideSection"
import { AUDIO_GUIDE_OBJECTS } from "@/lib/audio-guide-data"

function AppContent() {
  const [audioGuideSlug, setAudioGuideSlug] = useState<string | null>(null)
  const [audioGuideLang, setAudioGuideLang] = useState<string>("en")

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
    <div className="min-h-screen">
      <GuidesSection onOpenAudioGuide={handleOpenAudioGuide} />
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
