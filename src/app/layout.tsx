import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "aifa | Python Functions — Learner's Track",
  description: "Learn different types of Python functions: built-in, user-defined, lambda, recursive, generators, closures, methods, and async. Clear explanations and code examples.",
  keywords: ["Python", "Functions", "Learning", "Programming", "Lambda", "Recursion", "Generators", "aifa"],
  authors: [{ name: "aifa" }],
  openGraph: {
    title: "aifa | Python Functions — Learner's Track",
    description: "Learn Python function types with clear explanations and examples.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "aifa | Python Functions — Learner's Track",
    description: "Learn Python function types with clear explanations and examples.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
