import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Mock data for the vendor's settings
const vendorData = {
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "+1 (555) 123-4567",
  profession: "Auto Mechanic",
  avatar: "/vendor-avatar.jpg",
  address: "123 Main St, Anytown, USA",
  bio: "Experienced auto mechanic with over 15 years in the industry.",
}

export default function VendorSettings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState(vendorData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated data to your backend
    console.log("Updated data:", formData)
    alert("Settings updated successfully!")
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {formData.name}</span>
            <Image
              src={formData.avatar}
              alt={formData.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
      </header>

      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-3">
          <ul className="flex space-x-4">
            <li><Link href="#" className="hover:text-gray-300 transition-colors">Dashboard</Link></li>
            <li><Link href="#" className="hover:text-gray-300 transition-colors">Bookings</Link></li>
            <li><Link href="#" className="hover:text-gray-300 transition-colors">Messages</Link></li>
            <li><Link href="#" className="hover:text-gray-300 transition-colors">Profile</Link></li>
            <li><Link href="#" className="text-blue-300 transition-colors">Settings</Link></li>
          </ul>
        </div>
      </nav>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
          
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex border-b">
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'account' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('account')}
              >
                Account
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'notifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'privacy' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('privacy')}
              >
                Privacy
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="profession" className="block text-sm font-medium text-gray-700">Profession</label>
                    <input
                      type="text"
                      id="profession"
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
              )}
              
              {activeTab === 'account' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
              )}
              
              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      name="emailNotifications"
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                      Receive email notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="smsNotifications"
                      name="smsNotifications"
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <label htmlFor="smsNotifications" className="ml-2 block text-sm text-gray-700">
                      Receive SMS notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="marketingEmails"
                      name="marketingEmails"
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <label htmlFor="marketingEmails" className="ml-2 block text-sm text-gray-700">
                      Receive marketing emails
                    </label>
                  </div>
                </div>
              )}
              
              {activeTab === 'privacy' && (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="profileVisibility"
                      name="profileVisibility"
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <label htmlFor="profileVisibility" className="ml-2 block text-sm text-gray-700">
                      Make profile visible to all users
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showContactInfo"
                      name="showContactInfo"
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <label htmlFor="showContactInfo" className="ml-2 block text-sm text-gray-700">
                      Show contact information on profile
                    </label>
                  </div>
                  <div>
                    <label htmlFor="dataRetention" className="block text-sm font-medium text-gray-700">Data Retention</label>
                    <select
                      id="dataRetention"
                      name="dataRetention"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                      <option>Indefinitely</option>
                    </select>
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2024 VHub by ILUD. All rights reserved.</p>
            <nav className="flex gap-4 mt-4 sm:mt-0">
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Help Center
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}