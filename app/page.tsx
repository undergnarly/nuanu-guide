import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Calendar, Headphones, Smartphone, Compass } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="container p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-serif font-bold">
          Nuanu
        </h1>
        <ThemeToggle />
      </div>
      
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[40vh] w-full">
          <Image
            src="/images/nuanu-hero.png"
            alt="Nuanu Creative City"
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <h1 className="text-4xl font-serif font-bold">Nuanu Creative City</h1>
            <p className="mt-2 text-lg font-sans font-light">Where Art, Technology & Nature Converge</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 p-4 -mt-6 bg-white dark:bg-gray-950 rounded-t-3xl">
          <Link href="/map" className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 mb-1 rounded-full bg-purple-100 dark:bg-purple-900/20">
              <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-xs font-medium text-center">Map</span>
          </Link>
          <Link href="/explore" className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 mb-1 rounded-full bg-blue-100 dark:bg-blue-900/20">
              <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs font-medium text-center">Explore</span>
          </Link>
          <Link href="/events" className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 mb-1 rounded-full bg-pink-100 dark:bg-pink-900/20">
              <Calendar className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            </div>
            <span className="text-xs font-medium text-center">Events</span>
          </Link>
          <Link href="/guides" className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 mb-1 rounded-full bg-amber-100 dark:bg-amber-900/20">
              <Headphones className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-xs font-medium text-center">Audio</span>
          </Link>
        </div>

        {/* Featured Experiences */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-serif font-bold">Featured Experiences</h2>
            <Link href="/explore" className="text-sm text-purple-600 dark:text-purple-400 flex items-center font-medium">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid gap-4">
            <Card className="overflow-hidden border-none shadow-md">
              <div className="relative h-40">
                <Image src="/images/art-exhibition.png" alt="Art Exhibition" fill className="object-cover" />
                <Badge className="absolute top-2 right-2 bg-purple-500">Featured</Badge>
              </div>
              <CardContent className="p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif font-semibold">Contemporary Art Gallery</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Interactive installations & digital art</p>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    <Smartphone className="w-3 h-3 mr-1" /> AR
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md">
              <div className="relative h-40">
                <Image src="/images/design-workshop.png" alt="Design Workshop" fill className="object-cover" />
              </div>
              <CardContent className="p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif font-semibold">Innovation Hub</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Creative technology workshops</p>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    <Headphones className="w-3 h-3 mr-1" /> Audio
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-serif font-bold">Upcoming Events</h2>
            <Link href="/events" className="text-sm text-purple-600 dark:text-purple-400 flex items-center font-medium">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-3">
            <Card className="overflow-hidden border-none shadow-sm">
              <CardContent className="p-3 flex">
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 mr-3 rounded-lg bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                  <span className="text-sm font-bold">24</span>
                  <span className="text-xs">APR</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-semibold">Digital Art Festival</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Main Square, 6:00 PM</p>
                </div>
                <Button variant="ghost" size="icon" className="ml-2">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-sm">
              <CardContent className="p-3 flex">
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 mr-3 rounded-lg bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400">
                  <span className="text-sm font-bold">26</span>
                  <span className="text-xs">APR</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-semibold">Creative Tech Meetup</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Innovation Hub, 7:30 PM</p>
                </div>
                <Button variant="ghost" size="icon" className="ml-2">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
