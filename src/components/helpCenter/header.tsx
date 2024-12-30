"use client";
import React from "react";
import Image from "next/image";

const HelpCenterHeader: React.FC = () => {
	return (
		<header className="bg-white shadow-sm">
			<div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
				<div className="flex gap-x-4 items-center text-3xl font-bold text-gray-900 font-[family-name:var(--Poppins-Bold)] ">
					<div className="select-none flex items-center space-x-2">
						<Image
							src="/service/1x.jpg"
							alt="Sspot1 Logo"
							width={40}
							height={40}
							className="select-none rounded-full "
						/>
						<span className="select-none text-3xl font-bold text-gray-800  font-[family-name:var(--ProtestGuerrilla)] ">
							Sspot1
						</span>
					</div>
					Help Center
				</div>
			</div>
		</header>
	);
};

HelpCenterHeader.displayName = "HelpCenterHeader";
export default HelpCenterHeader;
