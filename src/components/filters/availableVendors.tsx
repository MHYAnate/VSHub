"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/btn/paginationBtn";
import { useAppSelector } from "@/lib/store/store";
import CustomerBtn from "@/components/btn/customer";
import RatingsComponent from "./ratings";
import { RateValue } from "@/lib/store/features/ratingSlice";
import { collection, getDocs } from "firebase/firestore";
import firebase from "@/firebase/firebase";
import ContactSvg from "../btn/contactSvg";

interface RaterValue {
	name: string;
	docid: string;
	src: string;
}

interface VendorProps {
	selectState: string;
	selectArea: string;
	searchInput: string;
	raterDetail: RaterValue | null;
}

const AvailableVendors: React.FC<VendorProps> = ({
	selectState,
	selectArea,
	searchInput,
	raterDetail,
}) => {
	const searchParams = useSearchParams();

	const router = useRouter();

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);

	const [ratings, setRatings] = useState<RateValue[]>([]);

	const { database } = firebase;
	const profileDetailRef = collection(database, "rateUs");

	// const handleGetProfileDetail = async () => {
	//   try {
	//     const querySnapshot = await getDocs(profileDetailRef);

	//     if (querySnapshot.empty) {
	//       console.log("No profile details found");
	//       return;
	//     }

	//     // Transform the data into an array of RateValue objects
	//     const retrievedData: RateValue[] = [];
	//     querySnapshot.forEach((doc) => {
	//       const data = doc.data() as RateValue;
	//       retrievedData.push(data);
	//     });

	//     setRatings(retrievedData);
	//   } catch (error) {
	//     console.error("Error getting profile detail:", error);
	//     setRatings([]); // Set empty array on error
	//   }
	// };

	// useEffect(() => {
	//   handleGetProfileDetail();
	// }, [handleGetProfileDetail]);

	useEffect(() => {
		const fetchProfileDetails = async () => {
			try {
				const querySnapshot = await getDocs(profileDetailRef);

				if (querySnapshot.empty) {
					console.log("No profile details found");
					return;
				}

				const retrievedData: RateValue[] = [];
				querySnapshot.forEach((doc) => {
					const data = doc.data() as RateValue;
					retrievedData.push(data);
				});

				setRatings(retrievedData);
			} catch (error) {
				console.error("Error getting profile detail:", error);
				setRatings([]);
			}
		};

		fetchProfileDetails();
	}, [database, profileDetailRef]); // Only depends on database instance

	const set = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);
			return params.toString();
		},
		[searchParams]
	);

	const { profiles, error } = useAppSelector((state) => state.profile);

	const Vendors = searchParams.get("name");
	const vendors = Vendors ?? "";

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-[200px]">
				<div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>
			</div>
		);
	}

	const filteredVendorHub =
		profiles?.filter((eachItem) =>
			vendors
				? eachItem.service.toLowerCase().includes(vendors.toLowerCase())
				: true
		) ?? [];

	const filteredListstate = filteredVendorHub.filter((eachItem) =>
		selectState && selectState !== "Select State"
			? eachItem.state.toLowerCase().includes(selectState.toLowerCase())
			: true
	);

	const filteredListarea = filteredListstate.filter((eachItem) =>
		selectArea && selectArea !== "Select Area"
			? eachItem.area.toLowerCase().includes(selectArea.toLowerCase())
			: true
	);

	const filteredList = filteredListarea.filter((eachItem) =>
		eachItem.address.toLowerCase().includes(searchInput.toLowerCase())
	);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredList.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	function renderVendors() {
		if (filteredList.length === 0) {
			return (
				<div className="col-span-full text-center py-8">
					<p className="text-lg font-semibold text-gray-600">
						No vendors found
					</p>
				</div>
			);
		}

		return currentPosts.map((vendor) => (
			<div
				className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
				key={vendor.docid}
			>
				<div className="p-6 space-y-4">
					<div className="flex justify-between items-center w-full">
						<h2 className="text-xl font-semibold text-gray-900">
							{vendor.name}
						</h2>
						<CustomerBtn
							vendorData={vendor}
							clientId={raterDetail?.docid || ""}
						/>
					</div>

					<div className="relative">
						<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
						<Image
							src={vendor.src || "/service/u1.jpg"}
							alt={`${vendor.name}'s image`}
							width={400}
							height={300}
							className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
						/>
						<div className="absolute bottom-0 left-0 right-0 p-6">
							<h2 className="text-2xl font-bold text-white mb-2">
								{vendor.service}
							</h2>
							<div className="flex flex-wrap gap-2">
								<p className="font-medium text-white">Years Of Experience</p>
								<p className="w-fit px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
									{vendor.yearsOfExperience}
								</p>
							</div>
						</div>
					</div>

					<div className="">
						<RatingsComponent id={vendor.docid} profiles={ratings} />
					</div>

					<div className="space-y-3">
						<p className="w-fit px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
							{vendor.specialty}
						</p>
            <div className="flex items-center space-x-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-500"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="text-sm text-gray-700">{vendor.address}</span>
						</div>
            <div className="flex items-center space-x-2">
						<ContactSvg/>
							<span className="text-sm  text-gray-700">{vendor.number}</span>
						</div>
					</div>
				</div>
				<button
					onClick={() =>
						router.push(
							`/vendorWorkSpace` +
								"?" +
								set("vendorId", `${vendor.docid}`) +
								"&" +
								set("rId", `${raterDetail?.docid}`) +
								"&" +
								set("rName", `${raterDetail?.name}`) +
								"&" +
								set("rSrc", `${raterDetail?.src}`)
						)
					}
					className="w-full py-3 px-4 bg-black text-white font-bold transition-colors duration-300 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 "
				>
					Enter Work Space
				</button>
			</div>
		));
	}

	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{renderVendors()}
			</div>
			<Pagination
				postsPerPage={postsPerPage}
				totalPosts={filteredList.length}
				paginate={paginate}
				currentPage={currentPage}
			/>
		</div>
	);
};

export default AvailableVendors;
