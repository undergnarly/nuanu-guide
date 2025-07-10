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
  },
  {
    id: '2',
    slug: 'horizon-glassworks',
    coordinates: {
      lat: -8.3395,
      lng: 115.0925
    },
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?q=80&w=1000&auto=format&fit=crop',
    video: {
      youtube_id: '9luf_5hvxUY',
      thumbnail: 'https://img.youtube.com/vi/9luf_5hvxUY/maxresdefault.jpg'
    },
    category: 'art',
    duration: 280, // 4 минуты 40 секунд
    featured: true,
    accessibility: {
      wheelchair_accessible: true,
      audio_description: true,
      sign_language: false
    },
    pricing: {
      services: [
        {
          id: 'demonstrations',
          name: {
            en: 'Narrated Glass Art Demonstrations',
            ru: 'Демонстрации стеклодувного искусства с комментариями',
            id: 'Demonstrasi Seni Kaca dengan Narasi'
          },
          description: {
            en: 'Watch master artisans create unique glass artworks with live narration',
            ru: 'Наблюдайте за мастерами, создающими уникальные произведения из стекла с живыми комментариями',
            id: 'Saksikan pengrajin ahli membuat karya seni kaca unik dengan narasi langsung'
          },
          price: 'Contact for pricing',
          schedule: 'Daily demonstrations available'
        },
        {
          id: 'workshops',
          name: {
            en: 'Glassblowing Workshops',
            ru: 'Мастер-классы по стеклодувному искусству',
            id: 'Workshop Meniup Kaca'
          },
          description: {
            en: 'Learn the ancient craft of glassblowing from experienced artists',
            ru: 'Изучите древнее ремесло стеклодувия у опытных художников',
            id: 'Pelajari kerajinan kuno meniup kaca dari seniman berpengalaman'
          },
          price: 'Contact for pricing',
          schedule: 'By appointment',
          max_participants: 8
        },
        {
          id: 'collector-pieces',
          name: {
            en: 'Custom Collector Artworks',
            ru: 'Коллекционные произведения на заказ',
            id: 'Karya Seni Kolektor Kustom'
          },
          description: {
            en: 'Commission unique one-of-a-kind glass artworks for collectors',
            ru: 'Заказать уникальные произведения из стекла для коллекционеров',
            id: 'Pesan karya seni kaca unik satu-satunya untuk kolektor'
          },
          price: 'Contact for custom pricing',
          schedule: 'Commission basis'
        },
        {
          id: 'family-experience',
          name: {
            en: 'Family Glass Art Experience',
            ru: 'Семейный опыт стеклянного искусства',
            id: 'Pengalaman Seni Kaca Keluarga'
          },
          description: {
            en: 'Educational and exciting glass art experience for the whole family',
            ru: 'Образовательный и захватывающий опыт стеклянного искусства для всей семьи',
            id: 'Pengalaman seni kaca yang edukatif dan menarik untuk seluruh keluarga'
          },
          price: 'Contact for group pricing',
          age_group: 'All ages welcome'
        }
      ],
      booking_url: 'https://www.nuanu.com/horizon-glassworks-booking',
      contact_info: {
        phone: '+62 361 456 7890',
        email: 'studio@horizonglassworks.com',
        whatsapp: '+62 812 7890 1234'
      }
    },
    content: {
      en: {
        title: 'Horizon Glassworks',
        description: 'Indonesia\'s most established glass art studio, creating one-of-a-kind artworks and offering educational workshops and demonstrations.',
        full_text: `Welcome to Horizon Glassworks, the most established glass art studio in Indonesia. We pride ourselves in producing one-of-a-kind artworks from local and international artists, setting the standard for glass artistry in Southeast Asia.

Our studio combines traditional glassblowing techniques with contemporary artistic vision, creating pieces that capture both the essence of Indonesian culture and modern artistic expression. Each piece that emerges from our furnaces tells a unique story, shaped by the hands of master craftspeople who have dedicated their lives to this ancient art form.

While offering narrated demonstrations and workshops to the public, we also focus on creating artwork for collectors who appreciate the finest in glass artistry. Our demonstrations provide visitors with an intimate look into the mesmerizing process of glassblowing, where molten glass transforms into breathtaking works of art before your eyes.

Our team of artists are dedicated to educating and creating an exciting experience for the whole family. We believe that art should be accessible to everyone, and our workshops cater to all skill levels, from curious beginners to experienced artists looking to expand their repertoire.

By teaching the craft of glassblowing to the public, we are able to provide an experience like no other. Visitors leave not only with a deeper appreciation for this ancient craft but often with their own handcrafted piece, a tangible memory of their time at Horizon Glassworks.

The studio's location within Nuanu Creative City provides the perfect backdrop for artistic inspiration, surrounded by a community of creatives who share our passion for preserving and evolving traditional crafts in contemporary contexts.

Come by the studio today and expand your knowledge on the world of glass art! Whether you're seeking to commission a custom piece, participate in a hands-on workshop, or simply witness the magic of glassblowing, Horizon Glassworks offers an unforgettable journey into the heart of artistic creation.`,
        highlights: [
          'Indonesia\'s most established glass art studio',
          'Local and international artist collaborations',
          'Narrated demonstrations and workshops',
          'Custom collector artwork commissions',
          'Family-friendly educational experiences',
          'Master craftspeople with years of expertise'
        ],
        audio_timestamps: [
          { start: 0, end: 20, text: 'Welcome to Horizon Glassworks, the most established glass art studio in Indonesia.' },
          { start: 20, end: 45, text: 'We pride ourselves in producing one-of-a-kind artworks from local and international artists, setting the standard for glass artistry in Southeast Asia.' },
          { start: 45, end: 70, text: 'Our studio combines traditional glassblowing techniques with contemporary artistic vision.' },
          { start: 70, end: 95, text: 'Each piece that emerges from our furnaces tells a unique story, shaped by the hands of master craftspeople.' },
          { start: 95, end: 120, text: 'While offering narrated demonstrations and workshops to the public, we also focus on creating artwork for collectors.' },
          { start: 120, end: 145, text: 'Our demonstrations provide visitors with an intimate look into the mesmerizing process of glassblowing.' },
          { start: 145, end: 170, text: 'Our team of artists are dedicated to educating and creating an exciting experience for the whole family.' },
          { start: 170, end: 195, text: 'We believe that art should be accessible to everyone, and our workshops cater to all skill levels.' },
          { start: 195, end: 220, text: 'By teaching the craft of glassblowing to the public, we are able to provide an experience like no other.' },
          { start: 220, end: 245, text: 'Visitors leave not only with a deeper appreciation for this ancient craft but often with their own handcrafted piece.' },
          { start: 245, end: 270, text: 'The studio\'s location within Nuanu Creative City provides the perfect backdrop for artistic inspiration.' },
          { start: 270, end: 280, text: 'Come by the studio today and expand your knowledge on the world of glass art!' }
        ]
      },
      ru: {
        title: 'Horizon Glassworks',
        description: 'Самая известная стеклодувная студия в Индонезии, создающая уникальные произведения искусства и предлагающая образовательные мастер-классы и демонстрации.',
        full_text: `Добро пожаловать в Horizon Glassworks, самую известную стеклодувную студию в Индонезии. Мы гордимся тем, что создаем уникальные произведения искусства от местных и международных художников, устанавливая стандарт стеклянного искусства в Юго-Восточной Азии.

Наша студия сочетает традиционные техники стеклодувия с современным художественным видением, создавая произведения, которые отражают как сущность индонезийской культуры, так и современное художественное выражение. Каждое произведение, выходящее из наших печей, рассказывает уникальную историю, сформированную руками мастеров, посвятивших свою жизнь этому древнему виду искусства.

Предлагая демонстрации с комментариями и мастер-классы для публики, мы также сосредоточены на создании произведений искусства для коллекционеров, которые ценят лучшее в стеклянном искусстве. Наши демонстрации предоставляют посетителям интимный взгляд на завораживающий процесс стеклодувия, где расплавленное стекло превращается в захватывающие произведения искусства на ваших глазах.

Наша команда художников посвящена обучению и созданию захватывающего опыта для всей семьи. Мы верим, что искусство должно быть доступно каждому, и наши мастер-классы подходят для всех уровней навыков, от любопытных новичков до опытных художников, стремящихся расширить свой репертуар.

Обучая ремеслу стеклодувия публику, мы можем предоставить опыт, не похожий ни на что другое. Посетители уходят не только с более глубоким пониманием этого древнего ремесла, но часто и со своим собственным изделием ручной работы, осязаемой памятью о времени, проведенном в Horizon Glassworks.

Расположение студии в Nuanu Creative City обеспечивает идеальный фон для художественного вдохновения, окруженное сообществом творческих людей, разделяющих нашу страсть к сохранению и развитию традиционных ремесел в современном контексте.

Приходите в студию сегодня и расширьте свои знания о мире стеклянного искусства! Независимо от того, стремитесь ли вы заказать индивидуальное произведение, участвовать в практическом мастер-классе или просто наблюдать за магией стеклодувия, Horizon Glassworks предлагает незабываемое путешествие в сердце художественного творчества.`,
        highlights: [
          'Самая известная стеклодувная студия Индонезии',
          'Сотрудничество с местными и международными художниками',
          'Демонстрации с комментариями и мастер-классы',
          'Коллекционные произведения на заказ',
          'Семейные образовательные программы',
          'Мастера с многолетним опытом'
        ],
        audio_timestamps: [
          { start: 0, end: 20, text: 'Добро пожаловать в Horizon Glassworks, самую известную стеклодувную студию в Индонезии.' },
          { start: 20, end: 45, text: 'Мы гордимся тем, что создаем уникальные произведения искусства от местных и международных художников, устанавливая стандарт стеклянного искусства в Юго-Восточной Азии.' },
          { start: 45, end: 70, text: 'Наша студия сочетает традиционные техники стеклодувия с современным художественным видением.' },
          { start: 70, end: 95, text: 'Каждое произведение, выходящее из наших печей, рассказывает уникальную историю, сформированную руками мастеров.' },
          { start: 95, end: 120, text: 'Предлагая демонстрации с комментариями и мастер-классы для публики, мы также сосредоточены на создании произведений искусства для коллекционеров.' },
          { start: 120, end: 145, text: 'Наши демонстрации предоставляют посетителям интимный взгляд на завораживающий процесс стеклодувия.' },
          { start: 145, end: 170, text: 'Наша команда художников посвящена обучению и созданию захватывающего опыта для всей семьи.' },
          { start: 170, end: 195, text: 'Мы верим, что искусство должно быть доступно каждому, и наши мастер-классы подходят для всех уровней навыков.' },
          { start: 195, end: 220, text: 'Обучая ремеслу стеклодувия публику, мы можем предоставить опыт, не похожий ни на что другое.' },
          { start: 220, end: 245, text: 'Посетители уходят не только с более глубоким пониманием этого древнего ремесла, но часто и со своим собственным изделием ручной работы.' },
          { start: 245, end: 270, text: 'Расположение студии в Nuanu Creative City обеспечивает идеальный фон для художественного вдохновения.' },
          { start: 270, end: 280, text: 'Приходите в студию сегодня и расширьте свои знания о мире стеклянного искусства!' }
        ]
      },
      id: {
        title: 'Horizon Glassworks',
        description: 'Studio seni kaca paling mapan di Indonesia, menciptakan karya seni unik dan menawarkan workshop edukatif serta demonstrasi.',
        full_text: `Selamat datang di Horizon Glassworks, studio seni kaca paling mapan di Indonesia. Kami bangga memproduksi karya seni unik dari seniman lokal dan internasional, menetapkan standar untuk seni kaca di Asia Tenggara.

Studio kami menggabungkan teknik tradisional meniup kaca dengan visi artistik kontemporer, menciptakan karya yang menangkap esensi budaya Indonesia dan ekspresi seni modern. Setiap karya yang muncul dari tungku kami menceritakan kisah unik, dibentuk oleh tangan pengrajin ahli yang telah mengabdikan hidup mereka untuk bentuk seni kuno ini.

Selain menawarkan demonstrasi bernarasi dan workshop untuk publik, kami juga fokus pada pembuatan karya seni untuk kolektor yang menghargai seni kaca terbaik. Demonstrasi kami memberikan pengunjung pandangan intim ke dalam proses meniup kaca yang memukau, di mana kaca cair berubah menjadi karya seni yang menawan di depan mata Anda.

Tim seniman kami berdedikasi untuk mendidik dan menciptakan pengalaman menarik untuk seluruh keluarga. Kami percaya bahwa seni harus dapat diakses oleh semua orang, dan workshop kami melayani semua tingkat keahlian, dari pemula yang penasaran hingga seniman berpengalaman yang ingin memperluas repertoar mereka.

Dengan mengajarkan kerajinan meniup kaca kepada publik, kami dapat memberikan pengalaman yang tak tertandingi. Pengunjung pergi tidak hanya dengan apresiasi yang lebih dalam terhadap kerajinan kuno ini tetapi sering dengan karya buatan tangan mereka sendiri, kenangan nyata dari waktu mereka di Horizon Glassworks.

Lokasi studio di dalam Nuanu Creative City memberikan latar belakang yang sempurna untuk inspirasi artistik, dikelilingi oleh komunitas kreatif yang berbagi hasrat kami untuk melestarikan dan mengembangkan kerajinan tradisional dalam konteks kontemporer.

Datanglah ke studio hari ini dan perluas pengetahuan Anda tentang dunia seni kaca! Baik Anda ingin memesan karya kustom, berpartisipasi dalam workshop langsung, atau sekadar menyaksikan keajaiban meniup kaca, Horizon Glassworks menawarkan perjalanan tak terlupakan ke jantung penciptaan artistik.`,
        highlights: [
          'Studio seni kaca paling mapan di Indonesia',
          'Kolaborasi seniman lokal dan internasional',
          'Demonstrasi bernarasi dan workshop',
          'Komisi karya seni kolektor kustom',
          'Pengalaman edukatif ramah keluarga',
          'Pengrajin ahli dengan pengalaman bertahun-tahun'
        ],
        audio_timestamps: [
          { start: 0, end: 20, text: 'Selamat datang di Horizon Glassworks, studio seni kaca paling mapan di Indonesia.' },
          { start: 20, end: 45, text: 'Kami bangga memproduksi karya seni unik dari seniman lokal dan internasional, menetapkan standar untuk seni kaca di Asia Tenggara.' },
          { start: 45, end: 70, text: 'Studio kami menggabungkan teknik tradisional meniup kaca dengan visi artistik kontemporer.' },
          { start: 70, end: 95, text: 'Setiap karya yang muncul dari tungku kami menceritakan kisah unik, dibentuk oleh tangan pengrajin ahli.' },
          { start: 95, end: 120, text: 'Selain menawarkan demonstrasi bernarasi dan workshop untuk publik, kami juga fokus pada pembuatan karya seni untuk kolektor.' },
          { start: 120, end: 145, text: 'Demonstrasi kami memberikan pengunjung pandangan intim ke dalam proses meniup kaca yang memukau.' },
          { start: 145, end: 170, text: 'Tim seniman kami berdedikasi untuk mendidik dan menciptakan pengalaman menarik untuk seluruh keluarga.' },
          { start: 170, end: 195, text: 'Kami percaya bahwa seni harus dapat diakses oleh semua orang, dan workshop kami melayani semua tingkat keahlian.' },
          { start: 195, end: 220, text: 'Dengan mengajarkan kerajinan meniup kaca kepada publik, kami dapat memberikan pengalaman yang tak tertandingi.' },
          { start: 220, end: 245, text: 'Pengunjung pergi tidak hanya dengan apresiasi yang lebih dalam terhadap kerajinan kuno ini tetapi sering dengan karya buatan tangan mereka sendiri.' },
          { start: 245, end: 270, text: 'Lokasi studio di dalam Nuanu Creative City memberikan latar belakang yang sempurna untuk inspirasi artistik.' },
          { start: 270, end: 280, text: 'Datanglah ke studio hari ini dan perluas pengetahuan Anda tentang dunia seni kaca!' }
        ]
      }
    },
    created_at: '2024-01-20T14:30:00Z',
    updated_at: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    slug: 'art-village',
    coordinates: {
      lat: -8.3400,
      lng: 115.0915
    },
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000&auto=format&fit=crop',
    video: {
      youtube_id: 'cuJHcmQ2DLc',
      thumbnail: 'https://img.youtube.com/vi/cuJHcmQ2DLc/maxresdefault.jpg'
    },
    category: 'art',
    duration: 320, // 5 минут 20 секунд
    featured: true,
    accessibility: {
      wheelchair_accessible: true,
      audio_description: true,
      sign_language: false
    },
    pricing: {
      services: [
        {
          id: 'weekly-workshops',
          name: {
            en: 'Weekly Hands-on Workshops',
            ru: 'Еженедельные практические мастер-классы',
            id: 'Workshop Praktek Mingguan'
          },
          description: {
            en: 'Learn to work with natural materials like rattan, bamboo, clay, and more with experienced masters',
            ru: 'Научитесь работать с натуральными материалами: ротанг, бамбук, глина и многое другое с опытными мастерами',
            id: 'Belajar bekerja dengan bahan alami seperti rotan, bambu, tanah liat, dan lainnya dengan master berpengalaman'
          },
          price: 'Contact for pricing',
          schedule: 'Every week, various times',
          max_participants: 12
        },
        {
          id: 'installation-tours',
          name: {
            en: 'Installation Creation Tours',
            ru: 'Экскурсии по созданию инсталляций',
            id: 'Tur Pembuatan Instalasi'
          },
          description: {
            en: 'Guided tours showing how installations are crafted from natural materials',
            ru: 'Экскурсии с гидом, показывающие как создаются инсталляции из натуральных материалов',
            id: 'Tur terpandu menunjukkan bagaimana instalasi dibuat dari bahan alami'
          },
          price: 'Contact for pricing',
          schedule: 'Daily tours available'
        },
        {
          id: 'souvenir-making',
          name: {
            en: 'Create Your Own Souvenir',
            ru: 'Создайте свой сувенир',
            id: 'Buat Souvenir Sendiri'
          },
          description: {
            en: 'Work with natural materials to create a unique, self-made souvenir to take home',
            ru: 'Работайте с натуральными материалами, чтобы создать уникальный сувенир ручной работы',
            id: 'Bekerja dengan bahan alami untuk membuat souvenir unik buatan sendiri untuk dibawa pulang'
          },
          price: 'Contact for pricing',
          age_group: 'All ages welcome'
        },
        {
          id: 'nature-art-intensive',
          name: {
            en: 'Natural Art Intensive Course',
            ru: 'Интенсивный курс природного искусства',
            id: 'Kursus Intensif Seni Alam'
          },
          description: {
            en: 'Deep dive into traditional natural art techniques with master craftspeople',
            ru: 'Глубокое погружение в традиционные техники природного искусства с мастерами-ремесленниками',
            id: 'Mendalami teknik seni alam tradisional dengan pengrajin ahli'
          },
          price: 'Contact for course pricing',
          schedule: 'Multi-day intensive',
          max_participants: 8
        }
      ],
      booking_url: 'https://www.nuanu.com/art-village-booking',
      contact_info: {
        phone: '+62 361 789 0123',
        email: 'artteam@nuanu.com',
        whatsapp: '+62 812 9012 3456'
      }
    },
    content: {
      en: {
        title: 'Art Village',
        description: 'Home to the Nuanu Art Team, crafting installations from natural materials and hosting weekly hands-on workshops for unique souvenir creation.',
        full_text: `Welcome to Art Village, the creative heart and home to the Nuanu Art Team. This is where the magic begins – where skilled artisans craft stunning installations from an incredible array of natural materials including rattan, bamboo, alang-alang grass, driftwood, stone, clay, cement, sand, and many more treasures that nature provides.

Almost every nature-based artwork you see throughout Nuanu Creative City begins its journey here in Art Village. Our talented team of artists and craftspeople have mastered the ancient techniques of working with natural materials, transforming them into contemporary installations that celebrate both traditional craftsmanship and modern artistic vision.

The village is more than just a workspace – it's a living laboratory where tradition meets innovation. Each piece created here tells a story of sustainable art practices, where we honor the materials gifted by nature and transform them with respect and creativity.

Each week, our experienced masters host hands-on workshops that invite guests from around the world to dive into this fascinating world of natural art creation. These sessions are designed for people of all skill levels, from curious beginners to experienced artists looking to explore new mediums and techniques.

During these workshops, you'll have the opportunity to work directly with these amazing natural materials under the guidance of our master craftspeople. You'll learn about the properties of each material, traditional techniques passed down through generations, and how to apply these methods to create your own unique artwork.

The best part? You'll leave with a one-of-a-kind, self-made souvenir that captures not just the beauty of Nuanu, but also your personal creative journey. Whether it's a small sculpture, a woven piece, or a mixed-media installation, your creation will be uniquely yours.

Come and touch, learn, and create natural art with our experienced masters. Discover how the simplest materials from nature can be transformed into extraordinary works of art, and take home a piece of Nuanu's creative spirit that you helped bring to life.`,
        highlights: [
          'Home to the Nuanu Art Team',
          'Natural materials: rattan, bamboo, stone, clay, and more',
          'Weekly hands-on workshops with experienced masters',
          'Create unique self-made souvenirs',
          'Traditional techniques meet modern vision',
          'Sustainable art practices'
        ],
        audio_timestamps: [
          { start: 0, end: 25, text: 'Welcome to Art Village, the creative heart and home to the Nuanu Art Team.' },
          { start: 25, end: 50, text: 'This is where skilled artisans craft stunning installations from natural materials including rattan, bamboo, alang-alang grass, driftwood, stone, clay, cement, and sand.' },
          { start: 50, end: 75, text: 'Almost every nature-based artwork you see throughout Nuanu Creative City begins its journey here in Art Village.' },
          { start: 75, end: 100, text: 'Our talented team of artists and craftspeople have mastered the ancient techniques of working with natural materials.' },
          { start: 100, end: 125, text: 'The village is more than just a workspace – it\'s a living laboratory where tradition meets innovation.' },
          { start: 125, end: 150, text: 'Each piece created here tells a story of sustainable art practices, where we honor the materials gifted by nature.' },
          { start: 150, end: 175, text: 'Each week, our experienced masters host hands-on workshops that invite guests from around the world.' },
          { start: 175, end: 200, text: 'These sessions are designed for people of all skill levels, from curious beginners to experienced artists.' },
          { start: 200, end: 225, text: 'During workshops, you\'ll work directly with natural materials under the guidance of our master craftspeople.' },
          { start: 225, end: 250, text: 'You\'ll learn about material properties, traditional techniques, and how to create your own unique artwork.' },
          { start: 250, end: 275, text: 'You\'ll leave with a one-of-a-kind, self-made souvenir that captures the beauty of Nuanu and your creative journey.' },
          { start: 275, end: 300, text: 'Come and touch, learn, and create natural art with our experienced masters.' },
          { start: 300, end: 320, text: 'Discover how simple natural materials can be transformed into extraordinary works of art.' }
        ]
      },
      ru: {
        title: 'Деревня Искусств',
        description: 'Дом команды художников Nuanu, создающих инсталляции из натуральных материалов и проводящих еженедельные мастер-классы для создания уникальных сувениров.',
        full_text: `Добро пожаловать в Деревню Искусств, творческое сердце и дом команды художников Nuanu. Здесь начинается магия – здесь опытные мастера создают потрясающие инсталляции из невероятного множества натуральных материалов, включая ротанг, бамбук, траву алang-alang, плавник, камень, глину, цемент, песок и многие другие сокровища, которые дарит природа.

Почти каждое произведение искусства на основе природных материалов, которое вы видите в Nuanu Creative City, начинает свое путешествие здесь, в Деревне Искусств. Наша талантливая команда художников и ремесленников освоила древние техники работы с натуральными материалами, превращая их в современные инсталляции, которые празднуют как традиционное мастерство, так и современное художественное видение.

Деревня – это больше, чем просто рабочее пространство – это живая лаборатория, где традиции встречаются с инновациями. Каждое произведение, созданное здесь, рассказывает историю устойчивых художественных практик, где мы чтим материалы, подаренные природой, и преобразуем их с уважением и творчеством.

Каждую неделю наши опытные мастера проводят практические мастер-классы, которые приглашают гостей со всего мира погрузиться в этот захватывающий мир создания природного искусства. Эти занятия предназначены для людей всех уровней навыков, от любопытных новичков до опытных художников, желающих исследовать новые материалы и техники.

Во время этих мастер-классов у вас будет возможность работать непосредственно с этими удивительными натуральными материалами под руководством наших мастеров-ремесленников. Вы узнаете о свойствах каждого материала, традиционных техниках, передаваемых из поколения в поколение, и о том, как применить эти методы для создания своего уникального произведения искусства.

Самое приятное? Вы уйдете с единственным в своем роде сувениром ручной работы, который отражает не только красоту Nuanu, но и ваше личное творческое путешествие. Будь то небольшая скульптура, плетеное изделие или инсталляция из смешанных материалов – ваше творение будет уникально вашим.

Приходите и прикасайтесь, изучайте и создавайте природное искусство с нашими опытными мастерами. Откройте для себя, как самые простые материалы природы могут быть превращены в необычайные произведения искусства, и заберите домой частичку творческого духа Nuanu, которую вы помогли воплотить в жизнь.`,
        highlights: [
          'Дом команды художников Nuanu',
          'Натуральные материалы: ротанг, бамбук, камень, глина и др.',
          'Еженедельные практические мастер-классы с опытными мастерами',
          'Создание уникальных сувениров ручной работы',
          'Традиционные техники встречаются с современным видением',
          'Устойчивые художественные практики'
        ],
        audio_timestamps: [
          { start: 0, end: 25, text: 'Добро пожаловать в Деревню Искусств, творческое сердце и дом команды художников Nuanu.' },
          { start: 25, end: 50, text: 'Здесь опытные мастера создают потрясающие инсталляции из натуральных материалов, включая ротанг, бамбук, траву алang-alang, плавник, камень, глину, цемент и песок.' },
          { start: 50, end: 75, text: 'Почти каждое произведение искусства на основе природных материалов в Nuanu Creative City начинает свое путешествие здесь, в Деревне Искусств.' },
          { start: 75, end: 100, text: 'Наша талантливая команда художников и ремесленников освоила древние техники работы с натуральными материалами.' },
          { start: 100, end: 125, text: 'Деревня – это больше, чем просто рабочее пространство – это живая лаборатория, где традиции встречаются с инновациями.' },
          { start: 125, end: 150, text: 'Каждое произведение, созданное здесь, рассказывает историю устойчивых художественных практик, где мы чтим материалы, подаренные природой.' },
          { start: 150, end: 175, text: 'Каждую неделю наши опытные мастера проводят практические мастер-классы, которые приглашают гостей со всего мира.' },
          { start: 175, end: 200, text: 'Эти занятия предназначены для людей всех уровней навыков, от любопытных новичков до опытных художников.' },
          { start: 200, end: 225, text: 'Во время мастер-классов у вас будет возможность работать непосредственно с натуральными материалами под руководством наших мастеров.' },
          { start: 225, end: 250, text: 'Вы узнаете о свойствах каждого материала, традиционных техниках и о том, как создать свое уникальное произведение искусства.' },
          { start: 250, end: 275, text: 'Вы уйдете с единственным в своем роде сувениром ручной работы, который отражает красоту Nuanu и ваше творческое путешествие.' },
          { start: 275, end: 300, text: 'Приходите и прикасайтесь, изучайте и создавайте природное искусство с нашими опытными мастерами.' },
          { start: 300, end: 320, text: 'Откройте для себя, как простые материалы природы могут быть превращены в необычайные произведения искусства.' }
        ]
      },
      id: {
        title: 'Art Village',
        description: 'Rumah bagi Tim Seni Nuanu, menciptakan instalasi dari bahan alami dan mengadakan workshop praktek mingguan untuk pembuatan souvenir unik.',
        full_text: `Selamat datang di Art Village, jantung kreatif dan rumah bagi Tim Seni Nuanu. Di sinilah keajaiban dimulai – di mana pengrajin terampil menciptakan instalasi menakjubkan dari berbagai bahan alami yang luar biasa termasuk rotan, bambu, rumput alang-alang, kayu apung, batu, tanah liat, semen, pasir, dan banyak harta lainnya yang disediakan alam.

Hampir setiap karya seni berbasis alam yang Anda lihat di seluruh Nuanu Creative City memulai perjalanannya di sini di Art Village. Tim berbakat seniman dan pengrajin kami telah menguasai teknik kuno bekerja dengan bahan alami, mengubahnya menjadi instalasi kontemporer yang merayakan baik kerajinan tradisional maupun visi artistik modern.

Desa ini lebih dari sekadar ruang kerja – ini adalah laboratorium hidup di mana tradisi bertemu dengan inovasi. Setiap karya yang diciptakan di sini menceritakan kisah praktik seni berkelanjutan, di mana kami menghormati bahan-bahan yang diberikan alam dan mengubahnya dengan rasa hormat dan kreativitas.

Setiap minggu, master berpengalaman kami mengadakan workshop praktek yang mengundang tamu dari seluruh dunia untuk menyelami dunia menarik penciptaan seni alam ini. Sesi-sesi ini dirancang untuk orang-orang dari semua tingkat keahlian, dari pemula yang penasaran hingga seniman berpengalaman yang ingin menjelajahi medium dan teknik baru.

Selama workshop ini, Anda akan memiliki kesempatan untuk bekerja langsung dengan bahan-bahan alami yang menakjubkan ini di bawah bimbingan pengrajin ahli kami. Anda akan belajar tentang sifat-sifat setiap bahan, teknik tradisional yang diturunkan dari generasi ke generasi, dan cara menerapkan metode ini untuk menciptakan karya seni unik Anda sendiri.

Bagian terbaiknya? Anda akan pulang dengan souvenir buatan sendiri yang unik, yang menangkap tidak hanya keindahan Nuanu, tetapi juga perjalanan kreatif pribadi Anda. Baik itu patung kecil, karya anyaman, atau instalasi media campuran, ciptaan Anda akan menjadi milik Anda yang unik.

Datang dan sentuh, pelajari, dan ciptakan seni alam dengan master berpengalaman kami. Temukan bagaimana bahan-bahan paling sederhana dari alam dapat diubah menjadi karya seni yang luar biasa, dan bawa pulang sepotong semangat kreatif Nuanu yang Anda bantu wujudkan.`,
        highlights: [
          'Rumah bagi Tim Seni Nuanu',
          'Bahan alami: rotan, bambu, batu, tanah liat, dan lainnya',
          'Workshop praktek mingguan dengan master berpengalaman',
          'Ciptakan souvenir buatan sendiri yang unik',
          'Teknik tradisional bertemu dengan visi modern',
          'Praktik seni berkelanjutan'
        ],
        audio_timestamps: [
          { start: 0, end: 25, text: 'Selamat datang di Art Village, jantung kreatif dan rumah bagi Tim Seni Nuanu.' },
          { start: 25, end: 50, text: 'Di sini pengrajin terampil menciptakan instalasi menakjubkan dari bahan alami termasuk rotan, bambu, rumput alang-alang, kayu apung, batu, tanah liat, semen, dan pasir.' },
          { start: 50, end: 75, text: 'Hampir setiap karya seni berbasis alam yang Anda lihat di Nuanu Creative City memulai perjalanannya di sini di Art Village.' },
          { start: 75, end: 100, text: 'Tim berbakat seniman dan pengrajin kami telah menguasai teknik kuno bekerja dengan bahan alami.' },
          { start: 100, end: 125, text: 'Desa ini lebih dari sekadar ruang kerja – ini adalah laboratorium hidup di mana tradisi bertemu dengan inovasi.' },
          { start: 125, end: 150, text: 'Setiap karya yang diciptakan di sini menceritakan kisah praktik seni berkelanjutan, di mana kami menghormati bahan-bahan yang diberikan alam.' },
          { start: 150, end: 175, text: 'Setiap minggu, master berpengalaman kami mengadakan workshop praktek yang mengundang tamu dari seluruh dunia.' },
          { start: 175, end: 200, text: 'Sesi-sesi ini dirancang untuk orang-orang dari semua tingkat keahlian, dari pemula yang penasaran hingga seniman berpengalaman.' },
          { start: 200, end: 225, text: 'Selama workshop, Anda akan bekerja langsung dengan bahan-bahan alami menakjubkan ini di bawah bimbingan pengrajin ahli kami.' },
          { start: 225, end: 250, text: 'Anda akan belajar tentang sifat-sifat setiap bahan, teknik tradisional, dan cara menciptakan karya seni unik Anda sendiri.' },
          { start: 250, end: 275, text: 'Anda akan pulang dengan souvenir buatan sendiri yang unik, yang menangkap keindahan Nuanu dan perjalanan kreatif pribadi Anda.' },
          { start: 275, end: 300, text: 'Datang dan sentuh, pelajari, dan ciptakan seni alam dengan master berpengalaman kami.' },
          { start: 300, end: 320, text: 'Temukan bagaimana bahan-bahan paling sederhana dari alam dapat diubah menjadi karya seni yang luar biasa.' }
        ]
      }
    },
    created_at: '2024-01-25T16:15:00Z',
    updated_at: '2024-01-25T16:15:00Z'
  },
  {
    id: '4',
    slug: 'pacha-alpaca',
    coordinates: {
      lat: -8.3385,
      lng: 115.0930
    },
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1000&auto=format&fit=crop',
    category: 'nature',
    duration: 360, // 6 минут
    featured: true,
    accessibility: {
      wheelchair_accessible: true,
      audio_description: true,
      sign_language: false
    },
    pricing: {
      services: [
        {
          id: 'alpaca-connection',
          name: {
            en: 'Alpaca Connection Experience',
            ru: 'Опыт общения с альпаками',
            id: 'Pengalaman Koneksi Alpaka'
          },
          description: {
            en: 'Slow 30-minute walk through two open zones where you can pet, feed and feel the gentle heartbeat of each animal',
            ru: 'Спокойная 30-минутная прогулка по двум открытым зонам, где можно погладить, покормить и почувствовать нежное сердцебиение каждого животного',
            id: 'Jalan santai 30 menit melalui dua zona terbuka di mana Anda dapat mengelus, memberi makan dan merasakan detak jantung lembut setiap hewan'
          },
          price: 'Contact for pricing',
          duration: '30 minutes',
          age_group: 'Adults, children, families welcome'
        },
        {
          id: 'alpaca-cafe',
          name: {
            en: 'Alpaca Café Experience',
            ru: 'Опыт в кафе альпак',
            id: 'Pengalaman Kafe Alpaka'
          },
          description: {
            en: 'Watch the herd roam while sipping Vietnamese coffee, cool drinks or sharing fresh fruit',
            ru: 'Наблюдайте за стадом, потягивая вьетнамский кофе, прохладительные напитки или делясь свежими фруктами',
            id: 'Saksikan kawanan berkeliaran sambil menyeruput kopi Vietnam, minuman dingin atau berbagi buah segar'
          },
          price: 'Contact for pricing',
          schedule: 'Tuesday to Sunday, 10 AM - 9 PM'
        },
        {
          id: 'private-dinner',
          name: {
            en: 'Private Dinner with Alpacas',
            ru: 'Частный ужин с альпаками',
            id: 'Makan Malam Pribadi dengan Alpaka'
          },
          description: {
            en: 'Bamboo table inside the enclosure, lit by candles. One hour of fine Balinese cuisine served while the herd grazes around you',
            ru: 'Бамбуковый стол внутри загона при свечах. Час изысканной балийской кухни, пока стадо пасется вокруг вас',
            id: 'Meja bambu di dalam kandang, diterangi lilin. Satu jam masakan Bali yang lezat disajikan sementara kawanan merumput di sekitar Anda'
          },
          price: 'Contact for pricing',
          duration: '1 hour',
          schedule: 'Evening dining experience'
        },
        {
          id: 'overnight-stay',
          name: {
            en: 'Bamboo Lodge Overnight Stay',
            ru: 'Ночевка в бамбуковом домике',
            id: 'Menginap di Pondok Bambu'
          },
          description: {
            en: 'Curved bamboo lodge where dawn breaks with soft humming from the paddock. Includes breakfast delivery and next day Alpaca Connection',
            ru: 'Изогнутый бамбуковый домик, где рассвет встречает мягкое мычание с пастбища. Включает доставку завтрака и общение с альпаками на следующий день',
            id: 'Pondok bambu melengkung di mana fajar menyingsing dengan dengungan lembut dari kandang. Termasuk pengiriman sarapan dan Koneksi Alpaka hari berikutnya'
          },
          price: 'Contact for pricing'
        }
      ],
      booking_url: 'https://www.nuanu.com/pacha-alpaca-booking',
      contact_info: {
        phone: '+62 361 567 8901',
        email: 'alpacas@nuanu.com',
        whatsapp: '+62 812 5678 9012'
      }
    },
    content: {
      en: {
        title: 'Pacha Alpaca',
        description: 'Nuanu\'s living sanctuary where gentle alpacas in caramel coats offer a peaceful escape from city life through connection experiences, café dining, and overnight stays.',
        full_text: `Welcome, traveler. Step onto the forest trail ahead—the gentle crunch of leaves is your first invitation to breathe deeply. Ten minutes of birdsong and bamboo will carry you to Pacha Alpaca, Nuanu's living sanctuary.

Notice how city noise fades as you walk deeper into nature; only wind and woolly murmurs remain. Our hosts in caramel coats wait just ahead, ready to guide you toward inner calm and authentic connection with these gentle souls.

The heart of our sanctuary is the Alpaca Connection—a slow, mindful 30-minute walk through two open zones where you can pet, feed, and feel the gentle heartbeat of each animal. These empathetic creatures have an incredible ability to sense emotion and provide comfort, making each interaction deeply personal and therapeutic.

Adults, children, or whole families may join this transformative experience; every ticket supports the daily care for these empathetic souls who have found their forever home here in our peaceful sanctuary.

Follow the enticing aroma of Vietnamese coffee to our open-air Alpaca Café, where the magic continues. Here you can watch the herd roam freely while sipping cool drinks or sharing fresh tropical fruit. The café is open Tuesday to Sunday, 10 a.m. to 9 p.m., so linger as long as you wish and let the peaceful energy of our animals wash over you.

For those seeking something truly extraordinary, we offer a Private Dinner with Alpacas. Picture a beautiful bamboo table set inside the enclosure, softly lit by flickering candles with a fresh bouquet at its heart. One hour of fine Balinese cuisine is served while the herd grazes quietly around you—creating an unforgettable romantic date beneath the stars.

Staying overnight? Our curved bamboo lodge stands ready to embrace you, where dawn breaks with the soft humming from the paddock and a delicious breakfast is delivered directly to your private porch. Your stay includes tomorrow's Alpaca Connection experience, so your dreams blend seamlessly into morning cuddles with our beloved animals.

Pacha Alpaca is open every day, welcoming souls seeking peace, connection, and the gentle wisdom that only these remarkable creatures can provide. Welcome to your sanctuary away from the world.`,
        highlights: [
          'Living sanctuary with gentle alpacas in caramel coats',
          '30-minute Alpaca Connection experience',
          'Open-air café with Vietnamese coffee',
          'Private candlelit dinner with alpacas',
          'Overnight bamboo lodge stays',
          'Open daily for peaceful escape'
        ],
        audio_timestamps: [
          { start: 0, end: 25, text: 'Welcome, traveler. Step onto the forest trail ahead—the gentle crunch of leaves is your first invitation to breathe deeply.' },
          { start: 25, end: 50, text: 'Ten minutes of birdsong and bamboo will carry you to Pacha Alpaca, Nuanu\'s living sanctuary.' },
          { start: 50, end: 75, text: 'Notice how city noise fades as you walk deeper into nature; only wind and woolly murmurs remain.' },
          { start: 75, end: 100, text: 'Our hosts in caramel coats wait just ahead, ready to guide you toward inner calm and authentic connection.' },
          { start: 100, end: 125, text: 'The heart of our sanctuary is the Alpaca Connection—a slow, mindful 30-minute walk through two open zones.' },
          { start: 125, end: 150, text: 'Here you can pet, feed, and feel the gentle heartbeat of each animal with their incredible ability to sense emotion.' },
          { start: 150, end: 175, text: 'Adults, children, or whole families may join this transformative experience supporting the daily care for these empathetic souls.' },
          { start: 175, end: 200, text: 'Follow the enticing aroma of Vietnamese coffee to our open-air Alpaca Café.' },
          { start: 200, end: 225, text: 'Watch the herd roam freely while sipping cool drinks. The café is open Tuesday to Sunday, 10 a.m. to 9 p.m.' },
          { start: 225, end: 250, text: 'We offer a Private Dinner with Alpacas—a bamboo table inside the enclosure, softly lit by candles.' },
          { start: 250, end: 275, text: 'One hour of fine Balinese cuisine while the herd grazes quietly around you—an unforgettable experience beneath the stars.' },
          { start: 275, end: 300, text: 'Our curved bamboo lodge offers overnight stays where dawn breaks with soft humming from the paddock.' },
          { start: 300, end: 325, text: 'Breakfast is delivered to your porch, and your stay includes tomorrow\'s Alpaca Connection experience.' },
          { start: 325, end: 350, text: 'Pacha Alpaca is open every day, welcoming souls seeking peace, connection, and gentle wisdom.' },
          { start: 350, end: 360, text: 'Welcome to your sanctuary away from the world.' }
        ]
      },
      ru: {
        title: 'Pacha Alpaca',
        description: 'Живое святилище Nuanu, где нежные альпаки в карамельных шубках предлагают мирное убежище от городской жизни через опыт общения, ужины в кафе и ночевки.',
        full_text: `Добро пожаловать, путешественник. Ступайте на лесную тропу впереди — нежный хруст листьев станет вашим первым приглашением глубоко вдохнуть. Десять минут пения птиц и бамбука приведут вас к Pacha Alpaca, живому святилищу Nuanu.

Заметьте, как затихает городской шум по мере того, как вы углубляетесь в природу; остаются только ветер и шерстяное мурлыканье. Наши хозяева в карамельных шубках ждут прямо впереди, готовые привести вас к внутреннему спокойствию и подлинной связи с этими нежными душами.

Сердце нашего святилища — это Связь с Альпаками — медленная, осознанная 30-минутная прогулка по двум открытым зонам, где вы можете погладить, покормить и почувствовать нежное сердцебиение каждого животного. Эти эмпатичные существа обладают невероятной способностью чувствовать эмоции и обеспечивать комфорт, делая каждое взаимодействие глубоко личным и терапевтическим.

Взрослые, дети или целые семьи могут присоединиться к этому преображающему опыту; каждый билет поддерживает ежедневный уход за этими эмпатичными душами, которые нашли свой навсегда дом здесь, в нашем мирном святилище.

Следуйте за заманчивым ароматом вьетнамского кофе в наше кафе под открытым небом Alpaca Café, где продолжается магия. Здесь вы можете наблюдать за свободно пасущимся стадом, потягивая прохладительные напитки или деля тропические фрукты. Кафе открыто со вторника по воскресенье с 10 утра до 9 вечера, поэтому задерживайтесь столько, сколько пожелаете, и позвольте мирной энергии наших животных окутать вас.

Для тех, кто ищет что-то поистине необычное, мы предлагаем Частный ужин с альпаками. Представьте красивый бамбуковый стол, установленный внутри загона, мягко освещенный мерцающими свечами со свежим букетом в центре. Час изысканной балийской кухни подается, пока стадо тихо пасется вокруг вас — создавая незабываемое романтическое свидание под звездами.

Остаетесь на ночь? Наш изогнутый бамбуковый домик готов обнять вас, где рассвет встречает мягкое мычание с пастбища, а вкусный завтрак доставляется прямо на вашу частную веранду. Ваше пребывание включает завтрашний опыт Связи с Альпаками, поэтому ваши сны плавно переходят в утренние объятия с нашими любимыми животными.

Pacha Alpaca открыт каждый день, приветствуя души, ищущие мир, связь и нежную мудрость, которую могут дать только эти замечательные существа. Добро пожаловать в ваше святилище вдали от мира.`,
        highlights: [
          'Живое святилище с нежными альпаками в карамельных шубках',
          '30-минутный опыт общения с альпаками',
          'Кафе под открытым небом с вьетнамским кофе',
          'Частный ужин при свечах с альпаками',
          'Ночевки в бамбуковом домике',
          'Открыто ежедневно для мирного побега'
        ],
        audio_timestamps: [
          { start: 0, end: 25, text: 'Добро пожаловать, путешественник. Ступайте на лесную тропу впереди — нежный хруст листьев станет вашим первым приглашением глубоко вдохнуть.' },
          { start: 25, end: 50, text: 'Десять минут пения птиц и бамбука приведут вас к Pacha Alpaca, живому святилищу Nuanu.' },
          { start: 50, end: 75, text: 'Заметьте, как затихает городской шум по мере углубления в природу; остаются только ветер и шерстяное мурлыканье.' },
          { start: 75, end: 100, text: 'Наши хозяева в карамельных шубках ждут впереди, готовые привести вас к внутреннему спокойствию и подлинной связи.' },
          { start: 100, end: 125, text: 'Сердце нашего святилища — это Связь с Альпаками — медленная, осознанная 30-минутная прогулка по двум открытым зонам.' },
          { start: 125, end: 150, text: 'Здесь вы можете погладить, покормить и почувствовать нежное сердцебиение каждого животного с их невероятной способностью чувствовать эмоции.' },
          { start: 150, end: 175, text: 'Взрослые, дети или целые семьи могут присоединиться к этому преображающему опыту, поддерживая ежедневный уход за эмпатичными душами.' },
          { start: 175, end: 200, text: 'Следуйте за заманчивым ароматом вьетнамского кофе в наше кафе под открытым небом Alpaca Café.' },
          { start: 200, end: 225, text: 'Наблюдайте за свободно пасущимся стадом, потягивая прохладительные напитки. Кафе открыто со вторника по воскресенье с 10 утра до 9 вечера.' },
          { start: 225, end: 250, text: 'Мы предлагаем Частный ужин с альпаками — бамбуковый стол внутри загона, мягко освещенный свечами.' },
          { start: 250, end: 275, text: 'Час изысканной балийской кухни, пока стадо тихо пасется вокруг вас — незабываемый опыт под звездами.' },
          { start: 275, end: 300, text: 'Наш изогнутый бамбуковый домик предлагает ночевки, где рассвет встречает мягкое мычание с пастбища.' },
          { start: 300, end: 325, text: 'Завтрак доставляется на вашу веранду, и ваше пребывание включает завтрашний опыт общения с альпаками.' },
          { start: 325, end: 350, text: 'Pacha Alpaca открыт каждый день, приветствуя души, ищущие мир, связь и нежную мудрость.' },
          { start: 350, end: 360, text: 'Добро пожаловать в ваше святилище вдали от мира.' }
        ]
      },
      id: {
        title: 'Pacha Alpaca',
        description: 'Tempat perlindungan hidup Nuanu di mana alpaka lembut berbalut karamel menawarkan pelarian damai dari kehidupan kota melalui pengalaman koneksi, makan di kafe, dan menginap.',
        full_text: `Selamat datang, pelancong. Melangkahlah ke jalur hutan di depan—gemerisik dedaunan yang lembut adalah undangan pertama Anda untuk bernapas dalam-dalam. Sepuluh menit kicauan burung dan bambu akan membawa Anda ke Pacha Alpaca, tempat perlindungan hidup Nuanu.

Perhatikan bagaimana kebisingan kota memudar saat Anda berjalan lebih dalam ke alam; hanya angin dan gumaman berbulu yang tersisa. Tuan rumah kami berbalut karamel menunggu di depan, siap membimbing Anda menuju ketenangan batin dan koneksi autentik dengan jiwa-jiwa lembut ini.

Jantung tempat perlindungan kami adalah Koneksi Alpaka—jalan kaki yang lambat dan penuh perhatian selama 30 menit melalui dua zona terbuka di mana Anda dapat mengelus, memberi makan, dan merasakan detak jantung lembut setiap hewan. Makhluk berempati ini memiliki kemampuan luar biasa untuk merasakan emosi dan memberikan kenyamanan, membuat setiap interaksi menjadi sangat personal dan terapeutik.

Orang dewasa, anak-anak, atau seluruh keluarga dapat bergabung dengan pengalaman transformatif ini; setiap tiket mendukung perawatan harian untuk jiwa-jiwa berempati yang telah menemukan rumah selamanya di tempat perlindungan damai kami.

Ikuti aroma kopi Vietnam yang menggoda ke Kafe Alpaka terbuka kami, di mana keajaiban berlanjut. Di sini Anda dapat menonton kawanan berkeliaran dengan bebas sambil menyeruput minuman dingin atau berbagi buah tropis segar. Kafe buka Selasa hingga Minggu, 10 pagi hingga 9 malam, jadi berlama-lamalah sesuka Anda dan biarkan energi damai hewan-hewan kami menyelimuti Anda.

Bagi mereka yang mencari sesuatu yang benar-benar luar biasa, kami menawarkan Makan Malam Pribadi dengan Alpaka. Bayangkan meja bambu yang indah diatur di dalam kandang, diterangi lembut oleh lilin berkedip dengan buket segar di tengahnya. Satu jam masakan Bali yang lezat disajikan sementara kawanan merumput dengan tenang di sekitar Anda—menciptakan kencan romantis yang tak terlupakan di bawah bintang-bintang.

Menginap semalam? Pondok bambu melengkung kami siap merangkul Anda, di mana fajar menyingsing dengan dengungan lembut dari kandang dan sarapan lezat diantarkan langsung ke teras pribadi Anda. Menginap Anda termasuk pengalaman Koneksi Alpaka besok, jadi mimpi Anda berpadu mulus dengan pelukan pagi dengan hewan-hewan tercinta kami.

Pacha Alpaca buka setiap hari, menyambut jiwa-jiwa yang mencari kedamaian, koneksi, dan kebijaksanaan lembut yang hanya dapat diberikan oleh makhluk-makhluk luar biasa ini. Selamat datang di tempat perlindungan Anda jauh dari dunia.`,
        highlights: [
          'Tempat perlindungan hidup dengan alpaka lembut berbalut karamel',
          'Pengalaman Koneksi Alpaka 30 menit',
          'Kafe terbuka dengan kopi Vietnam',
          'Makan malam pribadi dengan lilin bersama alpaka',
          'Menginap di pondok bambu',
          'Buka setiap hari untuk pelarian damai'
        ],
        audio_timestamps: [
          { start: 0, end: 25, text: 'Selamat datang, pelancong. Melangkahlah ke jalur hutan di depan—gemerisik dedaunan yang lembut adalah undangan pertama Anda untuk bernapas dalam-dalam.' },
          { start: 25, end: 50, text: 'Sepuluh menit kicauan burung dan bambu akan membawa Anda ke Pacha Alpaca, tempat perlindungan hidup Nuanu.' },
          { start: 50, end: 75, text: 'Perhatikan bagaimana kebisingan kota memudar saat berjalan lebih dalam ke alam; hanya angin dan gumaman berbulu yang tersisa.' },
          { start: 75, end: 100, text: 'Tuan rumah kami berbalut karamel menunggu di depan, siap membimbing Anda menuju ketenangan batin dan koneksi autentik.' },
          { start: 100, end: 125, text: 'Jantung tempat perlindungan kami adalah Koneksi Alpaka—jalan kaki yang lambat dan penuh perhatian selama 30 menit melalui dua zona terbuka.' },
          { start: 125, end: 150, text: 'Di sini Anda dapat mengelus, memberi makan, dan merasakan detak jantung lembut setiap hewan dengan kemampuan luar biasa mereka merasakan emosi.' },
          { start: 150, end: 175, text: 'Orang dewasa, anak-anak, atau seluruh keluarga dapat bergabung dengan pengalaman transformatif ini yang mendukung perawatan harian jiwa berempati.' },
          { start: 175, end: 200, text: 'Ikuti aroma kopi Vietnam yang menggoda ke Kafe Alpaka terbuka kami.' },
          { start: 200, end: 225, text: 'Tonton kawanan berkeliaran bebas sambil menyeruput minuman dingin. Kafe buka Selasa hingga Minggu, 10 pagi hingga 9 malam.' },
          { start: 225, end: 250, text: 'Kami menawarkan Makan Malam Pribadi dengan Alpaka—meja bambu di dalam kandang, diterangi lembut oleh lilin.' },
          { start: 250, end: 275, text: 'Satu jam masakan Bali lezat sementara kawanan merumput tenang di sekitar Anda—pengalaman tak terlupakan di bawah bintang-bintang.' },
          { start: 275, end: 300, text: 'Pondok bambu melengkung kami menawarkan menginap di mana fajar menyingsing dengan dengungan lembut dari kandang.' },
          { start: 300, end: 325, text: 'Sarapan diantarkan ke teras Anda, dan menginap termasuk pengalaman Koneksi Alpaka besok.' },
          { start: 325, end: 350, text: 'Pacha Alpaca buka setiap hari, menyambut jiwa yang mencari kedamaian, koneksi, dan kebijaksanaan lembut.' },
          { start: 350, end: 360, text: 'Selamat datang di tempat perlindungan Anda jauh dari dunia.' }
        ]
      }
    },
    created_at: '2024-01-30T12:00:00Z',
    updated_at: '2024-01-30T12:00:00Z'
  },
  {
    id: '5',
    slug: 'sol-dance-studio',
    coordinates: {
      lat: -8.3390,
      lng: 115.0910
    },
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1000&auto=format&fit=crop',
    video: {
      youtube_id: 'KN9d1sx8nKo',
      thumbnail: 'https://img.youtube.com/vi/KN9d1sx8nKo/maxresdefault.jpg'
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
          id: 'adult-classes',
          name: {
            en: 'Adult Dance Classes',
            ru: 'Танцевальные занятия для взрослых',
            id: 'Kelas Dansa Dewasa'
          },
          description: {
            en: 'Street, Latin, Modern and Classic dance styles for adults of all levels',
            ru: 'Уличные, латиноамериканские, современные и классические танцевальные стили для взрослых всех уровней',
            id: 'Gaya tari Street, Latin, Modern dan Klasik untuk dewasa semua tingkat'
          },
          price: 'Contact for pricing',
          schedule: 'Daily workshops available',
          age_group: 'Adults'
        },
        {
          id: 'kids-classes',
          name: {
            en: 'Kids Dance Programs',
            ru: 'Детские танцевальные программы',
            id: 'Program Dansa Anak-anak'
          },
          description: {
            en: 'Fun and engaging dance classes designed specifically for children',
            ru: 'Веселые и увлекательные танцевальные занятия, специально разработанные для детей',
            id: 'Kelas dansa yang menyenangkan dan menarik yang dirancang khusus untuk anak-anak'
          },
          price: 'Contact for pricing',
          schedule: 'Daily workshops available',
          age_group: 'Children'
        },
        {
          id: 'performances',
          name: {
            en: 'Performances & Shows',
            ru: 'Выступления и шоу',
            id: 'Pertunjukan & Acara'
          },
          description: {
            en: 'Regular performances and showcases featuring studio dancers and guest artists',
            ru: 'Регулярные выступления и показы с участием танцоров студии и приглашенных артистов',
            id: 'Pertunjukan dan showcase rutin yang menampilkan penari studio dan artis tamu'
          },
          price: 'Contact for event pricing',
          schedule: 'Regular events'
        },
        {
          id: 'battles-competitions',
          name: {
            en: 'Dance Battles & Competitions',
            ru: 'Танцевальные баттлы и соревнования',
            id: 'Battle Dansa & Kompetisi'
          },
          description: {
            en: 'Competitive dance events, battles, and competitions for dancers to showcase their skills',
            ru: 'Соревновательные танцевальные мероприятия, баттлы и конкурсы для демонстрации навыков танцоров',
            id: 'Acara dansa kompetitif, battle, dan kompetisi untuk penari menunjukkan keterampilan mereka'
          },
          price: 'Contact for participation fees',
          schedule: 'Regular competitions'
        },
        {
          id: 'private-sessions',
          name: {
            en: 'Private Dance Sessions',
            ru: 'Частные танцевальные занятия',
            id: 'Sesi Dansa Pribadi'
          },
          description: {
            en: 'One-on-one personalized dance instruction with professional instructors',
            ru: 'Персональные танцевальные уроки один на один с профессиональными инструкторами',
            id: 'Instruksi dansa personal satu-lawan-satu dengan instruktur profesional'
          },
          price: 'Contact for private rates',
          schedule: 'By appointment'
        }
      ],
      booking_url: 'https://www.nuanu.com/sol-dance-studio-booking',
      contact_info: {
        phone: '+62 361 678 9012',
        email: 'dance@solstudio.com',
        whatsapp: '+62 812 6789 0123'
      }
    },
    content: {
      en: {
        title: 'SOL Dance Studio',
        description: 'The dance space in the heart of Nuanu Creative City, offering daily workshops for all ages and hosting community events, performances, and competitions.',
        full_text: `Welcome to SOL Dance Studio, the vibrant dance space in the heart of Nuanu Creative City. Here, rhythm meets passion, and every heartbeat synchronizes with the music that fills our walls from dawn until dusk.

Every day at SOL is filled with dynamic dance workshops designed for both adults and kids, covering an incredible spectrum of styles. From the raw energy of Street Dance to the passionate rhythms of Latin Dance, from the fluid expressions of Modern Dance to the timeless elegance of Classic styles – we celebrate every form of movement that speaks to the soul.

But SOL is so much more than just classes. This is a true home for the dance community, a sanctuary where dancers of all backgrounds, ages, and skill levels come together to share their love for movement. Whether you're taking your first tentative steps or you're a seasoned performer, SOL welcomes you with open arms and mirrors that reflect not just your movement, but your growth as an artist.

Our studio serves as the beating heart of dance culture in Nuanu, hosting an endless array of events that fuel the passion of our community. From intimate performances where dancers share their latest choreography to high-energy battles where skills are tested and creativity flourishes, SOL is where dreams take flight.

Regular competitions bring out the competitive spirit in our dancers, creating an atmosphere of healthy rivalry and mutual respect. These events showcase the incredible talent that calls SOL home while inspiring the next generation of dancers to push their boundaries and explore new possibilities.

Professional instructors with years of international experience guide our classes, bringing not just technical expertise but also the stories and cultural richness of dance traditions from around the world. They understand that dance is not just about perfect technique – it's about expression, emotion, and the unique voice that each dancer brings to the floor.

SOL Dance Studio is your space to dance, grow, and connect. Here, you'll discover not just new moves, but new aspects of yourself. You'll forge friendships that extend far beyond the studio walls and become part of a community that celebrates movement as a universal language of joy, expression, and human connection.

Come join us at SOL, where every step tells a story, every beat creates a memory, and every dancer finds their home.`,
        highlights: [
          'Dance space in the heart of Nuanu Creative City',
          'Daily workshops for adults and kids',
          'Street, Latin, Modern and Classic dance styles',
          'Home for the dance community',
          'Events, performances, battles, and competitions',
          'Space to dance, grow, and connect'
        ],
        audio_timestamps: [
          { start: 0, end: 20, text: 'Welcome to SOL Dance Studio, the vibrant dance space in the heart of Nuanu Creative City.' },
          { start: 20, end: 40, text: 'Here, rhythm meets passion, and every heartbeat synchronizes with the music that fills our walls from dawn until dusk.' },
          { start: 40, end: 60, text: 'Every day at SOL is filled with dynamic dance workshops designed for both adults and kids.' },
          { start: 60, end: 80, text: 'From Street Dance to Latin Dance, from Modern Dance to Classic styles – we celebrate every form of movement.' },
          { start: 80, end: 100, text: 'But SOL is so much more than just classes. This is a true home for the dance community.' },
          { start: 100, end: 120, text: 'A sanctuary where dancers of all backgrounds, ages, and skill levels come together to share their love for movement.' },
          { start: 120, end: 140, text: 'Our studio serves as the beating heart of dance culture in Nuanu, hosting an endless array of events.' },
          { start: 140, end: 160, text: 'From intimate performances to high-energy battles where skills are tested and creativity flourishes.' },
          { start: 160, end: 180, text: 'Regular competitions bring out the competitive spirit, creating an atmosphere of healthy rivalry and mutual respect.' },
          { start: 180, end: 200, text: 'Professional instructors with international experience guide our classes with technical expertise and cultural richness.' },
          { start: 200, end: 220, text: 'They understand that dance is not just about perfect technique – it\'s about expression and emotion.' },
          { start: 220, end: 240, text: 'SOL Dance Studio is your space to dance, grow, and connect with new aspects of yourself.' },
          { start: 240, end: 260, text: 'You\'ll forge friendships that extend beyond the studio walls and become part of a celebrating community.' },
          { start: 260, end: 280, text: 'Come join us at SOL, where every step tells a story, every beat creates a memory.' },
          { start: 280, end: 300, text: 'And every dancer finds their home in this space of movement, joy, and human connection.' }
        ]
      },
      ru: {
        title: 'SOL Dance Studio',
        description: 'Танцевальное пространство в сердце Nuanu Creative City, предлагающее ежедневные мастер-классы для всех возрастов и проводящее общественные мероприятия, выступления и соревнования.',
        full_text: `Добро пожаловать в SOL Dance Studio, яркое танцевальное пространство в сердце Nuanu Creative City. Здесь ритм встречается со страстью, и каждое сердцебиение синхронизируется с музыкой, которая наполняет наши стены с рассвета до заката.

Каждый день в SOL наполнен динамичными танцевальными мастер-классами, разработанными как для взрослых, так и для детей, охватывающими невероятный спектр стилей. От сырой энергии уличных танцев до страстных ритмов латиноамериканских танцев, от плавных выражений современного танца до вневременной элегантности классических стилей – мы празднуем каждую форму движения, которая говорит с душой.

Но SOL – это гораздо больше, чем просто занятия. Это настоящий дом для танцевального сообщества, святилище, где танцоры всех происхождений, возрастов и уровней навыков собираются вместе, чтобы разделить свою любовь к движению. Независимо от того, делаете ли вы свои первые неуверенные шаги или являетесь опытным исполнителем, SOL приветствует вас с распростертыми объятиями и зеркалами, которые отражают не только ваше движение, но и ваш рост как артиста.

Наша студия служит бьющимся сердцем танцевальной культуры в Nuanu, принимая бесконечное множество мероприятий, которые питают страсть нашего сообщества. От интимных выступлений, где танцоры делятся своими последними хореографиями, до высокоэнергетических баттлов, где проверяются навыки и расцветает творчество, SOL – это место, где мечты обретают крылья.

Регулярные соревнования выявляют соревновательный дух наших танцоров, создавая атмосферу здорового соперничества и взаимного уважения. Эти мероприятия демонстрируют невероятный талант, который называет SOL домом, вдохновляя следующее поколение танцоров расширять свои границы и исследовать новые возможности.

Профессиональные инструкторы с многолетним международным опытом ведут наши занятия, привнося не только техническую экспертизу, но и истории и культурное богатство танцевальных традиций со всего мира. Они понимают, что танец – это не только о совершенной технике – это о выражении, эмоциях и уникальном голосе, который каждый танцор привносит на танцпол.

SOL Dance Studio – это ваше пространство для танца, роста и связи. Здесь вы откроете не только новые движения, но и новые аспекты себя. Вы завяжете дружбы, которые простираются далеко за стены студии, и станете частью сообщества, которое празднует движение как универсальный язык радости, выражения и человеческой связи.

Присоединяйтесь к нам в SOL, где каждый шаг рассказывает историю, каждый ритм создает воспоминание, а каждый танцор находит свой дом.`,
        highlights: [
          'Танцевальное пространство в сердце Nuanu Creative City',
          'Ежедневные мастер-классы для взрослых и детей',
          'Уличные, латинские, современные и классические стили танца',
          'Дом для танцевального сообщества',
          'Мероприятия, выступления, баттлы и соревнования',
          'Пространство для танца, роста и связи'
        ],
        audio_timestamps: [
          { start: 0, end: 20, text: 'Добро пожаловать в SOL Dance Studio, яркое танцевальное пространство в сердце Nuanu Creative City.' },
          { start: 20, end: 40, text: 'Здесь ритм встречается со страстью, и каждое сердцебиение синхронизируется с музыкой, которая наполняет наши стены с рассвета до заката.' },
          { start: 40, end: 60, text: 'Каждый день в SOL наполнен динамичными танцевальными мастер-классами, разработанными как для взрослых, так и для детей.' },
          { start: 60, end: 80, text: 'От уличных танцев до латиноамериканских, от современного танца до классических стилей – мы празднуем каждую форму движения.' },
          { start: 80, end: 100, text: 'Но SOL – это гораздо больше, чем просто занятия. Это настоящий дом для танцевального сообщества.' },
          { start: 100, end: 120, text: 'Святилище, где танцоры всех происхождений, возрастов и уровней навыков собираются вместе, чтобы разделить свою любовь к движению.' },
          { start: 120, end: 140, text: 'Наша студия служит бьющимся сердцем танцевальной культуры в Nuanu, принимая бесконечное множество мероприятий.' },
          { start: 140, end: 160, text: 'От интимных выступлений до высокоэнергетических баттлов, где проверяются навыки и расцветает творчество.' },
          { start: 160, end: 180, text: 'Регулярные соревнования выявляют соревновательный дух, создавая атмосферу здорового соперничества и взаимного уважения.' },
          { start: 180, end: 200, text: 'Профессиональные инструкторы с международным опытом ведут занятия с технической экспертизой и культурным богатством.' },
          { start: 200, end: 220, text: 'Они понимают, что танец – это не только о совершенной технике – это о выражении и эмоциях.' },
          { start: 220, end: 240, text: 'SOL Dance Studio – это ваше пространство для танца, роста и связи с новыми аспектами себя.' },
          { start: 240, end: 260, text: 'Вы завяжете дружбы, которые простираются за стены студии, и станете частью празднующего сообщества.' },
          { start: 260, end: 280, text: 'Присоединяйтесь к нам в SOL, где каждый шаг рассказывает историю, каждый ритм создает воспоминание.' },
          { start: 280, end: 300, text: 'А каждый танцор находит свой дом в этом пространстве движения, радости и человеческой связи.' }
        ]
      },
      id: {
        title: 'SOL Dance Studio',
        description: 'Ruang dansa di jantung Nuanu Creative City, menawarkan workshop harian untuk semua usia dan mengadakan acara komunitas, pertunjukan, dan kompetisi.',
        full_text: `Selamat datang di SOL Dance Studio, ruang dansa yang dinamis di jantung Nuanu Creative City. Di sini, ritme bertemu dengan hasrat, dan setiap detak jantung tersinkronisasi dengan musik yang memenuhi dinding kami dari fajar hingga senja.

Setiap hari di SOL dipenuhi dengan workshop dansa dinamis yang dirancang untuk dewasa dan anak-anak, mencakup spektrum gaya yang luar biasa. Dari energi mentah Street Dance hingga ritme bersemangat Latin Dance, dari ekspresi yang mengalir dari Modern Dance hingga keanggunan abadi gaya Klasik – kami merayakan setiap bentuk gerakan yang berbicara kepada jiwa.

Tetapi SOL jauh lebih dari sekadar kelas. Ini adalah rumah sejati bagi komunitas dansa, tempat suci di mana penari dari semua latar belakang, usia, dan tingkat keterampilan berkumpul untuk berbagi cinta mereka terhadap gerakan. Baik Anda mengambil langkah pertama yang ragu-ragu atau Anda seorang performer berpengalaman, SOL menyambut Anda dengan tangan terbuka dan cermin yang mencerminkan tidak hanya gerakan Anda, tetapi pertumbuhan Anda sebagai seniman.

Studio kami berfungsi sebagai jantung berdetak budaya dansa di Nuanu, menyelenggarakan berbagai acara tak terbatas yang memicu semangat komunitas kami. Dari pertunjukan intim di mana penari berbagi koreografi terbaru mereka hingga battle berenergi tinggi di mana keterampilan diuji dan kreativitas berkembang, SOL adalah tempat impian terbang.

Kompetisi rutin memunculkan semangat kompetitif dalam penari kami, menciptakan suasana persaingan sehat dan saling menghormati. Acara-acara ini menampilkan bakat luar biasa yang menyebut SOL rumah sambil menginspirasi generasi penari berikutnya untuk mendorong batas mereka dan menjelajahi kemungkinan baru.

Instruktur profesional dengan pengalaman internasional bertahun-tahun memimpin kelas kami, membawa tidak hanya keahlian teknis tetapi juga cerita dan kekayaan budaya tradisi dansa dari seluruh dunia. Mereka memahami bahwa dansa bukan hanya tentang teknik yang sempurna – ini tentang ekspresi, emosi, dan suara unik yang dibawa setiap penari ke lantai.

SOL Dance Studio adalah ruang Anda untuk menari, tumbuh, dan terhubung. Di sini, Anda akan menemukan tidak hanya gerakan baru, tetapi aspek baru dari diri Anda. Anda akan menjalin persahabatan yang meluas jauh melampaui dinding studio dan menjadi bagian dari komunitas yang merayakan gerakan sebagai bahasa universal kegembiraan, ekspresi, dan koneksi manusia.

Bergabunglah dengan kami di SOL, di mana setiap langkah menceritakan kisah, setiap beat menciptakan kenangan, dan setiap penari menemukan rumah mereka.`,
        highlights: [
          'Ruang dansa di jantung Nuanu Creative City',
          'Workshop harian untuk dewasa dan anak-anak',
          'Gaya dansa Street, Latin, Modern dan Klasik',
          'Rumah bagi komunitas dansa',
          'Acara, pertunjukan, battle, dan kompetisi',
          'Ruang untuk menari, tumbuh, dan terhubung'
        ],
        audio_timestamps: [
          { start: 0, end: 20, text: 'Selamat datang di SOL Dance Studio, ruang dansa yang dinamis di jantung Nuanu Creative City.' },
          { start: 20, end: 40, text: 'Di sini, ritme bertemu dengan hasrat, dan setiap detak jantung tersinkronisasi dengan musik yang memenuhi dinding kami dari fajar hingga senja.' },
          { start: 40, end: 60, text: 'Setiap hari di SOL dipenuhi dengan workshop dansa dinamis yang dirancang untuk dewasa dan anak-anak.' },
          { start: 60, end: 80, text: 'Dari Street Dance hingga Latin Dance, dari Modern Dance hingga gaya Klasik – kami merayakan setiap bentuk gerakan.' },
          { start: 80, end: 100, text: 'Tetapi SOL jauh lebih dari sekadar kelas. Ini adalah rumah sejati bagi komunitas dansa.' },
          { start: 100, end: 120, text: 'Tempat suci di mana penari dari semua latar belakang, usia, dan tingkat keterampilan berkumpul untuk berbagi cinta mereka terhadap gerakan.' },
          { start: 120, end: 140, text: 'Studio kami berfungsi sebagai jantung berdetak budaya dansa di Nuanu, menyelenggarakan berbagai acara tak terbatas.' },
          { start: 140, end: 160, text: 'Dari pertunjukan intim hingga battle berenergi tinggi di mana keterampilan diuji dan kreativitas berkembang.' },
          { start: 160, end: 180, text: 'Kompetisi rutin memunculkan semangat kompetitif, menciptakan suasana persaingan sehat dan saling menghormati.' },
          { start: 180, end: 200, text: 'Instruktur profesional dengan pengalaman internasional memimpin kelas dengan keahlian teknis dan kekayaan budaya.' },
          { start: 200, end: 220, text: 'Mereka memahami bahwa dansa bukan hanya tentang teknik yang sempurna – ini tentang ekspresi dan emosi.' },
          { start: 220, end: 240, text: 'SOL Dance Studio adalah ruang Anda untuk menari, tumbuh, dan terhubung dengan aspek baru dari diri Anda.' },
          { start: 240, end: 260, text: 'Anda akan menjalin persahabatan yang meluas melampaui dinding studio dan menjadi bagian dari komunitas yang merayakan.' },
          { start: 260, end: 280, text: 'Bergabunglah dengan kami di SOL, di mana setiap langkah menceritakan kisah, setiap beat menciptakan kenangan.' },
          { start: 280, end: 300, text: 'Dan setiap penari menemukan rumah mereka di ruang gerakan, kegembiraan, dan koneksi manusia ini.' }
        ]
      }
    },
    created_at: '2024-02-05T14:30:00Z',
    updated_at: '2024-02-05T14:30:00Z'
  }
] 