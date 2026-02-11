"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Bot, Send, Image as ImageIcon, Loader2 } from "lucide-react"
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
    message: "Yes, I went last week! It was awesome, the teacher is great. Got my first vase",
    time: "14:35",
    likes: 5,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=300",
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
    avatar: "/nuanu_logo.png",
    message: "Friends, the next master class will be held on March 30. Hurry up to sign up, only 5 spots left!",
    time: "14:42",
    likes: 8,
  },
]

type ChatMessage = {
  id: number
  role: "user" | "assistant"
  content: string
  time: string
}

export default function ChatContent() {
  const [activeTab, setActiveTab] = useState<"ai" | "community">("ai")
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "assistant",
      content: "Hello! I'm Nuanu AI, your personal guide to Nuanu Creative City. I can help you discover experiences, find places, learn about events, or answer any questions about Nuanu. What are you interested in?",
      time: new Date().toLocaleTimeString().slice(0, 5),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString().slice(0, 5),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const apiMessages = [...messages, userMessage]
        .filter((m) => m.id !== 0 || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.content }))

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      })

      const data = await res.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.reply,
        time: new Date().toLocaleTimeString().slice(0, 5),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
        time: new Date().toLocaleTimeString().slice(0, 5),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen pb-16 bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-center gap-2 p-4">
          <button
            onClick={() => setActiveTab("ai")}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-base font-medium transition-all gap-1.5 ${
              activeTab === "ai"
                ? "bg-black text-white shadow-sm"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            <Bot className="w-4 h-4" />
            Nuanu AI
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-base font-medium transition-all gap-1.5 ${
              activeTab === "community"
                ? "bg-black text-white shadow-sm"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
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
              key="ai"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                      msg.role === "user"
                        ? "bg-black text-white rounded-tr-none"
                        : "bg-white dark:bg-gray-800 rounded-tl-none"
                    }`}
                  >
                    <p className={`whitespace-pre-wrap text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "text-white"
                        : "text-gray-900 dark:text-gray-100"
                    }`}>
                      {msg.content}
                    </p>
                    <span className={`text-xs mt-2 block ${
                      msg.role === "user"
                        ? "text-white/60 text-right"
                        : "text-gray-400"
                    }`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none p-4 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </motion.div>
          ) : (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
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
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {msg.author}
                        </span>
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

      {/* Input */}
      <div className="fixed left-0 right-0 bottom-24 z-50 bg-background border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder={
              activeTab === "ai"
                ? "Ask about Nuanu..."
                : "Write a message..."
            }
            disabled={isLoading && activeTab === "ai"}
            className="flex-1 bg-white dark:bg-gray-800 rounded-full px-4 py-2.5 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
          />
          <button
            className="p-3 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors disabled:opacity-50"
            onClick={handleSend}
            disabled={isLoading && activeTab === "ai"}
          >
            {isLoading && activeTab === "ai" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
