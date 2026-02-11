"use client"

import Image from "next/image"
import { Headphones, Clock } from "lucide-react"
import { AUDIO_GUIDE_OBJECTS } from "@/lib/audio-guide-data"
import { AudioGuideObject } from "@/lib/audio-guide-types"
import { motion } from "framer-motion"

function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60)
  return `${minutes} min`
}

function GuideCard({ guide, onOpen }: { guide: AudioGuideObject; onOpen?: (slug: string) => void }) {
  const content = guide.content.en

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={() => onOpen?.(guide.slug)}
      className="group relative rounded-2xl overflow-hidden bg-white shadow-md cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="aspect-[16/9] relative">
        <Image
          src={guide.image}
          alt={content.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-bold text-white mb-1">{content.title}</h3>
          <div className="flex items-center gap-3 text-sm text-white/80">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDuration(guide.duration)}
            </span>
            <span className="capitalize">{guide.category}</span>
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm text-gray-600 line-clamp-2">{content.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Headphones className="w-3 h-3" /> Audio Guide
          </span>
          <span className="text-xs font-medium px-3 py-1 bg-black text-white rounded-full">
            Listen
          </span>
        </div>
      </div>
    </motion.div>
  )
}

type ExploreContentProps = {
  onOpenGuide?: (slug: string) => void
}

export default function ExploreContent({ onOpenGuide }: ExploreContentProps) {
  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#f9f6f1' }}>
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Audio Guides</h1>
        <p className="text-sm text-gray-500 mt-1">Explore Nuanu with immersive audio tours</p>
      </div>

      <div className="px-4 grid gap-4">
        {AUDIO_GUIDE_OBJECTS.map((guide) => (
          <GuideCard key={guide.id} guide={guide} onOpen={onOpenGuide} />
        ))}
      </div>
    </div>
  )
}
