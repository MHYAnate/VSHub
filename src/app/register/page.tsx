"use client"

import RegComponent from '@/components/register/client'
import VendorRegComponent from '@/components/register/vendor'
import React, { useState } from 'react'
import Link from 'next/link'

export default function RegisterLanding() {
  const [activeTab, setActiveTab] = useState('vendor')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="text-center p-6 border-b">
          <h1 className="text-3xl font-bold text-gray-900">Join VsHub Today</h1>
          <p className="text-gray-600 mt-2">Choose how you want to be part of our community</p>
        </div>
        <div className="p-6">
          <div className="flex mb-8">
            <button
              onClick={() => setActiveTab('vendor')}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'vendor'
                  ? 'bg-gradient-to-br from-gray-900 to-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } transition-colors duration-200 ease-in-out rounded-l-lg`}
            >
              <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Vendor
            </button>
            <button
              onClick={() => setActiveTab('client')}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'client'
                  ? 'bg-gradient-to-br from-gray-900 to-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } transition-colors duration-200 ease-in-out rounded-r-lg`}
            >
              <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Client
            </button>
          </div>
          {activeTab === 'vendor' && (

            <VendorRegComponent/>

          )}
          {activeTab === 'client' && (

            <RegComponent/>

          )}
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  )
}