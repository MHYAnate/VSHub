"use client"

import React, { useState, useEffect } from 'react'
import HeroCarousel from "./heroCarousel"
import { useRouter } from "next/navigation"

interface State {
  setQNav: (value: string) => void
  qNav: string
}

export default function HeroComponent({ setQNav, qNav }: State) {
  const [isVisible, setIsVisible] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center py-20 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-80"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter">
              Find Expert Services,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-100 animate-gradient">
                AnyTime-AnyWhere.
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
             {`Connect with skilled professionals for all your needs. From automotive to home maintenance, we've got you covered.`} 
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
              onClick={()=> router.push(`/register`)}
                type="button"
                className="group relative px-8 py-4 bg-white text-black rounded-full text-lg font-bold text-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 overflow-hidden"
              >
                <span className="relative z-10">Register Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
              </button>
              <button
               onClick={()=> router.push(`/login`)}
                type="button"
                className="group relative px-8 py-4 bg-transparent text-white rounded-full text-lg font-bold text-center transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 overflow-hidden"
              >
                <span className="relative z-10">Log In</span>
                <span className="absolute inset-0 border-2 border-white rounded-full hover:border-amber-600"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
              </button>
            </div>
          </div>
          <div className={`relative transition-all duration-1000 ease-out delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <HeroCarousel setQNav={setQNav} qNav={qNav} />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  )
}

