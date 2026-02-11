"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"

const TABS = [
  { key: "map", label: "Map" },
  { key: "tour", label: "3D Tour" },
]

export default function MapContent() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'map' | 'tour'>('map')

  const filters = [
    { id: "restaurants", label: "Restaurants" },
    { id: "hotels", label: "Hotels" },
    { id: "attractions", label: "Attractions" },
    { id: "events", label: "Events" },
  ]

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    )
  }

  return (
    <div className="min-h-screen h-screen w-full flex flex-col flex-1 overflow-hidden">
      {/* Tab selector */}
      <div className="flex justify-center pt-6 pb-2 bg-transparent">
        <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 shadow-sm">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'map' | 'tour')}
              className={`px-6 py-2 rounded-full font-medium transition-all text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                activeTab === tab.key
                  ? "bg-black text-white shadow-sm"
                  : "bg-transparent text-gray-700 dark:text-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 relative">
        {activeTab === 'map' ? (
          <>
            <iframe
              src="https://dreamy-churros-6cc5f3.netlify.app/"
              className="w-full h-full absolute inset-0"
              style={{ border: "none" }}
              loading="lazy"
              allowFullScreen
            />
            {/* Filter button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="absolute top-4 right-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow z-10"
            >
              <Filter className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
            {/* Filter panel */}
            <div
              className={`absolute top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-20 ${
                isFilterOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Filters
                  </h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
                <div className="space-y-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => toggleFilter(filter.id)}
                      className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                        activeFilters.includes(filter.id)
                          ? "bg-black text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
                {activeFilters.length > 0 && (
                  <button
                    onClick={() => setActiveFilters([])}
                    className="w-full mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <iframe
            src="https://tour.panoee.net/67f3c3bec8d77d4790780acb"
            className="w-full h-full absolute inset-0"
            style={{ border: "none" }}
            loading="lazy"
            allowFullScreen
            title="3D Tour"
          />
        )}
      </div>
    </div>
  )
}
