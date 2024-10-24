import Image from "next/image";

const FeaturesComponenet: React.FC<any> = () => {

	return (
		<div className="container mx-auto px-4">
			<h2 className="text-3xl text-zinc-950 font-bold text-center mb-12 font-[family-name:var(--Poppins-Bold)] ">
				Why Choose
				<span className="font-[family-name:var(--ProtestGuerrilla)]  text-zinc-950 ">
					{" "}
					VsHub
				</span>{" "}
			</h2>
			<div className="grid gap-8 lg:grid-cols-3">
				{[
					{
						title: "Expert Professionals",
						description: "Connect with vetted and skilled service providers.",
					},
					{
						title: "Wide Range of Services",
						description:
							"From home repairs to personal care, find it all here.",
					},
					{
						title: "Easy to Use Interface",
						description:
							"Easily find vendors with just a few clicks, anytime, anywhere.",
					},
				].map((feature, index) => (
					<div
						key={index}
						className="bg-white rounded-lg shadow-md p-8 text-center transition-shadow hover:shadow-lg"
					>
						<div className="w-16 h-16 mx-auto mb-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
							<svg
								className="w-8 h-8"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-semibold mb-4  text-zinc-950  font-[family-name:var(--Poppins-SemiBold)]">
							{feature.title}
						</h3>
						<p className="text-gray-600 font-[family-name:var(--Poppins-Regular)]">
							{feature.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};


FeaturesComponenet.displayName = "FeaturesComponenet";
export default FeaturesComponenet;