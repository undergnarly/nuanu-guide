"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Headphones, 
  Smartphone, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  MapPin,
  Clock,
  Globe,
  ExternalLink,
  QrCode
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"
import { AUDIO_GUIDE_OBJECTS } from "@/lib/audio-guide-data"

interface GuidesSectionProps {
  onOpenAudioGuide?: (slug: string, lang: string) => void
}

export default function GuidesSection({ onOpenAudioGuide }: GuidesSectionProps) {
  const [activeTab, setActiveTab] = useState("audio")
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const audioGuides = [
    {
      title: "Nuanu History Tour",
      duration: "25 min",
      image: "/images/audio-history.png",
      description: "Discover the fascinating history of Nuanu Creative City",
      category: "history",
      slug: "nuanu-history-tour"
    },
    {
      title: "Architecture Highlights",
      duration: "18 min",
      image: "/images/audio-architecture.png",
      description: "Explore the unique architectural features of the city",
      category: "architecture",
      slug: "architecture-highlights"
    },
    {
      title: "Artist Stories",
      duration: "32 min",
      image: "/images/audio-artists.png",
      description: "Listen to the stories of local artists and creators",
      category: "culture",
      slug: "artist-stories"
    },
  ]

  const arGuides = [
    {
      title: "Interactive Murals",
      duration: "15 min",
      image: "/images/ar-murals.png",
      description: "See murals come to life with augmented reality",
      category: "art",
      slug: "interactive-murals"
    },
    {
      title: "Hidden Sculptures",
      duration: "20 min",
      image: "/images/ar-sculptures.png",
      description: "Discover virtual sculptures throughout the city",
      category: "art",
      slug: "hidden-sculptures"
    },
    {
      title: "Future City Vision",
      duration: "10 min",
      image: "/images/ar-future.png",
      description: "Experience how Nuanu will evolve in the future",
      category: "architecture",
      slug: "future-city-vision"
    },
  ]

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
            Discover Nuanu through immersive audio experiences and AR adventures
          </p>
        </div>

        {/* Featured Audio Guide Objects */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <QrCode className="h-5 w-5 mr-2 text-purple-600" />
            Featured Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AUDIO_GUIDE_OBJECTS.map((guide) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
                  <div className="relative h-48">
                    <Image
                      src={guide.image}
                      alt={guide.content[selectedLanguage]?.title || guide.slug}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge className={categoryColors[guide.category]}>
                        {guide.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-bold text-white text-lg mb-1">
                        {guide.content[selectedLanguage]?.title || guide.slug}
                      </h3>
                      <div className="flex items-center text-white/90 text-sm space-x-3">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{Math.ceil(guide.duration / 60)} min</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>Nuanu City</span>
                        </div>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-1" />
                          <span>{Object.keys(guide.content).length} languages</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {guide.content[selectedLanguage]?.description || 'Audio guide description'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {guide.accessibility.wheelchair_accessible && (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                            Accessible
                          </Badge>
                        )}
                        {guide.video && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                            Video
                          </Badge>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => onOpenAudioGuide?.(guide.slug, selectedLanguage)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Guide
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <Tabs defaultValue="audio" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="audio">Audio Guides</TabsTrigger>
            <TabsTrigger value="ar">AR Experiences</TabsTrigger>
          </TabsList>

          <TabsContent value="audio" className="mt-0">
            <div className="space-y-4">
              {audioGuides.map((guide, index) => (
                <GuideCard
                  key={index}
                  guide={guide}
                  type="audio"
                  isActive={index === 0 && isPlaying}
                  onTogglePlay={() => index === 0 && setIsPlaying(!isPlaying)}
                  selectedLanguage={selectedLanguage}
                  onOpenAudioGuide={onOpenAudioGuide}
                />
              ))}
            </div>

            {isPlaying && <AudioPlayer onTogglePlay={() => setIsPlaying(!isPlaying)} />}
          </TabsContent>

          <TabsContent value="ar" className="mt-0">
            <div className="space-y-4">
              {arGuides.map((guide, index) => (
                <GuideCard 
                  key={index} 
                  guide={guide} 
                  type="ar"
                  selectedLanguage={selectedLanguage}
                  onOpenAudioGuide={onOpenAudioGuide}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

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

function GuideCard({
  guide,
  type,
  isActive,
  onTogglePlay,
  selectedLanguage = "en",
  onOpenAudioGuide
}: { 
  guide: any; 
  type: "audio" | "ar"; 
  isActive?: boolean; 
  onTogglePlay?: () => void;
  selectedLanguage?: string;
  onOpenAudioGuide?: (slug: string, lang: string) => void;
}) {
  const categoryColors = {
    art: 'bg-purple-100 text-purple-800',
    history: 'bg-blue-100 text-blue-800',
    architecture: 'bg-green-100 text-green-800',
    nature: 'bg-emerald-100 text-emerald-800',
    culture: 'bg-orange-100 text-orange-800'
  }

  return (
    <Card className={`overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm ${isActive ? "ring-2 ring-purple-500" : ""}`}>
      <div className="flex">
        <div className="relative w-1/3 h-32">
          <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
          <div className="absolute top-2 left-2 flex items-center space-x-1">
            <Badge className="bg-black/70 text-white">
              {type === "audio" ? <Headphones className="w-3 h-3 mr-1" /> : <Smartphone className="w-3 h-3 mr-1" />}
              {guide.duration}
            </Badge>
          </div>
          {guide.category && (
            <div className="absolute top-2 right-2">
              <Badge className={categoryColors[guide.category as keyof typeof categoryColors]}>
                {guide.category}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">{guide.title}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{guide.description}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <MapPin className="h-3 w-3" />
                <span>Nuanu Creative City</span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-500">Multi-language</span>
              </div>
              <div className="flex items-center space-x-2">
                {type === "audio" ? (
                  <Button 
                    size="sm" 
                    className="h-8 rounded-full w-8 p-0 bg-purple-600 text-white hover:bg-purple-700" 
                    onClick={onTogglePlay}
                  >
                    {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    className="h-8 bg-purple-600 text-white hover:bg-purple-700 px-3"
                  >
                    Start AR
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="outline"
                  className="h-8 px-3"
                  onClick={() => onOpenAudioGuide?.(guide.slug, selectedLanguage)}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Open
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

function AudioPlayer({ onTogglePlay }: { onTogglePlay: () => void }) {
  return (
    <Card className="fixed bottom-16 left-0 right-0 border-t border-gray-200 dark:border-gray-800 rounded-none shadow-lg bg-white/95 backdrop-blur-lg">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded overflow-hidden mr-3">
              <Image
                src="/images/audio-history.png"
                alt="Now playing"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium">Nuanu History Tour</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Part 1 of 3</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-black hover:bg-neutral-100">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button className="h-10 w-10 rounded-full bg-purple-600 text-white hover:bg-purple-700" onClick={onTogglePlay}>
              <Pause className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-black hover:bg-neutral-100">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span>12:45</span>
            <span>25:00</span>
          </div>
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>

        <div className="flex items-center mt-2">
          <Volume2 className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
          <Slider defaultValue={[80]} max={100} step={1} className="w-24" />
        </div>
      </CardContent>
    </Card>
  )
} 