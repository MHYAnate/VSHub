import React from 'react';
import Image from 'next/image';
import { collection, setDoc, doc, 	deleteDoc, } from "firebase/firestore";
import Firebase from "@/firebase/firebase";
import { useAppSelector } from '@/lib/store/store'


interface RequestCardProps {
  profileImage: string;
  name: string;
  service: string;
  address: string;
  requestType: string;
  content:string;
  docId:string;
  receiverId:string;
  noticeId:string
  onAccept: () => void;
  onReject: () => void;
}

export default function RequestCard({
  profileImage,
  name,
  service,
  address,
  requestType,
  content,
  docId,
  receiverId,
  noticeId,
  onAccept,
  onReject
}: RequestCardProps) {

  const { database } = Firebase;

  const { profiles  } = useAppSelector((state) => state.profile);

  const SenderProfile =  profiles.find((vendor) => vendor.docid === `${docId}`);
  

  const isEmployerId = content === "offer" ? docId :  content === "request" ? receiverId : ""

  const isEmployeeId = content === "offer" ? receiverId :  content === "request" ? docId : ""

  const handleDeleteNotice = async () => {

    const noticeRef = collection(database, "adminMessages");

		try {
			await deleteDoc(doc( noticeRef, noticeId)).then(() => {
				
				
			});
      
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

  const handleConfirmOffer = async () => {
		try {
			const profileDetailRef = collection(database, `profile`);

			await setDoc(

				doc(profileDetailRef, isEmployeeId),
				{
          isEmployedId: isEmployerId,
				},
				{ merge: true }
			);

	    onAccept();

      handleDeleteNotice()

			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		
		}
	};


  
  return (
    <div className="max-w-sm mx-auto overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
        <Image
          src={profileImage ? profileImage : "/service/u1.jpg"}
          alt={`${name}'s profile`}
          width={400}
          height={300}
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
          <p className="text-sm text-gray-200">{SenderProfile?.category}</p>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            <span className="text-sm text-gray-700">{service}</span>
          </div>
          <span className="px-3 py-1 text-gray-800 text-xs font-semibold rounded-full">
            {requestType} 
          </span>
        </div>
        <span className="px-3 py-1 text-gray-800 text-xs font-semibold rounded-full">
            {content} 
          </span>
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-gray-700">{address}</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span className="text-sm text-gray-700">{SenderProfile?.number}</span>
        </div>
      </div>
      <div className="p-6 pt-0 flex space-x-4">
        <button
          onClick={()=>handleConfirmOffer()}
          className="flex-1 bg-black text-white py-2 px-4 rounded-lg transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transform hover:-translate-y-0.5 hover:shadow-lg"
        >
          Accept
        </button>
        <button
          onClick={()=>{handleDeleteNotice(); onReject()}}
          className="flex-1 bg-white text-black py-2 px-4 rounded-lg border-2 border-black transition-all duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transform hover:-translate-y-0.5 hover:shadow-lg"
        >
          Reject
        </button>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        button:hover {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
}

