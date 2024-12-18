"use client";

import React, {useState} from 'react'
import AboutHero from '@/components/about/aboutHero';
import AboutMission from '@/components/about/aboutMission';
import AboutFeatures from '@/components/about/aboutFeature';
import AboutStats from '@/components/about/aboutStats';
import AboutVision from '@/components/about/aboutVision';
import NavComponent from '@/components/nav/navComponent';
import AboutTestimonials from '@/components/about/testimonials';
import AboutGetStarted from '@/components/about/getStarted';
import AboutFooter from '@/components/about/aboutFooter';


export default function AboutUs() {

	const [a, setA] = useState("")


	return (
		<div className="min-h-screen bg-gray-50">
			
			<header className="bg-white shadow-sm">

				<NavComponent setQNav={setA} qNav={a}/>

      </header>

			<main>
			
				<section className="bg-black text-white">
				<AboutHero/>
				</section>

				{/* Mission Statement */}

				<AboutVision/>

				<AboutMission/>
			
				{/* Key Features */}
				<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl font-[family-name:var(--Poppins-Bold)]">
              What We Offer
            </h2>
          </div>

         <AboutFeatures/>

        </section>

				<section id="stats-section" className="bg-black text-white py-16">

         <AboutStats/>

        </section>

				{/* Testimonials */}
				<section className="py-16 overflow-hidden">

          <AboutTestimonials/>
					
        </section>
				{/* Call to Action */}
				<section className="bg-gray-100 py-16">
       <AboutGetStarted/>
        </section>
			</main>

			{/* Footer */}
			<footer className="bg-black text-white">
				<AboutFooter/>
			</footer>
		</div>
	);
}
