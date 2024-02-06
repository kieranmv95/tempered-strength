import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import StoreProvider from "@/app/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tempered Strength",
  description: "Lift it, Track it, Share it. Flex your one rep maxes with all your gym friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider>
          <StoreProvider>
              <html lang="en">
              <body className={inter.className}>
              <Header/>
              {children}
              </body>
              </html>
          </StoreProvider>
      </ClerkProvider>
  );
}
