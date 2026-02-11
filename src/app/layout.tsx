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
  title: "Aggroso – AI Tasks Generator",
  description:
    "Generate structured user stories, engineering tasks, and risk analysis from feature ideas using AI. Edit, reorder, group, and export project specs in seconds.",
  keywords: [
    "AI task generator",
    "user story generator",
    "product planning tool",
    "engineering task planner",
    "Next.js AI app",
  ],
  authors: [{ name: "Hitanshu Khandelwal" }],
  creator: "Hitanshu Khandelwal",
  openGraph: {
    title: "Aggroso – AI Tasks Generator",
    description:
      "Turn feature ideas into structured user stories and engineering tasks instantly.",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}
