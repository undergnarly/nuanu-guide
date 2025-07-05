"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AudioGuideContent as AudioGuideContentType } from '@/lib/audio-guide-types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  BookOpen, 
  Lightbulb, 
  Star, 
  ChevronDown, 
  ChevronUp,
  Copy,
  Share2,
  Bookmark
} from 'lucide-react'

interface AudioGuideContentProps {
  content: AudioGuideContentType
  currentLanguage: string
  largeFonts?: boolean
}

export function AudioGuideContent({ 
  content, 
  currentLanguage, 
  largeFonts = false 
}: AudioGuideContentProps) {
  const [isFullTextExpanded, setIsFullTextExpanded] = useState(false)
  const [isHighlightsExpanded, setIsHighlightsExpanded] = useState(true)
  const [isFunFactsExpanded, setIsFunFactsExpanded] = useState(true)
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const handleCopyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(label)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  const textSizeClasses = {
    description: largeFonts ? 'text-lg' : 'text-base',
    body: largeFonts ? 'text-base' : 'text-sm',
    small: largeFonts ? 'text-sm' : 'text-xs'
  }

  if (!content) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Content not available in the selected language.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Description */}
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-lg">Description</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopyText(content.description, 'description')}
              className="h-8 w-8 p-0"
              aria-label="Copy description"
            >
              {copiedText === 'description' ? (
                <span className="text-green-600 text-xs">✓</span>
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className={`${textSizeClasses.description} leading-relaxed text-gray-700`}>
            {content.description}
          </p>
        </CardContent>
      </Card>

      {/* Full Text */}
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-lg">Full Story</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyText(content.full_text, 'full_text')}
                className="h-8 w-8 p-0"
                aria-label="Copy full text"
              >
                {copiedText === 'full_text' ? (
                  <span className="text-green-600 text-xs">✓</span>
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullTextExpanded(!isFullTextExpanded)}
                className="h-8 w-8 p-0"
                aria-label={isFullTextExpanded ? 'Collapse text' : 'Expand text'}
              >
                {isFullTextExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className={`${textSizeClasses.body} leading-relaxed text-gray-700 ${
              !isFullTextExpanded ? 'line-clamp-4' : ''
            }`}>
              {content.full_text.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {!isFullTextExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>
          
          {!isFullTextExpanded && (
            <Button
              variant="ghost"
              onClick={() => setIsFullTextExpanded(true)}
              className="mt-4 w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              Read More
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Key Highlights */}
      {content.highlights && content.highlights.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-lg">Key Highlights</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsHighlightsExpanded(!isHighlightsExpanded)}
                className="h-8 w-8 p-0"
                aria-label={isHighlightsExpanded ? 'Collapse highlights' : 'Expand highlights'}
              >
                {isHighlightsExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          
          {isHighlightsExpanded && (
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {content.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                    <span className={`${textSizeClasses.body} text-gray-700`}>
                      {highlight}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Fun Facts */}
      {content.fun_facts && content.fun_facts.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                <CardTitle className="text-lg">Fun Facts</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFunFactsExpanded(!isFunFactsExpanded)}
                className="h-8 w-8 p-0"
                aria-label={isFunFactsExpanded ? 'Collapse fun facts' : 'Expand fun facts'}
              >
                {isFunFactsExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          
          {isFunFactsExpanded && (
            <CardContent className="pt-0">
              <div className="space-y-4">
                {content.fun_facts.map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-400 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className={`${textSizeClasses.body} text-gray-700 leading-relaxed`}>
                        {fact}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Audio Information */}
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-2">Audio Guide</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <span>Duration:</span>
                  <Badge variant="outline" className="text-xs">
                    {Math.ceil(content.audio.duration / 60)} min
                  </Badge>
                </div>
                {content.audio.transcript && (
                  <div className="flex items-center space-x-1">
                    <span>Transcript:</span>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                      Available
                    </Badge>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                aria-label="Bookmark this guide"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                aria-label="Share this guide"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 