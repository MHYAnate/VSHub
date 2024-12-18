"use client";
import React from "react";
import { useAppSelector } from "@/lib/store/store";
import { useSearchParams } from "next/navigation";
import VendorStaffsCard from "./staffCard";

const VendorVacanciesComponent: React.FC = () => {
	const { vacancies } = useAppSelector((state) => state.vacancy);

	const searchParams = useSearchParams();

	const vendorId = searchParams.get("docid");

	const vendorDocId = vendorId ? vendorId : "";

	const filteredVacancies = vacancies
		? vacancies.length > 0
			? vacancies.filter((eachItem) => {
					const text = eachItem.vendorId.toLowerCase();
					return text.includes(vendorDocId.toLowerCase());
			  })
			: []
		: "";

	return (
		<div>
			<h3 className="text-lg font-medium text-gray-900 mb-4">Job Openings</h3>
			<div className="space-y-4">
				{filteredVacancies ? (
					filteredVacancies.map((vacancy) => (
						<div
							key={vacancy.docid}
							className="bg-white overflow-hidden shadow rounded-lg"
						>
							<div className="px-4 py-5 sm:p-6">
								<h4 className="text-lg font-semibold text-gray-900">
									{vacancy.title}
								</h4>
								<p className="mt-1 text-sm text-gray-600">
									{vacancy.description}
								</p>
								<div className="mt-2 flex flex-wrap gap-2">
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
										{vacancy.type}
									</span>
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
										{vacancy.salary}
									</span>
								</div>
								<p className="mt-2 text-sm text-gray-500">
									Qualifications: {vacancy.requirements}
								</p>
								<p className="mt-1 text-sm text-gray-500">
									Open from {vacancy.postedDate} to {vacancy.deadline}
								</p>
							</div>
						</div>
					))
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

VendorVacanciesComponent.displayName = "VendorVacanciesComponent";
export default VendorVacanciesComponent;
