"use client"

import React, { useState, useCallback } from "react"
import Image from "next/image"
import { Services } from "@/database/data"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

const ServicesBComponent: React.FC = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  const set = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const toggleCategory = (categoryId: number) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId)
  }

  return (
    <div className={pathname === "/"?"container mx-auto px-6 py-16 bg-white":"container mx-auto px-6 py-6 bg-white" }>
      <h2 className={pathname === "/"?"text-4xl font-bold text-left mb-6 text-black relative inline-block left-1/2 transform -translate-x-1/2":"text-4xl font-bold text-center mb-16 text-black relative inline-block left-1/2 transform -translate-x-1/2" }>
        {pathname === "/"?"Our Services":"VendorsHub"}
        <span className="absolute bottom-0 left-0 w-full h-1 bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
        {Services.map((category) => (
          <div
            key={category.id}
            className={`bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 ${
              selectedCategory === category.id
                ? "ring-2 ring-black"
                : ""
            }`}
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
                onClick={() => toggleCategory(category.id)}
                className={`w-full py-3 px-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                  selectedCategory === category.id
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
              >
                {selectedCategory === category.id
                  ? "Hide Services"
                  : "Show Services"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div className="mt-16 animate-fade-in">
          <h3 className="text-3xl font-bold mb-8 text-black">
            {Services.find((cat) => cat.id === selectedCategory)?.category}{" "}
            Services
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Services.find((cat) => cat.id === selectedCategory)?.services.map(
              (service) => (
                <div
                  key={service.id}
                  onClick={() =>
                    router.push(
                      `/vendorsHub?${set("name", service.name)}&${set(
                        "isrc",
                        service.src
                      )}&${set(
                        "CatName",
                        Services.find((cat) => cat.id === selectedCategory)?.category || ""
                      )}`
                    )
                  }
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 shadow-md hover:scale-105 hover:shadow-xl"
                >
                  <Image
                    src={service.src}
                    alt={`${service.name} service`}
                    width={200}
                    height={200}
                    className="w-full h-40 object-cover"
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
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}

ServicesBComponent.displayName = "ServicesBComponent"
export default ServicesBComponent