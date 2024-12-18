"use client";

import React, { useState } from "react";
import UserProfileSetting from "../setting/userProfileSettings";
import VendorProfileSetting from "../setting/vendorProfileSettings";
import VendorAccountSetting from "../setting/vendorAccountSettings";

interface Props{
	isVendor:string
	docid:string
}

export default function VendorSettings({isVendor, docid}: Props) {
	
	const [activeTab, setActiveTab] = useState("profile");

	const tabContent = {
		profile: (
			<>
				{isVendor === "true" ? (
					<VendorProfileSetting docId={docid} />
				) : (
					<UserProfileSetting docId={docid} />
				)}
			</>
		),
		account: (
			<>
				{isVendor === "true" && (
					<VendorAccountSetting docId={docid } />
				)}
			</>
		),
	};

	return (
		<div className="min-h-screen bg-white text-black flex flex-col">
			<main className="flex-grow container mx-auto px-10 py-8">
				<h1 className="text-3xl font-bold mb-6">Settings</h1>

				<div className="bg-white rounded-lg overflow-hidden p-5">
					<div className={`${isVendor !== "true"  ? "hidden" : "flex border-b"}`}>
						{Object.keys(tabContent).map((tab) => (
							<button
								key={tab}
								className={`${isVendor !== "true"  ? "hidden" : ""} px-6 py-3 text-sm font-medium transition-colors ${
									activeTab === tab
										? "text-black border-b-2 border-black"
										: "text-gray-500 hover:text-black"
								}`}
								onClick={() => setActiveTab(tab)}
							>
								{tab.charAt(0).toUpperCase() + tab.slice(1)}
							</button>
						))}
					</div>
          <> {tabContent[activeTab as keyof typeof tabContent]}</>
				</div>
			</main>
		</div>
	);
}
