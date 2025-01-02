"use client";
import React from "react";
import UpDateName from "./upDateName";
import UpDateAbout from "./upDateAbout";
import UpDateNumber from "./upDateNumber";
import UpDateYearsOfExperience from "./upDateYearsOfExperiance";
import UploadImage from "./upLoadImage";

interface Props {
	docId: string;
}

export default function VendorProfileSetting({ docId }: Props) {
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

			<UpDateAbout docId={docId} />

			<UpDateYearsOfExperience docId={docId} />
			
		</div>
	);
}
