"use client";
import React from "react";
import { useAppSelector } from "@/lib/store/store";
import { type RateValue } from "@/lib/store/features/ratingSlice";
import RenderStars from "./renderStar";
import { useSearchParams } from "next/navigation";

const Reviews: React.FC = () => {
	const searchParams = useSearchParams();

	const vendorId = searchParams.get("vendorId");

	const vendorDocId = vendorId ? vendorId : "";

	const cardRatings = useAppSelector(
		(state) =>
			state.rating.ratingsByCard[vendorDocId] || {
				ratings: [] as RateValue[],
				totalRate: 0,
				loading: false,
				error: null,
			}
	);

	const { ratings, totalRate } = cardRatings;

	const finalRate = Math.round(ratings.length ? totalRate / ratings.length : 0);

	return (
		<div>
			<h3 className="text-lg font-medium text-gray-900 mb-4">
				Customer Reviews
			</h3>
			<div className="flex items-center">
				<RenderStars rating={totalRate} />
				<p className="ml-2 text-sm text-gray-600">
					{finalRate} ({ratings.length} reviews)
				</p>
			</div>
			<div className="space-y-4">
				{ratings.map((testimonial) => (
					<div
						key={testimonial.docid}
						className="bg-white overflow-hidden shadow rounded-lg"
					>
						<div className="px-4 py-5 sm:p-6">
							<div className="flex items-center justify-between">
								<h4 className="text-lg font-semibold text-gray-900">
									{testimonial.raterName}
								</h4>
								<div className="flex items-center">
									<RenderStars rating={Number(testimonial.rate)} />
								</div>
							</div>
							<p className="mt-1 text-sm text-gray-600">
								{testimonial.feedback}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

Reviews.displayName = "Reviews";
export default Reviews;
