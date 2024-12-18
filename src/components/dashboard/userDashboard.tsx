"use client";

import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import {
	fetchProfiles,
	type ProfileValues,
} from "@/lib/store/features/profileSlice";
import {
	fetchFavoriteVendors
} from "@/lib/store/features/favoriteVendorsSlice";
import Firebase from "@/firebase/firebase";
import { Services } from "@/database/data";
import Image from "next/image";
import SearchSvg from "@/components/btn/searchSvg";
import TotalRate from "@/components/dashboard/totalRate";

const { auth } = Firebase;

export default function ClientDashboard() {
	const [user] = useAuthState(auth);
	const [profileDetails, setProfileDetails] = useState<ProfileValues | null>(
		null
	);
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryInput, setCategoryInput] = useState("");
	const [categoryInputView, setCategoryInputView] = useState(false);
	const [serviceInput, setServiceInput] = useState("");
	const [serviceInputView, setServiceInputView] = useState(false);

	const ServiceList = Services.find(
		(serviceList) => serviceList.category === `${categoryInput}`
	);

	function renderAvailableCategory() {
		return Services.map((category) => (
			<div
				onClick={() => {
					setCategoryInput(category.category);
					setCategoryInputView(false);
				}}
				className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
				key={category.id}
			>
				{category.category} category
			</div>
		));
	}

	function renderAvailableServices() {
		return ServiceList?.services.map((service) => (
			<div
				onClick={() => {
					setServiceInput(service.name);
					setServiceInputView(false);
				}}
				className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
				key={service.id}
			>
				{service.name} service
			</div>
		));
	}

	const dispatch = useAppDispatch();
	const { profiles } = useAppSelector((state) => state.profile);
	const { favoriteVendors } = useAppSelector((state) => state.favoriteVendor);

	useEffect(() => {
		dispatch(fetchProfiles());
		dispatch(fetchFavoriteVendors());
	}, [dispatch]);

	useEffect(() => {
		if (user && profiles.length > 0) {
			const clientDetail = profiles.find(
				(profile) => profile.email.toLowerCase() === user.email?.toLowerCase()
			);
			setProfileDetails(clientDetail || null);
		}
	}, [user, profiles]);

	const clientId = profileDetails?.docid || "";

  const filteredFevouriteVendor =
  favoriteVendors?.length > 0
    ? favoriteVendors.filter((eachItem) => {
        const text = eachItem.clientId.toLowerCase();
        return clientId !== (null || undefined || "" )
        ? text.includes(clientId.toLowerCase())
        : null
      })
    : [];

  const filteredFevouriteCategory =
  filteredFevouriteVendor?.length > 0
    ? filteredFevouriteVendor.filter((eachItem) => {
        const text = eachItem.vendorCategory.toLowerCase();
        return categoryInput !== (null || undefined || "" )
        ? text.includes(categoryInput.toLowerCase())
        : text	
      })
    : [];

const filteredFevouriteService =
  filteredFevouriteCategory?.length > 0
    ? filteredFevouriteCategory.filter((eachItem) => {
        const text = eachItem.vendorService.toLowerCase();
        return serviceInput !== (null || undefined || "" || "Select State")
          ? text.includes(serviceInput.toLowerCase())
          : text;
      })
    : [];

    const filteredFevouriteVendorName =
    filteredFevouriteService.length > 0
      ? filteredFevouriteService.filter((eachItem) => {
        const text = eachItem.vendorName.toLowerCase();
        return text.includes(searchTerm.toLowerCase());
      })
    : [];

	return (
		<main className="flex-grow container mx-auto px-4 py-8 bg-white text-black">
			<h1 className="text-4xl font-bold mb-12 border-b pb-4">
				Dashboard
			</h1>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">My Profile</h2>
				<div className="bg-gray-50 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
					<p className="mb-2">
						<strong className="text-gray-700">Name:</strong>{" "}
						{profileDetails?.name}
					</p>
					<p className="mb-2">
						<strong className="text-gray-700">Email:</strong>{" "}
						{profileDetails?.email}
					</p>
					<p>
						<strong className="text-gray-700">Location:</strong>{" "}
						{`${profileDetails?.area}, ${profileDetails?.state}, ${profileDetails?.country}`}
					</p>
				</div>
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">Favorite Vendors</h2>
				<div className="grid grid-cols-2 gap-4 mb-3">
					<div className="pb-1 pt-2 pl-2 border rounded-md">
						<div
							onClick={() => setCategoryInputView(!categoryInputView)}
							className="w-full mb-1"
						>
							{categoryInput !== ""
								? `${categoryInput} Category`
								: "Select Category"}
						</div>
						{categoryInputView && (
							<div className="grid grid-cols-1">
								{renderAvailableCategory()}
							</div>
						)}
					</div>

					<div className="pb-1 pt-2 pl-2 border rounded-md">
						<div
							onClick={() => setServiceInputView(!serviceInputView)}
							className="w-full mb-1"
						>
							{serviceInput !== ""
								? `${serviceInput} Service`
								: "Select Service"}
						</div>
						{serviceInputView && (
							<div className="grid grid-cols-1">
								{renderAvailableServices()}
							</div>
						)}
					</div>
				</div>
				<div className="mb-6 flex flex-wrap gap-4">
					<div className="relative flex-grow">
						<input
							className="w-full px-6 py-3 rounded-full text-black bg-gray-100 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors duration-300"
							placeholder="Search vendors..."
							type="email"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							required
						/>
						<div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
							<SearchSvg />
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredFevouriteVendorName.map((vendor) => (
						<div
							key={vendor.id}
							className="bg-gray-50 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105"
						>
							<div className="relative w-24 h-24 mx-auto mb-4">
								<Image
									src={vendor.vendorImg || "/placeholder.svg"}
									alt={vendor.vendorName}
									layout="fill"
									objectFit="cover"
									className="rounded-full"
								/>
							</div>
							<h3 className="text-xl font-semibold mb-2 text-center">
								{vendor.vendorName}
							</h3>
							<p className="mb-1">
								<strong className="text-gray-700">Category:</strong>{" "}
								{vendor.vendorCategory}
							</p>
							<p className="mb-1">
								<strong className="text-gray-700">Service:</strong>{" "}
								{vendor.vendorService}
							</p>
							<p>
								<strong className="text-gray-700">Rating:</strong>{" "}
								<TotalRate id={vendor.vendorId} />
							</p>
						</div>
					))}
				</div>
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">Available Services</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{Services.map((category) => (
						<div
							key={category.id}
							className="bg-gray-50 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg"
						>
							<h3 className="text-xl font-semibold mb-4 border-b pb-2">
								{category.category}
							</h3>
							<ul className="space-y-2">
								{category.services.map((service) => (
									<li key={service.id} className="flex items-center">
										<span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
										{service.name}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
