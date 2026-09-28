import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WishlistProvider from "@/components/WishlistProvider";
import ScrollToTop from "@/components/ScrollToTop";
import AOSInit from "@/components/AOSInit";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BazarDB | Online Grocery Shopping",
  description: "Order grocery and daily essentials with fast delivery in Dhaka",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${inter.variable} font-body bg-white text-gray-800 antialiased selection:bg-emerald-500 selection:text-white flex flex-col min-h-screen`}
      >
        <AOSInit />
        <Providers>
          <WishlistProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <ScrollToTop />
          </WishlistProvider>
        </Providers>
      </body>
    </html>
  );
}