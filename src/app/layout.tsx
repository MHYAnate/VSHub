import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from '@/lib/store/StoreProvider';
import LoadingSvg from "@/components//loading/loadingSvg";

import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const poppinsRegular = localFont({
  src: "./fonts/Poppins-Regular.ttf",
  variable: "--Poppins-Regular",
  weight: "100 900",
});

const poppinsSemiBold = localFont({
  src: "./fonts/Poppins-SemiBold.ttf",
  variable: "--Poppins-SemiBold",
  weight: "100 900",
});

const poppinsBold = localFont({
  src: "./fonts/Poppins-Bold.ttf",
  variable: "--Poppins-Bold",
  weight: "100 900",
});

const ProtestGuerrilla = localFont({
  src: "./fonts/ProtestGuerrilla-Regular.ttf",
  variable: "--ProtestGuerrilla",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "VsHub",
  description: "Vendors Service Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppinsBold.variable} ${poppinsRegular.variable} ${poppinsSemiBold} ${ProtestGuerrilla.variable} antialiased`}
      >
        <Suspense fallback={<LoadingSvg/>}>
        <StoreProvider>{children}</StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
