import React, { useState } from "react";
import Image from "next/image";
import Firebase from "@/firebase/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import LoadingSvg from "../loading/loadingSvg";

interface EmploymentCardProps {
	profileImage: string;
	name: string;
	category: string;
	service: string;
	address: string;
	docid: string;
	vendorId: string;
  vendorImage: string;
  vendorName: string;
  vendorAddress: string;
  vendorNumber:string;
  vendorService: string;
}

export default function EmploymentCard({
	profileImage,
	name,
	category,
	service,
	address,
	docid,
	vendorId,
  vendorImage,
  vendorName,
  vendorAddress,
  vendorNumber,
  vendorService,
}: EmploymentCardProps) {
	const { database } = Firebase;

	const [state, setState] = useState("");

	const [loader, setLoader] = useState(false);

  const [sent, setSent] = useState(false)

	const content = state === "offer" ? "offer" : state === "request" ? "request" : "";

	const handlelNotice = async () => {
		try {
			setLoader(true);
			const noticeRef = collection(database, "adminMessages");

			const docRef = await addDoc(noticeRef, {
				docId: "",
				type: "employementNotice",
				senderId: vendorId,
				recieverId: docid,
        senderName: vendorName,
        senderImage:vendorImage,
        senderAddress:vendorAddress,
        senderNumber:vendorNumber,
        senderService:vendorService,
				content: content,
			});
			const docId = docRef.id;

			const setNoticeRef = collection(database, "adminMessages");

			await setDoc(
				doc(setNoticeRef, docId),
				{
					docId: docId,
				},
				{ merge: true }
			);

			console.log("Profile detail added successfully");
			setLoader(false);
      setSent(true)
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	return (
		<>
			{loader ? (
				<LoadingSvg />
			) : (
				<div className={`${docid === vendorId ? "hidden" : ""} `}>
					<div className="relative">
						<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
						<Image
							src={profileImage ? profileImage : '/service/u1.jpg'}
							alt={`${name}'s profile`}
							width={400}
							height={300}
							className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
						/>
						<div className="absolute bottom-0 left-0 right-0 p-6">
							<h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
							<p className="text-sm text-gray-200">{category}</p>
						</div>
					</div>
					<div className="p-6 space-y-4">
						<div className="flex items-center space-x-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-500"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
									clipRule="evenodd"
								/>
								<path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
							</svg>
							<span className="text-sm text-gray-700">{service}</span>
						</div>
						<div className="flex items-center space-x-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-500"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="text-sm text-gray-700">{address}</span>
						</div>
					</div>
					<div className="p-6 pt-0 flex space-x-4">
						<button
							onClick={() => {
								setState("request"), handlelNotice();
							}}
              disabled={sent}
							className="flex-1 bg-black text-white py-2 px-4 rounded-lg transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transform hover:-translate-y-0.5 hover:shadow-lg"
						>
							Request Employment
						</button>
						<button
							onClick={() => {
								setState("offer"), handlelNotice();
							}}
              disabled={sent}
							className="flex-1 bg-white text-black py-2 px-4 rounded-lg border-2 border-black transition-all duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transform hover:-translate-y-0.5 hover:shadow-lg"
						>
							Offer Employment
						</button>
					</div>
					<style jsx>{`
						@keyframes pulse {
							0%,
							100% {
								transform: scale(1);
							}
							50% {
								transform: scale(1.05);
							}
						}
						button:hover {
							animation: pulse 2s infinite;
						}
					`}</style>
				</div>
			)}
		</>
	);
}
