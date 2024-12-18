"use client";
import React, { useState, useEffect } from "react";
import { stats } from "@/database/stats";

const AboutStats: React.FC = () => {
	const [isIntersecting, setIsIntersecting] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsIntersecting(entry.isIntersecting);
			},
			{ threshold: 0.1 }
		);

		const statsSection = document.querySelector("#stats-section");
		if (statsSection) {
			observer.observe(statsSection);
		}

		return () => {
			if (statsSection) {
				observer.unobserve(statsSection);
			}
		};
	}, []);
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
				{stats.map((stat, index) => (
					<div key={index} className="text-center">
						<p
							className={`text-4xl md:text-5xl font-bold mb-2 transition-all duration-1000 ${
								isIntersecting ? "opacity-100" : "opacity-0 translate-y-4"
							}`}
							style={{ transitionDelay: `${index * 200}ms` }}
						>
							{stat.number}
						</p>
						<p className="text-xl text-gray-400">{stat.label}</p>
					</div>
				))}
			</div>
		</div>
	);
};

AboutStats.displayName = "AboutStats";
export default AboutStats;
