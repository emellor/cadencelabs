import type { Metadata } from "next";
import { Roboto, Montserrat } from "next/font/google";
import { ClientSessionProvider } from "@/components/SessionProvider";
import "./globals.css";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const montserrat = Montserrat({
  weight: ['700', '800'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "CADENCE LABS - 11Turn Raw Rider Data into World Tour-Winning Decisions",
  description: "Transform cycling performance with AI-powered analytics, digital twins, and race simulation technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${montserrat.variable} antialiased`}
      >
        <ClientSessionProvider>
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
