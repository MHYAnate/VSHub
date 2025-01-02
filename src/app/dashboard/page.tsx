"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import {
	fetchProfiles,
	type ProfileValues,
} from "@/lib/store/features/profileSlice";
import {
	fetchRatings,
	resetCardRating
} from "@/lib/store/features/ratingSlice";
import Firebase from "@/firebase/firebase";
import Dashboard from "@/components/dashboard/dashboard";
import Profile from "@/components/dashboard/profile";
import Settings from "@/components/dashboard/settings";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import FooterComponent from "@/components/footer/footerComponent";
import AdminMessageNotice from "@/components/notifications/notification";
import ServiceBcomponent from "@/components/Services/servicesBComponent";
import ServicesComponent from "@/components/Services/servicesComponent";
import ClientDashboard from "@/components/dashboard/userDashboard";
import JobBoard from "@/components/dashboard/jobBoard";
import SearchComponent from "@/components/filters/serviceFiter";
import { ServiceList } from "@/database/serviceData";
import LoadingSvg from "@/components/loading/loadingSvg";

const { auth } = Firebase;

export default function VendorDashboard() {
	const [user] = useAuthState(auth);
	const [profileDetails, setProfileDetails] = useState<ProfileValues | null>(
		null
	);
	const [activeTab, setActiveTab] = useState("Dash board");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [account, setAccount] = useState("")

	const dispatch = useAppDispatch();
	const { profiles } = useAppSelector((state) => state.profile);

	useEffect(() => {
		dispatch(fetchProfiles());
	}, [dispatch]);

	useEffect(() => {
		if (user && profiles.length > 0) {
			const vendorDetail = profiles.find(
				(profile) => profile.email.toLowerCase() === user.email?.toLowerCase()
			);
			setProfileDetails(vendorDetail || null);
		}
	}, [user, profiles]);

	useEffect(() => {
		if (user) {
			dispatch(fetchRatings(profileDetails?.docid || ""));
		}
		return () => {
			if (user) {
				dispatch(resetCardRating(profileDetails?.docid || ""));
			}
		};
	}, [dispatch, user, profileDetails?.docid]);

	const router = useRouter();

	const SingOut = () => {
		signOut(auth)
			.then(() => {
				router.push("/login");
			})
			.catch((error) => {
				console.log(error)
			});
	};

	useEffect(() => {
		if (user) {
			setAccount(profileDetails?.isVendor === "true"? "vendor":profileDetails?.isVendor === "false"? "client":""); 
		}
	}, [user, profileDetails]);

	return (
		<div className="min-h-screen bg-white text-black flex flex-col">
			<header className="bg-black text-white p-4">
				<div className="container mx-auto flex justify-between items-center border-black bg-black">
					<Link href="/dashboard" className="flex items-center space-x-2 bg-black transition-transform duration-300 hover:scale-95">
						<Image
							src="/service/1xi.jpg"
							alt="VSHub Logo"
							width={40}
							height={40}
							className="rounded-full bg-black"
						/>
						<span
							className={`text-2xl font-bold  font-[family-name:var(--ProtestGuerrilla)] text-white`}
						>
							Sspot1
						</span>
					</Link>
					<SearchComponent serviceList={ServiceList} />
					<div className="flex items-center space-x-4">
						<span className="text-sm hidden md:inline">
							Welcome, {profileDetails?.name}
						</span>
						{profileDetails?.src === "" ?<Image
							src={"/service/u1.jpg"}
							alt={profileDetails?.name || "Vendor"}
							width={40}
							height={40}
							className="hidden sm:block rounded-full border-2 border-white"
						/> :<Image
							src={profileDetails?.src !== undefined? profileDetails?.src :"/service/u1.jpg"}
							alt={profileDetails?.name || "Vendor"}
							width={40}
							height={40}
							className="hidden sm:block rounded-full border-2 border-white "
						/>  }
						
							
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="md:hidden text-white focus:outline-none"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16m-7 6h7"
								/>
							</svg>
						</button>
						<AdminMessageNotice />
					</div>
				</div>
			</header>

			<nav
				className={`bg-gray-100 md:block ${isMenuOpen ? "block" : "hidden"}`}
			>
				<div className="container mx-auto px-4 py-2">
					<ul className="flex flex-col md:flex-row md:space-x-8">
						
						{["Dash board", "Profile", "Job Board", "Settings", "Service spot"].map((item) => (
							<li className={(item ==="Profile" && account === "client"? "hidden":"")} key={item}>
								<button
									onClick={() => setActiveTab(item)}
									className={`w-full text-left py-2 px-4 rounded font-[family-name:var(--Poppins-Bold)] transition-colors ${
										activeTab === item
											? "bg-black text-white"
											: "text-gray-700 hover:bg-gray-200"
									}`}
								>
									{item}
								</button>
							</li>
						))}
						<li onClick={SingOut}>
							<button
								className={`w-full text-left py-2 px-4 rounded font-[family-name:var(--Poppins-Bold)]  transition-colors text-gray-700  hover:bg-gray-200 `}
							>
								Log Out
							</button>
						</li>
					</ul>
				</div>
			</nav>

			{activeTab === "Dash board" && account === "" && <LoadingSvg/> }

			{activeTab === "Dash board" && account === "vendor" && <Dashboard/>}

			{activeTab === "Dash board" && account ==="client" && <ClientDashboard />}

			{activeTab === "Profile" && <Profile />}

			{activeTab === "Job Board" && <JobBoard vendorId={`${profileDetails?.docid}`} vendorService={`${profileDetails?.service}`} vendorAddress={`${profileDetails?.address}`} vendorImage={`${profileDetails?.src}`} vendorName={`${profileDetails?.name}`} vendorNumber={`${profileDetails?.number}`} profiles={profiles}/>  }

			{activeTab === "Settings" && <Settings  isVendor={`${profileDetails?.isVendor}`} docid={`${profileDetails?.docid}`}/>}

			{activeTab === "Service spot" && (
				<>
					<section id="service" className=" hidden md:block py-20 bg-white">
						<ServiceBcomponent />
					</section>
					<section id="services" className="md:hidden py-20  bg-white">
						<ServicesComponent />
					</section>
				</>
			)}

			<FooterComponent />
		</div>
	);
}
