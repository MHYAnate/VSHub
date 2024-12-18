"use client"

import React, { useState, useEffect } from 'react'
import TermsHeader from '@/components/termsOfService/termsHeader'
import TermsNav from '@/components/termsOfService/termsNav'
import TermsIntro from '@/components/termsOfService/termsIntro'
import TermsUseOfService from '@/components/termsOfService/termsUseOfService'
import TermsChanges from '@/components/termsOfService/termsChanges'
import TermsFooter from '@/components/termsOfService/termsFooter'


export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState('introduction')


  return (
    <div className="min-h-screen bg-white text-black">

      <TermsHeader/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden transition-shadow duration-300 hover:shadow-3xl">
          <div className="md:flex">
            <aside className="md:w-1/3 bg-gray-50 p-6">

             <TermsNav setActiveSection={setActiveSection} activeSection={activeSection} />

            </aside>
            <div className="md:w-2/3 p-8">
              <div className="prose max-w-none">
                {activeSection === 'introduction' && (

                  <TermsIntro/>

                )}

                {activeSection === 'use-of-service' && (

                  <TermsUseOfService/>

                )}

                {/* Add similar sections for other content... */}

                {activeSection === 'changes' && (

                  <TermsChanges/>

                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 mt-12">

        <TermsFooter/>
        
      </footer>
    </div>
  )
}