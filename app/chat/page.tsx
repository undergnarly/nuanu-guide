"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Bot, Send, Image as ImageIcon } from "lucide-react"
import Image from "next/image"

const communityMessages = [
  {
    id: 1,
    author: "Anna",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100",
    message: "Hi everyone! Has anyone attended the pottery master class? Is it worth going?",
    time: "14:30",
    likes: 3,
  },
  {
    id: 2,
    author: "Michael",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
    message: "Yes, I went last week! It was awesome, the teacher is great. Got my first vase 😊",
    time: "14:35",
    likes: 5,
    image: "https://images.unsplash.com/photo-1532570204726-d10d25a9ce47?q=80&w=300",
  },
  {
    id: 3,
    author: "Elena",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    message: "Joining the question! I also want to sign up for the next one.",
    time: "14:40",
    likes: 2,
  },
  {
    id: 4,
    author: "Nuanu Team",
    avatar: "/logo.png",
    message: "Friends, the next master class will be held on March 30. Hurry up to sign up, only 5 spots left!",
    time: "14:42",
    likes: 8,
  },
]

const aiStartMessage = {
  id: 0,
  message: "Hello! I'm Nuanu AI, your personal assistant. I can help you find interesting events, book places, and answer your questions about activities. What are you interested in?",
  time: "14:00"
}

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<"ai" | "community">("ai")
  const [message, setMessage] = useState("")
  const [userMessages, setUserMessages] = useState<{id: number, message: string, time: string}[]>([])

  const handleSend = () => {
    if (!message.trim()) return;
    setUserMessages((msgs) => [
      ...msgs,
      { id: Date.now(), message, time: new Date().toLocaleTimeString().slice(0,5) }
    ])
    setMessage("")
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="chat-page"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="min-h-screen pb-16 bg-gray-50 dark:bg-gray-900 flex flex-col"
      >
        {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-center gap-2 p-4">
          <button
            onClick={() => setActiveTab("ai")}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              activeTab === "ai"
                  ? "bg-black text-white shadow-sm"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            <Bot className="w-4 h-4" />
            Nuanu AI
          </button>
          <button
            onClick={() => setActiveTab("community")}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              activeTab === "community"
                  ? "bg-black text-white shadow-sm"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            <User className="w-4 h-4" />
            Community
          </button>
        </div>
      </div>

        {/* Chat */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence mode="wait">
          {activeTab === "ai" ? (
            <motion.div
                initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
              className="space-y-4"
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none p-4 shadow-sm">
                  <p className="text-gray-900 dark:text-gray-100">{aiStartMessage.message}</p>
                  <span className="text-xs text-gray-500 mt-2 block">{aiStartMessage.time}</span>
                </div>
              </div>
                {/* User messages */}
                {userMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-3 justify-end">
                    <div className="flex-1 bg-neutral-100 dark:bg-neutral-900 rounded-2xl rounded-tr-none p-4 shadow-sm max-w-xs">
                      <p className="text-gray-900 dark:text-gray-100">{msg.message}</p>
                      <span className="text-xs text-gray-500 mt-2 block text-right">{msg.time}</span>
                    </div>
                  </div>
                ))}
            </motion.div>
          ) : (
            <motion.div
                initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
              className="space-y-4"
            >
              {communityMessages.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={msg.avatar}
                      alt={msg.author}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900 dark:text-gray-100">{msg.author}</span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-gray-900 dark:text-gray-100">{msg.message}</p>
                      {msg.image && (
                        <div className="mt-3 rounded-xl overflow-hidden">
                          <Image
                            src={msg.image}
                            alt="Attached image"
                            width={300}
                            height={200}
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="text-sm text-gray-500 hover:text-black transition-colors">
                          Like ({msg.likes})
                      </button>
                        <button className="text-sm text-gray-500 hover:text-black transition-colors">
                          Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

        {/* Input message */}
        <div className="fixed left-0 right-0 bottom-24 z-50 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
            <button className="p-3 rounded-full bg-white dark:bg-gray-800 text-black hover:text-neutral-800 transition-colors">
            <ImageIcon className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder={activeTab === "ai" ? "Ask Nuanu AI a question..." : "Write a message..."}
            className="flex-1 bg-white dark:bg-gray-800 rounded-full px-4 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
            <button className="p-3 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors" onClick={handleSend}>
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
      </motion.div>
    </AnimatePresence>
  )
} 