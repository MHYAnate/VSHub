"use client";

const TermsAndPolicies: React.FC = () => {
	return (
		<div className="container mx-auto px-6 py-8">
			<div className="flex flex-col sm:flex-row justify-between items-center">
				<p className="text-sm text-gray-500">
					© 2024 VsHub by ILUD. All rights reserved.
				</p>
				<nav className="flex gap-6 mt-4 sm:mt-0">
					<div className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
						Terms of Service
					</div>
					<div className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
						Privacy Policy
					</div>
				</nav>
			</div>
		</div>
	);
};

TermsAndPolicies.displayName = "TermsAndPolicies";
export default TermsAndPolicies;
