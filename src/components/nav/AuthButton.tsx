"use client";

import { useRouter } from "next/navigation";

interface AuthButtonProps {
  type: "login" | "register";
  isMobile?: boolean;
}

export default function AuthButton({ type, isMobile }: AuthButtonProps) {
  const router = useRouter();

  const isLogin = type === "login";
  const path = isLogin ? "/login" : "/register";
  const label = isLogin ? "Log In" : "Register";
  
  const baseStyles = "text-sm font-medium transition-all duration-300 cursor-pointer";
  const loginStyles = "text-gray-600 hover:text-black relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all after:duration-300 hover:after:w-full";
  const registerStyles = "px-4 py-2 text-white bg-black rounded-full hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-0.5 text-center";

  return (
    <div
      onClick={() => router.push(path)}
      className={`${baseStyles} ${isLogin ? loginStyles : registerStyles}`}
    >
      {label}
    </div>
  );
}