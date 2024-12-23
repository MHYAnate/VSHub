"use client";

import React, { useState, useEffect } from "react";
import { type RateValue } from "@/lib/store/features/ratingSlice";

interface PropsValues {
  clientId: string;
  ratings: RateValue[];
}

export default function ClientFeedBack({ clientId, ratings }: PropsValues) {
  const [profileDetails, setProfileDetails] = useState<RateValue | null>(null);

  useEffect(() => {
    const vendorDetail = ratings.find(
      (profile) => profile.raterId.toLowerCase() === clientId.toLowerCase()
    );
    setProfileDetails(vendorDetail || null);
  }, [clientId, ratings]);

  return <>{profileDetails?.feedback}</>;
}