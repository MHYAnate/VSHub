import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Mock data for the mechanic's profile
const mechanicProfile = {
  name: "John Smith",
  title: "Expert Auto Mechanic",
  rating: 4.8,
  reviews: 127,
  yearsOfExperience: 15,
  specializations: ["Engine Repair", "Brake Systems", "Electrical Systems", "Transmission Repair"],
  services: [
    { name: "Oil Change", price: "$50" },
    { name: "Brake Pad Replacement", price: "$150" },
    { name: "Engine Tune-up", price: "$200" },
    { name: "Transmission Service", price: "$300" },
  ],
  about: "With over 15 years of experience in the automotive industry, I specialize in diagnosing and repairing a wide range of vehicle issues. My goal is to provide honest, reliable, and high-quality service to keep your vehicle running smoothly.",
  contactInfo: {
    phone: "+1 (555) 123-4567",
    email: "john.smith@example.com",
    address: "123 Auto Street, Mechanicsville, CA 90210",
  },
  availability: "Monday to Friday, 8:00 AM - 6:00 PM",
}

export default function MechanicProfile() {
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
              Dashboard
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Messages
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <Image
                  src="/mechanic-profile.jpg"
                  alt={mechanicProfile.name}
                  width={300}
                  height={300}
                  className="h-48 w-full object-cover md:h-full md:w-48"
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {mechanicProfile.title}
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-900">
                  {mechanicProfile.name}
                </h1>
                <div className="mt-2 flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-gray-600">
                    {mechanicProfile.rating} ({mechanicProfile.reviews} reviews)
                  </span>
                </div>
                <p className="mt-2 text-gray-500">
                  {mechanicProfile.yearsOfExperience} years of experience
                </p>
              </div>
            </div>

            <div className="px-8 py-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-700">{mechanicProfile.about}</p>
            </div>

            <div className="px-8 py-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specializations</h2>
              <div className="flex flex-wrap gap-2">
                {mechanicProfile.specializations.map((spec, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-8 py-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Services & Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mechanicProfile.services.map((service, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{service.name}</span>
                    <span className="font-semibold text-gray-900">{service.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-8 py-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Phone:</strong> {mechanicProfile.contactInfo.phone}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {mechanicProfile.contactInfo.email}
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> {mechanicProfile.contactInfo.address}
                </p>
                <p className="text-gray-700">
                  <strong>Availability:</strong> {mechanicProfile.availability}
                </p>
              </div>
            </div>

            <div className="px-8 py-6 border-t border-gray-200">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors">
                Contact {mechanicProfile.name}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2024 VHub by ILUD. All rights reserved.</p>
            <nav className="flex gap-6 mt-4 sm:mt-0">
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}