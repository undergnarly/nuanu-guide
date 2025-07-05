// Типы для системы аудиогида
export interface AudioGuideObject {
  id: string
  slug: string
  coordinates: {
    lat: number
    lng: number
  }
  image: string
  video?: {
    youtube_id?: string
    url?: string
    thumbnail?: string
  }
  content: {
    [languageCode: string]: AudioGuideContent
  }
  category: 'art' | 'history' | 'architecture' | 'nature' | 'culture'
  duration: number // в секундах
  featured: boolean
  accessibility: {
    wheelchair_accessible: boolean
    audio_description: boolean
    sign_language: boolean
  }
  created_at: string
  updated_at: string
}

export interface AudioGuideContent {
  title: string
  description: string
  full_text: string
  audio: {
    url: string
    duration: number
    transcript?: AudioTranscript[]
  }
  highlights: string[] // ключевые моменты
  fun_facts: string[]
  related_objects?: string[] // ID связанных объектов
}

export interface AudioTranscript {
  start_time: number // время начала в секундах
  end_time: number // время окончания в секундах
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