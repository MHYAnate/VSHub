"use client";
import React, {useState} from "react";
import UpDateName from "./upDateName";
import UpDateNumber from "./upDateNumber";
import UploadImage from "./upLoadImage";
import UpDateLocation from "./upDateLocation";
interface Props {
	docId: string
}

export default function UserProfileSetting({docId}:Props) {
	const [a, sA] =useState(false)

	const [b, sB] =useState("")

	return (
		<div className="space-y-6">

			<div className="mt-8 mb-2">
			<label
					htmlFor="address"
					className="block text-sm font-medium text-gray-700 text-center"
				>
					Upload Your Profile Image
				</label>
        
				<UploadImage docId={docId} />

			</div>

			
			<UpDateName docId={docId} />

			<UpDateNumber docId={docId} />

			<UpDateLocation setLoader={sA} setQuick={sB} docId={docId} />

			

			{a && b && <></>}

		
			
		</div>
	);
}
