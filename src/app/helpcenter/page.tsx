"use client";

import React, { useState } from "react";
import HelpCenterHeader from "@/components/helpCenter/header";
import HelpCenterNav from "@/components/helpCenter/nav";
import HelpCenterSearchInput from "@/components/helpCenter/search";
import HelpCenterFaqs from "@/components/helpCenter/faqs";
import HelpCenterContact from "@/components/helpCenter/contactSupport";
import HelpCenterFooter from "@/components/helpCenter/footer";

export default function HelpCenter() {

	const [searchTerm, setSearchTerm] = useState("");

	const [activeCategory, setActiveCategory] = useState("All");

	return (
		<div className="min-h-screen bg-gray-50">

			<HelpCenterHeader />

			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

				<div className="mb-8">

					<HelpCenterSearchInput
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>

				</div>

				<div className="mb-8">

					<HelpCenterNav
						activeCategory={activeCategory}
						setActiveCategory={setActiveCategory}
					/>

				</div>

				  <HelpCenterFaqs
					searchTerm={searchTerm}
					activeCategory={activeCategory}
				  />

				<div className="mt-12 bg-blue-50 rounded-lg shadow-sm overflow-hidden">

					<HelpCenterContact />

				</div>

			</main>

			  <HelpCenterFooter />

		</div>
	);
}
