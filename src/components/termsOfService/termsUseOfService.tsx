"use client";

const TermsUseOfService: React.FC = () => {
	return (
    <section className="animate-fadeIn">
    <h2 className="text-2xl font-bold mb-4">Use of Service</h2>
    <p className="mb-4">
      VHub provides a platform for vendors to offer their services and for clients to discover and engage these services. Users must use the platform in compliance with all applicable laws and regulations.
    </p>
    <ul className="list-disc pl-5 mb-4 space-y-2">
      <li>Users must be at least 18 years old to use VHub.</li>
      <li>Users are responsible for maintaining the security of their account.</li>
      <li>Any use of the platform for illegal activities is strictly prohibited.</li>
    </ul>
  </section>
	);
};

TermsUseOfService.displayName = "TermsUseOfService";
export default TermsUseOfService;
