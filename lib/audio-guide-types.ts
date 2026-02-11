// Types for the audio guide system
export interface AudioGuideObject {
  id: string
  slug: string
  coordinates: {
    lat: number
    lng: number
  }
  image: string
  card_color?: string
  audio_url?: string
  video?: {
    youtube_id?: string
    url?: string
    thumbnail?: string
  }
  content: {
    [languageCode: string]: AudioGuideContent
  }
  category: 'art' | 'history' | 'architecture' | 'nature' | 'culture'
  duration: number // in seconds
  featured: boolean
  accessibility: {
    wheelchair_accessible: boolean
    audio_description: boolean
    sign_language: boolean
  }
  pricing?: {
    services: PricingService[]
    booking_url?: string
    contact_info?: {
      phone?: string
      email?: string
      whatsapp?: string
    }
  }
  created_at: string
  updated_at: string
}

export interface AudioGuideContent {
  title: string
  description: string
  full_text: string
  highlights: string[]
  audio_timestamps: AudioTimestamp[]
}

export interface AudioTranscript {
  start_time: number // start time in seconds
  end_time: number // end time in seconds
  text: string
  word_timings?: WordTiming[]
}

export interface WordTiming {
  word: string
  start: number
  end: number
}

export interface Language {
  code: string
  name: string
  native_name: string
  flag: string
}

export interface AudioPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  playbackRate: number
  currentTranscriptIndex: number
  currentWordIndex: number
}

export interface MapMarker {
  id: string
  position: {
    lat: number
    lng: number
  }
  title: string
  category: string
  isActive: boolean
}

export interface PricingService {
  id: string
  name: {
    [languageCode: string]: string
  }
  description: {
    [languageCode: string]: string
  }
  price: string
  duration?: string
  age_group?: string
  schedule?: string
  max_participants?: number
  includes?: {
    [languageCode: string]: string[]
  }
}

export interface AudioTimestamp {
  start: number
  end: number
  text: string
} 