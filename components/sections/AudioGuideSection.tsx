"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  MapPin, 
  Clock, 
  Globe,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
  Eye,
  Type,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { AUDIO_GUIDE_OBJECTS, SUPPORTED_LANGUAGES } from '@/lib/audio-guide-data'
import { AudioGuideObject, AudioPlayerState } from '@/lib/audio-guide-types'

interface AudioGuideSectionProps {
  slug: string
  lang: string
  onClose: () => void
}

export default function AudioGuideSection({ slug, lang, onClose }: AudioGuideSectionProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioGuideObject, setAudioGuideObject] = useState<AudioGuideObject | null>(null)
  const [currentLanguage, setCurrentLanguage] = useState(lang)
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState('video')
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [largeFonts, setLargeFonts] = useState(false)
  
  const [playerState, setPlayerState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    playbackRate: 1.0,
    currentTranscriptIndex: 0,
    currentWordIndex: 0
  })

  useEffect(() => {
    const foundObject = AUDIO_GUIDE_OBJECTS.find(obj => obj.slug === slug)
    if (foundObject) {
      setAudioGuideObject(foundObject)
      setIsLoading(false)
    } else {
      onClose() // Если объект не найден, закрываем
    }
  }, [slug, onClose])

  useEffect(() => {
    setCurrentLanguage(lang)
  }, [lang])

  const content = audioGuideObject?.content[currentLanguage]
  const transcript = content?.audio?.transcript || []
  const currentTranscript = transcript[playerState.currentTranscriptIndex]

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playerState.isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
  }

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}?audio-guide=${slug}&lang=${currentLanguage}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: content?.title || 'Nuanu Audio Guide',
          text: content?.description || '',
          url: shareUrl,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(shareUrl)
      alert('Link copied to clipboard!')
    }
  }

  const renderHighlightedText = () => {
    if (!currentTranscript) return null

    if (currentTranscript.word_timings && currentTranscript.word_timings.length > 0) {
      return (
        <div className="text-center leading-relaxed">
          {currentTranscript.word_timings.map((word, index) => (
            <span
              key={index}
              className={`inline-block mx-1 px-1 py-0.5 rounded transition-all duration-200 ${
                index === playerState.currentWordIndex
                  ? 'bg-purple-200 text-purple-800 font-semibold scale-105'
                  : index < playerState.currentWordIndex
                  ? 'text-gray-600'
                  : 'text-gray-800'
              }`}
            >
              {word.word}
            </span>
          ))}
        </div>
      )
    }

    return (
      <div className="text-center">
        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
          {currentTranscript.text}
        </span>
      </div>
    )
  }

  if (isLoading || !audioGuideObject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading audio guide...</p>
        </div>
      </div>
    )
  }

  const categoryColors = {
    art: 'bg-purple-100 text-purple-800',
    history: 'bg-blue-100 text-blue-800',
    architecture: 'bg-green-100 text-green-800',
    nature: 'bg-emerald-100 text-emerald-800',
    culture: 'bg-orange-100 text-orange-800'
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 ${highContrast ? 'contrast-125' : ''} ${largeFonts ? 'text-lg' : ''}`}>
      <audio
        ref={audioRef}
        src={content?.audio?.url}
        preload="metadata"
        aria-label={`Audio guide for ${content?.title}`}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
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
      </motion.div>

      <div className="container mx-auto px-4 py-6 pb-32">
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
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

        {/* Video Section */}
        {audioGuideObject.video && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg overflow-hidden">
              <div className="relative aspect-video bg-black">
                {audioGuideObject.video.youtube_id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${audioGuideObject.video.youtube_id}?rel=0&modestbranding=1`}
                    title={content?.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-white">
                    <div className="text-center">
                      <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Video content unavailable</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">About This Location</h3>
              <p className={`${largeFonts ? 'text-lg' : 'text-base'} leading-relaxed text-gray-700 mb-4`}>
                {content?.description}
              </p>
              
              {/* Highlighted Text during Audio */}
              {currentTranscript && playerState.isPlaying && (
                <div className={`mb-4 p-4 bg-gray-50 rounded-lg ${largeFonts ? 'text-lg' : 'text-base'}`}>
                  {renderHighlightedText()}
                </div>
              )}

              <div className={`${largeFonts ? 'text-base' : 'text-sm'} leading-relaxed text-gray-700`}>
                {content?.full_text.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Highlights */}
        {content?.highlights && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Key Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {content.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-6"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-red-500" />
                Location
              </h3>
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${audioGuideObject.coordinates.lng-0.01},${audioGuideObject.coordinates.lat-0.01},${audioGuideObject.coordinates.lng+0.01},${audioGuideObject.coordinates.lat+0.01}&layer=mapnik&marker=${audioGuideObject.coordinates.lat},${audioGuideObject.coordinates.lng}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="rounded-lg"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${audioGuideObject.coordinates.lat},${audioGuideObject.coordinates.lng}`, '_blank')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Google Maps
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`https://www.openstreetmap.org/?mlat=${audioGuideObject.coordinates.lat}&mlon=${audioGuideObject.coordinates.lng}#map=18/${audioGuideObject.coordinates.lat}/${audioGuideObject.coordinates.lng}`, '_blank')}
                >
                  Full Map
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Accessibility Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-6"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2 text-blue-600" />
                Accessibility
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Eye className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">High Contrast</span>
                  </div>
                  <Switch
                    checked={highContrast}
                    onCheckedChange={setHighContrast}
                    aria-label="Toggle high contrast mode"
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Type className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">Large Fonts</span>
                  </div>
                  <Switch
                    checked={largeFonts}
                    onCheckedChange={setLargeFonts}
                    aria-label="Toggle large fonts"
                  />
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Location Features</p>
                      <div className="flex flex-wrap gap-2">
                        {audioGuideObject.accessibility.wheelchair_accessible && (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                            Wheelchair Accessible
                          </Badge>
                        )}
                        {audioGuideObject.accessibility.audio_description && (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                            Audio Description
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Audio Player */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <Card className="rounded-t-2xl rounded-b-none border-t shadow-2xl bg-white/95 backdrop-blur-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPlayerExpanded(!isPlayerExpanded)}
                  className="h-8 w-8"
                  aria-label={isPlayerExpanded ? 'Collapse player' : 'Expand player'}
                >
                  {isPlayerExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                </Button>

                <div className="flex items-center space-x-3 flex-1 min-w-0 mx-4">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={audioGuideObject.image}
                      alt={content?.title || 'Audio Guide'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold truncate text-sm">
                      {content?.title}
                    </h4>
                    <p className="text-gray-600 truncate text-xs">
                      Audio Guide • {Math.ceil(audioGuideObject.duration / 60)} min
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    aria-label="Skip backward 15 seconds"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="icon"
                    onClick={togglePlayPause}
                    className="h-10 w-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white"
                    aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
                  >
                    {playerState.isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4 ml-0.5" />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    aria-label="Skip forward 15 seconds"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {isPlayerExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 space-y-3"
                >
                  <Slider
                    value={[playerState.duration > 0 ? (playerState.currentTime / playerState.duration) * 100 : 0]}
                    max={100}
                    step={0.1}
                    className="w-full"
                    aria-label="Audio progress"
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Toggle mute"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Slider
                        value={[playerState.volume * 100]}
                        max={100}
                        step={1}
                        className="w-20"
                        aria-label="Volume"
                      />
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      0:00 / {Math.ceil(audioGuideObject.duration / 60)}:00
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 