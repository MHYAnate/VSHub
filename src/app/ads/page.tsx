"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormData = {
	productService: string;
	email: string;
	phone: string;
	businessName: string;
	adType: string;
	budget: string;
	message: string;
};

type FormErrors = {
	[K in keyof FormData]?: string;
};

export default function AdInquiry() {
	const [formData, setFormData] = useState<FormData>({
		productService: "",
		email: "",
		phone: "",
		businessName: "",
		adType: "",
		budget: "",
		message: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const router = useRouter();

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};
		if (!formData.productService)
			newErrors.productService = "Product/Service name is required";
		if (!formData.email) newErrors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(formData.email))
			newErrors.email = "Email is invalid";
		if (!formData.phone) newErrors.phone = "Phone number is required";
		else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone))
			newErrors.phone = "Phone number is invalid";
		if (!formData.businessName)
			newErrors.businessName = "Business name is required";
		if (!formData.adType) newErrors.adType = "Please select an ad type";
		if (!formData.budget) newErrors.budget = "Please select a budget range";
		if (formData.message && formData.message.length > 500)
			newErrors.message = "Message must not exceed 500 characters";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof FormData]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (validateForm()) {
			setIsSubmitting(true);
			try {
				// Simulating an API call
				await new Promise((resolve) => setTimeout(resolve, 2000));
				setIsSubmitted(true);
			} catch (error) {
				console.error("Error submitting form:", error);
				alert("An error occurred. Please try again.");
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	if (isSubmitted) {
		return (
			<div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
				<h2 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h2>
				<p className="text-gray-700">
					Your ad inquiry has been successfully submitted. Our team will review
					your information and contact you as soon as possible.
				</p>
			</div>
		);
	}

	return (
		<div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
			<h1 className="text-3xl font-bold text-gray-900 mb-6">
				Advertise with <span className="select-none text-3xl font-bold   font-[family-name:var(--ProtestGuerrilla)] ">
					VsHub
				</span>
			</h1>
			<p className="text-gray-600 mb-6">
				Reach our diverse audience of service providers and clients. Fill out
				the form below, and our advertising team will get in touch with you to
				discuss opportunities tailored to your business needs.
			</p>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label
						htmlFor="productService"
						className="block text-sm font-medium text-gray-700"
					>
						Product/Service Name
					</label>
					<input
						type="text"
						id="productService"
						name="productService"
						value={formData.productService}
						onChange={handleChange}
						className={`h-8 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
							errors.productService ? "border-red-500" : ""
						}`}
						placeholder="e.g., Auto Repair Services"
					/>
					{errors.productService && (
						<p className="mt-1 text-sm text-red-500">{errors.productService}</p>
					)}
					<p className="mt-1 text-sm text-gray-500">
						The main product or service you want to advertise.
					</p>
				</div>

				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email Address
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className={`h-8 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
							errors.email ? "border-red-500" : ""
						}`}
						placeholder="you@example.com"
					/>
					{errors.email && (
						<p className="mt-1 text-sm text-red-500">{errors.email}</p>
					)}
				</div>

				<div>
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-gray-700"
					>
						Phone Number
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						className={`h-8 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
							errors.phone ? "border-red-500" : ""
						}`}
						placeholder="+1234567890"
					/>
					{errors.phone && (
						<p className="mt-1 text-sm text-red-500">{errors.phone}</p>
					)}
				</div>

				<div>
					<label
						htmlFor="businessName"
						className="block text-sm font-medium text-gray-700"
					>
						Business Name
					</label>
					<input
						type="text"
						id="businessName"
						name="businessName"
						value={formData.businessName}
						onChange={handleChange}
						className={`h-8 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
							errors.businessName ? "border-red-500" : ""
						}`}
						placeholder="Your Company Ltd."
					/>
					{errors.businessName && (
						<p className="mt-1 text-sm text-red-500">{errors.businessName}</p>
					)}
				</div>

				<div>
					<label
						htmlFor="adType"
						className="block text-sm font-medium text-gray-700"
					>
						Preferred Ad Type
					</label>
					<select
						id="adType"
						name="adType"
						value={formData.adType}
						onChange={handleChange}
						className={`h-8 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
							errors.adType ? "border-red-500" : ""
						}`}
					>
						<option value="">Select an ad type</option>
						<option value="banner">Banner Ads</option>
						<option value="sponsored">Sponsored Content</option>
						<option value="video">Video Ads</option>
					</select>
					{errors.adType && (
						<p className="mt-1 text-sm text-red-500">{errors.adType}</p>
					)}
					<p className="mt-1 text-sm text-gray-500">
						{`Choose the type of advertisement you're interested in.`}
						
					</p>
				</div>

				<div>
					<label
						htmlFor="budget"
						className="block text-sm font-medium text-gray-700"
					>
						Advertising Budget
					</label>
					<select
						id="budget"
						name="budget"
						value={formData.budget}
						onChange={handleChange}
						className={`h-8 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
							errors.budget ? "border-red-500" : ""
						}`}
					>
						<option value="">Select your budget range</option>
						<option value="0-10,000">N0 - N10,000</option>
						<option value="10,001-50,000">N100,001 - N50,000</option>
						<option value="50,001-100,000">N50,001 - N109,000</option>
						<option value="1000,000+">N100,000+</option>
					</select>
					{errors.budget && (
						<p className="mt-1 text-sm text-red-500">{errors.budget}</p>
					)}
					<p className="mt-1 text-sm text-gray-500">
						This helps us suggest appropriate advertising options.
					</p>
				</div>

				<div>
					<label
						htmlFor="message"
						className="block text-sm font-medium text-gray-700"
					>
						Additional Information
					</label>
					<textarea
						id="message"
						name="message"
						value={formData.message}
						onChange={handleChange}
						rows={4}
						className={`h-8 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
							errors.message ? "border-red-500" : ""
						}`}
						placeholder="Tell us more about your advertising goals or any questions you have."
					></textarea>
					{errors.message && (
						<p className="mt-1 text-sm text-red-500">{errors.message}</p>
					)}
					<p className="mt-1 text-sm text-gray-500">
						Max 500 characters. This is optional but helps us understand your
						needs better.
					</p>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-950 ${
						isSubmitting ? "opacity-50 cursor-not-allowed" : ""
					}`}
				>
					{isSubmitting ? "Submitting..." : "Submit Inquiry"}
				</button>
			</form>

			<div className="mt-6 text-sm text-gray-500 text-center">
				By submitting this form, you agree to our{" "}
				<Link
        href={`/termsAndConditions`}
					onClick={() => {
						router.push(`/termsAndConditions`);
					}}
					className="text-blue-600 hover:underline"
				>
					Terms of Service
				</Link>{" "}
				and{" "}
				<Link
        href={`/privacyPolicy`}
					onClick={() => {
						router.push(`/privacyPolicy`);
					}}
					className="text-blue-600 hover:underline"
				>
					Privacy Policy
				</Link>
				
			</div>
		</div>
	);
}
