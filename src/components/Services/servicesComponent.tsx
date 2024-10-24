import Image from "next/image";
import { Services } from "@/database/data";
import { useState } from "react";

const ServicesComponent: React.FC = () => {
	const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

	const toggleMdCategory = (categoryId: number) => {
		setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
	};

	return (
		<div className="container mx-auto px-6">
			<h2 className="text-3xl font-bold text-center mb-12 text-zinc-950 font-[family-name:var(--Poppins-Bold)] ">Our Services</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{Services.map((category) => (
					<div
						key={category.id}
						className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
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
							<h3 className="text-xl font-semibold mb-4 text-zinc-950 font-[family-name:var(--Poppins-semiBold)] ">
								{category.category}
							</h3>
							<button
								onClick={() => toggleMdCategory(category.id)}
								className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
							>
								{expandedCategory === category.id
									? "Hide Services"
									: "Show Services"}
							</button>
							{expandedCategory === category.id && (
								<div className="mt-6 grid grid-cols-2 gap-4">
									{category.services.map((service) => (
										<div
											key={service.id}
											className="shadow-md bg-white rounded-lg text-center overflow-hidden"
										>
											<Image
												src={service.src}
												alt={`${service.name} service`}
												width={100}
												height={100}
												className="w-full h-24 object-cover rounded-md mb-2"
											/>
											<p className="text-sm font-medium text-zinc-950 font-[family-name:var(--Poppins-Regular)] ">{service.name}</p>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

ServicesComponent.displayName = "ServicesComponent";
export default ServicesComponent;
