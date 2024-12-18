"use client"
import React from 'react'
import { useAppSelector } from "@/lib/store/store";
import { useSearchParams } from "next/navigation";
import VendorStaffsCard from './staffCard';

interface Props{
  id : string 
}
const VendorStaffsComponent: React.FC<Props> = ({id}) => {

  const { profiles } = useAppSelector((state) => state.profile);

  const searchParams = useSearchParams();

  const vendorId = searchParams.get("docid");

  const vendorDocId = (vendorId !== undefined && vendorId !== null) ? vendorId : (id !== undefined && id !== null)? id:"";

  const filteredStaff =
  profiles?profiles.length > 0
			? profiles.filter((eachItem) => {
					const text = eachItem.isEmployedId.toLowerCase();
					return text.includes(vendorDocId.toLowerCase());
			  })
			: []:"";

  return (
    <div>
    <h3 className="text-lg font-medium text-gray-900 mb-4">Our Team</h3>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      { filteredStaff?filteredStaff.map((staff) => (
        <div key={staff.docid} className="bg-white overflow-hidden shadow rounded-lg">
          <VendorStaffsCard values={staff}/>
        </div>
      )):<></>}
    </div>
  </div>
  );
};

VendorStaffsComponent.displayName = "VendorStaffsComponent";
export default VendorStaffsComponent;