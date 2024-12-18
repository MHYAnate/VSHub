import React, { useState, useEffect } from 'react'
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/lib/store/store";
import { type ProfileValues } from '@/lib/store/features/profileSlice';



const Header: React.FC = () => {

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
		
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold  text-gray-900 font-[family-name:var(--Poppins-SemiBold)]">{ profileDetails? profileDetails.name : ""}'s Workspace</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <div  className="text-gray-600 hover:text-gray-900 font-[family-name:var(--Poppins-Bold)]">
                  Home
                </div>
              </li>
              <li>
                <div className="text-gray-600 hover:text-gray-900 font-[family-name:var(--Poppins-Bold)]">
                {`${ profileDetails? profileDetails.category : ""} Vendors Hub`}
                </div>
              </li>
            </ul>
          </nav>
        </div>
		
	);
};

Header.displayName = "Header";
export default Header;
