"use client";
import { useState, useRef, useEffect } from "react";
import NavComponent from "@/components/nav/navComponent";
import HeroComponent from "@/components/hero/heroComponent";
import ServiceBcomponent from "@/components/Services/servicesBComponent";
import ServicesComponent from "@/components/Services/servicesComponent";
import FeaturesComponenet from "@/components/features/featuresComponenet";
import NewsLetterComponent from "@/components/newsLetter/newsLetterComponent";
import FooterComponent from "@/components/footer/footerComponent";
import { Suspense } from "react";
import LoadingSvg from "@/components//loading/loadingSvg";
import Firebase from "@/firebase/firebase";
import { useRouter } from "next/navigation";

import { registerServiceWorker } from '@/utils/service-worker';

const {auth} = Firebase;

export default function Home() {

  const user = auth.currentUser;

	const router = useRouter();

	useEffect(() => {
		registerServiceWorker();
	}, []);

	useEffect(() => {
    const pathname = window.location.pathname; 
    console.log(pathname); // Now you're using the value
  }, []); 

	useEffect(()=>{
		if (user){
			router.push("/dashboard");
		}
	},[user, router])
	
	const [qNav, setQNav] = useState("");

	const q1 = useRef<HTMLDivElement>(null);

	const q2 = useRef<HTMLDivElement>(null);

	const q3 = useRef<HTMLDivElement>(null);

	const q4 = useRef<HTMLDivElement>(null);

	const qServivice = useRef<HTMLDivElement>(null);

	const qView1 = () => q1.current?.scrollIntoView({ behavior: "smooth" });

	const qView2 = () => q2.current?.scrollIntoView({ behavior: "smooth" });

	const qView3 = () => q3.current?.scrollIntoView({ behavior: "smooth" });

	const qView4 = () => q4.current?.scrollIntoView({ behavior: "smooth" });

	const qServices = () => qServivice.current?.scrollIntoView({ behavior: "smooth" });

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

		if (qNav === "service") {
			qServices();
		}
	}, [qNav, setQNav]);

	return (
		<Suspense fallback={<LoadingSvg/>}>
		<div className="flex flex-col min-h-screen font-sans bg-gray-50">
			<header className="bg-white shadow-sm sticky top-0 z-50">
				<NavComponent setQNav={setQNav} qNav={qNav} />
			</header>
			<main className="flex-grow">
				<HeroComponent setQNav={setQNav} qNav={qNav} />
				<section
					ref={qServivice}
					id="service"
					className="md:hidden py-20  bg-white"
				>
					<ServicesComponent />
				</section>

				<section
					ref={q2}
					id="service"
					className=" hidden md:block py-20 bg-white"
				>
					<ServiceBcomponent />
				</section>

				<section
					ref={q3}
					id="features"
					className="py-20 bg-gray-100"
				>
					<FeaturesComponenet />
				</section>

				<section
					ref={q4}
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
		</Suspense>
	);
}
 