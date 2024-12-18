"use client";
import React from "react";
import {
	type RateValue,
} from "@/lib/store/features/ratingSlice";

interface PropsValues {
  ratings: RateValue[];
	id:string;
}

export default function ClientRating({ratings,  id }:PropsValues) {


	const value = ratings.find((value) => value.docid === `${id}`);

	return (
		<span
			className={`px-2 py-1 rounded-full text-xs font-semibold
    ${
			value
				? value?.rate >= 4
					? "bg-green-100 text-green-800"
					: value?.rate < 4 && value?.rate >= 3
					? "bg-yellow-100 text-yellow-800"
					: value?.rate < 3
					? "bg-blue-100 text-blue-800"
					: "bg-gray-100 text-gray-800"
				: ""
		}`}
		>
			{value?.rate}
		</span>
	);
};

