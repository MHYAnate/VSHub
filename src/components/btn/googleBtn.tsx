"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import Firebase from "@/firebase/firebase";

const { auth, googleProvider } = Firebase;

const GoogleBtn: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleGoogleSignIn = async () => {
		try {
			setIsLoading(true);
			const result = await signInWithPopup(auth, googleProvider);

			if (result.user) {
				router.push("/dashboard");
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<button
			type="button"
			disabled={isLoading}
			onClick={handleGoogleSignIn}
			className="w-full"
		>
			{isLoading ? (
				<span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
			) : (
				<></>
			)}
			Continue with Google
		</button>
	);
};

GoogleBtn.displayName = "GoogleBtn";
export default GoogleBtn;
