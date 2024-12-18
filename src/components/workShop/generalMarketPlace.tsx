"use client"

import React, { useState, useMemo } from 'react'
import TagSvg from '../btn/tagSvg'
import Image from 'next/image'


// This would typically come from an API or database
const items = [
  { id: 1, name: "Professional Camera", price: 999.99, type: "sale", image: "/placeholder.svg", description: "High-quality DSLR camera with 24MP sensor, 4K video capability, and a versatile 18-135mm lens.", state: "California", area: "Los Angeles" },
  { id: 2, name: "Laptop", price: 89.99, type: "lease", image: "/placeholder.svg", description: "Powerful 15-inch laptop with Intel i7 processor, 16GB RAM, and 512GB SSD.", state: "New York", area: "Manhattan" },
  { id: 3, name: "Smartphone", price: 599.99, type: "sale", image: "/placeholder.svg", description: "Latest model smartphone featuring a 6.5-inch OLED display, 5G capability, and triple-lens camera system.", state: "Texas", area: "Austin" },
  { id: 4, name: "Drone", price: 49.99, type: "lease", image: "/placeholder.svg", description: "Professional-grade drone with 4K camera, 30-minute flight time, and advanced obstacle avoidance.", state: "California", area: "San Francisco" },
  { id: 5, name: "Smartwatch", price: 199.99, type: "sale", image: "/placeholder.svg", description: "Feature-packed smartwatch with heart rate monitoring, GPS, sleep tracking, and a vibrant always-on display.", state: "New York", area: "Brooklyn" },
  { id: 6, name: "VR Headset", price: 29.99, type: "lease", image: "/placeholder.svg", description: "Immersive virtual reality headset with high-resolution displays and precise motion tracking.", state: "Texas", area: "Houston" },
]

const states = [...new Set(items.map(item => item.state))]
const areas = [...new Set(items.map(item => item.area))]

export default function Component() {
  const [filter, setFilter] = useState<'all' | 'sale' | 'lease'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [stateFilter, setStateFilter] = useState<string>('all')
  const [areaFilter, setAreaFilter] = useState<string>('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredItems = useMemo(() => {
    return items.filter(item => 
      (filter === 'all' || item.type === filter) &&
      (stateFilter === 'all' || item.state === stateFilter) &&
      (areaFilter === 'all' || item.area === areaFilter) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [filter, searchTerm, stateFilter, areaFilter])

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Vendor Marketplace</h1>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="w-full lg:w-1/3 relative">
          <input
            id="search"
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {/* <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" /> */}
        </div>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {/* <Filter className="h-5 w-5 mr-2" /> */}
          Filters
        </button>
      </div>
      {isFilterOpen && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              id="type-filter"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              onChange={(e) => setFilter(e.target.value as 'all' | 'sale' | 'lease')}
            >
              <option value="all">All Items</option>
              <option value="sale">For Sale</option>
              <option value="lease">For Lease</option>
            </select>
          </div>
          <div>
            <label htmlFor="state-filter" className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select
              id="state-filter"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <option value="all">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="area-filter" className="block text-sm font-medium text-gray-700 mb-1">Area</label>
            <select
              id="area-filter"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              onChange={(e) => setAreaFilter(e.target.value)}
            >
              <option value="all">All Areas</option>
              {areas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="relative">
              < Image  src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <span className={`absolute top-4 right-4 px-2 py-1 text-xs font-semibold rounded-full ${item.type === 'sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                {item.type === 'sale' ? 'For Sale' : 'For Lease'}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-2">
               <TagSvg/>
                ${item.price.toFixed(2)} {item.type === 'lease' && '/ day'}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                {/* <MapPin className="mr-2 h-4 w-4" /> */}
                {item.area}, {item.state}
              </div>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No items found. Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}