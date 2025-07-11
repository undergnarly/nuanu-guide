"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Headphones, 
  Play,
  Pause,
  MapPin,
  Clock,
  Globe,
  ExternalLink,
  QrCode,
  Bookmark
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AUDIO_GUIDE_OBJECTS } from "@/lib/audio-guide-data"
import { QRCodeCanvas } from 'qrcode.react'

interface GuidesSectionProps {
  onOpenAudioGuide?: (slug: string, lang: string) => void
}

export default function GuidesSection({ onOpenAudioGuide }: GuidesSectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  
  const [currentAudio, setCurrentAudio] = useState<{id: string, url: string} | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // QR modal state
  const [qrGuide, setQrGuide] = useState<null | typeof AUDIO_GUIDE_OBJECTS[0]>(null)

  const handlePlayPause = (guideId: string, audioUrl: string) => {
    if (currentAudio?.id === guideId) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
    } else {
      setCurrentAudio({ id: guideId, url: audioUrl });
    }
  }

  useEffect(() => {
    if (currentAudio && audioRef.current) {
      audioRef.current.src = currentAudio.url
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  }, [currentAudio]);

  const categoryColors = {
    art: 'bg-purple-100 text-purple-800',
    history: 'bg-blue-100 text-blue-800',
    architecture: 'bg-green-100 text-green-800',
    nature: 'bg-emerald-100 text-emerald-800',
    culture: 'bg-orange-100 text-orange-800'
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="guides-page"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="container p-4"
      >
        {/* Sticky Language Selector */}
        <div className="fixed top-6 left-1/2 z-40 -translate-x-1/2 pointer-events-none">
          <div className="inline-flex rounded-full p-1 shadow-xl backdrop-blur-md bg-white/70 dark:bg-gray-900/70 pointer-events-auto">
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedLanguage === 'en'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-transparent text-gray-700 hover:bg-gray-200/50 dark:text-gray-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLanguage('ru')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedLanguage === 'ru'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-transparent text-gray-700 hover:bg-gray-200/50 dark:text-gray-200'
              }`}
            >
              Русский
            </button>
            <button
              onClick={() => setSelectedLanguage('id')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedLanguage === 'id'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-transparent text-gray-700 hover:bg-gray-200/50 dark:text-gray-200'
              }`}
            >
              Bahasa
            </button>
          </div>
        </div>

        {/* Spacer for sticky header */}
        <div className="h-20" />

        <audio 
          ref={audioRef} 
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentAudio(null);
          }}
        />

        {/* Featured Audio Guide Objects */}
        <div className="mb-8">
          <div className="space-y-4">
            {AUDIO_GUIDE_OBJECTS.map((guide) => (
              <motion.div
                key={guide.id}
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
                  className="relative rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group p-3 pb-4 cursor-pointer"
                  style={{
                    background: guide.card_color 
                      ? `linear-gradient(to bottom, ${guide.card_color} 0%, ${guide.card_color}aa 100%)`
                      : `linear-gradient(to bottom, 
                        ${guide.category === 'art' ? 'rgb(88, 28, 135)' : 
                        guide.category === 'history' ? 'rgb(30, 58, 138)' : 
                        guide.category === 'architecture' ? 'rgb(124, 45, 18)' : 
                        guide.category === 'nature' ? 'rgb(34, 139, 34)' :
                        guide.category === 'culture' ? 'rgb(168, 85, 247)' :
                        'rgb(88, 28, 135)'} 0%,
                        ${guide.category === 'art' ? 'rgb(126, 34, 206)' : 
                        guide.category === 'history' ? 'rgb(59, 130, 246)' : 
                        guide.category === 'architecture' ? 'rgb(234, 88, 12)' : 
                        guide.category === 'nature' ? 'rgb(34, 197, 94)' :
                        guide.category === 'culture' ? 'rgb(196, 125, 255)' :
                        'rgb(126, 34, 206)'} 100%)`
                  }}
                  onClick={() => onOpenAudioGuide?.(guide.slug, selectedLanguage)}
                >
                  {/* Изображение */}
                  <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                    <Image
                      src={guide.image}
                      alt={guide.content[selectedLanguage]?.title || guide.slug}
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
                            <Headphones className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-white/90">Audio Guide</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-white/70" />
                            <span className="text-white">{Math.ceil(guide.duration / 60)} min</span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-serif font-bold mb-3 leading-tight text-white group-hover:opacity-80 transition-opacity">
                          {guide.content[selectedLanguage]?.title || 'Audio Guide'}
                        </h3>
                        <p className="text-base text-white/80 line-clamp-3 leading-relaxed mb-4">
                          {guide.content[selectedLanguage]?.description || 'Audio guide description'}
                        </p>
                        {guide.audio_url ? (
                          <button 
                            className="inline-flex items-center gap-2 text-white group-hover:gap-3 transition-all"
                            onClick={(e) => {
                              e.stopPropagation()
                              if (guide.audio_url) {
                                handlePlayPause(guide.id, guide.audio_url)
                              }
                            }}
                          >
                            {(isPlaying && currentAudio?.id === guide.id) ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            <span>{(isPlaying && currentAudio?.id === guide.id) ? 'Pause' : 'Play Intro'}</span>
                          </button>
                        ) : (
                          <div 
                            className="inline-flex items-center gap-2 text-white group-hover:gap-3 transition-all cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              onOpenAudioGuide?.(guide.slug, selectedLanguage)}
                            }
                          >
                            <Play className="w-4 h-4" />
                            <span>Start Guide</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-center gap-3 ml-4">
                        <button 
                          className="p-2 hover:bg-white/10 rounded-full transition-colors" 
                          onClick={(e) => {
                            e.stopPropagation()
                            // Логика для избранного
                          }}
                        >
                          <Bookmark className="w-6 h-6 text-white" />
                        </button>
                        <button 
                          className="p-2 hover:bg-white/10 rounded-full transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            setQrGuide(guide)
                          }}
                        >
                          <QrCode className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                    </div>
              </motion.div>
            ))}
          </div>
        </div>



        {/* QR Code Info */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <QrCode className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Scan & Listen</h3>
                <p className="text-gray-600 mb-4">
                  Find QR codes next to objects throughout Nuanu Creative City. 
                  Scan them with your phone to instantly access audio guides without downloading any app.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Headphones className="h-4 w-4 mr-1" />
                    <span>Audio guides</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    <span>Multiple languages</span>
                  </div>
                  <div className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    <span>No app required</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* QR Modal */}
      <AnimatePresence>
        {qrGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
            onClick={() => setQrGuide(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg p-6 sm:p-8 text-center"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-2">{qrGuide.content[selectedLanguage]?.title}</h3>
              <p className="text-sm text-gray-500 mb-4">Scan the code to open this guide</p>
              <div className="p-4 bg-gray-100 rounded-md inline-block">
                <QRCodeCanvas
                  value={`${window.location.origin}/${qrGuide.slug}`}
                  size={192}
                  includeMargin={true}
                />
              </div>
              <p className="mt-4 text-xs text-gray-600 break-all">
                {`${window.location.origin}/${qrGuide.slug}`}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQrGuide(null)}
                className="mt-6"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
}

 