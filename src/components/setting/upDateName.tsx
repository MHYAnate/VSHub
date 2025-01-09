"use client";
import React, {useState} from "react";

import { collection, setDoc, doc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import Firebase from "@/firebase/firebase";
import { ProfileValues } from "@/lib/store/features/profileSlice";
import LoadingSvg from "../loading/loadingSvg";
import SuccesNotification from "../notifications/success";
import ErrorNotification from "../notifications/error";

interface Props {
	docId: string;
}

export default function UpDateName({ docId }: Props) {
	const { database } = Firebase;

	const [ er,setEr] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitSuccessful, isSubmitting },
	} = useForm<ProfileValues>({
		defaultValues: {
			name: "",
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
					name: data.name,
				},
				{ merge: true }
			);

		
			reset();

			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
			setEr(true)
		}
	};

	const onSubmit = (data: ProfileValues) => {
		handleUpdateSpecialty(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="grid grid-cols-2 gap-4 transition-all duration-300 animate-fadeIn"
		>
			<div>
				<label
					htmlFor="address"
					className="block text-sm font-medium text-gray-700"
				>
					Update Name
				</label>
				{isSubmitSuccessful && <SuccesNotification/>}
				{er && <ErrorNotification/>}
				<input
					type="text"
					autoComplete="street-address"
					required
					className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					{...register("name", {
						required: "Required",
					})}
					id="Address"
					placeholder={"Update your Name"}
				/>
			</div>
			<div>
				<label htmlFor="email" className="block text-sm font-medium text-white">
					.
				</label>
				{isSubmitting?<LoadingSvg/>:<button
					type="submit"
          disabled={isSubmitting}
					className="w-full flex justify-center mt-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-br from-slate-500 to-slate-700 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					{"UpDate"}
				</button>}
				
			</div>
			<style jsx>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(-10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fadeIn {
					animation: fadeIn 0.3s ease-out forwards;
				}
			`}</style>
		</form>
	);
}
