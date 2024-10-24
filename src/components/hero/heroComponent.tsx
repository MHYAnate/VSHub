import Image from "next/image";

const HeroComponent: React.FC<any> = ({ state }) => {
	return (
		<section className="relative py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
			<div className="container mx-auto px-4 relative z-10">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div className="space-y-8">
						<h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
							{"Find Expert Services, AnyTime-AnyWhere."}
						</h1>
						<p className="text-xl text-blue-100">
							{
								"Connect with skilled professionals for all your needs. From automotive to home maintenance, we've got you covered."
							}
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
						<button
								type="submit"
								className="px-6 py-3 bg-amber-600 text-white rounded-full text-xl font-bold text-center mb-12 font-[family-name:var(--Poppins-Bold)] hover:bg-amber-700 transition-colors"
							>
								Register Now
							</button>
							<button
								type="submit"
								className="px-6 py-3 bg-white text-amber-700 rounded-full text-xl font-bold text-center mb-12 font-[family-name:var(--Poppins-Bold)] hover:bg-blue-50 transition-colors border border-amber-700"
							>
								Log In
							</button>
						</div>
					</div>
					<div className="relative hidden lg:block w-4/5 h-4/5 overflow-hidden rounded-xl drop-shadow-2xl">
						<Image
							alt="Services collage"
							className="rounded-lg shadow-2xl w-full"
							height={400}
							src="/service/back.jpg"
							width={600}
						/>

						<div className="absolute bottom-4 left-4 right-4 text-white">
							<p className="text-lg font-bold">Discover Our Services</p>
							<p className="text-sm mt-1">
								Explore a wide range of professional services
							</p>
						</div>
						<div className="absolute inset-0 bg-gradient-to-t from-gray-800/60 to-transparent rounded-lg" />
					</div>
				</div>
			</div>
			<div className="absolute inset-0 bg-blue-600 opacity-10 pattern-dots pattern-size-2 pattern-white" />
		</section>
	);
};

HeroComponent.displayName = "HeroComponent";
export default HeroComponent;
