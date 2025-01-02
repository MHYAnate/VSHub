"use client"

import React, { useState, useRef, ChangeEvent, useEffect } from 'react'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Firebase from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	collection,
	setDoc,
	doc
} from "firebase/firestore";
import LoadingSvg from '../loading/loadingSvg';

interface Props {
	docId: string;
}



export default function UploadImage({ docId }: Props) {

  const { auth, storage, database } = Firebase;

  const [imageUrl, setImageUrl] = useState("");

  const [loader, setLoader] = useState(false);

  const [user] = useAuthState(auth);

  const [fileName, setFileName] = useState<string | null>(null)

  const [isUploading, setIsUploading] = useState(false)

  const [uploadProgress, setUploadProgress] = useState(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const imageRef = ref(storage, `image/${user?.email}`);

	const handleUpload = () => {

    setLoader(true);
		const fileInput = fileInputRef.current;
		if (fileInput && fileInput.files && fileInput.files.length > 0) {
			const file = fileInput.files[0]; // Get the first selected file

			// Reference to the root of the default Firebase Storage bucket

			// Upload the file
			uploadBytes(imageRef, file)
				.then((snapshot) => {
					getDownloadURL(imageRef).then((url) => {
						setImageUrl(url);
						
					});

					console.log("Uploaded a file!");
				})
				.catch((error) => {
					console.error(error); // Handle any errors
				});
		}
	};


  const handleProfileDetail = async () => {
		try {
			const profileDetailRef = collection(database, `profile`);
			await setDoc(
				doc(profileDetailRef, docId),
				{
					src: imageUrl,
				},
				{ merge: true }
			);
			console.log("Profile detail added successfully");
      setLoader(false);
		} catch (error) {
			console.error("Error adding profile detail:", error);
      setLoader(false);
		}
	};
	useEffect(() => {
		handleProfileDetail();
	}, [handleProfileDetail,setImageUrl]);




  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      simulateUpload()
    }
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prevProgress + 10
      })
    }, 500)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="relative mb-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          aria-label="Choose file"
        />
        <button
          onClick={triggerFileInput}
          className="w-full py-3 px-4 bg-black text-white font-semibold rounded-lg transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 relative overflow-hidden group"
        >
          <span className="relative z-10">Choose Image</span>
          <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
        </button>
      </div>
      {fileName && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Selected image:</p>
          <div className="bg-gray-100 p-3 rounded-lg flex items-center">
            <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-800 truncate">{fileName}</span>
          </div>
          <button
          onClick={handleUpload}
          className="w-full py-3 px-4 bg-black text-white font-semibold rounded-lg transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 relative overflow-hidden group"
        >
          <span className="relative z-10">{loader? <LoadingSvg/> : "UpLoad Image"}</span>
          <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
        </button>
        </div>
      )}
      {isUploading && (
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-black bg-gray-200">
                Uploading
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-black">
                {uploadProgress}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${uploadProgress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black transition-all duration-500 ease-in-out"
            ></div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .group:hover .group-hover\\:animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  )
}