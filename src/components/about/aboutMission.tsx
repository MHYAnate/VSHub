"use client";
import React from "react";

const AboutMission: React.FC = () => {
  
	return (
    <section className="bg-white max-w-7xl mx-auto mt-6 py-6 px-4 sm:px-6 lg:py-16 lg:px-8">
    <h2 className="text-3xl font-extrabold text-gray-900 text-center sm:text-4xl font-[family-name:var(--Poppins-Bold)]">Our Mission</h2>
    <p className="mt-4 text-lg text-gray-500 font-[family-name:var(--Poppins-Regular)]">
      {`At VsHub, We're dedicated to revolutionizing the way vendors and clients connect in the digital space, by simplifing and streamlining the process of finding trusted Service vendors and employers to potential clients and job seakers.`}
    
    </p>
    <p className="mt-4 text-lg text-gray-500 font-[family-name:var(--Poppins-Regular)]">
      {` We believe in empowering clients, vendors and job seekers with the tools and information they need to make informed decisions while ensuring vendors receive the visibility they deserve.`}
   
    </p>
  </section>
	);
};

AboutMission.displayName = "AboutMission";
export default AboutMission;
