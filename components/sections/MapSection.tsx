"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"

const TABS = [
  { key: "map", label: "Карта" },
  { key: "tour", label: "3D тур" },
]

export default function MapSection() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'map' | 'tour'>('map')

  const filters = [
    { id: "restaurants", label: "Рестораны" },
    { id: "hotels", label: "Отели" },
    { id: "attractions", label: "Достопримечательности" },
    { id: "events", label: "Мероприятия" },
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
      <div className="flex-1 relative">
        {/* Плавающий селектор табов */}
        <div className="absolute top-6 left-1/2 z-20 -translate-x-1/2">
          <div className="inline-flex bg-white/90 dark:bg-gray-900/90 rounded-full p-1 shadow-lg backdrop-blur-md">
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
        {activeTab === 'map' ? (
          <>
            <iframe
              src="https://dreamy-churros-6cc5f3.netlify.app/"
              className="w-full h-full absolute inset-0"
              style={{ border: "none" }}
              loading="lazy"
              allowFullScreen
            />
            {/* Кнопка фильтров */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="absolute top-4 right-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow z-30"
            >
              <Filter className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
            {/* Панель фильтров */}
            <div
              className={`absolute top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
                isFilterOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Фильтры
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
                          ? "bg-purple-500 text-white"
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
                    Сбросить фильтры
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