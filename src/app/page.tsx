"use client";
import { useState, useRef, useEffect } from "react";
import NavComponent from "@/components/nav/navComponent";
import HeroComponent from "@/components/hero/heroComponent";
import ServiceBcomponent from "@/components/Services/servicesBComponent";
import ServicesComponent from "@/components/Services/servicesComponent";
import FeaturesComponenet from "@/components/features/featuresComponenet";
import NewsLetterComponent from "@/components/newsLetter/newsLetterComponent";
import FooterComponent from "@/components/footer/footerComponent";

export default function Home() {

		useEffect(() => {
			// Accessing window.location.pathname doesn't require assignment 
			// if you only intend to read the value. 
			const pathname = window.location.pathname; 
			// You can use the pathname value here if needed:
			pathname
			console.log(pathname); 
		}, []); 

	const [qNav, setQNav] = useState("");

	const q0 = useRef<HTMLDivElement>(null);

	const q1 = useRef<HTMLDivElement>(null);

	const q2 = useRef<HTMLDivElement>(null);

	const q3 = useRef<HTMLDivElement>(null);

	const q4 = useRef<HTMLDivElement>(null);

	const qView1 = () => q1.current?.scrollIntoView({ behavior: "smooth" });

	const qView2 = () => q2.current?.scrollIntoView({ behavior: "smooth" });

	const qView3 = () => q3.current?.scrollIntoView({ behavior: "smooth" });

	const qView4 = () => q4.current?.scrollIntoView({ behavior: "smooth" });

	useEffect(() => {
		if (qNav === "services") {
			qView1();
		}
		if (qNav === "service") {
			qView2();
		}
		if (qNav === "features") {
			qView3();
		}
		if (qNav === "contact") {
			qView4();
		}
	}, [qNav, setQNav]);

	return (
		<div className="flex flex-col min-h-screen font-sans bg-gray-50">
			<header className="bg-white shadow-sm sticky top-0 z-50">
				<NavComponent setQNav={setQNav} qNav={qNav} />
			</header>
			<main className="flex-grow">
				<HeroComponent setQNav={setQNav} qNav={qNav} />
				<section
					ref={qNav === "services" ? q1 : q0}
					id="services"
					className="md:hidden py-20  bg-white"
				>
					<ServicesComponent />
				</section>

				<section
					ref={qNav === "service" ? q2 : q0}
					id="service"
					className=" hidden md:block py-20 bg-white"
				>
					<ServiceBcomponent />
				</section>

				<section
					ref={qNav === "features" ? q3 : q0}
					id="features"
					className="py-20 bg-gray-100"
				>
					<FeaturesComponenet />
				</section>

				<section
					ref={qNav === "contact" ? q4 : q0}
					id="contact"
					className="py-20 bg-gradient-to-r from-white to-white text-black font-[family-name:var(--Poppins-Regular)] "
				>
					<NewsLetterComponent />
				</section>
			</main>

			<footer className="bg-white border-t border-gray-200">
				<FooterComponent />
			</footer>
		</div>
	);
}
 