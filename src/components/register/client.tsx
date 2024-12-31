"use client";
"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Firebase from "@/firebase/firebase";
import {
	createUserWithEmailAndPassword,
	updateProfile,
	updateEmail,
} from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import Link from "next/link";
import { ProfileValues } from "@/lib/store/features/profileSlice";
import LoadingSvg from "@/components//loading/loadingSvg";

export default function VendorRegComponent() {
	const router = useRouter();

	const { auth, database } = Firebase;

	const {
		register,
		handleSubmit,
		watch
	} = useForm<ProfileValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const [loader, setLoader] = useState(false);

	const [checked, setChecked] = useState(false);

	const check0 = watch("password");

	const UserEmail =
		typeof document !== "undefined"
			? (document.querySelector("#email") as HTMLInputElement)?.value || ""
			: "";

	const handleProfileDetail = async (data: ProfileValues) => {
		try {
			const profileDetailRef = collection(database, `profile`);

			const docRef = await addDoc(profileDetailRef, {
				name: data.name,
				address: "",
				number: "",
				category: "",
				service: "",
				countrySelect: "Nigeria",
				state: "",
				area: "",
				email: `${UserEmail}`,
				src: "",
				docid: "",
				ranking: "",
				about: "",
				accountNumber: "",
				accountName: "",
				bankName: "",
				isVendor: "false",
				isEmployedId: "",
				isVerified: "",
				gallaryImg1: "",
				gallaryImg2: "",
				gallaryImg3: "",
				coordinates: [0, 0],
				latitude: "",
				longitude: "",
				password:data.password,
			});
			const docId = docRef.id;
			setLoader(true);
			const setProfileDetailRef = collection(database, `profile`);

			await setDoc(
				doc(setProfileDetailRef, docId),
				{
					docid: docId,
				},
				{ merge: true }
			);

			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const Register = (data: ProfileValues) => {
		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				// Signed up
				const user = userCredential.user;
				updateProfile(user, {
					displayName: `${data.name}`,
				});

				updateEmail(user, `${data.email}`);

				handleProfileDetail(data);
				router.push("/dashboard");
			})
			.catch((error) => {
				console.log(error)

				setLoader(false);

				// ..
			});
	};

	const onSubmit = (data: ProfileValues) => {
		Register(data);
	};

	return (<>
		{loader? <LoadingSvg/>:	<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
		<div className="sm:mx-auto sm:w-full sm:max-w-md">
			<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Register as a Client
			</h2>
			<p className="mt-2 text-center text-sm text-gray-600">
				Or{" "}
				<Link
					href="/login"
					className="font-medium text-indigo-600 hover:text-indigo-500"
				>
					sign in if you already have an account
				</Link>
			</p>
		</div>

		<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							 Name
						</label>
						<input
							type="text"
							{...register("name", {
								required: "Required",
							})}
							id="name"
							placeholder={" User Name"}
							autoComplete="organization"
							required
							className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email address
						</label>
						<input
							type="text"
							{...register("email", {
								required: "Required",
							})}
							id="email"
							placeholder={"Enter Contact Email"}
							autoComplete="email"
							required
							className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type={`${checked ? "text" : "password"}`}
							{...register("password", {
								required: "Required",
							})}
							onKeyUp={() => onkeyup}
							placeholder={"Enter Contact PassWord"}
							id="password"
							autoComplete="new-password"
							required
							className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>

					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-gray-700"
						>
							Confirm Password
						</label>
						<input
							type={`${checked ? "text" : "password"}`}
							{...register("confirmPassword", {
								required: "error message",
								validate: (value) => value === check0,
							})}
							onKeyUp={() => onkeyup}
							placeholder={"Verify Contact  PassWord"}
							autoComplete="new-password"
							required
							className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div className="flex gap-3">
						<input
							type="checkbox"
							onChange={(e) => setChecked(e.target.checked)}
						/>
						<span className="text-sm font-medium text-gray-700">
							Show Password
						</span>
					</div>	
					<div>
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-br from-slate-500 to-slate-700 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>}
	</>
	);
}
