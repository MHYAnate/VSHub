"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Cards } from "@/database/carouselData"

interface State {
  setQNav: (value: string) => void
  qNav: string
}

export default function HeroCarousel({ setQNav, qNav }: State) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Cards.length)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }, [isTransitioning])

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000)
    return () => clearInterval(intervalId)
  }, [nextSlide])

  const handleNavigation = (card: typeof Cards[0]) => {
    if (card.type === "category") {
      setQNav(qNav === "service" ? "" : "service")
    } else {
      switch (card.cta) {
        case "Contact Us":
          router.push(`/helpCenter`)
          break
        case "Start Promoting":
        case "Start Exploring":
          router.push(`/ads`)
          break
        case "Register Now":
          router.push(`/register`)
          break
      }
    }
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black py-16 rounded-2xl shadow-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-[400px]">
          {Cards.map((card, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out transform ${
                index === currentIndex
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full"
              }`}
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden flex h-full">
                <div className="relative w-3/5 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent"></div>
                </div>
                <div className="w-2/5 py-8 px-2 md:px-10 flex flex-col justify-between bg-gradient-to-l from-gray-800 to-gray-900">
                  <div>
                    <div
                      className={`capitalize tracking-wide text-sm font-semibold mb-2 ${
                        card.type === "category"
                          ? "text-blue-400"
                          : card.type === "ad"
                          ? "text-green-400"
                          : "text-purple-400"
                      }`}
                    >
                      {card.type === "category"
                        ? "Category"
                        : card.type === "ad"
                        ? "Advertisement"
                        : "VsHub Benefit"}
                    </div>
                    <h2 className="text-2xl leading-tight font-bold text-white mb-4">
                      {card.title}
                    </h2>
                    <p className="text-gray-300">{card.description}</p>
                  </div>
                  <button
                    onClick={() => handleNavigation(card)}
                    className={`mt-6 text-center py-1 px-2 border-2 text-sm font-medium rounded-full text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                      card.type === "category"
                        ? "border-blue-400 hover:bg-blue-400"
                        : card.type === "ad"
                        ? "border-green-400 hover:bg-green-400"
                        : "border-purple-400 hover:bg-purple-400"
                    }`}
                  >
                    {card.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
          {Cards.map((_, index) => (
            <button
              key={index}
              onClick={() => !isTransitioning && setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}