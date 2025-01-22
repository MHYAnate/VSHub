"use client";

import React, { useState, useEffect } from "react";
import { StateData } from "@/database/stateData";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { fetchProfiles } from "@/lib/store/features/profileSlice";
import { collection, getDocs } from "firebase/firestore";
import firebase from "@/firebase/firebase";
import RateComponent from "./rateComponent";

export interface ProfileValues {
	category: string;
	service: string;
	specialty: string;
	ranking: string;
	docid: string;
	id: string;
	src: string;
	name: string;
	email: string;
	number: string;
	address: string;
	state: string;
	area: string;
	country: string;
	about: string;
	accountNumber: string;
	accountName: string;
	bankName: string;
	isVendor: string;
	isEmployedId: string;
	isVerified: string;
	gallaryImg1: string;
	gallaryImg2: string;
	gallaryImg3: string;
	coordinates?: [number, number];
	latitude: string;
	longitude: string;
	password: string;
	confirmPassword: string;
	yearsOfExperience: number;
	service1: string;
	s1Price: string;
	service2: string;
	s2Price: string;
	service3: string;
	s3Price: string;
	service4: string;
	s4Price: string;
	service5: string;
	s5Price: string;
	availability: string;
	availableFrom: string;
	availableTo: string;
}

export interface RateValue {
	rating: number;
	rateeId: string;
	docid: string;
	rate: number;
	feedback: string;
	raterName: string;
	raterImg: string;
	raterId: string;
	createdAt: number | null;
}

function CodeBlock({ title, code }: { title: string; code: string }) {
	return (
		<div className="mt-4">
			<h3 className="text-lg font-semibold mb-2">{title}</h3>
			<pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
				<code>{code}</code>
			</pre>
		</div>
	);
}

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="mb-8 p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
			{children}
		</section>
	);
}

export default function Api() {
	const { database } = firebase;
	const profileDetailRef = collection(database, "rateUs");
	const [ratings, setRatings] = useState<RateValue[]>([]);
	const dispatch = useAppDispatch();
	const { profiles } = useAppSelector((state) => state.profile);

	useEffect(() => {
		dispatch(fetchProfiles());
	}, [dispatch]);

	useEffect(() => {
		const fetchProfileDetails = async () => {
			try {
				const querySnapshot = await getDocs(profileDetailRef);
				const retrievedData: RateValue[] = [];
				querySnapshot.forEach((doc) => {
					const data = doc.data() as RateValue;
					retrievedData.push(data);
				});
				setRatings(retrievedData);
			} catch (error) {
				console.error("Error getting profile detail:", error);
				setRatings([]);
			}
		};

		fetchProfileDetails();
	}, [database, profileDetailRef]);

	function renderAvailableStates() {
		return StateData.map((state) => (
			<div key={state.name}>
				{" "}
				<div
					onClick={() => {}}
					className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
				>
					{state.name}
				</div>
				<h3 className="text-xl font-semibold mb-4">Areas in {state.name}</h3>
				{state.areaList.map((area) => (
					<div className="grid grid-cols-2 gap-2" key={area.id}>
						{area.name} Area
					</div>
				))}
			</div>
		));
	}

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<header className="mb-8 text-center">
				<h1 className="text-4xl font-bold text-gray-900 mb-2">
					Sspot1 API Documentation
				</h1>
				<h2 className="text-xl text-gray-600 mb-1">Service Spot 1</h2>
				<p className="text-gray-500">API Reference and Data Structures</p>
			</header>

			<main className="max-w-6xl mx-auto">
				<Section title="Data Structures">
					<CodeBlock
						title="Profile Interface"
						code={JSON.stringify(
							{
								category: "string",
								service: "string",
								specialty: "string",
								ranking: "string",
								docid: "string",
								id: "string",
								src: "string",
								name: "string",
								email: "string",
								number: "string",
								address: "string",
								state: "string",
								area: "string",
								country: "string",
								about: "string",
								accountNumber: "string",
								accountName: "string",
								bankName: "string",
								isVendor: "string",
								isEmployedId: "string",
								isVerified: "string",
								gallaryImg1: "string",
								gallaryImg2: "string",
								gallaryImg3: "string",
								coordinates: "number, number",
								latitude: "string",
								longitude: "string",
								password: "string",
								confirmPassword: "string",
								yearsOfExperience: "number",
								service1: "string",
								s1Price: "string",
								service2: "string",
								s2Price: "string",
								service3: "string",
								s3Price: "string",
								service4: "string",
								s4Price: "string",
								service5: "string",
								s5Price: "string",
								availability: "string",
								availableFrom: "string",
								availableTo: "string",
							},
							null,
							2
						)}
					/>

					<CodeBlock
						title="Rate Value Interface"
						code={JSON.stringify(
							{
								rating: "number",
								rateeId: "string",
								docid: "string",
								rate: "number",
								feedback: "string",
								raterName: "string",
								raterImg: "string",
								raterId: "string",
								createdAt: "number | null",
							},
							null,
							2
						)}
					/>
				</Section>

				<Section title="Available Data">
					<div className="grid grid-cols-1">
						<div>
							<h3 className="text-xl font-semibold mb-4">
								Profiles ({profiles.length})
							</h3>
							<div className="bg-gray-100 p-4 rounded-lg max-h-fit">
								{profiles.map((profile) => (
									<div
										key={profile.docid}
										className="mb-4 p-4 bg-white rounded shadow"
									>
										<p className="font-semibold">{profile.name}</p>
										<p className="text-sm text-gray-600">{profile.email}</p>
										<p className="text-sm text-gray-500">{profile.service}</p>
										<div>
											<RateComponent id={profile.docid} profiles={ratings} />
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</Section>

				<Section title="Location Data">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h3 className="text-xl font-semibold mb-4">Available States</h3>
							<div className="grid grid-cols-2 gap-2">
								{renderAvailableStates()}
							</div>
						</div>
					</div>
				</Section>
			</main>
		</div>
	);
}
