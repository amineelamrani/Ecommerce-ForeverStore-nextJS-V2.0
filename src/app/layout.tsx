import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/headerComponents/Header";
import Footer from "@/components/Footer";
import UserProvider from "@/contexts/userContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template:
      "%s | FOREVER Store | The best store with the best quality price ration",
    default:
      "FOREVER Store | The best store with the best quality price ration",
  },
  description:
    "Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.",
  authors: [{ name: "AM1NE", url: "https://github.com/amineelamrani" }],
  creator: "Amine elamrani",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased container mx-auto px-5 py-2 font-mono relative w-full`}
      >
        <UserProvider>
          <>
            <Header />
            {children}
            <Footer />
          </>
        </UserProvider>
      </body>
    </html>
  );
}
