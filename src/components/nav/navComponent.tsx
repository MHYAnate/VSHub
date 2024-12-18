"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

interface Props{
  setQNav:(value:string)=>void
  qNav:string
}

export default function NavComponent({ setQNav, qNav }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Services', action: () => setQNav(qNav === 'service' ? '' : 'service') },
    { label: 'Features', action: () => setQNav(qNav === 'features' ? '' : 'features') },
    { label: 'Contact', action: () => setQNav(qNav === 'contact' ? '' : 'contact') },
    { label: 'Log In', action: () => router.push('/login') },
    { label: 'Register', action: () => router.push('/register'), isButton: true },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md ' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className={`${scrolled? " pl-2 pr-3":"bg-gradient-to-br from-black to-gray-900 rounded-full pl-2 pr-3"} flex items-center space-x-2 select-none`}>
            {scrolled ?  <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gray-200">
              <Image
                src="/service/1x.jpg"
                alt="VSHub Logo"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>:   <div className="relative w-10 h-10 overflow-hidden rounded-full bg-black">
              <Image
                src="/service/1xi.jpg"
                alt="VSHub Logo"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
            </div> }
          
            <span className={`text-2xl font-bold  font-[family-name:var(--ProtestGuerrilla)] ${scrolled ? 'text-black ' : 'text-white'}`}>
              VsHub
            </span>
          </div>
          
          {(pathname === "/") && (
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  onClick={item.action}
                  className={`
                    text-sm font-medium transition-all duration-300 cursor-pointer
                    ${item.isButton 
                      ? 'px-4 py-2 text-white bg-black rounded-full hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-0.5' 
                      : 'text-gray-600 hover:text-black relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all after:duration-300 hover:after:w-full'
                    }
                  `}
                >
                  {item.label}
                </div>
              ))}
            </nav>
          )}

          {pathname !== "/" && (
            <nav className="hidden md:flex items-center space-x-6">
              <div onClick={() => router.push('/login')} className="text-sm font-medium text-gray-600 hover:text-black transition-all duration-300 cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
                Log In
              </div>
              <div onClick={() => router.push('/register') }  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-300 cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5">
                Register
              </div>
            </nav>
          )}
          
          <button
            className="md:hidden text-black hover:text-gray-600 transition-colors duration-300 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
        
        {mobileMenuOpen && (
          <nav className="mt-4 md:hidden">
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    item.action()
                    setMobileMenuOpen(false)
                  }}
                  className={`
                    text-sm font-medium transition-all duration-300 cursor-pointer
                    ${item.isButton 
                      ? 'px-4 py-2 text-white bg-black rounded-full hover:bg-gray-800 text-center' 
                      : 'text-gray-600 hover:text-black'
                    }
                  `}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}