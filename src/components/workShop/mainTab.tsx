type Values = {
  activeTab: string;
  setActiveTab:(value:string)=> void;
};

const MainTab: React.FC<Values> = ({activeTab, setActiveTab }) => {
	return (
		
    <div className="bg-gray-50 px-4 py-5 sm:px-6">
    <div className="flex flex-wrap gap-4">
      {['about', 'services', 'staff', 'reviews', 'vacancies'].map((tab) => (
        <button
          key={tab}
          className={`px-3 py-2 font-medium text-sm rounded-md ${
            activeTab === tab
              ? 'bg-gray-200 text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  </div>

		
	);
};

MainTab.displayName = "MainTab";
export default MainTab;
