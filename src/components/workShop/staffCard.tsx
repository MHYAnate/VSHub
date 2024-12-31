"use client";
import React from "react";
import { useAppSelector } from "@/lib/store/store";
import { type RateValue } from "@/lib/store/features/ratingSlice";
import RenderStars from "./renderStar";
import Image from "next/image";

type Values = {
	values: {
		category: string;
		service: string;
		specialty: string;
		ranking: string;
		docid: string;
		src: string;
		name: string;
		number: string;
		address: string;
		state: string;
		area: string;
		about: string;
		accountNumber: string;
		accountName: string;
		bankName: string;
		isVendor: string;
		isEmployedId: string;
		isVerified: string;
	} | null;
};

const VendorStaffsCard: React.FC<Values> = ({ values }) => {
  
	const cardRatings = useAppSelector(
		(state) =>
			state.rating.ratingsByCard[values ? values.docid : ""] || {
				ratings: [] as RateValue[],
				totalRate: 0,
				loading: false,
				error: null,
			}
	);

	const { ratings, totalRate } = cardRatings;

	return (
		<div className="px-4 py-5 sm:p-6">
			<div className="flex items-center">
				<div className="flex-shrink-0 h-12 w-12">
					
					<Image
						className="h-12 w-12 rounded-full"
						src={ values?.src  || "/service/u1.jpg"}
						alt={values ? values.name : ""}
						width={48}
						height={48}
					/>
				</div>
				<div className="ml-4">
					<h4 className="text-lg font-semibold text-gray-900">
						{values?.name}
					</h4>
					<p className="text-sm text-gray-600">{values?.ranking}</p>
					<div className="flex items-center">
						<RenderStars rating={totalRate} />
						<p className="ml-2 text-sm text-gray-600">
							{totalRate.toFixed(1)} ({ratings.length} reviews)
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

VendorStaffsCard.displayName = "VendorStaffsCard";
export default VendorStaffsCard;
