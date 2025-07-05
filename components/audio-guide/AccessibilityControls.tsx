"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  Accessibility, 
  Eye, 
  Type, 
  Volume2, 
  Captions,
  HandMetal,
  Info
} from 'lucide-react'

interface AccessibilityControlsProps {
  highContrast: boolean
  largeFonts: boolean
  onHighContrastChange: (enabled: boolean) => void
  onLargeFontsChange: (enabled: boolean) => void
  accessibilityInfo: {
    wheelchair_accessible: boolean
    audio_description: boolean
    sign_language: boolean
  }
}

export function AccessibilityControls({
  highContrast,
  largeFonts,
  onHighContrastChange,
  onLargeFontsChange,
  accessibilityInfo
}: AccessibilityControlsProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Accessibility className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-lg">Accessibility</h3>
        </div>
        
        <div className="space-y-4">
          {/* Display Controls */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">Display Settings</h4>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Eye className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="font-medium text-sm">High Contrast</p>
                  <p className="text-xs text-gray-600">Improve text readability</p>
                </div>
              </div>
              <Switch
                checked={highContrast}
                onCheckedChange={onHighContrastChange}
                aria-label="Toggle high contrast mode"
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Type className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="font-medium text-sm">Large Fonts</p>
                  <p className="text-xs text-gray-600">Increase text size</p>
                </div>
              </div>
              <Switch
                checked={largeFonts}
                onCheckedChange={onLargeFontsChange}
                aria-label="Toggle large fonts"
              />
            </div>
          </div>
          
          {/* Location Accessibility Info */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">Location Features</h4>
            
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Accessibility className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Wheelchair Accessible</span>
                </div>
                <Badge 
                  variant={accessibilityInfo.wheelchair_accessible ? "default" : "secondary"}
                  className={accessibilityInfo.wheelchair_accessible ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                >
                  {accessibilityInfo.wheelchair_accessible ? "Yes" : "No"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Volume2 className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Audio Description</span>
                </div>
                <Badge 
                  variant={accessibilityInfo.audio_description ? "default" : "secondary"}
                  className={accessibilityInfo.audio_description ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                >
                  {accessibilityInfo.audio_description ? "Available" : "Not Available"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <HandMetal className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Sign Language</span>
                </div>
                <Badge 
                  variant={accessibilityInfo.sign_language ? "default" : "secondary"}
                  className={accessibilityInfo.sign_language ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                >
                  {accessibilityInfo.sign_language ? "Available" : "Not Available"}
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">Quick Actions</h4>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8"
                onClick={() => {
                  // Toggle screen reader friendly mode
                  document.body.setAttribute('aria-live', 'polite')
                }}
                aria-label="Enable screen reader announcements"
              >
                <Captions className="h-3 w-3 mr-1" />
                Screen Reader
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8"
                onClick={() => {
                  // Focus on main content
                  const mainContent = document.querySelector('main') || document.querySelector('[role="main"]')
                  if (mainContent) {
                    (mainContent as HTMLElement).focus()
                  }
                }}
                aria-label="Skip to main content"
              >
                Skip to Content
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8"
                onClick={() => {
                  // Reset all accessibility settings
                  onHighContrastChange(false)
                  onLargeFontsChange(false)
                }}
                aria-label="Reset accessibility settings"
              >
                Reset Settings
              </Button>
            </div>
          </div>
          
          {/* Help Information */}
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Need Help?</p>
                <p className="text-xs">
                  Use keyboard navigation (Tab, Enter, Space) to navigate. 
                  Press 'H' to hear audio descriptions where available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 