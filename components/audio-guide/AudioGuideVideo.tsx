"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Maximize,
  ExternalLink,
  Share2,
  Download,
  Settings,
  Captions,
  RotateCcw
} from 'lucide-react'
import Image from 'next/image'

interface AudioGuideVideoProps {
  video?: {
    youtube_id?: string
    url?: string
    thumbnail?: string
  }
  title: string
}

export function AudioGuideVideo({ video, title }: AudioGuideVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!video) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="text-gray-400 mb-4">
            <Play className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="font-semibold text-lg mb-2">No Video Available</h3>
          <p className="text-gray-600">
            Video content is not available for this audio guide.
          </p>
        </CardContent>
      </Card>
    )
  }

  const handlePlayVideo = () => {
    setShowVideo(true)
    setIsPlaying(true)
  }

  const handleShareVideo = async () => {
    const shareData = {
      title: `Video: ${title}`,
      text: `Watch this video about ${title}`,
      url: video.youtube_id 
        ? `https://www.youtube.com/watch?v=${video.youtube_id}`
        : video.url || window.location.href
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(shareData.url)
      alert('Video link copied to clipboard!')
    }
  }

  const openInYouTube = () => {
    if (video.youtube_id) {
      window.open(`https://www.youtube.com/watch?v=${video.youtube_id}`, '_blank')
    } else if (video.url) {
      window.open(video.url, '_blank')
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const getEmbedUrl = () => {
    if (video.youtube_id) {
      return `https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`
    }
    return video.url
  }

  const getThumbnailUrl = () => {
    if (video.thumbnail) {
      return video.thumbnail
    }
    if (video.youtube_id) {
      return `https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`
    }
    return '/placeholder.svg'
  }

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg overflow-hidden">
        <div className="relative aspect-video bg-black">
          {!showVideo ? (
            // Video Thumbnail
            <div className="relative w-full h-full group cursor-pointer" onClick={handlePlayVideo}>
              <Image
                src={getThumbnailUrl()}
                alt={`Video thumbnail for ${title}`}
                fill
                className="object-cover"
                onError={() => setHasError(true)}
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-gray-800 ml-1" />
                </div>
              </div>
              
              {/* Duration Badge */}
              <div className="absolute bottom-4 right-4">
                <Badge className="bg-black/70 text-white">
                  Video Guide
                </Badge>
              </div>
              
              {/* Video Info */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold text-lg mb-1">{title}</h3>
                <p className="text-sm text-white/80">Watch the video guide</p>
              </div>
            </div>
          ) : (
            // Video Player
            <div className="relative w-full h-full">
              {video.youtube_id ? (
                <iframe
                  src={getEmbedUrl()}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                  onError={() => setHasError(true)}
                />
              ) : (
                <video
                  src={video.url}
                  controls
                  autoPlay
                  className="w-full h-full"
                  onError={() => setHasError(true)}
                >
                  Your browser does not support the video tag.
                </video>
              )}
              
              {/* Video Controls Overlay */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleShareVideo}
                  className="bg-black/50 hover:bg-black/70 text-white border-none"
                  aria-label="Share video"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={toggleFullscreen}
                  className="bg-black/50 hover:bg-black/70 text-white border-none"
                  aria-label="Toggle fullscreen"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={openInYouTube}
                  className="bg-black/50 hover:bg-black/70 text-white border-none"
                  aria-label="Open in YouTube"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Error State */}
          {hasError && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-400 mb-4">
                  <Play className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Video Unavailable</h3>
                <p className="text-gray-600 mb-4">
                  Unable to load the video content.
                </p>
                <Button
                  onClick={() => {
                    setHasError(false)
                    setShowVideo(false)
                  }}
                  variant="outline"
                  size="sm"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Video Information */}
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Play className="h-5 w-5 text-red-600" />
              <CardTitle className="text-lg">Video Guide</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShareVideo}
                className="h-8"
                aria-label="Share video"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={openInYouTube}
                className="h-8"
                aria-label="Open in YouTube"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-base mb-2">{title}</h3>
              <p className="text-sm text-gray-600">
                Watch this comprehensive video guide to learn more about the history, 
                architecture, and cultural significance of this remarkable location.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Badge variant="outline" className="text-xs">
                  HD Quality
                </Badge>
              </div>
              <div className="flex items-center space-x-1">
                <Captions className="h-4 w-4" />
                <span>Subtitles Available</span>
              </div>
              <div className="flex items-center space-x-1">
                <Volume2 className="h-4 w-4" />
                <span>Audio in Multiple Languages</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Features */}
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Video Features</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Play className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">High Definition</p>
                <p className="text-xs text-gray-600">Crystal clear video quality</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Captions className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">Subtitles</p>
                <p className="text-xs text-gray-600">Available in multiple languages</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <Settings className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">Playback Control</p>
                <p className="text-xs text-gray-600">Adjustable speed and quality</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                <Download className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">Offline Viewing</p>
                <p className="text-xs text-gray-600">Download for later</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 