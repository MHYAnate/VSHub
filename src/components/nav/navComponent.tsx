"use client";
import Image from "next/image";
import { useState } from "react";
interface SetProps{
	setQNav :any;
}

const NavComponent: React.FC<SetProps> = ({ setQNav }) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<div className="select-none container mx-auto px-4 py-4 ">
			<div className="select-none flex items-center justify-between">
				<div  className="select-none flex items-center space-x-2">
					<Image
						src="/service/who.jpg"
						alt="VSHub Logo"
						width={40}
						height={40}
						className="select-none rounded-full "
					/>
					<span className="select-none text-2xl font-bold text-gray-800  font-[family-name:var(--ProtestGuerrilla)] ">
						VsHub
					</span>
				</div>
				<nav className="select-none hidden md:flex items-center space-x-6">
					<div
            onClick={()=> setQNav("service")}
						className="select-none text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors "
					>
						Services
					</div>
					<div
            onClick={()=> setQNav("features")}
						className="select-none text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors "
					>
						Features
					</div>
					<div
            onClick={()=> setQNav("contact")}
						className="select-none text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors "
					>
						Contact
					</div>
					<div
						className="select-none text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors "
					>
						Log In
					</div>
					<div
						className="select-none px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-blue-700 transition-colors "
					>
						Register
					</div>
				</nav>
				<button
					className="select-none md:hidden text-gray-600 hover:text-gray-900"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				>
					<svg
						className="select-none h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>
			{mobileMenuOpen && (
				<nav className="select-none mt-4 md:hidden">
					<div className="select-none flex flex-col space-y-2">
						<div
              onClick={()=> setQNav("services")}
							className="select-none text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors "
						>
							Services
						</div>
						<div
              onClick={()=> setQNav("features")}
							className="select-none text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors "
						>
							Features
						</div>
						<div
              onClick={()=> setQNav("contact")}
							className="select-none text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors "
						>
							Contact
						</div>
						<div
							className="select-none text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors "
						>
							Log In
						</div>
						<div
							className="select-none px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-blue-700 transition-colors text-center "
						>
							Register
						</div>
					</div>
				</nav>
			)}
		</div>
	);
};

NavComponent.displayName = "NavComponent";
export default NavComponent;
