'use client'
import Image from "next/image";
import Link from 'next/link'
import { Services } from "@/database/data";
import { useState } from "react";



export default function Home() {

  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)

  const toggleMdCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleCategory = (categoryId: number) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId)
  }
  return (
<div className="flex flex-col min-h-screen font-sans bg-gray-50">
<header className="bg-white shadow-sm sticky top-0 z-50">
  <div className="container mx-auto px-4 py-4">
    <div className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/service/who.jpg"
          alt="VSHub Logo"
          width={40}
          height={40}
          className="rounded-full "
        />
        <span className="text-2xl font-bold text-gray-800  font-[family-name:var(--ProtestGuerrilla)]">VSHub</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="#services" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          Services
        </Link>
        <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          Features
        </Link>
        <Link href="#contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          Contact
        </Link>
        <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          Log In
        </Link>
        <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-blue-700 transition-colors">
          Register
        </Link>
      </nav>
      <button
        className="md:hidden text-gray-600 hover:text-gray-900"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    {mobileMenuOpen && (
      <nav className="mt-4 md:hidden">
        <div className="flex flex-col space-y-2">
          <Link href="#services" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Services
          </Link>
          <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Features
          </Link>
          <Link href="#contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Contact
          </Link>
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Log In
          </Link>
          <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-blue-700 transition-colors text-center">
            Register
          </Link>
        </div>
      </nav>
    )}
  </div>
</header>

<main className="flex-grow">
  <section className="relative py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Find Expert Services, AnyTime-AnyWhere.
          </h1>
          <p className="text-xl text-blue-100">
            Connect with skilled professionals for all your needs. From automotive to home maintenance, we've got you covered.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              className="flex-grow px-6 py-3 rounded-full text-gray-900"
              placeholder="Search for a service..."
              type="text"
            />
            <button type="submit" className="px-6 py-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
              Search
            </button>
          </form>
        </div>
        <div className="relative hidden lg:block w-4/5 h-4/5 overflow-hidden rounded-xl drop-shadow-2xl">
          <Image
            alt="Services collage"
            className="rounded-lg shadow-2xl w-full"
            height={400}
            src="/service/back.jpg"
            width={600}
          />
     
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                     <p className="text-lg font-bold">Discover Our Services</p>
                    <p className="text-sm mt-1">Explore a wide range of professional services</p>
                </div>      
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800/60 to-transparent rounded-lg" />
        </div>
      </div>
    </div>
    <div className="absolute inset-0 bg-blue-600 opacity-10 pattern-dots pattern-size-2 pattern-white" />
  </section>


  <section id="services" className="md:hidden py-20  bg-gray-50">
       <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Services.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
             <div className="relative rounded-none hover:scale-105 transition-all duration-1000 ease-in-out">
            <div className="inset-0 bg-gradient-to-t from-gray-800/60 to-transparent absolute"/>
            <Image
              src={category.src}
              alt={`${category.category} category`}
              width={400}
              height={200}
              className="w-full rounded-none  h-32 object-cover"
            />
            </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                <button
                  onClick={() => toggleMdCategory(category.id)}
                  className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {expandedCategory === category.id ? 'Hide Services' : 'Show Services'}
                </button>
                {expandedCategory === category.id && (
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {category.services.map((service) => (
                      <div key={service.id} className="shadow-md bg-white rounded-lg text-center overflow-hidden">
                        <Image
                          src={service.src}
                          alt={`${service.name} service`}
                          width={100}
                          height={100}
                          className="w-full h-24 object-cover rounded-md mb-2"
                        />
                        <p className="text-sm font-medium">{service.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

  <section id="services" className=" hidden md:block py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {Services.map((category) => (
          <div
            key={category.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
              selectedCategory === category.id ? 'ring-2 ring-gray-900' : 'hover:shadow-lg'
            }`}
          ><div className="relative rounded-none hover:scale-105 transition-all duration-1000 ease-in-out">
            <div className="inset-0 bg-gradient-to-t from-gray-800/60 to-transparent absolute"/>
            <Image
              src={category.src}
              alt={`${category.category} category`}
              width={400}
              height={200}
              className="w-full rounded-none  h-32 object-cover"
            />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
              <button
                onClick={() => toggleCategory(category.id)}
                className={`w-full py-2 px-4 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-gray-600 text-white hover:bg--700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {selectedCategory === category.id ? 'Hide Services' : 'Show Services'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div className="mt-12 lg:mt-16">
          <h3 className="text-2xl font-bold mb-6">
            {Services.find(cat => cat.id === selectedCategory)?.category} Services
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Services.find(cat => cat.id === selectedCategory)?.services.map((service) => (
              <div key={service.id} className="shadow-md bg-white rounded-lg text-center overflow-hidden transition-shadow hover:shadow-lg">
                <Image
                  src={service.src}
                  alt={`${service.name} service`}
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover rounded-md mb-4 hover:scale-105 transition-all duration-1000 ease-in-out"
                />
                <p className="text-lg font-medium">{service.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </section>

  <section id="features" className="py-20 bg-gray-100">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 font-[family-name:var(--Poppins-Bold)] ">Why Choose<span className="font-[family-name:var(--ProtestGuerrilla)] "> VSHub</span> </h2>
      <div className="grid gap-8 lg:grid-cols-3">
        {[
          { title: "Expert Professionals", description: "Connect with vetted and skilled service providers." },
          { title: "Wide Range of Services", description: "From home repairs to personal care, find it all here." },
          { title: "Easy to Use Interface", description: "Easily find vendors with just a few clicks, anytime, anywhere." },
        ].map((feature, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-8 text-center transition-shadow hover:shadow-lg">
            <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 font-[family-name:var(--Poppins-SemiBold)]">{feature.title}</h3>
            <p className="text-gray-600 font-[family-name:var(--Poppins-Regular)]">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section id="contact" className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-[family-name:var(--Poppins-Regular)] ">
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
        <p className="text-xl text-blue-200 mb-8">
          Join thousands of satisfied customers who have found the perfect service provider through our platform.
        </p>
        <form className="flex flex-col sm:flex-row gap-4">
          <input 
            className="flex-grow px-6 py-3 rounded-full text-gray-900" 
            placeholder="Enter your email" 
            type="email"
          />
          <button type="submit" className="px-8 py-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
            Subscribe
          </button>
        </form>
        <p className="mt-4 text-sm text-blue-200">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  </section>
</main>

<footer className="bg-white border-t border-gray-200">
  <div className="container mx-auto px-4 py-8">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center mb-4 md:mb-0">
        <Image
          src="/service/who.jpg"
          alt="VSHub Logo"
          width={40}
          height={40}
          className="rounded-full mr-2"
        />
        <span className="text-xl font-bold text-gray-800 font-[family-name:var(--ProtestGuerrilla)]">VSHub</span>
      </div>
      <nav className="flex flex-wrap justify-center gap-6 font-[family-name:var(--Poppins-Regular)] font-bold">
        <Link href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          About Us
        </Link>
        
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
    <div className="mt-8 text-center text-sm text-gray-500">
      © 2024 VSHub by ILUD. All rights reserved.
    </div>
  </div>
</footer>
</div>




  );
}
