"use client";
import React, {useState} from "react";
import { collection, setDoc, doc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import Firebase from "@/firebase/firebase";
import { StateData } from "@/database/stateData";
import { ProfileValues } from "@/lib/store/features/profileSlice";
import LoadingSvg from "../loading/loadingSvg";
import SuccesNotification from "../notifications/success";
import ErrorNotification from "../notifications/error";

interface Props{
	setLoader:(value:boolean)=>void
	setQuick:(value:string)=> void;
	docId:string
}

export default function UpDateLocation(
	{setLoader, setQuick,
		docId}:Props
) {
	const { database } = Firebase;

	const [ er,setEr] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { isSubmitSuccessful, isSubmitting },
	} = useForm<ProfileValues>({
		defaultValues: {
			address: "",
			state: "",
			area: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const handleUpdateLocation = async (data: ProfileValues) => {
		try {
			const profileDetailRef = collection(database, `profile`);

			await setDoc(
				doc(profileDetailRef, docId),
				{
					state: data.state,
					area: data.area,
					address: data.address,
				},
				{ merge: true }
			);

			setLoader(isSubmitting)
			setQuick("")
			setLoader(isSubmitSuccessful && false)
			reset();
			

			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
			setLoader(false);
			setEr(true)
		}
	};

	const selectCountry = watch("country");
	const selectState = watch("state");
	const selectArea = watch("area");

	const stateValue =
		typeof document !== "undefined"
			? (document.querySelector("#state") as HTMLInputElement)?.value || ""
			: "";

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

	const onSubmit = (data: ProfileValues) => {
		handleUpdateLocation(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 transition-all duration-300 animate-fadeIn">
				{isSubmitSuccessful && <SuccesNotification/>}
				{er && <ErrorNotification/>}
			<div>
				<label
					htmlFor="state"
					className="block text-sm font-medium text-gray-700"
				>
					State
				</label>
				<select
					value={
						 selectState !== undefined && selectState !== null
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
						 selectArea !== undefined && selectArea !== null
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
					htmlFor="email"
					className="block text-sm font-medium text-white"
				>
					.
				</label>
				{isSubmitting?<LoadingSvg/>:<button
					type="submit"
					className="w-full flex justify-center mt-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-br from-slate-500 to-slate-700 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					UpDate
				</button>}
			</div>
			<style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
		</form>
	);
}
