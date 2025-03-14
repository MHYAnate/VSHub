import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const FooterComponent: React.FC = () => {
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

	useEffect(() => {
		setCurrentYear(new Date().getFullYear());
	}, []);

	return (
		<footer className="bg-white text-black py-12 border-t border-gray-200">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="flex items-center mb-8 md:mb-0 group">
						<div className="relative w-12 h-12 mr-3 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110">
							<Image
								src="/service/1x.jpg"
								alt="Sspot1 Logo"
								layout="fill"
								objectFit="cover"
							/>
						</div>
						<span className="text-2xl font-bold text-black font-[family-name:var(--ProtestGuerrilla)] relative">
							Sspot1
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
						</span>
					</div>
					<nav className="flex flex-wrap justify-center gap-8 font-['--Poppins'] font-medium">
						{[
							"About Us",
							"Terms of Service",
							"Privacy Policy",
							"Help Center",
						].map((item) => (
							<Link
								key={item}
								href={`/${item.toLowerCase().replace(/\s+/g, "")}`}
								className="text-sm text-gray-600 hover:text-black transition-colors duration-300 relative group"
							>
								{item}
								<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
							</Link>
						))}
					</nav>
				</div>
				<div className="mt-12 text-center">
					<p className="text-sm text-gray-500">
						© {currentYear}{" "}
						<span className="font-[family-name:var(--ProtestGuerrilla)]">
							Sspot1
						</span>{" "}
						by ILUD. All rights reserved.
					</p>
				</div>
			</div>
			<div className="mt-8 flex justify-center space-x-6">
				{["Email", "LinkedIn"].map((platform) => (
					<Link
						key={platform}
						href={
							platform === "Email"
								? "mailto:mhibnyusufanate@gmail.com"
								: "https://www.linkedin.com/in/mohammed-hayatudeen-yusuf-04804a299"
						}
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-400 hover:text-black transition-colors duration-300"
						aria-label={platform}
					>
						{platform === "Email" && (
							<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 48 48">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								></path>
							</svg>
						)}

						{platform === "LinkedIn" && (
							<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
								<path
									fillRule="evenodd"
									d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
									clipRule="evenodd"
								/>
							</svg>
						)}
					</Link>
				))}
			</div>
		</footer>
	);
};

FooterComponent.displayName = "FooterComponent";
export default FooterComponent;
