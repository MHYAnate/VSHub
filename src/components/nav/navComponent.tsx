"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Firebase from "@/firebase/firebase";
import SearchComponent from "../filters/serviceFiter";
import { ServiceList } from "@/database/serviceData";

interface Props {
	setQNav: (value: string) => void;
	qNav: string;
}

export default function NavComponent({ setQNav, qNav }: Props) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [user, setUser] = useState(Firebase.auth.currentUser);

	const { auth } = Firebase;
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
		});
		return () => unsubscribe();
	}, [auth]);

	const navItems = [
		{
			label: "Services",
			action: () => setQNav(qNav === "service" ? "" : "service"),
		},
		{
			label: "Features",
			action: () => setQNav(qNav === "features" ? "" : "features"),
		},
		{
			label: "Contact",
			action: () => setQNav(qNav === "contact" ? "" : "contact"),
		},
	];

	const renderAuthButton = () => {
		if (user) return null;
		if (pathname === "/login") {
			return (
				<div
					onClick={() => router.push("/register")}
					className="px-4 py-2 mx-2 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-300 cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5"
				>
					Register
				</div>
			);
		}
		if (pathname === "/register") {
			return (
				<div
					onClick={() => router.push("/login")}
					className="text-sm font-medium text-gray-600 hover:text-black transition-all duration-300 cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
				>
					Log In
				</div>
			);
		}
		return (
			<>
				<div
					onClick={() => router.push("/login")}
					className="text-sm ml-2 font-medium text-gray-600 hover:text-black transition-all duration-300 cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
				>
					Log In
				</div>
				<div
					onClick={() => router.push("/register")}
					className={`${scrolled? "text-gray-600 bg-black rounded-full hover:bg-gray-800 transition-all duration-300 cursor-pointer":"text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-300 cursor-pointer"} px-4 py-2 text-sm text-center font-medium text-white  hover:shadow-lg transform hover:-translate-y-0.5 mx-2`}
				>
					Register
				</div>
			</>
		);
	};

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled ? "bg-white shadow-md " : "bg-transparent"
			}`}
		>
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<div
						onClick={() => router.push("/")}
						className={`${
							scrolled
								? "pl-2 pr-3"
								: "bg-gradient-to-br from-black to-gray-900 rounded-full pl-2 pr-3"
						} flex items-center space-x-2 select-none cursor-pointer`}
					>
						<div
							className={`relative w-10 h-10 overflow-hidden rounded-full ${
								scrolled ? "bg-gray-200" : "bg-black"
							}`}
						>
							<Image
								src={scrolled ? "/service/1x.jpg" : "/service/1x.jpg"}
								alt="VSHub Logo"
								layout="fill"
								objectFit="cover"
								className="transition-transform duration-300 hover:scale-110"
							/>
						</div>
						<span
							className={`text-lg md:text-2xl font-bold font-[family-name:var(--ProtestGuerrilla)] ${
								scrolled ? "text-black" : "text-white"
							} `}
						>
						Sspot1
							
						</span>
					</div>

          {pathname === "/"   && <SearchComponent serviceList={ServiceList} />}


					{pathname === "/" && (
						<>
							<nav className="hidden md:flex items-center space-x-6">
								{navItems.map((item, index) => (
									<div
										key={index}
										onClick={item.action}
										className="text-sm font-medium text-gray-600 hover:text-black transition-all duration-300 cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
									>
										{item.label}
									</div>
								))}
								{renderAuthButton()}
							</nav>
							
						</>
					)}

					{pathname !== "/" && (
						<nav className="hidden md:flex items-center space-x-6">
							{renderAuthButton()}
						</nav>
					)}

					<button
						className="md:hidden text-black hover:text-gray-600 transition-colors duration-300 focus:outline-none"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label="Toggle mobile menu"
					>
						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d={
									mobileMenuOpen
										? "M6 18L18 6M6 6l12 12"
										: "M4 6h16M4 12h16M4 18h16"
								}
							/>
						</svg>
					</button>
				</div>

				{mobileMenuOpen && (
					<nav className="mt-4 md:hidden rounded-lg pb-1">
						<div className="flex flex-col space-y-2">
							{pathname === "/" &&
								navItems.map((item, index) => (
									<div
										key={index}
										onClick={() => {
											item.action();
											setMobileMenuOpen(false);
										}}
										className={`${scrolled? "text-gray-600":"text-white bg-black"} text-sm font-medium text-gray-600 hover:text-black transition-all duration-300 cursor-pointer ml-2`}
									>
										{item.label}
									</div>
								))}
							{renderAuthButton()}
						</div>
					</nav>
				)}
			</div>
		</header>
	);
}
