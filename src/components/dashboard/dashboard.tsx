"use client";
import React, { useState, useEffect,Suspense } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import {
	fetchProfiles,
	type ProfileValues,
} from "@/lib/store/features/profileSlice";
import {
	fetchVendorsClient
} from "@/lib/store/features/vendorsClientSlice";
import {
	fetchRatings,
	type RateValue,
} from "@/lib/store/features/ratingSlice";
import Firebase from "@/firebase/firebase";
import ClientRating from "./clientRating";
import ClientFeedBack from "./clientFeedBack";
import ClientRateTime from "./clientRateTime";
import UpDateAvailability from "./upDateAvailability";
import UpDateLocation from "./upDateLocation";
import UpDateSpecialty from "./upDateSpecialty";
import Loading from "../loading/loading";

const { auth } = Firebase;

export default function Dashboard() {

	const [user] = useAuthState(auth);

	const [profileDetails, setProfileDetails] = useState<ProfileValues | null>(
		null
	);

  const [loader, setLoader] = useState(false)

  const [quick, setQuick] = useState("")

	const dispatch = useAppDispatch();

	const { profiles } = useAppSelector((state) => state.profile);

	const { clientValues } = useAppSelector((state) => state.customer);

	useEffect(() => {
		dispatch(fetchProfiles());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchVendorsClient());
	}, [dispatch]);

	useEffect(() => {
		if (user && profiles.length > 0) {
			const vendorDetail = profiles.find(
				(profile) => profile.email.toLowerCase() === user.email?.toLowerCase()
			);
			setProfileDetails(vendorDetail || null);
		}
	}, [user, profiles]);

	const vendorId = profileDetails?.docid ? profileDetails?.docid : "";


	useEffect(() => {
		dispatch(fetchRatings(vendorId));
	}, [dispatch, vendorId]);

	const filteredCustomers =
		clientValues?.length > 0
			? clientValues.filter((eachItem) => {
					const text = eachItem.vendorId.toLowerCase();
					return vendorId !== (null || undefined || "")
						? text.includes(vendorId.toLowerCase())
						: text;
			  })
			: [];

      const filteredStaffs =
		profiles?.length > 0
			? profiles.filter((eachItem) => {
					const text = eachItem.isEmployedId.toLowerCase();
					return vendorId !== (null || undefined || "")
						? text.includes(vendorId.toLowerCase())
						: text;
			  })
			: [];

      const cardRatings = useAppSelector((state) => 
      state.rating.ratingsByCard[vendorId] || {
        ratings: [] as RateValue[],
        totalRate: 0,
        loading: false,
        error: null,
      }
    );
    
    const { ratings, totalRate, loading, error } = cardRatings;

	return (
		<Suspense fallback={<Loading />}>
		<main className="flex-grow container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Dashboard</h1>
			<div className="grid grid-cols-1 mb-8 md:grid-cols-2 gap-6">
				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-xl font-bold text-gray-800 mb-4">
						
						{loading? "Updating...":error ?"error Updating try Again":"Quick Actions"}
					</h2>
					<div className="space-y-4">
						<button onClick={()=> quick !== "Availability" ? setQuick("Availability"):setQuick("")}  className="w-full py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-900 transition-colors">
							Update Availability
						</button>
            {quick === "Availability" && (  <UpDateAvailability setLoader={setLoader} docId={vendorId}/>)}
          
						<button onClick={()=> quick !== "Location" ? setQuick("Location"):setQuick("")} className="w-full py-2 px-4 bg-green-700 text-white rounded hover:bg-green-900 transition-colors">
							Update Location
						</button>
            {quick === "Location" && (<UpDateLocation setLoader={setLoader} docId={vendorId}/>)}
            
						<button onClick={()=> quick !== "Speciality" ? setQuick("Speciality"):setQuick("")} className="w-full py-2 px-4 bg-purple-700 text-white rounded hover:bg-purple-900 transition-colors">
							Update Speciality
						</button>
            {quick === "Speciality" && ( <UpDateSpecialty setLoader={setLoader} docId={vendorId}/>)}
           
					</div>
				</div>
				<div className="bg-gray-100 rounded-lg p-6">
					<h2 className="text-2xl font-bold mb-4">Status</h2>
					<ul className="space-y-4">
						<li className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0">
							<span className="font-medium">Availability</span>
							<span className="text-sm text-gray-600">
								{profileDetails?.availability}
							</span>
						</li>
						<li className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0">
							<span className="font-medium">Current location</span>
							<span className="text-sm text-gray-600">{`${profileDetails?.area} ${profileDetails?.state} ${profileDetails?.country} `}</span>
						</li>
						<li className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0">
							<span className="font-medium">Specialty</span>
							<span className="text-sm text-gray-600">
								{profileDetails?.specialty}
							</span>
						</li>
					</ul>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div
						className="bg-gray-100 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
					>
						<h2 className="text-lg font-semibold text-gray-600 mb-2">
            Total Staffs
						</h2>
						<p className="text-3xl font-bold">{filteredStaffs.length}</p>
					</div>
          <div
						className="bg-gray-100 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
					>
						<h2 className="text-lg font-semibold text-gray-600 mb-2">
            Total Customers
						</h2>
						<p className="text-3xl font-bold">{filteredCustomers.length}</p>
					</div>
          <div
						className="bg-gray-100 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
					>
						<h2 className="text-lg font-semibold text-gray-600 mb-2">
            Total Reviews
						</h2>
						<p className="text-3xl font-bold">{ratings.length}</p>
					</div>
          <div
						className="bg-gray-100 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
					>
						<h2 className="text-lg font-semibold text-gray-600 mb-2">
            Avg. Rating
						</h2>
						<p className="text-3xl font-bold">{totalRate}</p>
					</div>
			</div>

			<div className="bg-gray-100 rounded-lg p-6 mb-12">
				<h2 className="text-2xl font-bold mb-4">Customers Feed Backs</h2>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-200">
								<th className="text-left p-2 font-semibold">Customer</th>
								<th className="text-left p-2 font-semibold">Review</th>
								<th className="text-left p-2 font-semibold">Rating</th>
								<th className="text-left p-2 font-semibold">Date</th>
							</tr>
						</thead>
						<tbody>
							{filteredCustomers.map((customer) => (
								<tr
									key={customer.clientId}
									className="border-b border-gray-200 last:border-b-0"
								>
									<td className="p-2">{customer.clientName}</td>
									<td className="p-2">
										<ClientFeedBack ratings={ratings} id={customer.clientId} />
									</td>
									<td className="p-2">
										<ClientRating ratings={ratings} id={customer.clientId} />
									</td>
									<td className="p-2">
										<ClientRateTime ratings={ratings} id={customer.clientId} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</main>
		</Suspense>
	);
}
