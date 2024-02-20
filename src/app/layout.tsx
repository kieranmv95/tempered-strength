import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import StoreProvider from "@/app/StoreProvider";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import type { Viewport } from 'next'
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tempered Strength",
  description:
    "Lift it, Track it, Share it. Flex your one rep maxes with all your gym friends",
  manifest: "/manifest.json",
  other: {
    'google-adsense-account': 'ca-pub-7988621555920336',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body>
        <ClerkProvider>
          <StoreProvider>
            <html lang="en">
            <body className={inter.className}>
            <Header />
            <Toaster position="top-center" />
            {children}
            <Analytics />
            </body>
            </html>
          </StoreProvider>
        </ClerkProvider>
        </body>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7988621555920336" crossorigin="anonymous" />
      </html>
    </>
  );
}
