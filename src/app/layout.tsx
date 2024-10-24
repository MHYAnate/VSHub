import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "VSHub",
  description: "Vendors Service Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppinsBold.variable} ${poppinsRegular.variable} ${poppinsSemiBold} ${ProtestGuerrilla.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
