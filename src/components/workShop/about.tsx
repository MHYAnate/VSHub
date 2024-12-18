import React, { useState, useEffect } from 'react'
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/lib/store/store";
import { type ProfileValues } from '@/lib/store/features/profileSlice';


const AboutVendor: React.FC = () => {

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
		
    <div className="space-y-6">
    <div>
      <h3 className="text-lg font-medium text-gray-900">About Us</h3>
      <p className="mt-1 text-sm text-gray-600">{ profileDetails? profileDetails.about : "" }</p>
    </div>
    <div>
      <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
      <div className="mt-2 text-sm text-gray-600">
        <p>Address: { profileDetails? profileDetails.address : "" }</p>
        <p>Phone: { profileDetails? profileDetails.number : "" }</p>
        <p>Location: { profileDetails? profileDetails.area : "" }, { profileDetails? profileDetails.state : "" }, {` Nigeria.`}</p>
      </div>
    </div>
  </div>
		
	);
};

AboutVendor.displayName = "AboutVendor";
export default AboutVendor;
