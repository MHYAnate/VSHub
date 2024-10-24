import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FooterComponent: React.FC<any> = ({ state }) => {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex flex-col md:flex-row justify-between items-center">
				<div className="flex items-center mb-4 md:mb-0">
					<Image
						src="/service/who.jpg"
						alt="VSHub Logo"
						width={40}
						height={40}
						className="rounded-full mr-2"
					/>
					<span className="text-xl font-bold text-gray-800 font-[family-name:var(--ProtestGuerrilla)]">
						VsHub
					</span>
				</div>
				<nav className="flex flex-wrap justify-center gap-6 font-[family-name:var(--Poppins-Regular)] font-bold">
					<Link
						href="#"
						className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
					>
						About Us
					</Link>

					<Link
						href="#"
						className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
					>
						Terms of Service
					</Link>
					<Link
						href="#"
						className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
					>
						Privacy Policy
					</Link>
					<Link
						href="#"
						className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
					>
						Help Center
					</Link>
				</nav>
			</div>
			<div className="mt-8 text-center text-sm text-gray-500">
				© 2024 VsHub by ILUD. All rights reserved.
			</div>
		</div>
	);
};

FooterComponent.displayName = "FooterComponent";
export default FooterComponent;
