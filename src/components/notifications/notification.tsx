"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import {
	fetchMessages,
	type AdminMessage,
} from "@/lib/store/features/adminNoticeSlice";
import NoticeSvg from "../btn/noticeSvg";
import XSvg from "../btn/xSvg";
import RequestCard from "./requestCard";

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
	timestamp?: Date | string | number;
	read?: boolean;
}

export default function AdminMessageNotice() {
	const [isOpen, setIsOpen] = useState(false);
	const [animatedMessages, setAnimatedMessages] = useState<string[]>([]);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchMessages());
	}, [dispatch]);

	const transformMessage = (message: MessageTransformInput): AdminMessage => {
		// Handle timestamp transformation separately to properly type check
		let timestamp: Date;
		if (message.timestamp instanceof Date) {
			timestamp = message.timestamp;
		} else if (message.timestamp !== undefined) {
			timestamp = new Date(message.timestamp);
		} else {
			timestamp = new Date();
		}

		return {
			id: message.id || "",
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
			timestamp,
			read: Boolean(message.read),
		};
	};

	const transformMessages = (
		messages: MessageTransformInput[]
	): AdminMessage[] => {
		return messages.map(transformMessage);
	};

	const { messages: reduxMessages } = useAppSelector((state) => state.notice);
	const [messages, setMessages] = useState<AdminMessage[]>([]);

	useEffect(() => {
		if (reduxMessages) {
			const transformedMessages = transformMessages(reduxMessages);
			setMessages(transformedMessages);
		}
	}, [reduxMessages]);

	useEffect(() => {
		const newMessages = messages?.filter(
			(msg) => !animatedMessages.includes(msg.id)
		);
		if (newMessages?.length > 0) {
			setAnimatedMessages((prev) => [
				...prev,
				...newMessages.map((msg) => msg.id),
			]);
		}
	}, [messages, animatedMessages]);

	const unreadCount = messages?.filter((msg) => !msg.read).length;

	const formatTimestamp = (date: Date) => {
		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		}).format(date);
	};

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
				<NoticeSvg lenght={messages.length} state={isOpen} />
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
						{messages?.length === 0 ? (
							<p className="p-4 text-gray-500">No messages</p>
						) : (
							messages?.map((message) => (
								<div
									key={message.id}
									className={`p-4 border-b border-gray-200 last:border-b-0 transition-all duration-300 ${
										animatedMessages.includes(message.id)
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
											onAccept={() => {handleMessageRead(message.id)}}
											onReject={() => {handleMessageRead(message.id)}}
										/>
									)}
									{message.type === "admin" && (
										<div
											className={`p-4 border-b border-gray-200 last:border-b-0 transition-all duration-300 ${
												animatedMessages.includes(message.id)
													? "animate-fadeIn"
													: ""
											} ${message.read ? "bg-gray-50" : "bg-white"}`}
										>
											<div className="flex justify-between items-start mb-2">
												<p className="text-sm font-medium text-gray-800">
													{message.content}
												</p>
												<button
													onClick={() => handleMessageDelete(message.id)}
													className="text-gray-400 hover:text-gray-600 focus:outline-none"
													aria-label="Delete message"
												>
													<XSvg />
												</button>
											</div>
											<div className="flex justify-between items-center">
												<span className="text-xs text-gray-500">
													{formatTimestamp(message.timestamp)}
												</span>
												{!message.read && (
													<button
														onClick={() => handleMessageRead(message.id)}
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
