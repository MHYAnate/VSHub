"use client";

interface Props{
	setActiveSection:(value:string)=>void
	activeSection:string
}

const sections = [
  { id: 'introduction', title: 'Introduction', icon: '📜' },
  { id: 'information-collection', title: 'Information We Collect', icon: '📊' },
  { id: 'use-of-information', title: 'How We Use Your Information', icon: '🔍' },
  { id: 'information-sharing', title: 'Information Sharing and Disclosure', icon: '🤝' },
  { id: 'data-security', title: 'Data Security', icon: '🔒' },
  { id: 'user-rights', title: 'Your Rights and Choices', icon: '⚖️' },
  { id: 'children-privacy', title: 'Children\'s Privacy', icon: '👶' },
  { id: 'international-transfers', title: 'International Data Transfers', icon: '🌍' },
  { id: 'policy-changes', title: 'Changes to This Policy', icon: '🔄' },
  { id: 'contact-us', title: 'Contact Us', icon: '📞' },
]

export default function PrivacyNav({ setActiveSection, activeSection }: Props) {
	return (
		<nav>
			<ul className="space-y-2">
				{sections.map((section) => (
					<li key={section.id}>
						<button
							onClick={() => setActiveSection(section.id)}
							className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
								activeSection === section.id
									? "bg-black text-white"
									: "text-gray-600 hover:bg-gray-200"
							}`}
						>
							<span className="mr-3 text-xl">{section.icon}</span>
							<span className="text-sm font-medium">{section.title}</span>
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
}
