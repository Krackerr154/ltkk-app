import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/components/NavBar";
import "katex/dist/katex.min.css";
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
  title: "LTKK Interactive Learning — Kompleks Cr(III)",
  description:
    "Aplikasi pembelajaran interaktif untuk praktikum Laboratorium Teknik Kimia Koordinasi: sintesis, rekristalisasi, spektroskopi UV-Vis, dan penentuan Δ₀ kompleks Cr(III).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
