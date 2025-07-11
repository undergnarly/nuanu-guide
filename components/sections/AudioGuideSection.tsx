"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, Volume2, VolumeX, MapPin, Phone, Mail, MessageCircle, ExternalLink, Accessibility, Car, Eye, Ear, QrCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { AudioGuideObject } from '@/lib/audio-guide-types'
import { QRCodeCanvas } from 'qrcode.react'

interface AudioGuideSectionProps {
  audioGuide: AudioGuideObject
  language: 'en' | 'ru' | 'id'
  onClose: () => void
}

export default function AudioGuideSection({ audioGuide, language, onClose }: AudioGuideSectionProps) {
  const content = audioGuide.content[language]
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(() => {
    const maxTime = Math.max(...content.audio_timestamps.map(ts => ts.end))
    return maxTime || 300 // Default 5 minutes if no timestamps
  })
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showQrModal, setShowQrModal] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const categoryColors = {
    art: 'bg-purple-100 text-purple-800',
    history: 'bg-blue-100 text-blue-800',
    architecture: 'bg-green-100 text-green-800',
    nature: 'bg-emerald-100 text-emerald-800',
    culture: 'bg-orange-100 text-orange-800'
  }

  const categoryLabels = {
    art: { en: 'Art', ru: 'Искусство', id: 'Seni' },
    history: { en: 'History', ru: 'История', id: 'Sejarah' },
    architecture: { en: 'Architecture', ru: 'Архитектура', id: 'Arsitektur' },
    nature: { en: 'Nature', ru: 'Природа', id: 'Alam' },
    culture: { en: 'Culture', ru: 'Культура', id: 'Budaya' }
  }

  const labels = {
    en: {
      close: 'Close',
      play: 'Play',
      pause: 'Pause',
      mute: 'Mute',
      unmute: 'Unmute',
      highlights: 'Key Highlights',
      pricing: 'Pricing & Services',
      location: 'Location',
      accessibility: 'Accessibility',
      bookNow: 'Book Now',
      contact: 'Contact',
      wheelchairAccessible: 'Wheelchair Accessible',
      audioDescription: 'Audio Description',
      signLanguage: 'Sign Language',
      available: 'Available',
      notAvailable: 'Not Available'
    },
    ru: {
      close: 'Закрыть',
      play: 'Воспроизвести',
      pause: 'Пауза',
      mute: 'Выключить звук',
      unmute: 'Включить звук',
      highlights: 'Ключевые особенности',
      pricing: 'Цены и услуги',
      location: 'Местоположение',
      accessibility: 'Доступность',
      bookNow: 'Забронировать',
      contact: 'Контакты',
      wheelchairAccessible: 'Доступно для инвалидных колясок',
      audioDescription: 'Аудиоописание',
      signLanguage: 'Язык жестов',
      available: 'Доступно',
      notAvailable: 'Недоступно'
    },
    id: {
      close: 'Tutup',
      play: 'Putar',
      pause: 'Jeda',
      mute: 'Bisukan',
      unmute: 'Suara',
      highlights: 'Sorotan Utama',
      pricing: 'Harga & Layanan',
      location: 'Lokasi',
      accessibility: 'Aksesibilitas',
      bookNow: 'Pesan Sekarang',
      contact: 'Kontak',
      wheelchairAccessible: 'Dapat Diakses Kursi Roda',
      audioDescription: 'Deskripsi Audio',
      signLanguage: 'Bahasa Isyarat',
      available: 'Tersedia',
      notAvailable: 'Tidak Tersedia'
    }
  }

  const t = labels[language]

  useEffect(() => {
    if (audioRef.current && audioGuide.audio_url) {
      audioRef.current.src = audioGuide.audio_url
    }
  }, [audioGuide.audio_url])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      const currentTimestamp = content.audio_timestamps.find(
        (ts) =>
          audioRef.current!.currentTime >= ts.start && audioRef.current!.currentTime < ts.end
      )
      if (currentTimestamp) {
        const index = content.audio_timestamps.indexOf(currentTimestamp)
        setCurrentWordIndex(index)
      }
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleTimeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      const newVolume = value[0]
      audioRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuteState = !isMuted
      audioRef.current.muted = newMuteState
      setIsMuted(newMuteState)
    }
  }

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00"
    const roundedSeconds = Math.round(seconds)
    const mins = Math.floor(roundedSeconds / 60)
    const secs = roundedSeconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getYouTubeEmbedUrl = (youtubeId: string) => {
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=0&controls=1&rel=0`
  }

  const handleBooking = () => {
    if (audioGuide.pricing?.booking_url) {
      window.open(audioGuide.pricing.booking_url, '_blank')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-1 sm:p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-none sm:rounded-lg w-full h-full sm:max-w-4xl sm:w-full sm:max-h-[95vh] overflow-y-auto"
      >
        <audio
          ref={audioRef}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          muted={isMuted}
          className="hidden"
        />
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-2 sm:p-4 flex items-center justify-between z-10">
          <div className="flex items-center space-x-2 sm:space-x-3 overflow-hidden">
            <Badge className={`${categoryColors[audioGuide.category]} text-xs`}>
              {categoryLabels[audioGuide.category][language]}
            </Badge>
            <span className="text-sm font-medium text-gray-700 truncate">
              {content.title}
            </span>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowQrModal(true)}
              className="shrink-0 p-1 sm:p-2"
            >
              <QrCode className="h-4 w-4" />
              <span className="sr-only">Show QR Code</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="shrink-0 p-1 sm:p-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">{t.close}</span>
            </Button>
          </div>
        </div>

        <div className="p-2 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Image + Title */}
          <div className="space-y-2 sm:space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={audioGuide.image}
                alt={content.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{content.title}</h1>
            </div>
          </div>

          {/* Audio Player */}
          <Card>
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Button
                  onClick={togglePlayPause}
                  size="sm"
                  variant="ghost"
                  className="rounded-full w-10 h-10 p-0 flex items-center justify-center flex-shrink-0"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                  <span className="sr-only">{isPlaying ? t.pause : t.play}</span>
                </Button>

                <span className="text-xs text-gray-500 font-mono w-12 text-center">
                  {formatTime(currentTime)}
                </span>
                
                <div className="flex-grow">
                  <Slider
                    value={[currentTime]}
                    max={duration}
                    step={1}
                    onValueChange={handleTimeChange}
                  />
                </div>

                <span className="text-xs text-gray-500 font-mono w-12 text-center">
                  {formatTime(duration)}
                </span>

                <Button
                  onClick={toggleMute}
                  size="sm"
                  variant="ghost"
                  className="rounded-full w-10 h-10 p-0 flex items-center justify-center flex-shrink-0"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                  <span className="sr-only">{isMuted ? t.unmute : t.mute}</span>
                </Button>
              </div>

              {/* Full Text */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-600 whitespace-pre-wrap text-sm sm:text-base">
                  {content.full_text}
                </p>
              </div>

              {/* Text with highlighting */}
              <div className="prose prose-sm sm:prose-base max-w-none">
                {content.audio_timestamps.map((timestamp, index) => (
                  <span
                    key={index}
                    className="text-gray-700 text-sm sm:text-base"
                  >
                    {timestamp.text}{' '}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Video */}
          {audioGuide.video?.youtube_id && (
            <Card>
              <CardHeader className="p-3 sm:p-4 lg:p-6">
                <CardTitle className="text-lg sm:text-xl">Video</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
                <div className="aspect-[9/16] sm:aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={getYouTubeEmbedUrl(audioGuide.video.youtube_id)}
                    title={content.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Key Highlights */}
          <Card>
            <CardHeader className="p-3 sm:p-4 lg:p-6">
              <CardTitle className="text-lg sm:text-xl flex items-center">
                <span className="mr-2">✨</span>
                {t.highlights}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
              <ul className="space-y-2 sm:space-y-3">
                {content.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                    <span className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mt-1.5 sm:mt-2"></span>
                    <span className="text-gray-700 text-sm sm:text-base">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Pricing & Services */}
          {audioGuide.pricing && (
            <Card>
              <CardHeader className="p-3 sm:p-4 lg:p-6">
                <CardTitle className="text-lg sm:text-xl flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                  <span className="flex items-center">
                    <span className="mr-2">💰</span>
                    {t.pricing}
                  </span>
                  {audioGuide.pricing.booking_url && (
                    <Button
                      onClick={handleBooking}
                      size="sm"
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 w-full sm:w-auto"
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="text-sm">{t.bookNow}</span>
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
                <div className="space-y-4 sm:space-y-6">
                  {audioGuide.pricing.services.map((service, index) => (
                    <div key={service.id} className="border-l-4 border-gradient-to-b from-purple-600 to-pink-600 pl-3 sm:pl-4">
                      <div className="flex flex-col sm:flex-row items-start justify-between space-y-2 sm:space-y-0">
                        <div className="flex-1">
                          <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">
                            {service.name[language]}
                          </h3>
                          <p className="text-gray-600 mb-2 text-sm sm:text-base">{service.description[language]}</p>
                          <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                            {service.age_group && (
                              <Badge variant="secondary" className="text-xs">
                                {service.age_group}
                              </Badge>
                            )}
                            {service.schedule && (
                              <Badge variant="secondary" className="text-xs">
                                {service.schedule}
                              </Badge>
                            )}
                            {service.max_participants && (
                              <Badge variant="secondary" className="text-xs">
                                Max: {service.max_participants}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-left sm:text-right sm:ml-4 w-full sm:w-auto">
                          <div className="text-base sm:text-lg font-bold text-gray-900">{service.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Contact Information */}
                  {audioGuide.pricing.contact_info && (
                    <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">{t.contact}</h4>
                      <div className="space-y-2">
                        {audioGuide.pricing.contact_info.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                            <a href={`tel:${audioGuide.pricing.contact_info.phone}`} className="text-blue-600 hover:text-blue-800 text-sm sm:text-base">
                              {audioGuide.pricing.contact_info.phone}
                            </a>
                          </div>
                        )}
                        {audioGuide.pricing.contact_info.email && (
                          <div className="flex items-center space-x-2">
                            <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                            <a href={`mailto:${audioGuide.pricing.contact_info.email}`} className="text-blue-600 hover:text-blue-800 text-sm sm:text-base">
                              {audioGuide.pricing.contact_info.email}
                            </a>
                          </div>
                        )}
                        {audioGuide.pricing.contact_info.whatsapp && (
                          <div className="flex items-center space-x-2">
                            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                            <a href={`https://wa.me/${audioGuide.pricing.contact_info.whatsapp.replace(/[^0-9]/g, '')}`} className="text-green-600 hover:text-green-800 text-sm sm:text-base">
                              WhatsApp
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Location */}
          <Card>
            <CardHeader className="p-3 sm:p-4 lg:p-6">
              <CardTitle className="text-lg sm:text-xl flex items-center">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                {t.location}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${audioGuide.coordinates.lng-0.01},${audioGuide.coordinates.lat-0.01},${audioGuide.coordinates.lng+0.01},${audioGuide.coordinates.lat+0.01}&layer=mapnik&marker=${audioGuide.coordinates.lat},${audioGuide.coordinates.lng}`}
                  className="w-full h-full border-0"
                  title={`Map of ${content.title}`}
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                {audioGuide.coordinates.lat.toFixed(6)}, {audioGuide.coordinates.lng.toFixed(6)}
              </p>
            </CardContent>
          </Card>

          {/* Accessibility */}
          <Card>
            <CardHeader className="p-3 sm:p-4 lg:p-6">
              <CardTitle className="text-lg sm:text-xl flex items-center">
                <Accessibility className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                {t.accessibility}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Car className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                    <span className="text-gray-700 text-sm sm:text-base">{t.wheelchairAccessible}</span>
                  </div>
                  <Badge variant={audioGuide.accessibility.wheelchair_accessible ? "default" : "secondary"} className="text-xs">
                    {audioGuide.accessibility.wheelchair_accessible ? t.available : t.notAvailable}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Ear className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                    <span className="text-gray-700 text-sm sm:text-base">{t.audioDescription}</span>
                  </div>
                  <Badge variant={audioGuide.accessibility.audio_description ? "default" : "secondary"} className="text-xs">
                    {audioGuide.accessibility.audio_description ? t.available : t.notAvailable}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                    <span className="text-gray-700 text-sm sm:text-base">{t.signLanguage}</span>
                  </div>
                  <Badge variant={audioGuide.accessibility.sign_language ? "default" : "secondary"} className="text-xs">
                    {audioGuide.accessibility.sign_language ? t.available : t.notAvailable}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
      <AnimatePresence>
        {showQrModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
            onClick={() => setShowQrModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg p-6 sm:p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-2">{content.title}</h3>
              <p className="text-sm text-gray-500 mb-4">Scan the code to open this guide</p>
              <div className="p-4 bg-gray-100 rounded-md inline-block">
                <QRCodeCanvas
                  value={`${window.location.origin}/${audioGuide.slug}`}
                  size={192}
                  includeMargin={true}
                />
              </div>
              <p className="mt-4 text-xs text-gray-600 break-all">
                {`${window.location.origin}/${audioGuide.slug}`}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQrModal(false)}
                className="mt-6"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 