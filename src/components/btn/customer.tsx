"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Firebase from "@/firebase/firebase";
import { collection, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
import { useAppSelector, useAppDispatch } from "@/lib/store/store";
import {
	fetchFavourites,
	type FavoriteValues,
} from "@/lib/store/features/favoriteVendorsSlice";
import { type ProfileValues } from "@/lib/store/features/profileSlice";

interface Props {
	vendorData: ProfileValues;
	clientId: string;
}

const CustomerBtn: React.FC<Props> = ({ vendorData, clientId }) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchFavourites());
	}, [dispatch]);
	const { favoriteVendors } = useAppSelector((state) => state.favoriteVendor);

	const { profiles } = useAppSelector((state) => state.profile);
	

	const { database,auth } = Firebase;
	const user =auth.currentUser;
	const [isLoading, setIsLoading] = useState(false);
	const [isSCustomer, setIsSCustomer] = useState(false);
	const [profileDetails, setProfileDetails] = useState<FavoriteValues | null>(
		null
	);


	const [profileDetail, setProfileDetail] = useState<ProfileValues | null>(
		null
	);

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<FavoriteValues>({
		defaultValues: {
			vendorName: "",
			vendorImg: "",
			vendorId: "",
			vendorCategory: "",
			vendorService: "",
			clientId: "",
			id: "",
			docId: "",
		},
		mode: "onChange",
	});

	useEffect(() => {
		const vendorDetail = favoriteVendors.find(
			(profile) =>
				profile.vendorId.toLowerCase() === vendorData.docid.toLowerCase() &&
				profile.clientId.toLowerCase() === clientId.toLowerCase()
		);

		console.log("checker", vendorDetail?.docId);
		setProfileDetails(vendorDetail || null);
	}, [favoriteVendors, vendorData.docid, clientId]);


	useEffect(() => {
		const vendorDetail = profiles.find(
			(profile) =>
				profile.docid.toLowerCase() === clientId.toLowerCase() 
		);

		setProfileDetail(vendorDetail || null);
	}, [favoriteVendors, vendorData.docid, clientId,profiles]);

	const handleAddCustomer = async () => {
		setIsLoading(true);
		try {
			const profileDetailRef = collection(database, `vendorsClient`);
			const docRef = await addDoc(profileDetailRef, {
				vendorName: vendorData.name,
				vendorImg: vendorData.src,
				vendorId: vendorData.docid,
				vendorCategory: vendorData.category,
				vendorService: vendorData.service,
				clientId: clientId,
				clientName:profileDetail?.name,
				clientImg:profileDetail?.src,
				id: "",
				docId: "",
			});
			const docId = docRef.id;

			await setDoc(
				doc(profileDetailRef, docId),
				{ docId: docId },
				{ merge: true }
			)

			console.log("Profile detail added successfully");
			setIsSCustomer(true);
		} catch (error) {
			console.error("Error adding profile detail:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRemoveCustomer = async () => {
		setIsLoading(true);
		try {
			const VendorsClientRef = collection(database, "vendorsClient");
			await deleteDoc(doc(VendorsClientRef, profileDetails?.docId));
			console.log("Customer removed successfully");
			setIsSCustomer(false);
		} catch (error) {
			console.error("Error removing customer:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const onSubmit = profileDetails?.docId || isSCustomer
		? handleRemoveCustomer
		: handleAddCustomer;

	const isCustomer = profileDetails?.clientId === clientId;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-1/3">
			<button
				type="submit"
				disabled={isLoading || isSubmitting || !user}
				className={`
         w-fit pt-1 px-1 md:w-full md:py-2 md:px-4 rounded-md shadow-md text-sm font-medium
          transition-all duration-300 ease-in-out
          ${
						isLoading || isSubmitting || clientId === ""
							? "bg-gray-300 text-gray-500 cursor-not-allowed"
							: profileDetails?.docId || isSCustomer
							? "bg-white text-black border border-black hover:bg-black hover:text-white"
							: "bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black"
					}
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
        `}
			>
				<span className="relative">
					{isLoading || isSubmitting ? (
						<span className="absolute inset-0 flex items-center justify-center">
							<svg
								className="animate-spin h-5 w-5 text-gray-500"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						</span>
					) : null}
					<span className={isLoading || isSubmitting ? "invisible" : "text-sm"}>
						{isCustomer || isSCustomer ? "Remove Customer" : "Add Customer"}
					</span>
				</span>
			</button>
		</form>
	);
};

export default CustomerBtn;
