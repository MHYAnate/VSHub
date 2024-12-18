"use client";
import React from "react";
import { features } from '@/database/features';

const AboutFeatures: React.FC = () => {
  
	return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
    {features.map((feature, index) => (
      <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
        <div className="text-4xl mb-4">{feature.icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
        <p className="text-gray-600">{feature.description}</p>
      </div>
    ))}
  </div>
	);
};

AboutFeatures.displayName = "AboutFeatures";
export default AboutFeatures;
