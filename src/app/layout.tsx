import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
title: "ChinaUni Admissions | Apply to Chinese Universities for Free",
description:
  "Apply to top Chinese universities for free. Pay only after successful admission. Check your eligibility in minutes.",
keywords: "China university, study in China, Chinese university admission, international students",
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
  <html lang="en">
    <body className={inter.className}>{children}</body>
  </html>
);
}