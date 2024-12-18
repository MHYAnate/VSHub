"use client"
interface Props{
	setActiveSection:(value:string)=>void
	activeSection:string
}

const sections = [
  { id: 'introduction', title: 'Introduction', icon: '📜' },
  { id: 'use-of-service', title: 'Use of Service', icon: '🖥️' },
  { id: 'account-registration', title: 'Account Registration', icon: '📝' },
  { id: 'vendor-responsibilities', title: 'Vendor Responsibilities', icon: '🛠️' },
  { id: 'client-responsibilities', title: 'Client Responsibilities', icon: '👥' },
  { id: 'payments', title: 'Payments and Fees', icon: '💳' },
  { id: 'intellectual-property', title: 'Intellectual Property', icon: '©️' },
  { id: 'privacy', title: 'Privacy and Data Protection', icon: '🔒' },
  { id: 'termination', title: 'Termination', icon: '🚫' },
  { id: 'liability', title: 'Limitation of Liability', icon: '⚖️' },
  { id: 'disputes', title: 'Disputes and Governing Law', icon: '🏛️' },
  { id: 'changes', title: 'Changes to Terms', icon: '🔄' },
]

export default function TermsNav({ setActiveSection, activeSection }: Props) {
 
 
  return (
    <nav className="space-y-2">
    {sections.map((section) => (
      <button
        key={section.id}
        onClick={() => setActiveSection(section.id)}
        className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
          activeSection === section.id
            ? 'bg-black text-white'
            : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        <span className="mr-3 text-xl">{section.icon}</span>
        <span className="text-sm font-medium">{section.title}</span>
      </button>
    ))}
  </nav>
  )
}