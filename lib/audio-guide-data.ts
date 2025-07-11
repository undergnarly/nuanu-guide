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
    slug: 'jungle-kids-center',
    coordinates: { lat: -8.3410, lng: 115.0918 },
    image: '/images/guides/jungle_kids.jpg',
    card_color: '#402822',
    audio_url: '/audio/guides/jungle-kids.mp3',
    video: {
      youtube_id: 'fbQaVcm5fAw',
      thumbnail: 'https://img.youtube.com/vi/fbQaVcm5fAw/maxresdefault.jpg'
    },
    category: 'culture',
    duration: 300,
    featured: true,
    accessibility: { wheelchair_accessible: true, audio_description: true, sign_language: false },
    pricing: {
      services: [
        {
          id: 'daycare',
          name: { en: 'Day Care Playground (5+ years)', ru: 'Дневной присмотр (5+ лет)', id: 'Penitipan Anak (5+ tahun)' },
          description: { en: 'Children 5+ can stay without parents. Monday-Friday 8:00-20:00', ru: 'Дети 5+ могут оставаться без родителей. Понедельник-Пятница 8:00-20:00', id: 'Anak 5+ dapat tinggal tanpa orang tua. Senin-Jumat 8:00-20:00' },
          price: '120.000 IDR (2h) / 180.000 IDR (3h) / 550.000 IDR (full day)',
          schedule: 'Mon-Fri 8:00-20:00',
          age_group: '5+ years'
        }
      ],
      booking_url: 'https://www.nuanu.com/jungle-kids-booking',
      contact_info: { phone: '+62 361 123 4567', email: 'jungle.kids@nuanu.com', whatsapp: '+62 812 3456 7890' }
    },
    content: {
      en: {
        title: 'Jungle Kids',
        description: 'A comprehensive children\'s development center offering daycare, summer camps, and educational programs for children aged 1-9 years.',
        full_text: `Welcome to Jungle Kids, an inspiring space in Nuanu for children to learn, play, and thrive. We offer an international kindergarten (3-6 years), daily daycare (3+ years) with safe play areas and art workshops, and exciting summer camps (5+). Enrich your child's experience with extra classes like robotics and gymnastics. At Jungle Kids, learning is a joyful adventure. Explore, connect, and watch your child flourish with us.`,
        highlights: ['Ages 1-9 years comprehensive programs'],
        audio_timestamps: [{ start: 0, end: 20, text: 'Welcome to Jungle Kids...' }]
      },
      ru: {
        title: 'Jungle Kids',
        description: 'Комплексный детский центр развития...',
        full_text: `Добро пожаловать в Jungle Kids...`,
        highlights: ['Комплексные программы для детей 1-9 лет'],
        audio_timestamps: [{ start: 0, end: 20, text: 'Добро пожаловать в Jungle Kids...' }]
      },
      id: {
        title: 'Jungle Kids',
        description: 'Pusat pengembangan anak komprehensif...',
        full_text: `Selamat datang di Jungle Kids...`,
        highlights: ['Program komprehensif usia 1-9 tahun'],
        audio_timestamps: [{ start: 0, end: 20, text: 'Selamat datang di Jungle Kids...' }]
      }
    },
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    slug: 'art-village',
    coordinates: { lat: -8.3425, lng: 115.0930 },
    image: '/images/guides/art_village.jpg',
    card_color: '#233f24',
    audio_url: '/audio/guides/art-village.mp3',
    video: {
      youtube_id: 'your_youtube_id_here',
      thumbnail: 'https://img.youtube.com/vi/your_youtube_id_here/maxresdefault.jpg'
    },
    category: 'art',
    duration: 320,
    featured: true,
    accessibility: { wheelchair_accessible: true, audio_description: true, sign_language: false },
    pricing: {
      services: [],
      booking_url: 'https://www.nuanu.com/art-village-booking',
      contact_info: { phone: '+62 361 789 0123', email: 'artteam@nuanu.com', whatsapp: '+62 812 9012 3456' }
    },
    content: {
      en: {
        title: 'Art Village',
        description: 'Home to the Nuanu Art Team, crafting installations from natural materials and hosting weekly hands-on workshops for unique souvenir creation.',
        full_text: `Art Village — home to the Nuanu Art Team, who craft installations from natural materials such as rattan, bamboo, alang-alang grass, driftwood, stone, clay, cement, sand, and more. Almost every nature-based artwork you see in Nuanu begins here. Each week the team hosts hands-on workshops, inviting guests to work with these materials and leave with a unique, self-made souvenir. Come and touch, learn and create natural art with experienced masters.`,
        highlights: ['Home to the Nuanu Art Team'],
        audio_timestamps: [{ start: 0, end: 25, text: 'Welcome to Art Village...' }]
      },
      ru: {
        title: 'Деревня Искусств',
        description: 'Дом команды художников Nuanu...',
        full_text: `Добро пожаловать в Деревню Искусств...`,
        highlights: ['Дом команды художников Nuanu'],
        audio_timestamps: [{ start: 0, end: 25, text: 'Добро пожаловать в Деревню Искусств...' }]
      },
      id: {
        title: 'Art Village',
        description: 'Rumah bagi Tim Seni Nuanu...',
        full_text: `Selamat datang di Art Village...`,
        highlights: ['Rumah bagi Tim Seni Nuanu'],
        audio_timestamps: [{ start: 0, end: 25, text: 'Selamat datang di Art Village...' }]
      }
    },
    created_at: '2024-01-25T16:15:00Z',
    updated_at: '2024-01-25T16:15:00Z'
  },
  {
    id: '3',
    slug: 'horizon-glassworks',
    coordinates: { lat: -8.3431, lng: 115.0935 },
    image: '/images/guides/horizon.jpg',
    card_color: '#8a3400',
    audio_url: '/audio/guides/horizon-glassworks.mp3',
    video: {
      youtube_id: 'your_youtube_id_here',
      thumbnail: 'https://img.youtube.com/vi/your_youtube_id_here/maxresdefault.jpg'
    },
    category: 'art',
    duration: 280,
    featured: true,
    accessibility: { wheelchair_accessible: true, audio_description: true, sign_language: false },
    pricing: {
      services: [],
      booking_url: 'https://www.nuanu.com/art-village-booking',
      contact_info: { phone: '+62 361 456 7890', email: 'studio@horizonglassworks.com', whatsapp: '+62 812 7890 1234' }
    },
    content: {
      en: {
        title: 'Horizon Glassworks',
        description: 'Indonesia\'s most established glass art studio, creating one-of-a-kind artworks and offering educational workshops and demonstrations.',
        full_text: `Horizon Glassworks is the most established glass art studio in Indonesia. We pride ourselves in producing one of a kind artworks from local and international artists. While offering narrated demonstrations and workshops to the public, we also focus on creating artwork for collectors. By teaching the craft of glassblowing to the public we are able to provide an experience like no other.

Our team of artists are dedicated to educating and creating an exciting experience for the whole family.

Come by the studio today and expand your knowledge on the world of glass art!`,
        highlights: ['Indonesia\'s most established glass art studio'],
        audio_timestamps: [{ start: 0, end: 20, text: 'Welcome to Horizon Glassworks...' }]
      },
      ru: {
        title: 'Horizon Glassworks',
        description: 'Самая известная стеклодувная студия в Индонезии...',
        full_text: `Добро пожаловать в Horizon Glassworks...`,
        highlights: ['Самая известная стеклодувная студия в Индонезии'],
        audio_timestamps: [{ start: 0, end: 20, text: 'Добро пожаловать в Horizon Glassworks...' }]
      },
      id: {
        title: 'Horizon Glassworks',
        description: 'Studio seni kaca paling mapan di Indonesia...',
        full_text: `Selamat datang di Horizon Glassworks...`,
        highlights: ['Studio seni kaca paling mapan di Indonesia'],
        audio_timestamps: [{ start: 0, end: 20, text: 'Selamat datang di Horizon Glassworks...' }]
      }
    },
    created_at: '2024-01-20T14:30:00Z',
    updated_at: '2024-01-20T14:30:00Z'
  },
  {
    id: '4',
    slug: 'pacha-alpaca',
    coordinates: { lat: -8.3418, lng: 115.0925 },
    image: '/images/guides/pacha-alpaca-new.jpg',
    card_color: '#2d1d0b',
    audio_url: '/audio/guides/pacha-alpaca.mp3',
    video: {
      youtube_id: 'your_youtube_id_here',
      thumbnail: 'https://img.youtube.com/vi/your_youtube_id_here/maxresdefault.jpg'
    },
    category: 'nature',
    duration: 360,
    featured: true,
    accessibility: { wheelchair_accessible: true, audio_description: true, sign_language: false },
    pricing: {
      services: [],
      booking_url: 'https://www.nuanu.com/pacha-alpaca-booking',
      contact_info: { phone: '+62 361 567 8901', email: 'alpacas@nuanu.com', whatsapp: '+62 812 5678 9012' }
    },
    content: {
      en: {
        title: 'Pacha Alpaca',
        description: 'Nuanu\'s living sanctuary where gentle alpacas in caramel coats offer a peaceful escape from city life...',
        full_text: `Welcome, traveler. Step onto the forest trail ahead—the gentle crunch of leaves is your first invitation to breathe deeply. Ten minutes of birdsong and bamboo will carry you to Pacha Alpaca, Nuanu’s living sanctuary.

Notice how city noise fades; only wind and woolly murmurs remain. Our hosts in caramel coats wait just ahead, ready to guide you toward inner calm.

Join your guide for the Alpaca Connection—a slow 30-minute walk through two open zones where you can pet, feed and feel the gentle heartbeat of each animal.

Adults, children or whole families may join; every ticket supports daily care for these empathetic souls.

Follow the aroma of vietnameese coffee to the open-air Alpaca Café. Here you can watch the herd roam while sipping a cool drinks or sharing fresh fruit. The café is open Tuesday to Sunday, 10 a.m. to 9 p.m., so linger as long as you wish.

Private Dinner with Alpacas. Picture a bamboo table inside the enclosure, lit by candles, a bouquet at its heart. One hour of fine Balinese cuisine is served while the herd grazes quietly around you—an unforgettable date beneath the stars.

Staying overnight? A curved bamboo lodge stands ready, where dawn breaks with soft humming from the paddock and breakfast is delivered to your porch. The stay includes tomorrow’s Alpaca Connection, so dreams blend seamlessly into morning cuddles.

Is opened every day! Welcome to Pacha Alpaca`,
        highlights: ['Living sanctuary with gentle alpacas'],
        audio_timestamps: [{ start: 0, end: 25, text: 'Welcome, traveler...' }]
      },
      ru: {
        title: 'Pacha Alpaca',
        description: 'Живое святилище Nuanu, где нежные альпаки...',
        full_text: `Добро пожаловать, путешественник...`,
        highlights: ['Живое святилище с нежными альпаками'],
        audio_timestamps: [{ start: 0, end: 25, text: 'Добро пожаловать, путешественник...' }]
      },
      id: {
        title: 'Pacha Alpaca',
        description: 'Tempat perlindungan hidup Nuanu di mana alpaka lembut...',
        full_text: `Selamat datang, pelancong...`,
        highlights: ['Tempat perlindungan hidup dengan alpaka lembut'],
        audio_timestamps: [{ start: 0, end: 25, text: 'Selamat datang, pelancong...' }]
      }
    },
    created_at: '2024-01-30T12:00:00Z',
    updated_at: '2024-01-30T12:00:00Z'
  },
  {
    id: '5',
    slug: 'sol-dance-studio',
    coordinates: { lat: -8.3405, lng: 115.0942 },
    image: '/images/guides/sol.png',
    card_color: '#9b6e34',
    audio_url: '/audio/guides/sol.mp3',
    video: {
      youtube_id: 'your_youtube_id_here',
      thumbnail: 'https://img.youtube.com/vi/your_youtube_id_here/maxresdefault.jpg'
    },
    category: 'culture',
    duration: 300,
    featured: true,
    accessibility: { wheelchair_accessible: true, audio_description: true, sign_language: false },
    pricing: {
      services: [],
      booking_url: 'https://www.nuanu.com/sol-dance-studio-booking',
      contact_info: { phone: '+62 361 678 9012', email: 'dance@solstudio.com', whatsapp: '+62 812 6789 0123' }
    },
    content: {
      en: {
        title: 'SOL Dance Studio',
        description: 'SOL Dance Studio is the dance space in the heart of Nuanu Creative City. Here, every day is filled with dance workshops for adults and kids, from Street and Latin Dance to Modern and Classic styles. But SOL is more than just classes. It’s a home for the dance community, a place for events, performances, battles, and competitions—everything a dancer dreams of. SOL Dance Studio is your space to dance, grow, and connect.',
        full_text: `SOL Dance Studio is the dance space in the heart of Nuanu Creative City

Here, every day is filled with dance workshops for adults and kids, from Street and Latin Dance to Modern and Classic styles

But SOL is more than just classes
It’s a home for the dance community
A place for events, performances, battles, and competitions, everything a dancer dreams of

SOL Dance Studio is your space to dance, grow, and connect`,
        highlights: ['Dance space in the heart of Nuanu'],
        audio_timestamps: [{ start: 0, end: 20, text: 'Welcome to SOL Dance Studio...' }]
      },
      ru: {
        title: 'SOL Dance Studio',
        description: 'Танцевальная студия SOL — это танцевальное пространство в самом сердце Nuanu Creative City. Здесь каждый день проходят танцевальные мастер-классы для взрослых и детей, от уличных и латиноамериканских танцев до модерна и классических стилей. Но SOL — это больше, чем просто уроки. Это дом для танцевального сообщества, место для мероприятий, выступлений, баттлов и соревнований — всего, о чем мечтает танцор. Танцевальная студия SOL — это ваше пространство для танцев, роста и общения.',
        full_text: `Добро пожаловать в SOL Dance Studio...`,
        highlights: ['Танцевальное пространство в сердце Nuanu'],
        audio_timestamps: [{ start: 0, end: 20, text: 'Добро пожаловать в SOL Dance Studio...' }]
      },
      id: {
        title: 'SOL Dance Studio',
        description: 'SOL Dance Studio adalah ruang dansa di jantung Nuanu Creative City. Di sini, setiap hari diisi dengan lokakarya tari untuk orang dewasa dan anak-anak, dari Street dan Latin Dance hingga gaya Modern dan Klasik. Tapi SOL lebih dari sekadar kelas. Ini adalah rumah bagi komunitas tari, tempat untuk acara, pertunjukan, battle, dan kompetisi—semua yang diimpikan seorang penari. SOL Dance Studio adalah ruang Anda untuk menari, berkembang, dan terhubung.',
        full_text: `Selamat datang di SOL Dance Studio...`,
        highlights: ['Ruang dansa di jantung Nuanu'],
        audio_timestamps: [{ start: 0, end: 20, text: 'Selamat datang di SOL Dance Studio...' }]
      }
    },
    created_at: '2024-02-05T14:30:00Z',
    updated_at: '2024-02-05T14:30:00Z'
  }
] 