"use client";
import React from "react";

import { collection, setDoc, doc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import Firebase from "@/firebase/firebase";
import  { ProfileValues } from "@/lib/store/features/profileSlice";
import LoadingSvg from "../loading/loadingSvg";

interface Props{
	setLoader:(value:boolean)=>void
	setQuick:(value:string)=> void;
	docId:string
}


export default function UpDateSpecialty(
	{setLoader, setQuick,
		docId}:Props
) {
	const { database } = Firebase;
	

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitSuccessful,  isSubmitting },
	} = useForm<ProfileValues>({
		defaultValues: {
			specialty: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});


	const handleUpdateSpecialty = async (data: ProfileValues) => {
		try {
			const profileDetailRef = collection(database, `profile`);

			await setDoc(
				doc(profileDetailRef, docId),
				{
					specialty: data.specialty,
				},
				{ merge: true }
			);

			setLoader(isSubmitting)
			setQuick("")
			setLoader(isSubmitSuccessful && false)
			reset()

			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
			setLoader(false);
		}
	};

	const onSubmit = (data: ProfileValues) => {
		handleUpdateSpecialty(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 transition-all duration-300 animate-fadeIn">
			<div>
				<label
					htmlFor="address"
					className="block text-sm font-medium text-gray-700"
				>
					Update Specialty
				</label>
				<input
					type="text"
					autoComplete="street-address"
					required
					className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					{...register("specialty", {
						required: "Required",
					})}
					id="Address"
					placeholder={"Update your Distinctive Specialty"}
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
