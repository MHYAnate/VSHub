"use client";

import React, { useState, useEffect, useCallback } from "react";
import SearchSvg from "../btn/searchSvg";
import XSvg from "../btn/xSvg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface ServiceItem {
	id: number;
	name: string;
	src: string;
	link: string;
}

interface SearchComponentProps {
	serviceList: ServiceItem[];
}

interface SearchComponentProps {
	serviceList: ServiceItem[];
}

export default function SearchComponent({ serviceList }: SearchComponentProps) {
	const searchParams = useSearchParams();
	const router = useRouter();

	const set = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);
			return params.toString();
		},
		[searchParams]
	);

	const [searchInput, setSearchInput] = useState("");

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);
	};

	const filteredList = serviceList.filter((eachItem) =>
		eachItem.name.toLowerCase().includes(searchInput.toLowerCase())
	);

	function SearchResults({ serviceList }: SearchComponentProps) {
		if (serviceList.length === 0) {
			return <p className="text-center text-gray-600 ">No Service found</p>;
		}

		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{serviceList.map((service) => (
					<div
						key={service.id}
						onClick={() => {
							router.push(
								`/vendorsHub?${set("name", service.name)}&${set(
									"isrc",
									service.src
								)}`
							);
							setIsOpen(false);
						}}
						className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
					>
						<div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
							<Image
								src={service.src}
								alt={service.name}
								layout="fill"
								objectFit="cover"
								className="transition-transform duration-300 hover:scale-110"
							/>
						</div>
						<h3 className="text-lg font-semibold text-gray-900 ">
							{service.name}
						</h3>
					</div>
				))}
			</div>
		);
	}

	const [scrolled, setScrolled] = useState(false);

	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className={`relative`}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`
					group flex items-center justify-between
					px-4 py-2 rounded-full
					transition-all duration-300 ease-in-out
					transform hover:scale-105 focus:outline-none
					${
						scrolled
							? "bg-gradient-to-r from-slate-500 to-slate-950 text-white shadow-lg hover:shadow-xl"
							: "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
					}
					border-2 border-transparent hover:border-white
				`}
				aria-label="Toggle search"
			>
				<span className="font-bold text-sm sm:text-base mr-2">
					Search Services
				</span>
				<div
					className={`
        p-1 rounded-full
        ${scrolled ? "bg-white text-black" : "bg-black text-yellow-400"}
        transition-all duration-300 ease-in-out
        group-hover:rotate-90
      `}
				>
					<SearchSvg />
				</div>
			</button>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-start justify-center pt-20 transition-all duration-300 ease-in-out backdrop-blur-sm bg-black/30 dark:bg-white/10">
					<div
						className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${
							isMobile ? "w-full mx-4" : "max-w-4xl w-full"
						} max-h-[80vh] transform transition-all duration-300 ease-in-out scale-100 translate-y-0 flex flex-col`}
					>
						<div className="p-6 border-b border-gray-200 ">
							<div className="relative">
								<input
									value={searchInput}
									onChange={updateSearchInput}
									id="vendorAddress"
									className="w-full bg-transparent text-gray-900  border-b-2 border-gray-300 dark:border-gray-700 focus:border-blue-500  py-2 px-4 outline-none transition-all duration-300"
									placeholder="Search services..."
								/>
							</div>
							<div className="flex justify-end mt-4 space-x-2">
								<button
									type="button"
									onClick={() => setIsOpen(false)}
									className="text-gray-500  hover:text-gray-700  transition-colors duration-300 "
									aria-label="Close search"
								>
									<XSvg />
								</button>
							</div>
						</div>
						<div className="flex-grow overflow-auto p-6">
							<SearchResults serviceList={filteredList} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
