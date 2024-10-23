import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Mock data for the vendor's messages
const mockConversations = [
  {
    id: 1,
    client: {
      name: "Alice Johnson",
      avatar: "/client-avatar-1.jpg",
    },
    lastMessage: "Hi, I'm interested in your auto repair services.",
    timestamp: "2024-03-20T10:30:00Z",
    unread: true,
  },
  {
    id: 2,
    client: {
      name: "Bob Williams",
      avatar: "/client-avatar-2.jpg",
    },
    lastMessage: "Thanks for the quick service!",
    timestamp: "2024-03-19T15:45:00Z",
    unread: false,
  },
  {
    id: 3,
    client: {
      name: "Carol Davis",
      avatar: "/client-avatar-3.jpg",
    },
    lastMessage: "Can you provide a quote for brake replacement?",
    timestamp: "2024-03-18T09:15:00Z",
    unread: true,
  },
]

const mockMessages = [
  {
    id: 1,
    sender: "client",
    content: "Hi, I'm interested in your auto repair services.",
    timestamp: "2024-03-20T10:30:00Z",
  },
  {
    id: 2,
    sender: "vendor",
    content: "Hello! Thank you for your interest. How can I help you today?",
    timestamp: "2024-03-20T10:35:00Z",
  },
  {
    id: 3,
    sender: "client",
    content: "I need my brakes checked. Do you offer this service?",
    timestamp: "2024-03-20T10:40:00Z",
  },
  {
    id: 4,
    sender: "vendor",
    content: "Yes, we do offer brake inspection and repair services. Would you like to schedule an appointment?",
    timestamp: "2024-03-20T10:45:00Z",
  },
]

export default function VendorMessages() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [newMessage, setNewMessage] = useState("")

  const handleConversationSelect = (conversation:any) => {
    setSelectedConversation(conversation)
  }

  const handleNewMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
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
            <span className="text-sm text-gray-600">John Smith</span>
            <Image
              src="/vendor-avatar.jpg"
              alt="Vendor Avatar"
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
            <li><Link href="#" className="text-blue-300 transition-colors">Messages</Link></li>
            <li><Link href="#" className="hover:text-gray-300 transition-colors">Profile</Link></li>
            <li><Link href="#" className="hover:text-gray-300 transition-colors">Settings</Link></li>
          </ul>
        </div>
      </nav>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Messages</h1>
          
          <div className="bg-white rounded-lg shadow-md flex h-[calc(100vh-250px)]">
            {/* Conversation List */}
            <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
              {mockConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                    selectedConversation.id === conversation.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleConversationSelect(conversation)}
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src={conversation.client.avatar}
                      alt={conversation.client.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{conversation.client.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(conversation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {conversation.unread && (
                    <div className="mt-2 text-xs font-semibold text-blue-600">New message</div>
                  )}
                </div>
              ))}
            </div>

            {/* Message Thread */}
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-lg">{selectedConversation.client.name}</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                        message.sender === 'vendor' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                <div className="flex space-x-4">
                  <textarea
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  ></textarea>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Send
                  </button>
                </div>
              </form>
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