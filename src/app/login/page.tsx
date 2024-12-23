"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Firebase from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import Loading from "@/components/loading/loading";
import { type ProfileValues } from "@/lib/store/features/profileSlice";
import NavComponent from "@/components/nav/navComponent";

const { auth, setAuthPersistence } = Firebase;

export default function Register() {
	const { register, handleSubmit } = useForm<ProfileValues>({
		defaultValues: {
			email: "",
			password: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const router = useRouter();

	const [loader, setLoader] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [checked, setChecked] = useState(false);

	const [qNav, setQnav] = useState("");

	const SignIn = async (data: ProfileValues) => {
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				// Signed up
				console.log(userCredential.user);

				setAuthPersistence(rememberMe);
				router.push("/dashboard");

				setLoader(true);
			})
			.catch((error) => {
				setLoader(false);
				// ..
				console.log(error);
			});
	};

	const onSubmit = (data: ProfileValues) => {
		SignIn(data);
	};

	return (
		<Suspense fallback={<Loading />}>
			{loader ? (
				<Loading />
			) : (
				<div>
					<NavComponent setQNav={setQnav} qNav="" />
					<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
						<div className="sm:mx-auto sm:w-full sm:max-w-md">
							<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
								Sign in to your account
							</h2>
						</div>
						<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
							<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
								<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
											className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
											className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<input
												id="remember-me"
												name="remember-me"
												type="checkbox"
												className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
												checked={rememberMe}
												onChange={(e) => setRememberMe(e.target.checked)}
											/>
											<label
												htmlFor="remember-me"
												className="ml-2 block text-sm text-gray-900"
											>
												Remember me
											</label>
										</div>

										<div className="text-sm">
											<Link
												href="/forgot-password"
												className="font-medium text-indigo-600 hover:text-indigo-500"
											>
												Forgot your password?
											</Link>
										</div>
									</div>

									<div>
										<button
											type="submit"
											className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover: focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										>
											Sign in
										</button>
									</div>
								</form>

								<div className="mt-6">
									<div className="relative">
										<div className="absolute inset-0 flex items-center">
											<div className="w-full border-t border-gray-300" />
										</div>
										<div className="relative flex justify-center text-sm">
											<span className="px-2 bg-white text-gray-500">
												Or continue with
											</span>
										</div>
									</div>

									<div className="mt-6 grid grid-cols-1">
										<div>
											<div className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
												<span className="sr-only">Sign in with Google</span>
												<Image
													src="/service/google.jpg"
													alt="VSHub Logo"
													width={40}
													height={40}
													className="select-none w-5 h-5 rounded-full "
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						n
					</div>
				</div>
			)}
		</Suspense>
	);
}
