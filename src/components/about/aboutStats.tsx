"use client";
import React, { useState, useEffect } from "react";
import { stats } from "@/database/stats";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { fetchProfiles } from "@/lib/store/features/profileSlice";

const AboutStats: React.FC = () => {
	const [isIntersecting, setIsIntersecting] = useState(false);

	const dispatch = useAppDispatch();
	const { profiles } = useAppSelector((state) => state.profile);

	useEffect(() => {
		dispatch(fetchProfiles());
	}, [dispatch]);

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
				<div className="text-center">
					<p
						className={`text-4xl md:text-5xl font-bold mb-2 transition-all duration-1000 ${
							isIntersecting ? "opacity-100" : "opacity-0 translate-y-4"
						}`}
						style={{ transitionDelay: `${1 * 200}ms` }}
					>
						{profiles.length}
					</p>
					<p className="text-xl text-gray-400">{"Active Vendors"}</p>
				</div>
				<div className="text-center">
					<p
						className={`text-4xl md:text-5xl font-bold mb-2 transition-all duration-1000 ${
							isIntersecting ? "opacity-100" : "opacity-0 translate-y-4"
						}`}
						style={{ transitionDelay: `${2 * 200}ms` }}
					>
						{`${profiles.length - 1}+`}
					</p>
					<p className="text-xl text-gray-400">{"Satisfied Clients"}</p>
				</div>
				<div className="text-center">
					<p
						className={`text-4xl md:text-5xl font-bold mb-2 transition-all duration-1000 ${
							isIntersecting ? "opacity-100" : "opacity-0 translate-y-4"
						}`}
						style={{ transitionDelay: `${3 * 200}ms` }}
					>
						{"40+"}
					</p>
					<p className="text-xl text-gray-400">{"Service Categories"}</p>
				</div>
				<div className="text-center">
					<p
						className={`text-4xl md:text-5xl font-bold mb-2 transition-all duration-1000 ${
							isIntersecting ? "opacity-100" : "opacity-0 translate-y-4"
						}`}
						style={{ transitionDelay: `${3 * 200}ms` }}
					>
						{"99%"}
					</p>
					<p className="text-xl text-gray-400">{"Customer Satisfaction"}</p>
				</div>
			</div>
		</div>
	);
};

AboutStats.displayName = "AboutStats";
export default AboutStats;
