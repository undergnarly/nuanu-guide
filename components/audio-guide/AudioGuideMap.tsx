"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Navigation, 
  Compass, 
  ExternalLink,
  Share2,
  Download
} from 'lucide-react'

interface AudioGuideMapProps {
  coordinates: {
    lat: number
    lng: number
  }
  title: string
  category: string
}

export function AudioGuideMap({ coordinates, title, category }: AudioGuideMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [distance, setDistance] = useState<number | null>(null)

  // Получаем местоположение пользователя
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setUserLocation(userPos)
          
          // Вычисляем расстояние
          const dist = calculateDistance(
            userPos.lat, 
            userPos.lng, 
            coordinates.lat, 
            coordinates.lng
          )
          setDistance(dist)
        },
        (error) => {
          console.log('Geolocation error:', error)
        },
        { enableHighAccuracy: true, timeout: 10000 }
      )
    }
  }, [coordinates])

  // Функция для вычисления расстояния между двумя точками
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Радиус Земли в км
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}&travelmode=walking`
    window.open(url, '_blank')
  }

  const openInAppleMaps = () => {
    const url = `http://maps.apple.com/?daddr=${coordinates.lat},${coordinates.lng}&dirflg=w`
    window.open(url, '_blank')
  }

  const shareLocation = async () => {
    const shareData = {
      title: `Location: ${title}`,
      text: `Check out this location in Nuanu Creative City`,
      url: `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(shareData.url)
      alert('Location link copied to clipboard!')
    }
  }

  const categoryColors = {
    art: 'bg-neutral-100 text-neutral-800',
    history: 'bg-blue-100 text-blue-800',
    architecture: 'bg-green-100 text-green-800',
    nature: 'bg-emerald-100 text-emerald-800',
    culture: 'bg-orange-100 text-orange-800'
  }

  return (
    <div className="space-y-6">
      {/* Location Info */}
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-red-500" />
              <CardTitle className="text-lg">Location</CardTitle>
            </div>
            <Badge className={categoryColors[category as keyof typeof categoryColors]}>
              {category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-base mb-2">{title}</h3>
              <p className="text-sm text-gray-600">
                Nuanu Creative City, Bali, Indonesia
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>Lat: {coordinates.lat.toFixed(6)}</span>
                <span>Lng: {coordinates.lng.toFixed(6)}</span>
              </div>
            </div>
            
            {distance && (
              <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                <Compass className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  {distance < 1 
                    ? `${Math.round(distance * 1000)}m away` 
                    : `${distance.toFixed(1)}km away`
                  }
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map */}
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardContent className="p-0">
          <div className="relative h-80 rounded-lg overflow-hidden">
            {/* OpenStreetMap Embed */}
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng-0.01},${coordinates.lat-0.01},${coordinates.lng+0.01},${coordinates.lat+0.01}&layer=mapnik&marker=${coordinates.lat},${coordinates.lng}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapLoaded(true)}
              className="rounded-lg"
            />
            
            {/* Loading Overlay */}
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Loading map...</p>
                </div>
              </div>
            )}
            
            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={shareLocation}
                className="bg-white/90 hover:bg-white shadow-md"
                aria-label="Share location"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => window.open(`https://www.openstreetmap.org/?mlat=${coordinates.lat}&mlon=${coordinates.lng}#map=18/${coordinates.lat}/${coordinates.lng}`, '_blank')}
                className="bg-white/90 hover:bg-white shadow-md"
                aria-label="Open in full map"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Options */}
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Navigation className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg">Get Directions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              onClick={openInGoogleMaps}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Navigation className="h-4 w-4" />
              <span>Google Maps</span>
            </Button>
            
            <Button
              onClick={openInAppleMaps}
              className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white"
            >
              <Navigation className="h-4 w-4" />
              <span>Apple Maps</span>
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">How to get there:</p>
                <p>
                  The location is easily accessible by foot from the main entrance of Nuanu Creative City. 
                  Follow the main pathway and look for the directional signs.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nearby Objects */}
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Compass className="h-5 w-5 text-black dark:text-white" />
            <CardTitle className="text-lg">Nearby Audio Guides</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">

            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">Traditional Workshop</p>
                  <p className="text-xs text-gray-600">120m away</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                Visit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 