"use client";
import React from "react";
import { collection, setDoc, doc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import Firebase from "@/firebase/firebase";
import { ProfileValues } from "@/lib/store/features/profileSlice";

interface Props{
	setLoader:(value:boolean)=>void
	setQuick:(value:string)=> void;
	docId:string
}

export default function UpDateAvailability(
	{setLoader, setQuick,
	docId}:Props
) {
	const { database } = Firebase;

	const {
		register,
		handleSubmit,
		watch,
		formState: { isSubmitSuccessful, isSubmitting },
	} = useForm<ProfileValues>({
		defaultValues: {
			availability: "",
			availableFrom: "",
			availableTo: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const selectAvailability = watch("availability");

	const handleUpdateAvailability = async (data: ProfileValues) => {
		try {
			const profileDetailRef = collection(database, `profile`);

			await setDoc(
				doc(profileDetailRef, docId),
				{
					availability: data.availability,
					availableFrom: data.availableFrom,
					availableTo: data.availableTo,
				},
				{ merge: true }
			);

	
			setLoader(isSubmitting)
			setQuick("")
			setLoader(isSubmitSuccessful && false)


			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
			setLoader(false);
		}
	};

	const onSubmit = (data: ProfileValues) => {
		handleUpdateAvailability(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 transition-all duration-300 animate-fadeIn">
			<div>
				<label
					htmlFor="state"
					className="block text-sm font-medium text-gray-700"
				>
					Update Availability Status
				</label>
				<select
					value={
						selectAvailability !== undefined && selectAvailability !== null
							? selectAvailability
							: "Select Availability"
					}
					id="state"
					className="mt-1 mb-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					{...register("availability", {
						required: "Required",
					})}
				>
					<option
						className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
						value="Available"
					>
						Available
					</option>
					<option
						className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
						value="Not Available"
					>
						Not Available
					</option>
				</select>
			</div>
			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700"
				>
					Availably From
				</label>
				<input
					type="text"
					{...register("availableFrom", {
						required: "Required",
					})}
					id="availableFrom"
					placeholder={"9 : 00 am"}
					autoComplete="organization"
					required
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</div>

			<div>
				<label
					htmlFor="text"
					className="block text-sm font-medium text-gray-700"
				>
					Availably To
				</label>
				<input
					type="text"
					{...register("availableTo", {
						required: "Required",
					})}
					id="availableTo"
					placeholder={"5 : 00 pm"}
					autoComplete="organization"
					required
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</div>
			<div>
      <label
					htmlFor="email"
					className="block text-sm font-medium text-white"
				>
					.
				</label>
				<button
					type="submit"
					className="w-full flex justify-center mt-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-br from-slate-500 to-slate-700 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					UpDate
				</button>
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
