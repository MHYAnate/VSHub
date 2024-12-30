"use client"

import React, { useEffect, useRef } from 'react'

const FeaturesComponent: React.FC = () => {
  const features = [
    {
      title: "Expert Professionals",
      description: "Connect with vetted and skilled service providers.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Wide Range of Services",
      description: "From home repairs to personal care, find it all here.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
    {
      title: "Easy to Use Interface",
      description: "Easily find vendors with just a few clicks, anytime, anywhere.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      ),
    },
  ]

  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('feature-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
  
    // Copy the current refs to a local variable
    const currentRefs = featureRefs.current;
  
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
  
    return () => {
      // Use the local variable in the cleanup
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []); 

  return (
    <div className="container mx-auto px-4 py-16 bg-white rounded-md">
      <h2 className="text-4xl font-bold text-center mb-16 text-black relative inline-block left-1/2 transform -translate-x-1/2 group">
        Why Choose{" "}
        <span className="font-[family-name:var(--ProtestGuerrilla)] text-black">
          Sspot1
        </span>
        <span className="absolute bottom-0 left-0 w-full h-1 bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
      </h2>
      <div className="grid gap-12 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el: HTMLDivElement | null) =>{if (el) featureRefs.current[index] = el} }
            className={"bg-white rounded-lg p-8 text-center transition-all duration-300 hover:shadow-2xl transform hover:translate-y-2 feature-card"}
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-black text-white rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-black">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .feature-card {
          opacity: 0;
        }
        .feature-visible {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

FeaturesComponent.displayName = "FeaturesComponent"
export default FeaturesComponent