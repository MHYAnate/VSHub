

const NewsLetterComponent: React.FC = () => {
	return (
		<div className="container mx-auto px-4">
			<div className="max-w-2xl mx-auto text-center">
				<h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
				<p className="text-xl text-slate-800 mb-8">
					Join thousands of satisfied customers who have found the perfect
					service provider through our platform.
				</p>
				<form className="flex flex-col sm:flex-row gap-4">
					<input
						className="flex-grow px-6 py-3 rounded-full text-gray-900"
						placeholder="Enter your email"
						type="email"
					/>
					<button
						type="submit"
						className="px-8 py-3 bg-black text-white rounded-full hover:bg-blue-50 transition-colors"
					>
						Subscribe
					</button>
				</form>
				<p className="mt-4 text-sm text-slate-800">
					By subscribing, you agree to our Terms of Service and Privacy Policy.
				</p>
			</div>
		</div>
	);
};

NewsLetterComponent.displayName = "NewsLetterComponent";
export default NewsLetterComponent;
