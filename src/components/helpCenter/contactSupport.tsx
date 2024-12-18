"use client";
import { useRouter} from "next/navigation";
import React from "react";

const HelpCenterContact: React.FC= () => {

  const router = useRouter();

	return (
    <div className="px-4 py-5 sm:p-6">
    <h3 className="text-lg leading-6 font-medium text-blue-900">
      Need more help?
    </h3>
    <div className="mt-2 max-w-xl text-sm text-blue-700">
      <p>
        {` If you couldn't find the answer you were looking for, our support team is here to help.`}
      </p>
    </div>
    <div className="mt-5">
      <button
      onClick={() =>
        router.push(`/contactUs`)
      }
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
      >
        Contact Support
      </button>
    </div>
  </div>
	);
};

HelpCenterContact.displayName = "HelpCenterContact";
export default HelpCenterContact;
