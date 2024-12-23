"use client"
import React,{useState} from 'react'
import FilterVendorComponent from '@/components/filters/filterVendors'
import NavComponent from '@/components/nav/navComponent';
import TermsAndPolicies from '@/components/workShop/termAndPolicies'
import { Suspense } from "react";
import LoadingSvg from '@/components/loading/loadingSvg';



export default function VendorList() {

  const [a, setA] = useState("")
	
  return (
    <Suspense fallback={<LoadingSvg/>}>
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      
      <header className="px-6 py-4 bg-transparent">

        <NavComponent setQNav={setA} qNav={a} />

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
    </Suspense>
  )
}