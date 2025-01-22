"use client";
import React, { useState, useEffect } from "react";
import { StateData } from "@/database/stateData";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import {
	fetchProfiles
} from "@/lib/store/features/profileSlice";
import { collection, getDocs } from "firebase/firestore";
import firebase from "@/firebase/firebase";

export interface ProfileValues {
  category: string;
  service: string;
  specialty: string;
  ranking: string;
  docid: string;
  id:string;
  src: string;
  name: string;
  email: string;
  number: string;
  address: string;
  state: string;
  area: string;
  country:string;
  about: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  isVendor: string;
  isEmployedId: string;
  isVerified: string;
  gallaryImg1:string;
  gallaryImg2:string;
  gallaryImg3:string;
  coordinates?: [number, number];
  latitude:string;
  longitude:string;
  password:string;
  confirmPassword:string;
  yearsOfExperience:number;
  service1:string;
  s1Price:string;
  service2:string;
  s2Price:string;
  service3:string;
  s3Price:string;
  service4:string;
  s4Price:string;
  service5:string;
  s5Price:string;
  availability:string;
  availableFrom:string;
  availableTo:string;
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
  createdAt: number | null; // Changed from Timestamp to number
}


export default function Api() {

  
	const { database } = firebase;
	const profileDetailRef = collection(database, "rateUs");

  const [stateInput, setStateInput] = useState("");

  const [areaInput, setAreaInput] = useState("");

  const dispatch = useAppDispatch();

  const [ratings, setRatings] = useState<RateValue[]>([]);

	useEffect(() => {
		dispatch(fetchProfiles());
	}, [dispatch]);

  

  // 'profiles' is declared but its value is never read.ts(6133) const profiles: ProfileValues[]

  const { profiles } = useAppSelector((state) => state.profile);

  const AreaList = StateData.find(
		(areaList) => areaList.name === `${stateInput}`
	);

	function renderAvailableStates() {
		return StateData.map((state) => (
			<div
				onClick={() => {
					setStateInput(state.name);
				}}
				className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
				key={state.name}
			>
				{state.name} 
			</div>
		));
	}

  
	function renderAvailableAreas() {
		return AreaList?.areaList.map((area) => (
			<div
				onClick={() => {
					setAreaInput(area.name);
				}}
				className="grid grid-cols-1 h-fit mb-1 text-white rounded-lg w-fit bg-zinc-900 hover:bg-blue-500 pl-2 pr-2"
				key={area.id}
			>
				{area.name} Area
			</div>
		));
	}

  
	useEffect(() => {
		const fetchProfileDetails = async () => {
			try {
				const querySnapshot = await getDocs(profileDetailRef);

				if (querySnapshot.empty) {
					console.log("No profile details found");
					return;
				}

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


	return (
		<div className="min-h-screen bg-gray-50">
      <header>
        <h1>
          Sspot1
        </h1>
        <h2>
          Service Spot 1 
        </h2>
        <h3>
        Sspot1 Api Page
        </h3>
      </header>
      <main>

      </main>
			

		</div>
	);
}
