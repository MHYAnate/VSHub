"use client";


const Footer: React.FC= () => {


	return (
    <div className="px-4 py-5 sm:p-6">
              
    <h3 className="text-lg font-medium text-gray-900">Interested in our services?</h3>
    <div className="mt-5 flex gap-4">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Contact Vendor
      </button>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Request Quote
      </button>
    </div>
  </div>
	);
};

Footer.displayName = "Footer";
export default Footer;
