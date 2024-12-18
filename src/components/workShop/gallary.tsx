"use client"
import React, { useState, useEffect } from 'react'
import { useAppSelector } from "@/lib/store/store";
import { useSearchParams } from "next/navigation";
import { type ProfileValues } from '@/lib/store/features/profileSlice';
import Image from 'next/image'

const VendorGallaryComponent: React.FC = () => {

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

	return (
    <div>
    <h3 className="text-lg font-medium text-gray-900 mb-4">Gallery</h3>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
     
        <div  className="relative h-64 w-full overflow-hidden rounded-lg">
          <Image
            src={profileDetails?profileDetails.gallaryImg1:""}
            alt={profileDetails?profileDetails.name:""}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        <div  className="relative h-64 w-full overflow-hidden rounded-lg">
          <Image
            src={profileDetails?profileDetails.gallaryImg2:""}
            alt={profileDetails?profileDetails.name:""}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        <div  className="relative h-64 w-full overflow-hidden rounded-lg">
          <Image
            src={profileDetails?profileDetails.gallaryImg3:""}
            alt={profileDetails?profileDetails.name:""}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
        </div>
    
    </div>
  </div>
	);
};

VendorGallaryComponent.displayName = "VendorGallaryComponent";
export default VendorGallaryComponent;
