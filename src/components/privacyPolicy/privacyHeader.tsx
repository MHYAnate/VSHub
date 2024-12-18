"use client";
import Link from "next/link";
import Image from "next/image";

const PrivacyHeader: React.FC = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
			<div className="select-none flex items-center space-x-2">
				<Image
					src="/service/1x.jpg"
					alt="VSHub Logo"
					width={40}
					height={40}
					className="select-none rounded-full "
				/>
				<span className="select-none text-3xl font-bold   font-[family-name:var(--ProtestGuerrilla)] ">
					VsHub
				</span>
				<span className="text-3xl  font-bold font-[family-name:var(--Poppins-Bold)]">Privacy Policy</span>
			</div>

			<nav className="hidden md:flex space-x-4">
				{["Home", "About", "Contact"].map((item) => (
					<Link
						key={item}
						href={`${
							item === "Home"
								? "/"
								: item === "About"
								? "/aboutus"
								: item === "Contact"
								? "/contactUs"
								: ""
						}`}
						className="text-black hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
					>
						{item}
					</Link>
				))}
			</nav>
		</div>
	);
};

PrivacyHeader.displayName = "PrivacyHeader";
export default PrivacyHeader;
