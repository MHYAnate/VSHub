"use client";

import React, { useState } from "react";
import EmploymentCard from "./employementCard"; 
import {type ProfileValues,
} from "@/lib/store/features/profileSlice";
import { StateData } from "@/database/stateData";
import Pagination from "@/components/btn/paginationBtn";

interface Props {
	vendorId: string;
	vendorName:string;
	vendorAddress:string;
	vendorImage:string;
	vendorService: string;
	vendorNumber:string;
  profiles:ProfileValues[]
}

export default function JobBoard({ vendorId, vendorService, vendorAddress, vendorImage, vendorName,	vendorNumber, profiles }: Props) {
	const [searchInput, setSearchInput] = useState("");
	const [stateInput, setStateInput] = useState("");
	const [stateInputView, setStateInputView] = useState(false);
	const [areaInput, setAreaInput] = useState("");
	const [areaInputView, setAreaInputView] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(12);

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);
	};

	const AreaList = StateData.find(
		(areaList) => areaList.name === `${stateInput}`
	);

	function renderAvailableStates() {
		return StateData.map((state) => (
			<div
				onClick={() => {
					setStateInput(state.name);
					setStateInputView(false);
				}}
				className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
				key={state.name}
			>
				{state.name} State
			</div>
		));
	}

	function renderAvailableAreas() {
		return AreaList?.areaList.map((area) => (
			<div
				onClick={() => {
					setAreaInput(area.name);
					setAreaInputView(false);
				}}
				className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
				key={area.id}
			>
				{area.name} Area
			</div>
		));
	}

	const filteredVendorHub =
		profiles?.filter((eachItem) =>
			vendorService
				? eachItem.service.toLowerCase().includes(vendorService.toLowerCase())
				: true
		) ?? [];

	const filteredListstate = filteredVendorHub.filter((eachItem) =>
		stateInput && stateInput !== "Select State"
			? eachItem.state.toLowerCase().includes(stateInput.toLowerCase())
			: true
	);

	const filteredListarea = filteredListstate.filter((eachItem) =>
		areaInput && areaInput !== "Select Area"
			? eachItem.area.toLowerCase().includes(areaInput.toLowerCase())
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
        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl mt-10 px-3"
        key={vendor.docid}
      >
       <EmploymentCard profileImage={vendor.src} name={vendor.name} category={vendor.category} service={vendor.service} address={vendor.address} docid={vendor.docid} vendorId={vendorId} vendorAddress={vendorAddress} vendorImage={vendorImage} vendorName={vendorName} vendorService={vendorService} vendorNumber={vendorNumber}/>
      </div>
    ));
  }

	return (
		<div className="min-h-screen bg-white text-black flex flex-col mt-5">
			<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
				<div className="flex flex-col space-y-2 md:w-1/3">
					<div className="pb-1 pt-2 pl-2 border rounded-md">
						<div
							onClick={() => setStateInputView(!stateInputView)}
							className="w-full mb-1"
						>
							{stateInput !== "" ? `${stateInput} State` : "Select State"}
						</div>
						{stateInputView && (
							<div className="grid grid-cols-1">{renderAvailableStates()}</div>
						)}
					</div>

					<div className="pb-1 pt-2 pl-2 border rounded-md">
						<div
							onClick={() => setAreaInputView(!areaInputView)}
							className="w-full mb-1"
						>
							{areaInput !== "" ? `${areaInput} Area` : "Select Area"}
						</div>
						{areaInputView && (
							<div className="grid grid-cols-1">{renderAvailableAreas()}</div>
						)}
					</div>

					<input
						value={searchInput}
						onChange={updateSearchInput}
						id="vendorAddress"
						placeholder="Search Personal Address"
						className="p-2 border rounded-md"
					/>
				</div>

				<div className="md:w-2/3">
					<div
						id="map"
						className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center"
					>
						Ads
					</div>
				</div>
			</div>
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
}
