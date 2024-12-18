"use client"

import React from 'react'
import Image from "next/image"
import { Services } from "@/database/data"
import { useState, useCallback, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const ServicesComponent: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([])

  const set = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const toggleMdCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  useEffect(() => {
    if (expandedCategory !== null) {
      categoryRefs.current[expandedCategory]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [expandedCategory])

  return (
    <div className="container mx-auto px-6 py-16 bg-white">
      <h2 className="text-4xl font-bold text-center mb-16 text-black relative inline-block left-1/2 transform -translate-x-1/2">
        Our Services
        <span className="absolute bottom-0 left-0 w-full h-1 bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {Services.map((category, index) => (
          <div
            key={category.id}
            ref={(el: HTMLDivElement | null) => {
              if (el) categoryRefs.current[index] = el;
            }}
            className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
          >
            <div className="relative overflow-hidden group">
              <Image
                src={category.src}
                alt={`${category.category} category`}
                width={400}
                height={200}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-semibold text-white">
                  {category.category}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <button
                onClick={() => toggleMdCategory(category.id)}
                className="w-full py-3 px-6 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                {expandedCategory === category.id
                  ? "Hide Services"
                  : "Show Services"}
              </button>
              {expandedCategory === category.id && (
                <div className="mt-8 grid grid-cols-2 gap-6">
                  {category.services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() =>
                        router.push(
                          `/vendorsHub?${set("name", service.name)}&${set(
                            "isrc",
                            service.src
                          )}&${set("CatName", category.category)}`
                        )
                      }
                      onMouseEnter={() => setHoveredService(service.id)}
                      onMouseLeave={() => setHoveredService(null)}
                      className="relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 shadow-md hover:scale-105"
                    >
                      <Image
                        src={service.src}
                        alt={`${service.name} service`}
                        width={200}
                        height={200}
                        className="w-full h-32 object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300 ${
                          hoveredService === service.id
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <p className="text-white text-center font-medium px-2">
                          {service.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

ServicesComponent.displayName = "ServicesComponent"
export default ServicesComponent