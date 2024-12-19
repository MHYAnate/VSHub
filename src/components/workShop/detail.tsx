"use client";

import React, { useState, useEffect }  from "react";
import { useAppSelector } from "@/lib/store/store";
import {  type RateValue } from '@/lib/store/features/ratingSlice';
import { type ProfileValues } from '@/lib/store/features/profileSlice';
import { useSearchParams } from "next/navigation";
import RenderStars from "./renderStar";
import Image from "next/image";

const DetailHead: React.FC = () => {
  

  const [profileDetails, setProfileDetails] = useState<ProfileValues | null>(null);

  const { profiles } = useAppSelector((state) => state.profile);

  const searchParams = useSearchParams();

  const vendorId = searchParams.get("docid");

  const vendorDocId = vendorId ? vendorId : "";

  useEffect(() => {
    // Handle auth state changes
    const vendorDetail = profiles.find(
      (profile) => profile.docid.toLowerCase() === vendorDocId.toLowerCase()
    );
    setProfileDetails(vendorDetail || null);
    
  }, [profiles, vendorDocId]);

  const cardRatings = useAppSelector(
    (state) =>
      state.rating.ratingsByCard[vendorDocId] || {
        ratings: [] as RateValue[],
        totalRate: 0,
        loading: false,
        error: null,
      }
  );


  const { ratings, totalRate, } = cardRatings;

  const finalRate = Math.round(ratings.length ? totalRate / ratings.length : 0);
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <div className="h-48 w-full md:w-48 bg-gray-300 flex items-center justify-center text-gray-500">
            {profileDetails?.src ? (
              <Image
                src={profileDetails.src}
                alt={profileDetails.name}
                width={192}
                height={192}
                className="object-cover h-full w-full"
              />
            ) : (
              "No image"
            )}
          </div>
        </div>
        <div className="p-8 w-full">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {profileDetails ? profileDetails.name : ""}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {profileDetails ? profileDetails.service : ""}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {profileDetails ? profileDetails.specialty : ""}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center">
                <RenderStars rating={finalRate} />
                <p className="ml-2 text-sm text-gray-600">
                  {finalRate} ({ratings.length} reviews)
                </p>
              </div>
              {profileDetails?.isVerified === "true" && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                  Verified
                </span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
            <div className="bg-gray-100 rounded-lg p-4 h-48 flex items-center justify-center"> 
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Address</h4>
              <p className="mt-1 text-sm text-gray-900">{profileDetails?.address}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Area</h4>
              <p className="mt-1 text-sm text-gray-900">{profileDetails?.area}, {profileDetails?.state}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Contact</h4>
              <p className="mt-1 text-sm text-gray-900">{profileDetails?.number}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Category</h4>
              <p className="mt-1 text-sm text-gray-900">{profileDetails?.category}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DetailHead.displayName = "DetailHead";
export default DetailHead;