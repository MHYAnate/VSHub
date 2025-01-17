"use client";
import React, { useState, useEffect } from "react";
import { StateData } from "@/database/stateData";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "@/firebase/firebase";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import {
	fetchProfiles,
	type ProfileValues,
} from "@/lib/store/features/profileSlice";
import AvailableVendors from "./availableVendors";
import FilterSvg from "../btn/filterSvg";

const { auth } = firebase;

const FilterVendorComponent: React.FC = () => {
	const [raterDetail, setRaterDetail] = useState<ProfileValues | null>(null);
	const [searchInput, setSearchInput] = useState("");
	const [stateInput, setStateInput] = useState("");
	const [stateInputView, setStateInputView] = useState(false);
	const [areaInput, setAreaInput] = useState("");
	const [areaInputView, setAreaInputView] = useState(false);
	const [filterView, setFilterView] = useState(false);
	const dispatch = useAppDispatch();
	const { profiles } = useAppSelector((state) => state.profile);

	useEffect(() => {
		dispatch(fetchProfiles());
	}, [dispatch]);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user && profiles.length > 0) {
				const filteredVendor = profiles.find((profile) =>
					profile.email.toLowerCase() === user?.email
						? user?.email
						: "".toLowerCase()
				);
				setRaterDetail(filteredVendor || null);
			} else {
				setRaterDetail(null);
			}
		});

		return () => unsubscribe();
	}, [profiles]);

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

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
				<div className="hidden md:flex flex-col space-y-2 md:w-1/3">
					<div className="pb-1 pt-2 pl-2 border rounded-md">
						<div
							onClick={() => setStateInputView(!stateInputView)}
							className="w-full mb-1 text-slate-900"
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
							className="w-full mb-1  text-slate-900"
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
						className="p-2 border rounded-md  text-slate-900"
					/>
				</div>

				<div className="md:w-2/3">
					<div
						id="map"
						className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center"
					>
						Ads
					</div>
				</div>
			</div>

			<div
				onClick={() => setFilterView(!filterView)}
				className=" self-center	group flex items-center justify-center w-fit gap-2 px-4 py-2 rounded-full
        transition-all duration-300 ease-in-out
        transform hover:scale-105 focus:outline-none bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-2 border-black  hover:border-white md:hidden"
			>
				<FilterSvg />
				<span>Filter Vendors</span>
			</div>

			{filterView && (
				<div className="flex flex-col space-y-2 md:w-1/3">
					<div className="pb-1 pt-2 pl-2 border rounded-md">
						<div
							onClick={() => setStateInputView(!stateInputView)}
							className="w-full mb-1 text-slate-900"
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
							className="w-full mb-1  text-slate-900"
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
						className="p-2 border rounded-md  text-slate-900"
					/>
				</div>
			)}

			<div className="w-full">
				<AvailableVendors
					searchInput={searchInput}
					selectArea={areaInput}
					selectState={stateInput}
					raterDetail={raterDetail}
				/>
			</div>
		</div>
	);
};

FilterVendorComponent.displayName = "FilterVendorComponent";
export default FilterVendorComponent;
