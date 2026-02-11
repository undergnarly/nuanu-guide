"use client"

import { useState, useEffect, useRef } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { AudioGuidePlayer } from '@/components/audio-guide/AudioGuidePlayer'
import { AudioGuideContent } from '@/components/audio-guide/AudioGuideContent'
import { AudioGuideMap } from '@/components/audio-guide/AudioGuideMap'
import { AudioGuideVideo } from '@/components/audio-guide/AudioGuideVideo'
import { LanguageSelector } from '@/components/audio-guide/LanguageSelector'
import { AccessibilityControls } from '@/components/audio-guide/AccessibilityControls'
import { AUDIO_GUIDE_OBJECTS, SUPPORTED_LANGUAGES } from '@/lib/audio-guide-data'
import { AudioGuideObject } from '@/lib/audio-guide-types'
import { ArrowLeft, Share2, Heart, MapPin, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AudioGuidePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [audioGuideObject, setAudioGuideObject] = useState<AudioGuideObject | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('content')
  const [isLiked, setIsLiked] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [largeFonts, setLargeFonts] = useState(false)

  useEffect(() => {
    // Получаем язык из URL параметров или используем браузерный язык
    const langFromUrl = searchParams.get('lang')
    const browserLang = navigator.language.split('-')[0]
    
    if (langFromUrl && SUPPORTED_LANGUAGES.find(l => l.code === langFromUrl)) {
      setCurrentLanguage(langFromUrl)
    } else if (SUPPORTED_LANGUAGES.find(l => l.code === browserLang)) {
      setCurrentLanguage(browserLang)
    }

    // Загружаем объект аудиогида
    const slug = params.slug as string
    const foundObject = AUDIO_GUIDE_OBJECTS.find(obj => obj.slug === slug)
    
    if (foundObject) {
      setAudioGuideObject(foundObject)
      setIsLoading(false)
    } else {
      // Если объект не найден, перенаправляем на главную
      router.push('/guides')
    }
  }, [params.slug, searchParams, router])

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode)
    // Обновляем URL с новым языком
    const newUrl = new URL(window.location.href)
    newUrl.searchParams.set('lang', langCode)
    window.history.replaceState({}, '', newUrl.toString())
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: audioGuideObject?.content[currentLanguage]?.title || 'Nuanu Audio Guide',
          text: audioGuideObject?.content[currentLanguage]?.description || '',
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback для браузеров без Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading audio guide...</p>
        </div>
      </div>
    )
  }

  if (!audioGuideObject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Audio Guide Not Found</h1>
          <p className="text-gray-600 mb-6">The requested audio guide could not be found.</p>
          <Link href="/guides">
            <Button className="bg-black hover:bg-neutral-800">
              Back to Guides
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const content = audioGuideObject.content[currentLanguage]
  const categoryColors = {
    art: 'bg-neutral-100 text-neutral-800',
    history: 'bg-blue-100 text-blue-800',
    architecture: 'bg-green-100 text-green-800',
    nature: 'bg-emerald-100 text-emerald-800',
    culture: 'bg-orange-100 text-orange-800'
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 ${highContrast ? 'contrast-125' : ''} ${largeFonts ? 'text-lg' : ''}`}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="hover:bg-gray-100"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold text-lg truncate max-w-48">
                  {content?.title || 'Audio Guide'}
                </h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{Math.ceil(audioGuideObject.duration / 60)} min</span>
                  <Badge className={categoryColors[audioGuideObject.category]}>
                    {audioGuideObject.category}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
                availableLanguages={Object.keys(audioGuideObject.content)}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className="hover:bg-gray-100"
                aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="hover:bg-gray-100"
                aria-label="Share"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 pb-32">
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6 shadow-xl"
        >
          <Image
            src={audioGuideObject.image}
            alt={content?.title || 'Audio Guide'}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center space-x-2 text-white/90 text-sm mb-2">
              <MapPin className="h-4 w-4" />
              <span>Nuanu Creative City, Bali</span>
            </div>
            <h2 className="text-white text-xl font-bold">
              {content?.title}
            </h2>
          </div>
        </motion.div>

        {/* Accessibility Controls */}
        <AccessibilityControls
          highContrast={highContrast}
          largeFonts={largeFonts}
          onHighContrastChange={setHighContrast}
          onLargeFontsChange={setLargeFonts}
          accessibilityInfo={audioGuideObject.accessibility}
        />

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="content" className="text-sm">
              Content
            </TabsTrigger>
            <TabsTrigger value="video" className="text-sm">
              Video
            </TabsTrigger>
            <TabsTrigger value="map" className="text-sm">
              Map
            </TabsTrigger>
            <TabsTrigger value="more" className="text-sm">
              More
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="content" className="mt-6">
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AudioGuideContent
                  content={content}
                  currentLanguage={currentLanguage}
                  largeFonts={largeFonts}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="video" className="mt-6">
              <motion.div
                key="video"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AudioGuideVideo
                  video={audioGuideObject.video}
                  title={content?.title || ''}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="map" className="mt-6">
              <motion.div
                key="map"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AudioGuideMap
                  coordinates={audioGuideObject.coordinates}
                  title={content?.title || ''}
                  category={audioGuideObject.category}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="more" className="mt-6">
              <motion.div
                key="more"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Highlights */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Key Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {content?.highlights?.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-black rounded-full flex-shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Fun Facts */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Fun Facts</h3>
                    <div className="space-y-3">
                      {content?.fun_facts?.map((fact, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-neutral-100 text-black dark:text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-sm">{fact}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>

      {/* Audio Player */}
      <AudioGuidePlayer
        audioGuideObject={audioGuideObject}
        currentLanguage={currentLanguage}
        largeFonts={largeFonts}
      />
    </div>
  )
} 