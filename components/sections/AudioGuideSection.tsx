"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, Volume2, VolumeX, MapPin, Phone, Mail, MessageCircle, ExternalLink, Accessibility, Car, Eye, Ear } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { AudioGuideObject } from '@/lib/audio-guide-types'

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
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTime(prev => {
          const newTime = prev + 1
          if (newTime >= duration) {
            setIsPlaying(false)
            return 0
          }
          
          // Update current word based on timestamp
          const currentTimestamp = content.audio_timestamps.find(
            (ts, index) => newTime >= ts.start && newTime < ts.end
          )
          if (currentTimestamp) {
            const index = content.audio_timestamps.indexOf(currentTimestamp)
            setCurrentWordIndex(index)
          }
          
          return newTime
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, duration, content.audio_timestamps])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTimeChange = (value: number[]) => {
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    setIsMuted(value[0] === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
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
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge className={categoryColors[audioGuide.category]}>
              {categoryLabels[audioGuide.category][language]}
            </Badge>
            <span className="text-sm text-gray-500">
              {formatTime(duration)} • {audioGuide.coordinates.lat.toFixed(4)}, {audioGuide.coordinates.lng.toFixed(4)}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">{t.close}</span>
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Image + Title */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={audioGuide.image}
                alt={content.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
              <p className="text-lg text-gray-600">{content.description}</p>
            </div>
          </div>

          {/* Audio Player */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Button
                  onClick={togglePlayPause}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  <span className="ml-2">{isPlaying ? t.pause : t.play}</span>
                </Button>
                
                <div className="flex-1">
                  <Slider
                    value={[currentTime]}
                    onValueChange={handleTimeChange}
                    max={duration}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <div className="w-20">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      onValueChange={handleVolumeChange}
                      max={1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              {/* Text with synchronized highlighting */}
              <div className="prose prose-gray max-w-none">
                {content.audio_timestamps.map((timestamp, index) => (
                  <span
                    key={index}
                    className={`${
                      index === currentWordIndex
                        ? 'bg-yellow-200 text-yellow-900'
                        : 'text-gray-700'
                    } transition-colors duration-200`}
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
              <CardHeader>
                <CardTitle className="text-xl">Video</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden">
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

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">{content.full_text}</p>
              </div>
            </CardContent>
          </Card>

          {/* Key Highlights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <span className="mr-2">✨</span>
                {t.highlights}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mt-2"></span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Pricing & Services */}
          {audioGuide.pricing && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="mr-2">💰</span>
                    {t.pricing}
                  </span>
                  {audioGuide.pricing.booking_url && (
                    <Button
                      onClick={handleBooking}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t.bookNow}
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {audioGuide.pricing.services.map((service, index) => (
                    <div key={service.id} className="border-l-4 border-gradient-to-b from-purple-600 to-pink-600 pl-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 mb-1">
                            {service.name[language]}
                          </h3>
                          <p className="text-gray-600 mb-2">{service.description[language]}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
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
                        <div className="text-right ml-4">
                          <div className="text-lg font-bold text-gray-900">{service.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Contact Information */}
                  {audioGuide.pricing.contact_info && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">{t.contact}</h4>
                      <div className="space-y-2">
                        {audioGuide.pricing.contact_info.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <a href={`tel:${audioGuide.pricing.contact_info.phone}`} className="text-blue-600 hover:text-blue-800">
                              {audioGuide.pricing.contact_info.phone}
                            </a>
                          </div>
                        )}
                        {audioGuide.pricing.contact_info.email && (
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <a href={`mailto:${audioGuide.pricing.contact_info.email}`} className="text-blue-600 hover:text-blue-800">
                              {audioGuide.pricing.contact_info.email}
                            </a>
                          </div>
                        )}
                        {audioGuide.pricing.contact_info.whatsapp && (
                          <div className="flex items-center space-x-2">
                            <MessageCircle className="h-4 w-4 text-gray-500" />
                            <a href={`https://wa.me/${audioGuide.pricing.contact_info.whatsapp.replace(/[^0-9]/g, '')}`} className="text-green-600 hover:text-green-800">
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
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {t.location}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${audioGuide.coordinates.lng-0.01},${audioGuide.coordinates.lat-0.01},${audioGuide.coordinates.lng+0.01},${audioGuide.coordinates.lat+0.01}&layer=mapnik&marker=${audioGuide.coordinates.lat},${audioGuide.coordinates.lng}`}
                  className="w-full h-full border-0"
                  title={`Map of ${content.title}`}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {audioGuide.coordinates.lat.toFixed(6)}, {audioGuide.coordinates.lng.toFixed(6)}
              </p>
            </CardContent>
          </Card>

          {/* Accessibility */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Accessibility className="h-5 w-5 mr-2" />
                {t.accessibility}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Car className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{t.wheelchairAccessible}</span>
                  </div>
                  <Badge variant={audioGuide.accessibility.wheelchair_accessible ? "default" : "secondary"}>
                    {audioGuide.accessibility.wheelchair_accessible ? t.available : t.notAvailable}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Ear className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{t.audioDescription}</span>
                  </div>
                  <Badge variant={audioGuide.accessibility.audio_description ? "default" : "secondary"}>
                    {audioGuide.accessibility.audio_description ? t.available : t.notAvailable}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{t.signLanguage}</span>
                  </div>
                  <Badge variant={audioGuide.accessibility.sign_language ? "default" : "secondary"}>
                    {audioGuide.accessibility.sign_language ? t.available : t.notAvailable}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  )
} 