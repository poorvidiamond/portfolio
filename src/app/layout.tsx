import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Analytics from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poorvi Bhaskar | Firmware Engineer",
  description: "Full-Stack Embedded Engineer bridging atoms and bits. Specializing in Rust, STM32, and embedded systems development.",
  keywords: ["Firmware Engineer", "Embedded Systems", "Rust", "STM32", "IoT", "C++"],
  authors: [{ name: "Poorvi Bhaskar" }],
  openGraph: {
    title: "Poorvi Bhaskar | Firmware Engineer",
    description: "Full-Stack Embedded Engineer bridging atoms and bits.",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Analytics />
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
