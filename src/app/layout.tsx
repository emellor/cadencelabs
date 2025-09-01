import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClientSessionProvider } from "@/components/SessionProvider";
import { Navbar } from "@/components/Navbar";
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
  title: "DailyFit - Your Personal Fitness Journey",
  description: "Transform your health with personalized workouts, nutrition tracking, and expert guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientSessionProvider>
          <Navbar />
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
