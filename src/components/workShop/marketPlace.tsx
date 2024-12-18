"use client"

import React, { useState } from 'react'
import SearchSvg from '../btn/searchSvg'
import TagSvg from '../btn/tagSvg'

// This would typically come from an API or database
const items = [
  { id: 1, name: "Professional Camera", price: 999.99, type: "sale", image: "/placeholder.svg", description: "High-quality DSLR camera with 24MP sensor, 4K video capability, and a versatile 18-135mm lens. Perfect for both photography enthusiasts and professionals." },
  { id: 2, name: "Laptop", price: 89.99, type: "lease", image: "/placeholder.svg", description: "Powerful 15-inch laptop with Intel i7 processor, 16GB RAM, and 512GB SSD. Ideal for business professionals or students needing a reliable machine for daily use." },
  { id: 3, name: "Smartphone", price: 599.99, type: "sale", image: "/placeholder.svg", description: "Latest model smartphone featuring a 6.5-inch OLED display, 5G capability, triple-lens camera system, and all-day battery life. Stay connected and capture life's moments in stunning detail." },
  { id: 4, name: "Drone", price: 49.99, type: "lease", image: "/placeholder.svg", description: "Professional-grade drone with 4K camera, 30-minute flight time, and advanced obstacle avoidance. Perfect for aerial photography, videography, or surveying projects." },
  { id: 5, name: "Smartwatch", price: 199.99, type: "sale", image: "/placeholder.svg", description: "Feature-packed smartwatch with heart rate monitoring, GPS, sleep tracking, and a vibrant always-on display. Stay connected and monitor your health with style." },
  { id: 6, name: "VR Headset", price: 29.99, type: "lease", image: "/placeholder.svg", description: "Immersive virtual reality headset with high-resolution displays, precise motion tracking, and comfortable ergonomics. Experience games, movies, and virtual tours like never before." },
]

export default function Component() {
  const [filter, setFilter] = useState<'all' | 'sale' | 'lease'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = items.filter(item => 
    (filter === 'all' || item.type === filter) &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Vendor Marketplace</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by</label>
          <select
            id="filter"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            onChange={(e) => setFilter(e.target.value as 'all' | 'sale' | 'lease')}
          >
            <option value="all">All Items</option>
            <option value="sale">For Sale</option>
            <option value="lease">For Lease</option>
          </select>
        </div>
        <div className="w-full md:w-2/3 relative">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search items</label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchSvg/>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-0">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.type === 'sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {item.type === 'sale' ? 'For Sale' : 'For Lease'}
                </span>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <TagSvg/>
                ${item.price.toFixed(2)} {item.type === 'lease' && '/ day'}
              </div>
              <p className="mt-3 text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No items found. Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  )
}