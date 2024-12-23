"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface NavLogoProps {
  scrolled: boolean;
}

export default function NavLogo({ scrolled }: NavLogoProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className={`${
        scrolled
          ? "pl-2 pr-3"
          : "bg-gradient-to-br from-black to-gray-900 rounded-full pl-2 pr-3"
      } flex items-center space-x-2 select-none`}
    >
      <div className={`relative w-10 h-10 overflow-hidden rounded-full ${scrolled ? "bg-gray-200" : "bg-black"}`}>
        <Image
          src={scrolled ? "/service/1x.jpg" : "/service/1xi.jpg"}
          alt="VSHub Logo"
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
        />
      </div>
      <span className={`text-2xl font-bold font-[family-name:var(--ProtestGuerrilla)] ${
        scrolled ? "text-black" : "text-white"
      }`}>
        VsHub
      </span>
    </div>
  );
}