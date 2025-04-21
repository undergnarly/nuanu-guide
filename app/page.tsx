"use client"

import { useState } from "react"
import HomeSection from "@/components/sections/HomeSection"
import EventsSection from "@/components/sections/EventsSection"
import GuidesSection from "@/components/sections/GuidesSection"
import ChatSection from "@/components/sections/ChatSection"
import MapSection from "@/components/sections/MapSection"
import BottomNavigation from "@/components/bottom-navigation"

const NAV = [
  { key: "home", label: "Home" },
  { key: "events", label: "Events" },
  { key: "guides", label: "Guides" },
  { key: "chat", label: "Chat" },
  { key: "map", label: "Map" },
]

export default function AppSPA() {
  const [active, setActive] = useState("home")

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {active === "home" && <HomeSection />}
        {active === "events" && <EventsSection />}
        {active === "guides" && <GuidesSection />}
        {active === "chat" && <ChatSection />}
        {active === "map" && <MapSection />}
      </div>
      <BottomNavigation active={active} onNavigate={setActive} />
    </div>
  )
}
