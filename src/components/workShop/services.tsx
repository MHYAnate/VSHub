"use client";
import React from "react";
import { useAppSelector } from "@/lib/store/store";
import { useSearchParams } from "next/navigation";

const VendorServicesComponent: React.FC = () => {
	const { offers } = useAppSelector((state) => state.offer);

	const searchParams = useSearchParams();

	const vendorId = searchParams.get("docid");

	const vendorDocId = vendorId ? vendorId : "";

	const filteredOffers = offers
		? offers.length > 0
			? offers.filter((eachItem) => {
					const text = eachItem.vendorId.toLowerCase();
					return text.includes(vendorDocId.toLowerCase());
			  })
			: []
		: "";

	return (
		<div>
			<h3 className="text-lg font-medium text-gray-900 mb-4">Our Services</h3>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{filteredOffers?filteredOffers.map((offer) => (
					<div
						key={offer.docid}
						className="bg-white overflow-hidden shadow rounded-lg"
					>
						<div className="px-4 py-5 sm:p-6">
							<h4 className="text-lg font-semibold text-gray-900">
								{offer.title}
							</h4>
							<p className="mt-1 text-sm text-gray-600">{offer.detail}</p>
							<p className="mt-2 text-sm font-medium text-gray-900">
								{offer.price}
							</p>
						</div>
					</div>
				)):<></>}
			</div>
		</div>
	);
};

VendorServicesComponent.displayName = "VendorServicesComponent";
export default VendorServicesComponent;
