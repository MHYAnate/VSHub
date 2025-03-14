"use client"
import React from 'react'
import { useAppSelector } from "@/lib/store/store";
import { useSearchParams } from "next/navigation";
import VendorStaffsCard from './staffCard';
import { RateValue } from '@/lib/store/features/ratingSlice';

interface Props{
  id : string 
  rating:RateValue[]
}
const VendorStaffsComponent: React.FC<Props> = ({id, rating}) => {

  const { profiles } = useAppSelector((state) => state.profile);

  const searchParams = useSearchParams();

  const vendorId = searchParams.get("vendorId");


  const filteredStaff =
  profiles?profiles.length > 0
			? profiles.filter((eachItem) => {
					const text = eachItem.isEmployedId.toLowerCase();
					return text.includes(vendorId?vendorId.toLowerCase(): id.toLowerCase());
			  })
			: []:"";

  return (
    <div>
    <h3 className="text-lg font-medium text-gray-900 mb-4">Our Team</h3>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      { filteredStaff?filteredStaff.map((staff) => (
        <div key={staff.docid} className="bg-white overflow-hidden shadow rounded-lg">
          <VendorStaffsCard values={staff} rating={rating}/>
        </div>
      )):<></>}
    </div>
  </div>
  );
};

VendorStaffsComponent.displayName = "VendorStaffsComponent";
export default VendorStaffsComponent;