"use client";
import React, { useState, useEffect } from "react";
import { testimonials } from '@/database/testimonials';

const AboutTestimonials: React.FC = () => {
	const [activeTestimonial, setActiveTestimonial] = useState(0)

	useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])
	return (
		<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
		<div className="relative h-32">
			{testimonials.map((testimonial, index) => (
				<div
					key={index}
					className={`absolute inset-0 transition-all duration-500 ${
						index === activeTestimonial ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
					}`}
				>
					<blockquote className="text-xl italic text-gray-700 mb-4">{`"${testimonial.quote}"`}</blockquote>
					<div className="flex items-center">
						<div className="w-12 h-12 rounded-full bg-gray-300 mr-4" />
						<div>
							<p className="font-semibold">{testimonial.name}</p>
							<p className="text-gray-600">{testimonial.role}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
	);
};

AboutTestimonials.displayName = "AboutTestimonials";
export default AboutTestimonials;
