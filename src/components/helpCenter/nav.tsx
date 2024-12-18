"use client";
import React from "react";
import { Faqs } from '@/database/faqsData'

interface NavProps {
  activeCategory : string
  setActiveCategory : (value:string) => void
}

const HelpCenterNav: React.FC<NavProps>= ({activeCategory, setActiveCategory}) => {
  


	return (
    <nav className="flex space-x-2">
    {['All', ...Faqs.map(f => f.category)].map((category) => (
      <button
        key={category}
        onClick={() => setActiveCategory(category)}
        className={`px-4 py-2 font-medium text-sm rounded-full transition-all duration-200 ${
          activeCategory === category
            ? 'bg-black text-white shadow-md'
            : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
      >
        {category}
      </button>
    ))}
  </nav>
	);
};

HelpCenterNav.displayName = "HelpCenterNav";
export default HelpCenterNav;
