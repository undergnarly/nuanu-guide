"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AudioGuideObject, AudioPlayerState, WordTiming } from '@/lib/audio-guide-types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Repeat,
  Shuffle,
  Download,
  Settings,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import Image from 'next/image'

interface AudioGuidePlayerProps {
  audioGuideObject: AudioGuideObject
  currentLanguage: string
  largeFonts?: boolean
}

export function AudioGuidePlayer({ 
  audioGuideObject, 
  currentLanguage, 
  largeFonts = false 
}: AudioGuidePlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playerState, setPlayerState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    playbackRate: 1.0,
    currentTranscriptIndex: 0,
    currentWordIndex: 0
  })
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const content = audioGuideObject.content[currentLanguage]
  const transcript = content?.audio?.transcript || []
  const currentTranscript = transcript[playerState.currentTranscriptIndex]

  // Audio initialization
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setPlayerState(prev => ({
        ...prev,
        duration: audio.duration
      }))
    }

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime
      setPlayerState(prev => ({
        ...prev,
        currentTime
      }))

      // Update current transcript index
      const transcriptIndex = transcript.findIndex((t, index) => {
        const nextTranscript = transcript[index + 1]
        return currentTime >= t.start_time && 
               (!nextTranscript || currentTime < nextTranscript.start_time)
      })

      if (transcriptIndex !== -1 && transcriptIndex !== playerState.currentTranscriptIndex) {
        setPlayerState(prev => ({
          ...prev,
          currentTranscriptIndex: transcriptIndex,
          currentWordIndex: 0
        }))
      }

      // Update current word index
      if (currentTranscript?.word_timings) {
        const wordIndex = currentTranscript.word_timings.findIndex((w, index) => {
          const nextWord = currentTranscript.word_timings[index + 1]
          return currentTime >= w.start && 
                 (!nextWord || currentTime < nextWord.start)
        })

        if (wordIndex !== -1 && wordIndex !== playerState.currentWordIndex) {
          setPlayerState(prev => ({
            ...prev,
            currentWordIndex: wordIndex
          }))
        }
      }
    }

    const handleEnded = () => {
      setPlayerState(prev => ({
        ...prev,
        isPlaying: false,
        currentTime: 0
      }))
    }

    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
    }
  }, [transcript, currentTranscript, playerState.currentTranscriptIndex, playerState.currentWordIndex])

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (playerState.isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    
    setPlayerState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }))
  }, [playerState.isPlaying])

  const handleSeek = useCallback((value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = (value[0] / 100) * playerState.duration
    audio.currentTime = newTime
    setPlayerState(prev => ({
      ...prev,
      currentTime: newTime
    }))
  }, [playerState.duration])

  const handleVolumeChange = useCallback((value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = value[0] / 100
    audio.volume = newVolume
    setPlayerState(prev => ({
      ...prev,
      volume: newVolume
    }))
  }, [])

  const handlePlaybackRateChange = useCallback((rate: number) => {
    const audio = audioRef.current
    if (!audio) return

    audio.playbackRate = rate
    setPlayerState(prev => ({
      ...prev,
      playbackRate: rate
    }))
    setShowSettings(false)
  }, [])

  const skipForward = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = Math.min(audio.currentTime + 15, playerState.duration)
  }, [playerState.duration])

  const skipBackward = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = Math.max(audio.currentTime - 15, 0)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
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
                  ? 'bg-neutral-200 text-neutral-800 font-semibold scale-105'
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
        <span className="bg-neutral-100 text-neutral-800 px-2 py-1 rounded">
          {currentTranscript.text}
        </span>
      </div>
    )
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={content?.audio?.url}
        preload="metadata"
        aria-label={`Audio guide for ${content?.title}`}
      />

      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <Card className="rounded-t-2xl rounded-b-none border-t shadow-2xl bg-white/95 backdrop-blur-lg">
            {/* Expanded View */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <CardContent className="p-6 border-b">
                    {/* Large Album Art */}
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-xl mb-4">
                        <Image
                          src={audioGuideObject.image}
                          alt={content?.title || 'Audio Guide'}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className={`font-bold text-center mb-2 ${largeFonts ? 'text-xl' : 'text-lg'}`}>
                        {content?.title}
                      </h3>
                      <p className={`text-gray-600 text-center ${largeFonts ? 'text-base' : 'text-sm'}`}>
                        {content?.description}
                      </p>
                    </div>

                    {/* Highlighted Text */}
                    {currentTranscript && (
                      <div className={`mb-6 p-4 bg-gray-50 rounded-lg ${largeFonts ? 'text-lg' : 'text-base'}`}>
                        {renderHighlightedText()}
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <Slider
                        value={[playerState.duration > 0 ? (playerState.currentTime / playerState.duration) * 100 : 0]}
                        onValueChange={handleSeek}
                        max={100}
                        step={0.1}
                        className="w-full"
                        aria-label="Audio progress"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{formatTime(playerState.currentTime)}</span>
                        <span>{formatTime(playerState.duration)}</span>
                      </div>
                    </div>

                    {/* Main Controls */}
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={skipBackward}
                        className="h-12 w-12 hover:bg-gray-100"
                        aria-label="Skip backward 15 seconds"
                      >
                        <SkipBack className="h-6 w-6" />
                      </Button>
                      
                      <Button
                        size="icon"
                        onClick={togglePlayPause}
                        disabled={isLoading}
                        className="h-16 w-16 rounded-full bg-black hover:bg-neutral-800 text-white shadow-lg"
                        aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
                      >
                        {isLoading ? (
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                        ) : playerState.isPlaying ? (
                          <Pause className="h-8 w-8" />
                        ) : (
                          <Play className="h-8 w-8 ml-1" />
                        )}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={skipForward}
                        className="h-12 w-12 hover:bg-gray-100"
                        aria-label="Skip forward 15 seconds"
                      >
                        <SkipForward className="h-6 w-6" />
                      </Button>
                    </div>

                    {/* Secondary Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleVolumeChange([playerState.volume > 0 ? 0 : 80])}
                          className="h-8 w-8"
                          aria-label={playerState.volume > 0 ? 'Mute' : 'Unmute'}
                        >
                          {playerState.volume > 0 ? (
                            <Volume2 className="h-4 w-4" />
                          ) : (
                            <VolumeX className="h-4 w-4" />
                          )}
                        </Button>
                        <Slider
                          value={[playerState.volume * 100]}
                          onValueChange={handleVolumeChange}
                          max={100}
                          step={1}
                          className="w-20"
                          aria-label="Volume"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowSettings(!showSettings)}
                          className="h-8 w-8"
                          aria-label="Settings"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          aria-label="Download"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Settings Panel */}
                    <AnimatePresence>
                      {showSettings && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <h4 className="font-semibold mb-3">Playback Speed</h4>
                          <div className="flex space-x-2">
                            {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((rate) => (
                              <Button
                                key={rate}
                                variant={playerState.playbackRate === rate ? "default" : "outline"}
                                size="sm"
                                onClick={() => handlePlaybackRateChange(rate)}
                                className="text-xs"
                              >
                                {rate}x
                              </Button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed View */}
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                {/* Expand/Collapse Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-8 w-8"
                  aria-label={isExpanded ? 'Collapse player' : 'Expand player'}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </Button>

                {/* Track Info */}
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
                    <h4 className={`font-semibold truncate ${largeFonts ? 'text-base' : 'text-sm'}`}>
                      {content?.title}
                    </h4>
                    <p className={`text-gray-600 truncate ${largeFonts ? 'text-sm' : 'text-xs'}`}>
                      {formatTime(playerState.currentTime)} / {formatTime(playerState.duration)}
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={skipBackward}
                    className="h-8 w-8"
                    aria-label="Skip backward 15 seconds"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="icon"
                    onClick={togglePlayPause}
                    disabled={isLoading}
                    className="h-10 w-10 rounded-full bg-black hover:bg-neutral-800 text-white"
                    aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    ) : playerState.isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4 ml-0.5" />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={skipForward}
                    className="h-8 w-8"
                    aria-label="Skip forward 15 seconds"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Mini Progress Bar */}
              {!isExpanded && (
                <div className="mt-3">
                  <Slider
                    value={[playerState.duration > 0 ? (playerState.currentTime / playerState.duration) * 100 : 0]}
                    onValueChange={handleSeek}
                    max={100}
                    step={0.1}
                    className="w-full"
                    aria-label="Audio progress"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </>
  )
} 