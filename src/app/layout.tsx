import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/lib/lenis";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1:1 Mentorship | Unlock Career Growth with MentorUnion",
  description: "Gain real-world insights & career clarity with C-suite mentors from top global giants. Book 1:1 sessions, grow faster, and achieve your professional goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}  font-sans`}>
        <SmoothScrolling/>
        {children}
      </body>
    </html>
  );
}
