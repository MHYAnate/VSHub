"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Firebase from "@/firebase/firebase";
import {
	createUserWithEmailAndPassword,
	updateProfile,
	updateEmail,
} from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { Services } from "@/database/data";
import { StateData } from "@/database/stateData";

import React, { useState } from "react";
import Link from "next/link";
import { ProfileValues } from "@/lib/store/features/profileSlice";
import LoadingSvg from "../loading/loadingSvg";

export default function VendorRegComponent() {
	
	const router = useRouter();

	const { auth, database } = Firebase;

	const {
		register,
		handleSubmit,
		watch
	} = useForm<ProfileValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
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

	const [loader, setLoader] = useState(false);

	const [checked, setChecked] = useState(false);

	const [isFailed, setIsFailed] = useState(false);

	const check0 = watch("password");

	const selectService = watch("category");
	const ServiceSelect = watch("service");
	const selectCountry = watch("country");
	const selectState = watch("state");
	const selectArea = watch("area");

	const UserEmail =
		typeof document !== "undefined"
			? (document.querySelector("#email") as HTMLInputElement)?.value || ""
			: "";

	const stateValue =
		typeof document !== "undefined"
			? (document.querySelector("#state") as HTMLInputElement)
					?.value || ""
			: "";

	const handleProfileDetail = async (data: ProfileValues) => {
		try {
			const profileDetailRef = collection(database, `profile`);

			const docRef = await addDoc(profileDetailRef, {
				name: data.name,
				address: data.address,
				number: data.number,
				category: data.category,
				service: data.service,
				countrySelect: "Nigeria",
				state: data.state,
				area: data.area,
				email: `${UserEmail}`,
				src: "",
				docid: "",
				ranking: "",
				about: data.about,
				accountNumber: "",
				accountName: "",
				bankName: "",
				isVendor: "true",
				isEmployedId: "",
				isVerified: "",
				gallaryImg1: "",
				gallaryImg2: "",
				gallaryImg3: "",
				coordinates: [0, 0],
				latitude: "",
				longitude: "",
				password:data.password,
				specialty: data.specialty,
			});
			const docId = docRef.id;
			setLoader(true);
			const setProfileDetailRef = collection(database, `profile`);

			await setDoc(
				doc(setProfileDetailRef, docId),
				{
					docid: docId,
				},
				{ merge: true }
			);

			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const Register = (data: ProfileValues) => {
		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				// Signed up
				const user = userCredential.user;
				updateProfile(user, {
					displayName: `${data.name}`,
				});

				updateEmail(user, `${data.email}`);

				handleProfileDetail(data);

				router.push("/dashboard");
			})
			.catch((error) => {
				console.log(error)

				setIsFailed(true);
				setLoader(false);

				// ..
			});
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
		(category) => category.category === "Automotive Services"
	);

	const maintenanceCategory = Services.find(
		(category) => category.category === "Maintenance Repair, Construction & Fabrication Services"
	);

	const otherCategory = Services.find(
		(category) => category.category === "Lifestyle & Other Personal Services"
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
		Register(data);
	};

	return (<>
		{loader? <LoadingSvg/>:	<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
		<div className="sm:mx-auto sm:w-full sm:max-w-md">
			<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Register as a Vendor
			</h2>
			<p className="mt-2 text-center text-sm text-gray-600">
				Or{" "}
				<Link
					href="/login"
					className="font-medium text-indigo-600 hover:text-indigo-500"
				>
					sign in if you already have an account
				</Link>
			</p>
		</div>

		<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			{isFailed?<div>
				<p>inValid Email or password</p>
			<div onClick={()=> setIsFailed(false)}>RE TRY</div>
			</div> : 			<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
							className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email address
						</label>
						<input
							type="text"
							{...register("email", {
								required: "Required",
							})}
							id="email"
							placeholder={"Enter Contact Email"}
							autoComplete="email"
							required
							className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type={`${checked ? "text" : "password"}`}
							{...register("password", {
								required: "Required",
							})}
							onKeyUp={() => onkeyup}
							placeholder={"Enter Contact PassWord"}
							id="password"
							autoComplete="new-password"
							required
							className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>

					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-gray-700"
						>
							Confirm Password
						</label>
						<input
							type={`${checked ? "text" : "password"}`}
							{...register("confirmPassword", {
								required: "error message",
								validate: (value) => value === check0,
							})}
							onKeyUp={() => onkeyup}
							placeholder={"Verify Contact  PassWord"}
							autoComplete="new-password"
							required
							className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div className="flex gap-3">
						<input
							type="checkbox"
							onChange={(e) => setChecked(e.target.checked)}
						/>
						<span className="text-sm font-medium text-gray-700">
							Show Password
						</span>
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
							className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
							className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
									selectState !==  undefined && selectState !==  null
										? selectState
										: selectCountry === "Nigeria"
										? ""
										: "Select State"
								}
								id="state"
								className="text-gray-900 mt-1 mb-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
									 selectArea !==  undefined && selectArea !==  null
										? selectArea
										: selectState
										? ""
										: "Select Area"
								}
								className="text-gray-900 mt-1 mb-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
									 selectService !==  undefined && selectService !==  null
										? selectService
										: selectState
										? ""
										: "Select Service Category"
								}
								className="text-gray-900 mt-1 mb-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
									 ServiceSelect !==  undefined && ServiceSelect !==  null
										? ServiceSelect
										: selectService
										? ""
										: "Select Service"
								}
								{...register("service", {
									required: "Required",
								})}
								className="text-gray-900 mt-1 mb-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:none focus:border-indigo-500 sm:text-sm"
							>
								<option
									className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
									value="Select Service"
								>
									Select Service
								</option>
								{selectService === "Automotive Services"
									? renderAutomotiveServices()
									: selectService === "Maintenance Repair, Construction & Fabrication Services"
									? renderMaintenance1Services()
									: selectService === "Lifestyle & Other Personal Services"
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
							{...register("specialty", {
								required: "Required",
							})}
							type="text"
							name="specialty"
							id="specialty"
							required
							className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
							className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
			</div>}

		</div>
	</div>}
	</>
	);
}
