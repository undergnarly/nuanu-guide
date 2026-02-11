// Event data for Nuanu Guide — sourced from nuanu.com/events

export interface EventCard {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  time: string;
  likes?: number;
  author: string;
  price: string;
  rating: number;
  reviews: number;
  card_color: string;
  location?: string;
  capacity?: number;
  registered?: number;
  fullDescription?: string;
  ticketUrl?: string;
}

export const EVENTS: EventCard[] = [
  {
    id: 1,
    title: "Lunar New Year 2026",
    description: "Welcome the Year of the Fire Horse with a four-day celebration bridging ancient heritage and future creativity. Barongsai, cultural shows, tea art exhibitions, and more.",
    image: "https://admin.cockpit.nuanu.com/assets/daca0018-11b8-4744-9e4e-021d73b3135c.png",
    category: "cultural",
    date: "February 14–17",
    time: "14:00–22:00",
    likes: 312,
    author: "Nuanu Events",
    price: "From IDR 75,000",
    rating: 4.9,
    reviews: 78,
    card_color: "#8B0000",
    location: "Nuanu Creative City",
    capacity: 500,
    registered: 340,
    fullDescription: `Nuanu Creative City presents a four-day Lunar New Year celebration welcoming the Year of the Fire Horse.

Schedule:

February 14
• 14:00 — Tea House Art Exhibition (Labyrinth Art Gallery)
• 17:30 — Lunar New Year Cultural Show (The Earth Sentinels)
• 18:00 — Barong Bangkung (The Earth Sentinels)
• 19:30 — Invisible Magic: A Multi-Sensory Descent (Labyrinth Dome) — ticketed

February 15
• 14:00 — Tea House Art Exhibition
• 16:00 — Ancient Sound Healing with Gong Bath & Tibetan Bowls by Roba Grow
• 17:30 — Lunar New Year Cultural Show
• 18:00 — Barong Bangkung
• 19:30 — DRIPPIN: Tea Art & HipHop Performance by CulCha Collective — ticketed

February 16–17
• 14:00 — Tea House Art Exhibition
• 17:30 — Lunar New Year Cultural Show
• 18:00 — Barong Bangkung

Entrance Tickets:
• Indonesian Citizens / KITAS Holders: IDR 75,000
• International Guests: IDR 150,000

Entrance includes access to all public areas, Barongsai, Barong Bangkung, Lunar New Year Showcase, and Tea Art Exhibition.`,
    ticketUrl: "https://megatix.co.id",
  },
  {
    id: 2,
    title: "Invisible Magic: A Multi-Sensory Descent",
    description: "An immersive experience where mentalist Chen Ting from Hong Kong dissolves the boundaries of the real, with ambient soundscapes by Keigo Tanaka and 360° dome visuals.",
    image: "https://admin.cockpit.nuanu.com/assets/05586443-108b-42fe-87d7-334d2dfddd98.png",
    category: "art",
    date: "February 14",
    time: "19:30",
    likes: 198,
    author: "Nuanu Events",
    price: "IDR 350,000",
    rating: 4.8,
    reviews: 42,
    card_color: "#1a1a2e",
    location: "Labyrinth Dome, Nuanu Creative City",
    capacity: 200,
    registered: 165,
    fullDescription: `Invisible Magic: A Multi-Sensory Descent

This immersive experience transcends traditional performance. Rather than passive observation, participants enter an environment designed to heighten sensory awareness.

Mentalist Chen Ting (direct from Hong Kong) uses focused presence and subtle gestures to dissolve the boundaries of the real, guiding audiences into altered states where perception becomes malleable.

Sound Design: Japanese ambient musician Keigo Tanaka creates psychological soundscapes with real-time cymatic visuals translating frequencies into flowing geometric forms.

DJ Set: Waxwood provides an ambient continuation featuring field recordings and organic textures — a soft landing into stillness rather than an afterparty.

Architecture: The dome's design amplifies vibrations across 360-degree immersion, with sound and light integral to the experience itself.

Date: February 14, 2026 at 19:30
Location: Labyrinth Dome, Nuanu Creative City
Price: IDR 350,000 (includes entrance to Nuanu)`,
    ticketUrl: "https://megatix.co.id/events/invisible-magic",
  },
  {
    id: 3,
    title: "DRIPPIN: Tea Art & HipHop",
    description: "A Lunar New Year celebration blending ancient Chinese tea traditions with contemporary hip-hop culture by CulCha Collective. Tea ceremony, live performances, kung fu, and open dance.",
    image: "https://admin.cockpit.nuanu.com/assets/598db934-33de-4e3c-bc3d-7f2d6d663652.png",
    category: "music",
    date: "February 15",
    time: "19:30",
    likes: 176,
    author: "CulCha Collective",
    price: "IDR 350,000",
    rating: 4.9,
    reviews: 35,
    card_color: "#2d1b0e",
    location: "Labyrinth Dome, Nuanu Creative City",
    capacity: 200,
    registered: 142,
    fullDescription: `DRIPPIN: Tea Art & HipHop Performance by CulCha Collective

A Lunar New Year celebration blending ancient Chinese tea traditions with contemporary hip-hop culture.

What's Included:
• DJ sets and live performances
• Traditional Chinese tea ceremony with modern hip-hop fusion
• Tea lounge for comfort and conversation
• Open dance sessions
• Traditional Chinese dance and kung fu demonstrations

Featured Performers:
• CulCha Collective — healing artists, dancers, lyricists, singers
• Faye Jie — tea master, traditional Chinese dancer, Beijing Dance Academy graduate
• NRYN — beatmaker/DJ specializing in Qigong and tea ceremony music
• Cappy Franti — spiritual MC
• Roba Grow — DJ/producer, closing after-hours set

Date: February 15, 2026 at 19:30
Location: Labyrinth Dome, Nuanu Creative City
Price: IDR 350,000 (includes entrance to Nuanu)`,
    ticketUrl: "https://megatix.co.id/events/drippin",
  },
  {
    id: 4,
    title: "Ancient Sound Healing",
    description: "Gong bath and Tibetan bowl sound healing session by Roba Grow. A deeply restorative sonic journey within the Nuanu Lunar New Year celebration.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000",
    category: "wellness",
    date: "February 15",
    time: "16:00",
    likes: 134,
    author: "Roba Grow",
    price: "IDR 200,000",
    rating: 4.9,
    reviews: 28,
    card_color: "#3d5a3d",
    location: "Nuanu Creative City",
    fullDescription: `Ancient Sound Healing with Gong Bath and Tibetan Bowls by Roba Grow.

A deeply restorative sonic journey held during the Nuanu Lunar New Year celebration. Let the vibrations of ancient instruments guide you into a state of deep relaxation and inner peace.

Date: February 15, 2026 at 16:00
Location: Nuanu Creative City
Price: IDR 200,000 (includes entrance to Nuanu)`,
    ticketUrl: "https://megatix.co.id",
  },
  {
    id: 5,
    title: "Tea House Art Exhibition",
    description: "A curated art exhibition in the Labyrinth Art Gallery featuring works by local and international artists. Open daily during the Lunar New Year celebration.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000",
    category: "art",
    date: "February 14–17",
    time: "14:00",
    likes: 98,
    author: "Nuanu Events",
    price: "Included with entrance",
    rating: 4.7,
    reviews: 22,
    card_color: "#473656",
    location: "Labyrinth Art Gallery, Nuanu Creative City",
    fullDescription: `Tea House Art Exhibition at the Labyrinth Art Gallery.

A curated exhibition featuring works by local and international artists, open daily throughout the Lunar New Year celebration (February 14–17). Explore creative expressions over tea in an intimate gallery setting.

Included with Nuanu entrance ticket.`,
  },
];
