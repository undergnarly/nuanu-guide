"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Headphones, Smartphone, Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"

export default function GuidesSection() {
  const [activeTab, setActiveTab] = useState("audio")
  const [isPlaying, setIsPlaying] = useState(false)

  const audioGuides = [
    {
      title: "Nuanu History Tour",
      duration: "25 min",
      image: "/images/audio-history.png",
      description: "Discover the fascinating history of Nuanu Creative City",
    },
    {
      title: "Architecture Highlights",
      duration: "18 min",
      image: "/images/audio-architecture.png",
      description: "Explore the unique architectural features of the city",
    },
    {
      title: "Artist Stories",
      duration: "32 min",
      image: "/images/audio-artists.png",
      description: "Listen to the stories of local artists and creators",
    },
  ]

  const arGuides = [
    {
      title: "Interactive Murals",
      duration: "15 min",
      image: "/images/ar-murals.png",
      description: "See murals come to life with augmented reality",
    },
    {
      title: "Hidden Sculptures",
      duration: "20 min",
      image: "/images/ar-sculptures.png",
      description: "Discover virtual sculptures throughout the city",
    },
    {
      title: "Future City Vision",
      duration: "10 min",
      image: "/images/ar-future.png",
      description: "Experience how Nuanu will evolve in the future",
    },
  ]

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
        <h1 className="text-2xl font-bold mb-4">Guides</h1>

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
                />
              ))}
            </div>

            {isPlaying && <AudioPlayer onTogglePlay={() => setIsPlaying(!isPlaying)} />}
          </TabsContent>

          <TabsContent value="ar" className="mt-0">
            <div className="space-y-4">
              {arGuides.map((guide, index) => (
                <GuideCard key={index} guide={guide} type="ar" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AnimatePresence>
  )
}

function GuideCard({
  guide,
  type,
  isActive,
  onTogglePlay,
}: { guide: any; type: "audio" | "ar"; isActive?: boolean; onTogglePlay?: () => void }) {
  return (
    <Card className={`overflow-hidden border-none shadow-md ${isActive ? "border-2 border-black" : ""}`}>
      <div className="flex">
        <div className="relative w-1/3 h-32">
          <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
          <Badge className="absolute top-2 left-2 bg-black">
            {type === "audio" ? <Headphones className="w-3 h-3 mr-1" /> : <Smartphone className="w-3 h-3 mr-1" />}
            {guide.duration}
          </Badge>
        </div>
        <CardContent className="flex-1 p-3">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="font-semibold">{guide.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{guide.description}</p>
            </div>
            <div className="flex justify-end mt-2">
              {type === "audio" ? (
                <Button size="sm" className="h-8 rounded-full w-8 p-0 bg-black text-white hover:bg-neutral-800" onClick={onTogglePlay}>
                  {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              ) : (
                <Button size="sm" className="h-8 bg-black text-white hover:bg-neutral-800">
                  Start AR
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

function AudioPlayer({ onTogglePlay }: { onTogglePlay: () => void }) {
  return (
    <Card className="fixed bottom-16 left-0 right-0 border-t border-gray-200 dark:border-gray-800 rounded-none shadow-lg">
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
            <Button className="h-10 w-10 rounded-full bg-black text-white hover:bg-neutral-800" onClick={onTogglePlay}>
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