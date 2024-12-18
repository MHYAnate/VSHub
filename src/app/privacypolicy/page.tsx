"use client"

import React, { useState, useEffect } from 'react'
import PrivacyHeader from '@/components/privacyPolicy/privacyHeader'
import PrivacyNav from '@/components/privacyPolicy/privacyNav'
import PrivacyIntroduction from '@/components/privacyPolicy/privacyIntro'
import PrivacyInfoCollection from '@/components/privacyPolicy/privacyInfoCollection'
import PrivacyContactUs from '@/components/privacyPolicy/privacyContactUs'
import PrivacyFooter from '@/components/privacyPolicy/privacyFooter'

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('introduction')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">

      <header className={`sticky top-0 z-10 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>

        <PrivacyHeader/>

      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transition-shadow duration-300 hover:shadow-3xl">
          <div className="md:flex">
            <aside className="md:w-1/4 bg-gray-50 p-6">

              <PrivacyNav setActiveSection={setActiveSection} activeSection={activeSection} />

            </aside>
            <div className="md:w-3/4 p-8">
              <div className="prose max-w-none">

                {activeSection === 'introduction' && (

                  <PrivacyIntroduction/>

                )}

                {activeSection === 'information-collection' && ( 

                  <PrivacyInfoCollection/>

                )}

                {/* Add similar sections for other content... */}

                {activeSection === 'contact-us' && (

                  <PrivacyContactUs/>

                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 mt-12">

        <PrivacyFooter/>

      </footer>
    </div>
  )
}