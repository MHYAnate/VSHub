import Image from "next/image";
import { Services } from "@/database/data";
import { useState } from "react";

const ServicesBComponent: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

	const toggleCategory = (categoryId: number) => {
		setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
	};

	return (
		<div className="container mx-auto px-4">
			<h2 className="text-3xl text-zinc-950 font-bold text-center mb-12 font-[family-name:var(--Poppins-Bold)]">Our Services</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
				{Services.map((category) => (
					<div
						key={category.id}
						className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
							selectedCategory === category.id
								? "ring-2 ring-gray-900"
								: "hover:shadow-lg"
						}`}
					>
						<div className="relative rounded-none hover:scale-105 transition-all duration-1000 ease-in-out">
							<div className="inset-0 bg-gradient-to-t from-gray-800/60 to-transparent absolute" />
							<Image
								src={category.src}
								alt={`${category.category} category`}
								width={400}
								height={200}
								className="w-full rounded-none  h-32 object-cover"
							/>
						</div>
						<div className="p-6">
							<h3 className="text-xl font-semibold mb-4  text-zinc-950 font-[family-name:var(--Poppins-semiBold)]">
								{category.category}
							</h3>
							<button
								onClick={() => toggleCategory(category.id)}
								className={`w-full py-2 px-4 rounded-full transition-colors ${
									selectedCategory === category.id
										? "bg-gray-600 text-white hover:bg--700"
										: "bg-gray-100 text-gray-800 hover:bg-gray-200 font-[family-name:var(--Poppins-semiBold)] "
								}`}
							>
								{selectedCategory === category.id
									? "Hide Services"
									: "Show Services"}
							</button>
						</div>
					</div>
				))}
			</div>
			{selectedCategory && (
				<div className="mt-12 lg:mt-16">
					<h3 className="text-2xl font-bold mb-6 text-zinc-950 font-[family-name:var(--Poppins-semiBold)] ">
						{Services.find((cat) => cat.id === selectedCategory)?.category}{" "}
						Services
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
						{Services.find((cat) => cat.id === selectedCategory)?.services.map(
							(service) => (
								<div
									key={service.id}
									className="shadow-md bg-white rounded-lg text-center overflow-hidden transition-shadow hover:shadow-lg"
								>
									<Image
										src={service.src}
										alt={`${service.name} service`}
										width={200}
										height={200}
										className="w-full h-40 object-cover rounded-md mb-4 hover:scale-105 transition-all duration-1000 ease-in-out"
									/>
									<p className="text-lg font-medium text-zinc-950 font-[family-name:var(--Poppins-semiBold)] ">{service.name}</p>
								</div>
							)
						)}
					</div>
				</div>
			)}
		</div>
	);
};


ServicesBComponent.displayName = "ServicesBComponent";
export default ServicesBComponent;