import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Mock data for the vendor's dashboard
const dashboardData = {
  vendor: {
    name: "John Smith",
    profession: "Auto Mechanic",
    avatar: "/vendor-avatar.jpg",
  },
  metrics: [
    { label: "Total Bookings", value: 152 },
    { label: "This Month", value: 23 },
    { label: "Avg. Rating", value: 4.8 },
    { label: "Revenue", value: "$3,450" },
  ],
  recentBookings: [
    { id: 1, client: "Alice Johnson", service: "Oil Change", date: "2024-03-15", status: "Completed" },
    { id: 2, client: "Bob Williams", service: "Brake Repair", date: "2024-03-16", status: "Pending" },
    { id: 3, client: "Carol Davis", service: "Engine Tune-up", date: "2024-03-17", status: "In Progress" },
    { id: 4, client: "David Brown", service: "Tire Rotation", date: "2024-03-18", status: "Scheduled" },
  ],
}

export default function VendorDashboard() {
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
            <span className="text-sm text-gray-600">Welcome, {dashboardData.vendor.name}</span>
            <Image
              src={dashboardData.vendor.avatar}
              alt={dashboardData.vendor.name}
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
            <li><Link href="#" className="hover:text-gray-300 transition-colors">Settings</Link></li>
          </ul>
        </div>
      </nav>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardData.metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-600 mb-2">{metric.label}</h2>
                <p className="text-3xl font-bold text-gray-800">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 font-semibold">Client</th>
                    <th className="pb-2 font-semibold">Service</th>
                    <th className="pb-2 font-semibold">Date</th>
                    <th className="pb-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b last:border-b-0">
                      <td className="py-3">{booking.client}</td>
                      <td className="py-3">{booking.service}</td>
                      <td className="py-3">{booking.date}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            booking.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Update Availability
                </button>
                <button className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  View New Requests
                </button>
                <button className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                  Send Invoice
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Schedule</h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span>Oil Change - Emily White</span>
                  <span className="text-sm text-gray-600">Today, 2:00 PM</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Brake Inspection - Michael Brown</span>
                  <span className="text-sm text-gray-600">Tomorrow, 10:00 AM</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Tire Rotation - Sarah Green</span>
                  <span className="text-sm text-gray-600">Mar 20, 3:30 PM</span>
                </li>
              </ul>
            </div>
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