
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shefdetailing.com"),
  title: "SHEF Mobile Detailing | Mobile Car Detailing in Chicagoland",
  description:
    "Professional mobile car detailing in Chicagoland. Interior, exterior, and full detailing services delivered to your home or workplace.",
  keywords: [
    "mobile car detailing",
    "car detailing Chicagoland",
    "interior car detailing",
    "exterior car detailing",
    "car detailing Chicago",
    "mobile auto detailing",
    "SHEF Mobile Detailing",
  ],
  openGraph: {
    url: "https://shefdetailing.com",
    title: "SHEF Mobile Detailing | Mobile Car Detailing in Chicagoland",
    description:
      "Professional mobile car detailing delivered to your home or workplace throughout Chicagoland.",
    type: "website",
    locale: "en_US",
    siteName: "SHEF Mobile Detailing",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
