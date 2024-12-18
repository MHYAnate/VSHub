"use client";

const PrivacyInfoCollection: React.FC = () => {
	return (
		<section className="animate-fadeIn">
			<h2 className="text-3xl font-bold mb-4">Information We Collect</h2>
			<p className="mb-4">We may collect the following information:</p>
			<ul className="list-disc pl-5 mb-4 space-y-2">
				<li>Name and job title</li>
				<li>Contact information including email address</li>
				<li>
					Demographic information such as postcode, preferences and interests
				</li>
				<li>Other information relevant to customer surveys and/or offers</li>
				<li>
					Information about your use of our platform, including services offered
					or purchased
				</li>
			</ul>
			<p className="mb-4">
				We collect information through various methods, including when you
				register on our site, place an order, subscribe to our newsletter,
				respond to a survey, fill out a form, or interact with our platform in
				any other way.
			</p>
		</section>
	);
};

PrivacyInfoCollection.displayName = "PrivacyInfoCollection";
export default PrivacyInfoCollection;
