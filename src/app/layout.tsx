"use client";

import "./globals.css";
import { Inter, Jolly_Lodger } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jollyLodger = Jolly_Lodger({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jolly-lodger",
});

export default function RootLayout({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jollyLodger.variable} font-sans`}>
        {/*@ts-ignore */}
        <SessionProvider session={props.session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
