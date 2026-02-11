"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Headphones, Clock } from "lucide-react"
import { AUDIO_GUIDE_OBJECTS } from "@/lib/audio-guide-data"
import { AudioGuideObject } from "@/lib/audio-guide-types"

const categoryColors: Record<string, string> = {
  culture: "bg-black",
  art: "bg-emerald-600",
  nature: "bg-amber-600",
  history: "bg-blue-600",
  architecture: "bg-rose-600",
}

function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60)
  return `${minutes} min`
}

function GuideCard({ guide, onOpen }: { guide: AudioGuideObject; onOpen?: (slug: string) => void }) {
  const content = guide.content.en
  const categoryColor = categoryColors[guide.category] || "bg-gray-600"

  const handleClick = () => {
    if (onOpen) {
      onOpen(guide.slug)
    }
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <Card className="overflow-hidden border-none shadow-md active:scale-[0.98] transition-transform">
        <div className="flex">
          <div className="relative w-1/3 min-h-[140px]">
            <Image
              src={guide.image}
              alt={content.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 200px"
            />
            <Badge className={`absolute top-2 left-2 ${categoryColor} text-white text-[10px] capitalize`}>
              {guide.category}
            </Badge>
          </div>
          <CardContent className="flex-1 p-3">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-base leading-tight">{content.title}</h3>
                  <Badge variant="outline" className="ml-2 shrink-0">
                    <Headphones className="w-3 h-3 mr-1" /> Audio
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-3">
                  {content.description}
                </p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {formatDuration(guide.duration)}
                </span>
                <Button size="sm" className="h-8">
                  <Headphones className="w-3.5 h-3.5 mr-1.5" />
                  Listen
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

type ExploreContentProps = {
  onOpenGuide?: (slug: string) => void
}

export default function ExploreContent({ onOpenGuide }: ExploreContentProps) {
  return (
    <div className="container p-4 pb-24">
      <h1 className="text-2xl font-bold mb-4">Audio Guides</h1>

      <div className="grid gap-4">
        {AUDIO_GUIDE_OBJECTS.map((guide) => (
          <GuideCard key={guide.id} guide={guide} onOpen={onOpenGuide} />
        ))}
      </div>
    </div>
  )
}
