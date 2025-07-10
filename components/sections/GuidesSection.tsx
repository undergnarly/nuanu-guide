"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Headphones, 
  Play, 
  MapPin,
  Clock,
  Globe,
  ExternalLink,
  QrCode,
  Bookmark
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AUDIO_GUIDE_OBJECTS } from "@/lib/audio-guide-data"

interface GuidesSectionProps {
  onOpenAudioGuide?: (slug: string, lang: string) => void
}

export default function GuidesSection({ onOpenAudioGuide }: GuidesSectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("en")



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
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Audio Guides</h1>
          <p className="text-gray-600">
            Discover Nuanu through immersive audio experiences
          </p>
          
          {/* Language Selector */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedLanguage === 'en'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLanguage('ru')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedLanguage === 'ru'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Русский
            </button>
            <button
              onClick={() => setSelectedLanguage('id')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedLanguage === 'id'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bahasa
            </button>
          </div>
        </div>

        {/* Featured Audio Guide Objects */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <QrCode className="h-5 w-5 mr-2 text-purple-600" />
            Featured Locations
          </h2>
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
                    background: `linear-gradient(to bottom, 
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
                        <div className="flex items-center gap-2 text-sm text-white/90 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>Nuanu Creative City</span>
                          <span>•</span>
                          <Badge className="bg-white/20 text-white border-none text-xs">
                            {guide.category}
                          </Badge>
                          {guide.video && (
                            <>
                              <span>•</span>
                              <Badge className="bg-white/20 text-white border-none text-xs">
                                Video
                              </Badge>
                            </>
                          )}
                        </div>
                        <p className="text-base text-white/80 line-clamp-3 leading-relaxed mb-4">
                          {guide.content[selectedLanguage]?.description || 'Audio guide description'}
                        </p>
                        <div className="inline-flex items-center gap-2 text-white group-hover:gap-3 transition-all">
                          <Play className="w-4 h-4" />
                          <span>Start Guide</span>
                        </div>
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
                            // Логика для QR-кода
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
    </AnimatePresence>
  )
}

 