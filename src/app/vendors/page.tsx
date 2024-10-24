import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FooterComponent from '@/component/footer/footerComponent'

// Mock data for vendors (in a real application, this would come from an API or database)
const vendors = [
  { id: 1, name: "Elite Tailoring", rating: 4.8, reviews: 120, image: "/vendors/tailor1.jpg" },
  { id: 2, name: "Stitch & Style", rating: 4.6, reviews: 95, image: "/vendors/tailor2.jpg" },
  { id: 3, name: "Perfect Fit Tailors", rating: 4.9, reviews: 200, image: "/vendors/tailor3.jpg" },
  { id: 4, name: "Fashion Fix", rating: 4.7, reviews: 150, image: "/vendors/tailor4.jpg" },
  { id: 5, name: "Bespoke Creations", rating: 4.5, reviews: 80, image: "/vendors/tailor5.jpg" },
  { id: 6, name: "Seam Masters", rating: 4.8, reviews: 175, image: "/vendors/tailor6.jpg" },
]

export default function VendorList() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <header className="px-6 py-4 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/service/database.jpg"
              alt="VHub Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-gray-800">VHub</span>
          </Link>
          <nav className="flex items-center space-x-6">
            
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Log In
            </Link>
            <Link href="#" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
              Register
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-8">Tailoring Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
                <Image
                  src={vendor.image}
                  alt={`${vendor.name} profile`}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{vendor.name}</h2>
                  <div className="flex items-center mb-4">
                    <div className="text-yellow-400">
                      {/* Star icon (you can replace this with an actual icon component if available) */}
                      ★
                    </div>
                    <span className="ml-1 text-gray-600">{vendor.rating} ({vendor.reviews} reviews)</span>
                  </div>
                  <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    Contact Vendor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <FooterComponent/>
        {/* <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2024 VsHub by ILUD. All rights reserved.</p>
            <nav className="flex gap-6 mt-4 sm:mt-0">
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div> */}
      </footer>
    </div>
  )
}