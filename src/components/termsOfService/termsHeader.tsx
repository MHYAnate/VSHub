"use client";
import React, { useState, useEffect } from 'react'
import Image from "next/image";

const TermsHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  
	return (
    <header className={`sticky top-0 z-10 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="select-none flex items-center space-x-2">
				<Image
					src="/service/1x.jpg"
					alt="VSHub Logo"
					width={40}
					height={40}
					className="select-none rounded-full "
				/>
				<span className="select-none text-3xl font-bold   font-[family-name:var(--ProtestGuerrilla)] ">
					VsHub
				</span>
				<span className="text-3xl  font-bold font-[family-name:var(--Poppins-Bold)]">Terms and Conditions</span>
			</div>
    </div>
  </header>
	);
};

TermsHeader.displayName = "TermsHeader";
export default TermsHeader;
