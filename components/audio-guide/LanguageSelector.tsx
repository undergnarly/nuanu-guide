"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { SUPPORTED_LANGUAGES } from '@/lib/audio-guide-data'
import { Languages, Check, Globe } from 'lucide-react'

interface LanguageSelectorProps {
  currentLanguage: string
  onLanguageChange: (languageCode: string) => void
  availableLanguages: string[]
}

export function LanguageSelector({ 
  currentLanguage, 
  onLanguageChange, 
  availableLanguages 
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)
  const availableLangs = SUPPORTED_LANGUAGES.filter(lang => 
    availableLanguages.includes(lang.code)
  )

  if (availableLangs.length <= 1) {
    return null
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90"
          aria-label={`Current language: ${currentLang?.native_name || currentLanguage}. Click to change language.`}
        >
          <Globe className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">
            {currentLang?.native_name || currentLanguage.toUpperCase()}
          </span>
          <span className="sm:hidden">
            {currentLang?.flag || '🌐'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-white/95 backdrop-blur-sm border-gray-200"
        sideOffset={5}
      >
        <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Languages className="h-4 w-4" />
            <span>Select Language</span>
          </div>
        </div>
        
        {availableLangs.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => {
              onLanguageChange(language.code)
              setIsOpen(false)
            }}
            className="px-3 py-2 cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
            aria-label={`Switch to ${language.native_name}`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <span className="text-lg" role="img" aria-label={`${language.name} flag`}>
                  {language.flag}
                </span>
                <div>
                  <div className="font-medium text-sm">
                    {language.native_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {language.name}
                  </div>
                </div>
              </div>
              
              {currentLanguage === language.code && (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
        
        <div className="px-3 py-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Available languages</span>
            <Badge variant="outline" className="text-xs">
              {availableLangs.length}
            </Badge>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 