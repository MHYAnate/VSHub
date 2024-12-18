"use client";
import React from "react";
import Link from 'next/link'

const AboutGetStarted: React.FC = () => {
  
	return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
    <p className="text-xl text-gray-700 mb-8">
      Join VsHub today and experience the future of digital service marketplaces.
    </p>
    <Link
      href="/register"
      className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-full transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
    >
      Register Now
    </Link>
  </div>
	);
};

AboutGetStarted.displayName = "AboutGetStarted";
export default AboutGetStarted;
