"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, Volume2, VolumeX, MapPin, Phone, Mail, MessageCircle, ExternalLink, Accessibility, Car, Eye, Ear, QrCode, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
    return maxTime || 300
  })
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showQrModal, setShowQrModal] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const categoryLabels: Record<string, Record<string, string>> = {
    art: { en: 'Art', ru: 'Искусство', id: 'Seni' },
    history: { en: 'History', ru: 'История', id: 'Sejarah' },
    architecture: { en: 'Architecture', ru: 'Архитектура', id: 'Arsitektur' },
    nature: { en: 'Nature', ru: 'Природа', id: 'Alam' },
    culture: { en: 'Culture', ru: 'Культура', id: 'Budaya' }
  }

  const labels = {
    en: {
      close: 'Close', play: 'Play', pause: 'Pause', mute: 'Mute', unmute: 'Unmute',
      highlights: 'Key Highlights', pricing: 'Pricing & Services', location: 'Location',
      accessibility: 'Accessibility', bookNow: 'Book Now', contact: 'Contact',
      wheelchairAccessible: 'Wheelchair Accessible', audioDescription: 'Audio Description',
      signLanguage: 'Sign Language', available: 'Available', notAvailable: 'Not Available'
    },
    ru: {
      close: 'Закрыть', play: 'Воспроизвести', pause: 'Пауза', mute: 'Выключить звук', unmute: 'Включить звук',
      highlights: 'Ключевые особенности', pricing: 'Цены и услуги', location: 'Местоположение',
      accessibility: 'Доступность', bookNow: 'Забронировать', contact: 'Контакты',
      wheelchairAccessible: 'Доступно для инвалидных колясок', audioDescription: 'Аудиоописание',
      signLanguage: 'Язык жестов', available: 'Доступно', notAvailable: 'Недоступно'
    },
    id: {
      close: 'Tutup', play: 'Putar', pause: 'Jeda', mute: 'Bisukan', unmute: 'Suara',
      highlights: 'Sorotan Utama', pricing: 'Harga & Layanan', location: 'Lokasi',
      accessibility: 'Aksesibilitas', bookNow: 'Pesan Sekarang', contact: 'Kontak',
      wheelchairAccessible: 'Dapat Diakses Kursi Roda', audioDescription: 'Deskripsi Audio',
      signLanguage: 'Bahasa Isyarat', available: 'Tersedia', notAvailable: 'Tidak Tersedia'
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
        (ts) => audioRef.current!.currentTime >= ts.start && audioRef.current!.currentTime < ts.end
      )
      if (currentTimestamp) {
        setCurrentWordIndex(content.audio_timestamps.indexOf(currentTimestamp))
      }
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }

  const handleTimeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = value[0]
      setVolume(value[0])
      setIsMuted(value[0] === 0)
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
    const r = Math.round(seconds)
    return `${Math.floor(r / 60)}:${(r % 60).toString().padStart(2, '0')}`
  }

  const handleBooking = () => {
    if (audioGuide.pricing?.booking_url) window.open(audioGuide.pricing.booking_url, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: '#f9f6f1' }}
    >
      <div className="w-full h-full sm:max-w-2xl sm:max-h-[95vh] overflow-y-auto">
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

        {/* Floating back & QR buttons */}
        <div className="fixed top-3 left-0 right-0 flex items-center justify-between px-4 z-[60] pointer-events-none sm:max-w-2xl sm:mx-auto">
          <button
            onClick={onClose}
            className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors shadow-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowQrModal(true)}
            className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors shadow-lg"
          >
            <QrCode className="h-5 w-5" />
          </button>
        </div>

        {/* Hero image */}
        <div className="relative">
          <div className="aspect-[4/3] sm:aspect-video relative overflow-hidden">
            <img
              src={audioGuide.image}
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>

          {/* Title over image */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-none text-xs mb-2 capitalize">
              {categoryLabels[audioGuide.category]?.[language] || audioGuide.category}
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{content.title}</h1>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-5 space-y-6">
          {/* Audio Player */}
          <div className="rounded-2xl p-4" style={{ backgroundColor: 'rgba(0,0,0,0.04)' }}>
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlayPause}
                className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shrink-0 hover:bg-neutral-800 transition-colors"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </button>

              <span className="text-xs text-gray-500 font-mono w-10 text-center">{formatTime(currentTime)}</span>
              <div className="flex-grow">
                <Slider value={[currentTime]} max={duration} step={1} onValueChange={handleTimeChange} />
              </div>
              <span className="text-xs text-gray-500 font-mono w-10 text-center">{formatTime(duration)}</span>

              <button
                onClick={toggleMute}
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-black/10 transition-colors"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
              {content.full_text}
            </p>
          </div>

          {/* Video */}
          {audioGuide.video?.youtube_id && audioGuide.video.youtube_id !== 'your_youtube_id_here' && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Video</h2>
              <div className="aspect-[9/16] sm:aspect-video rounded-2xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${audioGuide.video.youtube_id}?autoplay=0&controls=1&rel=0`}
                  title={content.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Key Highlights */}
          {content.highlights.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{t.highlights}</h2>
              <ul className="space-y-2">
                {content.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pricing & Services */}
          {audioGuide.pricing && audioGuide.pricing.services.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">{t.pricing}</h2>
                {audioGuide.pricing.booking_url && (
                  <button
                    onClick={handleBooking}
                    className="px-5 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {t.bookNow}
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {audioGuide.pricing.services.map((service) => (
                  <div key={service.id} className="rounded-2xl p-4 bg-white">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base text-gray-900 mb-1">
                          {service.name[language]}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">{service.description[language]}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {service.age_group && (
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{service.age_group}</span>
                          )}
                          {service.schedule && (
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{service.schedule}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-base font-bold text-gray-900">{service.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact */}
          {audioGuide.pricing?.contact_info && (
            <div className="rounded-2xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">{t.contact}</h3>
              <div className="space-y-2.5">
                {audioGuide.pricing.contact_info.phone && (
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <a href={`tel:${audioGuide.pricing.contact_info.phone}`} className="text-sm text-gray-700 hover:text-black transition-colors">
                      {audioGuide.pricing.contact_info.phone}
                    </a>
                  </div>
                )}
                {audioGuide.pricing.contact_info.email && (
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a href={`mailto:${audioGuide.pricing.contact_info.email}`} className="text-sm text-gray-700 hover:text-black transition-colors">
                      {audioGuide.pricing.contact_info.email}
                    </a>
                  </div>
                )}
                {audioGuide.pricing.contact_info.whatsapp && (
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="h-4 w-4 text-gray-400" />
                    <a href={`https://wa.me/${audioGuide.pricing.contact_info.whatsapp.replace(/[^0-9]/g, '')}`} className="text-sm text-gray-700 hover:text-black transition-colors">
                      WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Location */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {t.location}
            </h2>
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100">
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${audioGuide.coordinates.lng-0.01},${audioGuide.coordinates.lat-0.01},${audioGuide.coordinates.lng+0.01},${audioGuide.coordinates.lat+0.01}&layer=mapnik&marker=${audioGuide.coordinates.lat},${audioGuide.coordinates.lng}`}
                className="w-full h-full border-0"
                title={`Map of ${content.title}`}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {audioGuide.coordinates.lat.toFixed(6)}, {audioGuide.coordinates.lng.toFixed(6)}
            </p>
          </div>

          {/* Accessibility */}
          <div className="rounded-2xl p-4 bg-white mb-8">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Accessibility className="h-4 w-4" />
              {t.accessibility}
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{t.wheelchairAccessible}</span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${audioGuide.accessibility.wheelchair_accessible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                  {audioGuide.accessibility.wheelchair_accessible ? t.available : t.notAvailable}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ear className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{t.audioDescription}</span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${audioGuide.accessibility.audio_description ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                  {audioGuide.accessibility.audio_description ? t.available : t.notAvailable}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{t.signLanguage}</span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${audioGuide.accessibility.sign_language ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                  {audioGuide.accessibility.sign_language ? t.available : t.notAvailable}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      <AnimatePresence>
        {showQrModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
            onClick={() => setShowQrModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="rounded-2xl p-6 sm:p-8 text-center"
              style={{ backgroundColor: '#f9f6f1' }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-2">{content.title}</h3>
              <p className="text-sm text-gray-500 mb-4">Scan to open this guide</p>
              <div className="p-4 bg-white rounded-xl inline-block">
                <QRCodeCanvas
                  value={`${window.location.origin}/${audioGuide.slug}`}
                  size={192}
                  includeMargin={true}
                />
              </div>
              <p className="mt-4 text-xs text-gray-500 break-all">
                {`${window.location.origin}/${audioGuide.slug}`}
              </p>
              <button
                onClick={() => setShowQrModal(false)}
                className="mt-6 px-6 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
