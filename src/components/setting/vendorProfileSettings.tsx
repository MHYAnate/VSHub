"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Firebase from "@/firebase/firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import { Services } from "@/database/data";
import { StateData } from "@/database/stateData";
import { ProfileValues } from "@/lib/store/features/profileSlice";
import Loading from "../loading/loading";
interface Props {
	docId: string
}

export default function VendorProfileSetting({docId}:Props) {
	const {database } = Firebase;

	const [loader, setLoader] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { isSubmitSuccessful,  isSubmitting },
	} = useForm<ProfileValues>({
		defaultValues: {
			src: "",
			name: "",
			number: "",
			address: "",
			state: "",
			area: "",
			category: "",
			service: "",
			specialty: "",
			about: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const selectService = watch("category");
	const ServiceSelect = watch("service");
	const selectCountry = watch("country");
	const selectState = watch("state");
	const selectArea = watch("area");

	const stateValue =
		typeof document !== "undefined"
			? (document.querySelector("#state") as HTMLInputElement)?.value || ""
			: "";

	const handleProfileDetail = async (data: ProfileValues) => {
		try {
			const profileDetailRef = collection(database, `profile`);

			await setDoc(
				doc(profileDetailRef, docId),
				{
					name: data.name,
					address: data.address,
					number: data.number,
					category: data.category,
					service: data.service,
					countrySelect: "Nigeria",
					state: data.state,
					area: data.area,
					src: "",
					about: data.about,
				},
				{ merge: true }
			);
			setLoader(isSubmitting);

			setLoader(isSubmitSuccessful && false);

			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const AreaList = StateData.find(
		(areaList) => areaList.name === `${stateValue}`
	);

	function renderAvailableStates() {
		return StateData.map((state) => (
			<option
				className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
				key={state.name}
				value={state.name}
			>
				{state.name} State
			</option>
		));
	}

	function renderAvailableAreas() {
		if (!AreaList) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return AreaList.areaList.map((area) => (
			<option
				className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
				key={area.name}
				value={area.name}
			>
				{area.name} Area
			</option>
		));
	}

	const autoCategory = Services.find(
		(category) => category.category === "Automotive"
	);

	const maintenanceCategory = Services.find(
		(category) => category.category === "Maintenance"
	);

	const otherCategory = Services.find(
		(category) => category.category === "Others"
	);

	function renderAvailableCategory() {
		return Services.map((service) => (
			<option
				className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
				key={service.category}
				value={service.category}
			>
				{service.category} Category
			</option>
		));
	}

	function renderAutomotiveServices() {
		if (!autoCategory) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}

		return autoCategory.services.map((service) => (
			<option
				className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
				key={service.name}
				value={service.name}
			>
				{service.name}
			</option>
		));
	}

	function renderMaintenance1Services() {
		if (!maintenanceCategory) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return maintenanceCategory.services.map((service) => (
			<option
				className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
				key={service.id}
			>
				{service.name}
			</option>
		));
	}

	function renderOtherServices() {
		if (!otherCategory) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return otherCategory.services.map((service) => (
			<option
				className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
				key={service.id}
			>
				{service.name}
			</option>
		));
	}

	const onSubmit = (data: ProfileValues) => {
		handleProfileDetail(data);
	};

	return (
		<>
		{loader ? (
			<Loading />
		) : (
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700"
				>
					Vendor Name
				</label>
				<input
					type="text"
					{...register("name", {
						required: "Required",
					})}
					id="name"
					placeholder={"Vendor's User Name"}
					autoComplete="organization"
					required
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</div>
			<div>
				<label
					htmlFor="address"
					className="block text-sm font-medium text-gray-700"
				>
					Address
				</label>
				<input
					type="text"
					autoComplete="street-address"
					required
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					{...register("address", {
						required: "Required",
					})}
					id="Address"
					placeholder={"Enter Contact Address"}
				/>
			</div>
			<div>
				<label
					htmlFor="number"
					className="block text-sm font-medium text-gray-700"
				>
					number Number
				</label>
				<input
					{...register("number", {
						required: "Required",
					})}
					id="number"
					placeholder={"Enter Contact Number"}
					autoComplete="tel"
					required
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="state"
						className="block text-sm font-medium text-gray-700"
					>
						State
					</label>
					<select
						value={
							selectState !== (undefined || null)
								? selectState
								: selectCountry === "Nigeria"
								? ""
								: "Select State"
						}
						id="state"
						className="mt-1 mb-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						{...register("state", {
							required: "Required",
						})}
					>
						<option
							className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
							value="Select State"
						>
							Select State
						</option>
						{renderAvailableStates()}
					</select>
				</div>
				<div>
					<label
						htmlFor="area"
						className="block text-sm font-medium text-gray-700"
					>
						Area of Operation
					</label>
					<select
						value={
							selectArea !== (undefined || null)
								? selectArea
								: selectState
								? ""
								: "Select Area"
						}
						className="mt-1 mb-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						{...register("area", {
							required: "Required",
						})}
					>
						<option
							className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
							value="select Area"
						>
							Select Area
						</option>
						{selectState === `${stateValue}` && renderAvailableAreas()}
					</select>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="state"
						className="block text-sm font-medium text-gray-700"
					>
						Category
					</label>
					<select
						value={
							selectService !== (undefined || null)
								? selectService
								: selectState
								? ""
								: "Select Service Category"
						}
						className="mt-1 mb-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						{...register("category", {
							required: "Required",
						})}
					>
						<option>Select Service Category</option>
						{renderAvailableCategory()}
					</select>
				</div>

				<div>
					<label
						htmlFor="area"
						className="block text-sm font-medium text-gray-700"
					>
						Service
					</label>
					<select
						value={
							ServiceSelect !== (undefined || null)
								? ServiceSelect
								: selectService
								? ""
								: "Select Service"
						}
						{...register("service", {
							required: "Required",
						})}
						className="mt-1 mb-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:none focus:border-indigo-500 sm:text-sm"
					>
						<option
							className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
							value="Select Service"
						>
							Select Service
						</option>
						{selectService === "Automotive"
							? renderAutomotiveServices()
							: selectService === "Maintenance"
							? renderMaintenance1Services()
							: selectService === "Others"
							? renderOtherServices()
							: ""}
					</select>
				</div>
			</div>
			<div>
				<label
					htmlFor="specialty"
					className="block text-sm font-medium text-gray-700"
				>
					Specialty
				</label>
				<input
					type="text"
					name="specialty"
					id="specialty"
					required
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</div>

			<div>
				<label
					htmlFor=" about"
					className="block text-sm font-medium text-gray-700"
				>
					about
				</label>
				<textarea
					{...register("about", {
						required: "Required",
					})}
					id="Address"
					placeholder={"Tell us about you"}
					rows={3}
					required
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				></textarea>
			</div>

			<div>
				<button
					type="submit"
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-br from-slate-500 to-slate-700 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Register
				</button>
			</div>
		</form>
			)}
			</>
	);
}
