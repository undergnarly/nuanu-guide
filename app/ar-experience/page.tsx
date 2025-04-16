"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Info, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export default function ARExperiencePage() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="relative h-[calc(100vh-4rem)] bg-black">
      {/* AR Camera View (Simulated) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <Camera className="h-16 w-16 mx-auto mb-2 opacity-50" />
          <p className="opacity-70">AR camera view would be displayed here</p>
          <p className="text-sm opacity-50">Using AR.js, Three.js or a native AR solution</p>
        </div>
      </div>

      {/* AR Overlay Elements */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-2 border-purple-500 bg-purple-500/20 animate-pulse flex items-center justify-center">
            <Badge className="bg-purple-600">Interactive</Badge>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-purple-500"></div>
        </div>
      </div>

      <div className="absolute top-2/3 right-1/4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-blue-500 bg-blue-500/20 animate-pulse"></div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-blue-500"></div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-black/50 border-gray-600 text-white"
          onClick={() => window.history.back()}
        >
          <X className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-black/50 border-gray-600 text-white"
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>

      {/* Info Sheet */}
      <Sheet open={showInfo} onOpenChange={setShowInfo}>
        <SheetContent side="bottom" className="rounded-t-xl h-2/3">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
          </div>
          <SheetHeader>
            <SheetTitle>Interactive Murals</SheetTitle>
            <SheetDescription>Discover the stories behind Nuanu's street art</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <p className="text-sm">
              Point your camera at the murals marked on the map to see them come to life with animation and sound. Learn
              about the artists and the inspiration behind each piece.
            </p>

            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/images/ar-murals.png"
                  alt="Mural 1"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/images/street-art.png"
                  alt="Mural 2"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/images/ar-future.png"
                  alt="Mural 3"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <Card>
              <CardContent className="p-3">
                <h3 className="text-sm font-medium mb-1">How to use:</h3>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Find murals marked on the map</li>
                  <li>Point your camera at the mural</li>
                  <li>Wait for the AR content to appear</li>
                  <li>Tap on interactive elements to learn more</li>
                </ol>
              </CardContent>
            </Card>

            <Button className="w-full" onClick={() => setShowInfo(false)}>
              Continue Experience
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
