"use client";

import React, { useState, useEffect } from "react";
import { type RateValue } from "@/lib/store/features/ratingSlice";

interface PropsValues {
  clientId: string;
  ratings: RateValue[];
}


export default function ClientRating({ clientId, ratings }: PropsValues) {


  const [profileDetails, setProfileDetails] = useState<RateValue | null>(null);

  useEffect(() => {
    const vendorDetail = ratings.find(
      (profile) => profile.raterId.toLowerCase() === clientId.toLowerCase()
    );
    setProfileDetails(vendorDetail || null);
  }, [clientId, ratings]);

	return (
		<span
			className={`px-2 py-1 rounded-full text-xs font-semibold
    ${
			profileDetails
				? profileDetails?.rate >= 4
					? "bg-green-100 text-green-800"
					: profileDetails?.rate < 4 && profileDetails?.rate >= 3
					? "bg-yellow-100 text-yellow-800"
					: profileDetails?.rate < 3
					? "bg-blue-100 text-blue-800"
					: "bg-gray-100 text-gray-800"
				: ""
		}`}
		>
			{profileDetails?.rate}
		</span>
	);
};

