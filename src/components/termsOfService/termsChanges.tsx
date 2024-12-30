"use client";

const TermsChanges: React.FC = () => {
	return (
		<section className="animate-fadeIn">
			<h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
			<p className="mb-4">
				Sspot1 reserves the right to modify or replace these Terms at any time. We
				will provide notice of any significant changes.
			</p>
			<ul className="list-disc pl-5 mb-4 space-y-2">
				<li>
					Continued use of the platform after changes to the Terms constitutes
					acceptance of the new Terms.
				</li>
				<li>
					Users are responsible for regularly reviewing the Terms for any
					updates.
				</li>
			</ul>
		</section>
	);
};

TermsChanges.displayName = "TermsChanges";
export default TermsChanges;
