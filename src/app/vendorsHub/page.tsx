"use client"
import React from 'react'
import FilterVendorComponent from '@/components/filters/filterVendors'
import NavComponent from '@/components/nav/navComponent';
import TermsAndPolicies from '@/components/workShop/termAndPolicies'



export default function VendorList() {
	
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      
      <header className="px-6 py-4 bg-transparent">

        <NavComponent />

      </header>

      <main className="flex-1 py-12">

        <div className="container mx-auto px-6">

          <FilterVendorComponent />

        </div>

      </main>

      <footer className="bg-white border-t border-gray-200">
  
        <TermsAndPolicies/>

      </footer>
    </div>
  )
}