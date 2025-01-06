"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RateValue } from "@/lib/store/features/ratingSlice";


interface Props {
	id: string;
  profiles:RateValue[];
}
const StarIcon: React.FC<{ className?: string; fill?: string }> = ({
	className = "w-6 h-6",
	fill = "currentColor",
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill={fill}
		viewBox="0 0 24 24"
		stroke="currentColor"
		className={className}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
		/>
	</svg>
);

export default function RatingsComponent({ id, profiles }: Props) {

  const [openFeedBack, setOpenFeedBack] = useState(false);

  const rates = profiles.filter((eachItem) =>
    id ? eachItem.rateeId.toLowerCase().includes(id.toLowerCase()) : true
  );

  const totalRate = rates.reduce((total, rater) => total + rater.rate, 0);
  const finalRate = Math.round(rates.length ? totalRate / rates.length : 0);

	return (
		<div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
			<div className="flex items-center space-x-4">
				<div className="flex items-center space-x-1">
					<span className="text-2xl font-bold">{finalRate}</span>
					<StarIcon fill="gold" className="w-6 h-6" />
				</div>
				<span className="text-gray-500">({rates.length} reviews)</span>
				<button
					onClick={() => setOpenFeedBack(!openFeedBack)}
					className={`text-sm md:text-lg px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${
						rates.length === 0 ? "opacity-50 cursor-not-allowed" : ""
					}`}
					disabled={rates.length === 0}
				>
					{rates.length === 0
						? "No Feedback Yet"
						: openFeedBack
						? "Hide Feedbacks"
						: "Show Feedbacks"}
				</button>
			</div>
			{openFeedBack && (
				<div className="space-y-4">
					{rates.map((rating) => (
						<div
							key={rating.raterId}
							className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
						>
							<Image
								src={rating.raterImg || "/service/u1.jpg"}
								alt={rating.raterName}
								width={50}
								height={50}
								className="rounded-full object-cover"
							/>
							<div className="flex-1">
								<p className="font-semibold text-gray-800">
									{rating.raterName}
								</p>
								<div className="flex items-center space-x-1 my-1">
									<span>{rating.rate}</span>
									<StarIcon fill="gold" className="w-4 h-4" />
								</div>
								<p className="text-gray-600 mt-2">{rating.feedback}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
