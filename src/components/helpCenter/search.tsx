"use client";
import React from "react";

interface SearchInputProps {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
}

const HelpCenterSearchInput: React.FC<SearchInputProps> = ({ searchTerm, setSearchTerm }) => {
	return (
		<div className="relative rounded-md shadow-sm">
			<input
				type="text"
				className="form-input block w-full h-10 pl-10 sm:text-sm sm:leading-5 rounded-md transition ease-in-out duration-150"
				placeholder="Search for help..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<svg
					className="h-5 w-5 text-gray-400"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fillRule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clipRule="evenodd"
					/>
				</svg>
			</div>
		</div>
	);
};

HelpCenterSearchInput.displayName = "HelpCenterSearchInput";
export default HelpCenterSearchInput;
