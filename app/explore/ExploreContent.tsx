"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Headphones, Smartphone, Star } from "lucide-react"

const experiences = [
  {
    id: 1,
    title: "Creative Workshop",
    description: "Interactive design experience with local artists",
    duration: "15 min",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600",
    hasAR: false,
    popular: true,
    isNew: false,
  },
  {
    id: 2,
    title: "Modern Art Exhibition",
    description: "Explore contemporary art installations",
    duration: "25 min",
    image: "https://images.unsplash.com/photo-1561488111-5d800fd56b8a?q=80&w=600",
    hasAR: true,
    popular: true,
    isNew: false,
  },
  {
    id: 3,
    title: "Digital Art Festival",
    description: "Immersive digital art experiences",
    duration: "30 min",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600",
    hasAR: true,
    popular: false,
    isNew: true,
  },
  {
    id: 4,
    title: "Street Art Tour",
    description: "Discover urban art throughout the city",
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600",
    hasAR: false,
    popular: false,
    isNew: true,
  },
  {
    id: 5,
    title: "Music in the Park",
    description: "Audio guide to musical performances",
    duration: "20 min",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=600",
    hasAR: false,
    popular: true,
    isNew: false,
  },
]

function ExperienceCard({ experience }: { experience: typeof experiences[0] }) {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <div className="flex">
        <div className="relative w-1/3 h-32">
          <Image src={experience.image || "/placeholder.svg"} alt={experience.title} fill className="object-cover" />
          {experience.popular && (
            <Badge className="absolute top-2 left-2 bg-amber-500">
              <Star className="w-3 h-3 mr-1 fill-current" /> 4.9
            </Badge>
          )}
          {experience.isNew && <Badge className="absolute top-2 left-2 bg-green-500">New</Badge>}
        </div>
        <CardContent className="flex-1 p-3">
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-start justify-between">
                <h3 className="font-semibold">{experience.title}</h3>
                {experience.hasAR && (
                  <Badge variant="outline" className="ml-2">
                    <Smartphone className="w-3 h-3 mr-1" /> AR
                  </Badge>
                )}
                {!experience.hasAR && (
                  <Badge variant="outline" className="ml-2">
                    <Headphones className="w-3 h-3 mr-1" /> Audio
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{experience.description}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium text-black dark:text-white">
                {experience.duration} experience
              </span>
              <Button size="sm" className="h-8">
                Start
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default function ExploreContent() {
  return (
    <div className="container p-4 pb-24">
      <h1 className="text-2xl font-bold mb-4">Explore Nuanu</h1>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="ar">AR</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-4">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="mt-0">
          <div className="grid gap-4">
            {experiences
              .filter((exp) => exp.popular)
              .map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="new" className="mt-0">
          <div className="grid gap-4">
            {experiences
              .filter((exp) => exp.isNew)
              .map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="ar" className="mt-0">
          <div className="grid gap-4">
            {experiences
              .filter((exp) => exp.hasAR)
              .map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
