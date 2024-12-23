"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Firebase from "@/firebase/firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import LoadingSvg from "@/components/loading/loadingSvg";
import { ProfileValues } from "@/lib/store/features/profileSlice";
interface Props {
	docId: string
}

export default function VendorAccountSetting({docId}:Props) {
	const { database } = Firebase;

	const [loader, setLoader] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { isSubmitSuccessful, isSubmitting },
	} = useForm<ProfileValues>({
		defaultValues: {
			number: "",
			accountNumber: "",
			accountName: "",
			bankName: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const handleProfileDetail = async (data: ProfileValues) => {
		try {
			const profileDetailRef = collection(database, `profile`);

			await setDoc(
				doc(profileDetailRef, docId),
				{
					number: data.number,
					accountNumber: data.accountName,
					accountName: data.accountName,
					bankName: data.bankName,
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

	const onSubmit = (data: ProfileValues) => {
		handleProfileDetail(data);
	};

	return (
		<>
			{loader ? (
				<LoadingSvg />
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div>
						<label
							htmlFor="number"
							className="block text-sm font-medium text-gray-700"
						>
							Number
						</label>
						<input
							type="text"
							{...register("number", {
								required: "Required",
							})}
							id="number"
							placeholder={"Vendor's number"}
							autoComplete="organization"
							required
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="accountNumber"
							className="block text-sm font-medium text-gray-700"
						>
							accountNumber
						</label>
						<input
							type="text"
							autoComplete="street-accountNumber"
							required
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							{...register("accountNumber", {
								required: "Required",
							})}
							id="accountNumber"
							placeholder={"Enter Account Number"}
						/>
					</div>
					<div>
						<label
							htmlFor="accountName"
							className="block text-sm font-medium text-gray-700"
						>
							Account Name
						</label>
						<input
							{...register("accountName", {
								required: "Required",
							})}
							id="accountName"
							placeholder={"Enter Account Name"}
							autoComplete="tel"
							required
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="bankName"
							className="block text-sm font-medium text-gray-700"
						>
							Bank Name
						</label>
						<input
							{...register("bankName", {
								required: "Required",
							})}
							id="bankName"
							placeholder={"Enter Account Name"}
							autoComplete="tel"
							required
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
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
