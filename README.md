# Nuanu Experience

Interactive booking and audio guide application for Nuanu Creative City built with Next.js 15.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/undergnarly/nuanu-guide.git
cd nuanu-guide
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 🏗️ Project Structure

```
nuanu-guide/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Main booking page
│   ├── audio-guide/         # Audio guide routes
│   └── layout.tsx           # Root layout
├── components/
│   ├── sections/            # Page sections
│   │   ├── GuidesSection.tsx      # Booking flow
│   │   ├── AudioGuideSection.tsx  # Audio guides
│   │   └── HomeSection.tsx        # Home page
│   ├── audio-guide/         # Audio guide components
│   └── ui/                  # Reusable UI components
├── lib/                     # Utilities and types
├── public/
│   ├── audio/              # Audio guide MP3 files
│   ├── video/              # Booking flow videos
│   └── images/             # Static images
└── styles/                 # Global styles
```

## 🎨 Features

### Booking Flow
- **Multi-category selection**: Experiences, Accommodation, Food Venues
- **Date picker**: Book for now or select future date
- **People counter**: 1-10+ guests
- **WhatsApp integration**: Direct booking via WhatsApp
- **Multi-language**: English, Russian, Indonesian
- **Auto language detection**: Detects browser language

### Audio Guides
- **Interactive audio tours**: 5+ locations with professional narration
- **Video integration**: YouTube and local video support
- **Accessibility features**: Speed control, auto-play
- **QR code generation**: Share guides easily
- **Map integration**: View locations on map

## 🌐 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/undergnarly/nuanu-guide)

1. Push code to GitHub
2. Import project to Vercel
3. Deploy automatically

### Netlify

1. Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

2. Deploy via Netlify CLI or UI

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## 🎯 Environment Variables

No environment variables required for basic setup.

Optional:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=6285235948856  # WhatsApp booking number
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **React**: 19
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives
- **TypeScript**: 5

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎬 Video & Audio Assets

### Video Files (public/video/)
- `accommodation.mp4` - 1.9MB
- `experiences.mp4` - 2.0MB
- `food.mp4` - 3.4MB
- All videos optimized with H.264 codec

### Audio Guides (public/audio/guides/)
- 5 location audio tours in MP3 format
- Multi-language support (EN, RU, ID)

## 🎨 Customization

### Theme Colors

Edit `app/globals.css`:
```css
:root {
  --nuanu-dark: 171 19% 14%;      /* #1d2b29 */
  --nuanu-bg: 38 33% 96%;         /* #f9f6f1 */
  --nuanu-form: 36 38% 92%;       /* #F2ECE3 */
}
```

### WhatsApp Number

Update in `components/sections/GuidesSection.tsx` line 354:
```typescript
const whatsappUrl = `https://wa.me/YOUR_NUMBER?text=${encodeURIComponent(message)}`
```

## 📊 Performance

- **Bundle size**: ~100KB (gzipped)
- **First load JS**: ~176KB
- **Lighthouse score**: 95+
- **Video/Audio lazy loading**: Optimized for mobile

## 🤝 Contributing

This is a private project. For issues or suggestions, contact the development team.

## 📄 License

Proprietary - © 2024 Nuanu Creative City

## 🔗 Links

- **Website**: [nuanu.com](https://nuanu.com)
- **GitHub**: [github.com/undergnarly/nuanu-guide](https://github.com/undergnarly/nuanu-guide)

## 📞 Support

For technical support or questions:
- WhatsApp: +62 852-3594-8856
- Email: info@nuanu.com

---

Built with ❤️ by the Nuanu team
