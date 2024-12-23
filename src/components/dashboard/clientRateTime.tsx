"use client";

import React, { useState, useEffect } from "react";
import { type RateValue } from "@/lib/store/features/ratingSlice";
import { formatTimestamp } from "@/lib/utils/dateFormatter";

interface PropsValues {
  clientId: string;
  ratings: RateValue[];
}

export default function ClientRateTime({ clientId, ratings }: PropsValues) {
  const [profileDetails, setProfileDetails] = useState<RateValue | null>(null);

  useEffect(() => {
    const vendorDetail = ratings.find(
      (profile) => profile.raterId.toLowerCase() === clientId.toLowerCase()
    );
    setProfileDetails(vendorDetail || null);
  }, [clientId, ratings]);

  const timestamp = profileDetails?.createdAt ? Number(profileDetails.createdAt) : null;
  
  return <>{timestamp ? formatTimestamp(timestamp) : ""}</>;
}