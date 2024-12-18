"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import RateUs from "@/components/btn/rateUs";
import Pagination from "@/components/btn/paginationBtn";
import { useAppSelector } from "@/lib/store/store";

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

	const vendors = Vendors ? Vendors : "";

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-[200px]">
				<div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>
			</div>
		);
	}

	const filteredVendorHub =
		profiles?.length > 0
			? profiles.filter((eachItem) => {
					const text = eachItem.service.toLowerCase();
					return vendors !== null && vendors !== undefined && vendors !== ""
						? text.includes(vendors.toLowerCase())
						: text;
			  })
			: [];

	const filteredListstate =
		filteredVendorHub?.length > 0
			? filteredVendorHub.filter((eachItem) => {
					const text = eachItem.state.toLowerCase();
					return selectState !== null &&
						selectState !== undefined &&
						selectState !== "" &&
						selectState !== "Select State"
						? text.includes(selectState.toLowerCase())
						: text;
			  })
			: [];

	const filteredListarea =
		filteredListstate.length > 0
			? filteredListstate.filter((eachItem) => {
					const text = eachItem.area.toLowerCase();
					return selectArea !== null &&
						selectArea !== undefined &&
						selectArea !== "" &&
						selectArea !== "Select Area"
						? text.includes(selectArea.toLowerCase())
						: text;
			  })
			: [];

	const filteredList =
		filteredListarea.length > 0
			? filteredListarea.filter((eachItem) => {
					const text = eachItem.address.toLowerCase();
					return text.includes(searchInput.toLowerCase());
			  })
			: [];

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredList.slice(indexOfFirstPost, indexOfLastPost);

	// Change page
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
		console.log(profiles);

		return currentPosts.map((vendor) => (
			<div
				className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
				key={vendor.docid}
			>
				<div className="p-6">
					<h2 className="text-xl font-semibold mb-2">{vendor.name}</h2>
					<div className="relative h-48 mb-4">
						<Image
							className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
							src={vendor.src || "/service/u1.jpg"}
							alt={`${vendor.name}'s image`}
							layout="fill"
							quality={100}
						/>
					</div>
					<RateUs
						rateeId={`${vendor.docid}`}
						raterId={raterDetail?.docid || ""}
						raterName={raterDetail?.name || ""}
						raterImg={raterDetail?.src || ""}
					/>
					<p className="text-lg font-semibold mt-4 mb-2">{vendor.specialty}</p>
					<div className="space-y-2">
						<div>
							<p className="font-medium text-gray-600">Address</p>
							<p className="font-semibold">{vendor.address}</p>
						</div>
						<div>
							<p className="font-medium text-gray-600">Contact</p>
							<p className="font-semibold">{vendor.number}</p>
						</div>
					</div>
				</div>
				<button
					onClick={() =>
						router.push(
							`/vendorWorkSpace` + "?" + set("docid", `${vendor.docid}`)
						)
					}
					className="w-full py-3 px-4 bg-zinc-900 text-white font-bold rounded-b-lg hover:bg-zinc-950 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
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

AvailableVendors.displayName = "AvailableVendors";
export default AvailableVendors;
