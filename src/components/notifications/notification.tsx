"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import {
	type ProfileValues,
} from "@/lib/store/features/profileSlice";
import {
	fetchMessages,
	type AdminMessage,
} from "@/lib/store/features/adminNoticeSlice";
import NoticeSvg from "../btn/noticeSvg";
import XSvg from "../btn/xSvg";
import RequestCard from "./requestCard";
import Firebase from "@/firebase/firebase";

const { auth } = Firebase;

interface MessageTransformInput {
	id?: string;
	docId?: string;
	type?: string;
	senderId?: string;
	senderName?: string;
	senderImage?: string;
	senderAddress?: string;
	senderNumber?: string;
	senderService?: string;
	recieverId?: string;
	content?: string;
	read?: boolean;
}

export default function AdminMessageNotice() {
	const [isOpen, setIsOpen] = useState(false);
	const [animatedMessages, setAnimatedMessages] = useState<string[]>([]);

	const [user] = useAuthState(auth);
	const [profileDetails, setProfileDetails] = useState<ProfileValues | null>(
		null
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchMessages());
	}, [dispatch]);

	const transformMessage = (message: MessageTransformInput): AdminMessage => {

		return {
			id: message.docId || "",
			docId: message.docId || "",
			type: message.type || "",
			senderId: message.senderId || "",
			senderName: message.senderName || "",
			senderImage: message.senderImage || "",
			senderAddress: message.senderAddress || "",
			senderNumber: message.senderNumber || "",
			senderService: message.senderService || "",
			recieverId: message.recieverId || "",
			content: message.content || "",
			read: Boolean(message.read),
		};
	};

	const transformMessages = useCallback((messages: MessageTransformInput[]) => {
    // Your message transformation logic here
    return messages.map(transformMessage); // Assuming transformMessage exists elsewhere
}, []); // Empty dependency array for useCallback

const { messages: reduxMessages } = useAppSelector((state) => state.notice);
const [messages, setMessages] = useState<AdminMessage[]>([]);

const { profiles } = useAppSelector((state) => state.profile);

useEffect(() => {
	if (user && profiles.length > 0) {
		const vendorDetail = profiles.find(
			(profile) => profile.email.toLowerCase() === user.email?.toLowerCase()
		);
		setProfileDetails(vendorDetail || null);
	}
}, [user, profiles])

const filteredMessage = messages.filter((eachItem) =>
		eachItem.recieverId.toLowerCase().includes(profileDetails?profileDetails?.docid.toLowerCase():"")
	);

useEffect(() => {
    if (reduxMessages) {
        const transformedMessages = transformMessages(reduxMessages);
        setMessages(transformedMessages);
    }
}, [reduxMessages, transformMessages]);

	// const transformMessages = (
	// 	messages: MessageTransformInput[]
	// ): AdminMessage[] => {
	// 	return messages.map(transformMessage);
	// };

	// const { messages: reduxMessages } = useAppSelector((state) => state.notice);
	// const [messages, setMessages] = useState<AdminMessage[]>([]);

	// useEffect(() => {
	// 	if (reduxMessages) {
	// 		const transformedMessages = transformMessages(reduxMessages);
	// 		setMessages(transformedMessages);
	// 	}
	// }, [reduxMessages,transformMessages]);

	useEffect(() => {
		const newMessages = filteredMessage?.filter(
			(msg) => !animatedMessages.includes(msg.id)
		);
		if (newMessages?.length > 0) {
			setAnimatedMessages((prev) => [
				...prev,
				...newMessages.map((msg) => msg.id),
			]);
		}
	}, [filteredMessage, animatedMessages]);

	const unreadCount = filteredMessage?.filter((msg) => !msg.read).length;


	const handleMessageRead = (id: string) => {
		setMessages((prevMessages) =>
			prevMessages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
		);
	};

	const handleMessageDelete = (id: string) => {
		setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
	};

	return (
		<div className="bg-transparent relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="p-2 rounded-full bg-black text-black border border-black hover:transition-transform duration-300 hover:scale-110"
				aria-label="Open admin messages"
			>
				<NoticeSvg lenght={filteredMessage.length} state={isOpen} />
				{unreadCount > 0 && (
					<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
						{unreadCount}
					</span>
				)}
			</button>
			{}

			{isOpen && (
				<div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
					<div className="p-4 border-b border-gray-200">
						<h2 className="text-lg font-semibold text-gray-800">
							Admin Messages
						</h2>
					</div>
					<div className="max-h-96 overflow-y-auto">
						{filteredMessage?.length === 0 ? (
							<p className="p-4 text-gray-500">No messages</p>
						) : (
							filteredMessage?.map((message) => (
								<div
									key={message.docId}
									className={`p-4 border-b border-gray-200 last:border-b-0 transition-all duration-300 ${
										animatedMessages.includes(message.docId)
											? "animate-fadeIn"
											: ""
									} ${message.read ? "bg-gray-50" : "bg-white"}`}
								>
									{message.type === "employementNotice" && (
										<RequestCard
											profileImage={message.senderImage}
											name={message.senderName}
											service={message.senderService}
											address={message.senderAddress}
											requestType={message.type}
											content={message.content}
											docId={message.senderId}
											receiverId={message.recieverId}
											noticeId={message.docId}
											onAccept={() => {handleMessageRead(message.docId)}}
											onReject={() => {handleMessageRead(message.docId)}}
										/>
									)}
									{message.type === "admin" && (
										<div
											className={`p-4 border-b border-gray-200 last:border-b-0 transition-all duration-300 ${
												animatedMessages.includes(message.docId)
													? "animate-fadeIn"
													: ""
											} ${message.read ? "bg-gray-50" : "bg-white"}`}
										>
											<div className="flex justify-between items-start mb-2">
												<p className="text-sm font-medium text-gray-800">
													{message.content}
												</p>
												<button
													onClick={() => handleMessageDelete(message.docId)}
													className="text-gray-400 hover:text-gray-600 focus:outline-none"
													aria-label="Delete message"
												>
													<XSvg />
												</button>
											</div>
											<div className="flex justify-between items-center">
											
												{!message.read && (
													<button
														onClick={() => handleMessageRead(message.docId)}
														className="text-xs text-blue-500 hover:text-blue-600 focus:outline-none transition-colors duration-200"
													>
														Mark as read
													</button>
												)}
											</div>
										</div>
									)}
								</div>
							))
						)}
					</div>
				</div>
			)}

			<style jsx>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(-10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fadeIn {
					animation: fadeIn 0.3s ease-out forwards;
				}
			`}</style>
		</div>
	);
}
