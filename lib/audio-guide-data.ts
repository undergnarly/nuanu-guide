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
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop',
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
    pricing: {
      services: [
        {
          id: 'guided-tour',
          name: {
            en: 'Guided Architecture Tour',
            ru: 'Экскурсия по архитектуре',
            id: 'Tur Arsitektur Terpandu'
          },
          description: {
            en: 'Professional guided tour of the bamboo pavilion with architectural insights',
            ru: 'Профессиональная экскурсия по бамбуковому павильону с архитектурными особенностями',
            id: 'Tur terpandu profesional pavilion bambu dengan wawasan arsitektur'
          },
          price: '150.000 IDR per person',
          duration: '45 minutes',
          schedule: 'Daily 9:00-17:00',
          max_participants: 15
        },
        {
          id: 'workshop',
          name: {
            en: 'Bamboo Construction Workshop',
            ru: 'Мастерская по строительству из бамбука',
            id: 'Workshop Konstruksi Bambu'
          },
          description: {
            en: 'Hands-on workshop learning traditional bamboo construction techniques',
            ru: 'Практический мастер-класс по изучению традиционных техник строительства из бамбука',
            id: 'Workshop praktis mempelajari teknik konstruksi bambu tradisional'
          },
          price: '450.000 IDR per person',
          duration: '3 hours',
          schedule: 'Weekends 10:00-13:00',
          max_participants: 8
        },
        {
          id: 'photography',
          name: {
            en: 'Architecture Photography Session',
            ru: 'Фотосессия архитектуры',
            id: 'Sesi Fotografi Arsitektur'
          },
          description: {
            en: 'Professional photography session with architectural guidance',
            ru: 'Профессиональная фотосессия с архитектурными рекомендациями',
            id: 'Sesi fotografi profesional dengan panduan arsitektur'
          },
          price: '250.000 IDR per person',
          duration: '1 hour',
          schedule: 'Daily 16:00-18:00',
          max_participants: 6
        }
      ],
      booking_url: 'https://www.nuanu.com/bamboo-pavilion-booking',
      contact_info: {
        phone: '+62 361 234 5678',
        email: 'pavilion@nuanu.com',
        whatsapp: '+62 813 4567 8901'
      }
    },
    content: {
      en: {
        title: 'The Bamboo Pavilion',
        description: 'A stunning architectural masterpiece showcasing sustainable bamboo construction techniques.',
        full_text: `Welcome to the Bamboo Pavilion, one of Nuanu's most iconic structures. This remarkable building demonstrates the incredible potential of bamboo as a sustainable construction material.

Built in 2019 by renowned architect John Hardy, this pavilion uses traditional Balinese joinery techniques combined with modern engineering principles. The structure can withstand earthquakes and tropical storms while maintaining its elegant, flowing form.

The pavilion serves as a community gathering space and hosts various cultural events throughout the year. Its open design allows natural ventilation, reducing the need for air conditioning and creating a comfortable environment for visitors.

Notice the intricate bamboo joints and the way light filters through the structure, creating beautiful patterns that change throughout the day. This building represents the harmony between traditional craftsmanship and contemporary design philosophy.`,
        highlights: [
          'Sustainable bamboo construction',
          'Traditional Balinese joinery',
          'Earthquake-resistant design',
          'Natural ventilation system'
        ],
        audio_timestamps: [
          { start: 0, end: 15, text: 'Welcome to the Bamboo Pavilion, one of Nuanu\'s most iconic structures.' },
          { start: 15, end: 35, text: 'This remarkable building demonstrates the incredible potential of bamboo as a sustainable construction material.' },
          { start: 35, end: 65, text: 'Built in 2019 by renowned architect John Hardy, this pavilion uses traditional Balinese joinery techniques combined with modern engineering principles.' },
          { start: 65, end: 95, text: 'The structure can withstand earthquakes and tropical storms while maintaining its elegant, flowing form.' },
          { start: 95, end: 125, text: 'The pavilion serves as a community gathering space and hosts various cultural events throughout the year.' },
          { start: 125, end: 155, text: 'Its open design allows natural ventilation, reducing the need for air conditioning and creating a comfortable environment for visitors.' },
          { start: 155, end: 180, text: 'Notice the intricate bamboo joints and the way light filters through the structure, creating beautiful patterns that change throughout the day.' }
        ]
      },
      ru: {
        title: 'Бамбуковый павильон',
        description: 'Потрясающий архитектурный шедевр, демонстрирующий устойчивые технологии строительства из бамбука.',
        full_text: `Добро пожаловать в Бамбуковый павильон, одну из самых знаковых структур Нуану. Это замечательное здание демонстрирует невероятный потенциал бамбука как экологически чистого строительного материала.

Построенный в 2019 году известным архитектором Джоном Харди, этот павильон использует традиционные балийские техники соединения в сочетании с современными инженерными принципами. Конструкция может выдерживать землетрясения и тропические штормы, сохраняя при этом свою элегантную, плавную форму.

Павильон служит местом общественных собраний и проводит различные культурные мероприятия в течение года. Его открытый дизайн обеспечивает естественную вентиляцию, снижая потребность в кондиционировании воздуха и создавая комфортную среду для посетителей.

Обратите внимание на замысловатые бамбуковые соединения и то, как свет фильтруется через конструкцию, создавая красивые узоры, которые меняются в течение дня. Это здание представляет гармонию между традиционным мастерством и современной философией дизайна.`,
        highlights: [
          'Экологичное строительство из бамбука',
          'Традиционные балийские соединения',
          'Сейсмостойкий дизайн',
          'Система естественной вентиляции'
        ],
        audio_timestamps: [
          { start: 0, end: 15, text: 'Добро пожаловать в Бамбуковый павильон, одну из самых знаковых структур Нуану.' },
          { start: 15, end: 35, text: 'Это замечательное здание демонстрирует невероятный потенциал бамбука как экологически чистого строительного материала.' },
          { start: 35, end: 65, text: 'Построенный в 2019 году известным архитектором Джоном Харди, этот павильон использует традиционные балийские техники соединения в сочетании с современными инженерными принципами.' },
          { start: 65, end: 95, text: 'Конструкция может выдерживать землетрясения и тропические штормы, сохраняя при этом свою элегантную, плавную форму.' },
          { start: 95, end: 125, text: 'Павильон служит местом общественных собраний и проводит различные культурные мероприятия в течение года.' },
          { start: 125, end: 155, text: 'Его открытый дизайн обеспечивает естественную вентиляцию, снижая потребность в кондиционировании воздуха и создавая комфортную среду для посетителей.' },
          { start: 155, end: 180, text: 'Обратите внимание на замысловатые бамбуковые соединения и то, как свет фильтруется через конструкцию, создавая красивые узоры, которые меняются в течение дня.' }
        ]
      },
      id: {
        title: 'Paviliun Bambu',
        description: 'Mahakarya arsitektur yang menakjubkan yang menampilkan teknik konstruksi bambu berkelanjutan.',
        full_text: `Selamat datang di Paviliun Bambu, salah satu struktur paling ikonik di Nuanu. Bangunan luar biasa ini mendemonstrasikan potensi luar biasa bambu sebagai material konstruksi berkelanjutan.

Dibangun pada tahun 2019 oleh arsitek terkenal John Hardy, paviliun ini menggunakan teknik penyambungan tradisional Bali yang dikombinasikan dengan prinsip-prinsip rekayasa modern. Struktur ini dapat menahan gempa bumi dan badai tropis sambil mempertahankan bentuknya yang elegan dan mengalir.

Paviliun ini berfungsi sebagai ruang pertemuan komunitas dan menyelenggarakan berbagai acara budaya sepanjang tahun. Desainnya yang terbuka memungkinkan ventilasi alami, mengurangi kebutuhan akan AC dan menciptakan lingkungan yang nyaman bagi pengunjung.

Perhatikan sambungan bambu yang rumit dan cara cahaya menyaring melalui struktur, menciptakan pola-pola indah yang berubah sepanjang hari. Bangunan ini mewakili harmoni antara kerajinan tradisional dan filosofi desain kontemporer.`,
        highlights: [
          'Konstruksi bambu berkelanjutan',
          'Penyambungan tradisional Bali',
          'Desain tahan gempa',
          'Sistem ventilasi alami'
        ],
        audio_timestamps: [
          { start: 0, end: 15, text: 'Selamat datang di Paviliun Bambu, salah satu struktur paling ikonik di Nuanu.' },
          { start: 15, end: 35, text: 'Bangunan luar biasa ini mendemonstrasikan potensi luar biasa bambu sebagai material konstruksi berkelanjutan.' },
          { start: 35, end: 65, text: 'Dibangun pada tahun 2019 oleh arsitek terkenal John Hardy, paviliun ini menggunakan teknik penyambungan tradisional Bali yang dikombinasikan dengan prinsip-prinsip rekayasa modern.' },
          { start: 65, end: 95, text: 'Struktur ini dapat menahan gempa bumi dan badai tropis sambil mempertahankan bentuknya yang elegan dan mengalir.' },
          { start: 95, end: 125, text: 'Paviliun ini berfungsi sebagai ruang pertemuan komunitas dan menyelenggarakan berbagai acara budaya sepanjang tahun.' },
          { start: 125, end: 155, text: 'Desainnya yang terbuka memungkinkan ventilasi alami, mengurangi kebutuhan akan AC dan menciptakan lingkungan yang nyaman bagi pengunjung.' },
          { start: 155, end: 180, text: 'Perhatikan sambungan bambu yang rumit dan cara cahaya menyaring melalui struktur, menciptakan pola-pola indah yang berubah sepanjang hari.' }
        ]
      }
    },
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    slug: 'ceramic-garden',
    coordinates: {
      lat: -8.3400,
      lng: 115.0915
    },
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?q=80&w=1000&auto=format&fit=crop',
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
    pricing: {
      services: [
        {
          id: 'guided-tour',
          name: {
            en: 'Guided Art Gallery Tour',
            ru: 'Экскурсия по галерее керамических скульптур',
            id: 'Tur Galeri Patung Keramik Terpandu'
          },
          description: {
            en: 'Professional guided tour of the ceramic sculpture garden with artistic insights',
            ru: 'Профессиональная экскурсия по саду керамических скульптур с художественными особенностями',
            id: 'Tur terpandu profesional galeri patung keramik dengan wawasan seni'
          },
          price: '100.000 IDR per person',
          duration: '1 hour',
          schedule: 'Daily 9:00-17:00',
          max_participants: 10
        },
        {
          id: 'workshop',
          name: {
            en: 'Ceramic Sculpture Workshop',
            ru: 'Мастерская по керамике',
            id: 'Workshop Keramik'
          },
          description: {
            en: 'Hands-on workshop learning traditional ceramic techniques',
            ru: 'Практический мастер-класс по изучению традиционных техник керамики',
            id: 'Workshop praktis mempelajari teknik keramik tradisional'
          },
          price: '300.000 IDR per person',
          duration: '2 hours',
          schedule: 'Weekends 10:00-14:00',
          max_participants: 15
        },
        {
          id: 'photography',
          name: {
            en: 'Art Photography Session',
            ru: 'Фотосессия искусства',
            id: 'Sesi Fotografi Seni'
          },
          description: {
            en: 'Professional photography session with artistic guidance',
            ru: 'Профессиональная фотосессия с художественными рекомендациями',
            id: 'Sesi fotografi profesional dengan panduan seni'
          },
          price: '200.000 IDR per person',
          duration: '1 hour',
          schedule: 'Daily 16:00-18:00',
          max_participants: 8
        }
      ],
      booking_url: 'https://www.nuanu.com/ceramic-sculpture-garden-booking',
      contact_info: {
        phone: '+62 361 345 6789',
        email: 'ceramics@nuanu.com',
        whatsapp: '+62 814 5678 9012'
      }
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
        highlights: [
          'Over 50 unique ceramic sculptures',
          'Traditional Balinese techniques',
          'Local clay materials',
          'Tree of Life centerpiece'
        ],
        audio_timestamps: [
          { start: 0, end: 20, text: 'Step into the Ceramic Sculpture Garden, where art meets nature in perfect harmony.' },
          { start: 20, end: 45, text: 'This outdoor gallery features over 50 unique ceramic sculptures created by talented Balinese artists over the past five years.' },
          { start: 45, end: 75, text: 'Each sculpture tells a story rooted in Balinese mythology and contemporary life.' },
          { start: 75, end: 105, text: 'The artists use traditional techniques passed down through generations, combined with modern artistic expression.' },
          { start: 105, end: 135, text: 'The clay used comes from local sources, making each piece truly connected to the land.' },
          { start: 135, end: 165, text: 'The garden layout follows the principles of Balinese spatial philosophy, with each sculpture positioned to create a dialogue with its surroundings.' },
          { start: 165, end: 195, text: 'As you walk through the winding paths, you\'ll discover hidden corners and unexpected viewpoints.' },
          { start: 195, end: 225, text: 'The centerpiece is the "Tree of Life" sculpture, standing 4 meters tall and representing the connection between earth and sky.' },
          { start: 225, end: 240, text: 'This monumental work took artist I Made Sukerta three months to complete and incorporates traditional Balinese symbols with contemporary forms.' }
        ]
      },
      ru: {
        title: 'Сад керамических скульптур',
        description: 'Очаровательная коллекция керамических скульптур, созданных местными балийскими художниками.',
        full_text: `Войдите в Сад керамических скульптур, где искусство встречается с природой в идеальной гармонии. Эта открытая галерея представляет более 50 уникальных керамических скульптур, созданных талантливыми балийскими художниками за последние пять лет.

Каждая скульптура рассказывает историю, уходящую корнями в балийскую мифологию и современную жизнь. Художники используют традиционные техники, передаваемые из поколения в поколение, в сочетании с современным художественным выражением. Используемая глина поступает из местных источников, что делает каждое произведение действительно связанным с землей.

Планировка сада следует принципам балийской пространственной философии, где каждая скульптура расположена так, чтобы создать диалог с окружающей средой. Прогуливаясь по извилистым тропинкам, вы откроете скрытые уголки и неожиданные точки обзора.

Центральной частью является скульптура "Древо жизни" высотой 4 метра, представляющая связь между землей и небом. Эта монументальная работа заняла у художника И Маде Сукерты три месяца и включает традиционные балийские символы с современными формами.

Обратите внимание, как скульптуры меняют внешний вид в течение дня по мере смещения света и теней. Сад предназначен для медленного восприятия, позволяя посетителям размышлять о взаимосвязи искусства, природы и духовности.`,
        highlights: [
          'Более 50 уникальных керамических скульптур',
          'Традиционные балийские техники',
          'Местные глиняные материалы',
          'Центральная скульптура "Древо жизни"'
        ],
        audio_timestamps: [
          { start: 0, end: 20, text: 'Войдите в Сад керамических скульптур, где искусство встречается с природой в идеальной гармонии.' },
          { start: 20, end: 45, text: 'Эта открытая галерея представляет более 50 уникальных керамических скульптур, созданных талантливыми балийскими художниками за последние пять лет.' },
          { start: 45, end: 75, text: 'Каждая скульптура рассказывает историю, уходящую корнями в балийскую мифологию и современную жизнь.' },
          { start: 75, end: 105, text: 'Художники используют традиционные техники, передаваемые из поколения в поколение, в сочетании с современным художественным выражением.' },
          { start: 105, end: 135, text: 'Используемая глина поступает из местных источников, что делает каждое произведение действительно связанным с землей.' },
          { start: 135, end: 165, text: 'Планировка сада следует принципам балийской пространственной философии, где каждая скульптура расположена так, чтобы создать диалог с окружающей средой.' },
          { start: 165, end: 195, text: 'Прогуливаясь по извилистым тропинкам, вы откроете скрытые уголки и неожиданные точки обзора.' },
          { start: 195, end: 225, text: 'Центральной частью является скульптура "Древо жизни" высотой 4 метра, представляющая связь между землей и небом.' },
          { start: 225, end: 240, text: 'Эта монументальная работа заняла у художника И Маде Сукерты три месяца и включает традиционные балийские символы с современными формами.' }
        ]
      },
      id: {
        title: 'Taman Patung Keramik',
        description: 'Koleksi patung keramik yang mempesona yang dibuat oleh seniman lokal Bali.',
        full_text: `Masuklah ke Taman Patung Keramik, di mana seni bertemu dengan alam dalam harmoni yang sempurna. Galeri terbuka ini menampilkan lebih dari 50 patung keramik unik yang dibuat oleh seniman berbakat Bali selama lima tahun terakhir.

Setiap patung menceritakan kisah yang berakar pada mitologi Bali dan kehidupan kontemporer. Para seniman menggunakan teknik tradisional yang diturunkan dari generasi ke generasi, dikombinasikan dengan ekspresi artistik modern. Tanah liat yang digunakan berasal dari sumber lokal, membuat setiap karya benar-benar terhubung dengan tanah.

Tata letak taman mengikuti prinsip-prinsip filosofi spasial Bali, dengan setiap patung diposisikan untuk menciptakan dialog dengan lingkungan sekitarnya. Saat Anda berjalan melalui jalur yang berkelok-kelok, Anda akan menemukan sudut-sudut tersembunyi dan sudut pandang yang tak terduga.

Bagian tengahnya adalah patung "Pohon Kehidupan" setinggi 4 meter yang mewakili hubungan antara bumi dan langit. Karya monumental ini membutuhkan waktu tiga bulan bagi seniman I Made Sukerta untuk menyelesaikannya dan menggabungkan simbol-simbol tradisional Bali dengan bentuk-bentuk kontemporer.

Perhatikan bagaimana patung-patung berubah penampilan sepanjang hari seiring bergesernya cahaya dan bayangan. Taman ini dirancang untuk dialami secara perlahan, memungkinkan pengunjung untuk merenungkan hubungan antara seni, alam, dan spiritualitas.`,
        highlights: [
          'Lebih dari 50 patung keramik unik',
          'Teknik tradisional Bali',
          'Bahan tanah liat lokal',
          'Patung "Pohon Kehidupan" sebagai pusat'
        ],
        audio_timestamps: [
          { start: 0, end: 20, text: 'Masuklah ke Taman Patung Keramik, di mana seni bertemu dengan alam dalam harmoni yang sempurna.' },
          { start: 20, end: 45, text: 'Galeri terbuka ini menampilkan lebih dari 50 patung keramik unik yang dibuat oleh seniman berbakat Bali selama lima tahun terakhir.' },
          { start: 45, end: 75, text: 'Setiap patung menceritakan kisah yang berakar pada mitologi Bali dan kehidupan kontemporer.' },
          { start: 75, end: 105, text: 'Para seniman menggunakan teknik tradisional yang diturunkan dari generasi ke generasi, dikombinasikan dengan ekspresi artistik modern.' },
          { start: 105, end: 135, text: 'Tanah liat yang digunakan berasal dari sumber lokal, membuat setiap karya benar-benar terhubung dengan tanah.' },
          { start: 135, end: 165, text: 'Tata letak taman mengikuti prinsip-prinsip filosofi spasial Bali, dengan setiap patung diposisikan untuk menciptakan dialog dengan lingkungan sekitarnya.' },
          { start: 165, end: 195, text: 'Saat Anda berjalan melalui jalur yang berkelok-kelok, Anda akan menemukan sudut-sudut tersembunyi dan sudut pandang yang tak terduga.' },
          { start: 195, end: 225, text: 'Bagian tengahnya adalah patung "Pohon Kehidupan" setinggi 4 meter yang mewakili hubungan antara bumi dan langit.' },
          { start: 225, end: 240, text: 'Karya monumental ini membutuhkan waktu tiga bulan bagi seniman I Made Sukerta untuk menyelesaikannya dan menggabungkan simbol-simbol tradisional Bali dengan bentuk-bentuk kontemporer.' }
        ]
      }
    },
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    slug: 'jungle-kids-center',
    coordinates: {
      lat: -8.3410,
      lng: 115.0918
    },
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop',
    video: {
      youtube_id: 'fbQaVcm5fAw',
      thumbnail: 'https://img.youtube.com/vi/fbQaVcm5fAw/maxresdefault.jpg'
    },
    category: 'culture',
    duration: 300, // 5 минут
    featured: true,
    accessibility: {
      wheelchair_accessible: true,
      audio_description: true,
      sign_language: false
    },
    pricing: {
      services: [
        {
          id: 'daycare',
          name: {
            en: 'Day Care Playground (5+ years)',
            ru: 'Дневной присмотр (5+ лет)',
            id: 'Penitipan Anak (5+ tahun)'
          },
          description: {
            en: 'Children 5+ can stay without parents. Monday-Friday 8:00-20:00',
            ru: 'Дети 5+ могут оставаться без родителей. Понедельник-Пятница 8:00-20:00',
            id: 'Anak 5+ dapat tinggal tanpa orang tua. Senin-Jumat 8:00-20:00'
          },
          price: '120.000 IDR (2h) / 180.000 IDR (3h) / 550.000 IDR (full day)',
          schedule: 'Mon-Fri 8:00-20:00',
          age_group: '5+ years'
        },
        {
          id: 'summer-camps',
          name: {
            en: 'Summer Camps "Adventures in Nuanu"',
            ru: 'Летние лагеря "Приключения в Нуану"',
            id: 'Kamp Musim Panas "Petualangan di Nuanu"'
          },
          description: {
            en: 'Daily day and night programs. June 23 - August 3',
            ru: 'Ежедневные дневные и ночные программы. 23 июня - 3 августа',
            id: 'Program harian siang dan malam. 23 Juni - 3 Agustus'
          },
          price: '550.000 IDR (1 day) / 2.500.000-6.000.000 IDR (weekly)',
          schedule: 'June 23 - August 3',
          age_group: '5+ years'
        },
        {
          id: 'kindergarten',
          name: {
            en: 'Kindergarten (2 groups: 2-4yo and 4-6yo)',
            ru: 'Детский сад (2 группы: 2-4 года и 4-6 лет)',
            id: 'Taman Kanak-kanak (2 kelompok: 2-4 tahun dan 4-6 tahun)'
          },
          description: {
            en: 'Maximum 12 children per group. Monday-Friday',
            ru: 'Максимум 12 детей в группе. Понедельник-Пятница',
            id: 'Maksimum 12 anak per kelompok. Senin-Jumat'
          },
          price: '5.500.000 IDR/month (9:00-13:00) / 7.500.000 IDR/month (9:00-17:00)',
          schedule: 'Mon-Fri',
          age_group: '2-6 years',
          max_participants: 12
        },
        {
          id: 'robotics',
          name: {
            en: 'Robotics Classes',
            ru: 'Занятия робототехникой',
            id: 'Kelas Robotika'
          },
          description: {
            en: 'Learn programming and robotics fundamentals',
            ru: 'Изучение основ программирования и робототехники',
            id: 'Pelajari dasar-dasar pemrograman dan robotika'
          },
          price: '300.000 IDR (single) / 1.000.000 IDR (4 sessions)',
          age_group: '5-9 years'
        },
        {
          id: 'activities',
          name: {
            en: 'Acrobatics, Gymnastics, Messy Play',
            ru: 'Акробатика, Гимнастика, Messy Play',
            id: 'Akrobatik, Senam, Messy Play'
          },
          description: {
            en: 'Physical activities and creative play sessions',
            ru: 'Физические активности и творческие игровые сессии',
            id: 'Aktivitas fisik dan sesi bermain kreatif'
          },
          price: '200.000 IDR (single) / 1.000.000 IDR (8 sessions)',
          age_group: '1-9 years (varies by activity)'
        },
        {
          id: 'trial',
          name: {
            en: 'Free Trial Day',
            ru: 'Бесплатный пробный день',
            id: 'Hari Uji Coba Gratis'
          },
          description: {
            en: 'Try any of our services for free for new clients',
            ru: 'Попробуйте любую из наших услуг бесплатно для новых клиентов',
            id: 'Coba layanan kami secara gratis untuk klien baru'
          },
          price: 'FREE',
          age_group: '1-9 years'
        }
      ],
      booking_url: 'https://www.nuanu.com/jungle-kids-booking',
      contact_info: {
        phone: '+62 361 123 4567',
        email: 'jungle.kids@nuanu.com',
        whatsapp: '+62 812 3456 7890'
      }
    },
    content: {
      en: {
        title: 'Jungle Kids Development Center',
        description: 'A comprehensive children\'s development center offering daycare, summer camps, and educational programs for children aged 1-9 years.',
        full_text: `Welcome to Jungle Kids, Nuanu Creative City's premier children's development center. This vibrant facility has been nurturing young minds since 2022, providing a safe, creative, and educational environment for children aged 1 to 9 years.

Our center is built on the philosophy of learning through play and exploration. The colorful, child-friendly spaces are designed to stimulate creativity and imagination while ensuring safety and comfort. We blend traditional Balinese values with modern educational approaches to create a unique learning experience.

The facility features multiple age-appropriate zones: a toddler area for 1-2 year olds with sensory play equipment, a preschool section for 2-6 year olds with learning stations, and an after-school area for older children with robotics and arts facilities.

Our professional team of educators comes from diverse backgrounds in early childhood education, child psychology, and creative arts. They are trained in both Indonesian and international teaching methodologies, ensuring your child receives world-class care and education.

What makes Jungle Kids special is our integration with the creative community of Nuanu. Children regularly interact with local artists, musicians, and craftspeople, giving them exposure to authentic Balinese culture while developing their own creative skills.

The center operates Monday through Friday from 8 AM to 8 PM, offering flexible scheduling to accommodate working parents. We also run special summer camps and weekend programs that combine adventure, learning, and fun in the beautiful natural setting of Nuanu.`,
        highlights: [
          'Ages 1-9 years comprehensive programs',
          'Professional multilingual educators',
          'Integration with Nuanu creative community',
          'Flexible scheduling 8 AM - 8 PM',
          'Summer camps and special programs',
          'Safe, creative learning environment'
        ],
        audio_timestamps: [
          { start: 0, end: 20, text: 'Welcome to Jungle Kids, Nuanu Creative City\'s premier children\'s development center.' },
          { start: 20, end: 45, text: 'This vibrant facility has been nurturing young minds since 2022, providing a safe, creative, and educational environment for children aged 1 to 9 years.' },
          { start: 45, end: 75, text: 'Our center is built on the philosophy of learning through play and exploration.' },
          { start: 75, end: 105, text: 'The colorful, child-friendly spaces are designed to stimulate creativity and imagination while ensuring safety and comfort.' },
          { start: 105, end: 135, text: 'We blend traditional Balinese values with modern educational approaches to create a unique learning experience.' },
          { start: 135, end: 165, text: 'The facility features multiple age-appropriate zones: a toddler area for 1-2 year olds with sensory play equipment.' },
          { start: 165, end: 195, text: 'A preschool section for 2-6 year olds with learning stations, and an after-school area for older children with robotics and arts facilities.' },
          { start: 195, end: 225, text: 'Our professional team of educators comes from diverse backgrounds in early childhood education, child psychology, and creative arts.' },
          { start: 225, end: 255, text: 'What makes Jungle Kids special is our integration with the creative community of Nuanu.' },
          { start: 255, end: 285, text: 'Children regularly interact with local artists, musicians, and craftspeople, giving them exposure to authentic Balinese culture.' },
          { start: 285, end: 300, text: 'The center operates Monday through Friday from 8 AM to 8 PM, offering flexible scheduling to accommodate working parents.' }
        ]
      },
      ru: {
        title: 'Детский центр развития Jungle Kids',
        description: 'Комплексный детский центр развития с дневным присмотром, летними лагерями и образовательными программами для детей от 1 до 9 лет.',
        full_text: `Добро пожаловать в Jungle Kids, ведущий детский центр развития Nuanu Creative City. Это яркое учреждение воспитывает юные умы с 2022 года, обеспечивая безопасную, творческую и образовательную среду для детей от 1 до 9 лет.

Наш центр построен на философии обучения через игру и исследование. Красочные, дружелюбные для детей пространства созданы для стимулирования творчества и воображения, обеспечивая при этом безопасность и комфорт. Мы сочетаем традиционные балийские ценности с современными образовательными подходами для создания уникального опыта обучения.

Учреждение включает несколько возрастных зон: зона для малышей 1-2 лет с сенсорным игровым оборудованием, дошкольная секция для детей 2-6 лет с обучающими станциями, и зона продленного дня для старших детей с робототехникой и художественными мастерскими.

Наша профессиональная команда педагогов имеет разнообразный опыт в области дошкольного образования, детской психологии и творческих искусств. Они обучены как индонезийским, так и международным методикам преподавания, обеспечивая вашему ребенку уход и образование мирового класса.

Что делает Jungle Kids особенным, так это наша интеграция с творческим сообществом Нуану. Дети регулярно взаимодействуют с местными художниками, музыкантами и ремесленниками, получая знакомство с подлинной балийской культурой и развивая собственные творческие навыки.

Центр работает с понедельника по пятницу с 8:00 до 20:00, предлагая гибкое расписание для работающих родителей. Мы также проводим специальные летние лагеря и программы выходного дня, которые сочетают приключения, обучение и веселье в прекрасной природной обстановке Нуану.`,
        highlights: [
          'Комплексные программы для детей 1-9 лет',
          'Профессиональные многоязычные педагоги',
          'Интеграция с творческим сообществом Нуану',
          'Гибкое расписание 8:00 - 20:00',
          'Летние лагеря и специальные программы',
          'Безопасная, творческая среда обучения'
        ],
        audio_timestamps: [
          { start: 0, end: 20, text: 'Добро пожаловать в Jungle Kids, ведущий детский центр развития Nuanu Creative City.' },
          { start: 20, end: 45, text: 'Это яркое учреждение воспитывает юные умы с 2022 года, обеспечивая безопасную, творческую и образовательную среду для детей от 1 до 9 лет.' },
          { start: 45, end: 75, text: 'Наш центр построен на философии обучения через игру и исследование.' },
          { start: 75, end: 105, text: 'Красочные, дружелюбные для детей пространства созданы для стимулирования творчества и воображения, обеспечивая при этом безопасность и комфорт.' },
          { start: 105, end: 135, text: 'Мы сочетаем традиционные балийские ценности с современными образовательными подходами для создания уникального опыта обучения.' },
          { start: 135, end: 165, text: 'Учреждение включает несколько возрастных зон: зона для малышей 1-2 лет с сенсорным игровым оборудованием.' },
          { start: 165, end: 195, text: 'Дошкольная секция для детей 2-6 лет с обучающими станциями, и зона продленного дня для старших детей с робототехникой и художественными мастерскими.' },
          { start: 195, end: 225, text: 'Наша профессиональная команда педагогов имеет разнообразный опыт в области дошкольного образования, детской психологии и творческих искусств.' },
          { start: 225, end: 255, text: 'Что делает Jungle Kids особенным, так это наша интеграция с творческим сообществом Нуану.' },
          { start: 255, end: 285, text: 'Дети регулярно взаимодействуют с местными художниками, музыкантами и ремесленниками, получая знакомство с подлинной балийской культурой.' },
          { start: 285, end: 300, text: 'Центр работает с понедельника по пятницу с 8:00 до 20:00, предлагая гибкое расписание для работающих родителей.' }
        ]
      },
      id: {
        title: 'Pusat Pengembangan Anak Jungle Kids',
        description: 'Pusat pengembangan anak komprehensif yang menawarkan penitipan anak, kamp musim panas, dan program pendidikan untuk anak usia 1-9 tahun.',
        full_text: `Selamat datang di Jungle Kids, pusat pengembangan anak terdepan di Nuanu Creative City. Fasilitas yang dinamis ini telah memelihara pikiran muda sejak 2022, menyediakan lingkungan yang aman, kreatif, dan edukatif untuk anak-anak usia 1 hingga 9 tahun.

Pusat kami dibangun berdasarkan filosofi belajar melalui bermain dan eksplorasi. Ruang-ruang yang berwarna-warni dan ramah anak dirancang untuk merangsang kreativitas dan imajinasi sambil memastikan keamanan dan kenyamanan. Kami memadukan nilai-nilai tradisional Bali dengan pendekatan pendidikan modern untuk menciptakan pengalaman belajar yang unik.

Fasilitas ini memiliki beberapa zona yang sesuai dengan usia: area balita untuk usia 1-2 tahun dengan peralatan bermain sensorik, bagian prasekolah untuk usia 2-6 tahun dengan stasiun pembelajaran, dan area after-school untuk anak-anak yang lebih besar dengan fasilitas robotika dan seni.

Tim profesional pendidik kami berasal dari latar belakang yang beragam dalam pendidikan anak usia dini, psikologi anak, dan seni kreatif. Mereka dilatih dalam metodologi pengajaran Indonesia dan internasional, memastikan anak Anda mendapat perawatan dan pendidikan kelas dunia.

Yang membuat Jungle Kids istimewa adalah integrasi kami dengan komunitas kreatif Nuanu. Anak-anak secara teratur berinteraksi dengan seniman lokal, musisi, dan pengrajin, memberikan mereka paparan budaya Bali yang autentik sambil mengembangkan keterampilan kreatif mereka sendiri.

Pusat ini beroperasi Senin hingga Jumat dari pukul 8 pagi hingga 8 malam, menawarkan penjadwalan fleksibel untuk mengakomodasi orang tua yang bekerja. Kami juga menjalankan kamp musim panas khusus dan program akhir pekan yang menggabungkan petualangan, pembelajaran, dan kesenangan di lingkungan alam yang indah di Nuanu.`,
        highlights: [
          'Program komprehensif usia 1-9 tahun',
          'Pendidik profesional multibahasa',
          'Integrasi dengan komunitas kreatif Nuanu',
          'Penjadwalan fleksibel 8 pagi - 8 malam',
          'Kamp musim panas dan program khusus',
          'Lingkungan belajar yang aman dan kreatif'
        ],
        audio_timestamps: [
          { start: 0, end: 20, text: 'Selamat datang di Jungle Kids, pusat pengembangan anak terdepan di Nuanu Creative City.' },
          { start: 20, end: 45, text: 'Fasilitas yang dinamis ini telah memelihara pikiran muda sejak 2022, menyediakan lingkungan yang aman, kreatif, dan edukatif untuk anak-anak usia 1 hingga 9 tahun.' },
          { start: 45, end: 75, text: 'Pusat kami dibangun berdasarkan filosofi belajar melalui bermain dan eksplorasi.' },
          { start: 75, end: 105, text: 'Ruang-ruang yang berwarna-warni dan ramah anak dirancang untuk merangsang kreativitas dan imajinasi sambil memastikan keamanan dan kenyamanan.' },
          { start: 105, end: 135, text: 'Kami memadukan nilai-nilai tradisional Bali dengan pendekatan pendidikan modern untuk menciptakan pengalaman belajar yang unik.' },
          { start: 135, end: 165, text: 'Fasilitas ini memiliki beberapa zona yang sesuai dengan usia: area balita untuk usia 1-2 tahun dengan peralatan bermain sensorik.' },
          { start: 165, end: 195, text: 'Bagian prasekolah untuk usia 2-6 tahun dengan stasiun pembelajaran, dan area after-school untuk anak-anak yang lebih besar dengan fasilitas robotika dan seni.' },
          { start: 195, end: 225, text: 'Tim profesional pendidik kami berasal dari latar belakang yang beragam dalam pendidikan anak usia dini, psikologi anak, dan seni kreatif.' },
          { start: 225, end: 255, text: 'Yang membuat Jungle Kids istimewa adalah integrasi kami dengan komunitas kreatif Nuanu.' },
          { start: 255, end: 285, text: 'Anak-anak secara teratur berinteraksi dengan seniman lokal, musisi, dan pengrajin, memberikan mereka paparan budaya Bali yang autentik.' },
          { start: 285, end: 300, text: 'Pusat ini beroperasi Senin hingga Jumat dari pukul 8 pagi hingga 8 malam, menawarkan penjadwalan fleksibel untuk mengakomodasi orang tua yang bekerja.' }
        ]
      }
    },
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  }
] 