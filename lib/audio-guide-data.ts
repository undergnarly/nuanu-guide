import { AudioGuideObject, Language } from './audio-guide-types'

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    code: 'en',
    name: 'English',
    native_name: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'ru',
    name: 'Russian',
    native_name: 'Русский',
    flag: '🇷🇺'
  },
  {
    code: 'id',
    name: 'Indonesian',
    native_name: 'Bahasa Indonesia',
    flag: '🇮🇩'
  }
]

export const AUDIO_GUIDE_OBJECTS: AudioGuideObject[] = [
  {
    id: '1',
    slug: 'bamboo-pavilion',
    coordinates: {
      lat: -8.3405,
      lng: 115.0920
    },
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1000',
    video: {
      youtube_id: 'dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    },
    category: 'architecture',
    duration: 180, // 3 минуты
    featured: true,
    accessibility: {
      wheelchair_accessible: true,
      audio_description: true,
      sign_language: false
    },
    content: {
      en: {
        title: 'The Bamboo Pavilion',
        description: 'A stunning architectural masterpiece showcasing sustainable bamboo construction techniques.',
        full_text: `Welcome to the Bamboo Pavilion, one of Nuanu's most iconic structures. This remarkable building demonstrates the incredible potential of bamboo as a sustainable construction material.

Built in 2019 by renowned architect John Hardy, this pavilion uses traditional Balinese joinery techniques combined with modern engineering principles. The structure can withstand earthquakes and tropical storms while maintaining its elegant, flowing form.

The pavilion serves as a community gathering space and hosts various cultural events throughout the year. Its open design allows natural ventilation, reducing the need for air conditioning and creating a comfortable environment for visitors.

Notice the intricate bamboo joints and the way light filters through the structure, creating beautiful patterns that change throughout the day. This building represents the harmony between traditional craftsmanship and contemporary design philosophy.`,
        audio: {
          url: '/audio/bamboo-pavilion-en.mp3',
          duration: 180,
          transcript: [
            {
              start_time: 0,
              end_time: 8,
              text: 'Welcome to the Bamboo Pavilion, one of Nuanu\'s most iconic structures.',
              word_timings: [
                { word: 'Welcome', start: 0, end: 0.8 },
                { word: 'to', start: 0.8, end: 1.0 },
                { word: 'the', start: 1.0, end: 1.2 },
                { word: 'Bamboo', start: 1.2, end: 1.8 },
                { word: 'Pavilion,', start: 1.8, end: 2.6 },
                { word: 'one', start: 3.0, end: 3.3 },
                { word: 'of', start: 3.3, end: 3.5 },
                { word: 'Nuanu\'s', start: 3.5, end: 4.2 },
                { word: 'most', start: 4.2, end: 4.6 },
                { word: 'iconic', start: 4.6, end: 5.2 },
                { word: 'structures.', start: 5.2, end: 6.0 }
              ]
            },
            {
              start_time: 8,
              end_time: 18,
              text: 'This remarkable building demonstrates the incredible potential of bamboo as a sustainable construction material.',
              word_timings: []
            },
            {
              start_time: 18,
              end_time: 35,
              text: 'Built in 2019 by renowned architect John Hardy, this pavilion uses traditional Balinese joinery techniques combined with modern engineering principles.',
              word_timings: []
            }
          ]
        },
        highlights: [
          'Sustainable bamboo construction',
          'Traditional Balinese joinery',
          'Earthquake-resistant design',
          'Natural ventilation system'
        ],
        fun_facts: [
          'Bamboo can grow up to 3 feet in 24 hours',
          'The pavilion uses over 2,000 bamboo poles',
          'Construction took only 8 months to complete',
          'The building has zero carbon footprint'
        ],
        related_objects: ['2', '3']
      },
      ru: {
        title: 'Бамбуковый павильон',
        description: 'Потрясающий архитектурный шедевр, демонстрирующий устойчивые технологии строительства из бамбука.',
        full_text: `Добро пожаловать в Бамбуковый павильон, одно из самых знаковых сооружений Нуану. Это замечательное здание демонстрирует невероятный потенциал бамбука как экологически чистого строительного материала.

Построенный в 2019 году известным архитектором Джоном Харди, этот павильон использует традиционные балийские техники соединения в сочетании с современными инженерными принципами. Конструкция может выдерживать землетрясения и тропические штормы, сохраняя при этом свою элегантную, плавную форму.

Павильон служит местом сбора сообщества и принимает различные культурные мероприятия в течение года. Его открытый дизайн обеспечивает естественную вентиляцию, снижая потребность в кондиционировании воздуха и создавая комфортную среду для посетителей.

Обратите внимание на замысловатые бамбуковые соединения и то, как свет проникает через конструкцию, создавая красивые узоры, которые меняются в течение дня. Это здание представляет гармонию между традиционным мастерством и современной философией дизайна.`,
        audio: {
          url: '/audio/bamboo-pavilion-ru.mp3',
          duration: 180,
          transcript: [
            {
              start_time: 0,
              end_time: 10,
              text: 'Добро пожаловать в Бамбуковый павильон, одно из самых знаковых сооружений Нуану.',
              word_timings: []
            }
          ]
        },
        highlights: [
          'Экологичное строительство из бамбука',
          'Традиционные балийские соединения',
          'Сейсмоустойчивый дизайн',
          'Система естественной вентиляции'
        ],
        fun_facts: [
          'Бамбук может расти до 90 см за 24 часа',
          'В павильоне использовано более 2000 бамбуковых стволов',
          'Строительство заняло всего 8 месяцев',
          'Здание имеет нулевой углеродный след'
        ],
        related_objects: ['2', '3']
      }
    },
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    slug: 'ceramic-sculpture-garden',
    coordinates: {
      lat: -8.3408,
      lng: 115.0925
    },
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000',
    video: {
      youtube_id: 'jNQXAC9IVRw',
      thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg'
    },
    category: 'art',
    duration: 240,
    featured: true,
    accessibility: {
      wheelchair_accessible: true,
      audio_description: true,
      sign_language: true
    },
    content: {
      en: {
        title: 'Ceramic Sculpture Garden',
        description: 'An enchanting collection of ceramic sculptures created by local Balinese artists.',
        full_text: `Step into the Ceramic Sculpture Garden, where art meets nature in perfect harmony. This outdoor gallery features over 50 unique ceramic sculptures created by talented Balinese artists over the past five years.

Each sculpture tells a story rooted in Balinese mythology and contemporary life. The artists use traditional techniques passed down through generations, combined with modern artistic expression. The clay used comes from local sources, making each piece truly connected to the land.

The garden layout follows the principles of Balinese spatial philosophy, with each sculpture positioned to create a dialogue with its surroundings. As you walk through the winding paths, you'll discover hidden corners and unexpected viewpoints.

The centerpiece is the "Tree of Life" sculpture, standing 4 meters tall and representing the connection between earth and sky. This monumental work took artist I Made Sukerta three months to complete and incorporates traditional Balinese symbols with contemporary forms.

Notice how the sculptures change appearance throughout the day as light and shadows shift. The garden is designed to be experienced slowly, allowing visitors to contemplate the relationship between art, nature, and spirituality.`,
        audio: {
          url: '/audio/ceramic-garden-en.mp3',
          duration: 240,
          transcript: [
            {
              start_time: 0,
              end_time: 12,
              text: 'Step into the Ceramic Sculpture Garden, where art meets nature in perfect harmony.',
              word_timings: []
            }
          ]
        },
        highlights: [
          'Over 50 unique ceramic sculptures',
          'Traditional Balinese techniques',
          'Local clay materials',
          'Tree of Life centerpiece'
        ],
        fun_facts: [
          'The garden contains 50+ sculptures by 15 different artists',
          'All clay is sourced within 10km of Nuanu',
          'The Tree of Life sculpture weighs over 500kg',
          'Some sculptures are designed to collect rainwater'
        ],
        related_objects: ['1', '3']
      },
      ru: {
        title: 'Сад керамических скульптур',
        description: 'Очаровательная коллекция керамических скульптур, созданных местными балийскими художниками.',
        full_text: `Войдите в Сад керамических скульптур, где искусство встречается с природой в совершенной гармонии. Эта галерея под открытым небом представляет более 50 уникальных керамических скульптур, созданных талантливыми балийскими художниками за последние пять лет.

Каждая скульптура рассказывает историю, уходящую корнями в балийскую мифологию и современную жизнь. Художники используют традиционные техники, передаваемые из поколения в поколение, в сочетании с современным художественным выражением. Глина, используемая в работах, поступает из местных источников, что делает каждое произведение по-настоящему связанным с землей.

Планировка сада следует принципам балийской пространственной философии, где каждая скульптура расположена так, чтобы создать диалог с окружающей средой. Прогуливаясь по извилистым тропинкам, вы откроете для себя скрытые уголки и неожиданные точки обзора.

Центральным элементом является скульптура "Древо жизни", высотой 4 метра, представляющая связь между землей и небом. На создание этой монументальной работы у художника И Маде Сукерта ушло три месяца, и она объединяет традиционные балийские символы с современными формами.

Обратите внимание, как скульптуры меняют свой внешний вид в течение дня по мере изменения света и теней. Сад спроектирован для медленного восприятия, позволяя посетителям размышлять о взаимосвязи искусства, природы и духовности.`,
        audio: {
          url: '/audio/ceramic-garden-ru.mp3',
          duration: 240,
          transcript: []
        },
        highlights: [
          'Более 50 уникальных керамических скульптур',
          'Традиционные балийские техники',
          'Местные глиняные материалы',
          'Центральная скульптура "Древо жизни"'
        ],
        fun_facts: [
          'В саду находится 50+ скульптур 15 разных художников',
          'Вся глина добывается в радиусе 10 км от Нуану',
          'Скульптура "Древо жизни" весит более 500 кг',
          'Некоторые скульптуры предназначены для сбора дождевой воды'
        ],
        related_objects: ['1', '3']
      }
    },
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  }
] 