"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import RateUs from "@/components/btn/rateUs";
import Pagination from "@/components/btn/paginationBtn";
import { useAppSelector } from "@/lib/store/store";
import CustomerBtn from "@/components/btn/customer";

interface RaterValue {
  name: string;
  docid: string;
  src: string;
}

interface VendorProps {
  selectState: string;
  selectArea: string;
  searchInput: string;
  raterDetail: RaterValue | null;
}

const AvailableVendors: React.FC<VendorProps> = ({
  selectState,
  selectArea,
  searchInput,
  raterDetail,
}) => {

  const searchParams = useSearchParams();
	
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const set = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const { profiles, error } = useAppSelector((state) => state.profile);

  const Vendors = searchParams.get("name");
  const vendors = Vendors ?? "";

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  const filteredVendorHub = profiles?.filter((eachItem) =>
    vendors ? eachItem.service.toLowerCase().includes(vendors.toLowerCase()) : true
  ) ?? [];

  const filteredListstate = filteredVendorHub.filter((eachItem) =>
    selectState && selectState !== "Select State"
      ? eachItem.state.toLowerCase().includes(selectState.toLowerCase())
      : true
  );

  const filteredListarea = filteredListstate.filter((eachItem) =>
    selectArea && selectArea !== "Select Area"
      ? eachItem.area.toLowerCase().includes(selectArea.toLowerCase())
      : true
  );

  const filteredList = filteredListarea.filter((eachItem) =>
    eachItem.address.toLowerCase().includes(searchInput.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  function renderVendors() {
    if (filteredList.length === 0) {
      return (
        <div className="col-span-full text-center py-8">
          <p className="text-lg font-semibold text-gray-600">
            No vendors found
          </p>
        </div>
      );
    }

    return currentPosts.map((vendor) => (
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
        key={vendor.docid}
      >
        <div className="p-6 space-y-4">
				<div className="flex justify-between items-center w-full">
				<h2 className="text-xl font-semibold">{vendor.name}</h2>
							<CustomerBtn
              vendorData={vendor}
              clientId={raterDetail?.docid || ""}
            />
						</div>
          
          <div className="relative h-48 overflow-hidden rounded-md">
            <Image
              className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              src={vendor.src || "/service/u1.jpg"}
              alt={`${vendor.name}'s image`}
              layout="fill"
              quality={100}
            />
          </div>
          <div className="">
						
            <RateUs
              rateeId={`${vendor.docid}`}
              raterId={raterDetail?.docid || ""}
              raterName={raterDetail?.name || ""}
              raterImg={raterDetail?.src || ""}
            />
            
          </div>
          <p className="text-lg font-semibold">{vendor.specialty}</p>
          <div className="space-y-2">
            <div>
              <p className="font-medium text-gray-600">Address</p>
              <p className="font-semibold">{vendor.address}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Contact</p>
              <p className="font-semibold">{vendor.number}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() =>
            router.push(
              `/vendorWorkSpace` + "?" + set("docid", `${vendor.docid}`)
            )
          }
          className="w-full py-3 px-4 bg-black text-white font-bold transition-colors duration-300 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Enter Work Space
        </button>
      </div>
    ));
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {renderVendors()}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredList.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default AvailableVendors;